import { type NextPage } from "next"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { api } from "~/utils/api"
import { LoadingSpinner } from "~/components/loading"
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
  const {
    data: createdImage,
    mutate,
    isLoading: isGenerating,
  } = api.images.create.useMutation({
    onSuccess: () => {
      setInput("")
      void ctx.images.getAll.invalidate()
      void ctx.images.getAllUser.invalidate()
      void ctx.images.invalidate()
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
  const {
    data: suggestedPrompt,
    isLoading,
    refetch,
  } = api.suggestedPrompts.getRandom.useQuery()

  return (
    <div className="flex min-h-screen w-screen flex-col content-center justify-center gap-2 px-36">
      <p className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        Generate an image
      </p>
      <div className="py-4 pb-4 font-medium text-black">
        <p className="pb-1 text-xl font-semibold">Instructions for best use:</p>
        <ul className="list-decimal pl-8">
          <li>Be as detailed as possible.</li>
          <li>
            Mention the style of image you want, such as cartoon, 3d render,
            photo, painting, etc.
          </li>
          <li>
            Be specific about the individual elements, background, and colors
            you want in your image.
          </li>
          <li>
            Try to avoid overly complicated prompts as well as images with
            multiple human subjects, as it may lead to distortions.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 text-sm">
          <p className="flex items-center justify-center font-medium">
            Want a sample prompt?
          </p>
          <button
            onClick={() => {
              // Set the input to the suggested prompt and refetch for the next button press
              if (suggestedPrompt && !isLoading) {
                setInput(suggestedPrompt.text)
                void refetch()
              }
            }}
            className="flex h-7 w-24 items-center justify-center rounded-lg border-b-2 border-violet-900
          bg-violet-700 p-2 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
          >
            Surprise me
          </button>
        </div>
        <div className="flex w-full flex-row rounded-lg border-b-2 border-slate-400 bg-slate-100 font-semibold text-black">
          <input
            className="bg-slate-50 text-md flex w-11/12 flex-wrap items-center justify-center rounded-lg p-2"
            placeholder="Enter a prompt!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
          ></input>
          {!isGenerating ? (
            <button
              onClick={() => mutate({ prompt: input })}
              disabled={isGenerating || input === ""}
              className="w-1/12 rounded-lg border-l-2 bg-slate-50 disabled:text-slate-300 disabled:bg-slate-50 hover:text-violet-700 duration-300 ease-in"
            >
              Generate
            </button>
          ) : (
            <div className="flex w-1/12 items-center justify-center rounded-lg border-l-2">
              <LoadingSpinner size={32} />
            </div>
          )}
        </div>
      </div>
      <div className="h-full">
        {createdImage && (
          <div className="flex flex-row gap-4 rounded-lg border-2 border-slate-300 bg-slate-50 p-4">
            <Image
              width={1024}
              height={1024}
              className="h-80 w-80"
              src={createdImage.url}
              alt="Generated image"
              quality={100}
            />
            <div className="flex flex-col px-8">
              <div className="flex gap-1 font-bold text-slate-300">
                <span className="font-thin text-black">{`Generated ${dayjs(createdImage.createdAt).fromNow()}`}</span>
              </div>
              <span className="text-xl font-serif overflow-auto">{createdImage.prompt}</span>
            </div>
          </div>
        )}
        <div className="flex justify-center pt-8">
          <Link
            href="/history"
            className="flex h-10 w-40 items-center justify-center rounded-xl border-b-4 border-violet-900 bg-violet-700
            px-4 py-2 text-lg font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
          >
            Image History
          </Link>
        </div>
      </div>
    </div>
  )
}

const Generate: NextPage = () => {
  const { isLoaded: userLoaded } = useUser()
  api.suggestedPrompts.getRandom.useQuery() // Start fetching asap

  if (!userLoaded) return <div />

  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="justify-center">
        <Navbar />
        <div className="flex p-4 mt-24 border-x border-slate-400 text-black">
          <CreateImageWizard />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Generate
