<template>
	<div class="login__backdrop"></div>
	<div class="login__popup popup">
		<div class="popup__title">Simple Hotel Check</div>
		<div class="popup__fields">
			<div class="popup__field">
				<div class="popup__field__title">Login</div>
				<input type="text" class="popup__field__input">
			</div>
			<div class="popup__field">
				<div class="popup__field__title">Password</div>
				<input type="text" class="popup__field__input">
			</div>
		</div>
		<button class="popup__confirm-button">Enter</button>
	</div>
</template>

<script>
export default {
	name: "LoginView"
}
</script>

<style lang="scss">
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
			display: flex;
			flex-direction: column;
			gap: 7px;
			text-align: left;
			&__title {
				color: #9d9999;
				font-size: 16px;
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
	.popup__confirm-button {
		height: 50px;
		background: linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
		border-radius: 4px;
		color: #fff;
	}
}


</style>