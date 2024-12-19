<script setup lang="ts">
interface Foo {
  bar: string
}

const foo: Foo = {
  bar: 'Hello World',
}
</script>

<template>
  <div class="text-sm text-yellow-600">
    <h1>Home Page</h1>
    <p>Click on the link below to navigate to the about page</p>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>
