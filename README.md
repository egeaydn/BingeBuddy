# 🍿 BingeBuddy - Film Öneri Platformu

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=EF4444&center=true&width=600&lines=🎬+Hoş+geldiniz+BingeBuddy'ye!;🌟+En+İyi+Film+Önerileri;🚀+Modern+Film+Keşif+Platformu" alt="Typing SVG" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB API" />
</p>

<div align="center">
  <h3>🎭 Filmlerle Dolu Bir Dünyaya Hoş Geldiniz! 🎭</h3>
  <p><em>Modern, hızlı ve kullanıcı dostu film keşif deneyimi</em></p>
</div>

---

## 🌟 Özellikler

<table>
<tr>
<td width="50%">

### 🎬 **Film Keşfi**
- 🔥 **Popüler Filmler** - Trend olan yapımlar
- 🎭 **Vizyondaki Filmler** - Şu anda sinemada
- ⭐ **En Yüksek Puanlı** - Kritik beğenisi toplamış
- 🎯 **Detaylı Film Bilgileri** - Cast, süre, özet

</td>
<td width="50%">

### 🚀 **Modern Deneyim**
- 📱 **Responsive Tasarım** - Her cihazda mükemmel
- ⚡ **Hızlı Yükleme** - Next.js 15 + Turbopack
- 🎨 **Şık Arayüz** - Modern ve kullanıcı dostu
- 🔍 **Akıllı Arama** - Anında film bulma

</td>
</tr>
</table>

---

## 🎯 Demo & Ekran Görüntüleri

<div align="center">
  
### 🏠 Ana Sayfa
> 🎪 Hero carousel ve kategorize edilmiş film listeleri

### 🔍 Arama & Keşif
> 🎭 Gerçek zamanlı arama ve filtreleme özellikleri

### 📱 Mobil Uyumlu
> 📲 Tüm cihazlarda kusursuz deneyim

</div>

---

## ⚡ Hızlı Başlangıç

### 🛠️ Kurulum

```bash
# 📦 Projeyi klonla
git clone https://github.com/kullanici/bingebuddy.git
cd bingebuddy

# 🚀 Bağımlılıkları yükle
npm install

# 🔧 Geliştirme sunucusunu başlat
npm run dev
```

### 🔑 API Ayarları

1. **TMDB API Key** alın: [themoviedb.org](https://www.themoviedb.org/settings/api)
2. `src/lib/tmdb.ts` dosyasında API key'inizi güncelleyin:

```typescript
const API_KEY = 'your-tmdb-api-key-here' // 🔐 Buraya API key'inizi yazın
```

### 🌐 Çalıştırma

```bash
npm run dev     # 🔧 Geliştirme modu
npm run build   # 📦 Production build
npm run start   # 🚀 Production sunucu
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın! 🎉

---

## 🏗️ Teknoloji Altyapısı

<div align="center">

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| 🔥 **Next.js** | `15.5.3` | React framework + App Router |
| ⚛️ **React** | `19` | UI kütüphanesi |
| 📘 **TypeScript** | `Latest` | Type safety |
| 🎨 **Tailwind CSS** | `4.0` | Utility-first CSS |
| 🎬 **TMDB API** | `v3` | Film veritabanı |
| ⚡ **Turbopack** | `Enabled` | Süper hızlı bundler |

</div>

---

## 📁 Proje Yapısı

```
🎬 BingeBuddy/
├── 📂 src/
│   ├── 📂 app/                 # 🛣️ Next.js App Router
│   │   ├── 🏠 page.tsx         # Ana sayfa
│   │   ├── 🔍 search/          # Arama sayfası
│   │   ├── 🎭 movie/[id]/      # Film detay sayfası
│   │   └── 📊 popular/         # Kategori sayfaları
│   ├── 📂 components/          # 🧩 Yeniden kullanılabilir bileşenler
│   │   ├── 🎪 HeroSection.tsx  # Hero carousel
│   │   ├── 🎬 MovieCard.tsx    # Film kartları
│   │   ├── 📋 MovieList.tsx    # Film listeleri
│   │   └── 🧭 Navigation.tsx   # Navigasyon
│   ├── 📂 lib/                 # 🔧 Yardımcı fonksiyonlar
│   │   └── 🎭 tmdb.ts          # TMDB API servisleri
│   └── 📂 types/               # 📘 TypeScript tipleri
│       └── 🎬 movie.ts         # Film tip tanımları
├── 📂 public/                  # 🖼️ Statik dosyalar
└── ⚙️ Config dosyaları         # Next.js, TypeScript, Tailwind
```

---

## 🎨 Tasarım Özellikleri

<div align="center">

### 🌙 **Dark Theme**
Göz yorucu olmayan, modern karanlık tema

### 🎭 **Hover Animasyonları**
Etkileşimli ve akıcı geçiş efektleri

### 📱 **Mobile First**
Önce mobil, sonra desktop yaklaşımı

### ⚡ **Performance**
Optimize edilmiş görüntüler ve lazy loading

</div>

---

## 🔧 Geliştirme Notları

### 🐛 **Bilinen Sorunlar & Çözümler**

- **Cache Problemi**: `.next` klasörünü silin ve yeniden başlatın
- **Image Loading**: TMDB görselleri için `'use client'` direktifi gerekli
- **Type Safety**: Tüm API yanıtları TypeScript ile güvenli

### 🚀 **Performance İyileştirmeleri**

- ✅ Image optimization
- ✅ Lazy loading
- ✅ Server-side rendering
- ✅ Static generation

---

## 🤝 Katkıda Bulunma

BingeBuddy'yi daha da harika yapmak ister misiniz? 

1. 🍴 **Fork** edin
2. 🌿 **Branch** oluşturun: `git checkout -b feature/AmazingFeature`
3. 💾 **Commit** yapın: `git commit -m 'Add some AmazingFeature'`
4. 📤 **Push** edin: `git push origin feature/AmazingFeature`
5. 🔄 **Pull Request** açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

<div align="center">
  
### 🎉 **BingeBuddy ile Film Keşfine Başlayın!** 🎉

<p>
  <a href="#-hızlı-başlangıç">🚀 Hemen Başla</a> •
  <a href="#-demo--ekran-görüntüleri">📸 Demo</a> •
  <a href="#-katkıda-bulunma">🤝 Katkı</a>
</p>

**⭐ Beğendiyseniz star atmayı unutmayın!**

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=16&duration=2000&pause=1000&color=10B981&center=true&width=400&lines=🎬+Happy+Binge+Watching!;🍿+Made+with+❤️+for+Movie+Lovers" alt="Footer" />

</div>

---

<div align="center">
  <sub>🎭 Built with ❤️ by film lovers, for film lovers 🎭</sub>
</div>
