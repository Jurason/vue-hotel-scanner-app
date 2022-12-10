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
	</div>
</template>

<script>
import SearchBoard from "./components/SearchBoard.vue";
import FavouritesBoard from "./components/FavouritesBoard.vue";
import MainBoard from './components/MainBoard/MainBoard.vue';
import { getHotels } from '../api.js'

export default {
	name: "MainView",
	components: {
		SearchBoard,
		FavouritesBoard,
		MainBoard
	},
	mounted() {
		this.listHotels = JSON.parse(localStorage.getItem('hotels-list'))
		this.favorites = JSON.parse(localStorage.getItem('favourite-list'))
		this.currentLocation = this.$root.$data.initialState.location
		this.currentCheckInDate = this.$root.$data.initialState.date
		this.currentDays = this.$root.$data.initialState.days

		this.listHandler()
	},
	data() {
		return {
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
			const {location, checkIn, days} = query
			this.currentLocation = location
			this.currentCheckInDate = checkIn
			this.currentDays = days
			this.listHotels = await getHotels(query)
			this.listHandler()
		},
		listHandler() {
			this.listHotels.forEach(hotel => Object.assign(hotel, {
				checkInDate: this.dateFormatHandler(this.currentCheckInDate),
				days: this.currentDays,
				addedToFav: false,
			}))
		},
		dateFormatHandler(date) {
			const [month, day, year] = date.toDateString().split(' ').slice(1)
			return `${day} ${month} ${year}`
		},
		logOut(){
			this.$router.push({name: 'LoginView'})
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
		cursor: pointer;
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
//.search-board {
//	grid-area: searchBar;
//}
//.favourites {
//	grid-area: favourites;
//}
//.main-board {
//	grid-area: main;
//}

</style>