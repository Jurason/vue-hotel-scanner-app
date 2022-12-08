<template>
	<div class="main-board container">
		<header class="main-board__header">
			<div class="main-board__header__left-block">
				Hotels
				<img src="../../../assets/arrow-right.svg" alt="">
				{{ location }}
			</div>
			<div class="main-board__header__right-block">
				{{ checkInDate }}
			</div>
		</header>
		<CarouselImages/>
		<div class="main-board__list-header">
			Added to favourite {{ favouriteCounter }} hotels
		</div>
		<ListHotels
		 :hotels-list="hotelsList">
			<template v-slot:item="slotProps">
				<div class="hotel-list__item">
					<ItemHotel
							@add-to-favourite="addToFavourite($event)"
							@remove-from-favourite="removeFromFavourite($event)"
							:item="slotProps.item"
					>
						<template #avatar>
							<div class="item__image">
								<img src="" alt="Image">
							</div>
						</template>
					</ItemHotel>
				</div>
			</template>
		</ListHotels>
	</div>
</template>

<script>
import CarouselImages from "./components/CarouselImages.vue";
import ListHotels from "../ListHotels.vue";
import ItemHotel from "../ItemHotel.vue";
export default {
	name: "MainBoard",
	components: {
		CarouselImages,
		ListHotels,
		ItemHotel
	},
	props: {
		hotelsList: {type: Array, required: true},
		location: {type: String, required: true, default: 'Kyiv'},
		checkInDate: {type: String, required: false},
		favouriteCounter: {type: Number, required: true, default: 0}
	},

	methods: {
		addToFavourite(item){
			this.$emit('add-to-favourite', item)
		},
		removeFromFavourite(item){
			this.$emit('remove-from-favourite', item)
		},
	}
}
</script>

<style lang="scss">
.main-board {
	grid-row: span 2;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	.main-board__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 28px;
		&__left-block {
			font-size: 32px;
			font-weight: 500;
		}
		&__right-block {
			font-size: 24px;
			font-weight: 400;
			text-align: right;
		}
	}
	.main-board__list-header {
		margin: 28px auto 12px 0;
	}
	.hotel-list__item {
		display: grid;
		min-width: 100%;
		grid-template-columns: 1fr 4fr 1fr 2fr;
		justify-content: space-between;
	}
}

</style>