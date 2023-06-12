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
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div
      className="relative col-span-1"
      key={image.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        className={`${
          hovered ? "opacity-5" : "opacity-100"
        } shadow-xl shadow-slate-500 transition-opacity duration-200 ease-in hover:shadow-violet-700 h-84 w-84`}
        src={image.url}
        alt="Image"
        width={512}
        height={512}
        key={image.id}
        quality={100}
      />
      <p className="bg-slate-50 absolute inset-0 flex justify-start overflow-auto p-4 font-serif font-medium opacity-0 shadow-xl shadow-slate-700 transition-opacity duration-200 ease-in hover:opacity-100 hover:shadow-lg hover:shadow-violet-500">
        {image.prompt}
      </p>
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
    <div className="w-5/6 xs:w-11/12 ss:w-5/6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center gap-5 s:gap-6 ss:gap-8 max-w-screen-xl mx-auto">
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
            <span className="text-violet-600">Imagen</span> brings your
            imagination to life.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-5/6 max-w-screen-lg">
            <div className="col-span-1 align-center m-auto flex-wrap content-center font-medium">
              <div className="break-words text-lg ">
                Empower your creative endeavors using the power of generative
                AI. Streamline your workflow and lower your costs with our
                state-of-the-art solution. It&apos;s never been easier to generate
                stunning images with the click of a button!
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Image
                className="w-full shadow-xl shadow-slate-700 hover:shadow-violet-700 duration-200 ease-in"
                src="/thumbnail.png"
                alt="Thumbnail"
                width={768}
                height={512}
                quality={100}
              />
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <Link
              href="/generate"
              className="flex justify-center items-center bg-violet-600 duration-300 ease-in hover:scale-105
              hover:bg-violet-600 text-xl text-white font-semibold py-2 px-4 border-b-4 border-violet-900 hover:border-violet-800 rounded-xl"
            >
              Get started
            </Link>
          </div>
          <div className="align-center content-center text-slate-900 pt-4">
            <h1 className="text-center text-2xl font-semibold sm:text-3xl md:mb-5 md:text-4xl pb-4 md:pb-0">
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
