<template>
		<slot name="avatar"></slot>
		<div class="item__hotel-info">
			<div class="item__hotel-info__title">
				{{ item.hotelName }}
			</div>
			<div class="item__hotel-info__start-date">
				{{ item.checkInDate }}<span class="date-tab">-</span>{{ item.days }} days
			</div>
			<StarRatingComponent :rating="item.stars"/>
		</div>
		<div class="item__price-sign">Price: </div>
		<div class="item__right-block">
			<svg @click="clickHandler" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path :class="{ 'button-active' : isAddedToFav }" class="item__right-block__like-button" d="M20.3807 2.59133C19.8676 2.08683 19.2583 1.68663 18.5878 1.41358C17.9172 1.14054 17.1985 1 16.4727 1C15.7468 1 15.0281 1.14054 14.3576 1.41358C13.687 1.68663 13.0778 2.08683 12.5646 2.59133L11.4997 3.63785L10.4348 2.59133C9.39834 1.57276 7.99258 1.00053 6.52679 1.00053C5.06099 1.00053 3.65523 1.57276 2.61876 2.59133C1.58229 3.6099 1 4.99139 1 6.43187C1 7.87235 1.58229 9.25383 2.61876 10.2724L3.68367 11.3189L11.4997 19L19.3158 11.3189L20.3807 10.2724C20.8941 9.76814 21.3013 9.16942 21.5791 8.51045C21.857 7.85148 22 7.14517 22 6.43187C22 5.71857 21.857 5.01225 21.5791 4.35328C21.3013 3.69431 20.8941 3.09559 20.3807 2.59133Z" fill="white" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<div class="item__right-block__price">
				{{ item.priceAvg.toFixed(2) }}$
			</div>
		</div>
</template>

<script>
import StarRatingComponent from "../../components/StarRatingComponent.vue";

export default {
	name: "ItemHotel",
	components: {
		StarRatingComponent
	},
	props: {
		item: {type: Object, required: true},
	},
	emits: {
		'add-to-favourite': payload => typeof payload === 'object',
		'remove-from-favourite': payload => typeof payload === 'object',
	},
	computed: {
		isAddedToFav(){
			return this.item.addedToFav
		}
	},
	methods: {
		clickHandler(){
			this.item.addedToFav = !this.item.addedToFav
			if(this.isAddedToFav){
				this.$emit('add-to-favourite', this.item)
				return
			}
			this.$emit('remove-from-favourite', this.item)
		}
	}
}
</script>
<style lang="scss">
.item {
	//min-height: 100px;
	//padding: 16px;
	&__hotel-info {
		 display: flex;
		 flex-direction: column;
		 justify-content: space-between;
		 text-align: left;
		&__title {
			font-size: 17px;
			line-height: 22px;
			text-align: left;
		}
		&__start-date {
			font-size: 14px;
			line-height: 22px;
			text-align: left;
			color: #878787;
		}
	 }
}
.item__price-sign {
	align-self: flex-end;
	text-align: right;
	font-size: 11px;
	line-height: 18px;
	color: #878787;
}
.item__right-block {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	&__price {
		font-size: 17px;
		font-weight: 400;
		line-height: 22px;
	}
}

.item__right-block__like-button {
	cursor: pointer;
	transition: all .3s ease-in-out;
}
.item__right-block__like-button:hover {
	fill: #EBEBEB;
}
.item__right-block__like-button:active {
	fill: #E55858;
}
.button-active {
	fill: #E55858;
}

</style>