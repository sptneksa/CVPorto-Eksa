/* ===== DEFAULT DATA ===== */
const DEFAULT_DATA = {
  hero: { badge:'Open to Opportunities', name:'Septian Eka', name2:'Saputra', subtitle:'Radiologic Technologist · Data Analyst · Creative Professional', desc:'Lulusan D-IV Teknologi Radiologi Pencitraan dengan keahlian di CT-Scan, MRI, analisis data, dan manajemen proyek. Menggabungkan kompetensi radiodiagnostik dengan literasi teknologi untuk pelayanan radiologi modern.' },
  skills: [
    { name:'Pencitraan Diagnostik', icon:'🏥', iconClass:'diagnostic', tags:['CT-Scan','MRI','Radiografi Konvensional','Akuisisi Citra','Post-Processing','Alur Kerja Radiologi','Dokumentasi Klinis'] },
    { name:'Data & Analitik', icon:'📊', iconClass:'data', tags:['Python','SPSS','SmartPLS','Excel','RStudio','Data Cleaning','Bibliometrik','GIS','Activity-Based Costing'] },
    { name:'Kreatif & Multimedia', icon:'🎨', iconClass:'creative', tags:['Adobe Illustrator','Adobe Photoshop','Adobe Premiere Pro','Adobe After Effects','Canva','CapCut','Fotografi','Videografi','HiPaint'] },
    { name:'Manajemen & Leadership', icon:'💼', iconClass:'management', tags:['Project Management','Scrum/Agile','Decision Making','Technical Pitching','Kepemimpinan','Koordinasi Tim'] },
    { name:'Soft Skills', icon:'🤝', iconClass:'soft', tags:['Bahasa Indonesia','English','Teamwork','Problem Solving','Multitasking','Detail-Oriented','Proactive Learning','Work Under Pressure'] }
  ],
  education: [
    { institution:'Politeknik Kesehatan Kemenkes Semarang', degree:'Diploma IV — Teknologi Radiologi Pencitraan', gpa:'3.89', period:'Jul 2022 – Agt 2026', status:'Lulus Uji Kompetensi Nasional', thesis:'Penentuan Prioritas Sekuen MRI Berdasarkan Kualitas Informasi Diagnostik Mesial Temporal Sclerosis Penyebab Epilepsi Menggunakan Metode Analytical Hierarchy Process (AHP).' }
  ],
  experience: {
    clinical: [
      { title:'RSUD dr. Saiful Anwar', subtitle:'CT Scan dan MRI', date:'Jan 2026 - Feb 2026', location:'Malang', points:['Membantu persiapan pasien, pemosisian, pemindaian, akuisisi citra, dan post-processing citra di bawah pengawasan klinis.','Mendukung implementasi protokol MRI lanjutan dengan menjaga standar keselamatan, akurasi, dan kualitas klinis.'] },
      { title:'RSUP Dr. Kariadi Semarang', subtitle:'CT Scan dan MRI', date:'Sep 2025 - Okt 2025', location:'Semarang', points:['Mendukung operasi diagnostik harian untuk modalitas CT-Scan dan MRI berkapasitas tinggi.','Mengelola alur kerja pencitraan klinis dari persiapan pasien hingga post-processing citra.','Menerapkan protokol keselamatan klinis dan memperkuat kemahiran pencitraan cross-sectional.'] },
      { title:'RSUD dr. Haryoto Lumajang', subtitle:'Manajemen Radiologi', date:'Apr 2025', location:'Lumajang', points:['Menganalisis dan mengelola alur kerja film radiografi termasuk penanganan, penyimpanan, dan pengarsipan.','Menjaga efisiensi departemen dan kualitas citra, membantu pemeriksaan X-ray konvensional dan CT Scan.'] },
      { title:'RSD Gunung Jati Kota Cirebon', subtitle:'CT Scan', date:'Aug 2024', location:'Cirebon', points:['Membantu operasional CT Scan dan radiografi konvensional, termasuk pemosisian pasien, akuisisi, dan post-processing.'] },
      { title:'SMC RS Telogorejo Semarang', subtitle:'Radiografi Kontras', date:'May 2024 - Jun 2024', location:'Semarang', points:['Melakukan pencitraan X-ray konvensional dengan dan tanpa kontras beserta pemrosesan citra digital dengan perawatan pasien secara langsung.'] },
      { title:'RS PKU Muhammadiyah Yogyakarta', subtitle:'Radiografi Non-Kontras', date:'Aug 2023 - Sep 2023', location:'Yogyakarta', points:['Membantu alur kerja X-ray konvensional tanpa kontras dari penerimaan pasien hingga pemosisian, akuisisi, pemrosesan, dan evaluasi citra.'] }
    ],
    professional: [
      { title:'Software Project Manager', subtitle:'PT Modadigi Indo Creative', date:'Agt 2026 – Sekarang', location:'Hybrid', points:['Memenangkan tender PT Marga Mulya Sejahtera melalui strategi technical pitching yang meyakinkan.','Memimpin pengembangan end-to-end sistem kehadiran digital berbasis cloud, aplikasi pelaporan harian seluler, dan landing page menggunakan Agile/Scrum.'] },
      { title:'Asisten Peneliti Dosen', subtitle:'Poltekkes Kemenkes Semarang', date:'Jul 2026 – Sekarang', location:'Semarang, Hybrid', points:['Membantu mengelola dan menyusun dokumentasi berbasis data untuk mengoptimalkan hasil proyek akademik.'] },
      { title:'Analis Data & Asisten Peneliti', subtitle:'PT Modadigi Indo Creative', date:'Apr 2026 - Sekarang', location:'Semarang, Hybrid', points:['Mendukung penelitian sektor kesehatan dengan mengumpulkan, mengorganisasi, memvalidasi, dan menyiapkan dataset.','Membantu analisis dan interpretasi data statistik untuk keputusan operasional dan perawatan berbasis bukti.','Menjaga dokumentasi terstruktur dan memastikan akurasi data untuk keluaran riset.'] },
      { title:'Postproduction Engineering', subtitle:'PT Modadigi Indo Creative', date:'Jul 2025 - Sekarang', location:'Semarang, Hybrid', points:['Mengelola operasi situs web dan konten untuk aksesibilitas, konsistensi, dan pembaruan informasi tepat waktu.','Koordinasi dengan tim internal menyelaraskan konten digital dengan kebutuhan proyek dan ekspektasi pemangku kepentingan.'] }
    ]
  },
  projects: [
    { icon:'🩺', title:'Medical Check Up X-Ray Thorax', role:'Tim Medis — Klinik CITO Indraprasta', desc:'Memfasilitasi dan melaksanakan pemeriksaan rontgen thorax massal untuk rekam medis kesehatan karyawan di berbagai perusahaan besar.', tags:['PT KAI — 200+','Bina Guna Kimia — 100+','LPG Semarang — 80+','Isuzu — 40+','PT Maju Bersama — 200+'], accent:'blue' },
    { icon:'🧠', title:'Asisten Peneliti Neuroimaging', role:'Research Assistant — Apr 2026 – Present', desc:'Memberikan dukungan teknis dan metodologis untuk studi neuroimaging yang direncanakan tahun 2027.', tags:['MRI Pulse Sequences','Neuroimaging','Data Analysis'], accent:'warm' },
    { icon:'🤖', title:'Deep Learning Xception — Chest X-Ray', role:'Research Assistant — Jan 2026 – Jul 2026', desc:'Analisis data komprehensif pada dataset X-ray thorax menggunakan Python, RStudio, dan SPSS.', tags:['Python','RStudio','Deep Learning','Published'], accent:'cool' },
    { icon:'📋', title:'Perluasan Penggunaan X-Ray di Faskes', role:'Research Support — Jul 2025 – Dec 2025', desc:'Mendukung penelitian tentang perluasan penggunaan X-ray di fasilitas kesehatan tingkat pertama.', tags:['Field Research','Primary Healthcare','Implementation'], accent:'blue' },
    { icon:'💰', title:'Unit Cost Audit — RSU Medical Mandiri', role:'Project Assistant — Apr 2026', desc:'Membantu audit operasional, inventarisasi aset fisik, dan analisis Activity-Based Costing.', tags:['ABC Analysis','Asset Audit','Clinical Costing'], accent:'warm' }
  ],
  certifications: [
    { icon:'🏅', name:'Sertifikat Kompetensi Radiografer Level 6', issuer:'Kolegium Radiografer Indonesia', year:'' },
    { icon:'🇨🇳', name:'Indonesia China Training Course on Medical Imaging', issuer:'Ministry of Commerce, PRC & Kemenkes RI — United Imaging', year:'2025 · Beijing, ChangZhou, Shanghai' },
    { icon:'💻', name:'JavaScript and Node.js for JavaScript Engineer', issuer:'Prakerja', year:'2023' },
    { icon:'🎨', name:'Adobe Illustrator for Candidate Illustrator', issuer:'Prakerja', year:'2023' },
    { icon:'🗺️', name:'Basic Health Geographic Information System (GIS)', issuer:'Poltekkes Kemenkes Semarang', year:'2026' },
    { icon:'🩻', name:'Workshop Evaluator Protokol CT Scan dan MRI', issuer:'SDMK Semarang — Angkatan 2', year:'2026' }
  ],
  awards: [
    { emoji:'👑', title:'General Chairman', org:'Forum of Semarang Polytechnic Health Scientific Researcher', year:'Jan 2024 – Jan 2025' },
    { emoji:'📣', title:'Koordinator Media dan Informasi', org:'Himpunan Mahasiswa Teknik Radiodiagnostik dan Radioterapi', year:'Okt 2022 – Des 2024' },
    { emoji:'🏆', title:'Himpunan Mahasiswa Terbaik TRP 2024', org:'Poltekkes Kemenkes Semarang', year:'Jan 2025' },
    { emoji:'📄', title:'1st Best Paper NHIPEC', org:'Poltekkes Kemenkes Denpasar', year:'Okt 2023' },
    { emoji:'📸', title:'First Champion International Photography', org:'IconTRAST 2023 — Poltekkes Kemenkes Semarang', year:'Nov 2023' },
    { emoji:'🎬', title:'3rd International Vlog Competition', org:'X-Ray Invention Day — Fujifilm', year:'Nov 2022' },
    { emoji:'💡', title:'Juara 1 Best Innovation DISPEN.ID', org:'Politeknik Pekerjaan Umum', year:'Dec 2024' },
    { emoji:'🖼️', title:'Juara 1 Lomba Poster Nasional HKN', org:'Poltekkes Kemenkes Semarang', year:'Okt 2024' }
  ],
  contact: { email:'ekaseptian354@gmail.com', phone:'+6285156340589', phoneDisplay:'+62 851 5634 0589', linkedin:'linkedin.com/in/sptneksa' }
};

