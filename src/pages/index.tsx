import { type NextPage } from "next"
import { Fragment, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { api } from "~/utils/api"
import { LoadingSpinner } from "~/components/loading"
import type { Image as PrismaImage } from "@prisma/client"
import { Dialog, Transition } from "@headlessui/react"
import thumbnail from "../../public/thumbnail.png"

type HomeImageDisplayProps = {
  image: PrismaImage
}

const HomeImageDisplay = ({ image }: HomeImageDisplayProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative col-span-1"
      key={image.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        className={`${
          hovered ? "opacity-60" : "opacity-100"
        } h-84 w-84 shadow-xl shadow-slate-500 transition-opacity duration-200 ease-in hover:shadow-violet-700`}
        src={image.url}
        alt="Image"
        width={512}
        height={512}
        key={image.id}
        quality={100}
      />
      <div
        className={`${
          hovered ? "opacity-60" : "opacity-0"
        } absolute inset-0 flex flex-col items-center justify-start gap-2 overflow-auto bg-slate-50 p-4 opacity-0
        shadow-xl shadow-slate-700 transition-opacity duration-200 ease-in hover:opacity-100 hover:shadow-lg hover:shadow-violet-500`}
      >
        <button
          onClick={() => setImageModalOpen(true)}
          className="flex h-8 w-24 items-center justify-center rounded-lg border-b-3 border-violet-900 bg-violet-600
          px-2 py-1 align-middle text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
        >
          Full Screen
        </button>
        <p className="font-serif font-medium">{image.prompt}</p>
      </div>
      <Transition appear show={imageModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setHovered(false)
            setImageModalOpen(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="bg-slate-200 p-4">
                    <Image
                      width={1024}
                      height={1024}
                      className="h-full w-full"
                      src={image.url}
                      alt="Generated image"
                      quality={100}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
    <div className="mx-auto grid w-5/6 max-w-screen-xl grid-cols-1 justify-center gap-5 xs:w-11/12 xs:grid-cols-2 s:gap-6 ss:w-5/6 ss:gap-8 md:grid-cols-3 xl:grid-cols-4">
      {data?.map((image) => (
        <HomeImageDisplay image={image} key={image.id} />
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
          <div className="mx-auto grid w-5/6 max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2">
            <div className="align-center col-span-1 m-auto flex-wrap content-center font-medium">
              <div className="break-words text-lg">
                Empower your creative endeavors using the power of generative
                AI. Streamline your workflow and lower your costs with our
                state-of-the-art solution. It&apos;s never been easier to
                generate stunning images with the click of a button!
              </div>
              <div className="flex justify-center pr-4 pt-4">
                <Link
                  href="/generate"
                  className="flex items-center justify-center rounded-xl border-b-4 border-violet-900 bg-violet-600
                  px-2.5 py-1.5 text-xl font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Image
                className="w-full shadow-xl shadow-slate-700 duration-200 ease-in hover:shadow-violet-700"
                src={thumbnail}
                alt="Thumbnail"
                width={768}
                height={512}
                quality={100}
              />
            </div>
          </div>
          <div className="align-center content-center pt-4 text-slate-900">
            <h1 className="pb-4 text-center text-2xl font-semibold sm:text-3xl md:mb-5 md:pb-0 md:text-4xl">
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
