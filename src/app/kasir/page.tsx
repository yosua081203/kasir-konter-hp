// File: src/app/kasir/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createTransaction } from "@/actions/productActions";

export default function KasirPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product: any) => {
    if (product.stock <= 0) return alert("Stok Habis!");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  const handleCheckout = async () => {
    if (!customerName) return alert("Masukkan Nama Pelanggan!");
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    
    setLoading(true);
    try {
      await createTransaction(customerName, cart, total);
      alert("Transaksi Berhasil Disimpan!");
      setCart([]);
      setCustomerName("");
      window.location.reload(); 
    } catch (error) {
      alert("Gagal melakukan transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* BAGIAN KIRI: DAFTAR PRODUK */}
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800">Kasir Penjualan</h2>
          <p className="text-slate-500">Pilih produk untuk memulai transaksi baru.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div 
              key={p.id} 
              onClick={() => addToCart(p)}
              className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="aspect-square bg-slate-50 rounded-[1.5rem] mb-4 overflow-hidden relative">
                {p.image ? (
                  <img src={`/uploads/products/${p.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300 font-bold uppercase tracking-widest text-[10px]">No Image</div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-slate-700">
                  Stok: {p.stock}
                </div>
              </div>
              <h4 className="font-bold text-slate-800 truncate">{p.name}</h4>
              <p className="text-blue-600 font-black mt-1">Rp {Number(p.price).toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BAGIAN KANAN: RINGKASAN BELANJA (STRUK) */}
      <div className="w-full lg:w-[400px]">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-10">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span> Keranjang
          </h3>

          <div className="space-y-4 mb-8">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Pelanggan</label>
              <input 
                type="text" 
                placeholder="Contoh: Budi Santoso" 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-8">
            {cart.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-sm italic">Keranjang kosong</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.quantity} x Rp {Number(item.price).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-sm text-slate-800">Rp {(item.quantity * Number(item.price)).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors text-xs font-bold">X</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-dashed border-slate-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Bayar</span>
              <span className="text-3xl font-black text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl transition-all transform active:scale-95 disabled:bg-slate-300"
            >
              {loading ? "Memproses..." : "Selesaikan Pesanan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}