window.SiteData = {
  section(key){ return JSON.parse(JSON.stringify(DEFAULT_DATA[key] || [])); },
  getPortfolio(){ return []; }
};

// Migrate old portfolio format (single file) to new (multi-file)
function migratePortfolioItem(item){
  if(item.files) return item;
  return { title:item.title, category:item.category, desc:item.desc||'', files:[{data:item.data,type:item.type,name:item.title}], date:item.date };
}

const PCats={desain:'🎨 Desain',foto:'📷 Fotografi',video:'🎬 Video',ilustrasi:'✏️ Ilustrasi',lainnya:'📁 Lainnya'};
let pFilter='all', _firstRender=true;
// Reveal class: on first render use 'reveal', after that show immediately
function rc(){ return _firstRender?'reveal':''; }

/* ===== RENDER ===== */
window.Render = {
  hero(){
    const d=SiteData.section('hero'), $=id=>document.getElementById(id);
    if($('r-hero-badge'))$('r-hero-badge').textContent=d.badge;
    if($('r-hero-name'))$('r-hero-name').textContent=d.name;
    if($('r-hero-name2'))$('r-hero-name2').textContent=d.name2;
    if($('r-hero-subtitle'))$('r-hero-subtitle').textContent=d.subtitle;
    if($('r-hero-desc'))$('r-hero-desc').textContent=d.desc;
  },
  skills(){
    const data=SiteData.section('skills'), c=document.getElementById('r-skills');
    if(!c)return;
    c.innerHTML=data.map((s,i)=>`
      <div class="skill-category ${rc()}">
        <div class="skill-category-header"><div class="skill-category-icon ${s.iconClass}">${s.icon}</div><div class="skill-category-name">${s.name}</div></div>
        <div class="skill-tags">${s.tags.map(t=>`<span class="skill-tag">${t}</span>`).join('')}</div>
        <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editSkill(${i})">✏️ Edit</button><button class="item-delete-btn" onclick="Editors.deleteSkill(${i})">🗑️</button></div>
      </div>`).join('');
  },
  education(){
    const data=SiteData.section('education'), c=document.getElementById('r-education');
    if(!c)return;
    // Support both old (object) and new (array) format
    const items=Array.isArray(data)?data:[data];
    c.innerHTML=items.map((d,i)=>`
      <div class="education-card ${rc()}">
        <div class="edu-header"><div><div class="edu-institution">${d.institution}</div><div class="edu-degree">${d.degree}</div></div>
        <div class="edu-meta"><div class="edu-gpa">${d.gpa}</div><div class="edu-gpa-label">IPK</div><div class="edu-period">${d.period}</div></div></div>
        <div class="edu-status"><span>✓</span> ${d.status}</div>
        ${d.thesis?`<div class="edu-thesis"><div class="edu-thesis-label">📄 Skripsi</div><div class="edu-thesis-text">"${d.thesis}"</div></div>`:''}
        <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editEdu(${i})">✏️ Edit</button><button class="item-delete-btn" onclick="Editors.deleteEdu(${i})">🗑️ Hapus</button></div>
      </div>`).join('')+`<button class="admin-add-btn" onclick="Editors.addEdu()">✚ Tambah Pendidikan</button>`;
  },
  experience(type){
    const exp=SiteData.section('experience'), items=exp[type]||[];
    const c=document.getElementById(`r-exp-${type}`);
    if(!c)return;
    const fn=type==='clinical'?'Clinical':'Professional';
    c.innerHTML=items.map((x,i)=>`
      <div class="timeline-item ${rc()}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header"><div><div class="timeline-title">${x.title}</div><div class="timeline-subtitle">${x.subtitle}</div></div>
          <div class="timeline-meta"><span class="timeline-date">📅 ${x.date}</span><span class="timeline-location">📍 ${x.location}</span></div></div>
          <div class="timeline-desc"><ul>${x.points.map(p=>`<li>${p}</li>`).join('')}</ul></div>
          <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editExp${fn}(${i})">✏️</button><button class="item-delete-btn" onclick="Editors.deleteExp${fn}(${i})">🗑️</button></div>
        </div></div>`).join('')+`<button class="admin-add-btn" onclick="Editors.addExp${fn}()">✚ Tambah Pengalaman</button>`;
  },
  projects(){
    const data=SiteData.section('projects'), c=document.getElementById('r-projects');
    if(!c)return;
    c.innerHTML=data.map((p,i)=>`
      <div class="project-card ${rc()}">
        <div class="project-card-accent ${p.accent||'blue'}"></div>
        <div class="project-icon">${p.icon}</div><div class="project-title">${p.title}</div>
        <div class="project-role">${p.role}</div><div class="project-desc">${p.desc}</div>
        <div class="project-details">${(p.tags||[]).map(t=>`<span class="project-detail-tag">${t}</span>`).join('')}</div>
        <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editProject(${i})">✏️</button><button class="item-delete-btn" onclick="Editors.deleteProject(${i})">🗑️</button></div>
      </div>`).join('')+`<button class="admin-add-btn" onclick="Editors.addProject()">✚ Tambah Proyek</button>`;
  },
  portfolio(){
    const data=SiteData.getPortfolio(), c=document.getElementById('portfolio-grid'), emp=document.getElementById('portfolio-empty');
    if(!c)return;
    const filtered=pFilter==='all'?data:data.filter(x=>x.category===pFilter);
    c.querySelectorAll('.portfolio-item').forEach(el=>el.remove());
    if(!filtered.length){ if(emp)emp.style.display='block'; return; }
    if(emp)emp.style.display='none';
    filtered.forEach(x=>{
      const gi=data.indexOf(x), thumb=x.files&&x.files[0], el=document.createElement('div');
      const isVid=thumb&&thumb.type&&thumb.type.startsWith('video/');
      el.className='portfolio-item';
      el.innerHTML=`${isVid?`<video src="${thumb.data}" muted loop playsinline></video>`:`<img src="${thumb?thumb.data:''}" alt="${x.title}" loading="lazy">`}
        <div class="portfolio-overlay"><div class="portfolio-item-category">${PCats[x.category]||x.category}</div><div class="portfolio-item-title">${x.title}</div>
        ${x.files&&x.files.length>1?`<div style="font-size:0.7rem;opacity:0.7;margin-top:4px">📎 ${x.files.length} files</div>`:''}</div>
        <div class="item-admin-controls" onclick="event.stopPropagation()"><button class="item-edit-btn" onclick="Editors.editPortfolio(${gi})">✏️</button><button class="item-delete-btn" onclick="Editors.deletePortfolio(${gi})">🗑️</button></div>`;
      el.addEventListener('click',()=>PortfolioDetail.open(gi));
      if(isVid){const v=el.querySelector('video');el.onmouseenter=()=>v.play();el.onmouseleave=()=>{v.pause();v.currentTime=0;}}
      c.appendChild(el);
    });
  },

  certs(){
    const data=SiteData.section('certifications'), c=document.getElementById('r-certs');
    if(!c)return;
    c.innerHTML=data.map((x,i)=>`
      <div class="cert-card ${rc()}"><div class="cert-icon">${x.icon}</div>
      <div><div class="cert-name">${x.name}</div><div class="cert-issuer">${x.issuer}</div>${x.year?`<div class="cert-year">${x.year}</div>`:''}</div>
      <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editCert(${i})">✏️</button><button class="item-delete-btn" onclick="Editors.deleteCert(${i})">🗑️</button></div></div>`).join('')
      +`<button class="admin-add-btn" onclick="Editors.addCert()">✚ Tambah Sertifikasi</button>`;
  },
  awards(){
    const data=SiteData.section('awards'), c=document.getElementById('r-awards');
    if(!c)return;
    c.innerHTML=data.map((x,i)=>`
      <div class="award-card ${rc()}"><div class="award-emoji">${x.emoji}</div><div class="award-title">${x.title}</div><div class="award-org">${x.org}</div><div class="award-year">${x.year}</div>
      <div class="item-admin-controls"><button class="item-edit-btn" onclick="Editors.editAward(${i})">✏️</button><button class="item-delete-btn" onclick="Editors.deleteAward(${i})">🗑️</button></div></div>`).join('')
      +`<button class="admin-add-btn" onclick="Editors.addAward()">✚ Tambah Penghargaan</button>`;
  },
  contact(){
    const d=SiteData.section('contact'), c=document.getElementById('r-contact');
    if(!c)return;
    c.innerHTML=`<a href="mailto:${d.email}" class="contact-card"><div class="contact-icon">📧</div><div class="contact-type">Email</div><div class="contact-value">${d.email}</div></a>
      <a href="tel:${d.phone}" class="contact-card"><div class="contact-icon">📱</div><div class="contact-type">Phone</div><div class="contact-value">${d.phoneDisplay}</div></a>
      <a href="https://${d.linkedin}" target="_blank" class="contact-card"><div class="contact-icon">💼</div><div class="contact-type">LinkedIn</div><div class="contact-value">${d.linkedin}</div></a>`;
  },
  all(){ this.hero();this.skills();this.education();this.experience('clinical');this.experience('professional');this.projects();this.portfolio();this.certs();this.awards();this.contact(); }
};

