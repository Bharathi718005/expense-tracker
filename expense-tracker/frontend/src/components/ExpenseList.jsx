import React from 'react'

export default function ExpenseList({expenses,loading,onEdit,onDelete}){
  if(loading) return <div>Loading...</div>
  if(!expenses || expenses.length===0) return <div>No expenses yet</div>

  const handleDelete = (id)=>{
    if(window.confirm('Delete this expense?')) onDelete(id)
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr><th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Payment</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.expense_date}</td>
              <td>{exp.payment_mode}</td>
              <td className="actions">
                <button onClick={()=>onEdit(exp)}>Edit</button>
                <button onClick={()=>handleDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{marginTop:12}}>Mobile view</h4>
      <div className="card-list">
        {expenses.map(exp => (
          <div className="card-item" key={'c'+exp.id}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <strong>{exp.title}</strong>
              <span>{exp.amount}</span>
            </div>
            <div className="muted">{exp.category} • {exp.expense_date}</div>
            <div style={{marginTop:8}}>
              <button onClick={()=>onEdit(exp)}>Edit</button>
              <button onClick={()=>handleDelete(exp.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
