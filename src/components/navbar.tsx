import React from "react"
import Link from "next/link"
import Image from "next/image"
import { UserButton, useUser } from "@clerk/nextjs"
import { api } from "~/utils/api"
import { LoadingSpinner } from "~/components/loading"

const Navbar: React.FC = () => {
  const { isSignedIn } = useUser()

  type CreditsDisplayProps = {
    isSignedIn: boolean | undefined
  }

  const CreditsDisplay = ({ isSignedIn }: CreditsDisplayProps) => {
    if (!isSignedIn) {
      return null
    }
    const { data: credits, isLoading: creditsLoading } =
      api.stripeUser.getCredits.useQuery()

    if (creditsLoading) {
      return (
        <div className="flex flex-row gap-4 lg:gap-6">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row text-lg font-medium items-center -mr-0.5">
              <LoadingSpinner size={22} />
              <p className="text-xl pb-1 pl-0.5">x</p>
            </div>
            <Image
              className="-ml-1"
              src="/coin.png"
              alt="Credits"
              width={24}
              height={24}
            />
          </div>
          <Link
            href="/generate"
            className="text-md flex items-center justify-center rounded-xl border-b-4 border-violet-900
            bg-violet-600 px-3 py-1.5 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
          >
            Buy Credits
          </Link>
        </div>
      )
    }

    return (
      <div className="flex flex-row gap-4 lg:gap-6">
        <div className="flex flex-row items-center gap-0.5">
          <div className="flex flex-row text-lg font-medium gap-0.5">
            <span className="text-2xl pb-1">{credits}</span>
            <p className="text-xl pt-0.5">x</p>
          </div>
          <Image
            className=""
            src="/coin.png"
            alt="credits"
            width={24}
            height={24}
          />
        </div>
        <Link
          href="/buy"
          className="text-md flex items-center justify-center rounded-xl border-b-4 border-violet-900
          bg-violet-600 px-3 py-1.5 font-semibold text-white duration-300 ease-in hover:scale-105 hover:border-violet-800 hover:bg-violet-600"
        >
          Buy Credits
        </Link>
      </div>
    )
  }

  return (
    <nav className="fixed top-0 z-10 w-full items-center justify-center bg-slate-200 px-1 align-middle text-slate-900 shadow-lg shadow-gray-400 duration-300 ease-in hover:shadow-violet-400 xss:px-2 ss:px-2 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto flex flex-col items-center justify-between p-2 xss:p-4 sm:flex-row">
        <div className="flex justify-center space-x-2 pr-1 md:space-x-4 md:pr-2">
          <div className="flex items-center justify-center duration-200 ease-in hover:scale-105 hover:text-violet-700 xss:flex-row">
            <Image
              className="h-10 w-10 items-center justify-center xss:h-12 xss:w-12"
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
            />
            <Link
              href="/"
              className="flex content-center items-center justify-center p-1 pb-2 text-xl font-semibold xss:pb-2.5 xss:text-2xl"
            >
              Imagen
            </Link>
          </div>
          <Link
            href="/generate"
            className="flex content-center items-center justify-center p-1 duration-200 ease-in hover:scale-105 hover:text-violet-700"
          >
            Generate
          </Link>
          {isSignedIn && (
            <Link
              href="/history"
              className="flex content-center items-center justify-center p-1 duration-200 ease-in hover:scale-105 hover:text-violet-700"
            >
              History
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center gap-4 pl-1 pt-0.5 md:pl-2 lg:gap-6">
          <CreditsDisplay isSignedIn={isSignedIn} />
          {!isSignedIn && (
            <button className="rounded-xl border-b-3 border-violet-900 bg-violet-600 px-3 py-1.5 text-white duration-200 ease-in hover:scale-105 hover:bg-violet-700">
              <Link href="/sign-in">Sign in</Link>
            </button>
          )}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-12 w-12",
              },
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
