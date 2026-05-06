"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Image, FileText, HelpCircle, MessageSquare, X, Check } from "lucide-react";

const tabs = [
  { key: "banners", label: "Banner", icon: Image },
  { key: "faq", label: "FAQ", icon: HelpCircle },
  { key: "testimonials", label: "Testimoni", icon: MessageSquare },
];

const initialBanners = [
  { id: 1, title: "Promo Ramadhan — Diskon 20%", active: true },
  { id: 2, title: "Paket Gaming Baru — Low Latency", active: true },
  { id: 3, title: "Referral Bonus Rp 100.000", active: false },
];

const initialFaq = [
  { id: 1, q: "Berapa lama proses instalasi?", a: "1-3 hari kerja setelah survei." },
  { id: 2, q: "Apakah ada biaya instalasi?", a: "Gratis untuk semua paket." },
  { id: 3, q: "Bisa upgrade/downgrade paket?", a: "Ya, melalui dashboard pelanggan." },
];

const initialTestimonials = [
  { id: 1, name: "Budi Santoso", content: "Internet stabil, CS responsif!", rating: 5, active: true },
  { id: 2, name: "Sari Dewi", content: "Anak-anak bisa belajar online lancar.", rating: 5, active: true },
];

export default function KontenPage() {
  const [activeTab, setActiveTab] = useState("banners");
  const [banners, setBanners] = useState(initialBanners);
  const [faqs, setFaqs] = useState(initialFaq);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  return (
    <div>
      <h1 style={{fontSize:'1.5rem',marginBottom:'24px'}}>Manajemen Konten</h1>

      <div style={{display:'flex',gap:'4px',background:'var(--bg-surface)',borderRadius:'var(--radius-md)',padding:'4px',marginBottom:'24px',maxWidth:'fit-content'}}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',borderRadius:'var(--radius-sm)',border:'none',
              background: activeTab === t.key ? 'var(--primary)' : 'transparent',
              color: activeTab === t.key ? '#fff' : 'var(--text-muted)',
              fontFamily:'var(--font-sans)',fontSize:'0.85rem',fontWeight:500,cursor:'pointer',transition:'all 0.15s ease'}}>
            <t.icon size={16}/>{t.label}
          </button>
        ))}
      </div>

      {activeTab === "banners" && (
        <div style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th>Banner</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {banners.map(b => (
                <tr key={b.id}>
                  <td style={{fontWeight:500,color:'var(--text-primary)'}}>{b.title}</td>
                  <td><span className={`badge ${b.active ? 'badge-success badge-dot' : 'badge-primary badge-dot'}`}>{b.active ? 'Aktif' : 'Draft'}</span></td>
                  <td><div style={{display:'flex',gap:'4px'}}>
                    <button style={{width:32,height:32,borderRadius:6,background:'rgba(255,255,255,0.04)',border:'none',color:'var(--text-muted)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Pencil size={14}/></button>
                    <button style={{width:32,height:32,borderRadius:6,background:'rgba(255,255,255,0.04)',border:'none',color:'var(--text-muted)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setBanners(prev=>prev.filter(x=>x.id!==b.id))}><Trash2 size={14}/></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "faq" && (
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {faqs.map(f => (
            <div key={f.id} style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-md)',padding:'16px 20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div><strong style={{fontSize:'0.95rem'}}>{f.q}</strong><p style={{color:'var(--text-muted)',fontSize:'0.85rem',marginTop:'4px'}}>{f.a}</p></div>
                <button style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer'}} onClick={()=>setFaqs(prev=>prev.filter(x=>x.id!==f.id))}><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "testimonials" && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
          {testimonials.map(t => (
            <div key={t.id} className="glass-card">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <strong>{t.name}</strong>
                <span style={{color:'var(--warning)'}}>{"★".repeat(t.rating)}</span>
              </div>
              <p style={{color:'var(--text-muted)',fontSize:'0.9rem'}}>&ldquo;{t.content}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
