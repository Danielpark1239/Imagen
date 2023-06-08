import { type NextPage } from "next"
import Head from "next/head"

const HistoryPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main className="flex h-screen justify-center text-black">
        <div>Your history</div>
      </main>
    </>
  )
}

export default HistoryPage
