<template>
	<router-view/>
</template>
<script>
import { getLocationCity } from "./api.js";

export default {
	name: 'App',
	mounted() {
		// this.initialState.city = getLocationCity()
	},
	data(){
		return {
			initialState: {
				city: 'Kyiv',

			}
		}
	},
	methods: {

	}
}
</script>
<style>
#app {
	min-height: 100vh;
	min-width: 100vw;
	padding: 0;
	margin: 0;
	max-width: 100vw;
}
* {
	box-sizing: border-box;
}
img {
	max-width: 100%;
	max-height: 100%;
}
</style>
