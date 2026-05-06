"use client";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Wifi, Receipt, Ticket, User, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

const invoices = [
  { month: "Mei 2026", amount: "Rp 299.000", status: "unpaid", due: "15 Mei 2026" },
  { month: "April 2026", amount: "Rp 299.000", status: "paid", paid: "12 Apr 2026" },
  { month: "Maret 2026", amount: "Rp 299.000", status: "paid", paid: "10 Mar 2026" },
  { month: "Februari 2026", amount: "Rp 299.000", status: "paid", paid: "13 Feb 2026" },
];

const tickets = [
  { id: 145, subject: "Speed test tidak sesuai paket", status: "in_progress", date: "4 Mei 2026" },
  { id: 138, subject: "WiFi sering disconnect malam hari", status: "resolved", date: "20 Apr 2026" },
];

export default function DashboardPage() {
  const statusIcon = (s) => {
    if (s === "paid") return <CheckCircle2 size={16} color="var(--success)" />;
    if (s === "unpaid") return <Clock size={16} color="var(--warning)" />;
    return <AlertCircle size={16} color="var(--danger)" />;
  };

  const statusLabel = (s) => {
    const map = { paid: { cls: "badge-success", label: "Lunas" }, unpaid: { cls: "badge-warning", label: "Belum Bayar" }, overdue: { cls: "badge-danger", label: "Terlambat" } };
    return <span className={`badge badge-dot ${map[s].cls}`}>{map[s].label}</span>;
  };

  const ticketStatus = (s) => {
    const map = { open: { cls: "badge-warning", label: "Open" }, in_progress: { cls: "badge-info", label: "Diproses" }, resolved: { cls: "badge-success", label: "Selesai" } };
    return <span className={`badge badge-dot ${map[s].cls}`}>{map[s].label}</span>;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.greeting}>
            <h1>Halo, <span className="text-gradient">Ahmad Fauzi</span> 👋</h1>
            <p>Selamat datang di dashboard pelanggan ISP Net</p>
          </div>

          {/* Overview Cards */}
          <div className={styles.overview}>
            <div className={`glass-card ${styles.overviewCard}`}>
              <Wifi size={24} color="var(--primary)" />
              <div><span className={styles.label}>Paket Aktif</span><strong>Popular 50 Mbps</strong></div>
            </div>
            <div className={`glass-card ${styles.overviewCard}`}>
              <Receipt size={24} color="var(--warning)" />
              <div><span className={styles.label}>Tagihan Berikutnya</span><strong>Rp 299.000</strong><span className={styles.due}>Jatuh tempo: 15 Mei 2026</span></div>
            </div>
            <div className={`glass-card ${styles.overviewCard}`}>
              <CheckCircle2 size={24} color="var(--success)" />
              <div><span className={styles.label}>Status Koneksi</span><strong style={{color:'var(--success)'}}>● Aktif</strong></div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Tagihan */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2><Receipt size={20} /> Riwayat Tagihan</h2>
              </div>
              <div className={styles.invoiceList}>
                {invoices.map((inv, i) => (
                  <div key={i} className={styles.invoiceItem}>
                    <div className={styles.invoiceInfo}>
                      {statusIcon(inv.status)}
                      <div>
                        <strong>{inv.month}</strong>
                        <span>{inv.amount}</span>
                      </div>
                    </div>
                    {inv.status === "unpaid" ? (
                      <button className="btn btn-accent btn-sm">Bayar</button>
                    ) : (
                      statusLabel(inv.status)
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tiket */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2><Ticket size={20} /> Tiket Gangguan</h2>
                <button className="btn btn-primary btn-sm">+ Buat Tiket</button>
              </div>
              <div className={styles.ticketList}>
                {tickets.map((t, i) => (
                  <div key={i} className={styles.ticketItem}>
                    <div>
                      <div className={styles.ticketId}>#{t.id}</div>
                      <strong>{t.subject}</strong>
                      <span className={styles.ticketDate}>{t.date}</span>
                    </div>
                    {ticketStatus(t.status)}
                  </div>
                ))}
                {tickets.length === 0 && <p className={styles.empty}>Tidak ada tiket aktif</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
