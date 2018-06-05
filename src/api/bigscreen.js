import request from '@/utils/request'

export function fetchLayout(id) {
  return request({
    url: `/gridlayout/gridlayouts/${id}`,
    method: 'get'
  })
}
export function createLayout(data) {
  return request({
    url: '/gridlayout/gridlayout',
    method: 'post',
    data
  })
}
export function fetchLayoutList(query) {
  return request({
    url: '/gridlayout/gridlayouts',
    method: 'get'
  })
}
export function deleteGridLayout(id) {
  return request({
    url: `/gridlayout/gridlayouts/${id}`,
    method: 'delete'
  })
}
export function fetchGridItem(query) {
  return request({
    url: '/griditem',
    method: 'get',
    params: query
  })
}

export function fetchVectors(query) {
  return request({
    url: '/vector',
    method: 'get',
    params: query
  })
}

export function saveGridItem(data) {
  return request({
    url: '/griditem',
    method: 'post',
    data
  })
}

export function updateGridLayout(data) {
  return request({
    url: '/gridlayout/gridlayout',
    method: 'put',
    data
  })
}
