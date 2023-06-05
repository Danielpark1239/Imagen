import { type NextPage } from "next";
import Head from "next/head"
import Navbar from "../components/navbar"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="flex h-screen justify-center">
        <Navbar />
        <div className="mt-24 h-full w-full"></div>
      </main>
    </>
  )
}

export default Home
