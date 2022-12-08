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
		<button
				@click="searchQueryConfirm"
				class="popup__confirm-button">
			Search
		</button>
	</div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
	name: "SearchBoard",
	components: {
		Datepicker
	},
	emits: {
		'search-query': payload => typeof payload === 'object'
	},
	mounted(){
		this.checkInDate = new Date()
		Date.prototype.addDays = function(days) {
			const date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		}
	},
	data(){
		return {
			location: 'Kyiv',
			checkInDate: null,
			days: 1,
		}
	},
	computed: {
		checkOutDate(){
			return this.checkInDate.addDays(this.days)
		}
	},
	methods: {
		searchQueryConfirm(){
			if(!this.location || !this.days || !this.checkInDate){
				return
			}
			const searchQuery = {
				location: this.location,
				checkIn: this.dateFormatHandler(this.checkInDate),
				checkOut: this.dateFormatHandler(this.checkOutDate),
				days: this.days
			}
			this.$emit('search-query', searchQuery)
		},
		dateFormatHandler(date){
			return date.toISOString().split('T')[0]
		},
	}
}
</script>

<style lang="scss">
.search-board {
	min-width: 360px;
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

	.popup__confirm-button {
		height: 50px;
		background: linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
		border-radius: 4px;
		color: #fff;
	}
}
</style>