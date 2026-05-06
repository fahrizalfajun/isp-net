"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search, ToggleLeft, ToggleRight } from "lucide-react";
import styles from "./page.module.css";

const initialProducts = [
  { id: 1, name: "Basic", speed: 30, price: 199000, category: "home", active: true },
  { id: 2, name: "Popular", speed: 50, price: 299000, category: "home", active: true },
  { id: 3, name: "Premium", speed: 100, price: 499000, category: "home", active: true },
  { id: 4, name: "Gaming Pro", speed: 100, price: 399000, category: "gaming", active: true },
  { id: 5, name: "Bisnis Starter", speed: 100, price: 599000, category: "business", active: true },
  { id: 6, name: "Bisnis Pro", speed: 200, price: 899000, category: "business", active: true },
];

export default function ProdukPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", speed: "", price: "", category: "home" });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ name: "", speed: "", price: "", category: "home" }); setModal("add"); };
  const openEdit = (p) => { setForm({ name: p.name, speed: p.speed, price: p.price, category: p.category }); setEditItem(p); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditItem(null); };

  const handleSave = () => {
    if (modal === "add") {
      setProducts(prev => [...prev, { id: Date.now(), ...form, speed: +form.speed, price: +form.price, active: true }]);
    } else {
      setProducts(prev => prev.map(p => p.id === editItem.id ? { ...p, ...form, speed: +form.speed, price: +form.price } : p));
    }
    closeModal();
  };

  const toggleActive = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Produk & Paket</h1>
          <p className={styles.subtitle}>{products.length} paket terdaftar</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Tambah Paket</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} />
          <input placeholder="Cari paket..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Paket</th>
              <th>Kecepatan</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                <td>{p.speed} Mbps</td>
                <td>Rp {fmt(p.price)}</td>
                <td><span className="badge badge-primary">{p.category}</span></td>
                <td>
                  <button className={styles.toggleBtn} onClick={() => toggleActive(p.id)}>
                    {p.active ? <ToggleRight size={24} color="var(--success)" /> : <ToggleLeft size={24} color="var(--text-dim)" />}
                  </button>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => openEdit(p)} title="Edit"><Pencil size={16} /></button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => deleteProduct(p.id)} title="Hapus"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === "add" ? "Tambah Paket Baru" : "Edit Paket"}</h3>
              <button className={styles.actionBtn} onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Nama Paket</label>
                <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Ultra 200" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Kecepatan (Mbps)</label>
                  <input className="form-input" type="number" value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Harga (Rp)</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="home">Rumah</option>
                  <option value="business">Bisnis</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
              <button className="btn btn-primary" onClick={handleSave}><Check size={16} /> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
