# Flight Booking Project

## Açıklama
Bu proje, Schiphol API'den gelen uçuş verilerinin listelenebileceği, Clerk kullanılarak kullanıcıların uçuş bilgilerini görüntüleyebileceği ve kendi uçuşlarını kaydedebileceği bir uygulamadır. Kullanıcı süreçleri
Clerk kullanılarak yapılmıştır.


## Minimum Gereksinimler
- **Node.js**: Projenin çalışabilmesi için Node.js'in yüklü olması gerekir.
- **MongoDB**: Uçuş verilerini depolamak için MongoDB veritabanı kullanılır. MongoDB veritabanı veya MongoDB atlas'ın kullanılabiliyor olması gerekir.
- **React**: Uygulamanın ön yüzü için React kütüphanesi kullanılmaktadır.
- **Tailwindcss**: Önyüz tasarımdaki css işlemleri tailwindcss ile yapılmıştır.
- **Vite**: Uygulamanın geliştirme sürecinde kullanılan hızlı bir yapılandırma aracıdır. React kurulumunda kullanılıyor olması gerekir.
- **Clerk**: Kullanıcı kimlik doğrulama işlemleri için kullanılan bir hizmettir. Projede kullanıcı işlemleri clerk üzerinden yapılmıştır. Clerk paketlerinin yüklü olması gerekmektedir.
- **NPM**: Node.js ile birlikte gelen paket yöneticisi, bağımlılıkları yönetmek için kullanılır.


## Kullanılan Paketler
- **React (Frontend) için**: 
  - React
  - react-router-dom
  - react-dom
  - react-icons
  - react-toastify
  - TailwindCSS

- **Node.js (Backend) için**: 
  - nodemon
  - mongoose
  - http-proxy-middleware
  - express
  - dotenv
  - cors


## Derleme Öncesi Sağlanması Gereken Ön Koşullar
1. **Node.js ve NPM Kurulumu**: Node.js ve NPM'in sistemde kurulu olduğundan emin olun.
2. **MongoDB Kurulumu**: MongoDB'nin yüklü olduğundan ve çalıştığından emin olun. Gerekirse bir MongoDB Atlas hesabı oluşturun veya yerel bir veritabanı oluşturun.
3. **Gerekli Paketlerin Yüklenmesi**:
   - `client` klasörüne gidin ve gerekli bağımlılıkları yüklemek için:
     ```bash
     cd client
     npm install
     ```

   - `server` klasörüne gidin ve gerekli bağımlılıkları yüklemek için:
     ```bash
     cd server
     npm install
     ```

