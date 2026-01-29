// File: src/app/produk/tambah/page.tsx
"use client";

import { addProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahProdukPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // Memanggil fungsi simpan yang sudah kita buat di Langkah 6
    await addProduct(formData);
    
    // Setelah berhasil simpan, kembali ke halaman daftar produk
    alert("Produk Berhasil Ditambahkan!");
    router.push("/produk");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/produk" className="text-blue-600 hover:underline text-sm mb-2 block">
          ← Kembali ke Daftar Stok
        </Link>
        <h2 className="text-3xl font-bold text-slate-800">Tambah Produk Baru</h2>
        <p className="text-slate-500">Masukkan detail produk konter HP dengan lengkap.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form action={handleSubmit} className="space-y-6">
          
          {/* Baris 1: Nama & Merk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Nama Produk</label>
              <input 
                name="name" 
                type="text" 
                placeholder="Contoh: iPhone 15 Pro" 
                className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Merk / Brand</label>
              <input 
                name="brand" 
                type="text" 
                placeholder="Contoh: Apple" 
                className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Baris 2: Jenis & Stok */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Jenis Produk</label>
              <select 
                name="category" 
                className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                required
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Aksesoris">Aksesoris</option>
                <option value="Sparepart">Sparepart</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Jumlah Stok</label>
              <input 
                name="stock" 
                type="number" 
                placeholder="0" 
                className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Baris 3: Harga */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Harga Jual (Rupiah)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-medium">Rp</span>
              <input 
                name="price" 
                type="number" 
                placeholder="0" 
                className="w-full p-3 pl-12 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Baris 4: Upload Gambar */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Gambar Produk</label>
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              className="p-2 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-sm text-slate-500"
            />
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all mt-4"
          >
            Simpan Produk ke Database
          </button>

        </form>
      </div>
    </div>
  );
}