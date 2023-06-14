import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <div className="shadow-top z-10 flex h-20 w-full justify-between bg-slate-300 px-2 text-slate-900 shadow-gray-400 duration-300 ease-in hover:shadow-violet-400 sm:px-8 md:px-16 lg:px-40">
      <div className="flex justify-start">
        <Link
          href="https://github.com/Danielpark1239/Imagen"
          className="flex w-fit content-center items-center justify-center p-1 pt-2 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Imagen by Daniel Park
        </Link>
      </div>
      <div className="flex flex-row justify-end gap-2 md:gap-6">
        <Link
          href="/terms-of-service"
          className="flex w-fit content-center items-center justify-center p-1 pt-2 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy-policy"
          className="flex w-fit content-center items-center justify-center p-1 pt-2 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Privacy Policy
        </Link>
        <Link
          href="/cookies"
          className="flex w-fit content-center items-center justify-center p-1 pt-2 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

export default Footer
