// Youth Football Academy - js/players.js
const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
    setup() {
        // Academy config credentials matching index and coaches
        const config = reactive({
            academyName: 'أكاديمية الفرسان الكروية',
            coachPhone: '+966503816644',
            whatsappNumber: '966503816644'
        });

        // Sticky Navbar scroll state
        const isScrolled = ref(false);

        // Core Lookup state variables
        const searchQuery = ref('');
        const isSearching = ref(true); // true = Show Search Form, false = Show FIFA Card Showcase
        const selectedPlayer = ref(null);

        // Player database with high-quality sports portrait placeholders from Pexels
        // Triple or Quadruple Arabic names of trainees born between 2009 and 2016
        const players = ref([
            {
                id: 1,
                fullName: 'عمر محمد ناصر الرويلي',
                birthYear: 2015,
                position: 'مهاجم هداف (ST)',
                rating: 94,
                title: 'الأعصار الصغير ⚡',
                image: 'https://images.pexels.com/photos/37455467/pexels-photo-37455467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار بخصوص البطل المميز (عمر محمد ناصر الرويلي) مواليد 2015 ومتابعة تفاصيل خطته التدريبية.'
            },
            {
                id: 2,
                fullName: 'عبد الرحمن خالد صالح الحربي',
                birthYear: 2012,
                position: 'صانع لعب (CAM)',
                rating: 88,
                title: 'الساحر الماكر 🪄',
                image: 'https://images.pexels.com/photos/9040074/pexels-photo-9040074.png?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار بخصوص صانع اللعب المبدع (عبد الرحمن خالد صالح الحربي) مواليد 2012 وبحث جاهزيته.'
            },
            {
                id: 3,
                fullName: 'يوسف فيصل عبد الله العتيبي',
                birthYear: 2009,
                position: 'حارس مرمى عملاق (GK)',
                rating: 83,
                title: 'جدار برلين الآمن 🛡️',
                image: 'https://images.pexels.com/photos/8395504/pexels-photo-8395504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود التحدث بخصوص حارس مرمانا الواعد (يوسف فيصل عبد الله العتيبي) مواليد 2009.'
            },
            {
                id: 4,
                fullName: 'سلطان فهد طارق الشمري',
                birthYear: 2016,
                position: 'جناح طائر (LW)',
                rating: 79,
                title: 'القطار السريع 🚄',
                image: 'https://images.pexels.com/photos/31172906/pexels-photo-31172906.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود معرفة تفاصيل تقدم الجناح السريع (سلطان فهد طارق الشمري) مواليد 2016.'
            },
            {
                id: 5,
                fullName: 'سلمان محمد معاذ الرويلي',
                birthYear: 2013,
                position: 'قلب دفاع صلب (CB)',
                rating: 72,
                title: 'الصخرة الصماء 🪨',
                image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود متابعة تقييم المدافع الصلب (سلمان محمد معاذ الرويلي) مواليد 2013.'
            },
            {
                id: 6,
                fullName: 'نايف فيصل أحمد المطيري',
                birthYear: 2014,
                position: 'محور دفاعي (CDM)',
                rating: 68,
                title: 'المحارب الصغير ⚔️',
                image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار عن البرنامج البدني المخصص للبطل (نايف فيصل أحمد المطيري) مواليد 2014.'
            },
            {
                id: 7,
                fullName: 'عبد الله طارق سلمان السديري',
                birthYear: 2010,
                position: 'مهاجم سريع (RF)',
                rating: 91,
                title: 'البرق الخاطف ⚡',
                image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار ومتابعة تدريبات (عبد الله طارق سلمان السديري) مواليد 2010 والمهارات المتقدمة.'
            },
            {
                id: 8,
                fullName: 'فهد عبد العزيز معتز العنزي',
                birthYear: 2011,
                position: 'ظهير عصري (RB)',
                rating: 81,
                title: 'الرئة الذهبية 🫁',
                image: 'https://images.pexels.com/photos/36985746/pexels-photo-36985746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
                whatsappText: 'مرحباً كابتن أحمد، أود تتبع حالة الظهير العصري (فهد عبد العزيز معتز العنزي) مواليد 2011.'
            }
        ]);

        // Space count checking condition: Live search dropdown ONLY triggers when typing at least 3 distinct names
        // (Verified by checking if space-separated parts array is >= 3 and each part contains content)
        const isQueryValidForSuggestions = computed(() => {
            const queryClean = searchQuery.value.trim();
            if (!queryClean) return false;
            const parts = queryClean.split(/\s+/);
            return parts.length >= 3 && parts[2].length >= 2;
        });

        // Computed reactive suggestions array filtering
        const suggestions = computed(() => {
            if (!isQueryValidForSuggestions.value) return [];
            
            const queryLower = searchQuery.value.toLowerCase().trim();
            return players.value.filter(player => 
                player.fullName.toLowerCase().includes(queryLower)
            );
        });

        // Trigger Suggestion Click
        const selectPlayer = (player) => {
            selectedPlayer.value = player;
            isSearching.value = false; // Triggers smooth fade out of search form & scale in of FIFA card
        };

        // Reset state back to search view
        const resetSearch = () => {
            searchQuery.value = '';
            selectedPlayer.value = null;
            isSearching.value = true;
        };

        // Determine dynamic rating theme classes
        const getRatingThemeClass = (rating) => {
            if (rating >= 90) return 'rating-legendary';
            if (rating >= 85) return 'rating-elite';
            if (rating >= 80) return 'rating-gold';
            if (rating >= 70) return 'rating-silver';
            return 'rating-bronze';
        };

        // Translate theme class to readable Arabic description
        const getRatingThemeLabel = (rating) => {
            if (rating >= 90) return 'بطاقة أسطورية إصدار الفرسان الخاص ⭐️';
            if (rating >= 85) return 'بطاقة النجوم النخبة المتميزة ⚡';
            if (rating >= 80) return 'البطاقة الذهبية للتأسيس الكروي 🏆';
            if (rating >= 70) return 'البطاقة الفضية لمستوى التطوير 🥈';
            return 'بطاقة الواعدين البرونزية للتأسيس البداية 🥉';
        };

        // Direct WhatsApp messaging template handler
        const getWhatsAppLink = (customText = '') => {
            const defaultText = 'مرحباً كابتن أحمد، أود حجز موعد لتقييم ابني المجاني في أكاديمية التأسيس الكروي بعد مشاهدة ألبوم الصور الرائع للأكاديمية.';
            const textToUse = customText || defaultText;
            return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textToUse)}`;
        };

        // Direct Phone Call hook
        const getPhoneCallLink = () => {
            return `tel:${config.coachPhone}`;
        };

        onMounted(() => {
            // Track scrolling for sticky navbar
            window.addEventListener('scroll', () => {
                isScrolled.value = window.scrollY > 50;
            });

            // Initialize AOS
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    easing: 'ease-out-cubic',
                    once: true,
                    mirror: false
                });
            }
        });

        return {
            config,
            isScrolled,
            searchQuery,
            isSearching,
            selectedPlayer,
            isQueryValidForSuggestions,
            suggestions,
            selectPlayer,
            resetSearch,
            getRatingThemeClass,
            getRatingThemeLabel,
            getWhatsAppLink,
            getPhoneCallLink
        };
    }
}).mount('#app');
