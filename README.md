# Fluento - AI Destekli Dil Öğrenme Uygulaması

Modern ve duyarlı waitlist web sitesi. Fluento uygulamasının lansmanı öncesinde kullanıcı email adreslerini toplamak için tasarlanmıştır.

## Özellikler

- **Modern Tasarım**: Glassmorphism efektleri ve gradient renkler
- **Duyarlı Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Yan Yana Düzen**: Waitlist formu ve uygulama görselleri eş zamanlı görünüm
- **Animasyonlu Kartlar**: Bağımsız hareket eden 3D kart animasyonları
- **Mobil Carousel**: Mobil cihazlarda kaydırmalı görsel galerisi
- **Email Bildirimi**: EmailJS ile otomatik email bildirimi
- **Türkçe Arayüz**: Tamamen Türkçe kullanıcı deneyimi

## Kurulum

### 1. Dosyaları Yerleştirin

Tüm dosyaları web sunucunuza yükleyin:
- `index.html`
- `styles.css`
- `script.js`

### 2. EmailJS Entegrasyonu

Waitlist kayıtlarında size email bildirimi gönderilmesi için EmailJS kurulumu:

#### Adım 1: EmailJS Hesabı Oluşturun
1. [EmailJS](https://www.emailjs.com/) sitesine gidin
2. Ücretsiz hesap oluşturun
3. Email servisinizi (Gmail, Outlook, vb.) bağlayın

#### Adım 2: Email Servisi Ayarlayın
1. EmailJS dashboard'da "Email Services" kısmına gidin
2. "Add New Service" butonuna tıklayın
3. Gmail, Outlook veya başka bir email servisinizi seçin
4. Email hesabınızı bağlayın ve yetkilendirin
5. Service ID'sini kopyalayın (örn: `service_abc123`)

#### Adım 3: Email Template Oluşturun
1. EmailJS dashboard'da "Email Templates" kısmına gidin
2. "Create New Template" butonuna tıklayın
3. Şu template'i kullanın:

```
Konu: Fluento - Yeni Waitlist Kaydı

Merhaba,

Fluento waitlist'ine yeni bir kayıt gerçekleşti:

Email: {{user_email}}
Tarih: {{message}}

Bu kişi Fluento uygulamasının lansmanı hakkında bilgilendirilmeyi istiyor.

Saygılarımla,
Fluento Bildirim Sistemi
```

4. Template ID'sini kopyalayın (örn: `template_xyz789`)

#### Adım 4: Public Key Alın
1. EmailJS dashboard'da "Account" > "General" kısmına gidin
2. "Public Key" değerini kopyalayın (örn: `user_def456`)

#### Adım 5: Kodda Ayarları Yapın
`script.js` dosyasında şu değişkenleri güncelleyin:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // Adım 2'deki Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Adım 3'teki Template ID
const EMAILJS_PUBLIC_KEY = 'user_def456';        // Adım 4'teki Public Key
```

#### Adım 6: Alıcı Email Adresi
`script.js` dosyasında `to_email` değerini kendi email adresinizle değiştirin:

```javascript
const templateParams = {
    to_email: 'your-email@example.com', // Buraya kendi email adresinizi yazın
    user_email: email,
    message: `Yeni waitlist kaydı: ${email}`,
    subject: 'Fluento - Yeni Waitlist Kaydı'
};
```

### 3. Test Etme

1. Web sitesini bir tarayıcıda açın
2. Waitlist formuna geçerli bir email adresi girin
3. "Katıl" butonuna tıklayın
4. Başarılı mesajını görmelisiniz
5. Birkaç dakika içinde email adresinize bildirim gelmelisiniz

## Teknik Detaylar

### Dosya Yapısı
```
fluento/
├── index.html          # Ana HTML dosyası
├── styles.css          # Stil dosyası
├── script.js           # JavaScript fonksiyonları
└── README.md          # Dokümantasyon
```

### Kullanılan Teknolojiler
- **HTML5**: Semantik yapı
- **CSS3**: Modern stil ve animasyonlar
- **JavaScript**: Form işleme ve animasyonlar
- **EmailJS**: Email bildirimi servisi

### Responsive Tasarım
- **Desktop**: Yan yana düzen (waitlist formu sol, görseller sağ)
- **Tablet**: Uyarlanmış düzen
- **Mobile**: Dikey düzen, kaydırmalı görsel galerisi

### Animasyonlar
- **Arka Plan**: Yüzen mavi köpük animasyonları
- **Kartlar**: Bağımsız 3D hareket animasyonları
- **Form**: Glassmorphism efektleri
- **Carousel**: Mobil kaydırma animasyonları

## Özelleştirme

### Renkler
Ana renkler `styles.css` dosyasında CSS değişkenleri olarak tanımlanmıştır:

```css
:root {
    --primary-blue: #3498db;
    --primary-blue-hover: #2980b9;
    --light-blue: #C4D9EB;
    --white: #ffffff;
}
```

### Animasyon Süreleri
Kart animasyonları için süre ayarları:

```css
.card-1 { animation-duration: 4s; }
.card-2 { animation-duration: 5s; }
.card-3 { animation-duration: 6s; }
```

### Form Mesajları
Başarı ve hata mesajları `script.js` dosyasında özelleştirilebilir.

## Güvenlik

- **Email Validation**: Client-side email format kontrolü
- **Rate Limiting**: EmailJS'in built-in rate limiting koruması
- **Error Handling**: Hata durumlarında kullanıcı dostu mesajlar

## Performans

- **Lazy Loading**: Görseller gerektiğinde yüklenir
- **Optimized CSS**: Minimum dosya boyutu
- **Efficient JavaScript**: Performans odaklı kod

## Destek

### EmailJS Sorunları
- EmailJS quota'nızı kontrol edin (ücretsiz plan: 200 email/ay)
- Email template'inizin doğru yapılandırıldığından emin olun
- Service ID, Template ID ve Public Key değerlerini kontrol edin

### Genel Sorunlar
- Browser console'da hata mesajları olup olmadığını kontrol edin
- Email adreslerinin doğru format'ta olduğundan emin olun
- İnternet bağlantınızı kontrol edin

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Güncelleme Geçmişi

### v3.0.0 (2024)
- EmailJS entegrasyonu eklendi
- Google Sheets entegrasyonu kaldırıldı
- Otomatik email bildirimi sistemi

### v2.0.0 (2024)
- Yan yana düzen eklendi
- Bağımsız kart animasyonları
- Mobil carousel iyileştirmeleri

### v1.0.0 (2024)
- İlk versiyon
- Temel waitlist formu
- Responsive tasarım 