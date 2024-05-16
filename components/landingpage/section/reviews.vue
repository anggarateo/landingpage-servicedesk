<script lang="ts" setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel'

defineComponent({
  Carousel,
  Slide,
  Navigation
})

defineProps({
  content: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <div class="p-4 lg:p-20 bg-white">
    <div class="text-center">
      <h1 class="text-neutral-400 font-bold">
        PENILAIAN
      </h1>
      <h1 class="text-primary-500 font-bold text-4xl">
        Apa kata mereka tentang B-CARE?
      </h1>
    </div>
    <Carousel
      :items-to-show="content?.length === 2 ? 2 : 3"
      :wrap-around="content?.length >= 3"
    >
      <Slide v-for="(review) in content" :key="review.id" id="review" class="h-[470px]">
        <div class="rounded-lg border-t-4 border-secondary bg-primary-500 w-full px-6 pt-12 pb-20 flex flex-col items-center gap-4 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <g clip-path="url(#clip0_3442_2140)">
              <path d="M0.686523 12.2613V22.4044H10.8296V12.2613H4.06757C4.06757 8.53274 7.1011 5.49921 10.8296 5.49921V2.11816C5.23638 2.11816 0.686523 6.66802 0.686523 12.2613Z" fill="#A9BAD9"/>
              <path d="M24.354 5.49921V2.11816C18.7608 2.11816 14.2109 6.66802 14.2109 12.2613V22.4044H24.354V12.2613H17.592C17.592 8.53274 20.6255 5.49921 24.354 5.49921Z" fill="#A9BAD9"/>
            </g>
            <defs>
              <clipPath id="clip0_3442_2140">
                <rect width="23.6672" height="23.6672" fill="white" transform="translate(0.686523 0.427734)"/>
              </clipPath>
            </defs>
          </svg>
          <CRatingStar
            :rating="review.grade"
            readonly
          />
          <h1 class="text-neutral-100">
            {{ review.message }}
          </h1>
          <div class="absolute -bottom-16 flex flex-col items-center">
            <Avatar
              :avatar="review.avatar"
              :name="review.author"
              :size="24"
              text-class="text-5xl w-24 h-24"
            />
            <h1>
              {{ review.author }}
            </h1>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<style lang="less" scoped>
.carousel__slide#review {
  padding: 5px;
}

.carousel__viewport#review {
  perspective: 2000px;
}

.carousel__track#review {
  transform-style: preserve-3d;
}

.carousel__slide--sliding#review {
  transition: 0.7s;
}

.carousel__slide--prev#review .border-t-4 {
  @apply bg-primary/20 border-none;
}
.carousel__slide--prev#review h1 {
  @apply text-neutral-600;
}
.carousel__slide--prev#review {
  opacity: 0.8;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next#review .border-t-4 {
  @apply bg-primary/20 border-none;
}
.carousel__slide--next#review h1 {
  @apply text-neutral-600;
}
.carousel__slide--next#review {
  opacity: 0.8;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active#review {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>