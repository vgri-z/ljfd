import { vgriRequest } from '../../index'

const urlObj = {
  questionListUrl: '/question-bank/paged-list',
  questionDetailUrl: '/question-bank/detail',
  questionEditUrl: '/question-bank'
}

// 获取题库列表
export function getQuestionList(params) {
  return vgriRequest.get({
    url: urlObj.questionListUrl,
    params
  })
}

// 添加题目
export function addQuestion(data) {
  return vgriRequest.post({
    url: urlObj.questionEditUrl,
    data
  })
}

// 修改题目
export function editQuestion(data) {
  return vgriRequest.put({
    url: urlObj.questionEditUrl,
    data
  })
}

// 删除题目
export function deleteQuestion(id) {
  return vgriRequest.put({
    url: urlObj.questionEditUrl + `/${id}`
  })
}

// 获取题目详情
export function getQuestionDetail(params) {
  return vgriRequest.get({
    url: urlObj.questionDetailUrl,
    params
  })
}
