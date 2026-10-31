
/* =========================================
   CLIMATE GAMES: SON NESİL
   6 BÖLGE - 36 FARKLI İKLİM KRİZİ
   HER KRİZDE 5 FARKLI ÇÖZÜM
   3 SEVİYE - UZUN VADELİ KARAR ETKİSİ
========================================= */


/* =========================================
   1. YARDIMCI FONKSİYONLAR
========================================= */

function option(text, effect, score, info) {
  return { text, effect, score, info };
}

function event(title, icon, description, choices) {
  return { title, icon, description, choices };
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}


/* =========================================
   2. BÖLGE KRİZLERİ
   Etki sırası: Su, Gıda, Enerji, Nüfus
========================================= */

const regionEvents = {

  /* ---------- ÇÖL BÖLGESİ ---------- */

  desert: [

    event("BÜYÜK KURAKLIK", "🏜️",
      "Yağışlar yıllardır azaldı. Barajlar kuruyor ve temiz suya erişim zorlaşıyor.",
      [
        option("Atık su geri dönüşüm tesisi kur", [25, 5, -10, 5], 18, "Geri dönüştürülen su, şehirlerin ve tarımın su ihtiyacını azaltabilir."),
        option("Yağmur suyu toplama alanları oluştur", [18, 5, -5, 5], 15, "Yağmur suyu hasadı, yağışlı dönemlerde su depolanmasını sağlar."),
        option("Damla sulama sistemine geç", [20, 15, -5, 5], 17, "Damla sulama, suyun doğrudan bitki köklerine ulaşmasını sağlar."),
        option("Yeraltı sularını daha fazla kullan", [-15, 10, 5, 5], -8, "Aşırı yeraltı suyu kullanımı uzun vadede su kaynaklarını tüketebilir."),
        option("Su kullanımına bölgesel kota getir", [15, -5, 0, -5], 8, "Kotalar tüketimi azaltabilir ancak halkın ve üreticilerin yaşamını zorlaştırabilir.")
      ]
    ),

    event("KUM FIRTINASI", "🌪️",
      "Şiddetli kum fırtınaları yerleşim alanlarını ve ulaşım yollarını tehdit ediyor.",
      [
        option("Rüzgâr kıran ağaç kuşakları oluştur", [5, 10, -5, 10], 18, "Bitki kuşakları rüzgâr hızını ve toprak taşınmasını azaltabilir."),
        option("Yerleşim çevresine koruyucu bariyerler kur", [0, 5, -10, 10], 10, "Fiziksel bariyerler kumun yerleşimlere ulaşmasını sınırlar."),
        option("Erken uyarı ve tahliye sistemi kur", [0, 0, -5, 15], 15, "Erken uyarı sistemleri can kayıplarını azaltabilir."),
        option("Yolları ve binaları sürekli temizle", [-5, 0, -10, 0], 3, "Temizlik kısa vadede rahatlama sağlar ancak temel sorunu çözmez."),
        option("Hassas bölgelerde yapılaşmayı sınırla", [0, -5, 5, 5], 12, "Riskli alanlarda yapılaşmayı azaltmak gelecekteki zararları önleyebilir.")
      ]
    ),

    event("ÇÖLLEŞME TEHLİKESİ", "🌵",
      "Verimli topraklar bitki örtüsünü kaybediyor ve çölleşme hızla yayılıyor.",
      [
        option("Kuraklığa dayanıklı yerel bitkiler ek", [5, 15, -5, 10], 18, "Yerel bitkiler toprağı korur ve bölgenin ekolojik dayanıklılığını artırır."),
        option("Bozulmuş arazileri yeniden yeşillendir", [5, 15, -10, 10], 17, "Ekosistem restorasyonu toprağın verimliliğini destekler."),
        option("Hayvancılık için dönüşümlü otlatma uygula", [0, 15, 0, 5], 15, "Dönüşümlü otlatma bitki örtüsünün kendini yenilemesine fırsat verir."),
        option("Yeni tarım alanları açmak için bitki örtüsünü kaldır", [-10, 10, 5, -5], -12, "Bitki örtüsünün kaldırılması erozyon ve çölleşmeyi hızlandırabilir."),
        option("Toprak koruma ve eğitim programı başlat", [0, 10, -5, 5], 12, "Toprak yönetimi eğitimi sürdürülebilir arazi kullanımını destekler.")
      ]
    ),

    event("YERALTI SU KAYNAKLARININ TÜKENMESİ", "💧",
      "Yeraltı su seviyesi kritik düzeye indi. Kuyuların bir kısmı artık kullanılamıyor.",
      [
        option("Yeraltı suyu kullanımını sınırlandır", [20, -5, 0, 0], 15, "Kontrollü kullanım akiferlerin toparlanmasına yardımcı olabilir."),
        option("Yapay yeraltı suyu besleme alanları kur", [20, 0, -5, 5], 18, "Uygun alanlarda suyun toprağa sızması yeraltı rezervlerini destekler."),
        option("Şebeke kaçaklarını tespit edip onar", [15, 5, -5, 5], 17, "Kaçakların azaltılması mevcut suyun daha verimli kullanılmasını sağlar."),
        option("Daha derin kuyular aç", [-20, 10, -5, 0], -12, "Daha derin kuyular kısa vadede su sağlayabilir ancak tükenmeyi hızlandırabilir."),
        option("Tarımsal su tüketimini yeniden planla", [15, 15, 0, 5], 18, "Su yoğun ürünler yerine bölgeye uygun ürünler tercih edilebilir.")
      ]
    ),

    event("AŞIRI SICAK HAVA DALGASI", "☀️",
      "Sıcaklık rekorları kırılıyor. Enerji tüketimi ve sıcaklığa bağlı sağlık sorunları artıyor.",
      [
        option("Serin çatılar ve gölgelendirme alanları oluştur", [0, 0, 10, 15], 17, "Serin yüzeyler ve gölge, kentsel ısı etkisini azaltabilir."),
        option("Güneş enerjili soğutma sistemleri kur", [0, 0, 20, 10], 18, "Güneş enerjisiyle çalışan sistemler fosil yakıt ihtiyacını azaltabilir."),
        option("Halka serinleme merkezleri aç", [0, 0, -5, 20], 15, "Serinleme merkezleri özellikle hassas grupları korur."),
        option("Elektrik tüketimini tamamen kes", [0, 0, -20, -15], -15, "Kesintiler sağlık ve temel hizmetler üzerinde ciddi risk yaratabilir."),
        option("Sıcak hava erken uyarı sistemi kur", [0, 0, -5, 15], 14, "Uyarılar halkın sıcaklık risklerine hazırlanmasını sağlar.")
      ]
    ),

    event("TARIMSAL ÜRETİMİN ÇÖKÜŞÜ", "🌾",
      "Aşırı sıcaklık ve su kıtlığı nedeniyle tarımsal verim hızla düşüyor.",
      [
        option("Kuraklığa dayanıklı tohumlara geç", [5, 20, 0, 10], 18, "Dayanıklı çeşitler su kıtlığında üretimi destekleyebilir."),
        option("Dikey tarım tesisleri kur", [5, 20, -10, 10], 16, "Kontrollü ortam tarımı bazı ürünlerde kaynak kullanımını azaltabilir."),
        option("Toprak nem sensörleri kullan", [10, 15, -5, 5], 17, "Sensörler sulamanın ihtiyaç duyulan zamanda yapılmasını sağlar."),
        option("Gıda ithalatına tamamen yönel", [0, 15, -5, -5], 2, "İthalat kısa vadede arz sağlayabilir ancak dışa bağımlılığı artırır."),
        option("Yerel üretici kooperatifleri kur", [5, 15, 0, 10], 16, "Kooperatifler bilgi, ekipman ve kaynak paylaşımını kolaylaştırır.")
      ]
    )
  ],


  /* ---------- KIYI BÖLGESİ ---------- */

  coast: [

    event("BÜYÜK KIYI SELİ", "🌊",
      "Şiddetli yağış ve fırtına kabarması kıyı yerleşimlerini su altında bırakıyor.",
      [
        option("Doğal kıyı sulak alanlarını restore et", [10, 5, 0, 15], 18, "Sulak alanlar suyu tutarak taşkın etkisini azaltabilir."),
        option("Taşkın koruma altyapısı kur", [5, 0, -10, 15], 14, "Uygun mühendislik yapıları yerleşimleri koruyabilir."),
        option("Riskli bölgelerde yapılaşmayı sınırla", [0, -5, 5, 10], 15, "Riskli alanlardan uzaklaşmak gelecekteki kayıpları azaltır."),
        option("Deniz duvarlarını her yere genişlet", [0, 0, -15, 5], 3, "Sert kıyı yapıları bazı alanlarda erozyonu başka bölgelere taşıyabilir."),
        option("Taşkın erken uyarı sistemi geliştir", [0, 0, -5, 15], 15, "Erken uyarı ve tahliye planları can güvenliğini artırır.")
      ]
    ),

    event("DENİZ SEVİYESİNİN YÜKSELMESİ", "🌅",
      "Deniz seviyesi yükseliyor. Kıyıdaki evler, yollar ve içme suyu kaynakları risk altında.",
      [
        option("Kıyı sulak alanlarını ve kumulları koru", [10, 5, 0, 15], 18, "Doğal kıyı sistemleri dalga ve taşkın etkisini azaltabilir."),
        option("Riskli yerleşimleri planlı biçimde taşı", [0, -10, 5, 15], 15, "Planlı yeniden yerleşim uzun vadeli riskleri azaltabilir."),
        option("Yükseltilmiş altyapı sistemleri kur", [0, 0, -10, 10], 13, "Kritik tesislerin yükseltilmesi su baskını riskini azaltır."),
        option("Kıyı yapılaşmasını artır", [-5, 5, 10, -10], -15, "Yeni yapılaşma daha fazla insanı ve yatırımı riske sokabilir."),
        option("Kıyı risk haritaları hazırla", [0, 0, -5, 10], 12, "Haritalar doğru planlama ve yatırım kararlarını destekler.")
      ]
    ),

    event("TSUNAMİ TEHLİKESİ", "🌊",
      "Deniz tabanındaki sismik hareketlilik kıyı boyunca tsunami riskini artırıyor.",
      [
        option("Tsunami erken uyarı ağı kur", [0, 0, -10, 20], 18, "Sensörler ve uyarı sistemleri tahliye için zaman kazandırır."),
        option("Güvenli tahliye yolları oluştur", [0, -5, -5, 20], 17, "İşaretli ve erişilebilir yollar tahliyeyi kolaylaştırır."),
        option("Kıyıdaki kritik tesisleri taşı", [0, -5, 5, 15], 15, "Kritik altyapıyı güvenli bölgelere taşımak hizmet sürekliliğini artırır."),
        option("Kıyıya yeni yüksek yoğunluklu yapılar kur", [-5, 5, 5, -15], -15, "Riskli alanlarda yoğun yapılaşma olası kayıpları artırır."),
        option("Düzenli tsunami tatbikatları yap", [0, 0, -5, 15], 15, "Tatbikatlar halkın doğru tepki verme becerisini geliştirir.")
      ]
    ),

    event("KIYI EROZYONU", "🏖️",
      "Dalgalar ve akıntılar kıyı çizgisini aşındırıyor. Plajlar ve yerleşimler daralıyor.",
      [
        option("Kıyı kumullarını ve bitki örtüsünü koru", [5, 5, 0, 10], 18, "Kumullar doğal bir koruma hattı oluşturabilir."),
        option("Bilimsel kıyı besleme çalışması yap", [0, 0, -10, 10], 12, "Uygun kum takviyesi kıyı dengesini destekleyebilir."),
        option("Kıyı yapılaşmasına mesafe sınırı getir", [0, -5, 5, 10], 15, "Geri çekilme mesafesi kıyı ekosistemlerine alan bırakır."),
        option("Kıyıdaki tüm bitkileri temizle", [-5, 0, 5, -5], -12, "Bitki örtüsünün kaldırılması erozyonu hızlandırabilir."),
        option("Kıyı izleme ve ölçüm sistemi kur", [0, 0, -5, 5], 12, "Düzenli ölçümler doğru müdahale zamanını belirlemeye yardımcı olur.")
      ]
    ),

    event("DENİZ SUYUNUN KİRLENMESİ", "🐟",
      "Atıklar ve kimyasal kirlilik deniz ekosistemini ve balıkçılığı tehdit ediyor.",
      [
        option("Atık su arıtma tesislerini geliştir", [10, 5, -10, 10], 18, "Arıtma tesisleri kirleticilerin denize ulaşmasını azaltır."),
        option("Deniz koruma alanları oluştur", [5, 15, 0, 10], 17, "Koruma alanları deniz canlılarının yaşam alanlarını destekler."),
        option("Plastik atık toplama sistemi kur", [5, 5, -5, 10], 14, "Atık toplama ve önleme çalışmaları deniz kirliliğini azaltır."),
        option("Sanayi atıklarını denize bırakmaya devam et", [-10, -15, 5, -10], -18, "Kirleticiler ekosisteme, gıda zincirine ve insan sağlığına zarar verir."),
        option("Balıkçılıkta sürdürülebilir kota uygula", [0, 15, 0, 5], 15, "Bilimsel kotalar balık stoklarının yenilenmesine fırsat verir.")
      ]
    ),

    event("KIYI FIRTINASI", "⛈️",
      "Şiddetli fırtınalar limanları, balıkçı teknelerini ve kıyı altyapısını tehdit ediyor.",
      [
        option("Fırtına uyarı ve takip sistemi kur", [0, 0, -5, 15], 16, "Meteorolojik takip sistemleri hazırlık süresini artırır."),
        option("Liman altyapısını güçlendir", [0, 0, -10, 10], 14, "Güçlendirilmiş altyapı ekonomik kayıpları azaltabilir."),
        option("Doğal kıyı tampon bölgeleri oluştur", [5, 5, 0, 15], 18, "Doğal kıyı alanları dalga enerjisini sönümleyebilir."),
        option("Fırtına döneminde denize açılmayı teşvik et", [0, 5, 0, -15], -15, "Riskli hava koşullarında denize açılmak can güvenliğini tehlikeye atar."),
        option("Acil durum barınakları oluştur", [0, 0, -5, 15], 14, "Güvenli barınaklar afet sonrası korunmayı kolaylaştırır.")
      ]
    )
  ],


  /* ---------- ORMAN BÖLGESİ ---------- */

  forest: [

    event("BÜYÜK ORMAN YANGINI", "🔥",
      "Uzun süren sıcaklık ve kuraklık orman yangınlarının hızla yayılmasına neden oluyor.",
      [
        option("Yangın erken algılama ağı kur", [0, 0, -10, 15], 18, "Sensörler ve uydu verileri yangının erken fark edilmesini sağlar."),
        option("Kontrollü yakıt yönetimi uygula", [0, 5, -5, 10], 15, "Bilimsel planlanan çalışmalar yangın yükünü azaltabilir."),
        option("Yerli türlerle yeniden ağaçlandır", [5, 15, -5, 10], 18, "Yerel türler ekosistemin toparlanmasına yardımcı olur."),
        option("Yangın riskli alanlarda yeni yapılaşma aç", [-5, 0, 5, -10], -12, "Yeni yapılaşma insanları yangın tehlikesine yaklaştırır."),
        option("Gönüllü yangın müdahale ekipleri eğit", [0, 0, -5, 15], 16, "Eğitimli ekipler ilk müdahale kapasitesini artırabilir.")
      ]
    ),

    event("EKOSİSTEM ÇÖKÜŞÜ", "🦋",
      "Orman canlılarının yaşam alanları parçalanıyor. Biyoçeşitlilik hızla azalıyor.",
      [
        option("Biyoçeşitlilik koridorları oluştur", [5, 10, 0, 15], 18, "Koridorlar canlıların farklı yaşam alanları arasında hareket etmesini sağlar."),
        option("Bozulmuş habitatları restore et", [5, 15, -5, 10], 18, "Restorasyon doğal süreçlerin yeniden işlemesine yardımcı olur."),
        option("Yerli türleri koruma programı başlat", [0, 15, 0, 10], 16, "Yerli türlerin korunması ekosistem dengesini destekler."),
        option("Orman alanlarını sanayiye aç", [-10, 5, 15, -15], -18, "Habitat kaybı türlerin yok olma riskini artırabilir."),
        option("Ekolojik izleme ve araştırma merkezi kur", [0, 5, -5, 10], 14, "Bilimsel izleme doğru koruma kararları alınmasını sağlar.")
      ]
    ),

    event("ORMAN ZARARLILARI", "🐛",
      "Zararlı böceklerin yayılması ağaçları zayıflatıyor ve orman sağlığını bozuyor.",
      [
        option("Biyolojik mücadele yöntemleri uygula", [0, 10, 0, 10], 17, "Doğal düşmanlardan yararlanmak kimyasal kullanımını azaltabilir."),
        option("Orman sağlığı izleme sistemi kur", [0, 5, -5, 10], 14, "Erken tespit salgınların yayılmasını sınırlayabilir."),
        option("Dayanıklı yerel ağaç türleri yetiştir", [5, 15, -5, 10], 18, "Tür çeşitliliği ormanların dayanıklılığını artırır."),
        option("Yoğun kimyasal ilaçlama yap", [-5, 5, 5, -5], -10, "Kontrolsüz kimyasallar diğer canlılara ve suya zarar verebilir."),
        option("Hastalıklı alanları kontrollü biçimde yönet", [0, 5, 0, 5], 10, "Bilimsel müdahale yayılma riskini azaltmaya yardımcı olur.")
      ]
    ),

    event("TOPRAK EROZYONU", "⛰️",
      "Şiddetli yağışlar ve bitki örtüsü kaybı verimli orman toprağını taşıyor.",
      [
        option("Eğimli alanlarda teraslama yap", [5, 10, -5, 5], 16, "Teraslama yüzey akışını yavaşlatabilir."),
        option("Toprak tutucu bitkiler ek", [5, 15, 0, 10], 18, "Kökler toprağın yerinde kalmasına yardımcı olur."),
        option("Dere yataklarını doğal hâline getir", [10, 5, -5, 10], 16, "Doğal su yolları taşkın ve erozyon riskini azaltabilir."),
        option("Orman tabanını temizleyip çıplak bırak", [-10, -10, 5, -5], -15, "Bitki ve organik örtü kaybı erozyonu artırabilir."),
        option("Yağmur suyu yönetim sistemi kur", [10, 5, -5, 5], 14, "Suyun kontrollü yönlendirilmesi toprağı korur.")
      ]
    ),

    event("ORMAN KURAKLIĞI", "🌳",
      "Uzayan kuraklık ağaçların gelişimini yavaşlatıyor ve orman yangını riskini artırıyor.",
      [
        option("Kuraklığa dayanıklı yerel türler dik", [5, 15, -5, 10], 18, "Bölgeye uyumlu türler iklim stresine daha dayanıklı olabilir."),
        option("Orman su havzalarını koru", [15, 5, 0, 10], 17, "Su havzalarının korunması ekosistemin su dengesini destekler."),
        option("Toprak nemini koruyan örtü uygula", [10, 10, -5, 5], 15, "Organik örtü buharlaşmayı azaltabilir."),
        option("Daha fazla ağaç keserek alan aç", [-10, 5, 10, -10], -15, "Orman örtüsünün azalması kuraklık etkilerini ağırlaştırabilir."),
        option("Uzun vadeli orman su planı hazırla", [10, 10, -5, 10], 16, "Planlama su kaynaklarının ekosistem ihtiyaçlarına göre kullanılmasını sağlar.")
      ]
    ),

    event("ORMANIN YOK OLMASI", "🪵",
      "Ağaç kesimi ve arazi dönüşümü orman alanlarını kritik seviyeye düşürdü.",
      [
        option("Orman koruma alanlarını genişlet", [5, 10, 0, 10], 18, "Koruma alanları doğal yaşamın devamlılığını destekler."),
        option("Sürdürülebilir ormancılık planı uygula", [0, 10, 5, 10], 16, "Planlı kesim ve yenileme orman kaynaklarının devamlılığını sağlayabilir."),
        option("Bozulmuş alanları yeniden ağaçlandır", [5, 15, -5, 10], 18, "Ağaçlandırma uygun tür ve alan seçimiyle ekolojik fayda sağlar."),
        option("Ormanları enerji üretimi için tamamen kes", [-10, 5, 15, -15], -18, "Aşırı kesim karbon depolarını ve habitatları azaltır."),
        option("Yerel halkla ortak koruma programı kur", [0, 10, 0, 15], 17, "Yerel katılım koruma çalışmalarının kalıcılığını artırır.")
      ]
    )
  ],


  /* ---------- KUTUP BÖLGESİ ---------- */

  polar: [

    event("BUZULLARIN HIZLA ERİMESİ", "🧊",
      "Artan sıcaklıklar buzulları hızla eritiyor. Bölgenin doğal dengesi değişiyor.",
      [
        option("Küresel karbon azaltım programına katıl", [0, 5, 10, 10], 18, "Emisyon azaltımı buzullar üzerindeki uzun vadeli baskıyı azaltmaya katkı sağlar."),
        option("Buzul ve sıcaklık izleme istasyonları kur", [0, 0, -5, 10], 15, "Bilimsel izleme değişimin hızını anlamayı sağlar."),
        option("Hassas buzul alanlarını koruma bölgesi ilan et", [5, 5, 0, 10], 16, "Koruma statüsü insan kaynaklı baskıları sınırlar."),
        option("Buzul çevresinde madenciliği genişlet", [-5, 5, 15, -10], -15, "Endüstriyel faaliyetler hassas ekosistemlere zarar verebilir."),
        option("Uluslararası iklim araştırmalarına destek ver", [0, 5, -5, 10], 15, "Ortak araştırmalar küresel iklim bilgisini geliştirir.")
      ]
    ),

    event("PERMAFROST ÇÖZÜLMESİ", "🌡️",
      "Donmuş toprak çözülüyor. Altyapı zarar görüyor ve sera gazı salımı riski artıyor.",
      [
        option("Permafrost izleme ağı kur", [0, 0, -5, 10], 15, "Zemin sıcaklığının izlenmesi riskli alanları belirlemeye yardımcı olur."),
        option("Binaları yükseltilmiş temellerle güçlendir", [0, 0, -10, 10], 14, "Uygun temel tasarımı zemin hareketlerine karşı dayanıklılığı artırabilir."),
        option("Riskli altyapıyı güvenli alanlara taşı", [0, -5, 5, 10], 14, "Planlı taşıma gelecekteki hasarları azaltabilir."),
        option("Yeni fosil yakıt sahaları aç", [-5, 5, 15, -10], -15, "Fosil yakıt faaliyetleri iklim baskısını artırabilir."),
        option("Sera gazı ölçüm ve azaltım programı başlat", [0, 5, 5, 10], 17, "Emisyonların izlenmesi ve azaltılması iklim risklerini yönetmeye yardımcı olur.")
      ]
    ),

    event("KUTUP EKOSİSTEMİNİN BOZULMASI", "🐧",
      "Buz kaybı ve sıcaklık değişimleri kutup canlılarının yaşam alanlarını daraltıyor.",
      [
        option("Deniz koruma alanlarını genişlet", [5, 10, 0, 10], 18, "Koruma alanları hassas türlerin yaşam alanlarını destekler."),
        option("Tür izleme ve araştırma programı başlat", [0, 10, -5, 10], 16, "Veriler türlerin ihtiyaçlarını ve risklerini ortaya koyar."),
        option("Kirlilik kaynaklarını sınırlandır", [5, 5, 5, 10], 16, "Kirliliğin azaltılması ekosistem sağlığını destekler."),
        option("Hassas bölgelerde turizmi kontrolsüz artır", [-5, 5, 5, -10], -12, "Kontrolsüz ziyaretler habitatlara zarar verebilir."),
        option("Yerel ekosistem restorasyonu uygula", [5, 15, -5, 10], 17, "Bilimsel restorasyon ekolojik dayanıklılığı güçlendirebilir.")
      ]
    ),

    event("KUTUP FIRTINALARI", "🌨️",
      "Şiddetli fırtınalar ulaşımı, iletişimi ve yerleşimlerin güvenliğini tehdit ediyor.",
      [
        option("Hava tahmin ve erken uyarı sistemleri kur", [0, 0, -5, 15], 17, "Erken uyarı sistemleri hazırlık süresini artırır."),
        option("Dayanıklı acil durum barınakları oluştur", [0, 0, -10, 15], 15, "Barınaklar aşırı hava koşullarında korunma sağlar."),
        option("Kritik iletişim altyapısını yedekle", [0, 0, -5, 15], 16, "Yedek sistemler afet sırasında iletişimi sürdürebilir."),
        option("Fırtına uyarılarını dikkate almadan çalışmaya devam et", [0, 5, 0, -15], -15, "Uyarıları göz ardı etmek can güvenliğini tehlikeye atar."),
        option("Güvenli ulaşım ve tahliye planı hazırla", [0, -5, -5, 15], 15, "Planlı ulaşım ve tahliye kayıpları azaltabilir.")
      ]
    ),

    event("KUTUP DENİZLERİNDE KİRLİLİK", "🛢️",
      "Deniz taşımacılığı ve atıklar kutup denizlerinde kirlenme riskini artırıyor.",
      [
        option("Sıfır atık deniz taşımacılığı standardı getir", [5, 5, 0, 10], 17, "Atıkların kontrolü deniz kirliliğini azaltabilir."),
        option("Deniz temizleme ve izleme programı başlat", [5, 5, -10, 10], 14, "Temizlik çalışmaları izleme ve önlemeyle birlikte yürütülmelidir."),
        option("Yakıt sızıntısı müdahale ekipleri kur", [0, 5, -5, 10], 15, "Hızlı müdahale çevresel zararın büyümesini önleyebilir."),
        option("Atıkların denize bırakılmasına izin ver", [-10, -10, 5, -10], -18, "Atıklar besin zincirine ve hassas canlılara zarar verir."),
        option("Gemi rotalarını hassas habitatlardan uzaklaştır", [5, 5, 5, 10], 16, "Rota planlaması ekosistem üzerindeki baskıyı azaltabilir.")
      ]
    ),

    event("KUTUP TOPLULUKLARININ RİSK ALTINDA OLMASI", "🏠",
      "İklim değişikliği geleneksel yaşam alanlarını ve temel hizmetlere erişimi zorluyor.",
      [
        option("Topluluklarla ortak uyum planı hazırla", [5, 10, 0, 15], 18, "Yerel bilgi ve katılım etkili uyum politikaları oluşturur."),
        option("Sağlık ve gıda erişim ağlarını güçlendir", [5, 15, -5, 15], 17, "Temel hizmetlere erişim toplumsal dayanıklılığı artırır."),
        option("İklim göçü için gönüllü destek programı kur", [0, 5, 5, 15], 15, "Gönüllü ve planlı destek güvenli geçişi kolaylaştırabilir."),
        option("Toplulukların karar süreçlerine katılımını kaldır", [0, -5, 5, -15], -15, "Katılımın yokluğu ihtiyaçların gözden kaçmasına yol açabilir."),
        option("Uzaktan eğitim ve sağlık altyapısı kur", [0, 5, -5, 15], 16, "Dijital hizmetler uzak yerleşimlerde erişimi artırabilir.")
      ]
    )
  ],


  /* ---------- METROPOL BÖLGESİ ---------- */

  metro: [

    event("KENTSEL ISI ADASI", "🏙️",
      "Beton yüzeyler ve yoğun yapılaşma şehir sıcaklığını çevresine göre artırıyor.",
      [
        option("Şehir genelinde yeşil koridorlar oluştur", [5, 10, -5, 15], 18, "Yeşil alanlar gölge ve buharlaşma yoluyla serinlemeye katkı sağlar."),
        option("Binalarda yeşil çatı uygulamasını destekle", [5, 5, 0, 10], 16, "Yeşil çatılar yüzey sıcaklığını ve enerji ihtiyacını azaltabilir."),
        option("Açık renkli serin yol kaplamaları kullan", [0, 0, 5, 10], 14, "Yansıtıcı yüzeyler güneş ışınımının emilimini azaltabilir."),
        option("Daha fazla beton yapılaşmaya izin ver", [-5, 0, 10, -10], -12, "Yoğun sert yüzeyler ısı adası etkisini artırabilir."),
        option("Mahalle serinleme merkezleri kur", [0, 0, -5, 15], 15, "Merkezler sıcak hava dalgalarında hassas grupları korur.")
      ]
    ),

    event("HAVA KİRLİLİĞİ KRİZİ", "🌫️",
      "Trafik ve sanayi kaynaklı emisyonlar hava kalitesini tehlikeli seviyelere taşıyor.",
      [
        option("Toplu taşımayı elektrikli hâle getir", [0, 0, 15, 10], 18, "Elektrikli toplu taşıma yerel egzoz emisyonlarını azaltabilir."),
        option("Bisiklet ve yaya yollarını genişlet", [0, 0, 5, 10], 16, "Aktif ulaşım motorlu araç kullanımını azaltabilir."),
        option("Sanayi emisyonlarına sıkı sınır getir", [0, 5, -5, 10], 17, "Denetim ve filtre sistemleri hava kirleticilerini azaltır."),
        option("Fosil yakıtlı araç kullanımını teşvik et", [0, 0, -10, -10], -18, "Fosil yakıt tüketimi hava kirliliğini ve sera gazlarını artırır."),
        option("Hava kalitesi sensör ağı kur", [0, 0, -5, 10], 13, "Ölçüm verileri doğru müdahaleyi planlamayı sağlar.")
      ]
    ),

    event("ENERJİ TALEBİNİN PATLAMASI", "⚡",
      "Nüfus ve sıcaklık artışı elektrik talebini yükseltiyor. Şebeke zorlanıyor.",
      [
        option("Güneş ve rüzgâr yatırımlarını artır", [0, 0, 20, 10], 18, "Yenilenebilir enerji kaynakları fosil yakıt bağımlılığını azaltabilir."),
        option("Binalarda enerji verimliliği dönüşümü yap", [0, 0, 15, 10], 18, "Yalıtım ve verimli cihazlar enerji talebini düşürür."),
        option("Enerji depolama sistemleri kur", [0, 0, 15, 5], 16, "Depolama, üretim ve tüketim arasındaki zaman farkını yönetir."),
        option("Kömür santrallerini genişlet", [0, 0, 15, -10], -15, "Kömür yatırımları yüksek karbon emisyonu oluşturur."),
        option("Akıllı şebeke sistemine geç", [0, 0, 15, 10], 17, "Akıllı şebekeler talebi ve dağıtımı daha verimli yönetebilir.")
      ]
    ),

    event("KENTSEL SU KRİZİ", "🚰",
      "Şehrin su tüketimi mevcut kaynakların kapasitesini aşıyor.",
      [
        option("Akıllı su sayaçları ve kaçak tespiti kur", [20, 0, -5, 5], 17, "Ölçüm ve kaçak kontrolü kayıpları azaltabilir."),
        option("Gri su kullanım sistemlerini yaygınlaştır", [20, 5, -5, 5], 18, "Gri su, uygun arıtmayla tuvalet ve sulama gibi alanlarda kullanılabilir."),
        option("Yağmur suyu depolama zorunluluğu getir", [15, 0, -5, 5], 15, "Binalarda yağmur suyu toplamak şebeke üzerindeki baskıyı azaltır."),
        option("Su tüketimini denetimsiz bırak", [-20, 0, 5, -5], -15, "Denetimsiz tüketim kaynakların hızla tükenmesine neden olabilir."),
        option("Park ve bahçelerde kurakçıl peyzaj uygula", [15, 5, 0, 5], 15, "Az su isteyen bitkiler kentsel sulama ihtiyacını düşürür.")
      ]
    ),

    event("KENTSEL ATIK YIĞILMASI", "🗑️",
      "Atık miktarı hızla artıyor. Depolama alanları doluyor ve çevre kirliliği büyüyor.",
      [
        option("Atık ayrıştırma ve geri dönüşüm ağı kur", [5, 10, 5, 10], 18, "Ayrıştırma değerli malzemelerin yeniden kullanılmasını sağlar."),
        option("Kompost tesisleri kur", [5, 15, 0, 10], 16, "Organik atıklar kompostla toprağa geri kazandırılabilir."),
        option("Tek kullanımlık ürünleri azalt", [5, 10, 5, 10], 17, "Atık oluşumunu kaynağında önlemek çevresel yükü azaltır."),
        option("Atıkları kontrolsüz biçimde yak", [-5, -10, 10, -10], -18, "Kontrolsüz yakma zararlı hava kirleticileri oluşturabilir."),
        option("Döngüsel ekonomi işletmelerini destekle", [5, 15, 10, 10], 18, "Yeniden kullanım ve onarım kaynak tüketimini azaltır.")
      ]
    ),

    event("AŞIRI NÜFUS VE ALTYAPI BASKISI", "🚇",
      "Hızlı nüfus artışı ulaşım, konut, sağlık ve altyapı hizmetlerini zorluyor.",
      [
        option("Toplu taşıma odaklı yeni yerleşimler planla", [5, 5, 10, 15], 18, "Ulaşım ve konut planlamasının birlikte yapılması kaynak kullanımını azaltabilir."),
        option("Karma kullanımlı, yürünebilir mahalleler kur", [5, 5, 5, 15], 17, "Günlük ihtiyaçlara yakın erişim yolculukları azaltabilir."),
        option("Sağlık ve eğitim altyapısını güçlendir", [0, 5, -5, 15], 16, "Temel hizmetlerin kapasitesi toplumsal refahı destekler."),
        option("Plansız yapılaşmayı teşvik et", [-10, -5, 5, -10], -15, "Plansız büyüme altyapı ve çevre sorunlarını derinleştirebilir."),
        option("Mahalle ölçeğinde katılımcı planlama başlat", [0, 5, 0, 15], 17, "Yerel katılım ihtiyaçların daha doğru belirlenmesini sağlar.")
      ]
    )
  ],


  /* ---------- TARIM BÖLGESİ ---------- */

  agriculture: [

    event("TARIMSAL KURAKLIK", "🌾",
      "Yağış azlığı ve yüksek sıcaklıklar tarlalarda su stresini artırıyor.",
      [
        option("Damla sulama sistemlerine geç", [20, 15, -5, 5], 18, "Damla sulama suyun doğrudan bitkiye verilmesini sağlar."),
        option("Toprak nem sensörleri kullan", [15, 10, -5, 5], 16, "Sensörler gereksiz sulamayı önlemeye yardımcı olur."),
        option("Kuraklığa dayanıklı ürün çeşitleri ek", [5, 20, 0, 10], 18, "Dayanıklı çeşitler üretim kaybını azaltabilir."),
        option("Su ihtiyacı yüksek ürünleri artır", [-20, 15, 5, -5], -12, "Su yoğun üretim kuraklık koşullarında kaynak baskısını artırır."),
        option("Yağmur suyu hasadı altyapısı kur", [15, 10, -5, 5], 16, "Yağış dönemlerinde su depolamak kurak dönemlere hazırlık sağlar.")
      ]
    ),

    event("TOPRAK VERİMLİLİĞİNİN AZALMASI", "🌱",
      "Yoğun üretim ve yanlış uygulamalar toprağın organik maddesini azaltıyor.",
      [
        option("Örtü bitkileri ve münavebe uygula", [5, 15, 0, 10], 18, "Örtü bitkileri toprağı korur, münavebe besin dengesini destekler."),
        option("Organik madde ve kompost kullanımını artır", [5, 20, 0, 5], 17, "Organik madde toprak yapısını ve su tutma kapasitesini iyileştirebilir."),
        option("Toprak analizine dayalı gübreleme yap", [5, 15, 5, 5], 16, "Analiz, gereksiz gübre kullanımını önleyebilir."),
        option("Toprağı sürekli ve yoğun biçimde işle", [-5, -10, 5, -5], -12, "Aşırı toprak işleme yapıyı bozup erozyonu artırabilir."),
        option("Koruyucu tarım yöntemlerini yaygınlaştır", [5, 15, 5, 10], 18, "Minimum toprak işleme ve örtü yönetimi toprağı korur.")
      ]
    ),

    event("TARIMSAL ZARARLILARIN YAYILMASI", "🐞",
      "Değişen sıcaklıklar zararlıların çoğalmasını ve yeni alanlara yayılmasını kolaylaştırıyor.",
      [
        option("Entegre zararlı yönetimi uygula", [0, 15, 0, 10], 18, "Biyolojik, kültürel ve gerektiğinde kimyasal yöntemler birlikte değerlendirilir."),
        option("Biyolojik mücadele yöntemleri kullan", [0, 15, 0, 10], 17, "Doğal düşmanlar zararlı popülasyonlarını kontrol etmeye yardımcı olur."),
        option("Erken uyarı ve tarla izleme ağı kur", [0, 10, -5, 5], 15, "Erken tespit doğru zamanda müdahale edilmesini sağlar."),
        option("Tüm tarlalara kontrolsüz pestisit uygula", [-5, -10, 5, -5], -15, "Kontrolsüz pestisit kullanımı faydalı canlılara ve suya zarar verebilir."),
        option("Dayanıklı ürün çeşitleri geliştir", [0, 20, -5, 10], 17, "Dayanıklı çeşitler zararlı kaynaklı kayıpları azaltabilir.")
      ]
    ),

    event("AŞIRI YAĞIŞ VE TARLA SU BASKINI", "🌧️",
      "Yoğun yağışlar tarlaları su altında bırakıyor ve ürün kaybına neden oluyor.",
      [
        option("Tarla drenaj sistemlerini iyileştir", [10, 15, -5, 5], 17, "Drenaj fazla suyun kontrollü uzaklaştırılmasını sağlar."),
        option("Taşkın risk haritaları hazırla", [0, 5, -5, 10], 14, "Haritalar riskli alanlarda üretim planlamasını kolaylaştırır."),
        option("Taşkın yataklarını doğal hâline getir", [15, 10, -5, 10], 18, "Doğal taşkın alanları suyu tutarak zararları azaltabilir."),
        option("Dere yataklarına yeni tarım alanları aç", [-10, 10, 5, -10], -15, "Taşkın alanlarında üretim yapmak tekrar eden kayıpları artırabilir."),
        option("Dayanıklı depolama ve tahliye altyapısı kur", [5, 10, -10, 10], 15, "Ürün ve ekipmanların korunması ekonomik kayıpları azaltır.")
      ]
    ),

    event("GIDA ZİNCİRİNİN KIRILMASI", "🚜",
      "İklim kaynaklı üretim kayıpları ve lojistik sorunları gıda tedarikini aksatıyor.",
      [
        option("Yerel gıda depolama merkezleri kur", [5, 20, -5, 10], 17, "Depolama hasat sonrası kayıpları azaltabilir."),
        option("Üretici kooperatiflerini güçlendir", [5, 20, 0, 10], 18, "Kooperatifler üretim ve dağıtım koordinasyonunu geliştirir."),
        option("Soğuk zincir altyapısını iyileştir", [0, 20, -10, 10], 16, "Soğuk zincir bozulabilir ürünlerin kaybını azaltır."),
        option("Tek bir ürüne bağımlı üretimi artır", [-5, -15, 5, -10], -15, "Ürün çeşitliliğinin azalması tedarik riskini artırabilir."),
        option("Bölgesel gıda paylaşım ağı oluştur", [5, 15, 0, 15], 17, "Paylaşım ağı ihtiyaç fazlası ürünlerin değerlendirilmesini sağlar.")
      ]
    ),

    event("TARIMSAL EMİSYONLARIN ARTMASI", "🚜",
      "Gübre kullanımı, hayvancılık ve enerji tüketimi tarımsal emisyonları artırıyor.",
      [
        option("Hassas gübreleme teknolojileri kullan", [5, 15, 10, 5], 17, "Doğru miktarda gübre kullanımı emisyonları ve maliyetleri azaltabilir."),
        option("Biyogaz tesisleri kur", [0, 5, 20, 10], 18, "Hayvansal atıklar biyogaz üretiminde değerlendirilebilir."),
        option("Tarım makinelerini enerji verimli hâle getir", [0, 5, 15, 5], 16, "Verimli makineler yakıt tüketimini azaltır."),
        option("Atıkları kontrolsüz biçimde açıkta bırak", [-5, -5, -5, -5], -12, "Kontrolsüz atık yönetimi sera gazı ve kirlilik oluşturabilir."),
        option("Düşük emisyonlu tarım programı başlat", [5, 15, 10, 10], 18, "Üretim süreçlerinin iyileştirilmesi emisyonları azaltabilir.")
      ]
    )
  ]
};


