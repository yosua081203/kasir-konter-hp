// File: src/components/DeleteButton.tsx
"use client";

import { deleteProduct } from "@/actions/productActions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button 
      onClick={async () => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
          await deleteProduct(id);
        }
      }}
      className="text-red-600 hover:text-red-800 font-medium ml-4"
    >
      Hapus
    </button>
  );
}