import React from 'react'

export default function ExpenseStats({stats}){
  return (
    <div>
      <h3>Stats</h3>
      <div className="stats">
        <div className="stat card">
          <div className="muted">Total Amount</div>
          <div style={{fontSize:20,fontWeight:600}}>{stats.total_amount}</div>
        </div>
        <div className="stat card">
          <div className="muted">Total Expenses</div>
          <div style={{fontSize:20,fontWeight:600}}>{stats.total_count}</div>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <h4>By Category</h4>
        <div>
          {stats.total_by_category && Object.keys(stats.total_by_category).length>0 ? (
            Object.entries(stats.total_by_category).map(([k,v])=> (
              <div key={k} style={{display:'flex',justifyContent:'space-between'}}>
                <div>{k}</div>
                <div>{v.total} ({v.count})</div>
              </div>
            ))
          ) : (
            <div className="muted">No data</div>
          )}
        </div>
      </div>
    </div>
  )
}
