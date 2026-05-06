"use client";
import { useState } from "react";
import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const initialInvoices = [
  { id: 1, customer: "Ahmad Fauzi", amount: 299000, month: "Mei 2026", status: "unpaid", due: "2026-05-15" },
  { id: 2, customer: "Sari Dewi", amount: 499000, month: "Mei 2026", status: "paid", due: "2026-05-15" },
  { id: 3, customer: "Budi Santoso", amount: 199000, month: "Mei 2026", status: "overdue", due: "2026-05-01" },
  { id: 4, customer: "Rina Wati", amount: 299000, month: "Mei 2026", status: "paid", due: "2026-05-15" },
  { id: 5, customer: "Andi Pratama", amount: 399000, month: "Mei 2026", status: "unpaid", due: "2026-05-15" },
  { id: 6, customer: "Dani Kurniawan", amount: 599000, month: "Mei 2026", status: "paid", due: "2026-05-15" },
];

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);
const statusMap = { paid: { cls: "badge-success badge-dot", label: "Lunas" }, unpaid: { cls: "badge-warning badge-dot", label: "Belum Bayar" }, overdue: { cls: "badge-danger badge-dot", label: "Terlambat" } };

export default function TagihanPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const filtered = invoices.filter(i => i.customer.toLowerCase().includes(search.toLowerCase()));
  const confirm = (id) => setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: "paid" } : i));

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px'}}>
        <div><h1 style={{fontSize:'1.5rem',marginBottom:'4px'}}>Tagihan & Pembayaran</h1><p style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>{invoices.filter(i=>i.status!=="paid").length} tagihan pending</p></div>
      </div>
      <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',background:'var(--bg-surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'var(--radius-md)',color:'var(--text-muted)',maxWidth:'320px',flex:1}}>
          <Search size={16}/><input style={{border:'none',background:'none',color:'var(--text-primary)',fontFamily:'var(--font-sans)',fontSize:'0.9rem',outline:'none',width:'100%'}} placeholder="Cari pelanggan..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
        <table className="data-table">
          <thead><tr><th>#</th><th>Pelanggan</th><th>Periode</th><th>Jumlah</th><th>Jatuh Tempo</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id}>
                <td style={{fontFamily:'var(--font-mono)',fontSize:'0.85rem'}}>{inv.id}</td>
                <td style={{fontWeight:600,color:'var(--text-primary)'}}>{inv.customer}</td>
                <td>{inv.month}</td>
                <td>Rp {fmt(inv.amount)}</td>
                <td>{inv.due}</td>
                <td><span className={`badge ${statusMap[inv.status].cls}`}>{statusMap[inv.status].label}</span></td>
                <td>{inv.status !== "paid" && <button className="btn btn-primary btn-sm" onClick={()=>confirm(inv.id)}><CheckCircle2 size={14}/> Konfirmasi</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
