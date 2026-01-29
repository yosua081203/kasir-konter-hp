// File: src/actions/productActions.ts
"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. FUNGSI TAMBAH PRODUK (Menggunakan Link URL)
export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const imageUrl = formData.get("imageUrl") as string; // Mengambil link teks

  await prisma.product.create({
    data: { 
      name, 
      brand, 
      category, 
      price, 
      stock, 
      image: imageUrl // Menyimpan URL gambar
    },
  });

  revalidatePath("/produk");
  revalidatePath("/");
  revalidatePath("/kasir");
}

// 2. FUNGSI EDIT PRODUK (Menggunakan Link URL)
export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const imageUrl = formData.get("imageUrl") as string; // Mengambil link teks baru

  await prisma.product.update({
    where: { id },
    data: { 
      name, 
      brand, 
      category, 
      price, 
      stock,
      image: imageUrl 
    },
  });

  revalidatePath("/produk");
  revalidatePath("/");
  revalidatePath("/kasir");
}

// 3. FUNGSI HAPUS PRODUK
export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/produk"); 
  revalidatePath("/");
  revalidatePath("/kasir");
}

// 4. FUNGSI TRANSAKSI KASIR
export async function createTransaction(customerName: string, items: any[], totalAmount: number) {
  await prisma.transaction.create({
    data: {
      customerName,
      totalAmount,
      items: JSON.stringify(items), 
    },
  });

  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        stock: { decrement: item.quantity }
      }
    });
  }

  revalidatePath("/produk");
  revalidatePath("/"); 
  revalidatePath("/kasir");
}