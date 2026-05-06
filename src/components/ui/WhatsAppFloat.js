"use client";
import { MessageCircle } from "lucide-react";
import styles from "./WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/628001234567?text=Halo,%20saya%20tertarik%20dengan%20layanan%20ISP%20Net"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
