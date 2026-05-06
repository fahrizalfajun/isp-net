"use client";
import { useState } from "react";
import { Search, CheckCircle2, Clock, AlertCircle, X } from "lucide-react";
import styles from "./page.module.css";

const initialTickets = [
  { id: 145, customer: "Ahmad Fauzi", subject: "Internet putus sejak pagi", category: "Gangguan", priority: "high", status: "open", date: "2026-05-05" },
  { id: 144, customer: "Sari Dewi", subject: "Speed test tidak sesuai paket", category: "Kualitas", priority: "medium", status: "in_progress", assignee: "Teknisi Budi", date: "2026-05-04" },
  { id: 143, customer: "Budi Santoso", subject: "Mau upgrade ke paket Premium", category: "Upgrade", priority: "low", status: "open", date: "2026-05-04" },
  { id: 142, customer: "Rina Wati", subject: "WiFi sering disconnect", category: "Gangguan", priority: "high", status: "resolved", assignee: "Teknisi Andi", date: "2026-05-03" },
  { id: 141, customer: "Andi Pratama", subject: "Request ganti router", category: "Perangkat", priority: "medium", status: "closed", assignee: "Teknisi Budi", date: "2026-05-02" },
];

const statusMap = { open: { badge: "badge-warning badge-dot", label: "Open" }, in_progress: { badge: "badge-info badge-dot", label: "In Progress" }, resolved: { badge: "badge-success badge-dot", label: "Resolved" }, closed: { badge: "badge-primary badge-dot", label: "Closed" } };
const priorityMap = { low: "badge-info", medium: "badge-warning", high: "badge-danger" };

export default function TiketPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = tickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id, newStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div>
      <div className={styles.header}><div><h1>Tiket Gangguan</h1><p className={styles.sub}>{tickets.filter(t => t.status === "open" || t.status === "in_progress").length} tiket aktif</p></div></div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}><Search size={16} /><input placeholder="Cari tiket..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className={styles.filters}>
          {["all","open","in_progress","resolved","closed"].map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "Semua" : statusMap[f]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className="data-table">
          <thead><tr><th>#ID</th><th>Pelanggan</th><th>Subject</th><th>Priority</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td style={{fontFamily:'var(--font-mono)',fontSize:'0.85rem'}}>#{t.id}</td>
                <td style={{fontWeight:500,color:'var(--text-primary)'}}>{t.customer}</td>
                <td>{t.subject}</td>
                <td><span className={`badge ${priorityMap[t.priority]}`}>{t.priority}</span></td>
                <td><span className={`badge ${statusMap[t.status].badge}`}>{statusMap[t.status].label}</span></td>
                <td>
                  <select className="form-select" style={{padding:'6px 30px 6px 10px',fontSize:'0.8rem',minWidth:'130px'}} value={t.status} onChange={e => updateStatus(t.id, e.target.value)}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
