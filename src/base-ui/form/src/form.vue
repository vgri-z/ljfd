<template>
  <div class="form">
    <el-form label-width="100px">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%">
                  <el-option>吉他</el-option>
                  <el-option>钢琴</el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  :placeholder="item.placeholder"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formItems: Array,
    default: () => []
  }
}
</script>

<style scoped></style>
