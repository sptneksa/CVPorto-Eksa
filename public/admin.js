/* ===== ADMIN AUTH ===== */
const Admin = {
  async login(pwd){
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        document.body.classList.add('is-admin');
        document.getElementById('login-modal').classList.remove('active');
        document.getElementById('login-password').value='';
        if(window.showToast) window.showToast('✅ Login berhasil! Mode admin aktif.');
        return true;
      }
    } catch(e) {}
    document.getElementById('login-error').style.display='block';
    return false;
  },
  async logout(){
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch(e) {}
    document.body.classList.remove('is-admin');
    if(window.showToast) window.showToast('👋 Logout berhasil');
  },
  async checkSession(){
    try {
      const res = await fetch('/api/session');
      const data = await res.json();
      if (data.loggedIn) document.body.classList.add('is-admin');
    } catch(e) {}
  },
  changePassword(){
    if(window.showToast) window.showToast('⚠️ Ganti password sekarang dikelola di sisi server (server.py)', 'error');
  }
};

/* ===== EDIT MODAL ===== */
const EditModal = {
  _onSave:null, _fileData:{}, _multiFileData:{},
  open(title,fields,onSave){
    document.getElementById('edit-modal-title').textContent=title;
    const body=document.getElementById('edit-modal-body');
    body.innerHTML=''; this._onSave=onSave; this._fileData={}; this._multiFileData={};
    fields.forEach(f=>{
      const div=document.createElement('div'); div.className='edit-field';

      if(f.type==='file'){
        div.innerHTML=`<label>${f.label}</label><div class="edit-field-file-drop" id="drop-${f.id}">📁 Klik atau drag file<input type="file" accept="${f.accept||'image/*,video/*'}" style="display:none" id="file-${f.id}"></div><img class="edit-field-preview" id="preview-${f.id}" style="display:none">`;
        body.appendChild(div);
        setTimeout(()=>{
          const drop=document.getElementById(`drop-${f.id}`),inp=document.getElementById(`file-${f.id}`),prev=document.getElementById(`preview-${f.id}`),self=this;
          drop.onclick=()=>inp.click();
          drop.ondragover=e=>{e.preventDefault();drop.classList.add('dragover');};
          drop.ondragleave=()=>drop.classList.remove('dragover');
          drop.ondrop=e=>{e.preventDefault();drop.classList.remove('dragover');if(e.dataTransfer.files[0])handle(e.dataTransfer.files[0]);};
          inp.onchange=e=>{if(e.target.files[0])handle(e.target.files[0]);};
          function handle(file){
            if(file.size>10*1024*1024){showToast('❌ File maks 10MB!','error');return;}
            const r=new FileReader();r.onload=e=>{self._fileData[f.id]={data:e.target.result,type:file.type,name:file.name};
            if(file.type.startsWith('image/')){prev.src=e.target.result;prev.style.display='block';}drop.innerHTML=`✅ ${file.name}`;};r.readAsDataURL(file);
          }
          if(f.value&&typeof f.value==='string'&&f.value.startsWith('data:')){prev.src=f.value;prev.style.display='block';self._fileData[f.id]={data:f.value,type:'image/existing'};}
        },0);
        return;
      }

      if(f.type==='multifile'){
        let files=f.value||[]; // [{data,type,name}]
        div.innerHTML=`<label>${f.label}</label><div class="multi-file-list" id="mfl-${f.id}"></div><div class="edit-field-file-drop" id="drop-${f.id}">📁 Klik atau drag file (bisa multiple)<input type="file" accept="${f.accept||'image/*,video/*'}" multiple style="display:none" id="file-${f.id}"></div>`;
        body.appendChild(div);
        const self=this;
        setTimeout(()=>{
          const list=document.getElementById(`mfl-${f.id}`),drop=document.getElementById(`drop-${f.id}`),inp=document.getElementById(`file-${f.id}`);
          function renderList(){
            list.innerHTML=files.map((fi,idx)=>{
              const isImg=fi.type&&fi.type.startsWith('image/');
              return `<div class="multi-file-item">${isImg?`<img src="${fi.data}">`:'🎬'} <span>${fi.name||'File '+(idx+1)}</span><button class="multi-file-remove" data-i="${idx}">✕</button></div>`;
            }).join('');
            list.querySelectorAll('.multi-file-remove').forEach(b=>b.onclick=()=>{files.splice(+b.dataset.i,1);renderList();});
          }
          drop.onclick=()=>inp.click();
          drop.ondragover=e=>{e.preventDefault();drop.classList.add('dragover');};
          drop.ondragleave=()=>drop.classList.remove('dragover');
          drop.ondrop=e=>{e.preventDefault();drop.classList.remove('dragover');[...e.dataTransfer.files].forEach(handleFile);};
          inp.onchange=e=>{[...e.target.files].forEach(handleFile);inp.value='';};
          function handleFile(file){
            if(file.size>10*1024*1024){showToast('❌ File maks 10MB!','error');return;}
            const r=new FileReader();r.onload=e=>{files.push({data:e.target.result,type:file.type,name:file.name});renderList();};r.readAsDataURL(file);
          }
          renderList();
          div._getFiles=()=>files; div.dataset.fieldId=f.id; div.dataset.fieldType='multifile';
        },0);
        return;
      }

      if(f.type==='tags'){
        let tags=f.value||[];
        div.innerHTML=`<label>${f.label}</label><div class="edit-tags-container" id="tags-${f.id}"></div><div style="display:flex;gap:8px"><input type="text" placeholder="Tambah tag..." id="taginput-${f.id}" style="flex:1;padding:8px 12px;background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font-main);font-size:.82rem;outline:none"><button type="button" id="tagadd-${f.id}" style="padding:8px 16px;background:var(--gradient-main);border:none;border-radius:var(--radius-sm);color:var(--bg-primary);font-weight:600;cursor:pointer">+</button></div>`;
        if(f.hint) div.innerHTML+=`<div class="field-hint">${f.hint}</div>`;
        body.appendChild(div);
        setTimeout(()=>{
          const ct=document.getElementById(`tags-${f.id}`),inp=document.getElementById(`taginput-${f.id}`),btn=document.getElementById(`tagadd-${f.id}`);
          function rt(){ct.innerHTML=tags.map((t,i)=>`<span class="edit-tag">${t}<button class="edit-tag-remove" data-i="${i}">✕</button></span>`).join('');
            ct.querySelectorAll('.edit-tag-remove').forEach(b=>b.onclick=()=>{tags.splice(+b.dataset.i,1);rt();});}
          function add(){const v=inp.value.trim();if(v&&!tags.includes(v)){tags.push(v);inp.value='';rt();}}
          btn.onclick=add; inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();add();}};
          rt(); div._getTags=()=>tags; div.dataset.fieldId=f.id; div.dataset.fieldType='tags';
        },0);
        return;
      }

      if(f.type==='select'){
        div.innerHTML=`<label>${f.label}</label><select id="field-${f.id}">${(f.options||[]).map(o=>`<option value="${o.value}"${o.value===f.value?' selected':''}>${o.label}</option>`).join('')}</select>`;
      } else if(f.type==='textarea'){
        div.innerHTML=`<label>${f.label}</label><textarea id="field-${f.id}" rows="${f.rows||3}">${f.value||''}</textarea>`;
      } else {
        div.innerHTML=`<label>${f.label}</label><input type="${f.type||'text'}" id="field-${f.id}" value="${(f.value||'').toString().replace(/"/g,'&quot;')}">`;
      }
      if(f.hint) div.innerHTML+=`<div class="field-hint">${f.hint}</div>`;
      body.appendChild(div);
    });
    document.getElementById('edit-modal').classList.add('active');
  },
  close(){ document.getElementById('edit-modal').classList.remove('active'); this._onSave=null; this._fileData={}; this._multiFileData={}; },
  getData(){
    const data={}, body=document.getElementById('edit-modal-body');
    body.querySelectorAll('.edit-field').forEach(div=>{
      if(div.dataset.fieldType==='tags'){data[div.dataset.fieldId]=div._getTags?div._getTags():[];return;}
      if(div.dataset.fieldType==='multifile'){data[div.dataset.fieldId]=div._getFiles?div._getFiles():[];return;}
      const inp=div.querySelector('input[id^="field-"],textarea[id^="field-"],select[id^="field-"]');
      if(inp){data[inp.id.replace('field-','')]=inp.value;}
    });
    Object.keys(this._fileData).forEach(k=>{data[k]=this._fileData[k].data;data[k+'_type']=this._fileData[k].type;});
    return data;
  }
};
document.getElementById('edit-modal-save').onclick=()=>{if(EditModal._onSave)EditModal._onSave(EditModal.getData());};

