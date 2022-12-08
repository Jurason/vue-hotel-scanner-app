<template>
	<div ref="carousel" class="carousel-images">
		<img v-for="img in listImages" :key="img.id" :src="img.download_url" alt="">
	</div>
</template>

<script>
import { getCarouselImages } from "../../../../api.js";

export default {
	name: "CarouselImages",
	mounted(){
		getCarouselImages().then(data => this.listImages = data)

		this.$refs.carousel.addEventListener('wheel', this.scrollHandler)
	},
	data(){
		return {
			listImages: []
		}
	},
	methods: {
		scrollHandler(event){
			event.preventDefault()
			this.$refs.carousel.scrollLeft += event.deltaY
		}
	}
}
</script>

<style lang="scss">
	.carousel-images {
		max-height: 150px;
		display: flex;
		gap: 10px;
		overflow-x: scroll;
		img {
			max-height: 100%;
			max-width: 100%;
			width: 150px;
			border-radius: 10px;
		}
	}
</style>

<!--0: Object { id: "0", author: "Alejandro Escamilla", width: 5000, … }-->
<!--author: "Alejandro Escamilla"-->
<!--download_url: "https://picsum.photos/id/0/5000/3333"-->
<!--height: 3333-->
<!--id: "0"-->
<!--url: "https://unsplash.com/photos/yC-Yzbqy7PY"-->
<!--width: 5000-->