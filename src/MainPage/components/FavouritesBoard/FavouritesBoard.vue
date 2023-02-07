<template>
	<div class="favourites container">
		<div class="favourites__title">Favourites</div>
		<FiltersOptions
				:no-favourites="!favouriteHotelsLength"
				@change-filter-options="updateFilterOptions($event)"
		/>
		<ListHotels
			:hotels-list="favouriteHotels"
			:filter-options="filter"
		>
			<template v-slot:item="slotProps">
				<div class="hotel-list__item">
					<ItemHotel
							@remove-from-favourite="removeFromFavourites($event)"
							:item="slotProps.item"
					/>
				</div>
			</template>
		</ListHotels>
	</div>
</template>
<script>
import ListHotels from "../../components/ListHotels.vue";
import ItemHotel from "../../components/ItemHotel.vue";
import FiltersOptions	from "./components/FiltersOptions.vue";
import { ref, computed } from 'vue'
export default {
	name: "FavouritesBoard",
	components: {
		ListHotels,
		ItemHotel,
		FiltersOptions
	},
	props: {
		favouriteHotels: {type: Array, required: true}
	},
	setup(props, { emit }){
		const filter = ref(null)
    const updateFilterOptions = newOptions => filter.value = newOptions
		const removeFromFavourites = item => {
			emit('remove-from-favourite', item)
		}
		const favouriteHotelsLength = computed(() => props.favouriteHotels.length)
		return {
			favouriteHotelsLength,
			removeFromFavourites,
			filter,
      updateFilterOptions
		}
	},
}
</script>
<style lang="scss">
	.favourites {
		width: 360px;
		height: 470px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 32px;
		padding: 32px;
		&__title {
			font-size: 24px;
			font-weight: 500;
			text-align: left;
		}
		.hotel-list__item {
			display: grid;
			min-width: 100%;
			min-height: 74px;
			grid-template-columns: 4fr 1fr 2fr;
			justify-content: space-between;
			padding: 16px 16px 16px 0;
			.date-tab {
				margin: 0 10px;
			}
		}
	}

</style>