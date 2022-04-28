export default function useApproveStatus(status) {
  switch (status) {
    case 1:
      return '待审核'
    case 2:
      return '已通过'
    case 3:
      return '已拒绝'
  }
}
