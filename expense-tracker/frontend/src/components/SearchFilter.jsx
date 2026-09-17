import React from 'react'

const categories = ['','Food','Travel','Shopping','Bills','Entertainment','Health','Others']

export default function SearchFilter({filters,setFilters}){
  const update = (patch)=> setFilters({...filters,...patch})
  const clear = ()=> setFilters({search:'',category:'',start_date:'',end_date:''})

  return (
    <div>
      <h3>Search & Filter</h3>
      <div style={{marginBottom:8}}>
        <input className="input" placeholder="Search title or description" value={filters.search} onChange={e=>update({search:e.target.value})} />
      </div>
      <div style={{display:'flex',gap:8}}>
        <select className="input" value={filters.category} onChange={e=>update({category:e.target.value})}>
          {categories.map(c=> <option key={c} value={c}>{c || 'All Categories'}</option>)}
        </select>
        <input className="input" type="date" value={filters.start_date} onChange={e=>update({start_date:e.target.value})} />
        <input className="input" type="date" value={filters.end_date} onChange={e=>update({end_date:e.target.value})} />
      </div>
      <div style={{marginTop:8}}>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  )
}
