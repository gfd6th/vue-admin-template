import request from '@/utils/request'

export function getProcessingList(params) {
  return request({
    url: '/user/myorder/processing',
    method: 'get',
    params
  })
}

export function getHistoryList(params) {
  return request({
    url: '/user/myorder/history',
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: '/user/myorder/edit',
    method: 'post',
    data
  })
}

export function rating(data) {
  return request({
    url: '/user/myorder/score',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: '/user/myorder/info',
    method: 'get',
    params: {
      id
    }
  })
}

