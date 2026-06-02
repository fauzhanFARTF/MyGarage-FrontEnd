# GarasiKu — Frontend

Frontend React SPA untuk aplikasi manajemen kendaraan pribadi GarasiKu.

## Tech Stack
- React 19 + Vite + TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- Axios (HTTP client)

## Konfigurasi Environment

Salin `.env.example` menjadi `.env`, lalu sesuaikan base URL backend:

```bash
cp .env.example .env
```

| Variabel | Keterangan |
|---|---|
| `VITE_API_BASE_URL` | Base URL API backend Django (mis. `http://localhost:8000/api/v1`, atau URL ngrok saat perlu akses publik) |

## Cara Menjalankan (Development)

```bash
# Install dependensi
npm install

# Jalankan dev server
npm run dev
```

## Struktur Cabang Git

| Cabang | Kegunaan |
|---|---|
| `master` | Kode produksi yang sudah dirilis (ter-tag) |
| `develop` | Integrasi fitur aktif |
| `feature/*` | Pengembangan fitur baru (cabang dari `develop`) |
| `release/*` | Persiapan rilis (cabang dari `develop`) |
| `hotfix/*` | Perbaikan bug kritis di produksi (cabang dari `master`) |

## Panduan Proyek

Lihat [GarasiKu-Project-Guidelines.md](../GarasiKu-Project-Guidelines.md) untuk keputusan arsitektur dan aturan engineering.
