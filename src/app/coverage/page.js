"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Link from "next/link";
import { MapPin, Search, CheckCircle2, XCircle, ArrowRight, Wifi } from "lucide-react";
import styles from "./page.module.css";

const coverageData = {
  "DKI Jakarta": {
    "Jakarta Selatan": ["Kebayoran Baru", "Mampang Prapatan", "Pancoran", "Tebet", "Setiabudi"],
    "Jakarta Pusat": ["Menteng", "Tanah Abang", "Cempaka Putih", "Gambir"],
    "Jakarta Barat": ["Grogol Petamburan", "Cengkareng", "Kebon Jeruk", "Palmerah"],
    "Jakarta Timur": ["Matraman", "Jatinegara", "Duren Sawit"],
    "Jakarta Utara": ["Kelapa Gading", "Tanjung Priok", "Penjaringan"],
  },
  "Jawa Barat": {
    "Bandung": ["Coblong", "Cidadap", "Sukajadi", "Cicendo", "Sumur Bandung"],
    "Bekasi": ["Bekasi Timur", "Bekasi Barat", "Bekasi Selatan", "Medan Satria"],
    "Depok": ["Beji", "Cimanggis", "Sukmajaya", "Pancoran Mas"],
  },
  "Jawa Timur": {
    "Surabaya": ["Gubeng", "Tegalsari", "Genteng", "Wonokromo", "Rungkut"],
    "Malang": ["Klojen", "Lowokwaru", "Blimbing"],
  },
  "Jawa Tengah": {
    "Semarang": ["Semarang Tengah", "Semarang Selatan", "Candisari", "Gajahmungkur"],
  },
  "Banten": {
    "Tangerang": ["Cipondoh", "Karawaci", "Tangerang", "Pinang"],
    "Tangerang Selatan": ["Serpong", "Pamulang", "Ciputat", "Pondok Aren"],
  },
};

export default function CoveragePage() {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [result, setResult] = useState(null);

  const provinces = Object.keys(coverageData);
  const cities = province ? Object.keys(coverageData[province] || {}) : [];
  const districts = province && city ? coverageData[province]?.[city] || [] : [];

  const handleCheck = () => {
    if (province && city && district) {
      const covered = districts.includes(district);
      setResult(covered ? "covered" : "not-covered");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1>Cek <span className="text-gradient">Coverage Area</span></h1>
            <p className={styles.heroDesc}>
              Pastikan layanan ISP Net tersedia di wilayah Anda sebelum mendaftar.
            </p>
          </div>
        </section>

        <section className={styles.checker}>
          <div className="container">
            <div className={styles.formCard}>
              <div className={styles.formIcon}>
                <MapPin size={32} />
              </div>
              <h2>Masukkan Lokasi Anda</h2>
              <p className={styles.formDesc}>Pilih provinsi, kota, dan kecamatan untuk mengecek ketersediaan layanan.</p>
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Provinsi</label>
                  <select className="form-select" value={province} onChange={e => { setProvince(e.target.value); setCity(""); setDistrict(""); setResult(null); }}>
                    <option value="">Pilih Provinsi</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kota / Kabupaten</label>
                  <select className="form-select" value={city} onChange={e => { setCity(e.target.value); setDistrict(""); setResult(null); }} disabled={!province}>
                    <option value="">Pilih Kota</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kecamatan</label>
                  <select className="form-select" value={district} onChange={e => { setDistrict(e.target.value); setResult(null); }} disabled={!city}>
                    <option value="">Pilih Kecamatan</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn btn-primary btn-lg w-full" onClick={handleCheck} disabled={!district}>
                <Search size={18} /> Cek Ketersediaan
              </button>

              {result === "covered" && (
                <div className={`${styles.result} ${styles.resultSuccess}`}>
                  <CheckCircle2 size={32} />
                  <div>
                    <h3>🎉 Area Anda Tersedia!</h3>
                    <p>Layanan ISP Net sudah tersedia di <strong>{district}, {city}, {province}</strong>.</p>
                    <p>Paket yang tersedia: <strong>Basic, Popular, Premium, Gaming Pro</strong></p>
                    <Link href={`/daftar`} className="btn btn-primary" style={{ marginTop: '12px' }}>
                      Daftar Sekarang <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}

              {result === "not-covered" && (
                <div className={`${styles.result} ${styles.resultDanger}`}>
                  <XCircle size={32} />
                  <div>
                    <h3>Maaf, Area Belum Tercover</h3>
                    <p>Layanan kami belum tersedia di area tersebut. Daftarkan email Anda untuk mendapat notifikasi saat area Anda tersedia.</p>
                    <div className={styles.waitlistForm}>
                      <input type="email" className="form-input" placeholder="Email Anda" />
                      <button className="btn btn-secondary">Daftar Waiting List</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Coverage Stats */}
            <div className={styles.statsGrid}>
              <div className={`glass-card ${styles.statCard}`}>
                <Wifi size={24} color="var(--primary)" />
                <span className={styles.statNum}>15+</span>
                <span className={styles.statLabel}>Kota Tercover</span>
              </div>
              <div className={`glass-card ${styles.statCard}`}>
                <MapPin size={24} color="var(--secondary)" />
                <span className={styles.statNum}>200+</span>
                <span className={styles.statLabel}>Kecamatan</span>
              </div>
              <div className={`glass-card ${styles.statCard}`}>
                <CheckCircle2 size={24} color="var(--success)" />
                <span className={styles.statNum}>50K+</span>
                <span className={styles.statLabel}>Pelanggan Aktif</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