4. **.env Dosyası Oluşturma**:
   - `server` klasöründe bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
     ```env
     MONGO_URI=your_mongo_connection_string
     APP_ID=your_app_id
     APP_KEY=your_app_key
     ```
   - `client` klasöründe bir `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
   - ```env.local
     VITE_CLERK_PUBLISHABLE_KEY=your_key_from_clerk
     ```


## Geliştirme
1. **Sunucu Başlatma**: 5000 portu üzerinden;
   - `server` klasörüne gidin ve sunucuyu başlatmak için:
     ```bash
     cd server
     npm run dev
     ```

2. **Ön Yüz Başlatma**: 5173 portu üzerinden;
   - `client` klasörüne gidin ve uygulamayı başlatmak için:
     ```bash
     cd client
     npm run dev
     ```


## Uygulama Kullanım Detayları
- Uygulama başlatıldığında ana ekran gelir. Ana ekranda en üstte header alanı bulunur. Bu alandaki "PLANE SCAPE" section'ı başka sayfadayken ana sayfaya dönmemizi kolaylaştırır.
Ayrıca header'ın sağ tarafında bulunan section kullanıcı işlemlerimizi yönetmemizi sağlar.
- Header componentinin altında SearchFlight componenti bulunur. Bu component uçuşları belirlenen iniş kalkış yerleri ve iniş kalkış tarihleri aralığında filtrelememize imkan tanır.
Fakat, Schiphol'den çektiğimiz API bilgileri eksik ve sitede bulunan diğer api'lerle bağlantılı olmadığı için, bu component uygulamada yalnızca uçuşların iniş yerlerini filtrelemeye yaramaktadır.
Kalkış yeri, iniş-kalkış tarihleri kısımlarında filtreleme yapılmamaktadır. Bu sorunlar API’den gelen bilgi eksikliğinden kaynaklanmaktadır.
- Sayfanın orta kısmında gelen uçuşları listelediğimiz alan bulunmaktadır. Yine normal şartlarda bu kısımda uçuş saatleri, uçuş süresi, kalkış ve iniş havaalanları, uçuş ücreti, stop bilgileri,
havayolu şirketi gibi bilgilerin olması beklenir. Fakat yine gelen api'de bu bilgilerin bazıları eksik ve yanlış olduğu için, kalkış yeri, havayolu şirketi, ücret gibi alanlar statik olarak yazılmıştır.
Diğer; kalkış ve varış saatleri, varış havaalanı ve varış şehri düzgün bir şekilde gösterilmektedir. Varış şehri kısmında bazı detaylar bulunmaktadır. Bu detaylara kod içerisindeki Flight componenti içerisinde
bahsedilmiştir. Ayrıca bu alanda pagination (sayfalama) işlemi de yapılmaktadır. Sayfada listelenen uçuşlardan birine rezervasyon yapmak istenildiğinde, "Book Flight" butonuna basılması yeterlidir. Sağ üstte
uçuşun kaydedildiğine dair bir mesaj belirdikten sonra, sayfa otomatik olarak kullanıcının rezervasyon yaptığı uçuşlar sayfasına yönlenecektir. Eğer aynı uçuşa tekrardan rezervasyon isteği yapıldığında veya
rezervasyon işleminde bir hata olduğunda, kullanıcı yine aynı şekilde sağ üstte bir uyarı mesajı alacaktır. Kullanıcının bu işlemleri yapması için önce giriş / kayıt işlemlerini yapması gerekir.
- Uçuşların listelendiği alanında yanında bir filtreleme alanı bulunmaktadır. Yine, api'den kaynaklı eksik bilgiler dolayısıyla tam olarak işlev yapmamaktadır. 'Sort' alanı, api'den ücret bilgisi dönmediği için
temsili olarak orada bulunmaktadır. Sort alanının altındaki varış saat filtreleri düzgün çalışmaktadır. Saat filtresinin altında bulunan 'Stops' alanları da düzgün çalışmaktadır.
- Sayfanın en sağında bulunan side-bar temsili olarak orada bulunmaktadır. Herhangi bir işlevi yoktur.
- Ana sayfadan ayrı olarak kullanıcının uçuş rezervasyonlarının listelendiği 'myFlights' sayfası bulunmaktadır. Bu kısımda giriş yapmış kullanıcının rezerve ettiği uçuşlar listelenmektedir.
- Proje responsive tasarıma sahiptir.


## Ekran Görüntüleri
### Aşağıda uygulamanın ekran görüntüleri yer almaktadır:

- Anasayfa: Uçuşların listelendiği alan
![genel-ekran](https://github.com/user-attachments/assets/0b40c1d6-4a4f-484f-85b4-a81eae5ed202)

- Toast uyarı mesajları;
![uyarı1](https://github.com/user-attachments/assets/07f6a89a-23d3-46d5-9703-bc1502835829)
![uyarı-2](https://github.com/user-attachments/assets/1cbf23f8-71d1-4683-89cc-f569003c477f)

- Responsive yapı görüntü örneği;
![responsive-1](https://github.com/user-attachments/assets/c10cb2e4-144a-42dc-b583-8b96506637d2)
![responsive-2](https://github.com/user-attachments/assets/2187dc2b-889b-4e81-bfed-46fc5952b24c)

- Mobil görünüm örneği;
![mobil](https://github.com/user-attachments/assets/70973848-9d97-49e1-8142-7d8fcd51831f)

- Uçuşlarım ekranı;
![ucuşlarım-1](https://github.com/user-attachments/assets/928fd9a7-586d-4d50-b884-63649195f76e)

- Uçuşlarım ekranı mobil görünüm;
![uçuşlarım-mobil](https://github.com/user-attachments/assets/d41a8406-c120-49d4-935c-cc017721dfaa)
