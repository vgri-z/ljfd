<template>
  <div class="select-answer">
    <div style="margin-bottom: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="addSelectOption">添加</el-button>
    </div>
    <el-table :data="$store.state.question.selectOptions" border>
      <el-table-column label="答案内容" prop="text" />
      <el-table-column label="是否是正确答案" prop="isCorrect">
        <template #default="scope">
          <el-radio-group v-model="scope.row.isCorrect">
            <el-radio :label="true">对</el-radio>
            <el-radio :label="false">错</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="editSelectOption(scope.row)">编辑</el-button>
          <el-button type="text" style="color: #f56c6c" @click="removeSelectOption(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加选择题答案 -->
    <edit-select ref="editSelectRef" />
  </div>
</template>

<script>
import EditSelect from './editSelect.vue'
export default {
  components: { EditSelect },
  data() {
    return {}
  },
  methods: {
    addSelectOption() {
      this.$refs.editSelectRef.show()
    },
    editSelectOption(data) {
      this.$refs.editSelectRef.show(data)
    },
    removeSelectOption(data) {
      this.$store.commit('question/removeSelectOptioon', data)
    }
  }
}
</script>

<style lang="less" scoped></style>
