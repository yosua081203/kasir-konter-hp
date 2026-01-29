// File: src/app/produk/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function ProdukPage() {
  // Mengambil data produk terbaru dari database XAMPP
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Stok Barang</h2>
          <p className="text-slate-500 text-lg font-medium mt-1">Kelola dan pantau persediaan unit konter Anda.</p>
        </div>
        <Link 
          href="/produk/tambah" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-xl shadow-blue-100 transition-all transform active:scale-95"
        >
          + Tambah Produk Baru
        </Link>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Produk</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Harga Satuan</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Sisa Stok</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-20 text-center">
                  <p className="text-slate-400 italic">Belum ada data produk. Silakan tambah produk baru.</p>
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Gambar */}
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                        {item.image ? (
                          <img 
                            src={`/uploads/products/${item.image}`} 
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[8px] text-slate-400 font-bold uppercase">No Pic</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{item.name}</p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-slate-500 font-medium text-sm">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{item.category}</span>
                  </td>
                  <td className="p-6 text-center font-black text-slate-800">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black ${
                      item.stock < 5 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-blue-50 text-blue-600'
                    }`}>
                      {item.stock} Unit
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center gap-6">
                      <Link 
                        href={`/produk/edit/${item.id}`} 
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info Tambahan */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">!</div>
        <p className="text-blue-700 text-sm font-medium">
          <strong>Tips:</strong> Produk dengan stok di bawah 5 unit akan berwarna merah dan muncul di Dashboard sebagai peringatan restock.
        </p>
      </div>
    </div>
  );
}