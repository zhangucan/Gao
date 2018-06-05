import request from '@/utils/request'

export function fetchMap(id) {
  return request({
    url: `/map/maps/${id}`,
    method: 'get'
  })
}

export function fetchMapList() {
  return request({
    url: '/map/maps',
    method: 'get'
  })
}

export function saveMap(data) {
  return request({
    url: '/map/map',
    method: 'post',
    data
  })
}

export function updateMap(data) {
  return request({
    url: '/map/map',
    method: 'put',
    data
  })
}

export function saveVectorFeature(data) {
  return request({
    url: '/map/savevectorfeature',
    method: 'post',
    data
  })
}
