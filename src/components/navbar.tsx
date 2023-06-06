import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { UserButton, useUser } from "@clerk/nextjs"

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useUser()
  return (
    <nav className="fixed top-0 z-10 w-full bg-slate-200 px-2 text-slate-900 shadow-lg shadow-gray-400 duration-300 ease-in hover:shadow-violet-400 sm:px-8 md:px-16">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex justify-center space-x-4">
          <div className="flex flex-row duration-200 ease-in hover:scale-105 hover:text-violet-700">
            <Image
              className=""
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
            />
            <Link
              href="/"
              className="flex content-center items-center justify-center p-1 pb-2.5 text-2xl font-semibold"
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
              href="/collection"
              className="flex content-center items-center justify-center p-1 duration-200 ease-in hover:scale-105 hover:text-violet-700"
            >
              Collection
            </Link>
          )}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center p-1 text-2xl text-violet-700 md:hidden"
        >
          {open ? (
            <i className="fa-solid fa-times" title="Open Menu"></i>
          ) : (
            <i className="fa-solid fa-bars" title="Close Menu"></i>
          )}
        </div>
        <div className="items-center md:flex">
          {!isSignedIn && (
            <button className="rounded-xl bg-violet-500 px-4 py-2 text-white duration-200 ease-in hover:scale-105 hover:bg-violet-700">
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
        {/* {open && (
          <div className="bg-navy z-auto mt-4 flex h-auto w-full flex-col items-center gap-4 transition duration-500 ease-in md:hidden">
            <AnchorLink
              href="#about"
              className="nav-link hover:text-gold relative p-1 text-white"
              onClick={() => setOpen(!open)}
            >
              About
              <span className="nav-link-hover"></span>
            </AnchorLink>
          </div>
        )} */}
      </div>
    </nav>
  )
}

export default Navbar
