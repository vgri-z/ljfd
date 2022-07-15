const questionModule = {
  namespaced: true,
  state() {
    return {
      judgeOptions: [
        {
          text: '对',
          isCorrect: true,
          index: 0
        },
        {
          text: '错',
          isCorrect: false,
          index: 1
        }
      ], // 判断题
      fillOptions: [], // 填空题
      selectOptions: [] // 选择题
    }
  },
  mutations: {
    changeJudgeOptions(state, payload) {
      state.judgeOptions = payload
      console.log(state.judgeOptions)
    },
    changeFillOptions(state, payload) {
      if (payload.isAdd) {
        // 添加填空题答案
        state.fillOptions.push(payload.data)
        // 更新index的值
        state.fillOptions.forEach((item, index) => {
          item.index = index
        })
      } else {
        // 编辑填空题答案
        const index = state.fillOptions.findIndex((item) => item.index === payload.data.index)
        // 替换答案
        state.fillOptions.splice(index, 1, payload.data)
      }
    },
    changeSelectOptions(state, payload) {
      if (payload.isAdd) {
        // 添加填空题答案
        state.selectOptions.push(payload.data)
        // 更新index的值
        state.selectOptions.forEach((item, index) => {
          item.index = index
        })
      } else {
        // 编辑填空题答案
        const index = state.selectOptions.findIndex((item) => item.index === payload.data.index)
        // 替换答案
        state.selectOptions.splice(index, 1, payload.data)
      }
    },
    // 重置填空题答案列表
    resetFillOptions(state) {
      state.fillOptions = []
    },
    // 删除填空题答案
    removeFillOptioon(state, payload) {
      const index = state.fillOptions.findIndex((item) => item.index === payload.index)
      state.fillOptions.splice(index, 1)
    },
    // 重置选择题答案列表
    resetSelectOptions(state) {
      state.selectOptions = []
    },
    // 删除选择题答案
    removeSelectOptioon(state, payload) {
      const index = state.selectOptions.findIndex((item) => item.index === payload.index)
      state.selectOptions.splice(index, 1)
    }
  }
}

export default questionModule
