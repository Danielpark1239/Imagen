import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <div className="flex content-center justify-center items-center align-middle z-10 h-20 bg-slate-300 px-2 text-slate-900 shadow-top shadow-gray-400 duration-300 ease-in hover:shadow-violet-400 sm:px-8 md:px-16">
      <Link
      href="https://github.com/Danielpark1239/Imagen"
      className="w-fit pt-2 flex content-center items-center justify-center p-1 font-bold duration-200 ease-in hover:scale-105 hover:text-violet-700"
      >
        Imagen by Daniel Park
      </Link>
    </div>
  )
}

export default Footer
