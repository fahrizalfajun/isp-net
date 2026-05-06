"use client";
import { Users, TrendingUp, Ticket, UserPlus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import styles from "./page.module.css";

const stats = [
  { label: "Total Pelanggan", value: "1,248", change: "+5.2%", up: true, icon: Users, color: "#0066FF" },
  { label: "Pendapatan Bulan Ini", value: "Rp 385 Jt", change: "+12.8%", up: true, icon: TrendingUp, color: "#00D4AA" },
  { label: "Tiket Aktif", value: "12", change: "-3", up: false, icon: Ticket, color: "#FF6B35" },
  { label: "Pendaftaran Baru", value: "28", change: "+8", up: true, icon: UserPlus, color: "#A855F7" },
];

const recentActivities = [
  { text: "Pelanggan baru: Ahmad Fauzi mendaftar paket Popular", time: "5 menit lalu", type: "success" },
  { text: "Tiket #142 telah diselesaikan oleh Teknisi Budi", time: "1 jam lalu", type: "info" },
  { text: "Paket Premium harga diupdate menjadi Rp 499.000", time: "2 jam lalu", type: "warning" },
  { text: "Pembayaran diterima dari Sari Dewi - Rp 299.000", time: "3 jam lalu", type: "success" },
  { text: "Area baru ditambahkan: Kelapa Gading, Jakarta Utara", time: "5 jam lalu", type: "info" },
  { text: "Tiket #145 baru dari pelanggan di Bandung", time: "6 jam lalu", type: "danger" },
];

const topPackages = [
  { name: "Popular 50 Mbps", count: 487, pct: 39, color: "#00D4AA" },
  { name: "Basic 30 Mbps", count: 356, pct: 29, color: "#3388FF" },
  { name: "Premium 100 Mbps", count: 234, pct: 19, color: "#FF6B35" },
  { name: "Gaming Pro", count: 98, pct: 8, color: "#A855F7" },
  { name: "Bisnis", count: 73, pct: 5, color: "#FFB300" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p className={styles.subtitle}>Ringkasan data ISP Net hari ini</p>
      </div>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statTop}>
              <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <div className={`${styles.statChange} ${stat.up ? styles.up : styles.down}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.gridTwo}>
        {/* Top Packages */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Paket Terlaris</h3>
          <div className={styles.packageList}>
            {topPackages.map((pkg, i) => (
              <div key={i} className={styles.packageItem}>
                <div className={styles.packageInfo}>
                  <span className={styles.packageRank}>#{i + 1}</span>
                  <span className={styles.packageName}>{pkg.name}</span>
                  <span className={styles.packageCount}>{pkg.count} pelanggan</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pkg.pct}%`, background: pkg.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Aktivitas Terbaru</h3>
          <div className={styles.activityList}>
            {recentActivities.map((act, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={`${styles.activityDot} ${styles[act.type]}`} />
                <div className={styles.activityContent}>
                  <p>{act.text}</p>
                  <span className={styles.activityTime}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
