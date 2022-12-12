<template>
	<div class="favourites__filters">
		<FilterButton @click="filterOptionHandler('byRating')" name="Rating" :filter-prop="filter.byRating"/>
		<FilterButton @click="filterOptionHandler('byName')" name="Name" :filter-prop="filter.byName"/>
	</div>
</template>

<script>
import FilterButton from "./FilterButton.vue";
export default {
	name: "FiltersOptions",
	components: {
		FilterButton
	},
	props: {
		noFavourites: {type: Boolean, required: false}
	},
	emits: {
		'change-filter-options': (payload) => typeof payload === 'object'
	},
	data(){
		return {
			filter: {
				byRating: {
					asc: false,
					desc: false
				},
				byName: {
					asc: false,
					desc: false
				},
			}
		}
	},
	methods: {
		filterOptionHandler(option){
			if(this.noFavourites){
				return
			}
			if(!this.filter[option].asc && !this.filter[option].desc){
				this.filter[option].asc = true
				Object.keys(this.filter).filter(key => key !== option)
						.forEach(key => Object.keys(this.filter[key])
								.forEach(innerKey => this.filter[key][innerKey] = false))
				return
			}
			this.filter[option].asc = !this.filter[option].asc
			this.filter[option].desc = !this.filter[option].desc
		},
		filterOptionsDisabled(){
			Object.keys(this.filter)
					.forEach(key => Object.keys(this.filter[key])
							.forEach(innerKey => this.filter[key][innerKey] = false))
		}
	},
	watch: {
		filter: {
			deep: true,
			handler(){
				this.$emit('change-filter-options', this.filter)
			}
		},
		noFavourites(newValue){
			if(newValue){
				this.filterOptionsDisabled()
			}
		}
	}
}
</script>

<style scoped>

</style>