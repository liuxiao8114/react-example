import request from './request'

export function getUsername(userId) {
  return request('/users/' + userId).then(user => user.name)
}
