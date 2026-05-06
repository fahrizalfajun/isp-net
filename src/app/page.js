"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import {
  Zap, Shield, Headphones, Wallet, Check, Star, ArrowRight,
  Wifi, MapPin, ChevronDown, ChevronUp, Clock, Users, Award
} from "lucide-react";
import styles from "./page.module.css";

const packages = [
  {
    name: "Basic",
    speed: "30",
    price: "199.000",
    features: ["Unlimited Data", "WiFi Router Gratis", "Instalasi Gratis", "Support 24/7"],
    popular: false,
    color: "#3388FF",
  },
  {
    name: "Popular",
    speed: "50",
    price: "299.000",
    features: ["Unlimited Data", "WiFi Router Gratis", "Instalasi Gratis", "Support 24/7", "Priority Bandwidth", "Free 1 Bulan"],
    popular: true,
    color: "#00D4AA",
  },
  {
    name: "Premium",
    speed: "100",
    price: "499.000",
    features: ["Unlimited Data", "Mesh WiFi System", "Instalasi Gratis", "Support 24/7", "Priority Bandwidth", "Static IP", "SLA 99.9%"],
    popular: false,
    color: "#FF6B35",
  },
];

const features = [
  { icon: Zap, title: "Super Cepat", desc: "Kecepatan hingga 1 Gbps dengan fiber optic terbaru", color: "#0066FF" },
  { icon: Shield, title: "Ultra Stabil", desc: "Uptime 99.9% dengan jaringan backbone redundan", color: "#00D4AA" },
  { icon: Headphones, title: "Support 24/7", desc: "Tim support siap membantu kapan saja via telepon, chat, atau WhatsApp", color: "#FF6B35" },
  { icon: Wallet, title: "Harga Terjangkau", desc: "Paket mulai dari Rp 199.000/bulan tanpa biaya tersembunyi", color: "#A855F7" },
];

const testimonials = [
  { name: "Budi Santoso", role: "Freelancer, Jakarta", content: "Internet ISP Net sangat stabil! Saya bisa video call seharian tanpa buffering. Highly recommended!", rating: 5 },
  { name: "Sari Dewi", role: "Ibu Rumah Tangga, Bandung", content: "Anak-anak bisa belajar online dan streaming bersamaan tanpa lemot. Puas banget!", rating: 5 },
  { name: "Andi Pratama", role: "Gamer, Surabaya", content: "Ping rendah, koneksi stabil, perfect buat gaming! Sudah 2 tahun langganan, tidak pernah kecewa.", rating: 5 },
];

