import React from "react"

function ProductCardSkeleton({
  className = "w-1/2 lg:w-1/4 xl:w-1/6 shrink-0",
}) {
  return (
    <div className={`${className} h-full flex`}>
      <div className="w-full flex flex-col h-full border border-transparent">
        {/* Image placeholder */}
        <div className="relative aspect-square bg-[#eeeeee] overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>

        {/* Badge placeholder */}
        <div className="w-full px-3 py-[7px] h-[30px]">
          <div className="h-3 w-2/3 bg-[#eeeeee] rounded overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col flex-1 p-[10px]">
          <div className="px-1 md:px-4 space-y-2 min-h-[3.5rem]">
            <div className="h-3 w-full bg-[#eeeeee] rounded overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="h-3 w-3/4 bg-[#eeeeee] rounded overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>
          <div className="mt-auto pt-2 px-1 md:px-4">
            <div className="h-3 w-1/3 bg-[#eeeeee] rounded overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Button placeholder */}
        <div className="w-full h-[42px] bg-[#f0eded] mt-auto" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