/* =========================================
   3. BÖLGE BİLGİLERİ
========================================= */

const regionInfo = {
  desert: {
    name: "Çöl Bölgesi",
    description: "Su kaynakları çok sınırlı. Kuraklık en büyük tehdidin.",
    icon: "🏜️",
    start: [55, 70, 85, 70]
  },

  coast: {
    name: "Kıyı Bölgesi",
    description: "Deniz seviyesi yükseliyor. Kıyı ekosistemleri ve yerleşimler risk altında.",
    icon: "🌊",
    start: [85, 65, 70, 75]
  },

  forest: {
    name: "Orman Bölgesi",
    description: "Orman ekosistemi baskı altında. Yangın ve biyoçeşitlilik kaybı önemli tehditler.",
    icon: "🌲",
    start: [75, 85, 55, 75]
  },

  polar: {
    name: "Kutup Bölgesi",
    description: "Buzullar eriyor. Hassas ekosistemler ve yerleşimler değişen iklimle karşı karşıya.",
    icon: "❄️",
    start: [75, 65, 65, 70]
  },

  metro: {
    name: "Metropol Bölgesi",
    description: "Yoğun nüfus, enerji talebi ve hava kirliliği şehir yaşamını zorluyor.",
    icon: "🏙️",
    start: [70, 75, 60, 85]
  },

  agriculture: {
    name: "Tarım Bölgesi",
    description: "Üretim iklim koşullarına bağlı. Su, toprak ve gıda güvenliği önceliğin.",
    icon: "🌾",
    start: [65, 85, 70, 75]
  }
};


/* =========================================
   4. OYUN DEĞİŞKENLERİ
========================================= */

let selectedRegionKey = "desert";
let selectedDistrict = "Çöl Bölgesi";
let selectedDifficulty = "normal";

let resources = {
  water: 70,
  food: 70,
  energy: 70,
  population: 70
};

let resourceNames = {
  water: "Su",
  food: "Gıda",
  energy: "Enerji",
  population: "Toplumsal Refah"
};

let resourceIcons = {
  water: "💧",
  food: "🌾",
  energy: "⚡",
  population: "👥"
};

let resourceHistory = {
  water: [],
  food: [],
  energy: [],
  population: []
};

let currentRound = 0;
let gameEvents = [];
let sustainability = 50;
let totalScore = 0;
let locked = false;

let decisionHistory = [];
let harmfulDecisionCount = 0;
let currentLevel = 1;

const difficultySettings = {
  easy: {
    name: "Kolay",
    multiplier: 0.75,
    bonus: 10
  },
  normal: {
    name: "Normal",
    multiplier: 1,
    bonus: 0
  },
  hard: {
    name: "Zor",
    multiplier: 1.25,
    bonus: -10
  }
};


/* =========================================
   5. BÖLGE SEÇİMİ
========================================= */

function selectRegion(region) {

  if (!regionInfo[region]) return;

  selectedRegionKey = region;
  selectedDistrict = regionInfo[region].name;

  const description = document.getElementById("regionDescription");

  if (description) {
    description.textContent = regionInfo[region].description;
  }

  const district = document.getElementById("district");

  if (district) {
    district.value = selectedDistrict;
  }

  document.querySelectorAll(".region").forEach(button => {
    button.classList.remove("selected");
  });

  const selectedButton = document.querySelector(".region." + region);

  if (selectedButton) {
    selectedButton.classList.add("selected");
  }
}

/* =========================================
   6. ZORLUK SEÇİMİ - DÜZELTİLMİŞ
========================================= */

function createDifficultySelector() {

  const start = document.getElementById("start");

  if (!start || document.getElementById("difficultySelector")) return;

  const wrapper = document.createElement("div");

  wrapper.id = "difficultySelector";
  wrapper.style.margin = "20px 0";

  wrapper.innerHTML = `
    <h3>ZORLUK SEVİYESİNİ SEÇ</h3>
    <select id="difficultySelect">
      <option value="easy">Kolay - Daha fazla başlangıç kaynağı</option>
      <option value="normal" selected>Normal - Dengeli başlangıç</option>
      <option value="hard">Zor - Daha az başlangıç kaynağı</option>
    </select>
  `;

  const startAction = start.querySelector(".start-action");

  if (startAction && startAction.parentElement === start) {
    start.insertBefore(wrapper, startAction);
  } else {
    start.appendChild(wrapper);
  }
}
/* =========================================
   7. SEVİYE PANELİ
========================================= */

function createLevelPanel() {

  const play = document.getElementById("play");

  if (!play || document.getElementById("levelPanel")) return;

  const panel = document.createElement("div");

  panel.id = "levelPanel";

  panel.style.padding = "14px";
  panel.style.margin = "15px 0";
  panel.style.border = "1px solid #e6a64c";
  panel.style.borderRadius = "10px";
  panel.style.background = "rgba(230,166,76,0.08)";

  panel.innerHTML = `
    <div id="levelName" style="font-weight:bold;color:#e6a64c">
      SEVİYE 1: İLK ADIMLAR
    </div>
    <div id="levelProgress" style="margin-top:6px;font-size:13px">
      1. seviye - 2 karar
    </div>
  `;

  const districtInfo = play.querySelector(".district-info");

  if (districtInfo) {
    districtInfo.insertAdjacentElement("afterend", panel);
  } else {
    play.prepend(panel);
  }
}

