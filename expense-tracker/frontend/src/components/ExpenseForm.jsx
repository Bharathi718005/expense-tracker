import React, { useEffect, useState } from 'react'

const categories = ['Food','Travel','Shopping','Bills','Entertainment','Health','Others']
const payments = ['Cash','Card','UPI','Net Banking','Other']

export default function ExpenseForm({onCreate,onUpdate,editing,onCancel}){
  const initial = {title:'',amount:'',category:'Food',expense_date:'',payment_mode:'Cash',description:''}
  const [form,setForm] = useState(initial)
  const [errors,setErrors] = useState({})

  useEffect(()=>{
    if(editing){
      setForm({...editing})
    } else setForm(initial)
  },[editing])

  const validate = ()=>{
    const e = {}
    if(!form.title || form.title.trim().length<3) e.title='Title at least 3 chars'
    if(!form.amount || Number(form.amount) <= 0) e.amount='Amount must be > 0'
    if(!form.expense_date) e.expense_date='Date is required'
    const today = new Date().toISOString().slice(0,10)
    if(form.expense_date && form.expense_date>today) e.expense_date='Date cannot be in the future'
    if(form.description && form.description.length>500) e.description='Max 500 chars'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!validate()) return
    const payload = {...form, amount: Number(form.amount)}
    try{
      if(editing){ await onUpdate(editing.id, payload) }
      else { await onCreate(payload) }
      setForm(initial)
    }catch(err){
      setErrors({form: 'Failed to save'})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editing ? 'Edit Expense' : 'Add Expense'}</h3>
      {errors.form && <div style={{color:'red'}}>{errors.form}</div>}
      <div className="form-row">
        <div style={{flex:1}}>
          <label>Title</label>
          <input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          {errors.title && <div style={{color:'red'}}>{errors.title}</div>}
        </div>
        <div style={{width:140}}>
          <label>Amount</label>
          <input className="input" type="number" step="0.01" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} />
          {errors.amount && <div style={{color:'red'}}>{errors.amount}</div>}
        </div>
      </div>
      <div className="form-row" style={{marginTop:8}}>
        <div>
          <label>Category</label>
          <select className="input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input className="input" type="date" value={form.expense_date} onChange={e=>setForm({...form,expense_date:e.target.value})} />
          {errors.expense_date && <div style={{color:'red'}}>{errors.expense_date}</div>}
        </div>
      </div>
      <div className="form-row" style={{marginTop:8}}>
        <div>
          <label>Payment Mode</label>
          <select className="input" value={form.payment_mode} onChange={e=>setForm({...form,payment_mode:e.target.value})}>
            {payments.map(p=> <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{flex:1}}>
          <label>Description</label>
          <textarea className="input" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          {errors.description && <div style={{color:'red'}}>{errors.description}</div>}
        </div>
      </div>
      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button type="submit" className="primary-btn">{editing ? 'Update' : 'Save'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
