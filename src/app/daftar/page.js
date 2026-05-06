"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, ArrowRight, ArrowLeft, Upload, Calendar, User, Package, FileText } from "lucide-react";
import styles from "./page.module.css";

const packages = [
  { slug: "basic", name: "Basic 30 Mbps", price: "Rp 199.000/bulan" },
  { slug: "popular", name: "Popular 50 Mbps", price: "Rp 299.000/bulan" },
  { slug: "premium", name: "Premium 100 Mbps", price: "Rp 499.000/bulan" },
  { slug: "gaming-pro", name: "Gaming Pro 100 Mbps", price: "Rp 399.000/bulan" },
  { slug: "bisnis-starter", name: "Bisnis Starter 100 Mbps", price: "Rp 599.000/bulan" },
  { slug: "bisnis-pro", name: "Bisnis Pro 200 Mbps", price: "Rp 899.000/bulan" },
];

const steps = [
  { icon: Package, label: "Pilih Paket" },
  { icon: User, label: "Data Diri" },
  { icon: Calendar, label: "Jadwal" },
  { icon: FileText, label: "Review" },
];

function DaftarForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("paket") || "";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    paket: preselected, nama: "", email: "", telepon: "", alamat: "", ktp: null, jadwal: "", catatan: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = () => { setSubmitted(true); };

  if (submitted) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>✅</div>
        <h2>Pendaftaran Berhasil!</h2>
        <p>Terima kasih, <strong>{form.nama}</strong>. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi jadwal instalasi.</p>
        <p className={styles.refId}>Ref ID: ISP-{Date.now().toString(36).toUpperCase()}</p>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      {/* Progress Bar */}
      <div className={styles.progress}>
        {steps.map((s, i) => (
          <div key={i} className={`${styles.step} ${i <= step ? styles.stepActive : ""} ${i < step ? styles.stepDone : ""}`}>
            <div className={styles.stepCircle}>
              {i < step ? <Check size={16} /> : <s.icon size={16} />}
            </div>
            <span className={styles.stepLabel}>{s.label}</span>
            {i < steps.length - 1 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>

      {/* Step 1: Pilih Paket */}
      {step === 0 && (
        <div className={styles.stepContent}>
          <h2>Pilih Paket Internet</h2>
          <div className={styles.paketGrid}>
            {packages.map(pkg => (
              <label key={pkg.slug} className={`${styles.paketOption} ${form.paket === pkg.slug ? styles.paketSelected : ""}`}>
                <input type="radio" name="paket" value={pkg.slug} checked={form.paket === pkg.slug} onChange={e => updateForm("paket", e.target.value)} />
                <div className={styles.paketInfo}>
                  <strong>{pkg.name}</strong>
                  <span>{pkg.price}</span>
                </div>
                {form.paket === pkg.slug && <Check size={18} className={styles.paketCheck} />}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Data Diri */}
      {step === 1 && (
        <div className={styles.stepContent}>
          <h2>Data Diri</h2>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input className="form-input" value={form.nama} onChange={e => updateForm("nama", e.target.value)} placeholder="Masukkan nama lengkap" />
          </div>
          <div className={styles.formRow}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => updateForm("email", e.target.value)} placeholder="email@contoh.com" />
            </div>
            <div className="form-group">
              <label className="form-label">No. Telepon</label>
              <input className="form-input" value={form.telepon} onChange={e => updateForm("telepon", e.target.value)} placeholder="08xxxxxxxxxx" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Alamat Lengkap</label>
            <textarea className="form-textarea" value={form.alamat} onChange={e => updateForm("alamat", e.target.value)} placeholder="Jl. ..., RT/RW, Kelurahan, Kecamatan" />
          </div>
          <div className="form-group">
            <label className="form-label">Upload KTP</label>
            <div className={styles.uploadArea}>
              <Upload size={24} />
              <span>{form.ktp ? form.ktp.name : "Drag & drop atau klik untuk upload"}</span>
              <input type="file" accept="image/*" onChange={e => updateForm("ktp", e.target.files[0])} />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Jadwal */}
      {step === 2 && (
        <div className={styles.stepContent}>
          <h2>Jadwal Instalasi</h2>
          <div className="form-group">
            <label className="form-label">Tanggal Preferensi</label>
            <input className="form-input" type="date" value={form.jadwal} onChange={e => updateForm("jadwal", e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="form-group">
            <label className="form-label">Catatan (Opsional)</label>
            <textarea className="form-textarea" value={form.catatan} onChange={e => updateForm("catatan", e.target.value)} placeholder="Contoh: Rumah warna putih di gang ke-2, lantai 3..." />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 3 && (
        <div className={styles.stepContent}>
          <h2>Review Pendaftaran</h2>
          <div className={styles.reviewCard}>
            <div className={styles.reviewRow}><span>Paket</span><strong>{packages.find(p => p.slug === form.paket)?.name}</strong></div>
            <div className={styles.reviewRow}><span>Nama</span><strong>{form.nama}</strong></div>
            <div className={styles.reviewRow}><span>Email</span><strong>{form.email}</strong></div>
            <div className={styles.reviewRow}><span>Telepon</span><strong>{form.telepon}</strong></div>
            <div className={styles.reviewRow}><span>Alamat</span><strong>{form.alamat}</strong></div>
            <div className={styles.reviewRow}><span>Jadwal</span><strong>{form.jadwal}</strong></div>
            <div className={styles.reviewRow}><span>KTP</span><strong>{form.ktp?.name || "-"}</strong></div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className={styles.formNav}>
        {step > 0 && (
          <button className="btn btn-ghost" onClick={prev}><ArrowLeft size={16} /> Kembali</button>
        )}
        <div style={{ flex: 1 }} />
        {step < 3 ? (
          <button className="btn btn-primary" onClick={next} disabled={step === 0 && !form.paket}>
            Selanjutnya <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn btn-accent" onClick={handleSubmit}>
            Kirim Pendaftaran <Check size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function DaftarPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1>Formulir <span className="text-gradient">Pendaftaran</span></h1>
            <p className={styles.heroDesc}>Lengkapi data berikut untuk berlangganan layanan ISP Net.</p>
          </div>
        </section>
        <section className={styles.formSection}>
          <div className="container">
            <Suspense fallback={<div style={{textAlign:'center',padding:'2rem',color:'var(--text-muted)'}}>Memuat formulir...</div>}>
              <DaftarForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
