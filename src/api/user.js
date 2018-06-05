import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/user/users',
    method: 'get'
  })
}
export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}
export function saveUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
export function deleteUser(params) {
  return request({
    url: '/user',
    method: 'delete',
    params
  })
}