function updateLevelPanel() {

  const names = {
    1: "SEVİYE 1: İLK ADIMLAR",
    2: "SEVİYE 2: KRİTİK KARARLAR",
    3: "SEVİYE 3: GELECEĞİNİ KUR"
  };

  const name = document.getElementById("levelName");
  const progress = document.getElementById("levelProgress");

  if (name) {
    name.textContent = names[currentLevel];
  }

  if (progress) {
    progress.textContent =
      `Seviye ${currentLevel} · ${currentRound + 1}. karar / 6`;
  }
}


/* =========================================
   8. OYUNU BAŞLAT
========================================= */

function startGame() {

  const difficultySelect = document.getElementById("difficultySelect");

  selectedDifficulty = difficultySelect
    ? difficultySelect.value
    : "normal";

  const setting = difficultySettings[selectedDifficulty];

  const base = [...regionInfo[selectedRegionKey].start];

  resources = {
    water: Math.max(0, Math.min(100, base[0] + setting.bonus)),
    food: Math.max(0, Math.min(100, base[1] + setting.bonus)),
    energy: Math.max(0, Math.min(100, base[2] + setting.bonus)),
    population: Math.max(0, Math.min(100, base[3] + setting.bonus))
  };

  currentRound = 0;
  currentLevel = 1;
  sustainability = 50;
  totalScore = 0;
  locked = false;
  harmfulDecisionCount = 0;
  decisionHistory = [];

  resourceHistory = {
    water: [resources.water],
    food: [resources.food],
    energy: [resources.energy],
    population: [resources.population]
  };

  gameEvents = shuffle(regionEvents[selectedRegionKey]);

  document.getElementById("start").classList.add("hidden");
  document.getElementById("play").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  document.getElementById("districtName").textContent =
    regionInfo[selectedRegionKey].icon + " " + selectedDistrict;

  createLevelPanel();
  updateLevelPanel();
  updateResources();

  showRound();
}


/* =========================================
   9. KAYNAKLARI GÖSTER
========================================= */

function updateResources() {

  const container = document.getElementById("resources");

  if (!container) return;

  container.innerHTML = "";

  Object.keys(resources).forEach(key => {

    const value = Math.round(resources[key]);

    const card = document.createElement("div");

    card.className = "resource-card";

    card.innerHTML = `
      <div>${resourceIcons[key]} ${resourceNames[key]}</div>
      <strong>${value}%</strong>
      <div class="resource-bar">
        <div class="resource-fill" style="width:${value}%"></div>
      </div>
    `;

    container.appendChild(card);
  });

  const sustainabilityText = document.createElement("div");

  sustainabilityText.style.gridColumn = "1 / -1";
  sustainabilityText.style.marginTop = "10px";
  sustainabilityText.innerHTML =
    `🌍 Sürdürülebilirlik: <strong>${Math.round(sustainability)}%</strong>`;

  container.appendChild(sustainabilityText);
}


/* =========================================
   10. KRİZİ GÖSTER
========================================= */

function showRound() {

  if (currentRound >= gameEvents.length) {
    finishGame();
    return;
  }

  locked = false;

  const currentEvent = gameEvents[currentRound];

  document.getElementById("round").textContent =
    `TUR ${currentRound + 1} / ${gameEvents.length}`;

  document.getElementById("eventVisual").textContent =
    currentEvent.icon;

  document.getElementById("eventTitle").textContent =
    currentEvent.title;

  let description = currentEvent.description;

  if (harmfulDecisionCount >= 2) {
    description +=
      " ⚠️ Önceki kararlarının olumsuz etkileri yeni krizi daha da zorlaştırıyor.";
  }

  document.getElementById("eventDescription").textContent =
    description;

  const choices = document.getElementById("choices");

  choices.innerHTML = "";

  currentEvent.choices.forEach((choice, index) => {

    const button = document.createElement("button");

    button.className = "choice-button";

    button.textContent =
      `${index + 1}. ${choice.text}`;

    button.onclick = () => makeDecision(index);

    choices.appendChild(button);
  });

  document.getElementById("feedback").innerHTML = "";

  updateLevelPanel();
}


/* =========================================
   11. KARARLARIN UZUN VADELİ ETKİSİ
========================================= */

function checkHarmfulDecision(choice) {

  const negativeEffects = choice.effect.filter(value => value < -10).length;

  const negativeScore = choice.score < 0;

  if (negativeEffects > 0 || negativeScore) {
    harmfulDecisionCount++;
  }

  if (harmfulDecisionCount >= 2) {
    sustainability = Math.max(0, sustainability - 3);
  }
}


/* =========================================
   12. KARAR UYGULA
========================================= */

function makeDecision(index) {

  if (locked) return;

  locked = true;

  const currentEvent = gameEvents[currentRound];
  const choice = currentEvent.choices[index];

  if (!choice) return;

  const setting = difficultySettings[selectedDifficulty];

  const keys = ["water", "food", "energy", "population"];

  keys.forEach((key, i) => {

    let change = choice.effect[i];

    if (change < 0) {
      change *= setting.multiplier;
    }

    resources[key] = Math.max(
      0,
      Math.min(100, resources[key] + change)
    );

    resourceHistory[key].push(resources[key]);
  });

  sustainability = Math.max(
    0,
    Math.min(100, sustainability + choice.score * 0.25)
  );

  totalScore += choice.score;

  checkHarmfulDecision(choice);

  decisionHistory.push({
    event: currentEvent.title,
    choice: choice.text,
    score: choice.score
  });

  updateResources();

  const feedback = document.getElementById("feedback");

  let resultTitle = "KARARIN UYGULANDI";

  if (choice.score >= 15) {
    resultTitle = "SÜRDÜRÜLEBİLİR BİR ADIM!";
  } else if (choice.score < 0) {
    resultTitle = "RİSKLİ BİR KARAR!";
  } else if (choice.score < 8) {
    resultTitle = "SINIRLI ETKİ!";
  }

  feedback.innerHTML = `
    <div class="decision-result">
      <h3>${resultTitle}</h3>
      <p>${choice.info}</p>
      <p><strong>Karar puanı:</strong> ${choice.score > 0 ? "+" : ""}${choice.score}</p>
      <button onclick="nextRound()">SONRAKİ KARAR →</button>
    </div>
  `;

  document.querySelectorAll("#choices button").forEach(button => {
    button.disabled = true;
  });
}


/* =========================================
   13. SONRAKİ TUR VE SEVİYE GEÇİŞLERİ
========================================= */

function nextRound() {

  currentRound++;

  if (currentRound >= gameEvents.length) {
    finishGame();
    return;
  }

  const newLevel = Math.floor(currentRound / 2) + 1;

  if (newLevel !== currentLevel) {

    currentLevel = newLevel;

    const feedback = document.getElementById("feedback");

    feedback.innerHTML = `
      <div class="decision-result">
        <h3>🎯 SEVİYE ${currentLevel} BAŞLADI!</h3>
        <p>${currentLevel === 2
          ? "İlk kararlarının etkileri ortaya çıkıyor. Artık daha karmaşık sorunlarla karşı karşıyasın."
          : "Son aşamaya geldin. Gelecek nesiller için son kararlarını ver."
        }</p>
        <button onclick="showRound()">DEVAM ET →</button>
      </div>
    `;

    return;
  }

  showRound();
}


/* =========================================
   14. SONUÇ HESAPLAMA
========================================= */

