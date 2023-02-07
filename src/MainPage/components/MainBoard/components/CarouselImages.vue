<template>
	<div ref="carousel" class="carousel-images">
		<PulseLoader style="position: absolute; top: calc(50% - 8px); left: 50%"
								 :loading="isLoaded"
								 color="#BE8022"
		/>
		<img
				:class="{'transparent': isLoaded}"
				@load="load" v-for="img in slicedList"
				:key="img.id"
				:src="img.download_url" alt="img.url"
		>
	</div>
</template>
<script>
import { getCarouselImages } from "../../../../api.js";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
export default {
	name: "CarouselImages",
	components: {
		PulseLoader
	},
  setup(){
    const listImages = ref([])
    const isLoaded = ref(true)
    const imagesLoadedCounter = ref(0)
    const carousel = ref(null)
    const slicedList = computed(() => listImages.value.slice(24,30))
    const scrollHandler = event => {
      event.preventDefault()
      carousel.value.scrollLeft += event.deltaY
    }
    const load = () => {
      imagesLoadedCounter.value++
      if(imagesLoadedCounter.value === slicedList.value.length){
        isLoaded.value = false
      }
    }
    onMounted(() => {
      getCarouselImages().then(data => listImages.value = [...data])
      carousel.value.addEventListener('wheel', scrollHandler)
    })
    onBeforeUnmount(() => {
      carousel.value.removeEventListener('wheel', scrollHandler)
    })
    return {
      carousel,
      isLoaded,
      load,
      slicedList
    }
  },
}
</script>

<style scoped lang="scss">
	.carousel-images {
		position: relative;
		min-height: 150px;
		max-height: 150px;
		display: flex;
		gap: 10px;
		overflow-x: scroll;
		img {
			max-height: 100%;
			max-width: 100%;
			width: 150px;
			border-radius: 10px;
			transition: opacity .3s ease-in-out;
		}
	}
	.transparent {
		opacity: 0;
	}
</style>
