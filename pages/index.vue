<template>
	<div class="data-sheets">
		<h1 class="text-2xl lg:text-3xl font-bold mt-4 mb-6 text-center">Fichas Técnicas</h1>
		<div class="search-container mb-6 flex flex-col justify-center items-center">
			<input
				v-model="searchQuery"
				type="search"
				autocomplete="off"
				placeholder="Buscar fichas"
				class="w-full p-4 mb-6 shadow-fb rounded text-lg font-bold focus:outline-none"
				/>
			<span class="text-center font-bold" v-if="articles.length === 0">No se encontraron fichas técnicas :/</span>
		</div>
		<div class="grid lg:grid-cols-2 gap-10 mb-6">
			<NuxtLink class="max-w-sm w-full lg:max-w-full lg:flex shadow-fb rounded card-sheet" v-for="article of articles" :key="article.slug" :to="{ name: 'fichas-slug', params: { slug: article.slug } }">
				<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{ backgroundImage: `url(${article.img})`}" :title="article.alt"></div>
				<div class="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
					<div class="mb-8">						
						<div class="text-gray-900 font-bold text-xl mb-2">{{ article.title }}</div>
						<p class="text-gray-700 text-base">{{ article.description }}</p>
					</div>
					<div class="flex items-center">
						<img class="w-10 h-10 rounded-full mr-4" src="/images/logo.jpg" alt="Logo">
						<div class="text-sm">
							<p class="text-gray-900 leading-none">Subido por {{ article.author }}</p>
							<p class="text-gray-600">{{ formatDate(article.createdAt) }}</p>
						</div>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Index',
	data() {
		return {
			articles: [],
			searchQuery: ''
		}
	},
	methods: {
		formatDate(date : Date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(date).toLocaleDateString('es', options)
		}
	},
	watch: {
		async searchQuery(searchQuery) {
			this.articles = await this.$content('fichas')
				.only(['title', 'description', 'img', 'alt', 'author', 'slug', 'createdAt'])
				.search(searchQuery)
				.sortBy('createdAt', 'desc')
				.fetch()
		}
	},
	async asyncData({ $content, params }) {		
		const articles = await $content('fichas', params.slug)
			.only(['title', 'description', 'img', 'alt', 'author', 'slug', 'createdAt'])
			.sortBy('createdAt', 'desc')
			.fetch()

		return {
			articles
		}
	}
})
</script>

<style lang="sass">
@screen lg
	.card-sheet
		min-height: 262px
</style>