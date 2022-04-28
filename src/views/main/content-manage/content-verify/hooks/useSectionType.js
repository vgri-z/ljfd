export default function useSectionType(type) {
  switch (type) {
    case 1:
      return '文本'
    case 2:
      return '文档'
    case 3:
      return '视频'
    case 4:
      return '图片'
  }
}
