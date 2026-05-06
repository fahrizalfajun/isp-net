"use client";
import { useState } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight, MapPin } from "lucide-react";

const initialAreas = [
  { id: 1, province: "DKI Jakarta", city: "Jakarta Selatan", districts: ["Kebayoran Baru","Mampang","Pancoran","Tebet","Setiabudi"], active: true },
  { id: 2, province: "DKI Jakarta", city: "Jakarta Pusat", districts: ["Menteng","Tanah Abang","Cempaka Putih","Gambir"], active: true },
  { id: 3, province: "Jawa Barat", city: "Bandung", districts: ["Coblong","Cidadap","Sukajadi","Cicendo"], active: true },
  { id: 4, province: "Jawa Timur", city: "Surabaya", districts: ["Gubeng","Tegalsari","Genteng","Wonokromo"], active: true },
  { id: 5, province: "Banten", city: "Tangerang Selatan", districts: ["Serpong","Pamulang","Ciputat"], active: false },
];

export default function CoverageMgmtPage() {
  const [areas, setAreas] = useState(initialAreas);
  const toggle = (id) => setAreas(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const remove = (id) => setAreas(prev => prev.filter(a => a.id !== id));

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px'}}>
        <div><h1 style={{fontSize:'1.5rem',marginBottom:'4px'}}>Coverage Area</h1><p style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>{areas.filter(a=>a.active).length} area aktif</p></div>
        <button className="btn btn-primary"><Plus size={18}/> Tambah Area</button>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {areas.map(a => (
          <div key={a.id} style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-lg)',padding:'20px',display:'flex',alignItems:'flex-start',gap:'16px',opacity: a.active ? 1 : 0.5,transition:'opacity 0.2s'}}>
            <div style={{width:44,height:44,borderRadius:12,background:'rgba(0,102,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)',flexShrink:0}}>
              <MapPin size={22}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                <strong>{a.city}</strong>
                <span className={`badge ${a.active ? 'badge-success' : 'badge-primary'}`}>{a.active ? 'Aktif' : 'Nonaktif'}</span>
              </div>
              <div style={{fontSize:'0.85rem',color:'var(--text-muted)',marginBottom:'8px'}}>{a.province}</div>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                {a.districts.map((d,i) => (
                  <span key={i} style={{padding:'4px 10px',background:'rgba(255,255,255,0.04)',borderRadius:'var(--radius-full)',fontSize:'0.75rem',color:'var(--text-secondary)'}}>{d}</span>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',flexShrink:0}}>
              <button style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>toggle(a.id)}>
                {a.active ? <ToggleRight size={24} color="var(--success)"/> : <ToggleLeft size={24} color="var(--text-dim)"/>}
              </button>
              <button style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)'}} onClick={()=>remove(a.id)}>
                <Trash2 size={18}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
