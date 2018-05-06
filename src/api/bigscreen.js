import request from '@/utils/request'

export function fetchLayout(query) {
  return request({
    url: '/bigscreen',
    method: 'get',
    params: query
  })
}
