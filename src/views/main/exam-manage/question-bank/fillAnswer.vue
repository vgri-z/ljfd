<template>
  <div class="fill-answer">
    <div style="display: flex; justify-content: flex-end">
      <el-button type="primary" style="margin-bottom: 10px" @click="addFillOption">添加</el-button>
    </div>
    <el-table :data="$store.state.question.fillOptions" border>
      <el-table-column label="答案内容" prop="text" />
      <!-- <el-table-column label="答案必须一致">
        <template #default="scope">
          <el-radio-group v-model="scope.row.isCorrect">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="editFillOption(scope.row)">编辑</el-button>
          <el-button type="text" style="color: #f56c6c" @click="removeAnswer(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加填空题答案 -->
    <edit-fill ref="editFillRef" />
  </div>
</template>

<script>
import EditFill from './editFill.vue'
export default {
  components: { EditFill },
  data() {
    return {}
  },
  methods: {
    addFillOption() {
      this.$refs.editFillRef.show()
    },
    editFillOption(data) {
      this.$refs.editFillRef.show(data)
    },
    removeAnswer(data) {
      console.log(data)
      this.$store.commit('question/removeFillOptioon', data)
    }
  }
}
</script>

<style lang="less" scoped></style>
