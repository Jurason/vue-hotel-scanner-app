<template>
	<div class="hotels-list">
		<div v-for="item in filteredList" :key="item.id">
			<slot name="item" :item="item"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "ListHotels",
	props: {
		hotelsList: {type: Array, required: true},
		filteredOptions: {type: Object, required: false}
	},
	computed: {
		filteredList(){
			if(!this.filteredOptions){
				return this.hotelsList
			}
			const filteredItems = this.hotelsList
			if(this.filteredOptions.byRating.asc){
				filteredItems.sort((a,b) => a.priceAvg - b.priceAvg)
			}
			if(this.filteredOptions.byRating.desc){
				filteredItems.sort((a,b) => b.priceAvg - a.priceAvg)
			}
			if(this.filteredOptions.byName.desc){
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
			if(this.filteredOptions.byName.asc){
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
	overflow-y: scroll;
	padding: 0;
}

</style>