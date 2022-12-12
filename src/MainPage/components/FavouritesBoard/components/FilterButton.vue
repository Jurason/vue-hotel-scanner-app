<template>
	<div
			class="favourites__filters__sort sort-rate"
			:class="{'active-sort-option' : filterProp.asc || filterProp.desc}"
	>
		<span>{{ name }}</span>
		<div class="toggle">
			<img
					class="toggle-up" src="../../../../assets/select.svg" alt=""
					:class="{'active-toggle' : filterProp.asc }"
			>
			<img
					class="toggle-down" src="../../../../assets/select.svg" alt=""
					:class="{'active-toggle' : filterProp.desc }"
			>
		</div>
	</div>
</template>

<script>
export default {
	name: "FilterButton",
	props: {
		name: {type: String, required: false, default: 'Default Name'},
		filterProp: {type: Object, required: true}
	},
}
</script>

<style scoped lang="scss">
	.favourites__filters__sort {
			display: flex;
			align-items: center;
			gap: 4px;
			padding: 4px 8px;
			border: 1px solid #E5E5E5;
			border-radius: 4px;
			color: #E5E5E5;
			cursor: pointer;
		.toggle {
			display: flex;
			flex-direction: column;
		.toggle-up, .toggle-down{
			opacity: .2;
		}
		.active-toggle {
			opacity: 1;
		}
		}
		.toggle-down {
			transform: rotate(180deg);
		}
	}
	.active-sort-option {
		border-color: #41522E;
		color: #41522E;
	}
	.active-toggle {
		opacity: 1;
	}
</style>