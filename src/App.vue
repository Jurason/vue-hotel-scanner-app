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
		this.initialState.date = new Date()
	},
	data(){
		return {
			initialState: {
				location: 'Kyiv',
				date: null,
				days: 2,
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