/* ===== EDITORS ===== */
const Editors = {
  // HERO
  hero(){
    const d=SiteData.section('hero');
    EditModal.open('✏️ Edit Hero',[
      {id:'badge',label:'Badge Text',type:'text',value:d.badge},
      {id:'name',label:'Nama (Baris 1)',type:'text',value:d.name},
      {id:'name2',label:'Nama (Baris 2, Gradient)',type:'text',value:d.name2},
      {id:'subtitle',label:'Subtitle',type:'text',value:d.subtitle},
      {id:'desc',label:'Deskripsi Singkat',type:'textarea',value:d.desc,rows:3}
    ],(data)=>{SiteData.saveSection('hero',{...d,...data});Render.hero();EditModal.close();showToast('✅ Hero diupdate!');});
  },

  // ABOUT
  about(){
    const saved=SiteData.get();
    const t1=saved.about_text1||'Lulusan Teknologi Radiologi dengan pengalaman magang klinis komprehensif pada operasional CT-Scan, MRI, dan radiografi konvensional di berbagai RSUP dan RSUD tingkat provinsi. Terlatih menangani volume pasien tinggi, dibuktikan dengan partisipasi sebagai tim medis Medical Check-Up (MCU) X-Ray untuk ratusan personel korporat seperti PT. KAI.';
    const t2=saved.about_text2||'Memiliki keunggulan teknis tambahan dalam analisis data statistik, riset klinis (termasuk proyek neuroimaging), dan manajemen proyek. Siap memadukan keahlian radiodiagnostik dengan literasi teknologi untuk mendukung efisiensi pelayanan radiologi yang modern.';
    const h1=saved.about_h1||{icon:'🏥',title:'Pencitraan Diagnostik',desc:'Pengalaman langsung dengan CT-Scan, MRI, dan radiografi konvensional di rumah sakit rujukan nasional.'};
    const h2=saved.about_h2||{icon:'📊',title:'Data & Riset',desc:'Analisis data statistik, riset klinis, neuroimaging, deep learning, dan bibliometrik.'};
    const h3=saved.about_h3||{icon:'🎨',title:'Kreatif & Multimedia',desc:'Desain grafis, fotografi, videografi, dan editing profesional.'};
    const h4=saved.about_h4||{icon:'💼',title:'Manajemen Proyek',desc:'Pengalaman memimpin proyek software development menggunakan Agile/Scrum.'};
    EditModal.open('✏️ Edit Tentang Saya',[
      {id:'about_text1',label:'Paragraf 1',type:'textarea',value:t1,rows:4},
      {id:'about_text2',label:'Paragraf 2',type:'textarea',value:t2,rows:4},
      {id:'h1_icon',label:'Highlight 1 — Icon',type:'text',value:h1.icon},
      {id:'h1_title',label:'Highlight 1 — Judul',type:'text',value:h1.title},
      {id:'h1_desc',label:'Highlight 1 — Deskripsi',type:'text',value:h1.desc},
      {id:'h2_icon',label:'Highlight 2 — Icon',type:'text',value:h2.icon},
      {id:'h2_title',label:'Highlight 2 — Judul',type:'text',value:h2.title},
      {id:'h2_desc',label:'Highlight 2 — Deskripsi',type:'text',value:h2.desc},
      {id:'h3_icon',label:'Highlight 3 — Icon',type:'text',value:h3.icon},
      {id:'h3_title',label:'Highlight 3 — Judul',type:'text',value:h3.title},
      {id:'h3_desc',label:'Highlight 3 — Deskripsi',type:'text',value:h3.desc},
      {id:'h4_icon',label:'Highlight 4 — Icon',type:'text',value:h4.icon},
      {id:'h4_title',label:'Highlight 4 — Judul',type:'text',value:h4.title},
      {id:'h4_desc',label:'Highlight 4 — Deskripsi',type:'text',value:h4.desc}
    ],(data)=>{
      const d=SiteData.get();
      d.about_text1=data.about_text1; d.about_text2=data.about_text2;
      d.about_h1={icon:data.h1_icon,title:data.h1_title,desc:data.h1_desc};
      d.about_h2={icon:data.h2_icon,title:data.h2_title,desc:data.h2_desc};
      d.about_h3={icon:data.h3_icon,title:data.h3_title,desc:data.h3_desc};
      d.about_h4={icon:data.h4_icon,title:data.h4_title,desc:data.h4_desc};
      SiteData.save(d);
      // Update DOM
      const ps=document.querySelectorAll('#r-about-text > p');
      if(ps[0])ps[0].textContent=data.about_text1; if(ps[1])ps[1].textContent=data.about_text2;
      const cards=document.querySelectorAll('#r-about-highlights .highlight-card');
      [d.about_h1,d.about_h2,d.about_h3,d.about_h4].forEach((h,i)=>{
        if(cards[i]){
          cards[i].querySelector('.highlight-icon').textContent=h.icon;
          cards[i].querySelector('.highlight-title').textContent=h.title;
          cards[i].querySelector('.highlight-desc').textContent=h.desc;
        }
      });
      EditModal.close(); showToast('✅ About diupdate!');
    });
  },

  // SKILLS
  skills(){
    const skills=SiteData.section('skills');
    EditModal.open('✏️ Edit Keahlian',skills.map((s,i)=>({id:`skill_${i}`,label:`${s.icon} ${s.name}`,type:'tags',value:[...s.tags]})),
    (data)=>{const updated=skills.map((s,i)=>({...s,tags:data[`skill_${i}`]||s.tags}));SiteData.saveSection('skills',updated);Render.skills();EditModal.close();showToast('✅ Skills diupdate!');});
  },
  editSkill(i){ this.skills(); },
  deleteSkill(i){ if(!confirm('Hapus kategori skill ini?'))return; const items=SiteData.section('skills');items.splice(i,1);SiteData.saveSection('skills',items);Render.skills();showToast('🗑️ Skill dihapus'); },

  // EDUCATION (array)
  editEdu(i){
    const items=SiteData.section('education'), data=Array.isArray(items)?items:[items], item=data[i];
    EditModal.open('✏️ Edit Pendidikan',[
      {id:'institution',label:'Institusi',type:'text',value:item.institution},
      {id:'degree',label:'Program Studi',type:'text',value:item.degree},
      {id:'gpa',label:'IPK',type:'text',value:item.gpa},
      {id:'period',label:'Periode',type:'text',value:item.period},
      {id:'status',label:'Status',type:'text',value:item.status},
      {id:'thesis',label:'Judul Skripsi (opsional)',type:'textarea',value:item.thesis||'',rows:3}
    ],(d)=>{data[i]=d;SiteData.saveSection('education',data);Render.education();EditModal.close();showToast('✅ Pendidikan diupdate!');});
  },
  deleteEdu(i){ if(!confirm('Hapus pendidikan ini?'))return;const items=SiteData.section('education'),data=Array.isArray(items)?items:[items];data.splice(i,1);SiteData.saveSection('education',data);Render.education();showToast('🗑️ Pendidikan dihapus');},
  addEdu(){
    EditModal.open('✚ Tambah Pendidikan',[
      {id:'institution',label:'Institusi',type:'text'},
      {id:'degree',label:'Program Studi',type:'text'},
      {id:'gpa',label:'IPK',type:'text'},
      {id:'period',label:'Periode',type:'text'},
      {id:'status',label:'Status',type:'text'},
      {id:'thesis',label:'Judul Skripsi (opsional)',type:'textarea',rows:3}
    ],(d)=>{const items=SiteData.section('education'),data=Array.isArray(items)?items:[items];data.push(d);SiteData.saveSection('education',data);Render.education();EditModal.close();showToast('✅ Pendidikan ditambahkan!');});
  },
  education(){ this.editEdu(0); },
  editEducation(){ this.editEdu(0); },

  // EXPERIENCE
  _expModal(type,i){
    const exp=SiteData.section('experience'),items=exp[type]||[];
    const item=i!==undefined?items[i]:{title:'',subtitle:'',date:'',location:'',points:[]};
    const isEdit=i!==undefined;
    EditModal.open(isEdit?'✏️ Edit Pengalaman':'✚ Tambah Pengalaman',[
      {id:'title',label:'Nama Institusi',type:'text',value:item.title},
      {id:'subtitle',label:'Posisi/Departemen',type:'text',value:item.subtitle},
      {id:'date',label:'Periode',type:'text',value:item.date},
      {id:'location',label:'Lokasi',type:'text',value:item.location},
      {id:'points',label:'Deskripsi (satu per baris)',type:'textarea',value:(item.points||[]).join('\n'),rows:5,hint:'Setiap baris = satu bullet point'}
    ],(data)=>{
      const exp2=SiteData.section('experience');
      const ni={title:data.title,subtitle:data.subtitle,date:data.date,location:data.location,points:data.points.split('\n').filter(p=>p.trim())};
      if(isEdit) exp2[type][i]=ni; else exp2[type].push(ni);
      SiteData.saveSection('experience',exp2);Render.experience(type);EditModal.close();
      showToast(isEdit?'✅ Pengalaman diupdate!':'✅ Pengalaman ditambahkan!');
    });
  },
  editExpClinical(i){this._expModal('clinical',i);},
  editExpProfessional(i){this._expModal('professional',i);},
  deleteExpClinical(i){if(!confirm('Hapus?'))return;const e=SiteData.section('experience');e.clinical.splice(i,1);SiteData.saveSection('experience',e);Render.experience('clinical');showToast('🗑️ Dihapus');},
  deleteExpProfessional(i){if(!confirm('Hapus?'))return;const e=SiteData.section('experience');e.professional.splice(i,1);SiteData.saveSection('experience',e);Render.experience('professional');showToast('🗑️ Dihapus');},
  addExpClinical(){this._expModal('clinical');},
  addExpProfessional(){this._expModal('professional');},

  // PROJECTS
  editProject(i){
    const items=SiteData.section('projects'),item=items[i];
    EditModal.open('✏️ Edit Proyek',[
      {id:'icon',label:'Icon (emoji)',type:'text',value:item.icon},
      {id:'title',label:'Judul',type:'text',value:item.title},
      {id:'role',label:'Peran',type:'text',value:item.role},
      {id:'desc',label:'Deskripsi',type:'textarea',value:item.desc},
      {id:'tags',label:'Tags',type:'tags',value:[...item.tags]},
      {id:'accent',label:'Accent',type:'select',value:item.accent,options:[{value:'blue',label:'Blue'},{value:'warm',label:'Warm'},{value:'cool',label:'Cool'}]}
    ],(data)=>{items[i]={icon:data.icon,title:data.title,role:data.role,desc:data.desc,tags:data.tags||[],accent:data.accent};SiteData.saveSection('projects',items);Render.projects();EditModal.close();showToast('✅ Proyek diupdate!');});
  },
  deleteProject(i){if(!confirm('Hapus proyek ini?'))return;const items=SiteData.section('projects');items.splice(i,1);SiteData.saveSection('projects',items);Render.projects();showToast('🗑️ Proyek dihapus');},
  addProject(){
    EditModal.open('✚ Tambah Proyek',[
      {id:'icon',label:'Icon (emoji)',type:'text',value:'📋'},
      {id:'title',label:'Judul',type:'text'},
      {id:'role',label:'Peran',type:'text'},
      {id:'desc',label:'Deskripsi',type:'textarea'},
      {id:'tags',label:'Tags',type:'tags',value:[]},
      {id:'accent',label:'Accent',type:'select',options:[{value:'blue',label:'Blue'},{value:'warm',label:'Warm'},{value:'cool',label:'Cool'}]}
    ],(data)=>{const items=SiteData.section('projects');items.push({icon:data.icon||'📋',title:data.title,role:data.role,desc:data.desc,tags:data.tags||[],accent:data.accent||'blue'});SiteData.saveSection('projects',items);Render.projects();EditModal.close();showToast('✅ Proyek ditambahkan!');});
  },

  // PORTFOLIO (multi-file)
  addPortfolio(){
    EditModal.open('✚ Tambah Portfolio',[
      {id:'title',label:'Judul Karya',type:'text'},
      {id:'category',label:'Kategori',type:'select',options:[
        {value:'desain',label:'🎨 Desain'},{value:'foto',label:'📷 Fotografi'},{value:'video',label:'🎬 Video'},{value:'ilustrasi',label:'✏️ Ilustrasi'},{value:'lainnya',label:'📁 Lainnya'}]},
      {id:'desc',label:'Deskripsi Karya',type:'textarea',rows:3},
      {id:'files',label:'Upload File (bisa multiple)',type:'multifile',accept:'image/*,video/*'}
    ],(data)=>{
      if(!data.title){showToast('❌ Judul wajib diisi!','error');return;}
      if(!data.files||!data.files.length){showToast('❌ Upload minimal 1 file!','error');return;}
      const items=SiteData.getPortfolio();
      items.push({title:data.title,category:data.category||'lainnya',desc:data.desc||'',files:data.files,date:new Date().toISOString()});
      try{SiteData.savePortfolio(items);}catch(e){showToast('❌ Storage penuh! Coba file lebih kecil.','error');return;}
      Render.portfolio();EditModal.close();showToast('✅ Portfolio ditambahkan!');
    });
  },
  editPortfolio(i){
    const items=SiteData.getPortfolio(),item=items[i]; if(!item)return;
    PortfolioDetail.close();
    EditModal.open('✏️ Edit Portfolio',[
      {id:'title',label:'Judul Karya',type:'text',value:item.title},
      {id:'category',label:'Kategori',type:'select',value:item.category,options:[
        {value:'desain',label:'🎨 Desain'},{value:'foto',label:'📷 Fotografi'},{value:'video',label:'🎬 Video'},{value:'ilustrasi',label:'✏️ Ilustrasi'},{value:'lainnya',label:'📁 Lainnya'}]},
      {id:'desc',label:'Deskripsi Karya',type:'textarea',value:item.desc||'',rows:3},
      {id:'files',label:'File (bisa tambah/hapus)',type:'multifile',accept:'image/*,video/*',value:item.files?[...item.files.map(f=>({...f}))]:[] }
    ],(data)=>{
      items[i]={...item,title:data.title,category:data.category,desc:data.desc||'',files:data.files||item.files};
      try{SiteData.savePortfolio(items);}catch(e){showToast('❌ Storage penuh!','error');return;}
      Render.portfolio();EditModal.close();showToast('✅ Portfolio diupdate!');
    });
  },
  deletePortfolio(i){if(!confirm('Hapus portfolio ini?'))return;const items=SiteData.getPortfolio();items.splice(i,1);SiteData.savePortfolio(items);Render.portfolio();showToast('🗑️ Portfolio dihapus');},

  // DOCUMENTATION
  addDoc(){
    EditModal.open('✚ Tambah Dokumentasi',[
      {id:'title',label:'Judul',type:'text'},
      {id:'category',label:'Kategori',type:'select',options:[
        {value:'klinis',label:'🏥 Klinis'},{value:'profesional',label:'💼 Profesional'},{value:'pelatihan',label:'📚 Pelatihan'},{value:'organisasi',label:'👥 Organisasi'},{value:'lainnya',label:'📁 Lainnya'}]},
      {id:'desc',label:'Deskripsi',type:'textarea',rows:2},
      {id:'dateStr',label:'Tanggal',type:'text',hint:'Contoh: Januari 2026'},
      {id:'media',label:'File (Foto/Video)',type:'file',accept:'image/*,video/*'}
    ],(data)=>{
      if(!data.title||!data.media){showToast('❌ Judul dan file wajib!','error');return;}
      const items=SiteData.getDocs();
      items.push({title:data.title,category:data.category||'lainnya',desc:data.desc||'',dateStr:data.dateStr||'',data:data.media,type:data.media_type,date:new Date().toISOString()});
      try{SiteData.saveDocs(items);}catch(e){showToast('❌ Storage penuh!','error');return;}
      Render.docs();EditModal.close();showToast('✅ Dokumentasi ditambahkan!');
    });
  },
  editDoc(i){
    const items=SiteData.getDocs(),item=items[i]; if(!item)return;
    EditModal.open('✏️ Edit Dokumentasi',[
      {id:'title',label:'Judul',type:'text',value:item.title},
      {id:'category',label:'Kategori',type:'select',value:item.category,options:[
        {value:'klinis',label:'🏥 Klinis'},{value:'profesional',label:'💼 Profesional'},{value:'pelatihan',label:'📚 Pelatihan'},{value:'organisasi',label:'👥 Organisasi'},{value:'lainnya',label:'📁 Lainnya'}]},
      {id:'desc',label:'Deskripsi',type:'textarea',value:item.desc||'',rows:2},
      {id:'dateStr',label:'Tanggal',type:'text',value:item.dateStr||''},
      {id:'media',label:'Ganti File (opsional)',type:'file',accept:'image/*,video/*',value:item.data}
    ],(data)=>{
      items[i]={...item,title:data.title,category:data.category,desc:data.desc,dateStr:data.dateStr};
      if(data.media&&data.media!==item.data){items[i].data=data.media;items[i].type=data.media_type;}
      try{SiteData.saveDocs(items);}catch(e){showToast('❌ Storage penuh!','error');return;}
      Render.docs();EditModal.close();showToast('✅ Dokumentasi diupdate!');
    });
  },
  deleteDoc(i){if(!confirm('Hapus dokumentasi ini?'))return;const items=SiteData.getDocs();items.splice(i,1);SiteData.saveDocs(items);Render.docs();showToast('🗑️ Dokumentasi dihapus');},

  // CERTIFICATIONS
  editCert(i){
    const items=SiteData.section('certifications'),item=items[i];
    EditModal.open('✏️ Edit Sertifikasi',[
      {id:'icon',label:'Icon (emoji)',type:'text',value:item.icon},
      {id:'name',label:'Nama Sertifikasi',type:'text',value:item.name},
      {id:'issuer',label:'Penerbit',type:'text',value:item.issuer},
      {id:'year',label:'Tahun/Detail',type:'text',value:item.year}
    ],(data)=>{items[i]=data;SiteData.saveSection('certifications',items);Render.certs();EditModal.close();showToast('✅ Sertifikasi diupdate!');});
  },
  deleteCert(i){if(!confirm('Hapus?'))return;const items=SiteData.section('certifications');items.splice(i,1);SiteData.saveSection('certifications',items);Render.certs();showToast('🗑️ Dihapus');},
  addCert(){
    EditModal.open('✚ Tambah Sertifikasi',[
      {id:'icon',label:'Icon (emoji)',type:'text',value:'📜'},
      {id:'name',label:'Nama',type:'text'},
      {id:'issuer',label:'Penerbit',type:'text'},
      {id:'year',label:'Tahun/Detail',type:'text'}
    ],(data)=>{const items=SiteData.section('certifications');items.push({icon:data.icon||'📜',name:data.name,issuer:data.issuer,year:data.year});SiteData.saveSection('certifications',items);Render.certs();EditModal.close();showToast('✅ Sertifikasi ditambahkan!');});
  },

  // AWARDS
  editAward(i){
    const items=SiteData.section('awards'),item=items[i];
    EditModal.open('✏️ Edit Penghargaan',[
      {id:'emoji',label:'Emoji',type:'text',value:item.emoji},
      {id:'title',label:'Judul',type:'text',value:item.title},
      {id:'org',label:'Organisasi',type:'text',value:item.org},
      {id:'year',label:'Tahun',type:'text',value:item.year}
    ],(data)=>{items[i]=data;SiteData.saveSection('awards',items);Render.awards();EditModal.close();showToast('✅ Penghargaan diupdate!');});
  },
  deleteAward(i){if(!confirm('Hapus?'))return;const items=SiteData.section('awards');items.splice(i,1);SiteData.saveSection('awards',items);Render.awards();showToast('🗑️ Dihapus');},
  addAward(){
    EditModal.open('✚ Tambah Penghargaan',[
      {id:'emoji',label:'Emoji',type:'text',value:'🏆'},
      {id:'title',label:'Judul',type:'text'},
      {id:'org',label:'Organisasi',type:'text'},
      {id:'year',label:'Tahun',type:'text'}
    ],(data)=>{const items=SiteData.section('awards');items.push({emoji:data.emoji||'🏆',title:data.title,org:data.org,year:data.year});SiteData.saveSection('awards',items);Render.awards();EditModal.close();showToast('✅ Penghargaan ditambahkan!');});
  },

  // CONTACT
  contact(){
    const d=SiteData.section('contact');
    EditModal.open('✏️ Edit Kontak',[
      {id:'email',label:'Email',type:'text',value:d.email},
      {id:'phone',label:'Nomor Telepon',type:'text',value:d.phone},
      {id:'phoneDisplay',label:'Tampilan Nomor',type:'text',value:d.phoneDisplay},
      {id:'linkedin',label:'LinkedIn URL',type:'text',value:d.linkedin}
    ],(data)=>{SiteData.saveSection('contact',data);Render.contact();EditModal.close();showToast('✅ Kontak diupdate!');});
  },
  editContact(){ this.contact(); }
};

/* ===== LOGIN HANDLERS ===== */
document.getElementById('login-btn').onclick=()=>Admin.login(document.getElementById('login-password').value);
document.getElementById('login-password').onkeydown=e=>{if(e.key==='Enter')Admin.login(document.getElementById('login-password').value);};
document.getElementById('login-modal').onclick=e=>{if(e.target===e.currentTarget){e.currentTarget.classList.remove('active');document.getElementById('login-error').style.display='none';}};
document.getElementById('edit-modal').onclick=e=>{if(e.target===e.currentTarget)EditModal.close();};
