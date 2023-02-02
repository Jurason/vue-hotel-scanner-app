<template>
	<router-view/>
</template>
<script>

export default {
	name: 'App',
	async mounted() {
		const loginStatus = localStorage.getItem('login-status')
		if(!loginStatus || loginStatus !== '1'){
			this.$router.push({name: 'LoginView'})
		}
		this.initialState.checkIn = new Date()
		if(localStorage.getItem('geo-location')){
			this.initialState.location = localStorage.getItem('geo-location')
		}
	},
	data(){
		return {
			initialState: {
				location: 'Kyiv',
				checkIn: null,
				days: 2
			},
		}
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
