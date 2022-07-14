import React from 'react'

function Thumbnail() {
  return (
    <div className="container mx-auto py-4 md:py-12 px-1 md:px-1">
    <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-100 py-6 px-6 md:py-12 lg:px-12 w-full mx-6">
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-semibold text-gray-800">Best Deal</h1>
                <p className="text-l">
                    On full body checkup
                </p>
                <p className="text-base lg:text-xl text-gray-800 mt-2">
                    Save upto <span className="font-bold">50%</span>
                </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
                <img src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png" alt="" />
            </div>
        </div>
    </div>
</div>
  )
}

export default Thumbnail