import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000/api' })

export const getExpenses = (query='') => api.get(`/expenses/${query ? '?'+query : ''}`)
export const getExpense = (id) => api.get(`/expenses/${id}/`)
export const createExpense = (payload) => api.post('/expenses/', payload)
export const updateExpense = (id, payload) => api.put(`/expenses/${id}/`, payload)
export const deleteExpense = (id) => api.delete(`/expenses/${id}/`)
export const getStats = (query='') => api.get(`/expenses/stats/${query ? '?'+query : ''}`)

export default api
