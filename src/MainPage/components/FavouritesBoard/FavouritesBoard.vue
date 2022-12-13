<template>
	<div class="favourites container">
		<div class="favourites__title">Favourites</div>
		<FiltersOptions
				:no-favourites="!favouriteHotelsLength"
				@change-filter-options="filter = $event"
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
	data(){
		return {
			filter: null
		}
	},
	computed: {
		favouriteHotelsLength(){
			return !!this.favouriteHotels.length
		}
	},
	methods: {
		removeFromFavourites(item){
			this.$emit('remove-from-favourite', item)
		},
	}
}
</script>
<style lang="scss">
	.favourites {
		max-width: 360px;
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
		&__filters {
			display: flex;
			align-items: flex-start;
			gap: 8px;
			&__sort {
				display: flex;
				align-items: center;
				gap: 4px;
				padding: 4px 8px;
				border: 1px solid #E5E5E5;
				border-radius: 4px;
				color: #E5E5E5;
				cursor: pointer;
				.toggle {
					display: flex;
					flex-direction: column;
					.toggle-up, .toggle-down{
						opacity: .2;
					}
					.active-toggle {
						opacity: 1;
					}
				}
				.toggle-down {
					transform: rotate(180deg);
				}
			}
			.sort-rate {
				width: 89px;
				height: 28px;
			}
			.sort-price {
				width: 71px;
				height: 28px;
			}
		}
		.hotel-list__item {
			display: grid;
			min-width: 100%;
			min-height: 74px;
			grid-template-columns: 4fr 1fr 2fr;
			justify-content: space-between;
			padding: 16px 16px 16px 0;
		}
	}
	.active-sort-option {
		border-color: #41522E;
		color: #41522E;
	}
	.active-toggle {
		opacity: 1;
	}
</style>