function calculateFinalScore() {

  const averageResources = (
    resources.water +
    resources.food +
    resources.energy +
    resources.population
  ) / 4;

  let score =
    averageResources * 0.55 +
    sustainability * 0.35 +
    (totalScore / 6) * 0.10;

  if (harmfulDecisionCount >= 3) {
    score -= 8;
  }

  if (Object.values(resources).some(value => value <= 0)) {
    score = Math.min(score, 35);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}


/* =========================================
   15. SONUÇ RAPORU
========================================= */

function createFinalResourceReport() {

  const keys = ["water", "food", "energy", "population"];

  let report = `
    <h3>📊 KAYNAK DURUM RAPORU</h3>
    <div class="final-report">
  `;

  keys.forEach(key => {

    const initial = resourceHistory[key][0] ?? resources[key];
    const final = resources[key];

    const difference = Math.round(final - initial);

    report += `
      <p>
        ${resourceIcons[key]} ${resourceNames[key]}:
        ${Math.round(initial)}% → ${Math.round(final)}%
        (${difference > 0 ? "+" : ""}${difference})
      </p>
    `;
  });

  report += `
    <p>🌍 Sürdürülebilirlik: ${Math.round(sustainability)}%</p>
    <p>⚠️ Riskli karar sayısı: ${harmfulDecisionCount}</p>
    </div>
  `;

  return report;
}


/* =========================================
   16. BÖLGEYE GÖRE OYUN SONLARI
========================================= */

const gameEndings = {

  desert: {
    success: "Çöl bölgesinde su yönetimini ve iklim uyumunu güçlendirdin. Bölge, kuraklığa karşı daha dayanıklı bir geleceğe ilerliyor.",
    middle: "Bazı kaynakları korudun ancak su ve üretim sorunları tamamen çözülemedi. Bölgenin daha fazla yatırıma ihtiyacı var.",
    failure: "Su kaynakları ve toplumsal refah kritik seviyeye geriledi. Çöl bölgesi iklim krizine karşı hazırlıksız kaldı."
  },

  coast: {
    success: "Kıyı ekosistemlerini korudun ve afet risklerini azalttın. Yerleşimler deniz seviyesindeki değişime daha hazırlıklı.",
    middle: "Bazı kıyı risklerini yönettin ancak altyapı ve ekosistem baskısı sürüyor.",
    failure: "Kıyı yerleşimleri ve doğal yaşam alanları ağır kayıplar yaşadı. Bölgenin yeniden planlanması gerekiyor."
  },

  forest: {
    success: "Orman ekosistemini korudun. Biyoçeşitlilik ve doğal kaynaklar geleceğe taşınabilecek durumda.",
    middle: "Ormanın bir bölümünü korudun ancak yangın ve habitat kaybı riskleri devam ediyor.",
    failure: "Orman ekosistemi ciddi zarar gördü. Doğal yaşam ve toplumsal refah kritik seviyede."
  },

  polar: {
    success: "Kutup ekosistemini korumak için bilimsel ve sürdürülebilir politikalar geliştirdin. Bölge iklim değişimine daha hazırlıklı.",
    middle: "Bazı riskleri azalttın ancak buzullar ve hassas yaşam alanları üzerindeki baskı devam ediyor.",
    failure: "Kutup ekosistemi ağır zarar gördü. Topluluklar ve doğal yaşam büyük risk altında."
  },

  metro: {
    success: "Metropolü daha yaşanabilir ve sürdürülebilir hâle getirdin. Enerji, ulaşım ve kaynak yönetiminde önemli ilerleme sağladın.",
    middle: "Şehirde bazı sorunları çözdün ancak hava kirliliği ve altyapı baskısı devam ediyor.",
    failure: "Şehir kaynaklarını yönetmekte zorlandı. Hava kalitesi, enerji ve toplumsal refah kritik seviyeye geriledi."
  },

  agriculture: {
    success: "Tarım bölgesinde suyu ve toprağı korudun. Gıda üretimi iklim değişikliğine karşı daha dayanıklı hâle geldi.",
    middle: "Üretimin bir bölümünü korudun ancak su ve toprak verimliliği için daha fazla çalışma gerekiyor.",
    failure: "Tarımsal üretim ve gıda güvenliği ağır zarar gördü. Bölgenin sürdürülebilir üretim sistemlerine ihtiyacı var."
  }
};

/* =========================================
   17. OYUNU BİTİR - 2100 FİNALİ
========================================= */

function createFinalResourceVisual() {

  const keys = ["water", "food", "energy", "population"];

  let html = `
    <div class="final-resource-visual">
      <h3>🌍 DÜNYANIN KAYNAK DURUMU - 2100</h3>
      <div class="final-resource-grid">
  `;

  keys.forEach(key => {

    const value = Math.max(0, Math.min(100, Number(resources[key]) || 0));

    let status = "good";
    let statusText = "İyi";

    if (value < 40) {
      status = "critical";
      statusText = "Kritik";
    } else if (value < 70) {
      status = "warning";
      statusText = "Dikkat";
    }

    html += `
      <div class="final-resource-card">
        <div class="final-resource-heading">
          <span>${resourceIcons[key]} ${resourceNames[key]}</span>
          <strong>${Math.round(value)}%</strong>
        </div>

        <div class="final-resource-track">
          <div class="final-resource-fill ${status}"
               style="width: ${value}%"></div>
        </div>

        <small>${statusText}</small>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  return html;
}


function finishGame() {

  document.getElementById("play").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const score = calculateFinalScore();

  let endingType;

  if (score >= 75) {
    endingType = "success";
  } else if (score >= 45) {
    endingType = "middle";
  } else {
    endingType = "failure";
  }

  const titles = {
    success: "SÜRDÜRÜLEBİLİR BİR GELECEK!",
    middle: "GELECEK HÂLÂ BELİRSİZ...",
    failure: "İKLİM KRİZİ KAZANDI."
  };

  document.getElementById("resultTitle").textContent =
    titles[endingType];

  document.getElementById("finalScore").textContent =
    `GELECEK PUANIN: ${score} / 100`;

  const resultScreen = document.getElementById("result");

  let earthState = "earth-critical";
  let earthMessage = "Dünya ciddi bir iklim baskısı altında.";

  if (score >= 75) {
    earthState = "earth-healthy";
    earthMessage = "Dünya daha yeşil ve sürdürülebilir bir geleceğe ilerliyor.";
  } else if (score >= 45) {
    earthState = "earth-balanced";
    earthMessage = "Dünya hâlâ iyileşmeye ihtiyaç duyuyor.";
  }

  let banner = document.getElementById("finalYearBanner");

  if (!banner) {
    banner = document.createElement("div");
    banner.id = "finalYearBanner";
    resultScreen.prepend(banner);
  }

  banner.className = earthState;

  banner.innerHTML = `
    <div class="final-earth"></div>
    <div>🌍 2100: DÜNYANIN GELECEĞİ</div>
    <p>${earthMessage}</p>
  `;

  document.getElementById("resultText").innerHTML = `
    <p>${gameEndings[selectedRegionKey][endingType]}</p>

    <p>
      <strong>Yönetilen bölge:</strong>
      ${regionInfo[selectedRegionKey].name}
    </p>

    <p>
      <strong>Tamamlanan karar:</strong>
      ${currentRound} / 6
    </p>

    ${createFinalResourceVisual()}

    ${createFinalResourceReport()}

    <h3>🌍 UNUTMA</h3>
    <p>
      İklim değişikliği tek bir bölgenin sorunu değildir.
      Sürdürülebilir bir gelecek için bölgelerin ve toplumların
      birlikte hareket etmesi gerekir.
    </p>
  `;
}



/* =========================================
   18. OYUNU İLK AÇILIŞA HAZIRLA
========================================= */

createDifficultySelector();
selectRegion("desert");

console.log("CLIMATE GAMES: 6 bölge ve 36 kriz hazır.");
console.log("Her krizde 5 farklı karar seçeneği bulunuyor.");


/* =========================================
   19. DOĞA - MİNİMAL YARDIMCI KARAKTER
   DUYGUSAL YÜZ İFADELERİ VE RENKLER
========================================= */

(function () {

  let dogaMessages = [];
  let bubbleTimer = null;

  /* =========================================
     1. KARAKTER TASARIMI
  ========================================= */

  function createDogaPanel() {

    if (document.getElementById("dogaWidget")) return;

    const style = document.createElement("style");
    style.id = "dogaStyle";

    style.textContent = `
      #dogaWidget {
        position: fixed;
        right: 24px;
        bottom: 22px;
        z-index: 99999;
        font-family: inherit;
      }

      #dogaAvatarButton {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        border: 2px solid #a5d694;
        background: linear-gradient(145deg,#e1f2d6,#a5cc91);
        cursor: pointer;
        box-shadow: 0 5px 18px rgba(0,0,0,.3);
        transition: all .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        overflow: hidden;
      }

      #dogaAvatarButton:hover {
        transform: translateY(-4px) scale(1.07);
        box-shadow: 0 8px 24px rgba(143,189,131,.5);
      }

      #dogaAvatarButton svg {
        width: 58px;
        height: 58px;
        transition: transform .3s ease;
      }

      #dogaAvatarButton:hover svg {
        transform: scale(1.08);
      }

      #dogaWidget.doga-happy #dogaAvatarButton {
        background: linear-gradient(145deg,#d9f7c8,#80c96c);
        border-color: #65bd58;
        box-shadow: 0 0 20px rgba(90,210,85,.4);
      }

      #dogaWidget.doga-worried #dogaAvatarButton {
        background: linear-gradient(145deg,#ffe2b5,#f4a34f);
        border-color: #e99536;
        box-shadow: 0 0 20px rgba(244,163,79,.4);
      }

      #dogaWidget.doga-thinking #dogaAvatarButton {
        background: linear-gradient(145deg,#e1f2d6,#a5cc91);
        border-color: #a5d694;
      }

      #dogaWidget.doga-surprised #dogaAvatarButton {
        background: linear-gradient(145deg,#fff4b8,#f5d66d);
        border-color: #eac84e;
        box-shadow: 0 0 20px rgba(245,214,109,.4);
      }

      #dogaMiniName {
        text-align: center;
        color: #c7edb8;
        font-size: 10px;
        font-weight: bold;
        margin-top: 5px;
        letter-spacing: 1px;
        text-shadow: 0 2px 5px #000;
      }

      #dogaSpeechBubble {
        display: none;
        position: absolute;
        right: 5px;
        bottom: 94px;
        width: 225px;
        padding: 12px 14px;
        border-radius: 13px;
        background: #f1f6eb;
        color: #203b30;
        font-size: 12px;
        line-height: 1.5;
        box-shadow: 0 5px 20px rgba(0,0,0,.25);
      }

      #dogaSpeechBubble.visible {
        display: block;
        animation: dogaPop .25s ease;
      }

      #dogaSpeechBubble::after {
        content: "";
        position: absolute;
        right: 22px;
        bottom: -9px;
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #f1f6eb transparent transparent;
      }

      @keyframes dogaPop {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      #dogaChatArea {
        display: none;
        position: absolute;
        right: 0;
        bottom: 94px;
        width: 280px;
        padding: 14px;
        border: 1px solid rgba(143,189,131,.6);
        border-radius: 15px;
        background: linear-gradient(145deg,#14271f,#203b30);
        color: #f1f5ed;
        box-shadow: 0 8px 30px rgba(0,0,0,.4);
      }

      #dogaChatArea.open {
        display: block;
        animation: dogaPop .25s ease;
      }

      .doga-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #b7e3a8;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 10px;
      }

      #dogaClose {
        border: none;
        background: transparent;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      #dogaChat {
        max-height: 180px;
        overflow-y: auto;
        margin-bottom: 10px;
      }

      .doga-message {
        padding: 8px;
        border-radius: 9px;
        margin: 6px 0;
        font-size: 12px;
        line-height: 1.5;
      }

      .doga-message.user {
        background: rgba(230,166,76,.16);
        margin-left: 15px;
      }

      .doga-message.character {
        background: rgba(130,190,120,.15);
        margin-right: 15px;
      }

      .doga-input-row {
        display: flex;
        gap: 6px;
      }

      #dogaInput {
        width: 0;
        flex: 1;
        min-width: 0;
        padding: 9px;
        border-radius: 8px;
        border: 1px solid #789b77;
        background: #f5f7f2;
        color: #172a22;
        font-size: 12px;
      }

      #dogaSend {
        border: none;
        border-radius: 8px;
        padding: 9px 10px;
        background: #8fbd83;
        color: #172a22;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
      }

      @media(max-width:500px) {
        #dogaWidget {
          right: 12px;
          bottom: 12px;
        }

        #dogaAvatarButton {
          width: 58px;
          height: 58px;
        }

        #dogaChatArea {
          width: min(280px,calc(100vw - 30px));
        }
      }
    `;

    document.head.appendChild(style);

    const widget = document.createElement("div");
    widget.id = "dogaWidget";

    widget.innerHTML = `
      <div id="dogaSpeechBubble"></div>

      <div id="dogaChatArea">
        <div class="doga-chat-header">
          <span>🌿 DOĞA İLE KONUŞ</span>
          <button id="dogaClose" type="button">×</button>
        </div>

        <div id="dogaChat"></div>

        <div class="doga-input-row">
          <input
            id="dogaInput"
            type="text"
            placeholder="Doğa'ya bir soru sor..."
            maxlength="250"
          >
          <button id="dogaSend" type="button">GÖNDER</button>
        </div>
      </div>

      <div>
        <button id="dogaAvatarButton" type="button" title="Doğa ile konuş">
          <svg viewBox="0 0 64 64">
            <path d="M17 22 Q2 5 22 8 Q29 10 29 20" fill="#5c9b55"/>
            <path d="M43 20 Q48 1 59 12 Q58 23 44 27" fill="#76b95e"/>

            <path id="dogaFace"
              d="M12 33 Q8 13 32 12 Q56 13 52 37 L48 51 Q32 63 16 51Z"
              fill="#f1d2ad"/>

            <path d="M12 32 Q9 12 31 11 Q48 9 53 27 Q42 20 34 24 Q23 17 12 32"
              fill="#397d46"/>

            <g id="dogaEyes">
              <circle cx="24" cy="36" r="2.5" fill="#263c2c"/>
              <circle cx="40" cy="36" r="2.5" fill="#263c2c"/>
            </g>

            <g id="dogaMouth">
              <path d="M26 45 Q32 51 39 44"
                fill="none" stroke="#9b5c48"
                stroke-width="2" stroke-linecap="round"/>
            </g>

            <circle cx="19" cy="43" r="3" fill="#e99b83" opacity=".6"/>
            <circle cx="45" cy="43" r="3" fill="#e99b83" opacity=".6"/>

            <path d="M30 17 Q22 5 31 3 Q40 7 34 18"
              fill="#a4d878"/>
          </svg>
        </button>

        <div id="dogaMiniName">DOĞA</div>
      </div>
    `;

    document.body.appendChild(widget);

    document.getElementById("dogaAvatarButton").addEventListener(
      "click", toggleDogaChat
    );

    document.getElementById("dogaClose").addEventListener(
      "click", toggleDogaChat
    );

    document.getElementById("dogaSend").addEventListener(
      "click", askDoga
    );

    document.getElementById("dogaInput").addEventListener(
      "keydown", function (e) {
        if (e.key === "Enter") askDoga();
      }
    );
  }


  /* =========================================
     2. DUYGUSAL YÜZ İFADELERİ
  ========================================= */

  function dogaChangeFace(type) {

    const widget = document.getElementById("dogaWidget");
    const face = document.getElementById("dogaFace");
    const eyes = document.getElementById("dogaEyes");
    const mouth = document.getElementById("dogaMouth");

    if (!widget || !face || !eyes || !mouth) return;

    widget.classList.remove(
      "doga-happy",
      "doga-worried",
      "doga-thinking",
      "doga-surprised"
    );

    const faces = {

      happy: {
        color: "#b9e5a4",
        eyes: `
          <path d="M20 36 Q24 30 28 36"
            stroke="#263c2c" stroke-width="2.5"
            fill="none" stroke-linecap="round"/>
          <path d="M36 36 Q40 30 44 36"
            stroke="#263c2c" stroke-width="2.5"
            fill="none" stroke-linecap="round"/>
        `,
        mouth: `
          <path d="M25 44 Q32 54 40 44"
            fill="none" stroke="#8a5140"
            stroke-width="2.5" stroke-linecap="round"/>
        `
      },

      worried: {
        color: "#f5b36d",
        eyes: `
          <circle cx="24" cy="36" r="2.5" fill="#263c2c"/>
          <circle cx="40" cy="36" r="2.5" fill="#263c2c"/>
          <path d="M20 29 L28 31 M36 31 L44 29"
            stroke="#754522" stroke-width="2"
            stroke-linecap="round"/>
        `,
        mouth: `
          <path d="M26 49 Q32 42 39 49"
            fill="none" stroke="#8a5140"
            stroke-width="2.5" stroke-linecap="round"/>
        `
      },

      thinking: {
        color: "#f1d2ad",
        eyes: `
          <circle cx="24" cy="36" r="2.5" fill="#263c2c"/>
          <circle cx="40" cy="36" r="2.5" fill="#263c2c"/>
          <path d="M20 29 L28 28 M36 28 L44 29"
            stroke="#397d46" stroke-width="2"
            stroke-linecap="round"/>
        `,
        mouth: `
          <path d="M27 47 Q33 44 39 47"
            fill="none" stroke="#9b5c48"
            stroke-width="2.5" stroke-linecap="round"/>
        `
      },

      surprised: {
        color: "#f5df83",
        eyes: `
          <circle cx="24" cy="35" r="4" fill="#263c2c"/>
          <circle cx="40" cy="35" r="4" fill="#263c2c"/>
        `,
        mouth: `
          <ellipse cx="32" cy="47" rx="4" ry="5" fill="#9b5c48"/>
        `
      }
    };

    const selected = faces[type] || faces.thinking;

    face.setAttribute("fill", selected.color);
    eyes.innerHTML = selected.eyes;
    mouth.innerHTML = selected.mouth;

    widget.classList.add("doga-" + type);
  }


  /* =========================================
     3. SOHBET PENCERESİ
  ========================================= */

  function toggleDogaChat() {

    const chat = document.getElementById("dogaChatArea");
    const bubble = document.getElementById("dogaSpeechBubble");

    if (!chat) return;

    chat.classList.toggle("open");

    if (chat.classList.contains("open")) {
      bubble.classList.remove("visible");
      clearTimeout(bubbleTimer);
      document.getElementById("dogaInput").focus();
    }
  }


  /* =========================================
     4. DOĞA'NIN KONUŞMASI
  ========================================= */

  function dogaSpeak(message) {

    const bubble = document.getElementById("dogaSpeechBubble");

    if (bubble) {
      bubble.textContent = message;

      const chat = document.getElementById("dogaChatArea");

      if (chat && !chat.classList.contains("open")) {
        bubble.classList.add("visible");

        clearTimeout(bubbleTimer);

        bubbleTimer = setTimeout(function () {
          bubble.classList.remove("visible");
        }, 7000);
      }
    }

    if (
      message.includes("Umut verici") ||
      message.includes("güçlendirebilir") ||
      message.includes("uyumlu")
    ) {
      dogaChangeFace("happy");

    } else if (
      message.includes("baskı") ||
      message.includes("ağırlaştırabilir") ||
      message.includes("kaybı")
    ) {
      dogaChangeFace("worried");

    } else if (
      message.includes("beklenmedik") ||
      message.includes("şaşırtıcı")
    ) {
      dogaChangeFace("surprised");

    } else {
      dogaChangeFace("thinking");
    }

    addDogaMessage("Doğa", message, "character");
  }


  function addDogaMessage(name, message, type) {

    const chat = document.getElementById("dogaChat");
    if (!chat) return;

    const item = document.createElement("div");

    item.className = "doga-message " + type;
    item.textContent = name + ": " + message;

    chat.appendChild(item);
    chat.scrollTop = chat.scrollHeight;

    dogaMessages.push({ name, message });

    if (dogaMessages.length > 30) {
      dogaMessages.shift();

      if (chat.firstChild) {
        chat.removeChild(chat.firstChild);
      }
    }
  }


  /* =========================================
     5. KARARLARA TEPKİ
  ========================================= */

  function reactToDecision() {

    if (!decisionHistory || !decisionHistory.length) return;

    const current = decisionHistory[decisionHistory.length - 1];

    const previous = decisionHistory.length > 1
      ? decisionHistory[decisionHistory.length - 2]
      : null;

    let message = "";

    if (current.score >= 15) {

      message = randomItem([
        "Umut verici bir adım attın! Bu kararın bölgenin dayanıklılığını güçlendirebilir.",
        "Harika bir seçim! Doğayla uyumlu bir yaklaşım seçtin.",
        "Bu karar bölgenin geleceği için güçlü bir başlangıç olabilir."
      ]);

    } else if (current.score < 0) {

      message = randomItem([
        "Bu karar bazı kaynaklar üzerinde baskı oluşturabilir. Sonuçlarını dikkatle takip etmeliyiz.",
        "Beklenmedik sonuçlarla karşılaşabiliriz. Gelecek nesiller bu etkileri hissedebilir.",
        "Bu seçim bazı sorunları ağırlaştırabilir. Bir sonraki adımı dikkatle düşünmeliyiz."
      ]);

    } else {

      message = randomItem([
        "Bu karar bazı faydalar sağlayabilir ancak çözülmesi gereken sorunlar hâlâ var.",
        "Her kararın bir sonucu vardır. Diğer kaynakların durumunu da gözlemleyelim.",
        "Dengeli bir yaklaşım izliyorsun. Şimdi sonuçları görelim."
      ]);
    }

    if (previous) {
      message += " Önceki turdaki '" + previous.choice +
        "' kararının etkilerini de birlikte değerlendirelim.";
    }

    dogaSpeak(message);
  }


  /* =========================================
     6. TUR BAŞLANGIÇ MESAJLARI
  ========================================= */

  function dogaRoundIntro() {

    if (currentRound === 0) {

      dogaSpeak(
        "Hoş geldin İklim Mimarı! Ben Doğa. Bu bölgedeki kararlarının etkilerini birlikte takip edeceğiz."
      );

      return;
    }

    if (currentRound === 2) {

      dogaSpeak(
        "İlk iki kararını verdin. Artık sonuçların birbirini nasıl etkilediğini görmeye başlayacağız."
      );

      return;
    }

    if (currentRound === 4) {

      dogaSpeak(
        "Son aşamaya yaklaşıyoruz. Şimdiye kadar aldığın kararlar geleceği şekillendiriyor."
      );

      return;
    }

    dogaSpeak(
      "Yeni bir krizle karşı karşıyayız. Bu kez gelecekte ortaya çıkabilecek sonuçları da düşün."
    );
  }


  /* =========================================
     7. DOĞA'NIN BİLGİ HAVUZU
  ========================================= */

  function getDogaAnswer(question) {

    const q = question.toLocaleLowerCase("tr-TR");

    if (q.includes("su") || q.includes("kurak") || q.includes("yağmur")) {
      return "Su tasarrufu, atık suyun yeniden kullanılması ve yağmur suyu hasadı su kaynaklarını korumaya yardımcı olabilir.";
    }

    if (
      q.includes("enerji") ||
      q.includes("elektrik") ||
      q.includes("güneş") ||
      q.includes("rüzgar") ||
      q.includes("rüzgâr")
    ) {
      return "Güneş ve rüzgâr gibi yenilenebilir kaynaklar fosil yakıt ihtiyacını azaltabilir. Enerji verimliliği de önemlidir.";
    }

    if (
      q.includes("gıda") ||
      q.includes("tarım") ||
      q.includes("çiftçi") ||
      q.includes("toprak")
    ) {
      return "Toprağın korunması, doğru sulama ve iklime dayanıklı ürünler iklim dostu tarımın önemli parçalarıdır.";
    }

    if (
      q.includes("orman") ||
      q.includes("ağaç") ||
      q.includes("yangın")
    ) {
      return "Ormanlar karbon depolar ve canlılara yaşam alanı sağlar. Yangınları önlemek ve ormanları korumak önemlidir.";
    }

    if (
      q.includes("deniz") ||
      q.includes("kıyı") ||
      q.includes("sel")
    ) {
      return "Kıyı bölgeleri deniz seviyesinin yükselmesi, fırtına ve erozyon gibi risklerle karşılaşabilir.";
    }

    if (
      q.includes("karbon") ||
      q.includes("emisyon") ||
      q.includes("sera gaz")
    ) {
      return "Emisyonları azaltmak için fosil yakıtlardan uzaklaşmak, enerji verimliliğini artırmak ve doğal alanları korumak gerekir.";
    }

    if (
      q.includes("biyoçeşitlilik") ||
      q.includes("canlı") ||
      q.includes("hayvan") ||
      q.includes("ekosistem")
    ) {
      return "Yaşam alanlarını korumak ve kirliliği azaltmak biyoçeşitliliği destekler.";
    }

    if (
      q.includes("iklim değişikliği") ||
      q.includes("küresel ısınma") ||
      q.includes("neden")
    ) {
      return "Günümüzde iklim değişikliğinin temel nedeni, insan faaliyetleri sonucunda atmosfere salınan sera gazlarının artmasıdır.";
    }

    if (q.includes("sürdürülebilir")) {
      return "Sürdürülebilirlik, bugünün ihtiyaçlarını karşılarken gelecek nesillerin ihtiyaçlarını karşılama imkânını korumaktır.";
    }

    return "Bu önemli bir soru, İklim Mimarı. Çevresel, ekonomik ve toplumsal etkileri birlikte değerlendirmeliyiz.";
  }


  /* =========================================
     8. KULLANICI SORULARI
  ========================================= */

  function askDoga() {

    const input = document.getElementById("dogaInput");

    if (!input) return;

    const question = input.value.trim();

    if (!question) return;

    addDogaMessage("İklim Mimarı", question, "user");

    const answer = getDogaAnswer(question);

    input.value = "";

    dogaSpeak(answer);
  }


  /* =========================================
     9. OYUN BAŞLANGICI
  ========================================= */

  const originalStartGame = window.startGame;

  window.startGame = function () {

    dogaMessages = [];

    if (typeof originalStartGame === "function") {
      originalStartGame.apply(this, arguments);
    }

    createDogaPanel();
    dogaRoundIntro();
  };


  /* =========================================
     10. YENİ TUR
  ========================================= */

  const originalShowRound = window.showRound;

  window.showRound = function () {

    if (typeof originalShowRound === "function") {
      originalShowRound.apply(this, arguments);
    }

    if (document.getElementById("dogaWidget")) {
      dogaRoundIntro();
    }
  };


  /* =========================================
     11. KARAR TEPKİSİ
  ========================================= */

  const originalMakeDecision = window.makeDecision;

  window.makeDecision = function (index) {

    const previousCount = decisionHistory.length;

    if (typeof originalMakeDecision === "function") {
      originalMakeDecision.apply(this, arguments);
    }

    if (decisionHistory.length > previousCount) {
      reactToDecision();
    }
  };


  /* =========================================
     12. AÇILIŞ EKRANINDA GÖRÜNSÜN
  ========================================= */

  createDogaPanel();

  console.log("Doğa karakteri ve duygu sistemi hazır.");

})();

/* =========================================
   CLIMATE GAMES - SEÇİLEN ŞIKKI GÖSTERME
   Kim Milyoner Olmak İster tarzı
========================================= */

(function () {

  // 1. Seçeneklerin görünümü
  const style = document.createElement("style");

  style.textContent = `
    #choices button {
      background: #202b2b !important;
      color: #ffffff !important;
      border: 2px solid #52615d !important;
      transition: all 0.25s ease !important;
    }

    #choices button.selected-answer {
      background: #168b50 !important;
      border: 2px solid #42e88b !important;
      color: white !important;
      box-shadow: 0 0 15px rgba(66, 232, 139, 0.45) !important;
      transform: scale(1.02);
      opacity: 1 !important;
    }

    #choices button.other-answer {
      opacity: 0.35 !important;
      filter: grayscale(70%);
    }

    #choices button.selected-answer:disabled {
      cursor: default !important;
    }
  `;

  document.head.appendChild(style);


  // 2. Mevcut karar fonksiyonunu koru
  const previousMakeDecision = window.makeDecision;

  if (typeof previousMakeDecision === "function") {

    window.makeDecision = function (index) {

      const buttons = document.querySelectorAll("#choices button");

      // Önce bütün seçeneklerin görünümünü sıfırla
      buttons.forEach((button, i) => {
        button.classList.remove("selected-answer", "other-answer");

        if (i === index) {
          button.classList.add("selected-answer");
        } else {
          button.classList.add("other-answer");
        }
      });

      // Orijinal karar sistemini çalıştır
      return previousMakeDecision.apply(this, arguments);
    };

  }


  // 3. Yeni soruya geçildiğinde renkleri sıfırla
  const previousShowRound = window.showRound;

  if (typeof previousShowRound === "function") {

    window.showRound = function () {

      const result = previousShowRound.apply(this, arguments);

      setTimeout(() => {
        document.querySelectorAll("#choices button").forEach(button => {
          button.classList.remove("selected-answer", "other-answer");
        });
      }, 0);

      return result;
    };

  }

  console.log("Seçilen şık gösterme sistemi hazır!");

})();

/* =========================================
   CLIMATE GAMES - KARAR GEÇMİŞİ RAPORU
========================================= */

(function () {

  const oldFinishGame = window.finishGame;

  if (typeof oldFinishGame !== "function") {
    console.error("finishGame fonksiyonu bulunamadı.");
    return;
  }

  window.finishGame = function () {

    // Önce mevcut oyun bitiş sistemi çalışsın
    const result = oldFinishGame.apply(this, arguments);

    // Önceki raporu kaldır
    const oldReport = document.getElementById("decisionReport");
    if (oldReport) oldReport.remove();

    const history = window.decisionHistory || [];

    if (!history.length) return result;

    // Kararları sınıflandır
    const positive = history.filter(item => Number(item.score) >= 15);
    const negative = history.filter(item => Number(item.score) < 0);
    const balanced = history.filter(item =>
      Number(item.score) >= 0 && Number(item.score) < 15
    );

    // Rapor alanı
    const report = document.createElement("section");
    report.id = "decisionReport";

    report.style.cssText = `
      margin-top: 25px;
      padding: 22px;
      background: #172222;
      border: 1px solid #52615d;
      border-radius: 14px;
      color: white;
      text-align: left;
    `;

    const heading = document.createElement("h2");
    heading.textContent = "📋 İKLİM MİMARI KARAR RAPORU";
    heading.style.cssText = `
      color: #e6a64c;
      margin-bottom: 18px;
      text-align: center;
    `;
    report.appendChild(heading);

    const summary = document.createElement("div");
    summary.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 10px;
      margin-bottom: 24px;
    `;

    const stats = [
      { label: "Olumlu", value: positive.length, color: "#42d68b" },
      { label: "Dengeli", value: balanced.length, color: "#e6a64c" },
      { label: "Zararlı", value: negative.length, color: "#ff7777" }
    ];

    stats.forEach(stat => {
      const card = document.createElement("div");
      card.style.cssText = `
        background: #253333;
        padding: 15px 8px;
        border-radius: 10px;
        text-align: center;
      `;

      const number = document.createElement("div");
      number.textContent = stat.value;
      number.style.cssText = `
        font-size: 28px;
        font-weight: bold;
        color: ${stat.color};
      `;

      const label = document.createElement("div");
      label.textContent = stat.label;

      card.append(number, label);
      summary.appendChild(card);
    });

    report.appendChild(summary);

    const subheading = document.createElement("h3");
    subheading.textContent = "Verdiğin Kararlar";
    subheading.style.marginBottom = "12px";
    report.appendChild(subheading);

    // Her kararı ayrı ayrı göster
    history.forEach((item, index) => {

      const row = document.createElement("div");

      row.style.cssText = `
        background: #253333;
        padding: 14px;
        border-radius: 9px;
        margin-bottom: 10px;
        border-left: 4px solid ${
          Number(item.score) >= 15 ? "#42d68b" :
          Number(item.score) < 0 ? "#ff7777" : "#e6a64c"
        };
      `;

      const eventName = document.createElement("strong");
      eventName.textContent =
        (typeof item.event === "string" ? item.event :
        item.event?.title || "İklim olayı");

      const choiceName = document.createElement("p");
      choiceName.textContent =
        typeof item.choice === "string" ? item.choice :
        item.choice?.text || "Karar bilgisi";

      choiceName.style.cssText = `
        margin: 8px 0;
        color: #dce8e3;
      `;

      const score = document.createElement("span");
      score.textContent =
        "Karar puanı: " + (Number(item.score) > 0 ? "+" : "") +
        Number(item.score || 0);

      score.style.color =
        Number(item.score) >= 15 ? "#42d68b" :
        Number(item.score) < 0 ? "#ff7777" : "#e6a64c";

      const number = document.createElement("small");
      number.textContent = "KARAR " + (index + 1);
      number.style.cssText = `
        display: block;
        color: #aabbb4;
        margin-bottom: 6px;
      `;

      row.append(number, eventName, choiceName, score);
      report.appendChild(row);
    });

    const conclusion = document.createElement("p");
    conclusion.textContent =
      "İklim Mimarı olarak verdiğin her karar, geleceğin kaynaklarını ve toplumun yaşam koşullarını etkiledi.";
    conclusion.style.cssText = `
      margin-top: 20px;
      padding: 15px;
      background: #253333;
      border-radius: 9px;
      line-height: 1.6;
      text-align: center;
    `;

    report.appendChild(conclusion);

    const resultScreen = document.getElementById("result");

    if (resultScreen) {
      resultScreen.appendChild(report);
    }

    return result;
  };

  console.log("Karar geçmişi raporu hazır!");

})();
/* =========================================
   CLIMATE GAMES - KARAR RAPORU
========================================= */

