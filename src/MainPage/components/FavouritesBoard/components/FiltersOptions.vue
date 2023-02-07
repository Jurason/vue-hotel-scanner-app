<template>
	<div class="favourites__filters">
		<FilterButton @click="filterOptionHandler('byRating')" name="Rating" :filter-prop="filter.byRating"/>
		<FilterButton @click="filterOptionHandler('byName')" name="Name" :filter-prop="filter.byName"/>
	</div>
</template>

<script>
import FilterButton from "./FilterButton.vue";
import {reactive, toRef, watch} from "vue";
export default {
	name: "FiltersOptions",
	components: {
		FilterButton
	},
	props: {
		noFavourites: {type: Boolean, required: false}
	},
	emits: {
		'change-filter-options': (payload) => typeof payload === 'object'
	},
  setup(props, { emit }){
    const filter = reactive({
      byRating: {
        asc: false,
        desc: false
      },
      byName: {
        asc: false,
        desc: false
      },
    })
    const filterOptionHandler = option => {
      if(noFavourites.value){
        return
      }
      if(!filter[option].asc && !filter[option].desc){
        filter[option].asc = true
        Object.keys(filter).filter(key => key !== option)
            .forEach(key => Object.keys(filter[key])
                .forEach(innerKey => filter[key][innerKey] = false))
        return
      }
      filter[option].asc = !filter[option].asc
      filter[option].desc = !filter[option].desc
    }
    const filterOptionsDisabled = () => {
      Object.keys(filter)
          .forEach(key => Object.keys(filter[key])
              .forEach(innerKey => filter[key][innerKey] = false))
    }
    watch(filter, () => {
      emit('change-filter-options', filter)
    })

		const noFavourites = toRef(props, 'noFavourites')
    watch(noFavourites, (newValue) => {
      if(newValue) filterOptionsDisabled()
    })
    return {
      filter,
      filterOptionHandler,
      filterOptionsDisabled
    }
  },
}
</script>

<style lang="scss">

.favourites__filters {
	display: flex;
	align-items: flex-start;
	gap: 8px;
}
</style>