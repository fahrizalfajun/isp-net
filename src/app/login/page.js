"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { Wifi, Eye, EyeOff, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState("customer");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - store role and redirect
    localStorage.setItem("isp-user", JSON.stringify({ email, role, name: role === "admin" ? "Admin" : "Ahmad Fauzi" }));
    if (role === "admin") router.push("/admin");
    else router.push("/dashboard");
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.logoWrap}>
              <div className={styles.logo}><Wifi size={28} /></div>
              <h1>Masuk ke <span className="text-gradient">ISP Net</span></h1>
              <p>Akses dashboard pelanggan atau admin panel</p>
            </div>

            <div className={styles.roleToggle}>
              <button className={`${styles.roleBtn} ${role === "customer" ? styles.roleActive : ""}`} onClick={() => setRole("customer")}>Pelanggan</button>
              <button className={`${styles.roleBtn} ${role === "admin" ? styles.roleActive : ""}`} onClick={() => setRole("admin")}>Admin</button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className={styles.pwWrap}>
                  <input className="form-input" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                  <button type="button" className={styles.pwToggle} onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button className="btn btn-primary btn-lg w-full" type="submit">
                Masuk <ArrowRight size={18} />
              </button>
            </form>

            <p className={styles.footer}>
              Belum punya akun? <Link href="/daftar">Daftar sekarang</Link>
            </p>

            <div className={styles.demoInfo}>
              <p><strong>Demo:</strong> Masukkan email & password apapun untuk login.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
