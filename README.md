# 🎵 Müzik iOS (iPhone 13 Edition) · Progressive Web App (PWA)

Bu proje, Android için geliştirilmiş olan **Müzik** uygulamasının iOS ekosistemine (özellikle **iPhone 13** ve Safari ortamına) taşınmış, bağımsız ve tam teşekküllü **Progressive Web App (PWA)** sürümüdür.

Herhangi bir Mac bilgisayar, Xcode veya ücretli Apple Geliştirici Hesabı (99$/yıl) gerektirmeden doğrudan Safari üzerinden yerel (native) bir iOS uygulaması gibi ana ekrana eklenip kullanılabilir.

---

## 📱 Canlı Erişim ve iPhone'a Kurulum

* **Canlı Web Adresi:** [https://gokmen123.github.io/muzik-ios-pwa/](https://gokmen123.github.io/muzik-ios-pwa/)
* **Sürüm:** `v0.7.2 iOS` (iPhone 13 & iOS 17/18 Uyumlu)

### iPhone'a Yükleme Adımları (10 Saniye):
1. **iPhone 13** cihazınızda **Safari** tarayıcısını açın ve yukarıdaki bağlantıya gidin.
2. Ekranın alt ortasındaki **Paylaş** simgesine (yukarı ok bulunan kare) dokunun.
3. Menüyü aşağı kaydırıp **"Ana Ekrana Ekle"** (Add to Home Screen) seçeneğini seçin.
4. Sağ üstteki **"Ekle"** butonuna dokunun.
5. Uygulama artık iPhone ana ekranınızda bağımsız bir uygulama simgesiyle yer alır; Safari çubukları olmadan tam ekran çalışır.

---

## ✨ Temel Özellikler & Android Uygulamasıyla Birebir Eşleşme

### 1. 🔍 Canlı YouTube Müzik Arama & Tam Parça Akışı (Full Streaming)
- Dahili Invidious ve YouTube API motoru sayesinde arama kutusuna yazılan her sanatçı ve şarkı (örneğin *Shakira*, *Tarkan*, *Simge*, *Ankara Havası*) canlı olarak aranır.
- Sonuçlar **gerçek albüm kapakları**, **orijinal parça süreleri** ve **tam ses dosyaları** (audio/mp4) ile listelenir.
- 28 saniyelik demo/örnek kısıtlaması yoktur; tüm parçalar orijinal uzunluklarında kesintisiz çalar.

### 2. 🎨 Orijinal Şarkı & Albüm Kapakları (HQ Artwork)
- Günün Önerileri ve Hızlı Türler seçkilerindeki parçalar, YouTube Music üzerindeki yüksek çözünürlüklü kapak resimleriyle donatılmıştır.
- Her şarkının kapak rengine göre dinamik olarak renk değiştiren **Ambiyans Arka Plan Işığı (Ambient Glow)** bulunur.

### 3. 🔒 iOS Kilit Ekranı & Denetim Merkezi Entegrasyonu (MediaSession API)
- Müzik çalarken telefon kilitlendiğinde veya Denetim Merkezi açıldığında:
  - Şarkının adı, sanatçısı ve albüm bilgisi görünür.
  - Şarkının yüksek çözünürlüklü kapağı kilit ekranı arka planında/oynatıcısında net olarak çıkar.
  - Önceki parça, sonraki parça, oynat/duraklat ve süre çubuğu (seek bar) kilit ekranından yönetilebilir.

### 4. 📥 Çevrimdışı İndirme Motoru (IndexedDB Blob Depolama)
- Parçaların yanındaki indirme butonuna dokunulduğunda ses verisi cihazın yerel **IndexedDB** veritabanına `audio/mp4` blobu olarak yazılır.
- İnternet bağlantısı tamamen kapalıyken bile "İndirilenler" sekmesinden parçalar kesintisiz dinlenebilir.
- Safari'nin yerel önbellek temizleme kurallarına takılmaması için kalıcı IndexedDB veri tabanı (`muzik_ios_db_v2`) kullanılmıştır.

### 5. 📁 iPhone "Dosyalar" (Files) Uygulamasına Dışa Aktar & İçeri Al
- **Dosyalar'a Aktar:** Çalan herhangi bir parçayı iPhone'un kendi **Dosyalar (İndirilenler)** klasörüne `.m4a` / `.mp3` formatında tek dokunuşla kaydetme.
- **Dosyalar'dan Yükle:** Cihazınızda kayıtlı bulunan kendi yerel müziklerinizi tek seferde seçip uygulamanın kütüphanesine aktarma.

### 6. 🪗 Öne Çıkan Seçkiler & Hızlı Türler
- **Ankara Havası:** Ömer Faruk Bostan - Erik Dalı & Huriyem (7:09) ve Sincanlı Misket seçkileri.
- **Türkçe Pop:** Simge - Aşkın Olayım, Tarkan - Yolla ve haftalık trendler.
- **Dizi & Akustik:** Sezen Aksu - De Mardin (Uzak Şehir Jenerik Müziği) ve akustik ezgiler.
- **Global Hitler:** Shakira - Hips Don't Lie ve dünya trendleri.

### 7. 🔗 YouTube Hesabı & Çalma Listesi İçe Aktarma
- Google OAuth 2.0 Web Client kimlik doğrulama altyapısı.
- YouTube ve YouTube Music çalma listesi bağlantılarını doğrudan içe aktarma desteği.

---

## 🛠️ Teknik Mimari

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Ön Yüz** | HTML5 / Modern CSS3 (Grid & Flexbox) | iPhone 13 çentik (notch), Dinamik Ada ve alt Home Bar güvenli alanlarıyla (`safe-area-inset`) %100 uyumlu |
| **Ses Motoru** | HTML5 Audio & Web Audio API | Safari jest kilitleme (user gesture unlock) mekanizmasına tam uyumlu senkron oynatma |
| **Kayıt / Çevrimdışı** | W3C IndexedDB API (`v2`) | Kalıcı çevrimdışı şarkı, kapak, favori ve çalma listesi saklama |
| **Arka Plan & PWA** | Service Worker (`v13`) & Web App Manifest | Standalone PWA modunda Safari arayüzünü gizler ve çevrimdışı önbellek sağlar |
| **API & Arama** | Invidious & YouTube CORS Endpoint | Canlı arama sorguları ve doğrudan `audio/mp4` ses akışı yönlendirmesi |

---

## 🛡️ Güvenlik ve İzolasyon Notu

> [!IMPORTANT]
> Bu web uygulaması, bilgisayardaki Android kaynak kodlarına (`C:\mz`) veya derlenmiş APK arşivlerine (`C:\Users\Ali Çalışma\muzik_transfer`) kesinlikle dokunmaz; tamamen bağımsız bir depoda (`muzik-ios-pwa`) barındırılır. Android uygulaması orijinal durumunu %100 korumaktadır.

---

## 🚀 Dağıtım & Güncelleme
Uygulama GitHub Actions üzerinden otomatik olarak derlenip GitHub Pages ortamına aktarılmaktadır:
- **Kaynak Depo:** [https://github.com/gokmen123/muzik-ios-pwa](https://github.com/gokmen123/muzik-ios-pwa)
- **Canlı Yayın:** [https://gokmen123.github.io/muzik-ios-pwa/](https://gokmen123.github.io/muzik-ios-pwa/)
