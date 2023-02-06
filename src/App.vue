<template>
	<router-view/>
</template>
<script>

import {useRouter } from "vue-router";
import { onMounted, computed } from 'vue'
import {handleInitialStateGeoLocation, loginStateHandler} from "./api";
export default {
	name: 'App',
	setup() {
		onMounted(async () => {
			await loginStateHandler()
			await handleInitialStateGeoLocation()
		})
	},
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
