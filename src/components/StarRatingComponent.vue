<template>
	<div class="item__hotel-info__start-rate">
		<img v-for="index in rating" :key="index" src="../assets/star-active.svg" :alt="index">
		<img v-for="index in stars" :key="index" src="../assets/star.svg" :alt="index">
	</div>
</template>

<script>
export default {
	name: "StarRatingComponent",
	props: {
		rating: {type: Number, required: true}
	},
	computed: {
		stars(){
			return 5 - this.rating
		}
	}
}
</script>

<style lang="scss">
	.item__hotel-info__start-rate {
		display: flex;
		gap: 5px;
	}

</style>