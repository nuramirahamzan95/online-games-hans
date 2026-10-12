# Main Nombor

Koleksi game matematik untuk budak-budak umur 4–17 tahun, dari tadika sampai sekolah menengah. **Dwibahasa: BM / English** (butang BM | EN di atas setiap page).
HTML, CSS dan JavaScript biasa. Tiada build step, tiada framework, tiada backend.

## Cara menu berfungsi

1. Pilih peringkat: **Tadika** (4–6), **Sekolah Rendah** (7–12, Tahun 1–6) atau **Sekolah Menengah** (13–17, Tingkatan 1–5).
2. Pilih umur untuk tapis game (atau "Semua").
3. Tekan game. Game terus buka ikut tahap umur yang dipilih (link bawa `?umur=9`).
4. Butang **Menu** dalam game bawa balik ke peringkat dan umur tadi.

Link boleh dikongsi terus, contoh `index.html#rendah/9` atau `index.html#menengah`.

## Senarai game

| Game | Umur | Apa yang dilatih |
|------|------|------------------|
| **Kira Objek** / Count Objects | 4–6 | Kira bentuk dalam gambar. Level Sukar ada bentuk pengacau. |
| **Banding Nombor** / Compare Numbers | 4–8 | Tanda `<` `=` `>`, dari nombor 1–10 sampai ayat tambah/tolak. |
| **Padan Kad** / Card Match | 5–10 | Memori: padankan kad soalan dengan kad jawapan. |
| **Sudoku Mini 4×4** | 6–10 | Logik, nombor 1–4. Tiga level. |
| **Soalan Math** / Math Quiz | 6–12 | 10 soalan rawak (+ − × ÷) dengan nombor 1–20. Tahap ikut umur. |
| **Baca Jam** / Tell the Time | 7–10 | Jam analog: tepat jam, suku/setengah, setiap 5 minit. |
| **Math Menengah** / Secondary Math | 13–17 | Topik Tingkatan 1–5, dengan langkah kira bila salah. |

### Umur → level (game yang ada Mudah/Sederhana/Sukar)

| Game | Mudah | Sederhana | Sukar |
|------|-------|-----------|-------|
| Kira Objek | ≤4 | 5 | 6+ |
| Banding Nombor | ≤5 | 6 | 7+ |
| Padan Kad, Sudoku | ≤6 | 7–8 | 9+ |
| Baca Jam | ≤7 | 8 | 9+ |

### Soalan Math (umur 6–12)

| Umur | Operasi | Cara jawab |
|------|---------|------------|
| 6 | Tambah & tolak hingga 10, ada titik bantu | Pilih jawapan |
| 7 | Tambah & tolak hingga 20 | Pilih jawapan |
| 8 | + − hingga 20, darab sifir 2–5 | Pilih jawapan |
| 9 | + − 1–20, darab sifir 2–10, bahagi sifir 2–5 | Taip jawapan |
| 10 | + − 1–20, darab sifir 2–12, bahagi sifir 2–10 | Taip jawapan |
| 11 | + − 1–20, darab 1–20 × 2–9, bahagi sifir 2–12 | Taip jawapan |
| 12 | Semua + soalan cari nombor hilang (`? × 7 = 84`) | Taip jawapan |

Bahagi sentiasa dapat nombor bulat. Tolak tak pernah jadi negatif. Ubah tahap dalam objek `AGES`, `games/soalan-math/index.html`.

### Math Menengah (umur 13–17, ikut topik KSSM)

| Umur | Tingkatan | Topik |
|------|-----------|-------|
| 13 | T1 | Integer, kuasa & punca kuasa, tertib operasi, FSTB & GSTK, persamaan linear, ketaksamaan, Pythagoras |
| 14 | T2 | Pola & jujukan, rumus algebra, persamaan linear, laju, kecerunan, min, poligon |
| 15 | T3 | Indeks, bentuk piawai, faedah mudah, diskaun, garis lurus |
| 16 | T4 | Persamaan kuadratik, asas nombor, set, julat & median, logaritma*, janjang* |
| 17 | T5 | Matriks (penentu), ubahan, insurans, kuadratik, persamaan serentak, logaritma*, janjang* |

\* Matematik Tambahan. Semua jawapan nombor bulat (boleh negatif, tekan ±). Bila salah, keluar kotak **Cara kira** dengan langkah penyelesaian. Tambah jenis soalan dalam objek `T`, dan senaraikan dalam `AGES`, `games/math-menengah/index.html`.

## Struktur folder

```
online-games/
├── index.html              # menu: peringkat → umur → game
├── assets/
│   ├── common.css          # design system dikongsi (warna, butang, header, bar bahasa)
│   ├── common.js           # helper: shuffle, localStorage, rekod bintang, ?umur=, dwibahasa
│   ├── quiz.js             # enjin pusingan soal-jawab (soalan-math, baca-jam, banding-nombor, kira-objek, math-menengah)
│   └── icon.svg
└── games/
    ├── kira-objek/index.html
    ├── banding-nombor/index.html
    ├── padan-kad/index.html
    ├── sudoku-4x4/index.html
    ├── soalan-math/index.html
    ├── baca-jam/index.html
    └── math-menengah/index.html
```

Rekod bintang dan pilihan bahasa disimpan dalam `localStorage` (prefix `main-nombor:`).

## Dwibahasa (BM / English)

- Teks statik dalam HTML: tulis BM sebagai kandungan, English dalam atribut `data-en`.
  ```html
  <h2 data-en="How to play">Cara main</h2>
  ```
  Untuk `aria-label`, guna `data-en-label`.
- Teks dalam JavaScript: `OG.L('teks BM', 'English text')`.
- Bila bahasa bertukar, `OG.onLang(fn)` dipanggil. Game soal-jawab mula semula pusingan dalam bahasa baru.

## Jalankan dalam komputer

Double-click `index.html`, atau:

```bash
cd online-games
python3 -m http.server 8000
# buka http://localhost:8000
```

## GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
Lepas setiap `git push`, site update sendiri dalam 1–2 minit.

## Tambah game baru

1. Buat folder `games/<id-game>/index.html`. Copy game sedia ada sebagai template (`kira-objek` untuk game soal-jawab ringkas).
2. Dalam page: `<div class="topbar">` dengan butang Menu ke `../../index.html#back`, link `../../assets/common.css`, load `../../assets/common.js` (dan `quiz.js` untuk game soal-jawab).
3. Baca umur dari menu dengan `OG.ageParam()`; tukar ke level dengan `OG.levelForAge(umur, maxMudah, maxSederhana)`.
4. Bila menang, panggil `OG.saveBest('<id-game>', bintang)` (1–3).
5. Tambah satu objek dalam array `GAMES` dalam `index.html`:

```js
{id:'id-game',title:['Nama BM','English name'],tag:['label','label'],ages:[7,10],acc:'sky',art:namaFungsiArt,
 desc:['Penerangan BM.','English description.'],skills:[['Kemahiran','Skill']]}
```

Game akan keluar sendiri dalam peringkat yang umurnya bertindih. `acc`: `yellow`, `sky`, `mint`, `pink`, `peach` atau `lilac`.

### Idea game seterusnya

- **Kira Duit** — syiling & duit kertas RM (sekolah rendah).
- **Pecahan Pizza** — ½, ⅓, ¼ dengan gambar (Tahun 3–5).
- **Bon Nombor 10** — cari pasangan yang jadi 10 (tadika/Tahun 1).
- **Graf & Koordinat** — plot titik pada satah Cartes (menengah).
- **Trigonometri** — sin/kos/tan dengan segi tiga bersudut tegak (Tingkatan 3–5).