(function () {

  const reportStyle = document.createElement("style");

  reportStyle.textContent = `
    #decisionReport {
      margin-top: 25px;
      padding: 22px;
      background: #192323;
      border: 1px solid #52645b;
      border-radius: 14px;
      color: white;
    }

    #decisionReport h2 {
      color: #e6a64c;
      margin-bottom: 18px;
    }

    .report-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 22px;
    }

    .report-card {
      background: #263532;
      padding: 14px 8px;
      border-radius: 10px;
      text-align: center;
    }

    .report-card strong {
      display: block;
      font-size: 25px;
      margin-bottom: 5px;
    }

    .report-card span {
      font-size: 12px;
      color: #c5d0c9;
    }

    .report-decision {
      background: #222f2c;
      border-left: 4px solid #e6a64c;
      padding: 13px;
      margin: 10px 0;
      border-radius: 7px;
    }

    .report-decision h3 {
      font-size: 15px;
      margin: 0 0 8px;
      color: #e6a64c;
    }

    .report-decision p {
      margin: 5px 0;
      font-size: 13px;
      line-height: 1.5;
    }

    .report-positive {
      border-left-color: #45bd75;
    }

    .report-negative {
      border-left-color: #e45b5b;
    }

    .report-balanced {
      border-left-color: #e6a64c;
    }

    .report-conclusion {
      margin-top: 20px;
      padding: 16px;
      background: #303e36;
      border-radius: 10px;
      line-height: 1.6;
    }

    @media(max-width: 500px) {
      .report-summary {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(reportStyle);

  const oldFinishGame = window.finishGame;

  if (typeof oldFinishGame !== "function") {
    console.error("Karar raporu: finishGame fonksiyonu bulunamadı.");
    return;
  }

  window.finishGame = function () {

    oldFinishGame.apply(this, arguments);

    const resultScreen = document.getElementById("result");

    if (!resultScreen) return;

    const oldReport = document.getElementById("decisionReport");

    if (oldReport) oldReport.remove();

    const history =
      typeof decisionHistory !== "undefined"
        ? decisionHistory
        : window.decisionHistory || [];

    let positive = 0;
    let negative = 0;
    let balanced = 0;

    history.forEach(item => {
      if (item.score >= 15) {
        positive++;
      } else if (item.score < 0) {
        negative++;
      } else {
        balanced++;
      }
    });

    const report = document.createElement("section");
    report.id = "decisionReport";

    let decisionHTML = "";

    history.forEach((item, index) => {

      let type = "Dengeli";
      let className = "report-balanced";

      if (item.score >= 15) {
        type = "Olumlu";
        className = "report-positive";
      } else if (item.score < 0) {
        type = "Olumsuz";
        className = "report-negative";
      }

      decisionHTML += `
        <div class="report-decision ${className}">
          <h3>${index + 1}. Karar: ${item.event || "İklim Krizi"}</h3>
          <p><strong>Seçimin:</strong> ${item.choice || "Belirtilmedi"}</p>
          <p><strong>Karar türü:</strong> ${type}</p>
          <p><strong>Puan etkisi:</strong> ${item.score}</p>
        </div>
      `;
    });

    let conclusion = "";

    if (negative > positive) {
      conclusion = "Kararların bazı kaynakları ve ekosistemi olumsuz etkiledi. Gelecekte daha dengeli ve uzun vadeli politikalar geliştirmelisin.";
    } else if (positive > negative) {
      conclusion = "Kararlarının çoğu olumlu sonuçlar doğurdu. Kaynakları korumaya ve sürdürülebilir bir gelecek oluşturmaya önemli katkı sağladın.";
    } else {
      conclusion = "Kararlarında olumlu ve olumsuz sonuçlar bir arada görüldü. Daha sürdürülebilir bir gelecek için kararlarının uzun vadeli etkilerini değerlendirmelisin.";
    }

    report.innerHTML = `
      <h2>📊 İKLİM KARAR RAPORUN</h2>

      <div class="report-summary">

        <div class="report-card">
          <strong style="color:#45bd75">${positive}</strong>
          <span>Olumlu Karar</span>
        </div>

        <div class="report-card">
          <strong style="color:#e6a64c">${balanced}</strong>
          <span>Dengeli Karar</span>
        </div>

        <div class="report-card">
          <strong style="color:#e45b5b">${negative}</strong>
          <span>Olumsuz Karar</span>
        </div>

      </div>

      <h3>Verdiğin Kararlar</h3>

      ${decisionHTML || "<p>Henüz karar kaydı bulunamadı.</p>"}

      <div class="report-conclusion">
        <strong>🌍 GELECEĞİN İÇİN DEĞERLENDİRME</strong>
        <p>${conclusion}</p>
      </div>
    `;

    resultScreen.appendChild(report);
  };

  console.log("Karar raporu sistemi hazır!");

})();

/* =========================================
   CLIMATE GAMES - 2085-2100 YIL SİSTEMİ
========================================= */

(function () {

  let currentClimateYear = 2085;

  /* YIL GÖSTERGESİNİN TASARIMI */

  const yearStyle = document.createElement("style");

  yearStyle.textContent = `
    #climateYearPanel {
      background: linear-gradient(135deg, #172c29, #29483b);
      border: 1px solid #71977c;
      border-radius: 14px;
      padding: 17px;
      margin: 0 0 20px;
      color: white;
      text-align: center;
    }

    .climate-year-title {
      color: #b7e3a8;
      font-size: 12px;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .climate-year-number {
      font-size: 34px;
      font-weight: bold;
      color: #e6c77b;
      margin-bottom: 13px;
    }

    .climate-year-timeline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
    }

    .climate-year-step {
      flex: 1;
      padding: 8px 3px;
      border-radius: 8px;
      background: #263a33;
      color: #aabbb4;
      font-size: 12px;
      border: 1px solid #52645b;
    }

    .climate-year-step.active {
      background: #39764f;
      border-color: #8fbd83;
      color: white;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(143,189,131,0.3);
    }

    .climate-year-step.completed {
      background: #314f3b;
      color: #b7e3a8;
      border-color: #71977c;
    }

    .year-transition {
      background: linear-gradient(135deg, #1b3028, #304d3b);
      border: 1px solid #8fbd83;
      border-radius: 14px;
      padding: 22px;
      text-align: center;
      color: white;
      margin-top: 15px;
    }

    .year-transition h2 {
      color: #e6c77b;
      font-size: 27px;
      margin-bottom: 12px;
    }

    .year-transition p {
      line-height: 1.7;
      margin-bottom: 17px;
    }

    .year-transition button {
      background: #8fbd83;
      color: #172a22;
      border: none;
      padding: 12px 22px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }

    .final-year-banner {
      background: #203b30;
      border: 1px solid #8fbd83;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      margin: 15px 0;
      color: #e6c77b;
      font-weight: bold;
      font-size: 20px;
    }

    @media(max-width: 500px) {
      .climate-year-step {
        font-size: 10px;
      }

      .climate-year-number {
        font-size: 29px;
      }
    }
  `;

  document.head.appendChild(yearStyle);


  /* YIL PANELİNİ OLUŞTUR */

  function createClimateYearPanel() {

    const play = document.getElementById("play");

    if (!play) return;

    let panel = document.getElementById("climateYearPanel");

    if (!panel) {
      panel = document.createElement("section");
      panel.id = "climateYearPanel";
      play.insertBefore(panel, play.firstChild);
    }

    updateClimateYearPanel();
  }


  /* YIL GÖSTERGESİNİ GÜNCELLE */

  function updateClimateYearPanel() {

    const panel = document.getElementById("climateYearPanel");

    if (!panel) return;

    const years = [2085, 2090, 2095, 2100];

    panel.innerHTML = `
      <div class="climate-year-title">
        GELECEĞİN ZAMAN ÇİZELGESİ
      </div>

      <div class="climate-year-number">
        ${currentClimateYear}
      </div>

      <div class="climate-year-timeline">
        ${years.map(year => `
          <div class="climate-year-step ${
            year === currentClimateYear ? "active" :
            year < currentClimateYear ? "completed" : ""
          }">
            ${year}
          </div>
        `).join("")}
      </div>
    `;
  }


  /* YIL DEĞİŞİM MESAJLARI */

  function getYearMessage(year) {

    if (year === 2090) {
      return `
        İlk iki kararın üzerinden beş yıl geçti.
        Başlattığın politikaların ilk etkileri görülmeye başlıyor.
        Bölgenin kaynakları ve toplumun yaşam koşulları
        aldığın kararlarla şekilleniyor.
      `;
    }

    if (year === 2095) {
      return `
        İklim krizi daha karmaşık bir döneme girdi.
        Önceki kararlarının uzun vadeli sonuçları artık
        daha belirgin. Son aşamaya geçmeden önce
        bölgenin ihtiyaçlarını yeniden değerlendir.
      `;
    }

    return "";
  }


  /* MEVCUT OYUN BAŞLATMA SİSTEMİNİ KORU */

  const previousClimateStartGame = window.startGame;

  if (typeof previousClimateStartGame === "function") {

    window.startGame = function () {

      currentClimateYear = 2085;

      previousClimateStartGame.apply(this, arguments);

      createClimateYearPanel();
    };

  }


  /* TUR VE YIL GEÇİŞ SİSTEMİ */

  window.nextRound = function () {

    currentRound++;

    // Altı karar tamamlandı: 2100 yılına geç
    if (currentRound >= gameEvents.length) {

      currentClimateYear = 2100;

      updateClimateYearPanel();

      finishGame();

      const result = document.getElementById("result");

      if (result && !document.getElementById("finalYearBanner")) {

        const banner = document.createElement("div");

        banner.id = "finalYearBanner";
        banner.className = "final-year-banner";
        banner.textContent = "🌍 SONUÇ: YIL 2100";

        const resultTitle = document.getElementById("resultTitle");

        if (resultTitle) {
          resultTitle.insertAdjacentElement("afterend", banner);
        } else {
          result.prepend(banner);
        }
      }

      return;
    }


    // Her iki kararda bir yeni dönem
    const newLevel = Math.floor(currentRound / 2) + 1;

    if (newLevel !== currentLevel) {

      currentLevel = newLevel;

      currentClimateYear = currentLevel === 2 ? 2090 : 2095;

      updateClimateYearPanel();

      const feedback = document.getElementById("feedback");

      feedback.innerHTML = `
        <div class="year-transition">

          <div style="font-size:35px">🌍</div>

          <h2>YIL ${currentClimateYear}</h2>

          <h3>YENİ DÖNEM BAŞLIYOR!</h3>

          <p>
            ${getYearMessage(currentClimateYear)}
          </p>

          <p>
            <strong>SEVİYE ${currentLevel}</strong>
            <br>
            Geleceği şekillendirmeye devam et.
          </p>

          <button onclick="showRound()">
            YENİ DÖNEME GEÇ →
          </button>

        </div>
      `;

      return;
    }

    showRound();
  };


  console.log("2085-2100 zaman çizelgesi hazır!");

})();

/* =========================================
   CLIMATE GAMES - 2085 KARARLARININ
   2090 YILINA GECİKMELİ ETKİSİ
========================================= */

(function () {

  let legacyDecisions = [];
  let legacyApplied = false;

  const resourceKeys = [
    "water",
    "food",
    "energy",
    "population"
  ];

  const resourceLabels = {
    water: "Su",
    food: "Gıda",
    energy: "Enerji",
    population: "Toplumsal refah"
  };


  /* OYUN YENİDEN BAŞLADIĞINDA GEÇMİŞİ SIFIRLA */

  const previousStartGame = window.startGame;

  if (typeof previousStartGame === "function") {

    window.startGame = function () {

      legacyDecisions = [];
      legacyApplied = false;

      return previousStartGame.apply(this, arguments);
    };
  }

/* VERİLEN KARARIN ETKİLERİNİ KAYDET */

const previousMakeDecision = window.makeDecision;

if (typeof previousMakeDecision === "function") {

  window.makeDecision = function (index) {

    const decisionRound = currentRound;
    const currentEvent = gameEvents[decisionRound];

    const selectedChoice = currentEvent &&
      currentEvent.choices[index];

    const previousCount = decisionHistory.length;

    const result = previousMakeDecision.apply(this, arguments);

    if (
      decisionRound >= 0 &&
      decisionRound < 2 &&
      selectedChoice &&
      decisionHistory.length > previousCount
    ) {

      legacyDecisions.push({
        event: currentEvent.title,
        choice: selectedChoice.text,
        effect: [...selectedChoice.effect]
      });

    }

    return result;
  };
}
  /* 2085 KARARLARININ 2090 ETKİSİNİ UYGULA */

  function applyLegacyEffects() {

    if (legacyApplied || legacyDecisions.length === 0) {
      return;
    }

    const totalEffects = [0, 0, 0, 0];

    legacyDecisions.forEach(decision => {

      decision.effect.forEach((value, index) => {

        totalEffects[index] += Number(value) || 0;

      });

    });

    const changes = [];

    resourceKeys.forEach((key, index) => {

      // İlk iki kararın etkisinin %35'i geleceğe taşınır.
      const delayedEffect = Math.round(
        totalEffects[index] * 0.35
      );

      if (delayedEffect === 0) return;

      const oldValue = resources[key];

      resources[key] = Math.max(
        0,
        Math.min(100, oldValue + delayedEffect)
      );

      const actualChange = resources[key] - oldValue;

      if (actualChange !== 0) {

        changes.push({
          name: resourceLabels[key],
          change: actualChange
        });
      }

    });

    // Gelecekteki kaynak durumunu geçmişe kaydet.
    resourceKeys.forEach(key => {
      resourceHistory[key].push(resources[key]);
    });

    legacyApplied = true;

    updateResources();

    const feedback = document.getElementById("feedback");

    if (feedback) {

      const transition = feedback.querySelector(".year-transition");

      if (transition) {

        const impactBox = document.createElement("div");

        impactBox.style.cssText = `
          margin-top: 18px;
          padding: 14px;
          background: rgba(0,0,0,0.22);
          border-radius: 10px;
          text-align: left;
          line-height: 1.7;
        `;

        let impactHTML = `
          <strong style="color:#e6c77b">
            ⏳ GEÇMİŞ KARARLARININ ETKİSİ
          </strong>
          <p>2085 yılında verdiğin kararların sonuçları beş yıl sonra ortaya çıktı:</p>
        `;

        if (changes.length > 0) {

          changes.forEach(change => {

            const positive = change.change > 0;

            impactHTML += `
              <div style="color:${positive ? "#8fdb9c" : "#ff9999"}">
                ${positive ? "▲" : "▼"}
                ${change.name}:
                ${positive ? "+" : ""}${change.change}
              </div>
            `;

          });

        } else {

          impactHTML += `
            <p>Önceki kararlarının kaynaklar üzerinde belirgin bir gecikmeli etkisi oluşmadı.</p>
          `;
        }

        impactBox.innerHTML = impactHTML;

        transition.appendChild(impactBox);
      }
    }

    console.log(
      "2090 gecikmeli etkiler uygulandı:",
      changes
    );
  }


  /* 2090 YILINA GEÇİŞİ YAKALA */

  const previousNextRound = window.nextRound;

  if (typeof previousNextRound === "function") {

    window.nextRound = function () {

      const result = previousNextRound.apply(this, arguments);

      if (currentRound === 2 && currentLevel === 2) {
        applyLegacyEffects();
      }

      return result;
    };
  }

  console.log("2085 kararlarının 2090 etkileri hazır!");

})();

/* =========================================
   CLIMATE GAMES - 2090 KARARLARININ
   2095 YILINA GECİKMELİ ETKİSİ
========================================= */

(function () {

  let secondPeriodDecisions = [];
  let secondPeriodApplied = false;

  const resourceKeys = [
    "water",
    "food",
    "energy",
    "population"
  ];

  const resourceLabels = {
    water: "Su",
    food: "Gıda",
    energy: "Enerji",
    population: "Toplumsal refah"
  };


  /* YENİ OYUNDA SİSTEMİ SIFIRLA */

  const previousStartGame = window.startGame;

  if (typeof previousStartGame === "function") {

    window.startGame = function () {

      secondPeriodDecisions = [];
      secondPeriodApplied = false;

      return previousStartGame.apply(this, arguments);
    };
  }


  /* 2090 DÖNEMİNDEKİ KARARLARI KAYDET */

  const previousMakeDecision = window.makeDecision;

  if (typeof previousMakeDecision === "function") {

    window.makeDecision = function (index) {

      const decisionRound = currentRound;
      const currentEvent = gameEvents[decisionRound];

      const selectedChoice = currentEvent &&
        currentEvent.choices[index];

      const previousCount = decisionHistory.length;

      const result = previousMakeDecision.apply(this, arguments);

      if (
        decisionHistory.length > previousCount &&
        decisionRound >= 2 &&
        decisionRound < 4 &&
        selectedChoice
      ) {

        secondPeriodDecisions.push({
          event: currentEvent.title,
          choice: selectedChoice.text,
          effect: [...selectedChoice.effect]
        });

      }

      return result;
    };
  }


  /* 2095 YILINDA ETKİLERİ UYGULA */

  function applySecondPeriodEffects() {

    if (
      secondPeriodApplied ||
      secondPeriodDecisions.length === 0
    ) {
      return;
    }

    const totalEffects = [0, 0, 0, 0];

    secondPeriodDecisions.forEach(decision => {

      decision.effect.forEach((value, index) => {
        totalEffects[index] += Number(value) || 0;
      });

    });

    const changes = [];

    resourceKeys.forEach((key, index) => {

      // 2090 kararlarının %35'i 2095 yılına taşınır.
      const delayedEffect = Math.round(
        totalEffects[index] * 0.35
      );

      if (delayedEffect === 0) return;

      const oldValue = resources[key];

      resources[key] = Math.max(
        0,
        Math.min(100, oldValue + delayedEffect)
      );

      const actualChange = resources[key] - oldValue;

      if (actualChange !== 0) {
        changes.push({
          name: resourceLabels[key],
          change: actualChange
        });
      }

    });

    resourceKeys.forEach(key => {
      resourceHistory[key].push(resources[key]);
    });

    secondPeriodApplied = true;

    updateResources();

    const feedback = document.getElementById("feedback");

    if (feedback) {

      const transition = feedback.querySelector(".year-transition");

      if (transition) {

        const impactBox = document.createElement("div");

        impactBox.style.cssText = `
          margin-top: 18px;
          padding: 14px;
          background: rgba(0,0,0,0.22);
          border-radius: 10px;
          text-align: left;
          line-height: 1.7;
        `;

        let impactHTML = `
          <strong style="color:#e6c77b">
            ⏳ 2090 KARARLARININ 2095 ETKİSİ
          </strong>
          <p>Beş yıl önce aldığın kararların sonuçları ortaya çıktı:</p>
        `;

        if (changes.length > 0) {

          changes.forEach(change => {

            const positive = change.change > 0;

            impactHTML += `
              <div style="color:${positive ? "#8fdb9c" : "#ff9999"}">
                ${positive ? "▲" : "▼"}
                ${change.name}:
                ${positive ? "+" : ""}${change.change}
              </div>
            `;

          });

        } else {

          impactHTML += `
            <p>Önceki kararlarının kaynaklar üzerinde belirgin bir gecikmeli etkisi oluşmadı.</p>
          `;
        }

        impactBox.innerHTML = impactHTML;
        transition.appendChild(impactBox);
      }
    }

    console.log("2095 gecikmeli etkiler uygulandı:", changes);
  }


  /* 2095 YILINA GEÇİŞİ YAKALA */

  const previousNextRound = window.nextRound;

  if (typeof previousNextRound === "function") {

    window.nextRound = function () {

      const result = previousNextRound.apply(this, arguments);

      if (currentRound === 4 && currentLevel === 3) {
        applySecondPeriodEffects();
      }

      return result;
    };
  }

  console.log("2090 kararlarının 2095 etkileri hazır!");

})();

/* =========================================
   CLIMATE GAMES - 2095 KARARLARININ
   2100 ETKİSİ VE YILLIK KAYNAK RAPORU
========================================= */

(function () {

  let finalPeriodDecisions = [];
  let finalEffectsApplied = false;
  let yearSnapshots = [];

  const resourceKeys = [
    "water",
    "food",
    "energy",
    "population"
  ];

  const resourceLabels = {
    water: "Su",
    food: "Gıda",
    energy: "Enerji",
    population: "Toplumsal refah"
  };


  /* YILLIK KAYNAK DURUMUNU KAYDET */

  function captureYear(year) {

    const existing = yearSnapshots.find(
      snapshot => snapshot.year === year
    );

    const values = {};

    resourceKeys.forEach(key => {
      values[key] = Math.round(resources[key]);
    });

    if (existing) {
      existing.values = values;
    } else {
      yearSnapshots.push({
        year: year,
        values: values
      });
    }
  }


  /* YENİ OYUNDA SİSTEMİ SIFIRLA */

  const previousStartGame = window.startGame;

  if (typeof previousStartGame === "function") {

    window.startGame = function () {

      finalPeriodDecisions = [];
      finalEffectsApplied = false;
      yearSnapshots = [];

      const result = previousStartGame.apply(this, arguments);

      captureYear(2085);

      return result;
    };
  }


  /* 2095 DÖNEMİNDEKİ KARARLARI KAYDET */

  const previousMakeDecision = window.makeDecision;

  if (typeof previousMakeDecision === "function") {

    window.makeDecision = function (index) {

      const decisionRound = currentRound;
      const currentEvent = gameEvents[decisionRound];

      const selectedChoice = currentEvent &&
        currentEvent.choices[index];

      const previousCount = decisionHistory.length;

      const result = previousMakeDecision.apply(this, arguments);

      if (
        decisionHistory.length > previousCount &&
        decisionRound >= 4 &&
        decisionRound < 6 &&
        selectedChoice
      ) {

        finalPeriodDecisions.push({
          event: currentEvent.title,
          choice: selectedChoice.text,
          effect: [...selectedChoice.effect]
        });

      }

      return result;
    };
  }


  /* 2100 YILINDA SON GECİKMELİ ETKİLERİ UYGULA */

  function applyFinalEffects() {

    if (
      finalEffectsApplied ||
      finalPeriodDecisions.length === 0
    ) {
      return;
    }

    const totalEffects = [0, 0, 0, 0];

    finalPeriodDecisions.forEach(decision => {

      decision.effect.forEach((value, index) => {
        totalEffects[index] += Number(value) || 0;
      });

    });

    const changes = [];

    resourceKeys.forEach((key, index) => {

      // 2095 kararlarının %35'i 2100 yılına taşınır.
      const delayedEffect = Math.round(
        totalEffects[index] * 0.35
      );

      if (delayedEffect === 0) return;

      const oldValue = resources[key];

      resources[key] = Math.max(
        0,
        Math.min(100, oldValue + delayedEffect)
      );

      const actualChange = resources[key] - oldValue;

      if (actualChange !== 0) {
        changes.push({
          name: resourceLabels[key],
          change: actualChange
        });
      }

    });

    resourceKeys.forEach(key => {
      resourceHistory[key].push(resources[key]);
    });

    finalEffectsApplied = true;

    updateResources();

    console.log("2100 son gecikmeli etkiler:", changes);
  }


  /* 2090 VE 2095 YIL SONUÇLARINI KAYDET */

  const previousNextRound = window.nextRound;

  if (typeof previousNextRound === "function") {

    window.nextRound = function () {

      const result = previousNextRound.apply(this, arguments);

      if (currentRound === 2 && currentLevel === 2) {
        captureYear(2090);
      }

      if (currentRound === 4 && currentLevel === 3) {
        captureYear(2095);
      }

      return result;
    };
  }


  /* YILLIK RAPORU OLUŞTUR */

  function createYearlyReport() {

    const oldReport = document.getElementById("yearlyReport");

    if (oldReport) oldReport.remove();

    const resultScreen = document.getElementById("result");

    if (!resultScreen) return;

    const report = document.createElement("section");

    report.id = "yearlyReport";

    report.style.cssText = `
      margin-top: 25px;
      padding: 20px;
      background: #192923;
      border: 1px solid #71977c;
      border-radius: 14px;
      color: white;
      overflow-x: auto;
    `;

    const heading = document.createElement("h2");

    heading.textContent = "📈 15 YILLIK GELECEK RAPORU";

    heading.style.cssText = `
      color: #e6c77b;
      text-align: center;
      margin-bottom: 10px;
    `;

    report.appendChild(heading);

    const description = document.createElement("p");

    description.textContent =
      "2085 yılında başlayan yolculuğunda kaynaklarının nasıl değiştiğini incele.";

    description.style.cssText = `
      text-align: center;
      color: #c5d0c9;
      margin-bottom: 18px;
      line-height: 1.5;
    `;

    report.appendChild(description);

    const table = document.createElement("table");

    table.style.cssText = `
      width: 100%;
      min-width: 420px;
      border-collapse: collapse;
      text-align: center;
      font-size: 13px;
    `;

    const years = [2085, 2090, 2095, 2100];

    const header = document.createElement("tr");

    ["Kaynak", ...years].forEach(label => {

      const cell = document.createElement("th");

      cell.textContent = label;

      cell.style.cssText = `
        padding: 11px 7px;
        background: #30483b;
        color: #e6c77b;
        border: 1px solid #52645b;
      `;

      header.appendChild(cell);
    });

    table.appendChild(header);

    resourceKeys.forEach(key => {

      const row = document.createElement("tr");

      const nameCell = document.createElement("td");

      nameCell.textContent = resourceLabels[key];

      nameCell.style.cssText = `
        padding: 12px 7px;
        text-align: left;
        border: 1px solid #52645b;
        font-weight: bold;
      `;

      row.appendChild(nameCell);

      years.forEach(year => {

        const cell = document.createElement("td");

        const snapshot = yearSnapshots.find(
          item => item.year === year
        );

        if (snapshot) {

          const value = snapshot.values[key];

          cell.textContent = value + "%";

          cell.style.color =
            value >= 60 ? "#8fdb9c" :
            value >= 30 ? "#e6c77b" : "#ff9999";

        } else {

          cell.textContent = "—";
        }

        cell.style.cssText += `
          padding: 12px 7px;
          border: 1px solid #52645b;
          font-weight: bold;
        `;

        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    report.appendChild(table);

    const note = document.createElement("p");

    note.textContent =
      "Not: Yıl değerleri, ilgili dönemin kararları ve gecikmeli etkileri uygulandıktan sonraki kaynak durumunu gösterir.";

    note.style.cssText = `
      color: #aabbb4;
      font-size: 11px;
      line-height: 1.5;
      margin-top: 14px;
    `;

    report.appendChild(note);

    resultScreen.appendChild(report);
  }


  /* SONUÇ EKRANINDAN ÖNCE 2100 ETKİLERİNİ UYGULA */

  const previousFinishGame = window.finishGame;

  if (typeof previousFinishGame === "function") {

    window.finishGame = function () {

      applyFinalEffects();

      captureYear(2100);

      const result = previousFinishGame.apply(this, arguments);

      createYearlyReport();

      return result;
    };
  }

  console.log("2100 etkileri ve 15 yıllık kaynak raporu hazır!");

})();

/* =========================================
   CLIMATE GAMES
   BEKLENMEDİK İKLİM FELAKETLERİ
========================================= */

(function () {

  // Bölgelere özel beklenmedik felaketler
  const surpriseDisasters = {

    desert: [
      {
        title: "KUM FIRTINASI",
        description: "Beklenmedik derecede şiddetli bir kum fırtınası şehri etkisi altına aldı."
      },
      {
        title: "AŞIRI SICAKLIK DALGASI",
        description: "Sıcaklıklar aniden yükseldi. Su tüketimi ve enerji ihtiyacı arttı."
      },
      {
        title: "YERALTI SUYU KRİZİ",
        description: "Yeraltı su kaynaklarında beklenmedik bir düşüş yaşandı."
      }
    ],

    coast: [
      {
        title: "DEV DALGALAR",
        description: "Ani bir fırtına kıyı yerleşimlerini vurdu. Kıyı altyapısı zarar gördü."
      },
      {
        title: "KIYI TAŞKINLARI",
        description: "Deniz seviyesi ve şiddetli yağış birleşerek kıyı bölgelerini etkiledi."
      },
      {
        title: "DENİZ KİRLİLİĞİ",
        description: "Beklenmedik bir kirlilik olayı balıkçılığı ve temiz su kaynaklarını tehdit ediyor."
      }
    ],

    forest: [
      {
        title: "YENİ ORMAN YANGINI",
        description: "Kontrol altına alınan bölgede yeniden büyük bir yangın başladı."
      },
      {
        title: "ŞİDDETLİ FIRTINA",
        description: "Fırtına çok sayıda ağacı devirdi ve ulaşım ağını bozdu."
      },
      {
        title: "ZARARLI BÖCEK İSTİLASI",
        description: "Ağaçlara zarar veren böcekler orman ekosistemini tehdit ediyor."
      }
    ],

    polar: [
      {
        title: "BUZUL ÇÖKÜŞÜ",
        description: "Büyük bir buz kütlesi parçalandı. Deniz seviyesi üzerindeki baskı arttı."
      },
      {
        title: "AŞIRI SOĞUK DALGASI",
        description: "Beklenmedik soğuk hava enerji ihtiyacını ciddi şekilde artırdı."
      },
      {
        title: "BUZ ERİMESİ",
        description: "Sıcaklıklar aniden yükseldi ve buz tabakası hızla erimeye başladı."
      }
    ],

    metro: [
      {
        title: "KENTSEL ISI KRİZİ",
        description: "Şehirde sıcaklık rekor seviyelere ulaştı. Elektrik tüketimi patladı."
      },
      {
        title: "ALTYAPI ÇÖKÜŞÜ",
        description: "Aşırı hava koşulları şehrin enerji ve ulaşım altyapısını etkiledi."
      },
      {
        title: "ANI SEL BASKINI",
        description: "Şiddetli yağışlar metro hatlarını ve şehir yollarını su altında bıraktı."
      }
    ],

    agriculture: [
      {
        title: "BEKLENMEDİK DON",
        description: "Ani sıcaklık düşüşü tarım alanlarındaki ürünlere zarar verdi."
      },
      {
        title: "ÇEKİRGE İSTİLASI",
        description: "Büyük bir çekirge sürüsü tarım alanlarını tehdit ediyor."
      },
      {
        title: "UZUN SÜRELİ KURAKLIK",
        description: "Yağışlar beklenenden erken kesildi. Ürün verimliliği düşüyor."
      }
    ]

  };


  let disasterRound = 0;
  let disasterAlreadyHappened = false;


  // Yeni oyunda felaket zamanını rastgele belirle
  const previousStartGame = window.startGame;

  window.startGame = function () {

    disasterAlreadyHappened = false;

    // Felaket 2, 3, 4 veya 5. karardan sonra gerçekleşir
    disasterRound = Math.floor(Math.random() * 4) + 2;

    return previousStartGame.apply(this, arguments);
  };


  // Felaketin kaynaklara etkisini uygula
  function applyDisaster(disaster) {

    const keys = Object.keys(resources);

    if (keys.length === 0) return;

    // Etkilenecek iki farklı kaynak seç
    const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
    const affectedKeys = shuffledKeys.slice(0, Math.min(2, keys.length));

    const changes = [];

    affectedKeys.forEach((key, index) => {

      const loss = index === 0
        ? Math.floor(Math.random() * 9) + 10
        : Math.floor(Math.random() * 6) + 5;

      const before = resources[key];

      resources[key] = Math.max(0, before - loss);

      const actualLoss = before - resources[key];

      const icon = resourceIcons && resourceIcons[key]
        ? resourceIcons[key]
        : "📉";

      const name = resourceNames && resourceNames[key]
        ? resourceNames[key]
        : key;

      changes.push(
        `${icon} ${name}: -${actualLoss}`
      );

    });


    // Sürdürülebilirlik de zarar görür
    const sustainabilityLoss = Math.floor(Math.random() * 6) + 5;

    sustainability = Math.max(0, sustainability - sustainabilityLoss);


    // KAYNAK GEÇMİŞİNİ GÜVENLİ ŞEKİLDE GÜNCELLE
    if (
      resourceHistory &&
      typeof resourceHistory === "object" &&
      !Array.isArray(resourceHistory)
    ) {
      Object.keys(resourceHistory).forEach(key => {

        if (Array.isArray(resourceHistory[key])) {
          resourceHistory[key].push(resources[key]);
        }

      });
    }


    if (typeof updateResources === "function") {
      updateResources();
    }


    // Felaket ekranı
    const oldPanel = document.getElementById("surpriseDisasterPanel");

    if (oldPanel) oldPanel.remove();

    const panel = document.createElement("div");

    panel.id = "surpriseDisasterPanel";

    panel.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #4b1717, #241414);
        border: 2px solid #e74c3c;
        border-radius: 14px;
        padding: 22px;
        margin: 20px 0;
        color: white;
        box-shadow: 0 0 20px rgba(231,76,60,0.2);
      ">

        <div style="
          color: #ff6b5e;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 10px;
        ">
          ⚠️ BEKLENMEDİK İKLİM FELAKETİ
        </div>

        <h2 style="
          color: #ff8175;
          margin: 0 0 12px;
        ">
          ${disaster.title}
        </h2>

        <p style="
          line-height: 1.6;
          color: #f1dada;
        ">
          ${disaster.description}
        </p>

        <div style="
          background: rgba(0,0,0,0.25);
          padding: 14px;
          border-radius: 9px;
          margin-top: 15px;
        ">
          <strong>Kaynak kayıpları</strong>
          <p style="margin: 10px 0;">
            ${changes.join("<br>")}
          </p>
          <p style="color: #ff8175; margin-bottom: 0;">
            🌱 Sürdürülebilirlik: -${sustainabilityLoss}
          </p>
        </div>

        <p style="
          color: #ffb7ae;
          font-size: 13px;
          margin-top: 15px;
          margin-bottom: 0;
        ">
          İklim koşulları her zaman tahmin edilebilir değildir.
          Önceki kararlarının sonuçlarıyla yüzleşmelisin.
        </p>

      </div>
    `;

    const playScreen = document.getElementById("play");

    if (playScreen) {
      playScreen.appendChild(panel);
    }

  }


  // Karar verildiğinde felaket kontrolü
  const previousMakeDecision = window.makeDecision;

  window.makeDecision = function (index) {

    const result = previousMakeDecision.apply(this, arguments);

    if (
      !disasterAlreadyHappened &&
      currentRound === disasterRound
    ) {

      disasterAlreadyHappened = true;

      const disasters = surpriseDisasters[selectedRegionKey];

      if (disasters && disasters.length > 0) {

        const disaster = disasters[
          Math.floor(Math.random() * disasters.length)
        ];

        applyDisaster(disaster);

      }

    }

    return result;
  };


  console.log("BEKLENMEDİK İKLİM FELAKETLERİ AKTİF");

})();


