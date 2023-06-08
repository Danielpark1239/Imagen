import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { api } from "~/utils/api"
import { LoadingSpinner } from "~/components/loading"
import type { Image as PrismaImage } from "@prisma/client";

type HomeImageDisplayProps = {
  image: PrismaImage
}

const HomeImageDisplay = ({ image }: HomeImageDisplayProps) => {
  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => {
    setHovered(true)
    console.log(true)
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div
      className="col-span-1 relative"
      key={image.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Image
        className={`${hovered ? 'opacity-5' : 'opacity-100'} transition-opacity duration-300`}
        src={image.url}
        alt="Image"
        width={512}
        height={512}
        key={image.id}
      />
      <div className="p-4 absolute inset-0 flex font-serif font-medium justify-start opacity-0 hover:opacity-100 transition-opacity duration-300">
        {image.prompt}
      </div>
    </div>
  )
}

const LatestImages = () => {
  const { data, isLoading: postsLoading } = api.images.getAll.useQuery()

  if (postsLoading)
    return (
      <div className="flex justify-center">
        <LoadingSpinner size={64} />
      </div>
    )

  if (!data) return <div>Something went wrong</div>

  return (
    <div className="grid grid-cols-4 justify-center gap-8 px-12">
      {data?.map((image) => (
        <HomeImageDisplay image={image} key={image.id}/>
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  api.images.getAll.useQuery() // Start fetching asap

  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="relative grid flex-col flex-wrap items-center overflow-hidden shadow-lg">
        <Navbar />
        <div className="align-center mt-24 flex w-screen flex-col content-center gap-8 p-4 pb-8 text-slate-900">
          <h1 className="pb-8 pt-16 text-center text-3xl font-bold sm:text-4xl md:mb-5 md:text-5xl lg:text-7xl">
            <span className="text-violet-700">Imagen</span> brings your
            imagination to life.
          </h1>
          <div className="grid grid-cols-12">
            <div className="align-center col-span-3 col-start-4 m-auto flex-wrap content-center p-8 font-medium">
              <div className="break-words text-lg">
                Empower your creative endeavors using the power of generative
                AI. Streamline your workflow and lower your costs with our
                state-of-the-art solution. It&apos;s never been easier to generate
                stunning images with the click of a button!
              </div>
            </div>
            <div className="col-span-3 col-start-7 flex justify-center">
              <Image
                src="/thumbnail.png"
                alt="Thumbnail"
                width={512}
                height={512}
              />
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <button className="flex justify-center items-center w-48 h-12 bg-violet-600 hover:bg-violet-400 text-xl text-white font-bold py-2 px-4 border-b-4 border-violet-900 hover:border-violet-500 rounded-xl">
              <Link href="/generate">
                Get started
              </Link>
            </button>
          </div>
          <div className="align-center content-center text-slate-900 pt-4">
            <h1 className="text-center text-2xl font-semibold sm:text-3xl md:mb-5 md:text-4xl">
              Latest community-generated images
            </h1>
            <LatestImages />
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Home
