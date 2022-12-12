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
			:favourite-counter="favouritesLength"
			:hotels-list="listHotels"
			:location="currentLocation || ''"
			:checkInDate="currentCheckInDate"
		/>
		<FavouritesBoard
			:favourite-hotels="favorites"
			@remove-from-favourite="removeFromFavourite($event)"
		/>
		<transition name="loader-transition">
			<SyncLoader size="30px" color="#BE8022" style="position: absolute; top: 50%; left: 50%" v-if="isLoading"/>
		</transition>
	</div>
	<div :class="{'foggy': isLoading}"></div>
</template>

<script>
import SearchBoard from "./components/SearchBoard.vue";
import FavouritesBoard from "./components/FavouritesBoard/FavouritesBoard.vue";
import MainBoard from './components/MainBoard/MainBoard.vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import { getHotels } from '../api.js'

export default {
	name: "MainView",
	components: {
		SearchBoard,
		FavouritesBoard,
		MainBoard,
		SyncLoader
	},
	props: {
	},
	async mounted() {
		this.currentLocation = this.$root.$data.initialState.location
		this.currentCheckInDate = this.$root.$data.initialState.checkIn
		this.currentDays = this.$root.$data.initialState.days

		this.listHotels = await getHotels(this.$root.$data.initialState)
		this.listHandler()
		this.favouritesListHandler()
	},
	data() {
		return {
			isLoading: false,
			listHotels: [],
			favorites: [],
			currentLocation: null,
			currentCheckInDate: null,
			currentDays: 1
		}
	},
	computed: {
		favouritesLength() {
			return Number(this.favorites.length)
		}
	},
	methods: {
		addToFavourite(item) {
			const copyItem = JSON.parse(JSON.stringify(item))
			this.favorites.push(copyItem)
		},
		removeFromFavourite(item) {
			this.favorites = this.favorites.filter(el => el.hotelId !== item.hotelId)
			const itemToRemove = this.listHotels.find(el => el.hotelId === item.hotelId)
			if (itemToRemove) {
				itemToRemove.addedToFav = false
			}
		},
		async searchQueryHandler(query) {
			this.isLoading = true
			const {location, checkIn, days} = query
			this.currentLocation = location
			this.currentCheckInDate = checkIn
			this.currentDays = days
			this.listHotels = await getHotels(query)
			this.isLoading = false
			this.listHandler()
		},
		listHandler() {
			this.listHotels.forEach(hotel => Object.assign(hotel, {
				checkInDate: this.dateFormatHandler(this.currentCheckInDate),
				days: this.currentDays,
				addedToFav: false,
			}))
		},
		favouritesListHandler(){
			this.favorites = JSON.parse(localStorage.getItem('favourite-list')) || []
			this.favorites.forEach(hotel => {
				const item = this.listHotels.find(el => el.hotelId === hotel.hotelId)
				if(item){
					item.addedToFav = true
				}
			})
		},
		dateFormatHandler(date) {
			const [month, day, year] = date.toDateString().split(' ').slice(1)
			return `${day} ${month} ${year}`
		},
		logOut(){
			this.$router.push({name: 'LoginView'})
			localStorage.removeItem('favourite-list')
			localStorage.removeItem('geo-location')
			localStorage.setItem('login-status', '0')
		}
	},
	watch: {
		favouritesLength() {
			localStorage.setItem('favourite-list', JSON.stringify(this.favorites))
		}
	}
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
	position: absolute;
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
	display: grid;
	grid-gap: 24px;
	grid-template-columns: 1fr 2fr;
	margin: 0 12% 26px 10%;
	.main__comp {
		background: #fff;
		border: 1px solid black;
	}
}
</style>