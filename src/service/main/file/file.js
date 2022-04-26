import { vgriRequest } from '../../index'

export function fileUpload(data) {
  return vgriRequest.post({
    url: '/file',
    data
  })
}
