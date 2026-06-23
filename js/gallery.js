// Youth Football Academy - js/gallery.js
const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
    setup() {
        // Academy config parameters matching index and coaches
        const config = reactive({
            academyName: 'أكاديمية الفرسان الكروية',
            coachPhone: '+966503816644',
            whatsappNumber: '966503816644'
        });

        // Sticky Navbar scroll trigger state
        const isScrolled = ref(false);

        // Filter Categories
        const currentCategory = ref('all');
        const filterCategories = ref([
            { id: 'all', name: 'كل الصور' },
            { id: 'u8', name: 'تدريبات فئة البراعم U-8 (2015-2016)' },
            { id: 'u14', name: 'تدريبات فئة الأشبال والناشئين U-14' },
            { id: 'match', name: 'أيام المباريات والاحتفالات' }
        ]);

        // Photo Gallery high-quality database with real youth training, match, goalie, and kit items
        const photos = ref([
            {
                id: 1,
                title: 'توجيه الكابتن للبراعم بمواليد 2015',
                category: 'u8',
                image: 'https://images.pexels.com/photos/19932627/pexels-photo-19932627.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'لقطة توضح التركيز الكامل لأطفال البراعم على حركة المفاصل والكرة أثناء تمارين الإحماء الخفيف.'
            },
            {
                id: 2,
                title: 'مباراة ودية في ملعب النخبة المغلق',
                category: 'match',
                image: 'https://images.pexels.com/photos/36702030/pexels-photo-36702030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'حماس وندية ومنافسة شريفة بين أبطال الأكاديمية تحت الأضواء الكاشفة في ملعبنا الآمن والمحمي.'
            },
            {
                id: 3,
                title: 'تطوير السرعة والتناسق العصبي بمواليد 2011',
                category: 'u14',
                image: 'https://images.pexels.com/photos/22794451/pexels-photo-22794451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'تطبيق عملي لتمارين الرشاقة العضلية العصبية باستخدام الأقماع التخصصية والأدوات الاحترافية.'
            },
            {
                id: 4,
                title: 'احتفال الفوز وبناء روح الفريق الواحد',
                category: 'match',
                image: 'https://images.pexels.com/photos/10347862/pexels-photo-10347862.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'أبطال الأكاديمية يظهرون الروح الجماعية واللحمة والابتهاج عقب إنهاء التدريبات السلوكية الجماعية.'
            },
            {
                id: 5,
                title: 'التحكم بالكرة ودقة التمرير الفردي U-8',
                category: 'u8',
                image: 'https://images.pexels.com/photos/17955725/pexels-photo-17955725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'دورة تأسيسية في قيادة الكرة وتغيير الاتجاه باستخدام القدمين بكل يسر وسهولة للبراعم.'
            },
            {
                id: 6,
                title: 'التجمع الفني والتخطيط الذهني للفريق المدافع',
                category: 'u14',
                image: 'https://images.pexels.com/photos/30726603/pexels-photo-30726603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'الناشئون يتعلمون الوقوف الدفاعي السليم وتوزيع المهام الجماعية على الملعب تحت إشراف الطاقم التدريبي.'
            },
            {
                id: 7,
                title: 'الحفاظ على توازن البراعم من الصفر',
                category: 'u8',
                image: 'https://images.pexels.com/photos/13558754/pexels-photo-13558754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'تمرينات الاستطالة والارتكاز وتطوير أوتار المفاصل للأطفال لتفادي الإصابات الشائعة.'
            },
            {
                id: 8,
                title: 'عناق النصر والبهجة الكروية',
                category: 'match',
                image: 'https://images.pexels.com/photos/29388532/pexels-photo-29388532.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'فريق الفرسان يحتفي بإنجاز أسبوع تدريبي متكامل بكل ود ومحبة وبناء شخصية سلوكية متينة.'
            },
            {
                id: 9,
                title: 'الارتماء والتصدي الحاسم لحارس المرمى',
                category: 'match',
                image: 'https://images.pexels.com/photos/38075056/pexels-photo-38075056.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
                desc: 'تطبيق عملي لتمارين الارتماء وسرعة رد الفعل لحراس مرمى الأكاديمية تحت تدريب مدرب الحراس الكابتن فيصل.'
            }
        ]);

        // Computed reactive filter for category tabs
        const filteredPhotos = computed(() => {
            if (currentCategory.value === 'all') {
                return photos.value;
            }
            return photos.value.filter(photo => photo.category === currentCategory.value);
        });

        const setCategory = (catId) => {
            currentCategory.value = catId;
        };

        // WhatsApp call-to-action link helper with customized photo gallery text
        const getWhatsAppLink = (customText = '') => {
            const defaultText = 'مرحباً كابتن أحمد، أود حجز موعد لتقييم ابني المجاني في أكاديمية التأسيس الكروي بعد مشاهدة ألبوم الصور الرائع للأكاديمية.';
            const textToUse = customText || defaultText;
            return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textToUse)}`;
        };

        // Phone calling link helper
        const getPhoneCallLink = () => {
            return `tel:${config.coachPhone}`;
        };

        onMounted(() => {
            // Navbar transition listener
            window.addEventListener('scroll', () => {
                isScrolled.value = window.scrollY > 50;
            });

            // Initialize AOS (Animate on scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    easing: 'ease-out-cubic',
                    once: true,
                    mirror: false
                });
            }

            // Initialize Fancybox for smooth full-screen modal preview
            if (typeof Fancybox !== 'undefined') {
                Fancybox.bind("[data-fancybox='gallery']", {
                    loop: true,
                    buttons: [
                        "zoom",
                        "slideShow",
                        "fullScreen",
                        "close"
                    ],
                    transitionEffect: "fade",
                    transitionDuration: 500
                });
            }
        });

        return {
            config,
            isScrolled,
            currentCategory,
            filterCategories,
            filteredPhotos,
            setCategory,
            getWhatsAppLink,
            getPhoneCallLink
        };
    }
}).mount('#app');
