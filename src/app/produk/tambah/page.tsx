// File: src/app/produk/tambah/page.tsx
"use client";

import { addProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahProdukPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // Memanggil fungsi simpan yang menggunakan link URL
    await addProduct(formData);
    
    // Setelah berhasil simpan, kembali ke halaman daftar produk
    alert("Produk Berhasil Ditambahkan ke Server!");
    router.push("/produk");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <Link href="/produk" className="text-blue-600 hover:underline text-sm mb-2 block font-bold">
          ← Kembali ke Daftar Stok
        </Link>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Tambah Produk Baru</h2>
        <p className="text-slate-500 font-medium">Lengkapi detail unit konter HP untuk disimpan di cloud.</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <form action={handleSubmit} className="space-y-8">
          
          {/* Baris 1: Nama & Merk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Nama Produk</label>
              <input 
                name="name" 
                type="text" 
                placeholder="Contoh: iPhone 15 Pro" 
                className="p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Merk / Brand</label>
              <input 
                name="brand" 
                type="text" 
                placeholder="Contoh: Apple" 
                className="p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                required
              />
            </div>
          </div>

          {/* Baris 2: Jenis & Stok */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Jenis Produk</label>
              <select 
                name="category" 
                className="p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                required
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Aksesoris">Aksesoris</option>
                <option value="Sparepart">Sparepart</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Jumlah Stok</label>
              <input 
                name="stock" 
                type="number" 
                placeholder="0" 
                className="p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                required
              />
            </div>
          </div>

          {/* Baris 3: Harga */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Harga Jual (Rupiah)</label>
            <div className="relative">
              <span className="absolute left-5 top-4 text-slate-400 font-bold">Rp</span>
              <input 
                name="price" 
                type="number" 
                placeholder="0" 
                className="w-full p-4 pl-14 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-black text-blue-600"
                required
              />
            </div>
          </div>

          {/* Baris 4: Link Foto Produk (GANTI FILE UPLOAD) */}
          <div className="flex flex-col gap-3 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
            <label className="text-sm font-bold text-blue-800 ml-1 flex items-center gap-2">
              🌐 Link Alamat Foto Produk (URL)
            </label>
            <input 
              name="imageUrl" 
              type="text" 
              placeholder="Tempel link foto dari internet di sini..." 
              className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-blue-600"
              required
            />
            <p className="text-[10px] text-blue-400 font-medium italic ml-1">
              *Cara: Cari gambar di Google {">"} Klik Kanan {">"} Copy Image Address {">"} Paste di sini.
            </p>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-2xl transition-all mt-4 transform active:scale-95"
          >
            Simpan ke Cloud & Publish
          </button>

        </form>
      </div>
    </div>
  );
}