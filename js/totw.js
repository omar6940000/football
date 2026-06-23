// Youth Football Academy - js/totw.js
const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
    setup() {
        // Academy configuration matching rest of site
        const config = reactive({
            academyName: 'أكاديمية الفرسان الكروية',
            coachPhone: '+966503816644',
            whatsappNumber: '966503816644'
        });

        // Sticky Navbar scroll state
        const isScrolled = ref(false);

        // Active Age-Group Tab state
        const activeTab = ref('group1');
        const ageGroupTabs = ref([
            { id: 'group1', name: 'البراعم U-8 (2015-2016)' },
            { id: 'group2', name: 'الأشبال U-12 (2012-2014)' },
            { id: 'group3', name: 'الناشئين U-16 (2009-2011)' }
        ]);

        // Squads Mock Database with Starting XI positioned accurately using coordinate percentages
        const squads = reactive({
            group1: {
                coachNotes: 'أبهرني هؤلاء البراعم هذا الأسبوع بتطبيقهم الرائع لتمارين الرشاقة، والتمرير القصير السريع في المساحات الضيقة على ملعبنا التدريبي. التركيز كان استثنائياً، والتوافق العضلي العصبي يتقدم بخطى متسارعة.',
                formation: '4-3-3',
                startingXI: [
                    { id: 1, name: 'سلطان فهد', position: 'ST', rating: 94, title: 'القطار السريع 🚄', top: '16%', left: '50%', image: 'https://images.pexels.com/photos/31172906/pexels-photo-31172906.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 2, name: 'عمر ناصر', position: 'LW', rating: 92, title: 'الأعصار الصغير ⚡', top: '22%', left: '20%', image: 'https://images.pexels.com/photos/37455467/pexels-photo-37455467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 3, name: 'نواف عبيد', position: 'RW', rating: 91, title: 'المراوغ الموهوب 🪄', top: '22%', left: '80%', image: 'https://images.pexels.com/photos/9040074/pexels-photo-9040074.png?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 4, name: 'خالد صالح', position: 'LCM', rating: 89, title: 'مهندس المحور 🧠', top: '44%', left: '25%', image: 'https://images.pexels.com/photos/8395504/pexels-photo-8395504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 5, name: 'عبد المحسن', position: 'CM', rating: 90, title: 'الرئة الذهبية 🫁', top: '48%', left: '50%', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 6, name: 'بدر فيصل', position: 'RCM', rating: 88, title: 'الموسيقار 🎻', top: '44%', left: '75%', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 7, name: 'فهد العاصم', position: 'LB', rating: 86, title: 'الظهير الطائر 🦅', top: '65%', left: '15%', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 8, name: 'سلمان معاذ', position: 'LCB', rating: 89, title: 'الصخرة الصماء 🪨', top: '69%', left: '38%', image: 'https://images.pexels.com/photos/36985746/pexels-photo-36985746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 9, name: 'راكان حامد', position: 'RCB', rating: 87, title: 'الرادار 🛰️', top: '69%', left: '62%', image: 'https://images.pexels.com/photos/12468166/pexels-photo-12468166.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 10, name: 'مشاري سعد', position: 'RB', rating: 85, title: 'الدبابة 🛡️', top: '65%', left: '85%', image: 'https://images.pexels.com/photos/13558754/pexels-photo-13558754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 11, name: 'فيصل أحمد', position: 'GK', rating: 93, title: 'جدار برلين 🧱', top: '85%', left: '50%', image: 'https://images.pexels.com/photos/38075056/pexels-photo-38075056.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' }
                ],
                bench: [
                    { id: 12, name: 'يزيد نايف', position: 'ST', rating: 84, title: 'البديل الذهبي ⚽', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 13, name: 'مساعد خالد', position: 'CM', rating: 83, title: 'الجندي المجهول ⚔️', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 14, name: 'عبد الإله', position: 'CB', rating: 81, title: 'صمام الأمان 🔒', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' }
                ]
            },
            group2: {
                coachNotes: 'تميز خط الوسط هذا الأسبوع في الاستحواذ والتدرج السليم بالكرة من الدفاع للهجوم. ركزنا في الملعب الرئيسي على الضغط العكسي اللحظي فور فقدان الكرة للحد من الهجمات الارتدادية.',
                formation: '4-3-3',
                startingXI: [
                    { id: 15, name: 'عبد الرحمن الحصان', position: 'ST', rating: 92, title: 'المقنع 🎭', top: '16%', left: '50%', image: 'https://images.pexels.com/photos/37455467/pexels-photo-37455467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 16, name: 'نايف فيصل', position: 'LW', rating: 89, title: 'المحارب الصغير ⚔️', top: '22%', left: '20%', image: 'https://images.pexels.com/photos/9040074/pexels-photo-9040074.png?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 17, name: 'سلمان الغامدي', position: 'RW', rating: 90, title: 'الغزال الأسمر 🦌', top: '22%', left: '80%', image: 'https://images.pexels.com/photos/31172906/pexels-photo-31172906.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 18, name: 'تميم فهد', position: 'LCM', rating: 88, title: 'الموزع اللاسلكي 📶', top: '44%', left: '25%', image: 'https://images.pexels.com/photos/8395504/pexels-photo-8395504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 19, name: 'ريان الودعاني', position: 'CM', rating: 89, title: 'مايسترو الدائرة 🎻', top: '48%', left: '50%', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 20, name: 'خالد اليوسف', position: 'RCM', rating: 87, title: 'المقاتل الصامت 🤫', top: '44%', left: '75%', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 21, name: 'أنس المطيري', position: 'LB', rating: 85, title: 'الصاروخ الأرضي 🚀', top: '65%', left: '15%', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 22, name: 'ياسر العتيبي', position: 'LCB', rating: 89, title: 'البرج الحارس 🗼', top: '69%', left: '38%', image: 'https://images.pexels.com/photos/36985746/pexels-photo-36985746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 23, name: 'زياد الحربي', position: 'RCB', rating: 88, title: 'المقص ✂️', top: '69%', left: '62%', image: 'https://images.pexels.com/photos/12468166/pexels-photo-12468166.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 24, name: 'فواز عبيد', position: 'RB', rating: 86, title: 'الدفاع الفولاذي 🔩', top: '65%', left: '85%', image: 'https://images.pexels.com/photos/13558754/pexels-photo-13558754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 25, name: 'جهاد السليم', position: 'GK', rating: 91, title: 'الأخطبوط 🐙', top: '85%', left: '50%', image: 'https://images.pexels.com/photos/38075056/pexels-photo-38075056.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' }
                ],
                bench: [
                    { id: 26, name: 'مازن الشمري', position: 'GK', rating: 83, title: 'حارس المستقبل 🧤', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 27, name: 'حاتم المطوع', position: 'ST', rating: 85, title: 'القناص الخفي 🎯', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 28, name: 'سعود الجبر', position: 'CM', rating: 82, title: 'الدينامو 🔋', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' }
                ]
            },
            group3: {
                coachNotes: 'انضباط تكتيكي منقطع النظير ووعي تكتيكي عالٍ ظهر في المباراة التطبيقية. بناء الهجمات من الخلف كان منظماً ودقيقاً بفضل تقارب الخطوط وتحركات المهاجمين الفعالة لاستلام وتدوير الكرة.',
                formation: '4-3-3',
                startingXI: [
                    { id: 29, name: 'عبد الله السديري', position: 'ST', rating: 95, title: 'البرق الخاطف ⚡', top: '16%', left: '50%', image: 'https://images.pexels.com/photos/37455467/pexels-photo-37455467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 30, name: 'فهد العنزي', position: 'LW', rating: 91, title: 'الساحر الماكر 🪄', top: '22%', left: '20%', image: 'https://images.pexels.com/photos/9040074/pexels-photo-9040074.png?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 31, name: 'أحمد الرويلي د', position: 'RW', rating: 92, title: 'القناص المدمر 🎯', top: '22%', left: '80%', image: 'https://images.pexels.com/photos/31172906/pexels-photo-31172906.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 32, name: 'مشعل العتيبي', position: 'LCM', rating: 89, title: 'المهندس الفني 🧠', top: '44%', left: '25%', image: 'https://images.pexels.com/photos/8395504/pexels-photo-8395504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 33, name: 'عبد الإله طارق', position: 'CM', rating: 93, title: 'صمام المحرك ⚙️', top: '48%', left: '50%', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 34, name: 'متعب الحربي', position: 'RCM', rating: 90, title: 'المقاتل المدرع 🛡️', top: '44%', left: '75%', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 35, name: 'بندر العنزي', position: 'LB', rating: 88, title: 'الطلقة الحرة 🏹', top: '65%', left: '15%', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 36, name: 'عاصم اليوسف', position: 'LCB', rating: 91, title: 'الصخرة الفولاذية 🧱', top: '69%', left: '38%', image: 'https://images.pexels.com/photos/36985746/pexels-photo-36985746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 37, name: 'سلطان الحربي', position: 'RCB', rating: 90, title: 'الرادار الحديدي 🛰️', top: '69%', left: '62%', image: 'https://images.pexels.com/photos/12468166/pexels-photo-12468166.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 38, name: 'تركي الشمري', position: 'RB', rating: 89, title: 'الظهير المقاتل 🦾', top: '65%', left: '85%', image: 'https://images.pexels.com/photos/13558754/pexels-photo-13558754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' },
                    { id: 39, name: 'يوسف فيصل', position: 'GK', rating: 94, title: 'السد العالي 🧱', top: '85%', left: '50%', image: 'https://images.pexels.com/photos/38075056/pexels-photo-38075056.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150' }
                ],
                bench: [
                    { id: 40, name: 'محمد ناصر', position: 'ST', rating: 86, title: 'القناص اللحظي 🎯', image: 'https://images.pexels.com/photos/37383526/pexels-photo-37383526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 41, name: 'سعد المطيري', position: 'CM', rating: 85, title: 'الرادار الذكي 🛰️', image: 'https://images.pexels.com/photos/37383520/pexels-photo-37383520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' },
                    { id: 42, name: 'وليد الدوسري', position: 'CB', rating: 84, title: 'قفل المنطقة 🔒', image: 'https://images.pexels.com/photos/37383524/pexels-photo-37383524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100' }
                ]
            }
        });

        // Computed values based on Active Tab
        const activeSquad = computed(() => {
            return squads[activeTab.value];
        });

        const setTab = (tabId) => {
            activeTab.value = tabId;
        };

        // Select and Modal handling state for full screen cards on click
        const selectedPlayer = ref(null);
        const isModalOpen = ref(false);

        const openPlayerCard = (player) => {
            selectedPlayer.value = player;
            isModalOpen.value = true;
        };

        const closePlayerCard = () => {
            isModalOpen.value = false;
            selectedPlayer.value = null;
        };

        // Class and rating indicators matching previously designed EA FC styles
        const getRatingThemeClass = (rating) => {
            if (rating >= 90) return 'rating-legendary';
            if (rating >= 85) return 'rating-elite';
            if (rating >= 80) return 'rating-gold';
            if (rating >= 70) return 'rating-silver';
            return 'rating-bronze';
        };

        const getRatingThemeLabel = (rating) => {
            if (rating >= 90) return 'بطاقة أسطورية إصدار الفرسان الخاص ⭐️';
            if (rating >= 85) return 'بطاقة النجوم النخبة المتميزة ⚡';
            if (rating >= 80) return 'البطاقة الذهبية للتأسيس الكروي 🏆';
            if (rating >= 70) return 'البطاقة الفضية لمستوى التطوير 🥈';
            return 'بطاقة الواعدين البرونزية للتأسيس البداية 🥉';
        };

        // WhatsApp trigger link matching the squad
        const getWhatsAppLink = (customText = '') => {
            const defaultText = 'مرحباً كابتن أحمد، أود تهنئة أبطال تشكيلة الأسبوع والاستفسار عن موعد حجز تقييم مجاني لابني بالأكاديمية.';
            const textToUse = customText || defaultText;
            return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textToUse)}`;
        };

        // Dial call trigger link
        const getPhoneCallLink = () => {
            return `tel:${config.coachPhone}`;
        };

        onMounted(() => {
            // Track scrolling for Navbar color transition
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
            activeTab,
            ageGroupTabs,
            activeSquad,
            setTab,
            selectedPlayer,
            isModalOpen,
            openPlayerCard,
            closePlayerCard,
            getRatingThemeClass,
            getRatingThemeLabel,
            getWhatsAppLink,
            getPhoneCallLink
        };
    }
}).mount('#app');
