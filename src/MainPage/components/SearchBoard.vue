<template>
	<div class="container popup search-board ">
		<div class="popup__fields">
			<div class="popup__field">
				<div class="popup__field__title">Location</div>
				<input type="text" class="popup__field__input" v-model="location">
			</div>
			<div class="popup__field">
				<div class="popup__field__title">Check-in date</div>
				<Datepicker
						v-model="checkInDate"
						:enable-time-picker="false"
				/>
			</div>
			<div class="popup__field">
				<div class="popup__field__title">Days</div>
				<input type="text" class="popup__field__input" v-model="days">
			</div>
		</div>
		<ButtonBase
				:disabled="buttonDisabled"
				name="Search"
				@click="searchQueryConfirm"
				class="popup__confirm-button"
		/>
	</div>
</template>

<script>
import ButtonBase from "../../components/ButtonBase.vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getLocationCity } from "../../api.js";

export default {
	name: "SearchBoard",
	components: {
		Datepicker,
		ButtonBase
	},
	emits: {
		'search-query': payload => typeof payload === 'object'
	},
	async mounted(){
		this.checkInDate = this.$root.$data.initialState.checkIn
		this.days = this.$root.$data.initialState.days
		if(!localStorage.getItem('geo-location')){
			this.$root.$data.initialState.location = await getLocationCity()
			localStorage.setItem('geo-location', this.$root.$data.initialState.location)
		}
		this.location = this.$root.$data.initialState.location
	},
	data(){
		return {
			location: null,
			checkInDate: null,
			days: 1,
		}
	},
	computed: {
		buttonDisabled(){
			return !(this.checkInDate && this.days && this.location)
		}
	},
	methods: {
		searchQueryConfirm(){
			if(!this.location || !this.days || !this.checkInDate){
				return
			}
			const searchQuery = {
				location: this.location,
				checkIn: this.checkInDate,
				days: this.days
			}
			this.$emit('search-query', searchQuery)
		},
	}
}
</script>

<style lang="scss">
.search-board {
	max-height: 410px;
	min-width: 360px;
	padding: 32px;
}
.popup {
	display: flex;
	flex-direction: column;
	gap: 32px;
	justify-content: space-between;
	color: #424242;
	.popup__title {
		text-align: center;
		font-weight: 500;
		font-size: 24px;
	}
	.popup__fields {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;

		.popup__field {
			display: flex;
			flex-direction: column;
			gap: 7px;
			text-align: left;

			&__title {
				font-size: 16px;
			}
			&__input {
				height: 50px;
				outline: none;
				padding: 15px;
				border: 1px solid #C9CACC;
				border-radius: 4px;
			}
		}
	}
	button {
		height: 50px;
	}
}
</style>