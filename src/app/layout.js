import "./globals.css";

export const metadata = {
  title: "ISP Net — Internet Cepat & Stabil untuk Rumah dan Bisnis",
  description:
    "ISP Net menyediakan layanan internet fiber optic berkecepatan tinggi untuk rumah dan bisnis. Mulai dari Rp 199.000/bulan dengan jaringan stabil 99.9% uptime dan dukungan 24/7.",
  keywords: "ISP, internet, fiber optic, WiFi, broadband, Indonesia",
  openGraph: {
    title: "ISP Net — Internet Cepat & Stabil",
    description: "Layanan internet fiber optic terbaik untuk rumah dan bisnis Anda.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
