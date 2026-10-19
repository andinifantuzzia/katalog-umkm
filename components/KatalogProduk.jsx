"use client";

import { useState, useMemo } from "react";
import KartuProduk from "@/components/KartuProduk";

export default function KatalogProduk({
  daftarProduk = [],
  initialKategori = "Semua",
  initialQuery = "",
}) {
  const [kategoriTerpilih, setKategoriTerpilih] = useState(initialKategori);
  const [kataKunci, setKataKunci] = useState(initialQuery);

  // Ambil daftar kategori unik dari produk
  const daftarKategori = useMemo(() => {
    const setKategori = new Set(
      daftarProduk.map((p) => p.kategori).filter(Boolean)
    );
    return ["Semua", ...Array.from(setKategori)];
  }, [daftarProduk]);

  // Filter produk berdasarkan kategori dan pencarian nama
  const produkTersaring = useMemo(() => {
    return daftarProduk.filter((produk) => {
      const cocokKategori =
        kategoriTerpilih === "Semua" || produk.kategori === kategoriTerpilih;
      const cocokKataKunci =
        !kataKunci.trim() ||
        produk.nama?.toLowerCase().includes(kataKunci.toLowerCase().trim());
      return cocokKategori && cocokKataKunci;
    });
  }, [daftarProduk, kategoriTerpilih, kataKunci]);

  return (
    <div className="flex flex-col gap-6">
      {/* Bagian Pencarian & Filter Kategori */}
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="search"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full rounded-xl border border-garis bg-latar px-4 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
        </div>

        {daftarKategori.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {daftarKategori.map((kategori) => {
              const aktif = kategori === kategoriTerpilih;
              return (
                <button
                  key={kategori}
                  type="button"
                  onClick={() => setKategoriTerpilih(kategori)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    aktif
                      ? "bg-utama text-white"
                      : "border border-garis bg-permukaan text-teks hover:border-utama hover:text-utama"
                  }`}
                >
                  {kategori}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid Produk atau Pesan Kosong */}
      {produkTersaring.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <p className="text-teks-lembut">
            Tidak ada produk yang sesuai dengan pencarian atau kategori ini.
          </p>
          {(kategoriTerpilih !== "Semua" || kataKunci) && (
            <button
              type="button"
              onClick={() => {
                setKategoriTerpilih("Semua");
                setKataKunci("");
              }}
              className="text-sm font-semibold text-utama underline underline-offset-4 hover:text-utama-gelap"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {produkTersaring.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}

