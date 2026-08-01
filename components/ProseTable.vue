<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="table-scroll">
    <table v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
