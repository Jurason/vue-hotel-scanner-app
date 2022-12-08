<template>
		<slot name="avatar"></slot>
		<div class="item__hotel-info">
			<div class="item__hotel-info__title">
				{{ item.hotelName }}
			</div>
			<div class="item__hotel-info__start-date">
				{{ item.checkInDate }} - {{ item.days }} days
			</div>
			<div class="item__hotel-info__start-rate">Stars {{ item.stars }}</div>
		</div>
		<div class="item__price-sign">Price</div>
		<div class="item__right-block">
			<img
					@click="clickHandler"
					class="item__right-block__like-button"
					:class="{ 'button-active' : isAddedToFav }"
					src="../../assets/like-button.svg" alt="">
			<div class="item__right-block__like-button"></div>
			<div class="item__right-block__price">
				{{ item.priceAvg }} $
			</div>
		</div>
	<hr class="item__bottom-line">
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
	mounted() {
	},
	data(){
		return {

		}
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
	min-height: 100px;
	&__hotel-info {
		 display: flex;
		 flex-direction: column;
		justify-content: space-between;
		 text-align: left;
		&__title {
			font-size: 17px;
			font-weight: 300;
			text-align: left;
		}
	 }
}
.item__right-block__like-button {
	background-color: blue;
}
.button-active {
	background-color: red;
}
//.item__right-block__like-button {
//	mask: url("../../assets/like-button.svg") no-repeat 50% 50%;
//	mask-size: cover;
//	background-color: red;
//	width: 24px;
//	height: 24px;
//}

</style>