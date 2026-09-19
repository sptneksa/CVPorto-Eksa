/* =========================================================
   DEFAULT CONTENT — sumber data awal website.
   Diubah lewat CMS (admin.html), bukan dengan mengedit file ini.
   ========================================================= */
window.DEFAULT_DATA = {

  /* Data yang dipakai bersama kedua bahasa */
  shared: {
    photo: 'photo.png',
    portfolio: []
  },

  en: {
    meta: {
      brand: 'EKSA',
      title: 'Septian Eka Saputra — Radiologic Technologist & Creative Professional',
      description: 'Septian Eka Saputra — Radiologic Technologist, Data Analyst and Creative Professional. Portfolio & online CV.',
      footer: '© 2026 Septian Eka Saputra. All rights reserved.'
    },
    hero: {
      badge: 'Open to Opportunities',
      name: 'Septian Eka',
      name2: 'Saputra',
      subtitle: 'Radiologic Technologist',
      roles: ['Radiologic Technologist', 'Data Analyst', 'Creative Professional', 'Project Manager'],
      desc: 'Applied Science in Radiological Imaging Technology graduate with expertise in Radiodiagnostics, Data Analysis, and Project Management. Combining radiodiagnostic competence with technological literacy for modern radiology services.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View portfolio',
      stats: [
        { value: '3.89', label: 'GPA' },
        { value: '7+', label: 'Clinical rotations' },
        { value: '8+', label: 'Awards' }
      ],
      cards: [
        { icon: 'scan', label: 'Focus', value: 'CT-Scan & MRI' },
        { icon: 'chart', label: 'Analytics', value: 'Python & SPSS' },
        { icon: 'palette', label: 'Creative', value: 'Design & Video' }
      ]
    },
    about: {
      body: '<p>Radiology Technology graduate with comprehensive clinical internship experience in CT-Scan, MRI, and conventional radiography operations across various provincial level referral hospitals. Trained in handling high patient volumes, evidenced by participation as an X-Ray Medical Check-Up (MCU) medical team for hundreds of corporate personnel such as PT. KAI.</p>\n<p>Possesses additional technical advantages in statistical data analysis, clinical research (including neuroimaging projects), and project management. Ready to combine radiodiagnostic expertise with technological literacy to support modern radiology service efficiency.</p>',
      info: [
        { label: 'Location', value: 'Semarang, Central Java' },
        { label: 'Language', value: 'Indonesian & English' },
        { label: 'STR Status', value: 'Certified' },
        { label: 'Competency', value: 'Passed National Exam' }
      ],
      highlights: [
        { icon: 'scan', title: 'Diagnostic Imaging', desc: 'Hands-on experience with CT-Scan, MRI, and conventional radiography in national referral hospitals.' },
        { icon: 'chart', title: 'Data & Research', desc: 'Statistical data analysis, clinical research, neuroimaging, deep learning, and bibliometrics using Python, SPSS, and SmartPLS.' },
        { icon: 'palette', title: 'Creative & Multimedia', desc: 'Professional graphic design, photography, videography, and editing with Adobe Suite and other creative tools.' },
        { icon: 'briefcase', title: 'Project Management', desc: 'Leading software development projects with Agile/Scrum methodology and winning project tenders.' }
      ]
    },
    skills: [
      { name: 'Diagnostic Imaging', icon: 'scan', iconClass: 'diagnostic', tags: ['CT-Scan', 'MRI', 'Conventional Radiography', 'Image Acquisition', 'Post-Processing', 'Radiology Workflow', 'Clinical Documentation'] },
      { name: 'Data & Analytics', icon: 'chart', iconClass: 'data', tags: ['Python', 'SPSS', 'SmartPLS', 'Excel', 'RStudio', 'Data Cleaning', 'Bibliometrics', 'GIS', 'Activity-Based Costing'] },
      { name: 'Creative & Multimedia', icon: 'palette', iconClass: 'creative', tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects', 'Canva', 'CapCut', 'Photography', 'Videography', 'HiPaint'] },
      { name: 'Management & Leadership', icon: 'briefcase', iconClass: 'management', tags: ['Project Management', 'Scrum/Agile', 'Decision Making', 'Technical Pitching', 'Leadership', 'Team Coordination'] },
      { name: 'Soft Skills', icon: 'handshake', iconClass: 'soft', tags: ['Indonesian', 'English', 'Teamwork', 'Problem Solving', 'Multitasking', 'Detail-Oriented', 'Proactive Learning', 'Work Under Pressure'] }
    ],
    education: [
      { institution: 'Health Polytechnic of Ministry of Health Semarang', degree: 'Applied Bachelor — Radiological Imaging Technology', gpa: '3.89', period: 'Jul 2022 – Aug 2026', status: 'Passed National Competency Test', thesis: 'Determination of MRI Sequence Priority Based on Diagnostic Information Quality of Mesial Temporal Sclerosis Causing Epilepsy Using Analytical Hierarchy Process (AHP) Method.' }
    ],
    experience: {
      clinical: [
        { title: 'dr. Saiful Anwar General Hospital', subtitle: 'CT Scan and MRI', date: 'Jan 2026 - Feb 2026', location: 'Malang', points: ['Assisted patient preparation, positioning, scanning, image acquisition, and post-processing under clinical supervision.', 'Supported advanced MRI protocol implementation maintaining safety, accuracy, and clinical quality standards.'] },
        { title: 'Dr. Kariadi General Hospital', subtitle: 'CT Scan and MRI', date: 'Sep 2025 - Oct 2025', location: 'Semarang', points: ['Supported daily diagnostic operations for high-capacity CT-Scan and MRI modalities.', 'Managed clinical imaging workflow from patient preparation to image post-processing.', 'Implemented clinical safety protocols and strengthened cross-sectional imaging proficiency.'] },
        { title: 'dr. Haryoto General Hospital', subtitle: 'Radiology Management', date: 'Apr 2025', location: 'Lumajang', points: ['Analyzed and managed radiographic film workflow including handling, storage, and archiving.', 'Maintained department efficiency and image quality, assisting conventional X-ray and CT Scan examinations.'] },
        { title: 'Gunung Jati General Hospital', subtitle: 'CT Scan', date: 'Aug 2024', location: 'Cirebon', points: ['Assisted CT Scan and conventional radiography operations, including patient positioning, acquisition, and post-processing.'] },
        { title: 'SMC Telogorejo Hospital', subtitle: 'Contrast Radiography', date: 'May 2024 - Jun 2024', location: 'Semarang', points: ['Performed conventional X-ray imaging with and without contrast along with digital image processing with direct patient care.'] },
        { title: 'PKU Muhammadiyah Hospital', subtitle: 'Non-Contrast Radiography', date: 'Aug 2023 - Sep 2023', location: 'Yogyakarta', points: ['Assisted non-contrast conventional X-ray workflow from patient reception to positioning, acquisition, processing, and image evaluation.'] }
      ],
      professional: [
        { title: 'Software Project Manager', subtitle: 'PT Modadigi Indo Creative', date: 'Aug 2026 – Present', location: 'Hybrid', points: ['Won PT Marga Mulya Sejahtera tender through convincing technical pitching strategy.', 'Led end-to-end development of cloud-based digital attendance system, mobile daily reporting app, and landing page using Agile/Scrum.'] },
        { title: 'Lecturer Research Assistant', subtitle: 'Poltekkes Kemenkes Semarang', date: 'Jul 2026 – Present', location: 'Semarang, Hybrid', points: ['Assisted in managing and compiling data-driven documentation to optimize academic project outcomes.'] },
        { title: 'Data Analyst & Research Assistant', subtitle: 'PT Modadigi Indo Creative', date: 'Apr 2026 - Present', location: 'Semarang, Hybrid', points: ['Supported health sector research by collecting, organizing, validating, and preparing datasets.', 'Assisted statistical data analysis and interpretation for operational and evidence-based care decisions.', 'Maintained structured documentation and ensured data accuracy for research outputs.'] },
        { title: 'Postproduction Engineering', subtitle: 'PT Modadigi Indo Creative', date: 'Jul 2025 - Present', location: 'Semarang, Hybrid', points: ['Managed website operations and content for accessibility, consistency, and timely information updates.', 'Coordinated with internal team to align digital content with project needs and stakeholder expectations.'] }
      ]
    },
    projects: [
      { icon: 'stethoscope', title: 'Medical Check Up Thorax X-Ray', role: 'Medical Team — CITO Indraprasta Clinic', desc: 'Facilitated and executed mass thorax X-ray examinations for employee health medical records across various large companies.', tags: ['PT KAI — 200+', 'Bina Guna Kimia — 100+', 'LPG Semarang — 80+', 'Isuzu — 40+', 'PT Maju Bersama — 200+'], accent: 'blue' },
      { icon: 'brain', title: 'Neuroimaging Research Assistant', role: 'Research Assistant — Apr 2026 – Present', desc: 'Providing technical and methodological support for planned neuroimaging studies in 2027.', tags: ['MRI Pulse Sequences', 'Neuroimaging', 'Data Analysis'], accent: 'warm' },
      { icon: 'cpu', title: 'Deep Learning Xception — Chest X-Ray', role: 'Research Assistant — Jan 2026 – Jul 2026', desc: 'Comprehensive data analysis on thorax X-ray dataset using Python, RStudio, and SPSS.', tags: ['Python', 'RStudio', 'Deep Learning', 'Published'], accent: 'cool' },
      { icon: 'clipboard', title: 'Expansion of X-Ray Use in Health Facilities', role: 'Research Support — Jul 2025 – Dec 2025', desc: 'Supported research on the expansion of X-ray usage in primary healthcare facilities.', tags: ['Field Research', 'Primary Healthcare', 'Implementation'], accent: 'blue' },
      { icon: 'coins', title: 'Unit Cost Audit — Medical Mandiri Hospital', role: 'Project Assistant — Apr 2026', desc: 'Assisted operational audit, physical asset inventory, and Activity-Based Costing analysis.', tags: ['ABC Analysis', 'Asset Audit', 'Clinical Costing'], accent: 'warm' }
    ],
    certifications: [
      { icon: 'medal', name: 'Level 6 Radiographer Competency Certificate', issuer: 'Indonesian College of Radiographers', year: '' },
      { icon: 'globe', name: 'Indonesia China Training Course on Medical Imaging', issuer: 'Ministry of Commerce, PRC & Indonesian Ministry of Health — United Imaging', year: '2025 · Beijing, ChangZhou, Shanghai' },
      { icon: 'code', name: 'JavaScript and Node.js for JavaScript Engineer', issuer: 'Prakerja', year: '2023' },
      { icon: 'palette', name: 'Adobe Illustrator for Candidate Illustrator', issuer: 'Prakerja', year: '2023' },
      { icon: 'map', name: 'Basic Health Geographic Information System (GIS)', issuer: 'Poltekkes Kemenkes Semarang', year: '2026' },
      { icon: 'xray', name: 'CT Scan and MRI Protocol Evaluator Workshop', issuer: 'SDMK Semarang — Batch 2', year: '2026' }
    ],
    awards: [
      { icon: 'crown', title: 'General Chairman', org: 'Forum of Semarang Polytechnic Health Scientific Researcher', year: 'Jan 2024 – Jan 2025' },
      { icon: 'megaphone', title: 'Media and Information Coordinator', org: 'Radiodiagnostic and Radiotherapy Engineering Student Association', year: 'Oct 2022 – Dec 2024' },
      { icon: 'trophy', title: 'Best Student Association TRP 2024', org: 'Poltekkes Kemenkes Semarang', year: 'Jan 2025' },
      { icon: 'document', title: '1st Best Paper NHIPEC', org: 'Poltekkes Kemenkes Denpasar', year: 'Oct 2023' },
      { icon: 'camera', title: 'First Champion International Photography', org: 'IconTRAST 2023 — Poltekkes Kemenkes Semarang', year: 'Nov 2023' },
      { icon: 'film', title: '3rd International Vlog Competition', org: 'X-Ray Invention Day — Fujifilm', year: 'Nov 2022' },
      { icon: 'bulb', title: '1st Place Best Innovation DISPEN.ID', org: 'Public Works Polytechnic', year: 'Dec 2024' },
      { icon: 'frame', title: '1st Place National HKN Poster Competition', org: 'Poltekkes Kemenkes Semarang', year: 'Oct 2024' }
    ],
    contact: {
      headline: "Let's build something",
      note: 'Available for clinical, research, and creative collaboration.',
      email: 'ekaseptian354@gmail.com',
      phone: '+6285156340589',
      phoneDisplay: '+62 851 5634 0589',
      linkedin: 'linkedin.com/in/sptneksa',
      location: 'Semarang, Indonesia'
    },
    sections: {
      about:          { n: '01', tag: 'About', title: 'Getting to know me' },
      skills:         { n: '02', tag: 'Skills', title: 'What I work with' },
      education:      { n: '03', tag: 'Education', title: 'Academic background' },
      experience:     { n: '04', tag: 'Experience', title: 'Where I have worked' },
      projects:       { n: '05', tag: 'Projects', title: 'Selected projects' },
      portfolio:      { n: '06', tag: 'Portfolio', title: 'Creative works' },
      certifications: { n: '07', tag: 'Certifications', title: 'Training & credentials' },
      awards:         { n: '08', tag: 'Awards', title: 'Awards & leadership' },
      contact:        { n: '09', tag: 'Contact', title: 'Say hello' }
    },
    ui: {
      nav: { about: 'About', skills: 'Skills', education: 'Education', experience: 'Experience', projects: 'Projects', portfolio: 'Portfolio', certifications: 'Certifications', awards: 'Awards', contact: 'Contact' },
      tabs: { clinical: 'Clinical', professional: 'Professional' },
      filters: { all: 'All', desain: 'Design', foto: 'Photography', video: 'Video', ilustrasi: 'Illustration', lainnya: 'Other' },
      labels: { gpa: 'GPA', thesis: 'Thesis', loading: 'Loading', scroll: 'Scroll', emptyPortfolio: 'Portfolio will be published soon.', backToTop: 'Back to top', viewProject: 'View' }
    }
  },
  id: {
    meta: {
      brand: 'EKSA',
      title: 'Septian Eka Saputra — Radiografer & Creative Professional',
      description: 'Septian Eka Saputra — Radiografer, Data Analyst, dan Creative Professional. Portfolio & CV online.',
      footer: '© 2026 Septian Eka Saputra. Seluruh hak cipta dilindungi.'
    },
    hero: {
      badge: 'Terbuka untuk Peluang',
      name: 'Septian Eka',
      name2: 'Saputra',
      subtitle: 'Radiografer',
      roles: ['Radiografer', 'Analis Data', 'Creative Professional', 'Project Manager'],
      desc: 'Lulusan D-IV Teknologi Radiologi Pencitraan dengan keahlian di Radiodiagnostik, analisis data, dan manajemen proyek. Menggabungkan kompetensi radiodiagnostik dengan literasi teknologi untuk pelayanan radiologi modern.',
      ctaPrimary: 'Hubungi saya',
      ctaSecondary: 'Lihat portfolio',
      stats: [
        { value: '3.89', label: 'IPK' },
        { value: '7+', label: 'Rotasi klinis' },
        { value: '8+', label: 'Penghargaan' }
      ],
      cards: [
        { icon: 'scan', label: 'Fokus', value: 'CT-Scan & MRI' },
        { icon: 'chart', label: 'Analitik', value: 'Python & SPSS' },
        { icon: 'palette', label: 'Kreatif', value: 'Desain & Video' }
      ]
    },
    about: {
      body: '<p>Lulusan Teknologi Radiologi dengan pengalaman magang klinis komprehensif pada operasional CT-Scan, MRI, dan radiografi konvensional di berbagai RSUP dan RSUD tingkat provinsi. Terlatih menangani volume pasien tinggi, dibuktikan dengan partisipasi sebagai tim medis Medical Check-Up (MCU) X-Ray untuk ratusan personel korporat seperti PT. KAI.</p>\n<p>Memiliki keunggulan teknis tambahan dalam analisis data statistik, riset klinis (termasuk proyek neuroimaging), dan manajemen proyek. Siap memadukan keahlian radiodiagnostik dengan literasi teknologi untuk mendukung efisiensi pelayanan radiologi yang modern.</p>',
      info: [
        { label: 'Lokasi', value: 'Semarang, Jawa Tengah' },
        { label: 'Bahasa', value: 'Indonesia & English' },
        { label: 'Status STR', value: 'Tersertifikasi' },
        { label: 'Kompetensi', value: 'Lulus Uji Nasional' }
      ],
      highlights: [
        { icon: 'scan', title: 'Pencitraan Diagnostik', desc: 'Pengalaman langsung dengan CT-Scan, MRI, dan radiografi konvensional di rumah sakit rujukan nasional.' },
        { icon: 'chart', title: 'Data & Riset', desc: 'Analisis data statistik, riset klinis, neuroimaging, deep learning, dan bibliometrik menggunakan Python, SPSS, dan SmartPLS.' },
        { icon: 'palette', title: 'Kreatif & Multimedia', desc: 'Desain grafis, fotografi, videografi, dan editing profesional dengan Adobe Suite dan tools kreatif lainnya.' },
        { icon: 'briefcase', title: 'Manajemen Proyek', desc: 'Memimpin proyek software development dengan metodologi Agile/Scrum dan memenangkan tender proyek.' }
      ]
      },
    skills: [
      { name: 'Pencitraan Diagnostik', icon: 'scan', iconClass: 'diagnostic', tags: ['CT-Scan', 'MRI', 'Radiografi Konvensional', 'Akuisisi Citra', 'Post-Processing', 'Alur Kerja Radiologi', 'Dokumentasi Klinis'] },
      { name: 'Data & Analitik', icon: 'chart', iconClass: 'data', tags: ['Python', 'SPSS', 'SmartPLS', 'Excel', 'RStudio', 'Data Cleaning', 'Bibliometrik', 'GIS', 'Activity-Based Costing'] },
      { name: 'Kreatif & Multimedia', icon: 'palette', iconClass: 'creative', tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects', 'Canva', 'CapCut', 'Fotografi', 'Videografi', 'HiPaint'] },
      { name: 'Manajemen & Leadership', icon: 'briefcase', iconClass: 'management', tags: ['Project Management', 'Scrum/Agile', 'Decision Making', 'Technical Pitching', 'Kepemimpinan', 'Koordinasi Tim'] },
      { name: 'Soft Skills', icon: 'handshake', iconClass: 'soft', tags: ['Bahasa Indonesia', 'English', 'Teamwork', 'Problem Solving', 'Multitasking', 'Detail-Oriented', 'Proactive Learning', 'Work Under Pressure'] }
    ],
    education: [
      { institution: 'Politeknik Kesehatan Kemenkes Semarang', degree: 'Diploma IV — Teknologi Radiologi Pencitraan', gpa: '3.89', period: 'Jul 2022 – Agt 2026', status: 'Lulus Uji Kompetensi Nasional', thesis: 'Penentuan Prioritas Sekuen MRI Berdasarkan Kualitas Informasi Diagnostik Mesial Temporal Sclerosis Penyebab Epilepsi Menggunakan Metode Analytical Hierarchy Process (AHP).' }
    ],
    experience: {
      clinical: [
        { title: 'RSUD dr. Saiful Anwar', subtitle: 'CT Scan dan MRI', date: 'Jan 2026 - Feb 2026', location: 'Malang', points: ['Membantu persiapan pasien, pemosisian, pemindaian, akuisisi citra, dan post-processing citra di bawah pengawasan klinis.', 'Mendukung implementasi protokol MRI lanjutan dengan menjaga standar keselamatan, akurasi, dan kualitas klinis.'] },
        { title: 'RSUP Dr. Kariadi Semarang', subtitle: 'CT Scan dan MRI', date: 'Sep 2025 - Okt 2025', location: 'Semarang', points: ['Mendukung operasi diagnostik harian untuk modalitas CT-Scan dan MRI berkapasitas tinggi.', 'Mengelola alur kerja pencitraan klinis dari persiapan pasien hingga post-processing citra.', 'Menerapkan protokol keselamatan klinis dan memperkuat kemahiran pencitraan cross-sectional.'] },
        { title: 'RSUD dr. Haryoto Lumajang', subtitle: 'Manajemen Radiologi', date: 'Apr 2025', location: 'Lumajang', points: ['Menganalisis dan mengelola alur kerja film radiografi termasuk penanganan, penyimpanan, dan pengarsipan.', 'Menjaga efisiensi departemen dan kualitas citra, membantu pemeriksaan X-ray konvensional dan CT Scan.'] },
        { title: 'RSD Gunung Jati Kota Cirebon', subtitle: 'CT Scan', date: 'Aug 2024', location: 'Cirebon', points: ['Membantu operasional CT Scan dan radiografi konvensional, termasuk pemosisian pasien, akuisisi, dan post-processing.'] },
        { title: 'SMC RS Telogorejo Semarang', subtitle: 'Radiografi Kontras', date: 'May 2024 - Jun 2024', location: 'Semarang', points: ['Melakukan pencitraan X-ray konvensional dengan dan tanpa kontras beserta pemrosesan citra digital dengan perawatan pasien secara langsung.'] },
        { title: 'RS PKU Muhammadiyah Yogyakarta', subtitle: 'Radiografi Non-Kontras', date: 'Aug 2023 - Sep 2023', location: 'Yogyakarta', points: ['Membantu alur kerja X-ray konvensional tanpa kontras dari penerimaan pasien hingga pemosisian, akuisisi, pemrosesan, dan evaluasi citra.'] }
      ],
      professional: [
        { title: 'Software Project Manager', subtitle: 'PT Modadigi Indo Creative', date: 'Agt 2026 – Sekarang', location: 'Hybrid', points: ['Memenangkan tender PT Marga Mulya Sejahtera melalui strategi technical pitching yang meyakinkan.', 'Memimpin pengembangan end-to-end sistem kehadiran digital berbasis cloud, aplikasi pelaporan harian seluler, dan landing page menggunakan Agile/Scrum.'] },
        { title: 'Asisten Peneliti Dosen', subtitle: 'Poltekkes Kemenkes Semarang', date: 'Jul 2026 – Sekarang', location: 'Semarang, Hybrid', points: ['Membantu mengelola dan menyusun dokumentasi berbasis data untuk mengoptimalkan hasil proyek akademik.'] },
        { title: 'Analis Data & Asisten Peneliti', subtitle: 'PT Modadigi Indo Creative', date: 'Apr 2026 - Sekarang', location: 'Semarang, Hybrid', points: ['Mendukung penelitian sektor kesehatan dengan mengumpulkan, mengorganisasi, memvalidasi, dan menyiapkan dataset.', 'Membantu analisis dan interpretasi data statistik untuk keputusan operasional dan perawatan berbasis bukti.', 'Menjaga dokumentasi terstruktur dan memastikan akurasi data untuk keluaran riset.'] },
        { title: 'Postproduction Engineering', subtitle: 'PT Modadigi Indo Creative', date: 'Jul 2025 - Sekarang', location: 'Semarang, Hybrid', points: ['Mengelola operasi situs web dan konten untuk aksesibilitas, konsistensi, dan pembaruan informasi tepat waktu.', 'Koordinasi dengan tim internal menyelaraskan konten digital dengan kebutuhan proyek dan ekspektasi pemangku kepentingan.'] }
      ]
    },
    projects: [
      { icon: 'stethoscope', title: 'Medical Check Up X-Ray Thorax', role: 'Tim Medis — Klinik CITO Indraprasta', desc: 'Memfasilitasi dan melaksanakan pemeriksaan rontgen thorax massal untuk rekam medis kesehatan karyawan di berbagai perusahaan besar.', tags: ['PT KAI — 200+', 'Bina Guna Kimia — 100+', 'LPG Semarang — 80+', 'Isuzu — 40+', 'PT Maju Bersama — 200+'], accent: 'blue' },
      { icon: 'brain', title: 'Asisten Peneliti Neuroimaging', role: 'Research Assistant — Apr 2026 – Present', desc: 'Memberikan dukungan teknis dan metodologis untuk studi neuroimaging yang direncanakan tahun 2027.', tags: ['MRI Pulse Sequences', 'Neuroimaging', 'Data Analysis'], accent: 'warm' },
      { icon: 'cpu', title: 'Deep Learning Xception — Chest X-Ray', role: 'Research Assistant — Jan 2026 – Jul 2026', desc: 'Analisis data komprehensif pada dataset X-ray thorax menggunakan Python, RStudio, dan SPSS.', tags: ['Python', 'RStudio', 'Deep Learning', 'Published'], accent: 'cool' },
      { icon: 'clipboard', title: 'Perluasan Penggunaan X-Ray di Faskes', role: 'Research Support — Jul 2025 – Dec 2025', desc: 'Mendukung penelitian tentang perluasan penggunaan X-ray di fasilitas kesehatan tingkat pertama.', tags: ['Field Research', 'Primary Healthcare', 'Implementation'], accent: 'blue' },
      { icon: 'coins', title: 'Unit Cost Audit — RSU Medical Mandiri', role: 'Project Assistant — Apr 2026', desc: 'Membantu audit operasional, inventarisasi aset fisik, dan analisis Activity-Based Costing.', tags: ['ABC Analysis', 'Asset Audit', 'Clinical Costing'], accent: 'warm' }
    ],
    certifications: [
      { icon: 'medal', name: 'Sertifikat Kompetensi Radiografer Level 6', issuer: 'Kolegium Radiografer Indonesia', year: '' },
      { icon: 'globe', name: 'Indonesia China Training Course on Medical Imaging', issuer: 'Ministry of Commerce, PRC & Kemenkes RI — United Imaging', year: '2025 · Beijing, ChangZhou, Shanghai' },
      { icon: 'code', name: 'JavaScript and Node.js for JavaScript Engineer', issuer: 'Prakerja', year: '2023' },
      { icon: 'palette', name: 'Adobe Illustrator for Candidate Illustrator', issuer: 'Prakerja', year: '2023' },
      { icon: 'map', name: 'Basic Health Geographic Information System (GIS)', issuer: 'Poltekkes Kemenkes Semarang', year: '2026' },
      { icon: 'xray', name: 'Workshop Evaluator Protokol CT Scan dan MRI', issuer: 'SDMK Semarang — Angkatan 2', year: '2026' }
    ],
    awards: [
      { icon: 'crown', title: 'General Chairman', org: 'Forum of Semarang Polytechnic Health Scientific Researcher', year: 'Jan 2024 – Jan 2025' },
      { icon: 'megaphone', title: 'Koordinator Media dan Informasi', org: 'Himpunan Mahasiswa Teknik Radiodiagnostik dan Radioterapi', year: 'Okt 2022 – Des 2024' },
      { icon: 'trophy', title: 'Himpunan Mahasiswa Terbaik TRP 2024', org: 'Poltekkes Kemenkes Semarang', year: 'Jan 2025' },
      { icon: 'document', title: '1st Best Paper NHIPEC', org: 'Poltekkes Kemenkes Denpasar', year: 'Okt 2023' },
      { icon: 'camera', title: 'First Champion International Photography', org: 'IconTRAST 2023 — Poltekkes Kemenkes Semarang', year: 'Nov 2023' },
      { icon: 'film', title: '3rd International Vlog Competition', org: 'X-Ray Invention Day — Fujifilm', year: 'Nov 2022' },
      { icon: 'bulb', title: 'Juara 1 Best Innovation DISPEN.ID', org: 'Politeknik Pekerjaan Umum', year: 'Dec 2024' },
      { icon: 'frame', title: 'Juara 1 Lomba Poster Nasional HKN', org: 'Poltekkes Kemenkes Semarang', year: 'Okt 2024' }
  ],
    contact: {
      headline: 'Mari berkolaborasi',
      note: 'Terbuka untuk kolaborasi klinis, riset, dan kreatif.',
      email: 'ekaseptian354@gmail.com',
      phone: '+6285156340589',
      phoneDisplay: '+62 851 5634 0589',
      linkedin: 'linkedin.com/in/sptneksa',
      location: 'Semarang, Indonesia'
    },
    sections: {
      about:          { n: '01', tag: 'Tentang', title: 'Mengenal lebih dekat' },
      skills:         { n: '02', tag: 'Keahlian', title: 'Yang saya kuasai' },
      education:      { n: '03', tag: 'Pendidikan', title: 'Latar belakang akademik' },
      experience:     { n: '04', tag: 'Pengalaman', title: 'Rekam jejak profesional' },
      projects:       { n: '05', tag: 'Proyek', title: 'Proyek pilihan' },
      portfolio:      { n: '06', tag: 'Portfolio', title: 'Karya kreatif' },
      certifications: { n: '07', tag: 'Sertifikasi', title: 'Pelatihan & kredensial' },
      awards:         { n: '08', tag: 'Penghargaan', title: 'Penghargaan & kepemimpinan' },
      contact:        { n: '09', tag: 'Kontak', title: 'Sapa saya' }
    },
    ui: {
      nav: { about: 'Tentang', skills: 'Keahlian', education: 'Pendidikan', experience: 'Pengalaman', projects: 'Proyek', portfolio: 'Portfolio', certifications: 'Sertifikasi', awards: 'Penghargaan', contact: 'Kontak' },
      tabs: { clinical: 'Klinis', professional: 'Profesional' },
      filters: { all: 'Semua', desain: 'Desain', foto: 'Fotografi', video: 'Video', ilustrasi: 'Ilustrasi', lainnya: 'Lainnya' },
      labels: { gpa: 'IPK', thesis: 'Skripsi', loading: 'Memuat', scroll: 'Gulir', emptyPortfolio: 'Portfolio akan segera ditampilkan.', backToTop: 'Kembali ke atas', viewProject: 'Lihat' }
    }
  }
};
