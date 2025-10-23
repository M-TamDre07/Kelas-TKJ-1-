/* ==================================================================== */
/* SCRIPT.JS - Fungsionalitas Dasbor Modern (Diperbarui untuk Tugas Manual) */
/* ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. VARIABEL UTAMA (DOM ELEMENTS) ---
    const body = document.body;
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationModal = document.getElementById('notification-modal');
    const closeModalBtn = notificationModal ? notificationModal.querySelector('.close-btn') : null;
    
    // Tombol "Lihat" di Dasbor dan Daftar Tugas
    const viewTaskButtons = document.querySelectorAll('.view-task-btn');


    /* ==================================================================== */
    /* 2. DATA TUGAS MANUAL (ANDA AKAN MENGUBAH INI SETIAP HARI) */
    /* ==================================================================== */
    // Objek ini berisi rincian lengkap tugas. Key (kunci) harus cocok dengan data-task-id di HTML.
    const taskDetails = {
        'eng001': {
            title: 'Tugas Surat Formal & Non Formal (B. Inggris)',
            detail: 
                '**Tugas dari Pak Dian (Deadline: 24 Okt 2025):**\n\n' +
                '1. Mencari materi tentang surat.\n' +
                '2. Cari struktur dan perbedaan dari surat formal dan non formal.\n' +
                '3. Membuat surat formal dan non formal (masing-masing 1) dalam Bahasa Inggris.',
            link: '' // Tidak ada link YouTube untuk tugas ini
        },
        'hist002': {
            title: 'Tugas Rangkuman Video Sejarah Jepang (Sejarah)',
            detail: 
                '**Tugas Sejarah (Deadline: 30 Okt 2025):**\n\n' +
                '1. Tonton video YouTube berikut:\n' +
                '   Link: https://youtu.be/pttxUhB9ztQ?si=2VZ8d307Ka1mhDR5\n' +
                '2. Rangkum Poin-Poin Utama saja dari materi sejarah Jepang ke Indonesia yang disampaikan dalam video tersebut.',
            link: 'https://youtu.be/pttxUhB9ztQ?si=2VZ8d307Ka1mhDR5'
        }
    };

    /* ==================================================================== */
    /* 3. FUNGSI DARK MODE TOGGLE & INITIATION */
    /* ==================================================================== */

    // Fungsi dan inisialisasi Dark Mode (tidak berubah)
    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span class="fw-medium">Mode</span>';
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span class="fw-medium">Mode</span>';
        }
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            setDarkMode(!isDark);
        });
    }
    initTheme();


    /* ==================================================================== */
    /* 4. FUNGSI PAGE SWITCHING (NAVIGASI) */
    /* ==================================================================== */

    // Fungsi dan listener Page Switching (tidak berubah)
    const switchPage = (targetPage) => {
        navItems.forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        });

        const activeNavItem = document.querySelector(`.nav-item[data-page="${targetPage}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
            activeNavItem.setAttribute('aria-current', 'page');
        }

        contentSections.forEach(section => {
            if (section.id === `${targetPage}-content`) {
                section.style.display = 'block';
                section.setAttribute('aria-hidden', 'false');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                section.style.display = 'none';
                section.setAttribute('aria-hidden', 'true');
            }
        });
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = item.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
    switchPage('dashboard');


    /* ==================================================================== */
    /* 5. FUNGSI MODAL NOTIFIKASI */
    /* ==================================================================== */

    // Fungsi dan listener Modal Notifikasi (tidak berubah)
    if (notificationBtn && notificationModal) {
        const openModal = () => {
            notificationModal.style.display = 'flex';
            notificationBtn.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            notificationModal.style.display = 'none';
            notificationBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = 'auto';
        };

        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationModal.style.display === 'flex') {
                closeModal();
            } else {
                openModal();
            }
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === notificationModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && notificationModal.style.display === 'flex') {
                closeModal();
            }
        });
        
         // Simulasi notifikasi dibaca setelah notifikasi dibuka
         notificationBtn.addEventListener('click', () => {
             setTimeout(() => {
                notificationBtn.classList.remove('has-unread');
             }, 1000);
        });
    }

    /* ==================================================================== */
    /* 6. FUNGSI TOMBOL "LIHAT DETAIL" (MENGGUNAKAN ALERT) */
    /* ==================================================================== */

    viewTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id');
            const task = taskDetails[taskId];

            if (task) {
                const message = `
**INFORMASI TUGAS**

Mata Pelajaran: ${task.title.split('(')[1].replace(')','') || '-'}
Judul Tugas: ${task.title.split('(')[0].trim()}
-----------------------------------------------------

${task.detail}
                `;
                
                // Gunakan alert() untuk menampilkan pop-up detail tugas
                alert(message.trim());
            } else {
                alert('Detail tugas tidak ditemukan.');
            }
        });
    });

});
