import { type NextPage } from "next";
import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/navbar"
import { api } from "~/utils/api"
import { LoadingPage, LoadingSpinner } from "~/components/loading"

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
    <div className="flex flex-col justify-center">
      {data?.map((image) => (
        <div>
          <Image
            src={image.url}
            alt="Image"
            width={256}
            height={256}
            key={image.id}
          />
          <h1>{image.prompt}</h1>
          <img src={image.url} />
        </div>
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
                state-of-the-art solution. It's never been easier to generate
                stunning images with the click of a button.
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
          <div className="align-center content-center text-slate-900">
            <h1 className="pt-16 text-center text-2xl font-semibold sm:text-3xl md:mb-5 md:text-4xl">
              Latest community-generated images
            </h1>
            <LatestImages />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
