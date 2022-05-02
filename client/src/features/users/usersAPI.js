import api, { request, authOptions } from '../../api'

export const fetchUsers = () => {
  const fn = () => api.get('/users', authOptions())
  return request(fn)
}

export const deleteUserById = (id) => {
  const fn = () => api.delete(`/users/${id}`, authOptions())
  return request(fn)
}