document.addEventListener('DOMContentLoaded', () => {

    // 1. Efek Scroll pada Navbar (Ubah latar belakang saat di-scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Toggle Hamburger Menu (Mobile Navigation)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Tutup menu mobile ketika salah satu link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Highlight Nav Link sesuai section yang aktif (Active Link on Scroll)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Animasi Element Appear-on-Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // 5. Animasi Counter Angka Statistik
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Semakin kecil semakin cepat
            const count = +counter.innerText;

            const updateCount = () => {
                const targetValue = +counter.getAttribute('data-target');
                const currentValue = +counter.innerText;
                const increment = Math.ceil(targetValue / speed);

                if (currentValue < targetValue) {
                    counter.innerText = currentValue + increment;
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = targetValue;
                }
            };

            updateCount();
        });
    };

    // Jalankan counter hanya ketika section stats terlihat di layar
    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            startCounters();
            counted = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 6. Penanganan Form Kontak Interaktif
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Mengubah status tombol menjadi proses loading
        submitBtn.disabled = true;
        submitBtn.innerText = 'Mengirim...';

        // Simulasi pengiriman data (delay 1.5 detik)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Kirim Pesan';
            
            formFeedback.innerText = '✨ Pesan Anda berhasil terkirim!';
            formFeedback.style.color = '#10b981';

            // Reset form
            contactForm.reset();

            // Hapus pesan feedback setelah 4 detik
            setTimeout(() => {
                formFeedback.innerText = '';
            }, 4000);
        }, 1500);
    });
});