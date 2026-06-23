// Youth Football Academy - js/main.js
const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        // Academy configuration (centralized state for easy modifications)
        const config = reactive({
            academyName: 'أكاديمية الفرسان الكروية',
            academySlogan: 'التأسيس الكروي من الصفر وبناء جيل رياضي واعد',
            coachPhone: '+966503816644', // Replace with active head coach phone
            whatsappNumber: '966503816644', // Country code without leading + or 00
            googleMapsIframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115980.26477038137!2d46.73858116345915!3d24.687730000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x2727197b10294154!2z2YXYhNit2K_YqSDYp9mE2YTZg9mF2YrZgSAtINmF2YTYudioINin2YTZg9mI2LHYqSDZgdiKINin2YTYsdmK2KfYtiAtINin2YTZgdis2K_Zhw!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa', // Placeholder for Riyadh high-quality pitch
        });

        // Coach Profile Data
        const coach = reactive({
            name: 'الكابتن / أحمد الرويلي',
            title: 'المدير الفني العام وأخصائي التأسيس الرياضي للفئات السنية',
            image: 'https://images.pexels.com/photos/22794451/pexels-photo-22794451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
            status: 'متاح للتقييم المجاني',
            bio: 'حاصل على رخص تدريبية معتمدة ومتخصص في تأسيس البراعم والناشئين سلوكياً وبدنياً وتكتيكياً.',
            credentials: [
                'رخصة التدريب المعتمدة من الاتحاد الآسيوي لكرة القدم (AFC).',
                'خبرة عملية تمتد لأكثر من 8 سنوات في تطوير البراعم من الصفر.',
                'أخصائي تصميم برامج التوازن والرشاقة والتنسيق العضلي العصبي للأطفال.'
            ]
        });

        // Pitch unique features ("One single, fully equipped, and safe pitch")
        const pitchFeatures = ref([
            {
                title: 'أمان فائق ومراقبة متكاملة',
                desc: 'الملعب مغلق بالكامل بأسوار حماية لضمان سلامة المشتركين، مع نظام كاميرات مراقبة وجلسات مريحة ومحمية لأولياء الأمور لمتابعة أطفالهم أثناء التدريب.',
                icon: 'safety'
            },
            {
                title: 'أدوات تأسيس احترافية ومتطورة',
                desc: 'نستخدم أفضل المعدات الرياضية المصممة خصيصاً للفئات السنية (حواجز مرونة، كرات خفيفة الوزن تناسب المفاصل، بوابات دقة، وأدوات قياس السرعة اللحظية).',
                icon: 'tools'
            },
            {
                title: 'بناء سلوكي وشخصية رياضية',
                desc: 'لا نقتصر على تعليم ركل الكرة؛ بل نغرس قيم الالتزام، الروح الرياضية، التفكير الجماعي، والقيادة، لبناء شخصية قوية داخل الملعب وخارجه.',
                icon: 'character'
            }
        ]);

        // Reactive Stats Counters (with automatic scroll animation)
        const stats = reactive({
            heroes: { current: 0, target: 245, suffix: '+' },
            pitches: { current: 0, target: 1, suffix: ' ملعب آمن ومتكامل' },
            ages: { current: 0, target: 16, suffix: ' سنة' } // From 7 to 16
        });

        // 3 Age groups structured exactly as requested
        const groups = ref([
            {
                id: 1,
                name: 'فئة البراعم (تأسيس أساسي)',
                born: 'مواليد 2015 - 2016 (الأعمار 10 - 11 سنة وأصغر)',
                days: 'أيام الأحد والثلاثاء',
                time: 'من الساعة 4:30 مساءً حتى 6:00 مساءً',
                badge: 'التأسيس الأول',
                color: 'var(--pitch-green)',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار وحجز موعد تقييم مجاني لابني (مواليد 2015-2016) في فئة البراعم.'
            },
            {
                id: 2,
                name: 'فئة الأشبال (تطوير المهارات والتوافق)',
                born: 'مواليد 2012 - 2014 (الأعمار 12 - 14 سنة)',
                days: 'أيام الاثنين والأربعاء',
                time: 'من الساعة 5:00 مساءً حتى 6:30 مساءً',
                badge: 'مستوى تطويري',
                color: 'var(--champions-gold)',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار وحجز موعد تقييم مجاني لابني (مواليد 2012-2014) في فئة الأشبال.'
            },
            {
                id: 3,
                name: 'فئة الناشئين (تكتيك وبناء بدني متكامل)',
                born: 'مواليد 2009 - 2011 (الأعمار 15 - 17 سنة)',
                days: 'أيام السبت والخميس',
                time: 'من الساعة 6:00 مساءً حتى 7:30 مساءً',
                badge: 'مستوى متقدم وجاهزية',
                color: '#ffffff',
                whatsappText: 'مرحباً كابتن أحمد، أود الاستفسار وحجز موعد تقييم مجاني لابني (مواليد 2009-2011) في فئة الناشئين.'
            }
        ]);

        // Assessment Modal Logic
        const isModalOpen = ref(false);
        const activeModalGroup = ref(null);

        const openAssessmentModal = (group = null) => {
            activeModalGroup.value = group;
            isModalOpen.value = true;
        };

        const closeAssessmentModal = () => {
            isModalOpen.value = false;
            activeModalGroup.value = null;
        };

        // Prepares customized dynamic WhatsApp link
        const getWhatsAppLink = (customText = '') => {
            const defaultText = 'مرحباً كابتن أحمد، أود حجز موعد لتقييم ابني المجاني في أكاديمية التأسيس الكروي.';
            const textToUse = customText || defaultText;
            return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textToUse)}`;
        };

        // Navigates directly to phone call dialer
        const getPhoneCallLink = () => {
            return `tel:${config.coachPhone}`;
        };

        // Navbar Scroll state
        const isScrolled = ref(false);

        // Stats Animated Counters trigger
        let statsAnimated = false;
        const animateStats = () => {
            if (statsAnimated) return;
            statsAnimated = true;

            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                // Easing out function
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                stats.heroes.current = Math.floor(easeProgress * stats.heroes.target);
                stats.pitches.current = Math.floor(easeProgress * stats.pitches.target);
                stats.ages.current = Math.floor(easeProgress * stats.ages.target);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    stats.heroes.current = stats.heroes.target;
                    stats.pitches.current = stats.pitches.target;
                    stats.ages.current = stats.ages.target;
                }
            };

            requestAnimationFrame(step);
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

            // Swiper Hero Slider Initialization
            if (typeof Swiper !== 'undefined') {
                new Swiper('.swiper', {
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    speed: 1500,
                    allowTouchMove: false
                });
            }

            // Intersection Observer for counting stats automatically on scroll
            const statsElement = document.querySelector('.stats-section');
            if (statsElement) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });

                observer.observe(statsElement);
            }
        });

        return {
            config,
            coach,
            pitchFeatures,
            stats,
            groups,
            isModalOpen,
            activeModalGroup,
            isScrolled,
            openAssessmentModal,
            closeAssessmentModal,
            getWhatsAppLink,
            getPhoneCallLink
        };
    }
}).mount('#app');
