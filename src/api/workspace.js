import request from '@/utils/request'

export function load(data) {
  return request({
    url: `/workspace/${data}`

  })
}

