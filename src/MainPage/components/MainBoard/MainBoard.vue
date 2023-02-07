<template>
	<div class="main-board container">
		<header class="main-board__header">
			<div class="main-board__header__left-block">
				Hotels
				<img src="../../../assets/arrow-right.svg" alt="">
				{{ location }}
			</div>
			<div class="main-board__header__right-block">
				{{ handledDate }}
			</div>
		</header>
		<CarouselImages/>
		<div class="main-board__list-header">
			Added to Favourites: <span>{{ favouriteCounter }}</span> hotels
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
								<img class="img-house" src="../../../assets/house.svg" alt="Image">
								<img class="img-circle" src="../../../assets/Ellipse.svg" alt="Image">
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
import {computed, toRef, toRefs} from "vue";
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
		checkInDate: {type: Object, required: false, default: '01 June 2022'},
		favouriteCounter: {type: Number, required: true, default: 0}
	},
  setup(props, { emit }){
    const { hotelsList, location, favouriteCounter  } = toRefs(props)
    const checkInDate = toRef(props, 'checkInDate')
    const dateFormatHandler = date => {
      const [month, day, year] = date.toDateString().split(' ').slice(1)
      return `${day} ${month} ${year}`
    }
    const handledDate = computed(() => checkInDate.value ? dateFormatHandler(checkInDate.value) : '')
    const addToFavourite = item => {
      emit('add-to-favourite', item)
    }
    const removeFromFavourite = item => {
      emit('remove-from-favourite', item)
    }
    return {
      hotelsList,
      location,
      favouriteCounter,
      handledDate,
      addToFavourite,
      removeFromFavourite
    }
  },
}
</script>

<style lang="scss">
.main-board {
	max-height: 904px;
	max-width: 664px;
	grid-row: span 2;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 48px 32px;
	color: #424242;
	.main-board__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 28px;
		&__left-block {
			font-size: 32px;
			font-weight: 500;
			img {
				margin: 0 20px;
			}
		}
		&__right-block {
			font-size: 24px;
			font-weight: 400;
			text-align: right;
			line-height: 29px;
			color: #41522E;
		}
	}
	.main-board__list-header {
		margin: 28px auto 12px 0;
		span {
			font-weight: 600;
		}
	}
	.hotel-list__item {
		display: grid;
		min-height: 100px;
		min-width: 100%;
		grid-template-columns: 1fr 5fr 2fr 1fr;
		justify-content: space-between;
		padding: 16px 16px 16px 0;
		.date-tab {
			margin: 0 20px;
		}
	}
}
.item__image {
	position: relative;
	.img-house {
		position: absolute;
		top: calc(50% - 17.5px);
		left: calc(50% - 17.5px);
	}
	.img-circle {
		position: absolute;
		top: calc(50% - 32px);
		left: calc(50% - 32px);
	}
}
</style>