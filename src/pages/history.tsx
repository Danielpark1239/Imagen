import { type NextPage } from "next"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import type { RouterOutputs } from "~/utils/api"
import { LoadingPage } from "~/components/loading"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { api } from "~/utils/api"

dayjs.extend(relativeTime)

type ImageWithUser = RouterOutputs["images"]["getAllUser"][number]
const ImageView = (props: ImageWithUser) => {
  const { image } = props
  const createdTime = dayjs(image.createdAt).fromNow()
  return (
    <div
      className="flex gap-3 border-b border-slate-400 p-4 text-black"
      key={image.id}
    >
      <Image
        width={1024}
        height={1024}
        className="h-64 w-64"
        src={image.url}
        alt="Generated image"
      />
      <div className="flex flex-col px-8">
        <div className="flex gap-1 font-bold text-slate-300">
          <span className="font-thin text-black">{`Generated ${createdTime}`}</span>
        </div>
        <span className="text-xl font-serif overflow-auto">{image.prompt}</span>
      </div>
    </div>
  )
}

const Feed = () => {
  const { data, isLoading: postsLoading } = api.images.getAllUser.useQuery()

  if (postsLoading) return <LoadingPage />

  if (!data) return <div>Something went wrong</div>

  return (
    <div className="h-min-screen flex flex-col content-center justify-center gap-2 px-36 pb-4">
      <p className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl pt-4">
        You have {data ? data.length: 0} generated images
      </p>
      <div className="flex items-center justify-center py-4">
        <Link
          href="/generate"
          className="flex h-10 w-50 items-center justify-center rounded-xl border-b-4 border-violet-900 bg-violet-700
          px-4 py-2 text-lg font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
        >
          Generate new images
        </Link>
      </div>
      <div className="bg-slate-50 rounded-lg border-2 border-slate-300">
        {data?.map((fullImage) => (
          <ImageView {...fullImage} key={fullImage.image.id} />
        ))}
      </div>
    </div>
  )
}

const HistoryPage: NextPage = () => {
  api.images.getAllUser.useQuery() // pre-fetch
  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="flex flex-col justify-center text-black">
        <Navbar />
        <div className="mt-24 border-x border-slate-400 text-black">
          <Feed />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default HistoryPage
