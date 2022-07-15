import { vgriRequest } from '../../index'

const urlObj = {
  examTaskListUrl: '/exam-task/paged-list',
  examTaskDetailUrl: '/exam-task/detail',
  examTaskEditUrl: '/exam-task',
  departmentListUrl: '/organization/list'
}

// 获取任务列表
export function getExamTaskList(params) {
  return vgriRequest.get({
    url: urlObj.examTaskListUrl,
    params
  })
}

// 添加任务
export function addExamTask(data) {
  return vgriRequest.post({
    url: urlObj.examTaskEditUrl,
    data
  })
}

// 修改任务
export function editExamTask(data) {
  return vgriRequest.put({
    url: urlObj.examTaskEditUrl,
    data
  })
}

// 删除任务
export function deleteExamTask(id) {
  return vgriRequest.put({
    url: urlObj.examTaskEditUrl + `/${id}`
  })
}

// 获取任务详情
export function getExamTaskDetail(params) {
  return vgriRequest.get({
    url: urlObj.examTaskDetailUrl,
    params
  })
}

// 获取有工厂的部门列表
export function getDepartmentList(params) {
  return vgriRequest.get({
    url: urlObj.departmentListUrl,
    params
  })
}
