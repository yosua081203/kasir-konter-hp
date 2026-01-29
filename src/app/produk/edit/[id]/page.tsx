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
        <Link href="/produk" className="text-blue-600 hover:underline text-sm mb-2 block font-bold">
          ← Batal & Kembali
        </Link>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Edit Produk</h2>
        <p className="text-slate-500 font-medium">Perbarui informasi unit atau ganti link foto produk.</p>
      </div>
      
      <form action={handleUpdate} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
        
        {/* Preview & Input Link Gambar */}
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
          <div className="w-40 h-40 bg-white rounded-[1.5rem] overflow-hidden border-2 border-white shadow-md relative flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                className="w-full h-full object-cover" 
                alt="Current Preview" 
              />
            ) : (
              <span className="text-[10px] text-slate-400 font-bold uppercase text-center p-4">Tidak Ada Gambar</span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <label className="block text-sm font-bold text-blue-900">Link Foto Produk (URL)</label>
            <input 
              name="imageUrl" 
              type="text" 
              defaultValue={product.image || ""}
              placeholder="Tempel link foto baru di sini..."
              className="w-full p-4 rounded-2xl bg-white border-none outline-none focus:ring-2 focus:ring-blue-500 font-medium text-blue-600 text-sm"
              required
            />
            <p className="text-[10px] text-blue-400 font-medium italic">
              *Anda bisa mengganti foto dengan menempelkan link baru dari Google Images.
            </p>
          </div>
        </div>

        {/* Input Data Lainnya */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Nama Produk</label>
            <input 
              name="name" 
              defaultValue={product.name} 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Brand</label>
              <input 
                name="brand" 
                defaultValue={product.brand} 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-semibold" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Kategori</label>
              <select 
                name="category" 
                defaultValue={product.category}
                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-white"
                required
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Aksesoris">Aksesoris</option>
                <option value="Sparepart">Sparepart</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Harga (Rp)</label>
              <input 
                name="price" 
                type="number" 
                defaultValue={Number(product.price)} 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-black text-blue-600" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Stok Unit</label>
              <input 
                name="stock" 
                type="number" 
                defaultValue={product.stock} 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500 font-black" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex gap-4">
           <button type="submit" className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-[2rem] font-black shadow-2xl transition-all transform active:scale-95">
            Update Data Produk
          </button>
           <Link href="/produk" className="px-10 py-5 bg-slate-100 text-slate-500 rounded-[2rem] font-bold hover:bg-slate-200 transition-all text-center flex items-center">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}