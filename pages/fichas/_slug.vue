<template>
	<article class="my-6 bg-white p-6 shadow-fb rounded">
		<div class="flex justify-between items-center mb-3">
			<img class="w-6 h-6" src="/images/logo.jpg" />
			<div class="text-right text-sm">
				<p class="text-gray-900 leading-none font-bold">{{ formatDate(article.createdAt) }}</p>
			</div>
		</div>
		<h1 class="text-2xl lg:text-3xl font-bold text-center mb-6">Ficha Técnica</h1>
		<div class="max-w-sm w-full lg:max-w-full lg:flex rounded">
			<img class="h-64 img-article lg:h-auto lg:w-64 flex-none bg-cover rounded text-center overflow-hidden mx-auto" :src="article.img" :title="article.alt" />
			<div class="w-full rounded-b lg:rounded-b-none lg:rounded-r lg:px-6 py-4 flex flex-col leading-normal">
				<div class="mb-8">
					<div class="text-center text-gray-900 font-bold text-xl mb-2 lg:text-left">{{ article.title }}</div>
					<p class="text-gray-700 text-base">{{ article.description }}</p>
				</div>
				<nuxt-content :document="article" />
			</div>
		</div>
	</article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'DataSheet',
	methods: {
		formatDate(date : Date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(date).toLocaleDateString('es', options)
		}
	},
	async asyncData ({ $content, params }) {		
		const article = await $content('fichas', params.slug).fetch()

		return { article }
	}
})
</script>

<style lang="sass">
.nuxt-content
	h1
		font-weight: bold
		font-size: 2.25rem
	h2
		font-weight: bold
		font-size: 1.875rem
@screen lg
	.img-article
		min-height: 400px
		max-height: 400px
</style>