/* ===== PORTFOLIO DETAIL ===== */
window.PortfolioDetail = {
  open(index){
    const items=SiteData.getPortfolio(), item=items[index];
    if(!item)return;
    document.getElementById('pd-title').textContent=item.title;
    const body=document.getElementById('pd-body');
    let html=`<div class="pd-category">${PCats[item.category]||item.category}</div>`;
    if(item.desc) html+=`<div class="pd-desc">${item.desc}</div>`;
    html+=`<div class="pd-gallery">`;
    (item.files||[]).forEach((f,fi)=>{
      const isVid=f.type&&f.type.startsWith('video/');
      html+=`<div class="pd-gallery-item" onclick="Lightbox.open({data:'${f.data.substring(0,50)}',type:'${f.type}',title:'${item.title}'});return false;" data-fi="${fi}" data-pi="${index}">
        ${isVid?`<video src="${f.data}" muted></video><div class="play-icon">▶</div>`:`<img src="${f.data}" alt="${f.name||''}">`}</div>`;
    });
    html+=`</div>`;
    if(item.date) html+=`<div class="pd-date">📅 ${new Date(item.date).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</div>`;
    html+=`<div class="pd-admin-bar"><button class="item-edit-btn" onclick="Editors.editPortfolio(${index})">✏️ Edit</button><button class="item-delete-btn" onclick="Editors.deletePortfolio(${index});PortfolioDetail.close()">🗑️ Hapus</button></div>`;
    body.innerHTML=html;
    // Re-bind gallery clicks properly
    body.querySelectorAll('.pd-gallery-item').forEach(el=>{
      const fi=+el.dataset.fi, pi=+el.dataset.pi;
      el.onclick=()=>{
        const p=SiteData.getPortfolio()[pi];
        if(p&&p.files[fi]) Lightbox.open({data:p.files[fi].data, type:p.files[fi].type, title:p.files[fi].name||item.title});
      };
    });
    document.getElementById('portfolio-detail').classList.add('active');
  },
  close(){ document.getElementById('portfolio-detail').classList.remove('active'); }
};