/* =========================================
   CLIMATE GAMES
   BÖLGEYE ÖZEL FELAKET MÜDAHALE SİSTEMİ
========================================= */

(function () {

  const regionalInterventions = {

    desert: {
      title: "ACİL SU TASARRUFU",
      description: "Acil su dağıtım ve geri kazanım sistemini devreye al.",
      resource: ["water", "su"],
      cost: 8
    },

    coast: {
      title: "KIYI SAVUNMA SİSTEMİ",
      description: "Kıyı koruma ve acil enerji sistemlerini çalıştır.",
      resource: ["energy", "enerji"],
      cost: 10
    },

    forest: {
      title: "YANGINLA MÜCADELE",
      description: "Acil müdahale ekiplerini ve yangın söndürme sistemlerini devreye al.",
      resource: ["energy", "enerji"],
      cost: 8
    },

    polar: {
      title: "ACİL ISINMA MERKEZLERİ",
      description: "Enerji kaynaklarını acil ısınma merkezlerine yönlendir.",
      resource: ["energy", "enerji"],
      cost: 10
    },

    metro: {
      title: "KENTSEL ACİL DURUM PLANI",
      description: "Şehrin acil enerji ve altyapı sistemlerini devreye al.",
      resource: ["energy", "enerji"],
      cost: 12
    },

    agriculture: {
      title: "TARIMSAL KURTARMA PLANI",
      description: "Su rezervlerini zarar gören tarım alanlarına yönlendir.",
      resource: ["water", "su"],
      cost: 10
    }

  };


  // Kaynak anahtarını bul
  function findResourceKey(words) {

    return Object.keys(resources).find(key => {

      const name = (
        key + " " + (resourceNames[key] || "")
      ).toLowerCase();

      return words.some(word => name.includes(word));

    });

  }


  // Müdahale ekranını oluştur
  function addInterventionPanel() {

    const disasterPanel = document.getElementById(
      "surpriseDisasterPanel"
    );

    if (!disasterPanel || disasterPanel.dataset.interventionAdded) {
      return;
    }

    disasterPanel.dataset.interventionAdded = "true";

    const intervention = regionalInterventions[selectedRegionKey];

    if (!intervention) return;


    const section = document.createElement("div");

    section.style.cssText = `
      background: #172b2b;
      border: 1px solid #3d7770;
      border-radius: 12px;
      padding: 18px;
      margin-top: 18px;
      color: white;
    `;

    section.innerHTML = `
      <div style="
        color: #7de0bd;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 1px;
      ">
        🎯 KRİZ MÜDAHALE KARARI
      </div>

      <h3 style="margin: 12px 0;">
        ${intervention.title}
      </h3>

      <p style="line-height: 1.6; color: #d1e4df;">
        ${intervention.description}
      </p>

      <p style="color: #ffcf70; font-size: 13px;">
        Müdahale maliyeti: ${intervention.cost} kaynak puanı
      </p>
    `;


    const actionButton = document.createElement("button");

    actionButton.textContent = "MÜDAHALE ET";

    actionButton.style.cssText = `
      width: 100%;
      padding: 13px;
      margin-top: 10px;
      border: none;
      border-radius: 8px;
      background: #168b65;
      color: white;
      font-weight: bold;
      cursor: pointer;
    `;


    const ignoreButton = document.createElement("button");

    ignoreButton.textContent = "MÜDAHALE ETME";

    ignoreButton.style.cssText = `
      width: 100%;
      padding: 13px;
      margin-top: 9px;
      border: 1px solid #a34b4b;
      border-radius: 8px;
      background: #512727;
      color: white;
      font-weight: bold;
      cursor: pointer;
    `;


    const feedback = document.createElement("p");

    feedback.style.cssText = `
      margin-top: 14px;
      font-weight: bold;
      line-height: 1.6;
    `;


    function finishChoice(message) {

      actionButton.disabled = true;
      ignoreButton.disabled = true;

      actionButton.style.opacity = "0.5";
      ignoreButton.style.opacity = "0.5";

      feedback.textContent = message;

      if (typeof updateResources === "function") {
        updateResources();
      }

    }


    // Müdahale kararı
    actionButton.addEventListener("click", function () {

      const resourceKey = findResourceKey(intervention.resource);

      if (!resourceKey) {
        feedback.textContent =
          "Müdahale için gerekli kaynak bulunamadı.";
        return;
      }

      if (resources[resourceKey] < intervention.cost) {
        feedback.textContent =
          "Yeterli kaynağın yok! Müdahale gerçekleştirilemedi.";
        return;
      }

      resources[resourceKey] -= intervention.cost;

      sustainability = Math.min(100, sustainability + 12);

      finishChoice(
        "✓ Müdahale başarılı! Kaynak harcandı, sürdürülebilirlik +12 arttı."
      );

    });


    // Müdahale etmeme kararı
    ignoreButton.addEventListener("click", function () {

      sustainability = Math.max(0, sustainability - 8);

      finishChoice(
        "⚠️ Müdahale etmedin. Krizin etkileri ağırlaştı. Sürdürülebilirlik -8."
      );

    });


    section.appendChild(actionButton);
    section.appendChild(ignoreButton);
    section.appendChild(feedback);

    disasterPanel.appendChild(section);

  }


  // Felaket oluştuktan sonra müdahale seçeneklerini göster
  const previousMakeDecision = window.makeDecision;

  window.makeDecision = function (index) {

    const result = previousMakeDecision.apply(this, arguments);

    addInterventionPanel();

    return result;

  };


  console.log("BÖLGESEL FELAKET MÜDAHALE SİSTEMİ AKTİF");

})();

/* =========================================
   CLIMATE GAMES
   KARARLARIN DOLAYLI ETKİLERİ SİSTEMİ
========================================= */

(function () {

  const previousMakeDecision = window.makeDecision;

  if (typeof previousMakeDecision !== "function") {
    console.error("Karar sistemi bulunamadı!");
    return;
  }

  const secondaryEffects = {
    water: {
      target: "energy",
      loss: 4,
      message: "💧 Su sistemlerinin yoğun kullanımı enerji tüketimini artırdı."
    },

    food: {
      target: "water",
      loss: 4,
      message: "🌾 Tarımsal üretimdeki artış su kaynakları üzerinde baskı oluşturdu."
    },

    energy: {
      target: "water",
      loss: 3,
      message: "⚡ Enerji üretiminin çevresel maliyeti su kaynaklarını etkiledi."
    },

    population: {
      target: "energy",
      loss: 3,
      message: "👥 Artan toplumsal refah enerji talebini yükseltti."
    }
  };

  const resourceLabels = {
    water: "Su",
    food: "Gıda",
    energy: "Enerji",
    population: "Toplumsal Refah"
  };

  window.makeDecision = function (index) {

    const event = gameEvents[currentRound];
    const choice = event && event.choices[index];

    const previousCount = decisionHistory.length;

    const result = previousMakeDecision.apply(this, arguments);

    // Karar gerçekten uygulandıysa devam et
    if (
      !choice ||
      decisionHistory.length === previousCount
    ) {
      return result;
    }

    // En fazla artan kaynağı bul
    const keys = ["water", "food", "energy", "population"];

    let strongestResource = null;
    let strongestIncrease = 0;

    keys.forEach((key, i) => {

      const increase = Number(choice.effect[i]) || 0;

      if (increase > strongestIncrease) {
        strongestIncrease = increase;
        strongestResource = key;
      }

    });

    // En az 15 puanlık artış varsa dolaylı etki uygula
    if (strongestIncrease >= 15 && strongestResource) {

      const effect = secondaryEffects[strongestResource];
      const target = effect.target;

      const before = resources[target];

      resources[target] = Math.max(
        0,
        resources[target] - effect.loss
      );

      const actualLoss = before - resources[target];

      // Kaynak geçmişini güncelle
      if (
        resourceHistory &&
        Array.isArray(resourceHistory[target])
      ) {
        resourceHistory[target].push(resources[target]);
      }

      // Sürdürülebilirlik üzerindeki küçük etki
      sustainability = Math.max(0, sustainability - 1);

      // Kaynakları ekranda yenile
      if (typeof updateResources === "function") {
        updateResources();
      }

      // Karar sonucuna dolaylı etkiyi ekle
      const feedback = document.getElementById("feedback");

      if (feedback) {

        const resultBox = feedback.querySelector(".decision-result");

        if (resultBox) {

          const warning = document.createElement("div");

          warning.style.cssText = `
            background: rgba(230,166,76,0.12);
            border-left: 3px solid #e6a64c;
            padding: 12px;
            margin-top: 14px;
            border-radius: 6px;
            color: #f5d99c;
            line-height: 1.6;
          `;

          warning.innerHTML = `
            <strong>⚖️ DOLAYLI ETKİ</strong>
            <p>${effect.message}</p>
            <p>${resourceLabels[target]}: -${actualLoss}</p>
            <p>Sürdürülebilirlik: -1</p>
          `;

          resultBox.appendChild(warning);

        }

      }

    }

    return result;

  };

  console.log("KARARLARIN DOLAYLI ETKİLERİ SİSTEMİ AKTİF");

})();

/* =========================================
   CLIMATE GAMES - 5 FARKLI OYUN SONU
   Her sona özel tasarım ve performans analizi
========================================= */

(function () {

  // Aynı kodun yanlışlıkla iki kez eklenmesini önle
  if (window.climateEndingSystemInstalled) {
    console.log("Final sistemi zaten kurulu.");
    return;
  }

  const previousFinishGame = window.finishGame;

  if (typeof previousFinishGame !== "function") {
    console.error("finishGame bulunamadı. Bu kodu JS panelinin en altına ekle.");
    return;
  }

  window.climateEndingSystemInstalled = true;

  const endings = {
    hero: {
      title: "🌍 İKLİM KAHRAMANI",
      subtitle: "Geleceği kurtardın!",
      color: "#65d98b",
      background: "linear-gradient(135deg,#123c2a,#176b48,#102d26)",
      border: "#65d98b",
      description: "Zor kararlar aldın, kaynaklarını korudun ve doğayla uyumlu bir gelecek kurdun. İnsanlık iklim krizini aşmak için güçlü bir adım attı.",
      evaluation: "Mükemmel performans! Kararların uzun vadeli sürdürülebilirliği destekledi."
    },

    sustainable: {
      title: "🌱 SÜRDÜRÜLEBİLİR GELECEK",
      subtitle: "İnsanlık yeni bir başlangıç yaptı.",
      color: "#a8df83",
      background: "linear-gradient(135deg,#263e25,#466b35,#1c3529)",
      border: "#a8df83",
      description: "Kaynaklarını büyük ölçüde korumayı başardın. Bazı sorunlar devam etse de geleceğin için sağlam bir temel oluşturdun.",
      evaluation: "Başarılı bir yönetim! Birkaç doğru kararla çok daha iyi bir gelecek mümkün."
    },

    balance: {
      title: "⚖️ KIRILGAN DENGE",
      subtitle: "Gelecek hâlâ belirsiz.",
      color: "#e9c66f",
      background: "linear-gradient(135deg,#493b20,#65512a,#30291e)",
      border: "#e9c66f",
      description: "Bazı bölgeler gelişirken bazıları ciddi sorunlarla karşılaştı. Dünya ayakta kaldı ancak geleceği güvence altında değil.",
      evaluation: "Orta düzey performans. Kararların bazı sorunları çözerken başka sorunlara yol açtı."
    },

    crisis: {
      title: "🌡️ İKLİM KRİZİ",
      subtitle: "Gezegen ağır bir bedel ödedi.",
      color: "#ff9b65",
      background: "linear-gradient(135deg,#54251e,#873c28,#35201d)",
      border: "#ff9b65",
      description: "Kaynaklar ciddi biçimde azaldı. Aşırı sıcaklıklar, çevresel yıkım ve toplumsal sorunlar yaşamı zorlaştırdı.",
      evaluation: "Zayıf performans. Özellikle kaynakların korunması ve uzun vadeli etkiler konusunda daha dikkatli kararlar gerekiyordu."
    },

    collapse: {
      title: "💀 TOPLUMSAL ÇÖKÜŞ",
      subtitle: "Gelecek karanlığa sürüklendi.",
      color: "#ff7373",
      background: "linear-gradient(135deg,#211b20,#49242a,#17151b)",
      border: "#ff7373",
      description: "Kaynakların tükenmesi ve yanlış kararların birikmesi büyük bir felakete dönüştü. Toplumlar temel ihtiyaçlarını karşılamakta zorlanıyor.",
      evaluation: "Kritik başarısızlık. Alınan kararların olumsuz etkileri birbirini güçlendirdi ve sistemin dengesini bozdu."
    }
  };

  function getEndingData() {

    const data = typeof resources !== "undefined"
      ? resources
      : window.resources || {};

    const keys = ["water", "food", "energy", "population"];

    const values = keys.map(key => {
      const value = Number(data[key]);
      return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
    });

    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    const minimum = Math.min(...values);

    const sustainabilityValue = typeof sustainability !== "undefined"
      ? Number(sustainability)
      : Number(window.sustainability);

    const sustainabilityScore = Number.isFinite(sustainabilityValue)
      ? Math.max(0, Math.min(100, sustainabilityValue))
      : average;

    const history = typeof decisionHistory !== "undefined"
      ? decisionHistory
      : window.decisionHistory || [];

    const harmfulValue = typeof harmfulDecisionCount !== "undefined"
      ? Number(harmfulDecisionCount)
      : history.filter(item => Number(item.score) < 0).length;

    const harmful = Number.isFinite(harmfulValue) ? harmfulValue : 0;

    let endingKey;

    if (
      average >= 80 &&
      minimum >= 65 &&
      sustainabilityScore >= 80 &&
      harmful <= 2
    ) {
      endingKey = "hero";
    } else if (
      average < 25 ||
      minimum < 8 ||
      (harmful >= 12 && average < 40)
    ) {
      endingKey = "collapse";
    } else if (
      average < 42 ||
      minimum < 20 ||
      (harmful >= 8 && average < 55)
    ) {
      endingKey = "crisis";
    } else if (
      average >= 65 &&
      minimum >= 45 &&
      sustainabilityScore >= 60 &&
      harmful <= 5
    ) {
      endingKey = "sustainable";
    } else {
      endingKey = "balance";
    }

    return {
      ending: endings[endingKey],
      values,
      average: Math.round(average),
      sustainability: Math.round(sustainabilityScore),
      harmful
    };
  }

  function showClimateEnding() {

    const resultScreen = document.getElementById("result");

    if (!resultScreen) {
      console.error("Sonuç ekranı (#result) bulunamadı.");
      return;
    }

    const oldCard = document.getElementById("climateEndingCard");
    if (oldCard) oldCard.remove();

    const data = getEndingData();
    const ending = data.ending;

    const card = document.createElement("section");
    card.id = "climateEndingCard";

    card.style.cssText = `
      margin: 30px auto;
      padding: 28px 22px;
      max-width: 850px;
      border: 2px solid ${ending.border};
      border-radius: 22px;
      background: ${ending.background};
      color: white;
      text-align: center;
      box-shadow: 0 12px 35px rgba(0,0,0,.35);
      animation: climateEndingAppear .8s ease;
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes climateEndingAppear {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }

      #climateEndingCard .ending-stat {
        background: rgba(255,255,255,.09);
        border: 1px solid rgba(255,255,255,.15);
        border-radius: 12px;
        padding: 13px 8px;
      }

      #climateEndingCard .ending-stat strong {
        display: block;
        font-size: 23px;
        color: ${ending.color};
        margin-bottom: 5px;
      }

      #climateEndingCard .ending-stat span {
        font-size: 12px;
        color: #d5dfd9;
      }

      #climateEndingCard .ending-replay {
        margin-top: 22px;
        padding: 13px 25px;
        border: none;
        border-radius: 10px;
        background: ${ending.color};
        color: #17251d;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
      }
    `;

    card.innerHTML = `
      <div style="font-size:55px;margin-bottom:12px;">
        ${ending.title.split(" ")[0]}
      </div>

      <h2 style="
        color:${ending.color};
        font-size:clamp(23px,4vw,34px);
        margin:10px 0;
      ">
        ${ending.title.substring(ending.title.indexOf(" ") + 1)}
      </h2>

      <h3 style="font-size:19px;margin:12px 0 18px;color:#fff;">
        ${ending.subtitle}
      </h3>

      <p style="
        max-width:650px;
        margin:0 auto 20px;
        line-height:1.8;
        color:#e0e9e3;
      ">
        ${ending.description}
      </p>

      <div style="
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:10px;
        margin:22px 0;
      ">
        <div class="ending-stat">
          <strong>${data.average}%</strong>
          <span>Ortalama kaynak durumu</span>
        </div>

        <div class="ending-stat">
          <strong>${data.sustainability}%</strong>
          <span>Sürdürülebilirlik</span>
        </div>

        <div class="ending-stat">
          <strong>${data.harmful}</strong>
          <span>Riskli karar sayısı</span>
        </div>

        <div class="ending-stat">
          <strong>${data.values[0]}%</strong>
          <span>Son su kaynağı durumu</span>
        </div>
      </div>

      <div style="
        padding:17px;
        border-radius:12px;
        background:rgba(0,0,0,.2);
        line-height:1.7;
        color:#f2e9d7;
      ">
        <strong style="color:${ending.color};">
          📋 PERFORMANS DEĞERLENDİRMESİ
        </strong>
        <p style="margin:8px 0 0;">${ending.evaluation}</p>
      </div>

      <button class="ending-replay" id="climateReplayButton">
        🔄 Yeniden Oyna
      </button>
    `;

    if (!document.getElementById("climateEndingStyles")) {
      style.id = "climateEndingStyles";
      document.head.appendChild(style);
    }

    resultScreen.appendChild(card);

    document.getElementById("climateReplayButton").addEventListener("click", function () {
      window.location.reload();
    });

    card.scrollIntoView({ behavior: "smooth", block: "start" });

    console.log("Oyun finali:", ending.title);
  }

  window.finishGame = function () {
    const result = previousFinishGame.apply(this, arguments);

    try {
      showClimateEnding();
    } catch (error) {
      console.error("Final ekranı oluşturulamadı:", error);
    }

    return result;
  };

  console.log("5 farklı oyun sonu sistemi hazır!");

})();

