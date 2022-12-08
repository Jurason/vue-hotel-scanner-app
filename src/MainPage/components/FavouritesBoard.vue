<template>
	<div class="favourites container">
		<div class="favourites__title">Favourites</div>
		<div class="favourites__filters">
			<div
					class="favourites__filters__sort sort-rate"
					:class="{'active-sort-option' : filter.byRating.asc || filter.byRating.desc}"
					@click="filterRatingHandler"
			>
				<span>Rating</span>
				<div class="toggle">
					<img
							class="toggle-up" src="../../assets/select.svg" alt=""
							:class="{'active-toggle' : filter.byRating.asc }"
					>
					<img
							class="toggle-down" src="../../assets/select.svg" alt=""
							:class="{'active-toggle' : filter.byRating.desc }"
					>
				</div>
			</div>
			<div
					class="favourites__filters__sort sort-price"
					:class="{'active-sort-option' : filter.byName.asc || filter.byName.desc}"
					@click="filterNameHandler"
			>
				<span>Name</span>
				<div class="toggle">
					<img
							class="toggle-up" src="../../assets/select.svg" alt=""
							:class="{'active-toggle' : filter.byName.asc }"
					>
					<img
							class="toggle-down" src="../../assets/select.svg" alt=""
							:class="{'active-toggle' : filter.byName.desc }"
					>
				</div>
			</div>
		</div>
		<ListHotels
			:hotels-list="favouriteHotels"
			:filtered-options="filter"
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
import ListHotels from "./ListHotels.vue";
import ItemHotel from "./ItemHotel.vue";
export default {
	name: "FavouritesBoard",
	components: {
		ListHotels,
		ItemHotel
	},
	props: {
		favouriteHotels: {type: Array, required: true}
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
		removeFromFavourites(item){
			this.$emit('remove-from-favourite', item)
		},
		filterRatingHandler(){
			if(!this.filter.byRating.asc && !this.filter.byRating.desc){
				this.filter.byRating.asc = true
				this.filter.byName.asc = false
				this.filter.byName.desc = false
				return
			}
			this.filter.byRating.asc = !this.filter.byRating.asc
			this.filter.byRating.desc = !this.filter.byRating.desc
		},
		filterNameHandler(){
			if(!this.filter.byName.asc && !this.filter.byName.desc){
				this.filter.byName.asc = true
				this.filter.byRating.asc = false
				this.filter.byRating.desc = false
				return
			}
			this.filter.byName.asc = !this.filter.byName.asc
			this.filter.byName.desc = !this.filter.byName.desc
		}
	}
}
</script>
<style lang="scss">
	.favourites {
		min-width: 360px;
		height: 472px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 32px;
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
			grid-template-columns: 4fr 1fr 2fr;
			justify-content: space-between;
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