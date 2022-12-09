<template>
	<button
			class="button-base"
			:class="{ 'button-base__disabled' : disabled }"
			:disabled="disabled"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: "ButtonBase",
	props: {
		name: {type: String, required: true},
		disabled: {type: Boolean, required: true},
	},
}
</script>

<style scoped>
.button-base {
	background: linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%);
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	color: #fff;
}
.button-base:hover {
	background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%);
}
.button-base:active {
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%);
}
.button-base__disabled {
	background: grey;
}
.button-base__disabled:hover {
	background: grey;
}

</style>