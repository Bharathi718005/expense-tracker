import React, { useEffect, useState } from 'react'
import { getExpenses, createExpense, updateExpense, deleteExpense, getStats } from './services/api'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchFilter from './components/SearchFilter'
import ExpenseStats from './components/ExpenseStats'

export default function App(){
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({search:'',category:'',start_date:'',end_date:''})
  const [stats, setStats] = useState({total_amount:0,total_count:0,total_by_category:{}})

  const fetchData = async () =>{
    setLoading(true)
    setError(null)
    try{
      const params = new URLSearchParams()
      if(filters.search) params.append('search', filters.search)
      if(filters.category) params.append('category', filters.category)
      if(filters.start_date) params.append('start_date', filters.start_date)
      if(filters.end_date) params.append('end_date', filters.end_date)
      const res = await getExpenses(params.toString())
      setExpenses(res.data)
      const sres = await getStats(params.toString())
      setStats(sres.data)
    }catch(e){
      setError('Failed to load expenses')
    }finally{setLoading(false)}
  }

  useEffect(()=>{fetchData()},[filters])

  const handleCreate = async (payload) =>{
    await createExpense(payload)
    fetchData()
  }
  const handleUpdate = async (id,payload) =>{
    await updateExpense(id,payload)
    setEditing(null)
    fetchData()
  }
  const handleDelete = async (id) =>{
    await deleteExpense(id)
    fetchData()
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <div className="muted">Manage your daily expenses</div>
      </div>
      <div className="grid">
        <div>
          <div className="card">
            <SearchFilter filters={filters} setFilters={setFilters} />
          </div>
          <div style={{height:16}} />
          <div className="card">
            <ExpenseList expenses={expenses} loading={loading} onEdit={setEditing} onDelete={handleDelete} />
          </div>
        </div>
        <div>
          <div className="card">
            <ExpenseStats stats={stats} />
          </div>
          <div style={{height:16}} />
          <div className="card">
            <ExpenseForm onCreate={handleCreate} onUpdate={handleUpdate} editing={editing} onCancel={()=>setEditing(null)} />
          </div>
        </div>
      </div>
    </div>
  )
}
