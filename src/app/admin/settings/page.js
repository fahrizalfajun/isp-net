"use client";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{fontSize:'1.5rem',marginBottom:'24px'}}>Pengaturan</h1>
      <div style={{display:'flex',flexDirection:'column',gap:'16px',maxWidth:'600px'}}>
        <div style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-lg)',padding:'24px'}}>
          <h3 style={{fontSize:'1rem',marginBottom:'16px'}}>Informasi Website</h3>
          <div className="form-group"><label className="form-label">Nama Website</label><input className="form-input" defaultValue="ISP Net"/></div>
          <div className="form-group"><label className="form-label">Email Kontak</label><input className="form-input" defaultValue="hello@ispnet.id"/></div>
          <div className="form-group"><label className="form-label">No. Telepon</label><input className="form-input" defaultValue="0800-123-4567"/></div>
          <button className="btn btn-primary">Simpan</button>
        </div>
        <div style={{background:'var(--bg-card)',border:'var(--border-subtle)',borderRadius:'var(--radius-lg)',padding:'24px'}}>
          <h3 style={{fontSize:'1rem',marginBottom:'16px'}}>WhatsApp</h3>
          <div className="form-group"><label className="form-label">Nomor WhatsApp</label><input className="form-input" defaultValue="628001234567"/></div>
          <div className="form-group"><label className="form-label">Pesan Default</label><input className="form-input" defaultValue="Halo, saya tertarik dengan layanan ISP Net"/></div>
          <button className="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  );
}