/* =========================================
   CLIMATE GAMES - KARARLARININ ETKİSİ
   Final ekranına kişisel karar analizi ekler
========================================= */

(function () {

  if (window.climateDecisionAnalysisInstalled) {
    console.log("Karar analizi zaten kurulu.");
    return;
  }

  const previousFinishGame = window.finishGame;

  if (typeof previousFinishGame !== "function") {
    console.error("finishGame bulunamadı.");
    return;
  }

  window.climateDecisionAnalysisInstalled = true;

  function addDecisionAnalysis() {

    const card = document.getElementById("climateEndingCard");
    if (!card) return;

    const oldSection = document.getElementById("climateDecisionAnalysis");
    if (oldSection) oldSection.remove();

    const history = typeof decisionHistory !== "undefined"
      ? decisionHistory
      : window.decisionHistory || [];

    const section = document.createElement("section");
    section.id = "climateDecisionAnalysis";

    section.style.cssText = `
      margin-top:22px;
      padding:20px;
      border-radius:15px;
      background:rgba(0,0,0,.25);
      border:1px solid rgba(255,255,255,.2);
      text-align:left;
    `;

    const heading = document.createElement("h3");
    heading.textContent = "🧭 KARARLARININ DÜNYAYA ETKİSİ";
    heading.style.cssText = "text-align:center;color:#e6c77b;margin-bottom:18px;";
    section.appendChild(heading);

    function getText(item, fields) {
      for (const field of fields) {
        if (item[field] !== undefined && item[field] !== null) {
          if (typeof item[field] === "string" || typeof item[field] === "number") {
            return String(item[field]);
          }
        }
      }
      return "Karar bilgisi kaydedilmemiş";
    }

    function addInfo(title, value, color) {
      const box = document.createElement("div");
      box.style.cssText = `
        margin:10px 0;
        padding:13px;
        border-radius:10px;
        background:rgba(255,255,255,.07);
        border-left:4px solid ${color};
      `;

      const label = document.createElement("strong");
      label.textContent = title;
      label.style.cssText = `display:block;color:${color};margin-bottom:6px;`;

      const content = document.createElement("p");
      content.textContent = value;
      content.style.cssText = "margin:0;line-height:1.6;color:#edf2ee;";

      box.appendChild(label);
      box.appendChild(content);
      section.appendChild(box);
    }

    const scoredDecisions = history
      .map(item => ({
        item,
        score: Number(item.score)
      }))
      .filter(entry => Number.isFinite(entry.score));

    if (scoredDecisions.length > 0) {

      const best = scoredDecisions.reduce((a, b) =>
        b.score > a.score ? b : a
      );

      const worst = scoredDecisions.reduce((a, b) =>
        b.score < a.score ? b : a
      );

      const bestName = getText(best.item, [
        "choice", "choiceText", "selectedChoice", "decision"
      ]);

      const worstName = getText(worst.item, [
        "choice", "choiceText", "selectedChoice", "decision"
      ]);

      addInfo(
        "🏆 EN BAŞARILI KARARIN",
        bestName + " (Puan: " + best.score + ")",
        "#8fdb9c"
      );

      addInfo(
        "⚠️ EN ZARARLI KARARIN",
        worstName + " (Puan: " + worst.score + ")",
        "#ff9999"
      );

    } else {
      addInfo(
        "📋 KARAR DEĞERLENDİRMESİ",
        "Karar puanları geçmişe kaydedilmediği için en başarılı ve en zararlı karar belirlenemedi.",
        "#e6c77b"
      );
    }

    // Karar geçmişinde effect dizileri varsa kaynak etkilerini hesapla
    const resourceNames = {
      water: "Su",
      food: "Gıda",
      energy: "Enerji",
      population: "Nüfus"
    };

    const totals = [0, 0, 0, 0];
    let effectCount = 0;

    history.forEach(item => {
      if (Array.isArray(item.effect)) {
        item.effect.forEach((value, index) => {
          if (index < 4) {
            totals[index] += Number(value) || 0;
          }
        });
        effectCount++;
      }
    });

    if (effectCount > 0) {
      let strongestIndex = 0;

      for (let i = 1; i < totals.length; i++) {
        if (Math.abs(totals[i]) > Math.abs(totals[strongestIndex])) {
          strongestIndex = i;
        }
      }

      const strongestName = resourceNames[
        ["water", "food", "energy", "population"][strongestIndex]
      ];

      const impact = totals[strongestIndex];
      const direction = impact > 0
        ? "olumlu"
        : impact < 0
          ? "olumsuz"
          : "nötr";

      addInfo(
        "🌿 EN ÇOK ETKİLENEN KAYNAK",
        strongestName + " kaynağı, kararlarının toplam etkisinde " +
        direction + " yönde en fazla değişim gösterdi.",
        "#8fdb9c"
      );

    } else {
      addInfo(
        "🌿 KAYNAK ETKİSİ",
        "Karar geçmişinde kaynak etkileri ayrı ayrı saklanmadığı için bu karşılaştırma yapılamadı.",
        "#e6c77b"
      );
    }

    const summary = document.createElement("p");
    summary.textContent =
      "Bu sonuç, verdiğin kararların birikimli etkisini gösteriyor. " +
      "Her karar yalnızca bugünü değil, gelecekteki yaşam koşullarını da etkiledi.";

    summary.style.cssText = `
      margin:18px 2px 0;
      color:#d5dfd9;
      line-height:1.7;
      text-align:center;
      font-size:13px;
    `;

    section.appendChild(summary);
    card.appendChild(section);
  }

  window.finishGame = function () {
    const result = previousFinishGame.apply(this, arguments);

    try {
      addDecisionAnalysis();
    } catch (error) {
      console.error("Karar analizi eklenemedi:", error);
    }

    return result;
  };

  console.log("Kararlarının etkisi analizi hazır!");

})();

/* =========================================
   CLIMATE GAMES - ETKİLEŞİMLİ DÜNYA HARİTASI
========================================= */

