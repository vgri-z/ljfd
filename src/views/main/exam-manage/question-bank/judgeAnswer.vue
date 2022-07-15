<template>
  <div class="judge-answer">
    <el-radio-group v-model="isCorrect" @change="radioChange">
      <template v-for="(item, index) in $store.state.question.judgeOptions" :key="index">
        <el-radio :label="item.isCorrect">{{ item.text }}</el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isRight: true
    }
  },
  props: {
    isRight: Boolean
  },
  computed: {
    isCorrect() {
      return this.isRight
    }
  },
  methods: {
    radioChange(event) {
      // let option
      // if (event) {
      //   // 判断题正确
      //   option = [
      //     {
      //       text: '对',
      //       isCorrect: true,
      //       index: 0
      //     },
      //     {
      //       text: '错',
      //       isCorrect: false,
      //       index: 1
      //     }
      //   ]
      // } else {
      //   option = [
      //     {
      //       text: '对',
      //       isCorrect: false,
      //       index: 0
      //     },
      //     {
      //       text: '错',
      //       isCorrect: true,
      //       index: 1
      //     }
      //   ]
      // }
      // this.$store.commit('question/changeJudgeOptions', option)
      this.$emit('changeJudgeOption', event)
    }
  }
}
</script>

<style lang="less" scoped></style>
