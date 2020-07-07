<template>
	<div>
        <Header />
        <div class="container mx-auto px-4">
		    <Nuxt />
        </div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'App'
})
</script>