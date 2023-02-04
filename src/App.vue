<template>
	<router-view/>
</template>
<script>

import {useRouter } from "vue-router";
import { onMounted, computed } from 'vue'
import { getLocationCity, testFunction } from "./api";
export default {
	name: 'App',
	setup() {
		const router = useRouter()
		let location = 'Kyiv'
		onMounted(async () => {
			const loginStatus = localStorage.getItem('login-status')
			if(!loginStatus || loginStatus !== '1'){
				await router.push({name: 'LoginView'})
			}
			await testFunction()
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
