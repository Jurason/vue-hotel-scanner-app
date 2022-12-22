<template>
	<div class="item__hotel-info__start-rate">
		<img class="active" v-for="index in ratingToShow" :key="index" src="../assets/star-active.svg" :alt="index">
		<img class="inactive" v-for="index in starsToShow" :key="index" src="../assets/star.svg" :alt="index">
	</div>
</template>

<script>
export default {
	name: "StarRatingComponent",
	props: {
		rating: {
			type: Number,
			required: true,
			validator(value) {
				return value < 6 && value >= 0
			}
		}
	},
	computed: {
		ratingToShow(){
			return this.rating < 0 ? 0
					: this.rating > 5 ? 5 : this.rating
		},
		starsToShow(){
			return 5 - this.ratingToShow
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