import Link from "next/link";
import { Wifi, Phone, Mail, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

/* Social media SVG icons (lucide-react dropped brand icons) */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}><Wifi size={20} /></div>
              <span className={styles.logoText}>ISP<span className={styles.logoAccent}>Net</span></span>
            </div>
            <p className={styles.desc}>
              Penyedia layanan internet fiber optic berkecepatan tinggi untuk rumah dan bisnis di seluruh Indonesia.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook"><FacebookIcon size={18} /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon size={18} /></a>
              <a href="#" aria-label="Youtube"><YoutubeIcon size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Layanan</h4>
            <Link href="/paket">Paket Internet</Link>
            <Link href="/coverage">Cek Coverage</Link>
            <Link href="/daftar">Daftar Baru</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Perusahaan</h4>
            <Link href="/tentang">Tentang Kami</Link>
            <Link href="/blog">Blog & Tips</Link>
            <Link href="/karir">Karir</Link>
            <Link href="/kontak">Hubungi Kami</Link>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Kontak</h4>
            <div className={styles.contactItem}>
              <Phone size={14} />
              <span>0800-123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={14} />
              <span>hello@ispnet.id</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={14} />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 ISP Net. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