/* ===== LIGHTBOX ===== */
window.Lightbox = {
  open(item){
    const lb=document.getElementById('lightbox'),lc=document.getElementById('lightbox-content'),lt=document.getElementById('lightbox-title'),lcat=document.getElementById('lightbox-cat');
    if(!lb||!lc||!item)return;
    const isVid=item.type&&item.type.startsWith('video/');
    lc.innerHTML=isVid?`<video src="${item.data}" controls autoplay style="max-width:90vw;max-height:85vh"></video>`:`<img src="${item.data}" alt="${item.title||''}">`;
    if(lt) lt.textContent=item.title||'';
    if(lcat) lcat.textContent=PCats[item.category]||item.category||'';
    lb.classList.add('active'); document.body.style.overflow='hidden';
  },
  close(){
    const lb=document.getElementById('lightbox'),lc=document.getElementById('lightbox-content');
    if(lb) lb.classList.remove('active');
    const vid=lc?.querySelector('video'); if(vid) vid.pause();
    setTimeout(()=>{if(lc)lc.innerHTML='';},300);
    document.body.style.overflow='';
  }
};

/* ===== TOAST ===== */
window.showToast=function(msg,type='success'){
  const t=document.getElementById('toast'); if(!t)return;
  t.textContent=msg; t.className='toast show '+type;
  setTimeout(()=>t.classList.remove('show'),3000);
};

