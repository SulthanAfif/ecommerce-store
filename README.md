# Shoply — React E-Commerce Marketplace

Aplikasi toko online (frontend) yang dibangun dengan **React + Vite**.  
Project ini mensimulasikan alur belanja marketplace modern: katalog produk, filter, cart, kupon, wishlist, checkout, metode pembayaran simulasi, dan riwayat order.

---

## Deskripsi

Shoply dibuat sebagai project portfolio Frontend Developer.  
Fokus utamanya adalah menguasai:

- Komponen React & routing
- Global state dengan Context API
- Integrasi REST API
- Persistensi data di `localStorage`
- UI marketplace yang responsive

Data produk diambil dari **Fake Store API**.  
Cart, wishlist, dan orders disimpan di browser (localStorage).  
Sistem pembayaran bersifat **simulasi** (tidak terhubung payment gateway nyata).

---

## Fitur

### Katalog & Pencarian

- Daftar produk dari API
- Search bar di header
- Filter kategori (chips)
- Filter harga (dual range slider)
- Sorting (harga / nama)
- Flash Sale section
- Recently viewed products

### Produk

- Halaman detail produk
- Rating & ulasan (dummy)
- Quantity selector
- Add to cart
- Wishlist

### Keranjang

- Ubah jumlah item
- Hapus item
- Hitung subtotal otomatis
- Kode kupon:
  - `SHOPLY10` → diskon 10%
  - `HEMAT20` → diskon 20%
  - `ONGKIR` → potongan $5

### Checkout & Pembayaran (Simulasi)

- Form data pengiriman
- Metode pembayaran:
  - Transfer Bank
  - E-Wallet
  - COD
- Order tersimpan ke Order History

### Lainnya

- Wishlist
- Order history
- Toast notification
- Responsive (desktop & mobile)
- UI bergaya marketplace (Tokopedia / Etsy / eBay inspired)

---

## Tech Stack

| Teknologi      | Kegunaan                     |
| -------------- | ---------------------------- |
| React          | UI library                   |
| Vite           | Build tool                   |
| React Router   | Navigasi halaman             |
| Context API    | State cart, wishlist, orders |
| Fake Store API | Sumber data produk           |
| localStorage   | Persistensi data             |
| CSS custom     | Styling marketplace          |

---

## Struktur Folder

```
ecommerce-store/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Loading.jsx
│   │   └── Toast.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── cart-context.js
│   │   └── useCart.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Wishlist.jsx
│   │   └── Orders.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

---

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev
```

Buka browser di alamat yang muncul (biasanya `http://localhost:5173`).

### Build production

```bash
npm run build
npm run preview
```

---

## Alur Penggunaan

1. Cari / filter produk di halaman utama
2. Buka detail produk atau langsung tambah ke cart
3. Simpan favorit ke Wishlist
4. Di Cart, terapkan kupon bila ada
5. Checkout → isi data pengiriman → pilih metode bayar
6. Lihat pesanan di menu Orders

---

## Catatan Pembayaran

Project ini **tidak** terhubung ke Midtrans, Xendit, Stripe, atau payment gateway lain.  
Tombol “Bayar Sekarang” hanya mensimulasikan transaksi dan menyimpan order ke `localStorage`.

Ini sengaja dibuat untuk fokus pada kemampuan frontend.  
Untuk production nyata, perlu backend + payment gateway.

---

## Scripts

| Command           | Keterangan          |
| ----------------- | ------------------- |
| `npm run dev`     | Development server  |
| `npm run build`   | Build production    |
| `npm run preview` | Preview hasil build |
| `npm run lint`    | Jalankan ESLint     |

---

## Ide Pengembangan Selanjutnya

- Integrasi payment gateway (Midtrans)
- Authentication (login/register)
- Admin dashboard
- Pagination / infinite scroll
- Backend sendiri (Node.js / Supabase)

---

## Author

Dibuat untuk keperluan belajar Frontend Developer.
