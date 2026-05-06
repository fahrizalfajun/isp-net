"use client";
import { useState } from "react";
import { Search, Eye, ToggleLeft, ToggleRight, Mail, Phone } from "lucide-react";
import styles from "./page.module.css";

const customers = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@email.com", phone: "081234567890", paket: "Popular 50 Mbps", status: "active", joined: "2025-01-15" },
  { id: 2, name: "Sari Dewi", email: "sari@email.com", phone: "081234567891", paket: "Premium 100 Mbps", status: "active", joined: "2025-03-20" },
  { id: 3, name: "Budi Santoso", email: "budi@email.com", phone: "081234567892", paket: "Basic 30 Mbps", status: "active", joined: "2024-11-08" },
  { id: 4, name: "Andi Pratama", email: "andi@email.com", phone: "081234567893", paket: "Gaming Pro 100 Mbps", status: "suspended", joined: "2025-02-14" },
  { id: 5, name: "Rina Wati", email: "rina@email.com", phone: "081234567894", paket: "Popular 50 Mbps", status: "active", joined: "2025-06-01" },
  { id: 6, name: "Dani Kurniawan", email: "dani@email.com", phone: "081234567895", paket: "Bisnis Starter", status: "pending", joined: "2026-05-01" },
];

export default function PelangganPage() {
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search));

  const statusBadge = (s) => {
    const map = { active: "badge-success badge-dot", suspended: "badge-danger badge-dot", pending: "badge-warning badge-dot" };
    const labels = { active: "Aktif", suspended: "Suspended", pending: "Pending" };
    return <span className={`badge ${map[s]}`}>{labels[s]}</span>;
  };

  return (
    <div>
      <div className={styles.header}>
        <div><h1>Manajemen Pelanggan</h1><p className={styles.sub}>{customers.length} pelanggan terdaftar</p></div>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}><Search size={16} /><input placeholder="Cari pelanggan..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      </div>
      <div className={styles.tableWrap}>
        <table className="data-table">
          <thead><tr><th>Nama</th><th>Kontak</th><th>Paket</th><th>Status</th><th>Bergabung</th><th>Aksi</th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</td>
                <td><div style={{fontSize:'0.8rem'}}><div style={{display:'flex',alignItems:'center',gap:'4px'}}><Mail size={12}/>{c.email}</div><div style={{display:'flex',alignItems:'center',gap:'4px',color:'var(--text-dim)'}}><Phone size={12}/>{c.phone}</div></div></td>
                <td>{c.paket}</td>
                <td>{statusBadge(c.status)}</td>
                <td>{c.joined}</td>
                <td><button className={styles.viewBtn} onClick={() => setDetail(c)}><Eye size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Detail Pelanggan</h3><button onClick={() => setDetail(null)} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer'}}>✕</button></div>
            <div className="modal-body">
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Nama</span><strong>{detail.name}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Email</span><strong>{detail.email}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Telepon</span><strong>{detail.phone}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Paket</span><strong>{detail.paket}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Status</span>{statusBadge(detail.status)}</div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>Bergabung</span><strong>{detail.joined}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
