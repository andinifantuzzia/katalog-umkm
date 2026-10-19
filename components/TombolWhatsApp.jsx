"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");

  const kurangiJumlah = () => {
    if (jumlah > 1) {
      setJumlah((prev) => prev - 1);
    }
  };

  const tambahJumlah = () => {
    setJumlah((prev) => prev + 1);
  };

  const nomor = toko.nomorWhatsApp?.replace(/\D/g, "");
  const totalHarga = formatRupiah(produk.harga * jumlah);

  // Susun pesan WhatsApp otomatis dengan jumlah dan varian (US-12)
  let teksPesan = `Halo, saya ingin memesan:\n- Produk: ${produk.nama}\n- Jumlah: ${jumlah}\n- Total: ${totalHarga}`;
  if (varian.trim()) {
    teksPesan += `\n- Varian/Catatan: ${varian.trim()}`;
  }

  const urlWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(teksPesan)}`;

  return (
    <div className="flex flex-col gap-4 border-t border-garis pt-4">
      {/* Pengatur Jumlah Pesanan & Total Harga */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm font-semibold text-teks">Jumlah pesanan</label>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-lg border border-garis bg-latar">
            <button
              type="button"
              onClick={kurangiJumlah}
              disabled={jumlah <= 1}
              aria-label="Kurangi jumlah"
              className="flex h-9 w-9 items-center justify-center rounded-l-lg text-lg font-bold text-teks hover:bg-permukaan disabled:opacity-30 disabled:hover:bg-transparent"
            >
              −
            </button>
            <span className="w-10 text-center font-semibold text-teks">{jumlah}</span>
            <button
              type="button"
              onClick={tambahJumlah}
              aria-label="Tambah jumlah"
              className="flex h-9 w-9 items-center justify-center rounded-r-lg text-lg font-bold text-teks hover:bg-permukaan"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <span className="text-xs text-teks-lembut">Total: </span>
            <span className="font-bold text-harga">{totalHarga}</span>
          </div>
        </div>
      </div>

      {/* Input Pilihan Varian / Catatan Opsional */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="varian" className="text-sm font-semibold text-teks">
          Pilihan varian / catatan <span className="text-xs font-normal text-teks-lembut">(opsional)</span>
        </label>
        <input
          id="varian"
          type="text"
          value={varian}
          onChange={(e) => setVarian(e.target.value)}
          placeholder="Contoh: rasa, ukuran, atau permintaan khusus"
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      {/* Tombol Pesan WhatsApp */}
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
