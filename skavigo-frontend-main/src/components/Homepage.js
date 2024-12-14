import React from 'react'

function homepage() {
  return (
    <div>
    <div class="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] group/design-root overflow-x-hidden" style='font-family: Inter, "Noto Sans", sans-serif;'>
      <div class="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
        <h2 class="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] flex-1">Skavigo</h2>
        <div class="flex w-12 items-center justify-end">
          <button
            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#1C160C] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
          >
            <div class="text-[#1C160C]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div class="@container">
        <div class="@[480px]:p-4">
          <div
            class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
            style='background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/bffeeb36-8885-4912-a299-416fa6ac0415.png");'
          >
            <div class="flex flex-col gap-2 text-center">
              <h1
                class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
              >
                Logistics Solutions
              </h1>
              <h2 class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                We are committed to delivering your goods safely and on time.
              </h2>
            </div>
            <button
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#019863] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
            >
              <span class="truncate">Get a Quote</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-10 px-4 py-10 @container">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-4">
            <h1
              class="text-[#1C160C] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
            >
              Services
            </h1>
            <p class="text-[#1C160C] text-base font-normal leading-normal max-w-[720px]">
              We offer a wide range of services from air freight, ocean freight, warehousing to trucking.
            </p>
          </div>
          <button
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#019863] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] w-fit"
          >
            <span class="truncate">Learn More</span>
          </button>
        </div>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
          <div class="flex flex-col gap-3 pb-3">
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style='background-image: url("https://cdn.usegalileo.ai/sdxl10/f8cfd43b-d88c-4739-a7e7-0951e213473b.png");'
            ></div>
            <p class="text-[#1C160C] text-base font-medium leading-normal">Air Freight</p>
          </div>
          <div class="flex flex-col gap-3 pb-3">
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style='background-image: url("https://cdn.usegalileo.ai/stability/d75c265b-ef32-4f87-970d-5387ac370d87.png");'
            ></div>
            <p class="text-[#1C160C] text-base font-medium leading-normal">Ocean Freight</p>
          </div>
          <div class="flex flex-col gap-3 pb-3">
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style='background-image: url("https://cdn.usegalileo.ai/stability/90238c56-b258-45a2-8487-068759b5ad2b.png");'
            ></div>
            <p class="text-[#1C160C] text-base font-medium leading-normal">Trucking</p>
          </div>
        </div>
      </div>
      <footer class="flex flex-col gap-6 px-5 py-10 text-center @container"><p class="text-[#A18249] text-base font-normal leading-normal">@2022 Skavigo</p></footer>
      <div class="h-5 bg-[#FFFFFF]"></div>
    </div>

    </div>
  )
}

export default homepage