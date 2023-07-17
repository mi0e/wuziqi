<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <NavBar />
      </el-header>
      <el-main>
        <GameGround />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import NavBar from '@/components/NavBar.vue'
import GameGround from '@/components/GameGround.vue'

</script>
<style></style>
