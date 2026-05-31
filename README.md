# GarasiKu — Frontend

Frontend React SPA untuk aplikasi manajemen kendaraan pribadi GarasiKu.

## Tech Stack
- React 18 + Vite + TypeScript
- TanStack Query (React Query)
- Tailwind CSS

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
