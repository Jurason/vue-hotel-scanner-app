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
export default {
	name: "CarouselImages",
	components: {
		PulseLoader
	},
	mounted(){
		getCarouselImages().then(data => this.listImages = data)
		this.$refs.carousel.addEventListener('wheel', this.scrollHandler)
	},
	beforeUnmount() {
		this.$refs.carousel.removeEventListener('wheel', this.scrollHandler)
	},
	data(){
		return {
			listImages: [],
			isLoaded: true,
			imagesLoadedCounter: 0
		}
	},
	computed: {
		slicedList(){
			return this.listImages.slice(24,30)
		}
	},
	methods: {
		scrollHandler(event){
			event.preventDefault()
			this.$refs.carousel.scrollLeft += event.deltaY
		},
		load(){
			this.imagesLoadedCounter++
			if(this.imagesLoadedCounter === this.slicedList.length){
				this.isLoaded = false
			}
		}
	}
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