(function () {

  const worldMap = document.querySelector("#climateWorld .world-map");
  const information = document.getElementById("regionInformation");

  if (!worldMap || !information) {
    console.error("Dünya haritası veya bilgi alanı bulunamadı.");
    return;
  }

  const regions = {
    desert: {
      name: "ÇÖL BÖLGESİ",
      icon: "🏜️",
      description: "Aşırı sıcaklık, kuraklık ve su kıtlığıyla mücadele eden bölge.",
      challenge: "Temel mücadele: Su kaynaklarını korumak."
    },
    coast: {
      name: "KIYI BÖLGESİ",
      icon: "🌊",
      description: "Deniz seviyesinin yükselmesi, kıyı taşkınları ve fırtınalarla karşı karşıya.",
      challenge: "Temel mücadele: Kıyı yerleşimlerini korumak."
    },
    forest: {
      name: "ORMAN BÖLGESİ",
      icon: "🌲",
      description: "Orman yangınları, biyolojik çeşitlilik kaybı ve kuraklık tehdidi altında.",
      challenge: "Temel mücadele: Ekosistemi ve ormanları korumak."
    },
    polar: {
      name: "KUTUP BÖLGESİ",
      icon: "❄️",
      description: "Buzulların erimesi ve sıcaklık artışı bölgenin doğal dengesini bozuyor.",
      challenge: "Temel mücadele: Buzulları ve yaşam alanlarını korumak."
    },
    metro: {
      name: "METROPOL BÖLGESİ",
      icon: "🏙️",
      description: "Hava kirliliği, aşırı enerji tüketimi ve nüfus yoğunluğu önemli sorunlar oluşturuyor.",
      challenge: "Temel mücadele: Sürdürülebilir şehirler kurmak."
    },
    agriculture: {
      name: "TARIM BÖLGESİ",
      icon: "🌾",
      description: "Kuraklık, verim kaybı ve gıda güvenliği sorunlarıyla karşı karşıya.",
      challenge: "Temel mücadele: Gıda üretimini sürdürülebilir kılmak."
    }
  };

  function getResources() {
    if (typeof resources !== "undefined") return resources;
    return window.resources || {};
  }

  function getResourceStatus() {
    const current = getResources();
    const keys = ["water", "food", "energy", "population"];

    const values = keys.map(key => {
      const value = Number(current[key]);
      return Number.isFinite(value)
        ? Math.max(0, Math.min(100, value))
        : 0;
    });

    const average = values.reduce((sum, value) => sum + value, 0) / 4;

    if (average >= 70) return "🟢 Kaynak durumu iyi";
    if (average >= 40) return "🟡 Kaynaklar dikkatle yönetilmeli";
    if (average >= 20) return "🟠 Kaynaklar kritik seviyede";
    return "🔴 Kaynak durumu çok tehlikeli";
  }

  function showRegion(regionKey, selectedButton) {

    const region = regions[regionKey];

    if (!region) return;

    worldMap.querySelectorAll(".region").forEach(button => {
      button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    const current = getResources();

    const resourceItems = [
      { key: "water", name: "💧 Su" },
      { key: "food", name: "🌾 Gıda" },
      { key: "energy", name: "⚡ Enerji" },
      { key: "population", name: "👥 Nüfus" }
    ];

    information.replaceChildren();

    const icon = document.createElement("div");
    icon.textContent = region.icon;
    icon.style.fontSize = "42px";

    const heading = document.createElement("h3");
    heading.textContent = region.name;

    const description = document.createElement("p");
    description.textContent = region.description;

    const challenge = document.createElement("p");
    challenge.textContent = region.challenge;
    challenge.style.color = "#e5d49a";
    challenge.style.fontWeight = "bold";

    const status = document.createElement("p");
    status.textContent = getResourceStatus();
    status.style.fontWeight = "bold";
    status.style.marginTop = "18px";

    const resourceGrid = document.createElement("div");

    resourceGrid.style.cssText = `
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
      margin-top:18px;
    `;

    resourceItems.forEach(item => {

      const value = Number(current[item.key]);
      const safeValue = Number.isFinite(value)
        ? Math.max(0, Math.min(100, Math.round(value)))
        : 0;

      const box = document.createElement("div");

      box.style.cssText = `
        padding:13px;
        border-radius:10px;
        background:rgba(255,255,255,.08);
        border:1px solid rgba(255,255,255,.12);
      `;

      const label = document.createElement("div");
      label.textContent = item.name;
      label.style.color = "#c4d3ca";

      const number = document.createElement("strong");
      number.textContent = safeValue + "%";
      number.style.cssText = `
        display:block;
        margin-top:7px;
        font-size:22px;
        color:${safeValue >= 60 ? "#8fdb9c" : safeValue >= 30 ? "#e6c77b" : "#ff9999"};
      `;

      box.append(label, number);
      resourceGrid.appendChild(box);
    });

    const note = document.createElement("p");
    note.textContent = "Not: Kaynak değerleri şu an tüm oyun dünyasının genel durumunu gösterir; bölgelere özel ayrı kaynak hesaplaması değildir.";
    note.style.cssText = `
      margin-top:15px;
      font-size:11px;
      color:#9eb4a7;
      line-height:1.5;
    `;

    information.append(
      icon,
      heading,
      description,
      challenge,
      status,
      resourceGrid,
      note
    );
  }

  worldMap.addEventListener("click", function (event) {

    const button = event.target.closest(".region");

    if (!button || !worldMap.contains(button)) return;

    const regionKey = button.dataset.region;

    showRegion(regionKey, button);
  });

  console.log("Etkileşimli dünya haritası hazır!");

})();

/* =========================================
   CLIMATE GAMES - BÖLGESEL TEHLİKE GÖSTERGELERİ
========================================= */

(function () {

  const worldMap = document.querySelector("#climateWorld .world-map");
  if (!worldMap) return;

  const riskProfiles = {
    desert: {
      base: 42,
      weights: { water: 0.65, food: 0.20, energy: 0.10, population: 0.05 }
    },
    coast: {
      base: 48,
      weights: { water: 0.15, food: 0.15, energy: 0.15, population: 0.55 }
    },
    forest: {
      base: 38,
      weights: { water: 0.35, food: 0.25, energy: 0.15, population: 0.25 }
    },
    polar: {
      base: 45,
      weights: { water: 0.25, food: 0.30, energy: 0.30, population: 0.15 }
    },
    metro: {
      base: 40,
      weights: { water: 0.20, food: 0.15, energy: 0.40, population: 0.25 }
    },
    agriculture: {
      base: 44,
      weights: { water: 0.40, food: 0.40, energy: 0.10, population: 0.10 }
    }
  };

  const style = document.createElement("style");

  style.textContent = `
    #climateWorld .region-risk {
      position: absolute;
      top: -13px;
      right: -22px;
      min-width: 43px;
      padding: 4px 6px;
      border-radius: 20px;
      font-size: 9px;
      font-weight: bold;
      color: white;
      background: #777;
      border: 1px solid rgba(255,255,255,.8);
      box-shadow: 0 2px 8px rgba(0,0,0,.4);
      white-space: nowrap;
    }

    #climateWorld .region-risk.low {
      background: #238b50;
    }

    #climateWorld .region-risk.medium {
      background: #b58a25;
    }

    #climateWorld .region-risk.high {
      background: #bd3939;
    }
  `;

  document.head.appendChild(style);

  function getCurrentResources() {
    try {
      if (typeof resources !== "undefined") return resources;
    } catch (error) {}

    return window.resources || {};
  }

  function calculateRisk(regionKey) {

    const profile = riskProfiles[regionKey];
    if (!profile) return 50;

    const current = getCurrentResources();

    let shortage = 0;

    Object.entries(profile.weights).forEach(([key, weight]) => {

      let value = Number(current[key]);

      if (!Number.isFinite(value)) value = 50;

      value = Math.max(0, Math.min(100, value));

      shortage += (100 - value) * weight;
    });

    return Math.min(100, Math.round(profile.base + shortage * 0.35));
  }

  function refreshRiskIndicators() {

    worldMap.querySelectorAll(".region").forEach(button => {

      const key = button.dataset.region;
      const risk = calculateRisk(key);

      let badge = button.querySelector(".region-risk");

      if (!badge) {
        badge = document.createElement("span");
        badge.className = "region-risk";
        button.appendChild(badge);
      }

      badge.classList.remove("low", "medium", "high");

      if (risk < 40) {
        badge.textContent = "DÜŞÜK";
        badge.classList.add("low");
      } else if (risk < 65) {
        badge.textContent = "ORTA";
        badge.classList.add("medium");
      } else {
        badge.textContent = "YÜKSEK";
        badge.classList.add("high");
      }

      badge.title = "Tahmini tehlike seviyesi: %" + risk;
      button.setAttribute(
        "aria-label",
        button.innerText + " - Tahmini risk %" + risk
      );
    });
  }

  // Bölgeye tıklandığında risk puanını bilgi kartına ekle
  worldMap.addEventListener("click", function (event) {

    const button = event.target.closest(".region");
    if (!button) return;

    const risk = calculateRisk(button.dataset.region);
    const information = document.getElementById("regionInformation");

    if (!information) return;

    const oldRisk = information.querySelector(".regional-risk-detail");
    if (oldRisk) oldRisk.remove();

    const detail = document.createElement("p");
    detail.className = "regional-risk-detail";
    detail.style.cssText = `
      margin-top:15px;
      padding:12px;
      border-radius:10px;
      background:rgba(255,255,255,.08);
      color:#f0d58e;
      font-weight:bold;
    `;

    let level = risk < 40 ? "DÜŞÜK" : risk < 65 ? "ORTA" : "YÜKSEK";

    detail.textContent = "⚠️ Tahmini bölgesel tehlike: " + level + " (%" + risk + ")";

    information.appendChild(detail);

  });

  // Oyuncu karar verdikten sonra göstergeleri yenile
  if (
    typeof window.makeDecision === "function" &&
    !window.makeDecision.__climateRiskWrapped
  ) {

    const originalMakeDecision = window.makeDecision;

    const updatedMakeDecision = function () {
      const result = originalMakeDecision.apply(this, arguments);
      refreshRiskIndicators();
      return result;
    };

    updatedMakeDecision.__climateRiskWrapped = true;
    window.makeDecision = updatedMakeDecision;
  }

  refreshRiskIndicators();

  console.log("Bölgesel tehlike göstergeleri hazır!");

})();

/* =========================================
   CLIMATE GAMES - MODERN İKLİM RİSK ANALİZİ
========================================= */

(function () {

  const map = document.querySelector("#climateWorld .world-map");
  const info = document.getElementById("regionInformation");

  if (!map || !info) return;

  // Önceki küçük risk etiketlerini kaldır
  map.querySelectorAll(".region-risk").forEach(el => el.remove());

  // Eski risk etiketlerinin stilini etkisizleştir
  const oldStyles = document.querySelectorAll("style");
  oldStyles.forEach(style => {
    if (style.textContent.includes(".region-risk")) {
      style.remove();
    }
  });

  const regionData = {
    desert: {
      name: "Çöl Bölgesi",
      icon: "🏜️",
      threats: ["Aşırı sıcaklık", "Kuraklık", "Su kıtlığı"],
      weights: { water: .65, food: .20, energy: .10, population: .05 },
      base: 42
    },
    coast: {
      name: "Kıyı Bölgesi",
      icon: "🌊",
      threats: ["Deniz seviyesinin yükselmesi", "Kıyı taşkınları", "Şiddetli fırtınalar"],
      weights: { water: .15, food: .15, energy: .15, population: .55 },
      base: 48
    },
    forest: {
      name: "Orman Bölgesi",
      icon: "🌲",
      threats: ["Orman yangınları", "Biyolojik çeşitlilik kaybı", "Kuraklık"],
      weights: { water: .35, food: .25, energy: .15, population: .25 },
      base: 38
    },
    polar: {
      name: "Kutup Bölgesi",
      icon: "❄️",
      threats: ["Buzulların erimesi", "Sıcaklık artışı", "Ekosistem kaybı"],
      weights: { water: .25, food: .30, energy: .30, population: .15 },
      base: 45
    },
    metro: {
      name: "Metropol Bölgesi",
      icon: "🏙️",
      threats: ["Hava kirliliği", "Aşırı enerji tüketimi", "Nüfus yoğunluğu"],
      weights: { water: .20, food: .15, energy: .40, population: .25 },
      base: 40
    },
    agriculture: {
      name: "Tarım Bölgesi",
      icon: "🌾",
      threats: ["Toprak verimliliğinin düşmesi", "Sulama ihtiyacı", "Gıda güvenliği"],
      weights: { water: .40, food: .40, energy: .10, population: .10 },
      base: 44
    }
  };

  // Görsel tasarım
  const style = document.createElement("style");
  style.id = "modernClimateRiskStyle";

  style.textContent = `
    #climateWorld .region-risk {
      display: none !important;
    }

    #climateWorld .region.risk-low {
      box-shadow: 0 0 0 5px rgba(67,210,120,.18),
                  0 0 22px rgba(67,210,120,.8);
      border-color: #78e69b;
    }

    #climateWorld .region.risk-medium {
      box-shadow: 0 0 0 5px rgba(245,195,66,.2),
                  0 0 24px rgba(245,195,66,.85);
      border-color: #f5c342;
    }

    #climateWorld .region.risk-high {
      box-shadow: 0 0 0 5px rgba(245,75,75,.2),
                  0 0 27px rgba(245,75,75,.9);
      border-color: #ff7777;
    }

    #regionInformation {
      padding: 28px !important;
      transition: .3s ease;
    }

    #regionInformation .risk-card {
      max-width: 750px;
      margin: 20px auto 0;
      padding: 22px;
      text-align: left;
      border-radius: 16px;
      background: linear-gradient(145deg,rgba(255,255,255,.08),rgba(0,0,0,.15));
      border: 1px solid rgba(255,255,255,.13);
    }

    #regionInformation .risk-score {
      font-size: 34px;
      font-weight: 800;
      margin: 8px 0;
    }

    #regionInformation .risk-bar {
      height: 9px;
      background: rgba(255,255,255,.12);
      border-radius: 20px;
      overflow: hidden;
      margin: 12px 0 20px;
    }

    #regionInformation .risk-fill {
      height: 100%;
      border-radius: 20px;
      transition: width .5s ease;
    }

    #regionInformation .risk-resources {
      display: grid;
      grid-template-columns: repeat(4,minmax(0,1fr));
      gap: 9px;
      margin-top: 12px;
    }

    #regionInformation .risk-resource {
      padding: 13px 7px;
      text-align: center;
      border-radius: 10px;
      background: rgba(255,255,255,.07);
    }

    #regionInformation .risk-resource strong {
      display: block;
      margin-top: 7px;
      font-size: 19px;
    }

    #regionInformation .risk-threats {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    #regionInformation .risk-threats span {
      padding: 8px 11px;
      border-radius: 20px;
      background: rgba(255,255,255,.08);
      color: #dce9df;
      font-size: 12px;
    }

    @media(max-width:600px) {
      #regionInformation .risk-resources {
        grid-template-columns: repeat(2,minmax(0,1fr));
      }
    }
  `;

  document.getElementById("modernClimateRiskStyle")?.remove();
  document.head.appendChild(style);

  function getResources() {
    try {
      if (typeof resources !== "undefined") return resources;
    } catch (e) {}

    return window.resources || {};
  }

  function calculateRisk(key) {
    const profile = regionData[key];
    if (!profile) return 50;

    const current = getResources();
    let shortage = 0;

    Object.entries(profile.weights).forEach(([name, weight]) => {
      let value = Number(current[name]);

      if (!Number.isFinite(value)) value = 50;

      value = Math.max(0, Math.min(100, value));
      shortage += (100 - value) * weight;
    });

    return Math.min(100, Math.round(profile.base + shortage * .35));
  }

  function getLevel(risk) {
    if (risk < 40) {
      return { name: "DÜŞÜK RİSK", color: "#65d98a", className: "risk-low" };
    }

    if (risk < 65) {
      return { name: "ORTA RİSK", color: "#f2c45c", className: "risk-medium" };
    }

    return { name: "YÜKSEK RİSK", color: "#ff7777", className: "risk-high" };
  }

  function refreshMap() {
    map.querySelectorAll(".region").forEach(button => {
      button.classList.remove("risk-low", "risk-medium", "risk-high");

      const risk = calculateRisk(button.dataset.region);
      const level = getLevel(risk);

      button.classList.add(level.className);
      button.title = level.name + " - %" + risk;
    });
  }

  function createElement(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
  }

  function showAnalysis(key) {
    const region = regionData[key];
    if (!region) return;

    const risk = calculateRisk(key);
    const level = getLevel(risk);
    const current = getResources();

    info.replaceChildren();

    const icon = createElement("div", "", region.icon);
    icon.style.fontSize = "42px";

    const heading = createElement("h3", "", region.name);
    const subtitle = createElement("p", "", "BÖLGESEL İKLİM RİSK ANALİZİ");

    const card = createElement("div", "risk-card");

    const levelText = createElement("div", "", level.name);
    levelText.style.cssText = `
      color:${level.color};
      font-size:13px;
      font-weight:bold;
      letter-spacing:1.5px;
    `;

    const score = createElement("div", "risk-score", "%" + risk);
    score.style.color = level.color;

    const bar = createElement("div", "risk-bar");
    const fill = createElement("div", "risk-fill");
    fill.style.width = risk + "%";
    fill.style.background = level.color;
    bar.appendChild(fill);

    const threatTitle = createElement("h4", "", "BÖLGENİN İKLİM TEHDİTLERİ");

    const threats = createElement("div", "risk-threats");

    region.threats.forEach(threat => {
      threats.appendChild(createElement("span", "", threat));
    });

    const resourceTitle = createElement("h4", "", "GÜNCEL OYUN KAYNAKLARI");
    resourceTitle.style.marginTop = "25px";

    const resourceGrid = createElement("div", "risk-resources");

    const items = [
      ["water", "💧 Su"],
      ["food", "🌾 Gıda"],
      ["energy", "⚡ Enerji"],
      ["population", "👥 Nüfus"]
    ];

    items.forEach(([key, label]) => {
      const box = createElement("div", "risk-resource");
      box.appendChild(createElement("span", "", label));

      const value = Number(current[key]);
      const valueText = Number.isFinite(value)
        ? Math.round(Math.max(0, Math.min(100, value))) + "%"
        : "Veri yok";

      box.appendChild(createElement("strong", "", valueText));
      resourceGrid.appendChild(box);
    });

    const note = createElement(
      "p",
      "",
      "Risk puanı, bölgenin iklim hassasiyeti ve oyunun genel kaynak durumundan hesaplanan tahmini bir göstergedir."
    );

    note.style.cssText = `
      margin-top:20px;
      color:#9eb4a7;
      font-size:11px;
      line-height:1.6;
    `;

    card.append(
      levelText,
      score,
      bar,
      threatTitle,
      threats,
      resourceTitle,
      resourceGrid,
      note
    );

    info.append(icon, heading, subtitle, card);
  }

  map.addEventListener("click", function (event) {
    const button = event.target.closest(".region");
    if (!button || !map.contains(button)) return;

    showAnalysis(button.dataset.region);
  });

  // Karar verildikten sonra risk renklerini güncelle
  if (
    typeof window.makeDecision === "function" &&
    !window.makeDecision.__modernRiskWrapped
  ) {
    const oldMakeDecision = window.makeDecision;

    const newMakeDecision = function () {
      const result = oldMakeDecision.apply(this, arguments);
      refreshMap();

      const selected = map.querySelector(".region.active");
      if (selected) showAnalysis(selected.dataset.region);

      return result;
    };

    newMakeDecision.__modernRiskWrapped = true;
    window.makeDecision = newMakeDecision;
  }

  refreshMap();

  console.log("Modern iklim risk analizi hazır!");

})();

/* =========================================
   CLIMATE GAMES - 2085-2100 İKLİM GRAFİKLERİ
========================================= */

(function () {

  const map = document.querySelector("#climateWorld .world-map");
  const info = document.getElementById("regionInformation");

  if (!map || !info) return;

  const climateTrends = {
    desert: {
      title: "Çöl Bölgesi",
      metrics: [
        { name: "Sıcaklık artışı", values: [35, 48, 67, 82] },
        { name: "Su stresi", values: [40, 55, 72, 90] }
      ]
    },
    coast: {
      title: "Kıyı Bölgesi",
      metrics: [
        { name: "Deniz seviyesi riski", values: [25, 42, 63, 82] },
        { name: "Taşkın riski", values: [30, 45, 68, 86] }
      ]
    },
    forest: {
      title: "Orman Bölgesi",
      metrics: [
        { name: "Yangın riski", values: [28, 43, 65, 84] },
        { name: "Yağış düzensizliği", values: [25, 40, 59, 77] }
      ]
    },
    polar: {
      title: "Kutup Bölgesi",
      metrics: [
        { name: "Buz kaybı riski", values: [35, 52, 73, 92] },
        { name: "Sıcaklık artışı", values: [30, 48, 70, 88] }
      ]
    },
    metro: {
      title: "Metropol Bölgesi",
      metrics: [
        { name: "Aşırı sıcaklık", values: [32, 47, 65, 83] },
        { name: "Hava kirliliği baskısı", values: [35, 48, 62, 75] }
      ]
    },
    agriculture: {
      title: "Tarım Bölgesi",
      metrics: [
        { name: "Kuraklık riski", values: [30, 46, 67, 85] },
        { name: "Üretim baskısı", values: [25, 42, 61, 80] }
      ]
    }
  };

  const years = ["2085", "2090", "2095", "2100"];

  const style = document.createElement("style");
  style.id = "climateTrendChartStyle";

  style.textContent = `
    #regionInformation .climate-chart-card {
      max-width:750px;
      margin:20px auto 0;
      padding:22px;
      text-align:left;
      border-radius:16px;
      background:linear-gradient(145deg,#172c2b,#203b35);
      border:1px solid rgba(180,220,190,.18);
    }

    #regionInformation .climate-chart-card h4 {
      color:#e5d49a;
      margin:0 0 8px;
    }

    #regionInformation .climate-chart-card .chart-description {
      color:#aebfb4;
      font-size:12px;
      line-height:1.5;
      margin-bottom:20px;
    }

    #regionInformation .trend-item {
      margin-top:22px;
    }

    #regionInformation .trend-title {
      color:#e5eee7;
      font-size:13px;
      font-weight:bold;
      margin-bottom:10px;
    }

    #regionInformation .trend-bars {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:10px;
      align-items:end;
      height:145px;
      padding:12px 8px 0;
      border-bottom:1px solid rgba(255,255,255,.2);
      background:repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 34px,
        rgba(255,255,255,.07) 35px
      );
    }

    #regionInformation .trend-column {
      height:100%;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
      align-items:center;
      gap:7px;
    }

    #regionInformation .trend-value {
      color:#dce9df;
      font-size:11px;
      font-weight:bold;
    }

    #regionInformation .trend-bar {
      width:min(34px,75%);
      min-height:4px;
      border-radius:7px 7px 0 0;
      background:linear-gradient(to top,#3c9275,#a8d99b);
      transition:height .4s ease;
    }

    #regionInformation .trend-year {
      color:#b7c9bd;
      font-size:10px;
      margin-top:5px;
    }

    #regionInformation .chart-legend {
      color:#9eb4a7;
      font-size:11px;
      margin-top:18px;
      line-height:1.5;
    }
  `;

  document.getElementById("climateTrendChartStyle")?.remove();
  document.head.appendChild(style);

  function makeChart(regionKey) {

    const data = climateTrends[regionKey];
    if (!data) return;

    // Önceki grafik varsa kaldır
    info.querySelector(".climate-chart-card")?.remove();

    const card = document.createElement("div");
    card.className = "climate-chart-card";

    const heading = document.createElement("h4");
    heading.textContent = "📈 2085–2100 İKLİM DEĞİŞİMİ";

    const description = document.createElement("p");
    description.className = "chart-description";
    description.textContent =
      data.title + " için temsili iklim senaryosu göstergeleri. Değerler 0–100 aralığında gösterilir.";

    card.append(heading, description);

    data.metrics.forEach(metric => {

      const item = document.createElement("div");
      item.className = "trend-item";

      const title = document.createElement("div");
      title.className = "trend-title";
      title.textContent = metric.name;

      const bars = document.createElement("div");
      bars.className = "trend-bars";

      metric.values.forEach((value, index) => {

        const column = document.createElement("div");
        column.className = "trend-column";

        const number = document.createElement("span");
        number.className = "trend-value";
        number.textContent = value;

        const bar = document.createElement("div");
        bar.className = "trend-bar";
        bar.style.height = value + "%";

        const year = document.createElement("span");
        year.className = "trend-year";
        year.textContent = years[index];

        column.append(number, bar, year);
        bars.appendChild(column);
      });

      item.append(title, bars);
      card.appendChild(item);
    });

    const legend = document.createElement("p");
    legend.className = "chart-legend";
    legend.textContent =
      "Not: Yüksek değer, ilgili iklim göstergesindeki baskının arttığını temsil eder. Bu grafikler şu an örnek senaryo verileridir; oyuncu kararlarından henüz etkilenmez.";

    card.appendChild(legend);
    info.appendChild(card);
  }

  map.addEventListener("click", function (event) {
    const button = event.target.closest(".region");

    if (!button || !map.contains(button)) return;

    makeChart(button.dataset.region);
  });

  console.log("İklim değişimi grafikleri hazır!");

})();

/* =========================================
   CLIMATE GAMES - KARARLARIN İKLİM ETKİSİ
========================================= */

(function () {

  if (window.climateDecisionEffectsInstalled) return;
  window.climateDecisionEffectsInstalled = true;

  // Her kararın bölgesel grafiklere etkisi
  const effects = {
    water: [
      { region: "desert", metric: "Su stresi", amount: -9 },
      { region: "agriculture", metric: "Kuraklık riski", amount: -5 }
    ],

    forest: [
      { region: "forest", metric: "Yangın riski", amount: -9 },
      { region: "forest", metric: "Yağış düzensizliği", amount: -4 }
    ],

    coast: [
      { region: "coast", metric: "Deniz seviyesi riski", amount: -5 },
      { region: "coast", metric: "Taşkın riski", amount: -9 }
    ],

    energy: [
      { region: "metro", metric: "Hava kirliliği baskısı", amount: -9 },
      { region: "metro", metric: "Aşırı sıcaklık", amount: -4 }
    ],

    agriculture: [
      { region: "agriculture", metric: "Üretim baskısı", amount: -8 },
      { region: "agriculture", metric: "Kuraklık riski", amount: -5 }
    ],

    polar: [
      { region: "polar", metric: "Buz kaybı riski", amount: -8 },
      { region: "polar", metric: "Sıcaklık artışı", amount: -5 }
    ]
  };

  // Biriken karar etkileri
  const accumulated = {};

  Object.keys(effects).forEach(category => {
    effects[category].forEach(effect => {
      const key = effect.region + "|" + effect.metric;
      accumulated[key] = 0;
    });
  });

  // Türkçe karakterleri karşılaştırma için sadeleştir
  function normalize(text) {
    return String(text || "")
      .toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");
  }

  // Seçilen kararın kategorisini belirle
  function detectCategory(text) {

    const value = normalize(text);

    if (
      value.includes("su tasarruf") ||
      value.includes("su geri donus") ||
      value.includes("su depola") ||
      value.includes("damla sulama") ||
      value.includes("su yonet")
    ) return "water";

    if (
      value.includes("agac") ||
      value.includes("orman") ||
      value.includes("yesil alan") ||
      value.includes("yuksek bitki") ||
      value.includes("yangin onle")
    ) return "forest";

    if (
      value.includes("kiyi koruma") ||
      value.includes("set insa") ||
      value.includes("deniz duvari") ||
      value.includes("tasgin koruma") ||
      value.includes("kiyi bariyer")
    ) return "coast";

    if (
      value.includes("temiz enerji") ||
      value.includes("yenilenebilir") ||
      value.includes("gunes enerj") ||
      value.includes("ruzgar enerj") ||
      value.includes("elektrikli") ||
      value.includes("karbon emisyon")
    ) return "energy";

    if (
      value.includes("tarim") ||
      value.includes("toprak") ||
      value.includes("gida uret") ||
      value.includes("sulama")
    ) return "agriculture";

    if (
      value.includes("buzul") ||
      value.includes("kutup") ||
      value.includes("buz kayb")
    ) return "polar";

    return null;
  }

  // Kararın grafik verilerine etkisini kaydet
  function applyDecision(text) {

    const category = detectCategory(text);

    if (!category) {
      console.log("Bu karar için tanımlı iklim etkisi bulunamadı.");
      return;
    }

    effects[category].forEach(effect => {

      const key = effect.region + "|" + effect.metric;

      accumulated[key] = Math.max(
        -30,
        accumulated[key] + effect.amount
      );
    });

    console.log("İklim kararı uygulandı:", category);

    updateVisibleChart();
  }

  // Açık olan grafiği güncelle
  function updateVisibleChart() {

    const information = document.getElementById("regionInformation");
    if (!information) return;

    const selected = document.querySelector(
      "#climateWorld .region.active"
    );

    if (!selected) return;

    const region = selected.dataset.region;

    const chart = information.querySelector(".climate-chart-card");
    if (!chart) return;

    const metrics = chart.querySelectorAll(".trend-item");

    metrics.forEach(item => {

      const title = item.querySelector(".trend-title");
      if (!title) return;

      const key = region + "|" + title.textContent;
      const adjustment = accumulated[key] || 0;

      const columns = item.querySelectorAll(".trend-column");

      columns.forEach((column, index) => {

        const number = column.querySelector(".trend-value");
        const bar = column.querySelector(".trend-bar");

        if (!number || !bar) return;

        // İlk grafik değerini yalnızca bir kez kaydet
        if (!number.dataset.baseValue) {
          number.dataset.baseValue = number.textContent;
        }

        const base = Number(number.dataset.baseValue);

        if (!Number.isFinite(base)) return;

        // Etki zaman ilerledikçe artar
        const progress = index / 3;

        const newValue = Math.max(
          0,
          Math.min(100, Math.round(base + adjustment * progress))
        );

        number.textContent = newValue;
        bar.style.height = newValue + "%";
      });
    });

    let note = chart.querySelector(".decision-effect-note");

    if (!note) {
      note = document.createElement("p");
      note.className = "decision-effect-note";
      note.style.cssText = `
        margin-top:14px;
        color:#9ed9aa;
        font-size:11px;
        line-height:1.5;
      `;
      chart.appendChild(note);
    }

    const hasEffect = metrics.length > 0 &&
      Array.from(metrics).some(item => {
        const title = item.querySelector(".trend-title");
        return title &&
          (accumulated[region + "|" + title.textContent] || 0) !== 0;
      });

    note.textContent = hasEffect
      ? "🌱 Oyuncunun kararları bu bölgenin gelecek dönem iklim göstergelerini etkiliyor."
      : "Karar etkileri uygulandığında bu grafik güncellenecek.";
  }

  // Bölge değiştiğinde birikmiş etkileri grafiğe uygula
  const map = document.querySelector("#climateWorld .world-map");

  if (map) {
    map.addEventListener("click", function (event) {
      if (!event.target.closest(".region")) return;

      setTimeout(updateVisibleChart, 50);
    });
  }

  // Oyuncunun seçenek tıklamasını takip et
  document.addEventListener("click", function (event) {

    const button = event.target.closest("#choices button");

    if (!button) return;

    const decisionText = button.textContent.trim();

    if (!decisionText) return;

    applyDecision(decisionText);

  }, true);

  console.log("Kararların iklim etkisi sistemi hazır!");

})();

function showRegionSelection() {
  const heroContent = document.querySelector(".hero-layout");
  const selection = document.getElementById("regionSelection");

  if (heroContent) {
    heroContent.style.display = "none";
  }

  if (selection) {
    selection.classList.remove("hidden");
    selection.style.display = "block";
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

/* =========================================
   20. OYUNCU PERFORMANS VE BAŞARI ÖZETİ
========================================= */

(function () {

  function createPerformanceSummary() {

    const totalDecisions = decisionHistory.length;

    const positiveDecisions = decisionHistory.filter(
      decision => decision.score > 0
    ).length;

    const resourceNames = {
      water: "Su",
      food: "Gıda",
      energy: "Enerji",
      population: "Nüfus"
    };

    const resourceIcons = {
      water: "💧",
      food: "🌾",
      energy: "⚡",
      population: "👥"
    };

    const keys = ["water", "food", "energy", "population"];

    let bestResource = keys[0];

    keys.forEach(key => {
      if (resources[key] > resources[bestResource]) {
        bestResource = key;
      }
    });

    const finalScore = calculateFinalScore();

    return `
      <div id="performanceSummary"
      style="
        margin:25px 0;
        padding:22px;
        border-radius:18px;
        background:linear-gradient(135deg,#102d27,#1c493b);
        color:white;
        box-shadow:0 8px 25px rgba(0,0,0,0.2);
      ">

        <h2 style="text-align:center;margin-bottom:20px;">
          🏆 OYUNCU PERFORMANS ÖZETİ
        </h2>

        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
          gap:14px;
        ">

          <div style="background:#ffffff18;padding:16px;border-radius:12px;text-align:center;">
            <div style="font-size:28px;">🎯</div>
            <div style="font-size:25px;font-weight:bold;">
              ${totalDecisions}
            </div>
            <div>Toplam Karar</div>
          </div>

          <div style="background:#ffffff18;padding:16px;border-radius:12px;text-align:center;">
            <div style="font-size:28px;">✅</div>
            <div style="font-size:25px;font-weight:bold;">
              ${positiveDecisions}
            </div>
            <div>Olumlu Karar</div>
          </div>

          <div style="background:#ffffff18;padding:16px;border-radius:12px;text-align:center;">
            <div style="font-size:28px;">
              ${resourceIcons[bestResource]}
            </div>
            <div style="font-size:22px;font-weight:bold;">
              ${resourceNames[bestResource]}
            </div>
            <div>En Yüksek Kaynak</div>
          </div>

          <div style="background:#ffffff18;padding:16px;border-radius:12px;text-align:center;">
            <div style="font-size:28px;">🌍</div>
            <div style="font-size:25px;font-weight:bold;">
              ${finalScore}
            </div>
            <div>Başarı Puanı</div>
          </div>

        </div>

        <p style="text-align:center;margin-top:18px;color:#c8e6d5;">
          2100 yılına ulaşırken verdiğin kararlar geleceği şekillendirdi!
        </p>

      </div>
    `;
  }

  const oldFinishGame = window.finishGame;

  if (typeof oldFinishGame !== "function") {
    console.error("finishGame fonksiyonu bulunamadı.");
    return;
  }

  if (window.performanceSummaryAdded) return;
  window.performanceSummaryAdded = true;

  window.finishGame = function () {

    const result = oldFinishGame.apply(this, arguments);

    const resultText = document.getElementById("resultText");

    if (resultText) {
      const oldSummary = document.getElementById("performanceSummary");

      if (oldSummary) oldSummary.remove();

      resultText.insertAdjacentHTML(
        "beforeend",
        createPerformanceSummary()
      );
    }

    return result;
  };

})();

/* =========================================
   21. OYUNCU BAŞARI ROZETLERİ
========================================= */

(function () {

  function createAchievementBadge() {

    const score = calculateFinalScore();

    let badge;

    if (score >= 75) {
      badge = {
        icon: "🌱",
        title: "DOĞA KORUYUCUSU",
        message: "Harika! Doğayı ve kaynakları başarıyla korudun.",
        color: "#25834b"
      };
    } 
    else if (score >= 45) {
      badge = {
        icon: "🌍",
        title: "DENGE USTASI",
        message: "Dünyanın dengesini korumak için önemli adımlar attın.",
        color: "#b58b25"
      };
    } 
    else {
      badge = {
        icon: "⚠️",
        title: "İKLİM MÜCADELECİSİ",
        message: "İklim kriziyle mücadele zorlayıcıydı. Yeniden deneyebilirsin.",
        color: "#b94b3d"
      };
    }

    return `
      <div id="achievementBadge"
      style="
        margin:20px 0;
        padding:25px;
        border-radius:18px;
        text-align:center;
        color:white;
        background:linear-gradient(135deg,${badge.color},#183b30);
        box-shadow:0 8px 22px rgba(0,0,0,0.2);
        animation:badgeAppear 0.8s ease;
      ">

        <div style="font-size:48px;margin-bottom:10px;">
          ${badge.icon}
        </div>

        <div style="
          font-size:22px;
          font-weight:800;
          letter-spacing:1px;
        ">
          🏆 ${badge.title}
        </div>

        <p style="margin-top:10px;color:#ffffff;">
          ${badge.message}
        </p>

        <div style="
          margin-top:12px;
          display:inline-block;
          padding:7px 18px;
          border:1px solid #ffffff80;
          border-radius:20px;
          font-size:13px;
        ">
          2100 BAŞARI ROZETİ
        </div>

      </div>
    `;
  }

  const previousFinishGame = window.finishGame;

  if (typeof previousFinishGame !== "function") {
    console.error("finishGame bulunamadı.");
    return;
  }

  if (window.achievementBadgeAdded) return;
  window.achievementBadgeAdded = true;

  const style = document.createElement("style");

  style.textContent = `
    @keyframes badgeAppear {
      from {
        opacity:0;
        transform:translateY(20px) scale(0.95);
      }
      to {
        opacity:1;
        transform:translateY(0) scale(1);
      }
    }
  `;

  document.head.appendChild(style);

  window.finishGame = function () {

    const result = previousFinishGame.apply(this, arguments);

    const summary = document.getElementById("performanceSummary");

    if (summary) {
      document.getElementById("achievementBadge")?.remove();

      summary.insertAdjacentHTML(
        "afterend",
        createAchievementBadge()
      );
    }

    return result;
  };

})();
