// File: src/app/page.tsx
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const totalProduk = await prisma.product.count();
  const stokMenipis = await prisma.product.count({ where: { stock: { lt: 5 } } });
  const transactions = await prisma.transaction.findMany();
  const totalPenjualan = transactions.reduce((sum, item) => sum + Number(item.totalAmount), 0);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ringkasan Statistik</h2>
        <p className="text-slate-500 text-lg mt-1 font-medium">Pantau kinerja konter Anda secara real-time.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
             <div className="text-blue-600 group-hover:text-white font-bold text-xl">#</div>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Produk</p>
          <h3 className="text-4xl font-black mt-2 text-slate-900">{totalProduk} <span className="text-base font-medium text-slate-400 italic">Models</span></h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
             <div className="text-green-600 group-hover:text-white font-bold text-xl">$</div>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Omzet</p>
          <h3 className="text-4xl font-black mt-2 text-green-600">Rp {totalPenjualan.toLocaleString('id-ID')}</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
             <div className="text-red-600 group-hover:text-white font-bold text-xl">!</div>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Stok Menipis</p>
          <h3 className="text-4xl font-black mt-2 text-red-500">{stokMenipis} <span className="text-base font-medium text-slate-400 italic">Units</span></h3>
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-3xl font-bold italic">"Kualitas adalah prioritas."</h3>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">Pastikan semua stok barang dicek secara berkala dan berikan pelayanan terbaik kepada pelanggan konter Anda.</p>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}