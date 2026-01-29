// File: src/actions/productActions.ts
"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, unlink } from "fs/promises";
import path from "path";

// 1. FUNGSI TAMBAH PRODUK
export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const file = formData.get("image") as File;

  let filename = "";
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/uploads/products", filename);
    await writeFile(filePath, buffer);
  }

  await prisma.product.create({
    data: { 
      name, 
      brand, 
      category, 
      price, 
      stock, 
      image: filename 
    },
  });

  revalidatePath("/produk");
  revalidatePath("/");
}

// Perbarui fungsi updateProduct di src/actions/productActions.ts

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const file = formData.get("image") as File;

  // 1. Ambil data produk lama untuk cek gambar lama
  const oldProduct = await prisma.product.findUnique({ where: { id } });
  let filename = oldProduct?.image || "";

  // 2. Jika ada file gambar baru yang diunggah
  if (file && file.size > 0) {
    // Hapus gambar lama jika ada
    if (oldProduct?.image) {
      try {
        const oldFilePath = path.join(process.cwd(), "public/uploads/products", oldProduct.image);
        await unlink(oldFilePath);
      } catch (error) {
        console.log("Gambar lama tidak ditemukan, abaikan.");
      }
    }

    // Simpan gambar baru
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const newFilePath = path.join(process.cwd(), "public/uploads/products", filename);
    await writeFile(newFilePath, buffer);
  }

  // 3. Update data ke database
  await prisma.product.update({
    where: { id },
    data: { 
      name, 
      brand, 
      category, 
      price, 
      stock,
      image: filename // Bisa gambar lama atau gambar baru
    },
  });

  revalidatePath("/produk");
  revalidatePath("/");
}

// 3. FUNGSI HAPUS PRODUK
export async function deleteProduct(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  
  if (product?.image) {
    try {
      const filePath = path.join(process.cwd(), "public/uploads/products", product.image);
      await unlink(filePath);
    } catch (error) { 
      console.log("Gambar tidak ditemukan di folder, menghapus data dari database saja."); 
    }
  }

  await prisma.product.delete({ where: { id } });
  
  revalidatePath("/produk"); 
  revalidatePath("/");
}

// 4. FUNGSI TRANSAKSI KASIR
export async function createTransaction(customerName: string, items: any[], totalAmount: number) {
  // Simpan data transaksi ke tabel transactions
  await prisma.transaction.create({
    data: {
      customerName,
      totalAmount,
      items: JSON.stringify(items), 
    },
  });

  // Loop untuk mengurangi stok setiap produk yang dibeli secara otomatis
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        stock: {
          decrement: item.quantity 
        }
      }
    });
  }

  revalidatePath("/produk");
  revalidatePath("/"); 
}