/* ===== PARTICLES ===== */
function initParticles(){
  const canvas=document.getElementById('particles-canvas'); if(!canvas)return;
  const ctx=canvas.getContext('2d'); let particles=[],mouse={x:null,y:null};
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight;} addEventListener('resize',resize); resize();
  for(let i=0;i<70;i++) particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+.5,o:Math.random()*.5+.1});
  addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;}); addEventListener('mouseout',()=>{mouse.x=null;mouse.y=null;});
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(252,74,26,${p.o})`;ctx.fill();
      for(let j=i+1;j<particles.length;j++){const dx=p.x-particles[j].x,dy=p.y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<150){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(252,74,26,${.08*(1-dist/150)})`;ctx.lineWidth=.5;ctx.stroke();}}
      if(mouse.x!==null){const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<200){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(247,183,51,${.15*(1-dist/200)})`;ctx.lineWidth=.5;ctx.stroke();}}
    }); requestAnimationFrame(draw);
  })();
}

/* ===== UI INIT ===== */
function initNavbar(){
  const nav=document.getElementById('navbar'),links=document.getElementById('nav-links'),ham=document.getElementById('hamburger');
  addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>50));
  ham?.addEventListener('click',()=>{ham.classList.toggle('active');links?.classList.toggle('open');});
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham?.classList.remove('active');links.classList.remove('open');}));
  const sections=document.querySelectorAll('section[id]');
  addEventListener('scroll',()=>{const y=scrollY+200;sections.forEach(s=>{const l=links?.querySelector(`a[href="#${s.id}"]`);if(l)l.classList.toggle('active',y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight);});});
}
function initScrollReveal(){
  const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible');}),{threshold:.1,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal:not(.visible),.timeline-item:not(.visible)').forEach(el=>obs.observe(el));
}
function initTabs(){
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    const tab=document.getElementById('tab-'+btn.dataset.tab);
    if(tab){tab.classList.add('active');tab.querySelectorAll('.timeline-item').forEach((it,i)=>{it.classList.remove('visible');setTimeout(()=>it.classList.add('visible'),i*100);});}
  }));
}
function initBackToTop(){
  const btn=document.getElementById('back-to-top');if(!btn)return;
  addEventListener('scroll',()=>btn.classList.toggle('visible',scrollY>500));
  btn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
}
function initCounters(){
  const obs=new IntersectionObserver(e=>e.forEach(en=>{
    if(!en.isIntersecting)return;const el=en.target,txt=el.textContent,num=parseFloat(txt),sfx=txt.replace(/[\d.]/g,''),isF=txt.includes('.'),start=performance.now();
    (function a(now){const p=Math.min((now-start)/1500,1),ease=1-Math.pow(1-p,3);el.textContent=(isF?(ease*num).toFixed(2):Math.floor(ease*num))+sfx;if(p<1)requestAnimationFrame(a);else el.textContent=txt;})(start);obs.unobserve(el);
  }),{threshold:.5});
  document.querySelectorAll('.stat-number').forEach(s=>obs.observe(s));
}
function initTyping(){
  const el=document.getElementById('r-hero-subtitle');if(!el)return;
  const text=el.textContent;el.textContent='';el.style.borderRight='2px solid var(--accent-blue)';
  let i=0;(function type(){if(i<text.length){el.textContent+=text.charAt(i);i++;setTimeout(type,40);}else setTimeout(()=>el.style.borderRight='none',1000);}());
}
function initHeroPhoto(){
  const photo=document.getElementById('hero-photo'),ph=document.getElementById('hero-placeholder');if(!photo)return;
  const img=new Image();
  img.onload=()=>{photo.src=img.src;photo.style.display='block';if(ph)ph.style.display='none';};
  img.onerror=()=>{const i2=new Image();i2.onload=()=>{photo.src=i2.src;photo.style.display='block';if(ph)ph.style.display='none';};i2.src='photo.png';};
  img.src='photo.jpg';
}
function initFilters(){
  document.querySelectorAll('#portfolio-filters .filter-btn').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#portfolio-filters .filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');pFilter=b.dataset.filter;Render.portfolio();
  }));
}
function checkAdminHash(){if(location.hash==='#eksa-admin'){const m=document.getElementById('login-modal');if(m)m.classList.add('active');}}
addEventListener('hashchange',checkAdminHash);

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  Render.all();
  initParticles();initNavbar();initTabs();initBackToTop();initCounters();initTyping();initHeroPhoto();initFilters();
  setTimeout(()=>{initScrollReveal();_firstRender=false;},100);
  const lb=document.getElementById('lightbox');
  if(lb){lb.addEventListener('click',e=>{if(e.target===lb)Lightbox.close();});document.getElementById('lightbox-close')?.addEventListener('click',()=>Lightbox.close());}
  document.getElementById('portfolio-detail')?.addEventListener('click',e=>{if(e.target.id==='portfolio-detail')PortfolioDetail.close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){Lightbox.close();PortfolioDetail.close();}});
});
