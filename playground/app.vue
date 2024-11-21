<script lang="ts" setup>
import { ref, useFetch } from '#imports'

const sessionDataString = ref('')

async function clearAndSetSession() {
  const response = await useFetch('/api/session/cs', { method: 'post' })
  if (response.data.value)
    sessionDataString.value = JSON.stringify(response.data.value)
}

async function clearSession() {
  const response = await useFetch('/api/session/clear', { method: 'post' })
  if (response.data.value)
    sessionDataString.value = JSON.stringify(response.data.value)
}

async function getSession() {
  const response = await useFetch('/api/session/get')
  if (response.data.value)
    sessionDataString.value = JSON.stringify(response.data.value)
}

async function setSession() {
  const response = await useFetch('/api/session/set', { method: 'post' })
  if (response.data.value)
    sessionDataString.value = JSON.stringify(response.data.value)
}

await getSession()
</script>

<template>
  <div>
    <p>Nuxt session playground!</p>
    <p>{{ sessionDataString }}</p>
    <button @click="getSession">
      Get session
    </button>
    <button @click="setSession">
      Set session
    </button>
    <button @click="clearSession">
      Clear session
    </button>
    <button @click="clearAndSetSession">
      Clear and set session
    </button>
  </div>
</template>
