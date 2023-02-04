<template>
	<nav>
		<div class="nav-left">Simple Hotel Check</div>
		<div class="nav-right">
			Log out
			<img @click="logOut" src="../assets/exit-icon.svg" alt="">
		</div>
	</nav>
	<div class="main__container">
		<SearchBoard
			@search-query="searchQueryHandler($event)"
		/>
		<MainBoard
			@add-to-favourite="addToFavourite($event)"
			@remove-from-favourite="removeFromFavourite($event)"
			:favourite-counter="favoritesListLength"
			:hotels-list="listHotels"
			:location="currentLocation || ''"
			:checkInDate="currentCheckInDate"
		/>
		<FavouritesBoard
			:favourite-hotels="favorites"
			@remove-from-favourite="removeFromFavourite($event)"
		/>
		<transition name="loader-transition">
			<SyncLoader size="30px" color="#BE8022" style="position: fixed; top: 50%; left: 50%" v-if="isLoading"/>
		</transition>
	</div>
	<div :class="{'foggy': isLoading}"></div>
</template>

<script>
import SearchBoard from "./components/SearchBoard.vue";
import FavouritesBoard from "./components/FavouritesBoard/FavouritesBoard.vue";
import MainBoard from './components/MainBoard/MainBoard.vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import {getHotels, testFunction} from '../api.js'
import {ref, onMounted, computed, watch, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
	name: "MainView",
	components: {
		SearchBoard,
		FavouritesBoard,
		MainBoard,
		SyncLoader
	},
	setup(){
		let currentLocation = ref('Kyiv'), currentCheckInDate = new Date(), currentDays = 2
		const listHotels = ref([])
		let favorites = ref([])
		let isLoading = false
		const defaultState = {
			location: 'Kyiv',
			checkIn: currentCheckInDate,
			days: currentDays
		}
		const getHotelsList = async (query) => {
			listHotels.value = await getHotels(query)
			listHandler(listHotels.value)
		}
		function dateFormatHandler(date){
			const [month, day, year] = date.toDateString().split(' ').slice(1)
			return `${day} ${month} ${year}`
		}
		const listHandler = list => {
			list.forEach(hotel => Object.assign(hotel, {
				checkInDate: dateFormatHandler(currentCheckInDate),
				days: currentDays,
				addedToFav: false,
			}))
		}
		function favouritesListHandler(){
			favorites.value = JSON.parse(localStorage.getItem('favourite-list')) || []
			console.log('favorites.value:', favorites.value)
			favorites.value.forEach(hotel => {
				const item = listHotels.value.find(el => el.hotelId === hotel.hotelId)
				if(item){
					item.addedToFav = true
				}
			})
		}
		async function searchQueryHandler(query) {
			const {location, checkIn, days} = query
			currentLocation = location
			currentCheckInDate = checkIn
			currentDays = days
			isLoading = true
			listHotels.value = await getHotels(query)
			isLoading = false
			listHandler(listHotels.value)
		}

		function addToFavourite(item) {
			const copyItem = JSON.parse(JSON.stringify(item))
			favorites.value.push(copyItem)
			localStorage.setItem('favourite-list', JSON.stringify(favorites.value))
		}
		function removeFromFavourite(item) {
			favorites.value = favorites.value.filter(el => el.hotelId !== item.hotelId)
			const itemToRemove = listHotels.value.find(el => el.hotelId === item.hotelId)
			if (itemToRemove) {
				itemToRemove.addedToFav = false
				console.log('itemToRemove:', itemToRemove)
			}
			localStorage.setItem('favourite-list', JSON.stringify(favorites.value))
		}
		const favoritesListLength = computed(() => favorites.value.length)

		const router = useRouter()
		function logOut(){
			router.push({name: 'LoginView'})
			localStorage.removeItem('favourite-list')
			localStorage.removeItem('geo-location')
			localStorage.setItem('login-status', '0')
		}

		onMounted(async () => {
			const { getState } = await testFunction()
			if(getState){
				const location = localStorage.getItem('geo-location')
				await getHotelsList(Object.assign(defaultState, { location }))
				currentLocation.value = location
			} else {
				await getHotelsList(defaultState)
			}
			favouritesListHandler()
		})

		return {
			currentLocation,
			currentCheckInDate,
			currentDays,
			listHotels: listHotels || [],
			favorites,
			isLoading,
			searchQueryHandler,
			favoritesListLength,
			addToFavourite,
			removeFromFavourite,
			logOut
		}
	},
}
</script>

<style lang="scss">
.loader-transition-enter-active,
.loader-transition-leave-active {
	transition: opacity 0.5s ease;
}

.loader-transition-enter-from,
.loader-transition-leave-to {
	opacity: 0;
}
.foggy {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: grey;
	opacity: .3;
}

body {
	background: #F4F4F4;
}
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 92px;
	padding: 32px;
	.nav-left {
		font-size: 24px;
		color: #424242;
	}
	.nav-right {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 16px;
		color: #41522E;
		img {
			cursor: pointer;
		}
	}
}
.container {
	background: #FFFFFF;
	box-shadow: 0 4px 33px rgba(0, 0, 0, 0.04);
	border-radius: 16px;
}
.main__container {
	max-width: fit-content;
	display: grid;
	grid-gap: 24px;
	grid-template-columns: 1fr 2fr;
	margin: 0 auto 26px auto;
	.main__comp {
		background: #fff;
		border: 1px solid black;
	}
}
</style>