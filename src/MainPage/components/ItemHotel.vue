<template>
		<slot name="avatar"></slot>
		<div class="item__hotel-info">
			<div class="item__hotel-info__title">
				{{ item.hotelName }}
			</div>
			<div class="item__hotel-info__start-date">
				{{ item.checkInDate }} &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {{ item.days }} days
			</div>
			<div class="item__hotel-info__start-rate">Stars {{ item.stars }}</div>
		</div>
		<div class="item__price-sign">Price:</div>
		<div class="item__right-block">
			<div
					class="item__right-block__like-button"
					@click="clickHandler"
					:class="{ 'button-active' : isAddedToFav }"
			/>
			<div class="item__right-block__price">
				{{ item.priceAvg }} $
			</div>
		</div>

</template>

<script>
export default {
	name: "ItemHotel",
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
	color: #878787;
}
.item__right-block {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}


.item__right-block__like-button {
	mask: url("../../assets/like-button.svg") no-repeat 50% 50%;
	mask-size: cover;
	background-color: #2c2b2b;
	width: 21px;
	height: 18px;
	cursor: pointer;
}
.item__right-block__like-button:hover {
	background-color: #EBEBEB;
}
.item__right-block__like-button:active {
	background-color: #E55858;
}
.button-active {
	background-color: #E55858;
}

</style>