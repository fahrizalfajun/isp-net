"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { Check, Zap, Wifi, Shield, Gamepad2, Building2, Home, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const allPackages = [
  {
    name: "Basic", slug: "basic", speed: "30", price: "199.000", category: "home",
    fup: "Unlimited", desc: "Cocok untuk browsing, streaming SD, dan kebutuhan internet dasar.",
    features: ["Unlimited Data", "WiFi Router Gratis", "Instalasi Gratis", "Support 24/7", "1 Perangkat Priority"],
    color: "#3388FF",
  },
  {
    name: "Popular", slug: "popular", speed: "50", price: "299.000", category: "home", popular: true,
    fup: "Unlimited", desc: "Ideal untuk keluarga. Streaming HD, video call, dan gaming online lancar.",
    features: ["Unlimited Data", "WiFi Router Gratis", "Instalasi Gratis", "Support 24/7", "Priority Bandwidth", "Free 1 Bulan", "5 Perangkat Priority"],
    color: "#00D4AA",
  },
  {
    name: "Premium", slug: "premium", speed: "100", price: "499.000", category: "home",
    fup: "Unlimited", desc: "Untuk power user. Streaming 4K, gaming pro, dan WFH tanpa batas.",
    features: ["Unlimited Data", "Mesh WiFi System", "Instalasi Gratis", "Support 24/7", "Priority Bandwidth", "Static IP", "SLA 99.9%", "10 Perangkat Priority"],
    color: "#FF6B35",
  },
  {
    name: "Gaming Pro", slug: "gaming-pro", speed: "100", price: "399.000", category: "gaming",
    fup: "Unlimited", desc: "Dioptimalkan untuk gaming. Ping rendah, route gaming khusus.",
    features: ["Unlimited Data", "WiFi Router Gaming", "Instalasi Gratis", "Support 24/7", "Gaming Route Optimization", "Low Latency Mode", "Discord Priority"],
    color: "#A855F7",
  },
  {
    name: "Bisnis Starter", slug: "bisnis-starter", speed: "100", price: "599.000", category: "business",
    fup: "Unlimited", desc: "Untuk UMKM dan kantor kecil. Koneksi stabil dengan SLA terjamin.",
    features: ["Unlimited Data", "WiFi Router Enterprise", "Instalasi Gratis", "Support 24/7 Priority", "Static IP", "SLA 99.9%", "5 Email Bisnis"],
    color: "#0066FF",
  },
  {
    name: "Bisnis Pro", slug: "bisnis-pro", speed: "200", price: "899.000", category: "business",
    fup: "Unlimited", desc: "Untuk perusahaan menengah. Bandwidth besar, dedicated support.",
    features: ["Unlimited Data", "Mesh WiFi Enterprise", "Instalasi Gratis", "Dedicated Support", "5 Static IP", "SLA 99.99%", "10 Email Bisnis", "VPN Ready"],
    color: "#00D4AA",
  },
];

const categories = [
  { key: "all", label: "Semua", icon: Wifi },
  { key: "home", label: "Rumah", icon: Home },
  { key: "gaming", label: "Gaming", icon: Gamepad2 },
  { key: "business", label: "Bisnis", icon: Building2 },
];

export default function PaketPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? allPackages : allPackages.filter(p => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1>Paket <span className="text-gradient">Internet</span></h1>
            <p className={styles.heroDesc}>Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket termasuk perangkat dan instalasi gratis.</p>
          </div>
        </section>

        <section className={`section ${styles.packages}`}>
          <div className="container">
            <div className={styles.filters}>
              {categories.map(cat => (
                <button
                  key={cat.key}
                  className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterActive : ""}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  <cat.icon size={16} />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className={styles.grid}>
              {filtered.map((pkg, i) => (
                <div key={i} className={`${styles.card} ${pkg.popular ? styles.popular : ""}`}>
                  {pkg.popular && <div className={styles.badge}>🔥 Paling Laris</div>}
                  <div className={styles.cardTop}>
                    <h3 style={{ color: pkg.color }}>{pkg.name}</h3>
                    <p className={styles.desc}>{pkg.desc}</p>
                    <div className={styles.speed}>
                      <span className={styles.speedNum}>{pkg.speed}</span>
                      <span className={styles.speedUnit}>Mbps</span>
                    </div>
                    <div className={styles.price}>
                      <span className={styles.currency}>Rp</span>
                      <span className={styles.priceNum}>{pkg.price}</span>
                      <span className={styles.period}>/bulan</span>
                    </div>
                  </div>
                  <ul className={styles.features}>
                    {pkg.features.map((f, j) => (
                      <li key={j}><Check size={14} color="#00D4AA" /> {f}</li>
                    ))}
                  </ul>
                  <Link href={`/daftar?paket=${pkg.slug}`} className={`btn ${pkg.popular ? "btn-primary" : "btn-secondary"} w-full`}>
                    Pilih Paket <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
