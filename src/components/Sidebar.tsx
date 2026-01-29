// File: src/components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-2xl flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tighter text-blue-400">
          KONTER<span className="text-white">PRO</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-widest">Management System</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition-all group border-l-4 border-blue-500 bg-slate-800/50">
          <span className="font-semibold">Dashboard</span>
        </Link>
        <Link href="/produk" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition-all group border-l-4 border-transparent hover:border-blue-500">
          <span className="font-semibold">Stok Barang</span>
        </Link>
        <Link href="/kasir" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition-all group border-l-4 border-transparent hover:border-blue-500">
          <span className="font-semibold">Kasir Penjualan</span>
        </Link>
        <Link href="/laporan" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-800 transition-all group border-l-4 border-transparent hover:border-blue-500">
          <span className="font-semibold">Laporan</span>
        </Link>
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400">Status Server</p>
          <p className="text-sm font-bold text-green-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online (Local)
          </p>
        </div>
      </div>
    </div>
  );
}