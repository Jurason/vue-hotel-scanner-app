<template>
	<div class="hotels-list">
		<div class="hotel-item" v-for="item in filteredList" :key="item.id">
			<slot name="item" :item="item"/>
			<hr class="item__bottom-line">
		</div>
	</div>
</template>

<script>
export default {
	name: "ListHotels",
	props: {
		hotelsList: {type: Array, required: true},
		filterOptions: {type: Object, required: false}
	},
	computed: {
		filteredList(){
			if(!this.filterOptions){
				return this.hotelsList
			}
			const filteredItems = this.hotelsList
			if(this.filterOptions.byRating.asc){
				filteredItems.sort((a,b) => a.priceAvg - b.priceAvg)
			}
			if(this.filterOptions.byRating.desc){
				filteredItems.sort((a,b) => b.priceAvg - a.priceAvg)
			}
			if(this.filterOptions.byName.desc){
				filteredItems.sort((a, b) => {
					const nameA = a.hotelName.toUpperCase()
					const nameB = b.hotelName.toUpperCase()
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
				})
			}
			if(this.filterOptions.byName.asc){
				filteredItems.sort((a, b) => {
					const nameA = a.hotelName.toUpperCase()
					const nameB = b.hotelName.toUpperCase()
					if (nameA < nameB) {
						return 1;
					}
					if (nameA > nameB) {
						return -1;
					}
				})
			}
			return filteredItems
		}
	}
}
</script>

<style scoped>
* {
	list-style: none;
	padding: 0;
}
.hotels-list {
	overflow-y: scroll;
}
.hotel-item {
	padding: 0 16px 0 0;
	overflow-y: hidden;
}
.item__bottom-line {
	background: rgba(135, 135, 135);
	width: 100%;
	opacity: .2;
	margin: 0;
}
</style>