const faqs = [
  { q: "Berapa lama proses instalasi?", a: "Proses instalasi biasanya selesai dalam 1-3 hari kerja setelah survei lokasi. Tim teknisi kami akan menghubungi Anda untuk menjadwalkan waktu yang sesuai." },
  { q: "Apakah ada biaya instalasi?", a: "Untuk saat ini, biaya instalasi GRATIS untuk semua paket. Anda hanya perlu membayar tagihan bulan pertama saat pendaftaran." },
  { q: "Bagaimana jika internet bermasalah?", a: "Anda bisa menghubungi support 24/7 via telepon, WhatsApp, atau membuat tiket gangguan di dashboard pelanggan. Tim teknisi kami akan segera merespons." },
  { q: "Bisa upgrade atau downgrade paket?", a: "Ya, Anda bisa mengubah paket kapan saja melalui dashboard pelanggan. Perubahan akan berlaku di periode tagihan berikutnya." },
  { q: "Area mana saja yang sudah tercover?", a: "Saat ini kami melayani area Jabodetabek, Bandung, Surabaya, Semarang, dan beberapa kota besar lainnya. Gunakan fitur Coverage Checker untuk mengecek area Anda." },
];

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = end / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}{suffix}</span>;
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <div className={styles.heroOrb1} />
            <div className={styles.heroOrb2} />
            <div className={styles.heroGrid} />
          </div>
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroBadge}>
              <Zap size={14} />
              <span>Fiber Optic Terbaru 2026</span>
            </div>
            <h1 className={styles.heroTitle}>
              Internet <span className="text-gradient">Cepat & Stabil</span>
              <br />untuk Rumah dan Bisnis
            </h1>
            <p className={styles.heroDesc}>
              Nikmati koneksi internet fiber optic berkecepatan tinggi dengan harga terjangkau.
              Streaming, gaming, dan bekerja tanpa batas.
            </p>
            <div className={styles.heroActions}>
              <Link href="/paket" className="btn btn-primary btn-lg">
                Pilih Paket <ArrowRight size={18} />
              </Link>
              <Link href="/coverage" className="btn btn-secondary btn-lg">
                <MapPin size={18} /> Cek Coverage
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}><Counter end={50000} suffix="+" /></span>
                <span className={styles.statLabel}>Pelanggan Aktif</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>99.9%</span>
                <span className={styles.statLabel}>Uptime</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}><Counter end={15} suffix="+" /></span>
                <span className={styles.statLabel}>Kota</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className={`section ${styles.features}`}>
          <div className="container">
            <div className="section-header">
              <h2>Mengapa Memilih <span className="text-gradient">ISP Net</span>?</h2>
              <p>Kami menghadirkan koneksi internet terbaik dengan teknologi fiber optic terdepan</p>
            </div>
            <div className={`grid grid-4 ${styles.featGrid}`}>
              {features.map((f, i) => (
                <div key={i} className={`glass-card ${styles.featCard}`}>
                  <div className={styles.featIcon} style={{ background: `${f.color}20`, color: f.color }}>
                    <f.icon size={28} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className={`section ${styles.pricing}`}>
          <div className="container">
            <div className="section-header">
              <h2>Pilih <span className="text-gradient">Paket Terbaik</span> untuk Anda</h2>
              <p>Semua paket sudah termasuk perangkat WiFi dan instalasi gratis</p>
            </div>
            <div className={styles.pricingGrid}>
              {packages.map((pkg, i) => (
                <div key={i} className={`${styles.priceCard} ${pkg.popular ? styles.pricePopular : ""}`}>
                  {pkg.popular && <div className={styles.popularBadge}>🔥 Paling Laris</div>}
                  <div className={styles.priceHeader}>
                    <h3 style={{ color: pkg.color }}>{pkg.name}</h3>
                    <div className={styles.speed}>
                      <span className={styles.speedNum}>{pkg.speed}</span>
                      <span className={styles.speedUnit}>Mbps</span>
                    </div>
                  </div>
                  <div className={styles.priceAmount}>
                    <span className={styles.currency}>Rp</span>
                    <span className={styles.priceNum}>{pkg.price}</span>
                    <span className={styles.period}>/bulan</span>
                  </div>
                  <ul className={styles.featureList}>
                    {pkg.features.map((f, j) => (
                      <li key={j}><Check size={16} className={styles.checkIcon} /> {f}</li>
                    ))}
                  </ul>
                  <Link href="/daftar" className={`btn ${pkg.popular ? "btn-primary" : "btn-secondary"} w-full`}>
                    Pilih Paket
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className={`section ${styles.testimonials}`}>
          <div className="container">
            <div className="section-header">
              <h2>Apa Kata <span className="text-gradient">Pelanggan Kami</span></h2>
              <p>Ribuan pelanggan sudah merasakan kualitas internet ISP Net</p>
            </div>
            <div className={styles.testimonialCarousel}>
              {testimonials.map((t, i) => (
                <div key={i} className={`glass-card ${styles.testimonialCard} ${i === activeTestimonial ? styles.active : ""}`}>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#FFB300" color="#FFB300" />
                    ))}
                  </div>
                  <p className={styles.quote}>&ldquo;{t.content}&rdquo;</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>{t.name[0]}</div>
                    <div>
                      <div className={styles.authorName}>{t.name}</div>
                      <div className={styles.authorRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ""}`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={`section ${styles.faqSection}`}>
          <div className="container">
            <div className="section-header">
              <h2>Pertanyaan <span className="text-gradient">yang Sering Diajukan</span></h2>
              <p>Temukan jawaban untuk pertanyaan umum seputar layanan kami</p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}>
                  <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openFaq === i && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaContent}>
                <h2>Siap Beralih ke Internet yang Lebih Cepat?</h2>
                <p>Daftar sekarang dan nikmati koneksi internet fiber optic terbaik. Instalasi GRATIS!</p>
                <div className={styles.ctaActions}>
                  <Link href="/daftar" className="btn btn-accent btn-lg">
                    Daftar Sekarang <ArrowRight size={18} />
                  </Link>
                  <Link href="/paket" className="btn btn-ghost btn-lg">
                    Lihat Semua Paket
                  </Link>
                </div>
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
