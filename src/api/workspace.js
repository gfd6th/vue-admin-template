import request from '@/utils/request'

export function load(data) {
  return request({
    url: `/api/workspace/${data}`
  })
}

export function loadMaterial(id) {
  return request({
    url: `/api/workspace/materials/${id}`
  })
}

export function loadLight(id) {
  return request({
    url: `/api/workspace/lights/${id}`
  })
}
export function loadModel(id) {
  return request({
    url: `/api/workspace/models/${id}`
  })
}

