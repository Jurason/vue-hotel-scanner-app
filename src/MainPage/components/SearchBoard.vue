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
						class="datepicker"
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
import { onMounted, ref, computed } from "vue";
import { testFunction } from "../../api";

export default {
	name: "SearchBoard",
	emits: {
		'search-query': payload => typeof payload === 'object'
	},
	setup(props, context){
		const location = ref(null)
		const checkInDate = ref(new Date())
		const days = ref(3)
		onMounted(async () => {
			const { getState } = await testFunction()
			location.value = getState ? location.value = localStorage.getItem('geo-location') : 'Kyiv'
		})
		const searchQueryConfirm = () => {
			if(!location.value || !days.value || !checkInDate.value){
				return
			}
			const searchQuery = {
				location: location.value,
				checkIn: checkInDate.value,
				days: Number(days.value)
			}
			context.emit('search-query', searchQuery)
		}

		const buttonDisabled = computed(() => !(days.value && checkInDate.value && location.value))

		return {
			location,
			checkInDate,
			days,
			searchQueryConfirm,
			buttonDisabled
		}
	},
}
</script>

<style lang="scss">
.datepicker input{
	height: 50px;
}
.search-board {
	height: 410px;
	max-width: 360px;
	padding: 32px;
	.popup__field {
		&__title {
			font-size: 16px;
			line-height: 19px;
		}
	}
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