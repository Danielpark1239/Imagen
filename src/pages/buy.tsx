import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  api.images.getAll.useQuery() // Start fetching asap

  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="flex flex-col justify-center text-black">
        <Navbar />
        <div className="flex min-h-screen flex-col items-center gap-8 pb-8 pt-40 text-center sm:pt-28 md:pb-0">
          <h1 className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
            Buy Credits
          </h1>
          <p className="px-4 pb-8 text-lg">
            Each image requires one credit to generate. Buy them here!
          </p>
          <div className="mx-auto flex w-52 flex-col justify-center gap-4 md:w-5/6 md:flex-row md:gap-4 ml:gap-24">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-slate-300 bg-slate-100 p-8 shadow-lg shadow-slate-400 xl:px-16">
              <Image
                className="h-3/4"
                src="/10_credits.png"
                alt="10 credits"
                width={128}
                height={128}
              />
              <h1 className="text-2xl font-semibold">10 Credits</h1>
              <Link
                href="/"
                className="text-md flex items-center justify-center rounded-xl border-b-4 border-violet-900
            bg-violet-600 px-3 py-1.5 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
              >
                Buy for $0.99
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-slate-300 bg-slate-100 p-8 shadow-lg shadow-slate-400 xl:px-16">
              <Image
                className="h-3/4"
                src="/50_credits.png"
                alt="50 credits"
                width={128}
                height={128}
              />
              <h1 className="text-2xl font-semibold">50 Credits</h1>
              <Link
                href="/"
                className="text-md flex items-center justify-center rounded-xl border-b-4 border-violet-900
            bg-violet-600 px-3 py-1.5 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
              >
                Buy for $4.75
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-slate-300 bg-slate-100 p-8 shadow-lg shadow-slate-400 xl:px-16">
              <Image
                className="h-3/4"
                src="/100_credits.png"
                alt="100 credits"
                width={128}
                height={128}
              />
              <h1 className="text-2xl font-semibold">100 Credits</h1>
              <Link
                href="/"
                className="text-md flex items-center justify-center rounded-xl border-b-4 border-violet-900
            bg-violet-600 px-3 py-1.5 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
              >
                Buy for $9.00
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Home
