import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <div className="flex justify-between z-10 h-20 bg-slate-300 px-2 text-slate-900 shadow-top shadow-gray-400 duration-300 ease-in hover:shadow-violet-400 sm:px-8 md:px-16 lg:px-40">
      <div className="flex justify-start">
        <Link
        href="https://github.com/Danielpark1239/Imagen"
        className="w-fit pt-2 flex content-center items-center justify-center p-1 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Imagen by Daniel Park
        </Link>
      </div>
      <div className="flex flex-row justify-end md:gap-6">
        <Link
        href="/terms-of-service"
        className="w-fit pt-2 flex content-center items-center justify-center p-1 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Terms of Service
        </Link>
        <Link
        href="/privacy-policy"
        className="w-fit pt-2 flex content-center items-center justify-center p-1 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Privacy Policy
        </Link>
        <Link
        href="/cookies"
        className="w-fit pt-2 flex content-center items-center justify-center p-1 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

export default Footer
