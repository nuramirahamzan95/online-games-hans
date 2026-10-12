# Main Nombor

Koleksi game matematik untuk budak-budak umur 5–12 tahun. HTML, CSS dan JavaScript biasa. Tiada build step, tiada framework, tiada backend.

## Senarai game

| # | Game | Umur | Apa yang dilatih |
|---|------|------|------------------|
| 1 | **Sudoku Mini 4×4** | 6–10 | Logik, nombor 1–4. Tiga level. |
| 2 | **Soalan Math** | 6–12 | 10 soalan rawak (+ − × ÷) dengan nombor 1–20. Tahap ikut umur. |
| 3 | **Padan Kad** | 5–10 | Memori: padankan kad soalan dengan kad jawapan. |
| 4 | **Baca Jam** | 7–10 | Baca jam analog: tepat jam, suku/setengah, setiap 5 minit. |
| 5 | **Banding Nombor** | 5–8 | Tanda `<` `=` `>`, dari nombor 1–10 sampai ayat tambah/tolak. |

### Tahap Soalan Math ikut umur

| Umur | Operasi | Cara jawab |
|------|---------|------------|
| 6 | Tambah & tolak hingga 10, ada titik bantu | Pilih jawapan |
| 7 | Tambah & tolak hingga 20 | Pilih jawapan |
| 8 | + − hingga 20, darab sifir 2–5 | Pilih jawapan |
| 9 | + − 1–20, darab sifir 2–10, bahagi sifir 2–5 | Taip jawapan |
| 10 | + − 1–20, darab sifir 2–12, bahagi sifir 2–10 | Taip jawapan |
| 11 | + − 1–20, darab 1–20 × 2–9, bahagi sifir 2–12 | Taip jawapan |
| 12 | Semua + soalan cari nombor hilang (`? × 7 = 84`) | Taip jawapan |

Bahagi sentiasa dapat nombor bulat. Tolak tak pernah jadi negatif. Nak ubah tahap: edit objek `AGES` dalam `games/soalan-math/index.html`.

## Struktur folder

```
online-games/
├── index.html              # menu utama (senarai game)
├── assets/
│   ├── common.css          # design system dikongsi (warna, butang, header, skrin menang)
│   ├── common.js           # helper: shuffle, rand, localStorage, rekod bintang
│   ├── quiz.js             # enjin pusingan 10 soalan (dipakai soalan-math, baca-jam, banding-nombor)
│   └── icon.svg
└── games/
    ├── sudoku-4x4/index.html
    ├── soalan-math/index.html
    ├── padan-kad/index.html
    ├── baca-jam/index.html
    └── banding-nombor/index.html
```

Rekod bintang terbaik setiap game disimpan dalam `localStorage` (prefix `main-nombor:`) dan dipaparkan di menu.

## Jalankan dalam komputer

Double-click `index.html`, atau guna server kecil:

```bash
cd online-games
python3 -m http.server 8000
# buka http://localhost:8000
```

## Upload ke GitHub + GitHub Pages

```bash
cd online-games
git init
git add .
git commit -m "Main Nombor: menu + 5 game"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```

Lepas tu dalam GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
Website akan keluar di `https://<username>.github.io/<nama-repo>/` dalam 1–2 minit.

## Tambah game baru

1. Buat folder `games/<id-game>/index.html`. Copy mana-mana game sedia ada sebagai template.
2. Dalam `<head>` link `../../assets/common.css`. Sebelum script game, load `../../assets/common.js` (dan `quiz.js` kalau game jenis soal-jawab 10 soalan).
3. Bila pemain menang, panggil `OG.saveBest('<id-game>', bintang)` (1–3).
4. Tambah satu objek dalam array `GAMES` dalam `index.html`:

```js
{id:'id-game', title:'Nama Game', tag:'label', ages:[7,10], acc:'sky',
 desc:'Penerangan ringkas.', skills:['Kemahiran'], art:namaFungsiArt}
```

`acc` boleh jadi `yellow`, `sky`, `mint`, `pink` atau `peach`. `art` ialah fungsi yang pulangkan SVG kecil (tengok `sudokuArt`, `clockArt` dalam `index.html`).

### Idea game seterusnya

- **Kira Duit** — campur syiling & duit kertas RM, kira jumlah atau baki.
- **Pola Nombor** — 2, 4, 6, ? atau 5, 10, 15, ?
- **Bon Nombor 10** — cari pasangan yang jadi 10 (atau 20).
- **Pecahan Pizza** — kenal ½, ⅓, ¼ dengan gambar.
- **Kira Objek** — untuk umur 4–5, kira bintang/buah dalam gambar.
