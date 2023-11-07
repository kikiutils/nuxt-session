<template>
	<div>
		<p>Nuxt session playground!</p>
		<p>{{ sessionDataString }}</p>
		<button @click="getSession">Get session</button>
		<button @click="setSession">Set session</button>
	</div>
</template>

<script lang="ts" setup>
import { ref, useFetch } from '#imports';

const sessionDataString = ref('');

async function getSession() {
	const response = await useFetch('/api/session/get');
	if (response.data.value) sessionDataString.value = JSON.stringify(response.data.value);
}

async function setSession() {
	const response = await useFetch('/api/session/set', { method: 'post' });
	if (response.data.value) sessionDataString.value = JSON.stringify(response.data.value);
}

await getSession();
</script>
