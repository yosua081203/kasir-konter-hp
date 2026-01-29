// File: src/app/produk/edit/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/actions/productActions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProdukPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return <div className="p-10 text-center font-bold">Produk tidak ditemukan!</div>;

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProduct(id, formData);
    redirect("/produk");
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Edit Produk</h2>
        <p className="text-slate-500 font-medium">Ubah informasi barang atau perbarui gambar produk.</p>
      </div>
      
      <form action={handleUpdate} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
        
        {/* Preview & Input Gambar */}
        <div className="flex flex-col md:flex-row gap-8 items-center p-6 bg-slate-50 rounded-[2rem]">
          <div className="w-40 h-40 bg-white rounded-[1.5rem] overflow-hidden border-2 border-dashed border-slate-200 relative flex items-center justify-center">
            {product.image ? (
              <img src={`/uploads/products/${product.image}`} className="w-full h-full object-cover" alt="Current" />
            ) : (
              <span className="text-[10px] text-slate-400 font-bold uppercase">No Image</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-bold text-slate-700">Ganti Gambar Produk</label>
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
            />
            <p className="text-[10px] text-slate-400 font-medium italic">*Kosongkan jika tidak ingin mengubah gambar.</p>
          </div>
        </div>

        {/* Input Data Lainnya */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nama Produk</label>
            <input name="name" defaultValue={product.name} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-semibold" required />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Brand</label>
              <input name="brand" defaultValue={product.brand} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Kategori</label>
              <input name="category" defaultValue={product.category} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Harga (Rp)</label>
              <input name="price" type="number" defaultValue={Number(product.price)} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Stok Unit</label>
              <input name="stock" type="number" defaultValue={product.stock} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold" required />
            </div>
          </div>
        </div>

        <div className="pt-6 flex gap-4">
           <button type="submit" className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl transition-all active:scale-95">
            Simpan Perubahan
          </button>
           <Link href="/produk" className="px-10 py-5 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all text-center">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}