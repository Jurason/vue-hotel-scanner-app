<template>
	<div class="hotels-list">
		<div class="hotel-item" v-for="item in filteredList.value" :key="item.id">
			<slot name="item" :item="item"/>
			<hr class="item__bottom-line">
		</div>
	</div>
</template>

<script>
import { computed, toRef, toRefs } from "vue";

export default {
	name: "ListHotels",
	props: {
		hotelsList: {type: Array, required: true},
		filterOptions: {type: Object, required: false}
	},
  setup(props){
    const { hotelsList } = toRefs(props)
    const filterOptions = toRef(props, 'filterOptions')
    const filteredList = computed(() => {
      if(!filterOptions?.value){
        return hotelsList
      }
      if(filterOptions.value.byRating.asc){
        hotelsList.value.sort((a,b) => a.priceAvg - b.priceAvg)
      }
      if(filterOptions.value.byRating.desc){
        hotelsList.value.sort((a,b) => b.priceAvg - a.priceAvg)
      }
      if(filterOptions.value.byName.desc){
        hotelsList.value.sort((a, b) => {
          const nameA = a.hotelName.toUpperCase()
          const nameB = b.hotelName.toUpperCase()
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        })
      }
      if(filterOptions.value.byName.asc){
        hotelsList.value.sort((a, b) => {
          const nameA = a.hotelName.toUpperCase()
          const nameB = b.hotelName.toUpperCase()
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
        })
      }
      return hotelsList
    })
    return {
      filteredList
    }
  },
}
</script>

<style scoped>
* {
	list-style: none;
	padding: 0;
}
.hotels-list {
	overflow-y: scroll;
}
.hotel-item {
	padding: 0 16px 0 0;
	overflow-y: hidden;
}
.item__bottom-line {
	background: rgba(135, 135, 135);
	width: 100%;
	opacity: .2;
	margin: 0;
}
</style>