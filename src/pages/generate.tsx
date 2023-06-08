import { type NextPage } from "next"
import Image from "next/image"
import type { RouterOutputs } from "~/utils/api"
import Head from "next/head"
import { useUser } from "@clerk/nextjs"
import { api } from "~/utils/api"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { LoadingPage, LoadingSpinner } from "~/components/loading"
import { useState } from "react"
import { toast } from "react-hot-toast"
import Navbar from "~/components/navbar"
import Footer from "~/components/footer"

dayjs.extend(relativeTime)

const CreateImageWizard = () => {
  const [input, setInput] = useState<string>("")
  const { user } = useUser()
  if (!user) {
    return null
  }
  const ctx = api.useContext()
  const { mutate, isLoading: isGenerating } = api.images.create.useMutation({
    onSuccess: () => {
      setInput("")
      void ctx.images.getAll.invalidate()
      void ctx.images.getAllUser.invalidate()
    },
    onError: (e) => {
      // TRPC Error
      console.log(e)
      if (e.message) {
        toast.error(e.message)
      } else {
        // Zod Error
        console.log(e.data?.zodError)
        const errorMessage = e.data?.zodError?.fieldErrors.prompt
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0])
        } else {
          toast.error(e.message)
        }
      }
    },
  })

  return (
    <div className="flex w-full gap-3">
      <input
        className="grow bg-transparent outline-none"
        placeholder="Enter a prompt!"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isGenerating}
      ></input>
      {input !== "" && !isGenerating && (
        <button
          onClick={() => mutate({ prompt: input })}
          disabled={isGenerating}
        >
          Generate
        </button>
      )}
      {isGenerating && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  )
}

type ImageWithUser = RouterOutputs["images"]["getAllUser"][number]
const ImageView = (props: ImageWithUser) => {
  const { image } = props
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
      <div className="flex flex-col">
        <div className="flex gap-1 font-bold text-slate-300">
          <span className="font-thin text-black">{`·   ${dayjs(
            image.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="text-xl">{image.prompt}</span>
      </div>
    </div>
  )
}

const Feed = () => {
  const { data, isLoading: postsLoading } = api.images.getAllUser.useQuery()

  if (postsLoading) return <LoadingPage />

  if (!data) return <div>Something went wrong</div>

  return (
    <div className="flex flex-col">
      {data?.map((fullImage) => (
        <ImageView {...fullImage} key={fullImage.image.id} />
      ))}
    </div>
  )
}

const Generate: NextPage = () => {
  const { isLoaded: userLoaded } = useUser()
  api.images.getAllUser.useQuery() // Start fetching asap

  if (!userLoaded) return <div />

  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="justify-center">
        <Navbar />
        <div className="mt-24 border-x border-slate-400 text-black">
          <div className="flex border-b border-slate-400 p-4">
            <CreateImageWizard />
          </div>
          <Feed />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Generate
