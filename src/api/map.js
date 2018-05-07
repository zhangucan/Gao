import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/map',
    method: 'get',
    params: query
  })
}

export function saveMap(query) {
  return request({
    url: '/map',
    method: 'post',
    params: query
  })
}
