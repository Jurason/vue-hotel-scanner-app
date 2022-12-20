<template>
	<div class="login__backdrop"></div>
	<form @submit.prevent="submitForm" autocomplete="off" class="login__popup popup">
		<div class="popup__title">Simple Hotel Check</div>
		<div class="popup__fields">
			<div class="popup__field">
				<label :class="{'error-font' : !loginValid}" for="email" class="popup__field__title">Login</label>
				<input v-model="login" id="email" type="text" class="popup__field__input">
				<p v-if="!loginValid" class="error-message">Invalid email</p>
			</div>
			<div class="popup__field">
				<label :class="{'error-font' : !passwordValid}" for="pass" class="popup__field__title">Password</label>
				<input v-model="password" id="pass" type="text" class="popup__field__input">
				<p v-if="!passwordValid" class="error-message">Please enter a password of at least 8 characters</p>
			</div>
		</div>
		<ButtonBase :disabled="!formIsValid" name="Enter"/>
	</form>
</template>

<script>
export default {
	name: "LoginView",
	data(){
		return {
			login: '',
			loginValid: true,
			password: null,
			passwordValid: true,
		}
	},
	computed: {
		formIsValid(){
			return !this.login || !this.password ? false : this.loginValid && this.passwordValid
		}
	},
	methods: {
		submitForm(){
			if(this.loginValid && this.passwordValid){
				this.$router.push({name: 'MainView'})
				localStorage.setItem('login-status', '1')
				//sql request to DB
			} else {
				console.log('Invalid validation!')
			}
		},
		loginIsValid(value){
			const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			this.loginValid = emailValidationRegex.test(value);
		},
		passwordIsValid(value){
			this.passwordValid = !!(value && value.length >= 8)
		},
	},
	watch: {
		login(newValue){
			this.loginIsValid(newValue)
		},
		password(newValue){
			this.passwordIsValid(newValue)
		}
	}
}
</script>

<style lang="scss">
.error-message {
	position: absolute;
	top: 80%;
	color: #EB1717;
	font-size: 14px;
}


.login__backdrop {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	background: url("../assets/background.svg") no-repeat bottom center;
	background-size: cover;
}
.login__popup {
	position: absolute;
	width: 409px;
	left: calc(50% - 409px/2);
	top: calc(50% - 382px/2);
}
.popup {
	display: flex;
	flex-direction: column;
	gap: 32px;
	justify-content: space-between;
	background: #FFFFFF;
	box-shadow: 0 4px 33px rgba(0, 0, 0, 0.04);
	border-radius: 16px;
	padding: 32px;
	font-family: "Roboto Light",sans-serif;
	color: #424242;
	.popup__title {
		text-align: center;
		font-weight: 500;
		font-size: 24px;
	}
	.popup__fields {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 24px;
		.popup__field {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: 7px;
			text-align: left;
			&__title {
				color: #9d9999;
				font-size: 16px;
			}
			.error-font {
				color: #EB1717;
			}
			&__input {
				height: 50px;
				outline: none;
				padding: 15px;
				border: 1px solid #C9CACC;
				border-radius: 4px;
			}
		}
	}
	button {
		height: 50px;
	}
}
</style>