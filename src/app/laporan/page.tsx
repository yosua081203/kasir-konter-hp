// File: src/app/laporan/page.tsx
import { prisma } from "@/lib/prisma";

export default async function LaporanPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalPendapatan = transactions.reduce((sum, item) => sum + Number(item.totalAmount), 0);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Riwayat Laporan</h2>
          <p className="text-slate-500 text-lg mt-1 font-medium">Data seluruh transaksi yang telah berhasil.</p>
        </div>
        <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Akumulasi</p>
          <p className="text-2xl font-black text-green-600">Rp {totalPendapatan.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID TRX</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal & Waktu</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Pelanggan</th>
              <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Total Nominal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tr) => (
              <tr key={tr.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 text-sm font-mono text-slate-400">#TX-{tr.id}</td>
                <td className="p-6 text-sm font-medium text-slate-600">
                  {new Date(tr.createdAt).toLocaleString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </td>
                <td className="p-6 font-bold text-slate-800">{tr.customerName}</td>
                <td className="p-6 text-right font-black text-slate-900">
                  Rp {Number(tr.totalAmount).toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}