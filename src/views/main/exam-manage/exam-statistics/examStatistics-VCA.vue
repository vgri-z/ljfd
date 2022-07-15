<template>
  <div class="exam-statistics">
    <h2>考试统计</h2>
    <el-tree-select v-model="value" :data="data" :props="defaultProps" multiple show-checkbox />

    <el-button type="primary" @click="submit">submit</el-button>
  </div>
</template>

<script setup>
import useTree from './hooks/useTree'

const { defaultProps, submit, data, value } = useTree()
</script>

<style lang="less" scoped></style>
