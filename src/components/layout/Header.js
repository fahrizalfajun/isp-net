"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Wifi, Globe, ChevronDown, User } from "lucide-react";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: { id: "Beranda", en: "Home" } },
  { href: "/paket", label: { id: "Paket", en: "Plans" } },
  { href: "/coverage", label: { id: "Coverage", en: "Coverage" } },
  { href: "/tentang", label: { id: "Tentang", en: "About" } },
  { href: "/blog", label: { id: "Blog", en: "Blog" } },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("isp-lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "id" ? "en" : "id";
    setLang(newLang);
    localStorage.setItem("isp-lang", newLang);
    window.dispatchEvent(new CustomEvent("lang-change", { detail: newLang }));
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Wifi size={24} />
          </div>
          <span className={styles.logoText}>
            ISP<span className={styles.logoAccent}>Net</span>
          </span>
        </Link>

        <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label[lang]}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <Link href="/login" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>
              <User size={18} />
              Login
            </Link>
            <Link href="/daftar" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              {lang === "id" ? "Daftar Sekarang" : "Register Now"}
            </Link>
          </div>
        </nav>

        <div className={styles.actions}>
          <button className={styles.langToggle} onClick={toggleLang} title="Switch Language">
            <Globe size={16} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <Link href="/login" className={`btn btn-ghost btn-sm ${styles.loginBtn}`}>
            <User size={16} />
            Login
          </Link>
          <Link href="/daftar" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            {lang === "id" ? "Daftar" : "Register"}
          </Link>
          <button
            className={styles.menuToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
    </header>
  );
}
