// Youth Football Academy - js/coaches.js
const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
    setup() {
        // Academy configuration (identical setup to Home Page)
        const config = reactive({
            academyName: 'أكاديمية الفرسان الكروية',
            coachPhone: '+966503816644',
            whatsappNumber: '966503816644', // Coach's phone with no leading zeroes
        });

        // Sticky Navbar scroll state
        const isScrolled = ref(false);

        // Filter Categories
        const currentFilter = ref('all');
        const filterCategories = ref([
            { id: 'all', name: 'الكل' },
            { id: 'foundation', name: 'أخصائيو التأسيس' },
            { id: 'tactical', name: 'التكتيك والتطوير' },
            { id: 'goalkeeper', name: 'مدربو الحراس' }
        ]);

        // Coaches Technical Staff List with professional data details
        const coaches = ref([
            {
                id: 1,
                name: 'الكابتن / أحمد الرويلي',
                role: 'المدير الفني العام ورئيس جهاز التأسيس الكروي',
                category: 'foundation',
                image: 'https://images.pexels.com/photos/6077798/pexels-photo-6077798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
                experience: 'خبرة 10 سنوات',
                availability: 'متاح للتقييم الفوري',
                specialties: [
                    'مواليد 2015 - 2016',
                    'التوازن والتنسيق الحركي'
                ],
                credentials: [
                    'رخصة التدريب الآسيوية المعتمدة (AFC - A Licence).',
                    'دبلوم إعداد البراعم التأسيسي من الاتحاد الآسيوي لعلوم الرياضة.',
                    'مؤسس منهج "الرشاقة والذكاء اللحظي" للفئات السنية تحت 12 سنة.'
                ],
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار وحجز موعد تقييم مجاني لابني مع حضرتكم في أكاديمية الفرسان.'
            },
            {
                id: 2,
                name: 'الكابتن / معاذ الحربي',
                role: 'مدرب الفئات السنية ومسؤول تطوير المهارات الفردية',
                category: 'foundation',
                image: 'https://images.pexels.com/photos/32695885/pexels-photo-32695885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
                experience: 'خبرة 7 سنوات',
                availability: 'متاح للتسجيل',
                specialties: [
                    'مواليد 2012 - 2014',
                    'تطوير التحكم والتمرير'
                ],
                credentials: [
                    'رخصة التدريب الآسيوية الفئة (AFC - B Licence).',
                    'شهادة تدريب البراعم المعتمدة من الاتحاد السعودي لكرة القدم.',
                    'خبرة عملية سابقة في الأكاديميات الكبرى المتخصصة بالفئة السنية.'
                ],
                whatsappText: 'مرحباً كابتن معاذ، أود حجز موعد لتقييم ابني وتدريبه تحت إشرافكم في فئة مواليد 2012-2014.'
            },
            {
                id: 3,
                name: 'الكابتن / فيصل العتيبي',
                role: 'مدرب الحراس المتخصص ومسؤول رد الفعل اللحظي',
                category: 'goalkeeper',
                image: 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
                experience: 'خبرة 8 سنوات',
                availability: 'متاح للتسجيل',
                specialties: [
                    'حراسة المرمى (الأعمار 10 - 16 سنة)',
                    'سرعة رد الفعل والارتماء'
                ],
                credentials: [
                    'شهادة تدريب حراس المرمى التخصصية من الاتحاد الآسيوي.',
                    'حارس مرمى سابق في دوري الدرجة الأولى مع رصيد حافل بالبطولات.',
                    'مطور منهجية الحراسة الدفاعية والتحضير للبراعم من الصفر.'
                ],
                whatsappText: 'مرحباً كابتن فيصل، أود حجز موعد تقييم لحارس مرمى ناشئ في حصص تدريب الحراس بالأكاديمية.'
            },
            {
                id: 4,
                name: 'الكابتن / طارق الشمري',
                role: 'أخصائي التطوير البدني وبناء شخصية اللاعب الرياضية',
                category: 'tactical',
                image: 'https://images.pexels.com/photos/8744800/pexels-photo-8744800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
                experience: 'خبرة 6 سنوات',
                availability: 'متاح للتسجيل',
                specialties: [
                    'مواليد 2009 - 2011',
                    'الأحمال والتكامل البدني'
                ],
                credentials: [
                    'بكالوريوس علوم الرياضة والتربية البدنية.',
                    'رخصة التدريب الآسيوية الفئة (AFC - C Licence).',
                    'مطور برامج قياس الجهد البدني والتحمل لضمان نمو عضلي صحي للناشئين.'
                ],
                whatsappText: 'مرحباً كابتن طارق، أود حجز موعد لتقييم ابني في الفئات السنية المتقدمة من الناشئين (مواليد 2009-2011).'
            }
        ]);

        // Reactive filter computing logic
        const filteredCoaches = computed(() => {
            if (currentFilter.value === 'all') {
                return coaches.value;
            }
            return coaches.value.filter(coach => coach.category === currentFilter.value);
        });

        // Set active category filter
        const setFilter = (filterId) => {
            currentFilter.value = filterId;
        };

        // Prepares customized dynamic WhatsApp link
        const getWhatsAppLink = (customText = '') => {
            const defaultText = 'مرحباً كابتن، أود حجز موعد لتقييم ابني المجاني في أكاديمية التأسيس الكروي.';
            const textToUse = customText || defaultText;
            return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textToUse)}`;
        };

        // Call Now dialer link
        const getPhoneCallLink = () => {
            return `tel:${config.coachPhone}`;
        };

        onMounted(() => {
            // Track scrolling for Navbar color transition
            window.addEventListener('scroll', () => {
                isScrolled.value = window.scrollY > 50;
            });

            // Initialize AOS (Animate on Scroll)
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
            currentFilter,
            filterCategories,
            filteredCoaches,
            setFilter,
            getWhatsAppLink,
            getPhoneCallLink
        };
    }
}).mount('#app');
