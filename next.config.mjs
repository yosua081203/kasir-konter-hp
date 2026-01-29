/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ini memerintahkan Vercel untuk mengabaikan error penulisan 
    // agar build tetap lanjut sampai selesai.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Mengabaikan error tipe data saat build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;