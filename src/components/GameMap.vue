<!--游戏地图-->
<template>
  <div ref="parent" class="gameMap">
    <canvas ref="canvas" class="canvas" tabindex="0"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GameMap } from '@/assets/scripts/GameMap.js'
import { useStore } from 'vuex'

const canvas = ref<HTMLCanvasElement>()
const parent = ref<HTMLDivElement>()

onMounted(() => {
  useStore().commit(
    'updateGameObject',
    new GameMap(canvas.value, parent.value)
  )
})

</script>

<style>
div.gameMap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  background-color: #e8b46b;
}
.canvas{
  width: 98%;
  height: 98%;
}
</style>
