<script lang="ts" setup>
defineProps({
  content: {
    type: Object,
    default: null
  },
  contentAbout: {
    type: Array,
    default: null
  }
})
</script>
<template>
  <div style="background-image: url('/landingpage/about.png')" class="bg-cover bg-center lg:h-[calc(720px-75px)] flex flex-col lg:flex-row p-4 py-20 sm:px-28 lg:items-center gap-10 lg:gap-28">
    <div class="w-full lg:w-1/2 relative flex flex-wrap gap-4 text-primary-500">
      <svg class="absolute -left-10 -top-10" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <g opacity="0.3" filter="url(#filter0_b_1046_21063)">
          <circle cx="40.1504" cy="40.093" r="39.3443" fill="#FCB700"/>
        </g>
        <defs>
          <filter id="filter0_b_1046_21063" x="-10.1228" y="-10.1802" width="100.546" height="100.546" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.46448"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1046_21063"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1046_21063" result="shape"/>
          </filter>
        </defs>
      </svg>
      <svg class="absolute -bottom-12 right-5" width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <g clip-path="url(#clip0_1046_20860)">
            <g clip-path="url(#clip1_1046_20860)">
              <circle cx="2.64749" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="3.05472" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="3.05472" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip2_1046_20860)">
              <circle cx="2.64749" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="15.3496" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="15.3496" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip3_1046_20860)">
              <circle cx="2.64749" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="27.6446" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="27.6446" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip4_1046_20860)">
              <circle cx="2.64749" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="39.94" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="39.94" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip5_1046_20860)">
              <circle cx="2.64749" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="52.2349" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="52.2349" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip6_1046_20860)">
              <circle cx="2.64749" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="64.5298" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="64.5298" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip7_1046_20860)">
              <circle cx="2.64749" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="76.8252" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="76.8252" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip8_1046_20860)">
              <circle cx="2.64749" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="89.1201" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="89.1201" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip9_1046_20860)">
              <circle cx="2.64749" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="101.415" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="101.415" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip10_1046_20860)">
              <circle cx="2.64749" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="113.71" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="113.71" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip11_1046_20860)">
              <circle cx="2.64749" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="126.005" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="126.005" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip12_1046_20860)">
              <circle cx="2.64749" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="138.3" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="138.3" r="2.45902" fill="#FCB700"/>
            </g>
            <g clip-path="url(#clip13_1046_20860)">
              <circle cx="2.64749" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="14.9429" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="27.2373" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="39.5323" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="51.8282" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="64.1231" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="76.418" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="88.7134" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="101.008" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="113.303" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="125.599" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="137.894" cy="150.596" r="2.45902" fill="#FCB700"/>
              <circle cx="150.189" cy="150.596" r="2.45902" fill="#FCB700"/>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1046_20860">
            <rect x="0.188477" y="0.595459" width="163.934" height="163.934" rx="27.8689" fill="white"/>
          </clipPath>
          <clipPath id="clip1_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 0.595703)"/>
          </clipPath>
          <clipPath id="clip2_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 12.8906)"/>
          </clipPath>
          <clipPath id="clip3_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 25.1855)"/>
          </clipPath>
          <clipPath id="clip4_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 37.481)"/>
          </clipPath>
          <clipPath id="clip5_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 49.7759)"/>
          </clipPath>
          <clipPath id="clip6_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 62.0708)"/>
          </clipPath>
          <clipPath id="clip7_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 74.3662)"/>
          </clipPath>
          <clipPath id="clip8_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 86.6611)"/>
          </clipPath>
          <clipPath id="clip9_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 98.9561)"/>
          </clipPath>
          <clipPath id="clip10_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 111.251)"/>
          </clipPath>
          <clipPath id="clip11_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 123.546)"/>
          </clipPath>
          <clipPath id="clip12_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 135.841)"/>
          </clipPath>
          <clipPath id="clip13_1046_20860">
            <rect width="163.934" height="12.2951" fill="white" transform="translate(0.188477 148.137)"/>
          </clipPath>
        </defs>
      </svg>
      <div class="rounded-lg bg-neutral-200 h-32 w-32 lg:h-48 lg:w-48 flex flex-col items-center justify-evenly p-7">
        <img src="/landingpage/services.png" :alt="contentAbout?.length && contentAbout[0].name">
        <h1 class="text-2xl font-bold">
          {{ contentAbout?.length && contentAbout[0].total }}
        </h1>
        <h1>
          {{ contentAbout?.length && contentAbout[0].name }}
        </h1>
      </div>
      <div class="rounded-lg bg-neutral-200 h-32 w-32 lg:h-48 lg:w-48 flex flex-col items-center justify-evenly p-7">
        <img src="/landingpage/ticket-done.png" :alt="contentAbout?.length && contentAbout[1].name">
        <h1 class="text-2xl font-bold">
          {{ contentAbout?.length && contentAbout[1].total }}
        </h1>
        <h1>
          {{ contentAbout?.length && contentAbout[1].name }}
        </h1>
      </div>
      <div class="rounded-lg bg-neutral-200 h-32 w-32 lg:h-48 lg:w-48 flex flex-col items-center justify-evenly p-7">
        <img src="/landingpage/agents.png" :alt="contentAbout?.length && contentAbout[2].name">
        <h1 class="text-2xl font-bold">
          {{ contentAbout?.length && contentAbout[2].total }}
        </h1>
        <h1>
          {{ contentAbout?.length && contentAbout[2].name }}
        </h1>
      </div>
      <div class="z-40 rounded-lg bg-neutral-200 h-32 w-32 lg:h-48 lg:w-48 flex flex-col items-center justify-evenly p-7">
        <img src="/landingpage/rating.png" :alt="contentAbout?.length && contentAbout[3].name">
        <h1 class="text-2xl font-bold">
          {{ contentAbout?.length && contentAbout[3].total }}
        </h1>
        <h1>
          {{ contentAbout?.length && contentAbout[3].name }}
        </h1>
      </div>
    </div>
    <div class="w-full lg:w-1/2 flex flex-col text-neutral-100">
      <h1 class="text-primary-300 font-bold">
        {{ content?.section.toUpperCase() }}
      </h1>
      <h1 class="text-4xl font-bold mb-4">
        {{ content?.title }}
      </h1>
      <h1>
        {{ content?.content }}
      </h1>
    </div>
  </div>
</template>