<template>
  <div class="playground mx-auto mt-3">
    <GameMap />
  </div>
</template>

<script setup lang="ts">
import GameMap from '@/components/GameMap.vue'
</script>

<style scoped>
div.playground{
    /*固定为正方形*/
  width: 40vw;
  height: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
}
</style>
