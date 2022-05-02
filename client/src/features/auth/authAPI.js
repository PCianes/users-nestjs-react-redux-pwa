import api, { request, authOptions } from '../../api'

export const signUp = (user) => {
  const fn = () => api.post('/auth/signup', { ...user }, authOptions())
  return request(fn)
}

export const signIn = (email, password) => {
  const fn = () => api.post('/auth/signin', { email, password }, authOptions())
  return request(fn)
}

export const getMe = () => {
  const fn = () => api.get('/auth/me', authOptions())
  return request(fn)
}