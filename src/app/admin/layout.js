"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, Package, FileText, MapPin, Users, Receipt, Ticket,
  Settings, ChevronLeft, Bell, Search, LogOut, Wifi, Menu
} from "lucide-react";
import styles from "./layout.module.css";

const menuItems = [
  { href: "/admin", icon: BarChart3, label: "Dashboard" },
  { href: "/admin/produk", icon: Package, label: "Produk & Paket" },
  { href: "/admin/pelanggan", icon: Users, label: "Pelanggan" },
  { href: "/admin/tagihan", icon: Receipt, label: "Tagihan" },
  { href: "/admin/tiket", icon: Ticket, label: "Tiket Gangguan" },
  { href: "/admin/konten", icon: FileText, label: "Konten" },
  { href: "/admin/coverage", icon: MapPin, label: "Coverage Area" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/admin" className={styles.logo}>
            <div className={styles.logoIcon}><Wifi size={20} /></div>
            {!collapsed && <span className={styles.logoText}>ISP<span>Net</span> Admin</span>}
          </Link>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={18} style={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
          </button>
        </div>

        <nav className={styles.nav}>
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.navActive : ""}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navItem} title="Kembali ke Website">
            <LogOut size={20} />
            {!collapsed && <span>Keluar</span>}
          </Link>
        </div>
      </aside>

      {/* Overlay mobile */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      {/* Main Content */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <div className={styles.searchBar}>
            <Search size={16} />
            <input placeholder="Cari..." />
          </div>
          <div className={styles.topActions}>
            <button className={styles.notifBtn}>
              <Bell size={18} />
              <span className={styles.notifDot} />
            </button>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>A</div>
              <span className={styles.userName}>Admin</span>
            </div>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
