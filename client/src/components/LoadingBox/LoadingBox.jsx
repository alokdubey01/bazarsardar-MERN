import React from "react";
const n = 4;

function LoadingBox() {
    return(
    <div className="flex justify-around">
{ [...Array(n)].map((e, i) => (
        <div className="animate-pulse bg-white border border-gray-600 rounded-lg w-64 dark:bg-gray-800 dark:border-gray-700 ml-4 mt-4">
      <div>
        <div className="bg-slate-200 rounded-t-lg ml:auto p-8 items-center justify-center w-full h-20"></div>
      </div>
      <div className="px-2 pb-3 pt-2">
        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
        <div className="h-2 bg-slate-200 rounded col-span-2 mt-3"></div>
        <div className="flex">
          <div className="h-2 bg-slate-200 rounded col-span-2 w-20 mt-3"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1 w-40 ml-6 mt-3"></div>
        </div>
      </div>
    </div>
  ))}
  </div>
  )
}

export default LoadingBox;
