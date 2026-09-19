/* =========================================================
   CMS — panel pengaturan isi website Septian Eka Saputra.
   Akses dilindungi kriptografi SHA-256 dan brute-force lockout.
   ========================================================= */
var MASTER_PASS_HASH = '80a016d3d7534b6539873671c2172852169ee3f14a0face8bd0450496a5a8a67';

(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ico = function (n) { return window.Icons.svg(n); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function node(html) {
    var t = document.createElement('div');
    t.innerHTML = html.trim();
    return t.firstElementChild;
  }

  var lang = 'id';
  var page = 'dashboard';
  var D = null;   // data bahasa aktif
  var SH = null;  // data bersama

  function sync() { D = Store.get(lang); SH = Store.shared(); }

  /* =======================================================
     SIMPAN
     ======================================================= */
  var saveTimer = null;

  function setState(kind, text) {
    var el = $('#save-state');
    el.className = 'save-state ' + kind;
    el.innerHTML = ico(kind === 'saved' ? 'check' : kind === 'dirty' ? 'clock' : 'refresh') +
      '<span>' + esc(text) + '</span>';
  }

  function touch() {
    setState('dirty', 'Menyimpan…');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      var r = Store.save();
      if (r.ok) setState('saved', 'Tersimpan');
      else { setState('dirty', 'Gagal'); toast(r.error, 'error'); }
    }, 450);
  }

  function toast(msg, type) {
    var t = $('#toast');
    t.innerHTML = ico(type === 'error' ? 'close' : 'check') + '<span>' + esc(msg) + '</span>';
    t.className = 'toast show ' + (type || '');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 3400);
  }

  function confirmBox(title, text, onYes) {
    $('#confirm-title').textContent = title;
    $('#confirm-text').textContent = text;
    $('#confirm').classList.add('on');
    $('#confirm-yes').onclick = function () { $('#confirm').classList.remove('on'); onYes(); };
  }
  document.addEventListener('DOMContentLoaded', function () {
    $('#confirm-no').onclick = function () { $('#confirm').classList.remove('on'); };
  });

  /* =======================================================
     FIELD
     ======================================================= */
  function fText(label, get, set, opts) {
    opts = opts || {};
    var w = node('<div class="f"><label>' + esc(label) + '</label>' +
      '<input type="' + (opts.type || 'text') + '">' +
      (opts.hint ? '<div class="hint">' + esc(opts.hint) + '</div>' : '') + '</div>');
    var i = $('input', w);
    i.value = get() || '';
    if (opts.placeholder) i.placeholder = opts.placeholder;
    i.addEventListener('input', function () { set(i.value); touch(); if (opts.live) opts.live(i.value); });
    return w;
  }

  function fArea(label, get, set, opts) {
    opts = opts || {};
    var w = node('<div class="f"><label>' + esc(label) + '</label>' +
      '<textarea class="' + (opts.tall ? 'tall' : '') + '"></textarea>' +
      (opts.hint ? '<div class="hint">' + esc(opts.hint) + '</div>' : '') + '</div>');
    var t = $('textarea', w);
    t.value = get() || '';
    t.addEventListener('input', function () { set(t.value); touch(); });
    return w;
  }

  function fSelect(label, get, set, options) {
    var w = node('<div class="f"><label>' + esc(label) + '</label><select>' +
      options.map(function (o) { return '<option value="' + esc(o.value) + '">' + esc(o.label) + '</option>'; }).join('') +
      '</select></div>');
    var s = $('select', w);
    s.value = get() || options[0].value;
    s.addEventListener('change', function () { set(s.value); touch(); });
    return w;
  }

  /* daftar kata kunci / tag */
  function fTags(label, get, set, hint) {
    var w = node('<div class="f"><label>' + esc(label) + '</label>' +
      '<div class="tags"></div>' +
      '<input type="text" placeholder="Ketik lalu tekan Enter">' +
      (hint ? '<div class="hint">' + esc(hint) + '</div>' : '') + '</div>');
    var box = $('.tags', w), inp = $('input', w);

    function paint() {
      var list = get() || [];
      box.innerHTML = list.map(function (t, i) {
        return '<span class="tag">' + esc(t) + '<button data-i="' + i + '" title="Hapus">' + ico('close') + '</button></span>';
      }).join('');
      $$('button', box).forEach(function (b) {
        b.onclick = function () { var l = get().slice(); l.splice(+b.dataset.i, 1); set(l); touch(); paint(); };
      });
    }

    inp.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      var v = inp.value.trim();
      if (!v) return;
      set((get() || []).concat([v]));
      inp.value = '';
      touch(); paint();
    });

    paint();
    return w;
  }

  /* daftar poin (tiap poin satu textarea) */
  function fLines(label, get, set) {
    var w = node('<div class="f"><label>' + esc(label) + '</label><div class="lines"></div>' +
      '<button class="btn sm" style="margin-top:8px"></button></div>');
    var box = $('.lines', w), add = $('button.btn', w);
    add.innerHTML = ico('plus') + '<span>Tambah poin</span>';

    function paint() {
      var list = get() || [];
      box.innerHTML = '';
      list.forEach(function (v, i) {
        var row = node('<div class="line-row"><textarea></textarea>' +
          '<button class="icon-btn danger" title="Hapus"></button></div>');
        var ta = $('textarea', row), rm = $('button', row);
        ta.value = v;
        rm.innerHTML = ico('trash');
        ta.addEventListener('input', function () { var l = get().slice(); l[i] = ta.value; set(l); touch(); });
        rm.onclick = function () { var l = get().slice(); l.splice(i, 1); set(l); touch(); paint(); };
        box.appendChild(row);
      });
    }

    add.onclick = function () { set((get() || []).concat([''])); touch(); paint(); };
    paint();
    return w;
  }

  /* pemilih ikon */
  function fIcon(label, get, set) {
    var w = node('<div class="f"><label>' + esc(label) + '</label>' +
      '<div class="icon-pick"><span class="preview"></span>' +
      '<button class="btn sm" type="button"></button>' +
      '<span class="hint" style="margin:0"></span></div>' +
      '<div class="icon-grid" hidden></div></div>');
    var prev = $('.preview', w), btn = $('button', w), name = $('.hint', w), grid = $('.icon-grid', w);

    function paint() {
      prev.innerHTML = ico(get());
      name.textContent = get() || '—';
      $$('button', grid).forEach(function (b) { b.classList.toggle('on', b.dataset.n === get()); });
    }

    btn.innerHTML = ico('grid') + '<span>Pilih ikon</span>';
    grid.innerHTML = Icons.names().map(function (n) {
      return '<button type="button" data-n="' + n + '" title="' + n + '">' + ico(n) + '</button>';
    }).join('');

    $$('button', grid).forEach(function (b) {
      b.onclick = function () { set(b.dataset.n); touch(); paint(); grid.hidden = true; };
    });

    btn.onclick = function () { grid.hidden = !grid.hidden; };
    paint();
    return w;
  }

  /* =======================================================
     MEDIA
     ======================================================= */
  var MAX_EDGE = 1500, JPEG_Q = 0.82;

  function readFile(file, cb) {
    if (file.type.indexOf('image/') !== 0) {
      if (file.size > 3 * 1024 * 1024) {
        toast('File ' + file.name + ' terlalu besar (' + mb(file.size) + '). Pakai kolom "Path file" saja.', 'error');
        return cb(null);
      }
      var fr = new FileReader();
      fr.onload = function () { cb({ data: fr.result, type: file.type, name: file.name }); };
      fr.readAsDataURL(file);
      return;
    }
    // gambar: dikecilkan dulu supaya muat di penyimpanan browser
    var img = new Image();
    img.onload = function () {
      var s = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
      var c = document.createElement('canvas');
      c.width = Math.round(img.width * s);
      c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      cb({ data: c.toDataURL('image/jpeg', JPEG_Q), type: 'image/jpeg', name: file.name });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = function () { toast('Gagal membaca ' + file.name, 'error'); cb(null); };
    img.src = URL.createObjectURL(file);
  }

  function pickFiles(multiple, accept, cb) {
    var inp = $('#hidden-file');
    inp.multiple = !!multiple;
    inp.accept = accept || 'image/*,video/*';
    inp.value = '';
    inp.onchange = function () {
      var files = Array.prototype.slice.call(inp.files);
      if (!files.length) return;
      var out = [], left = files.length;
      files.forEach(function (f, i) {
        readFile(f, function (r) {
          if (r) out[i] = r;
          if (--left === 0) cb(out.filter(Boolean));
        });
      });
    };
    inp.click();
  }

  function mb(bytes) { return (bytes / 1048576).toFixed(1) + ' MB'; }

  /* daftar berkas untuk satu karya portfolio */
  function fFiles(label, get, set) {
    var w = node('<div class="f"><label>' + esc(label) + '</label>' +
      '<div class="drop"></div><div class="files"></div>' +
      '<div class="hint">Gambar otomatis diperkecil ke sisi terpanjang ' + MAX_EDGE + 'px. ' +
      'Untuk video, lebih baik simpan filenya di folder website lalu isi kolom “Path file”.</div></div>');
    var drop = $('.drop', w), box = $('.files', w);
    drop.innerHTML = ico('upload') + '<div>Klik atau jatuhkan gambar/video di sini</div>';

    function paint() {
      var list = get() || [];
      box.innerHTML = list.map(function (f, i) {
        var inner;
        if (f.type && f.type.indexOf('video/') === 0) inner = '<video src="' + esc(f.data) + '" muted></video>';
        else if (f.type && f.type.indexOf('image/') === 0) inner = '<img src="' + esc(f.data) + '">';
        else inner = '<div class="ph">' + esc(f.name || f.data) + '</div>';
        return '<div class="file-thumb">' + inner + '<button class="rm" data-i="' + i + '">' + ico('close') + '</button></div>';
      }).join('');
      $$('.rm', box).forEach(function (b) {
        b.onclick = function () { var l = get().slice(); l.splice(+b.dataset.i, 1); set(l); touch(); paint(); };
      });
    }

    function add(files) { set((get() || []).concat(files)); touch(); paint(); }

    drop.onclick = function () { pickFiles(true, 'image/*,video/*', add); };
    drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('over'); });
    drop.addEventListener('dragleave', function () { drop.classList.remove('over'); });
    drop.addEventListener('drop', function (e) {
      e.preventDefault();
      drop.classList.remove('over');
      var files = Array.prototype.slice.call(e.dataTransfer.files);
      var out = [], left = files.length;
      if (!left) return;
      files.forEach(function (f, i) {
        readFile(f, function (r) { if (r) out[i] = r; if (--left === 0) add(out.filter(Boolean)); });
      });
    });

    // tambah lewat path file
    var pathRow = node('<div class="line-row" style="margin-top:8px">' +
      '<input type="text" placeholder="mis. karya/video-1.mp4" ' +
      'style="width:100%;padding:10px 13px;background:var(--ink-800);border:1px solid var(--line);' +
      'border-radius:8px;color:var(--bone);font-size:.86rem;outline:none">' +
      '<button class="icon-btn" title="Tambah path"></button></div>');
    var pInp = $('input', pathRow), pBtn = $('button', pathRow);
    pBtn.innerHTML = ico('plus');
    pBtn.onclick = function () {
      var v = pInp.value.trim();
      if (!v) return;
      var ext = v.split('.').pop().toLowerCase();
      var type = ['mp4', 'webm', 'mov', 'm4v'].indexOf(ext) >= 0 ? 'video/' + ext : 'image/' + ext;
      add([{ data: v, type: type, name: v }]);
      pInp.value = '';
    };
    w.appendChild(pathRow);

    paint();
    return w;
  }

  /* =======================================================
     REPEATER
     ======================================================= */
  function repeater(opts) {
    // opts: get(), set(list), blank(), label(item), icon(item), fields(item, repaint)
    var w = node('<div><div class="rep-list"></div><button class="btn block"></button></div>');
    var list = $('.rep-list', w), add = $('button.btn', w);
    add.innerHTML = ico('plus') + '<span>' + esc(opts.addLabel || 'Tambah') + '</span>';

    function paint(openIndex) {
      var items = opts.get() || [];
      list.innerHTML = '';

      if (!items.length) {
        list.appendChild(node('<div class="rep-empty">Belum ada isi. Klik tombol di bawah untuk menambah.</div>'));
      }

      items.forEach(function (item, i) {
        var it = node('<div class="rep-item' + (i === openIndex ? ' open' : '') + '">' +
          '<div class="rep-head">' +
          '<span class="rep-n">' + String(i + 1).padStart(2, '0') + '</span>' +
          (opts.icon ? '<span class="rep-ico">' + ico(opts.icon(item)) + '</span>' : '') +
          '<span class="rep-label">' + esc(opts.label(item) || '(tanpa judul)') + '</span>' +
          '<span class="rep-tools">' +
          '<button class="icon-btn" data-a="up" title="Naik"></button>' +
          '<button class="icon-btn" data-a="down" title="Turun"></button>' +
          '<button class="icon-btn danger" data-a="del" title="Hapus"></button>' +
          '</span><span class="rep-chev"></span></div>' +
          '<div class="rep-body"></div></div>');

        $('[data-a=up]', it).innerHTML = ico('chevronDown');
        $('[data-a=up]', it).style.transform = 'rotate(180deg)';
        $('[data-a=down]', it).innerHTML = ico('chevronDown');
        $('[data-a=del]', it).innerHTML = ico('trash');
        $('.rep-chev', it).innerHTML = ico('chevronDown');
        $('[data-a=up]', it).disabled = i === 0;
        $('[data-a=down]', it).disabled = i === items.length - 1;

        $('.rep-head', it).onclick = function (e) {
          if (e.target.closest('.icon-btn')) return;
          it.classList.toggle('open');
          if (it.classList.contains('open') && !$('.rep-body', it).children.length) {
            opts.fields(item, function () { paint(i); }).forEach(function (f) { $('.rep-body', it).appendChild(f); });
          }
        };

        if (i === openIndex) {
          opts.fields(item, function () { paint(i); }).forEach(function (f) { $('.rep-body', it).appendChild(f); });
        }

        $('[data-a=up]', it).onclick = function () { move(i, -1); };
        $('[data-a=down]', it).onclick = function () { move(i, 1); };
        $('[data-a=del]', it).onclick = function () {
          confirmBox('Hapus item ini?', opts.label(item) || 'Item tanpa judul', function () {
            var l = opts.get().slice(); l.splice(i, 1); opts.set(l); touch(); paint();
          });
        };

        list.appendChild(it);
      });
    }

    function move(i, dir) {
      var l = opts.get().slice();
      var j = i + dir;
      if (j < 0 || j >= l.length) return;
      var tmp = l[i]; l[i] = l[j]; l[j] = tmp;
      opts.set(l); touch(); paint(j);
    }

    add.onclick = function () {
      var l = (opts.get() || []).concat([opts.blank()]);
      opts.set(l); touch(); paint(l.length - 1);
    };

    paint();
    return w;
  }

  function card(title, sub, body) {
    var c = node('<div class="card"><div class="card-head"><h3>' + esc(title) + '</h3>' +
      (sub ? '<span class="sub">' + esc(sub) + '</span>' : '') + '</div>' +
      '<div class="card-body"></div></div>');
    (Array.isArray(body) ? body : [body]).forEach(function (n) { if (n) $('.card-body', c).appendChild(n); });
    return c;
  }

  function group(nodes) {
    var f = document.createDocumentFragment();
    nodes.forEach(function (n) { if (n) f.appendChild(n); });
    return f;
  }

  function lead(text) { return node('<p class="lead">' + esc(text) + '</p>'); }

  /* helper akses properti objek */
  function g(obj, k) { return function () { return obj[k]; }; }
  function s(obj, k) { return function (v) { obj[k] = v; }; }

  /* =======================================================
     HALAMAN
     ======================================================= */
  var PAGES = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid', group: 'Ringkasan' },
    { id: 'meta', label: 'Identitas Situs', icon: 'settings', group: 'Ringkasan' },

    { id: 'hero', label: 'Hero', icon: 'sparkles', group: 'Bagian Halaman' },
    { id: 'about', label: 'Tentang', icon: 'user', group: 'Bagian Halaman' },
    { id: 'skills', label: 'Keahlian', icon: 'layers', group: 'Bagian Halaman' },
    { id: 'education', label: 'Pendidikan', icon: 'graduation', group: 'Bagian Halaman' },
    { id: 'experience', label: 'Pengalaman', icon: 'briefcase', group: 'Bagian Halaman' },
    { id: 'projects', label: 'Proyek', icon: 'clipboard', group: 'Bagian Halaman' },
    { id: 'portfolio', label: 'Portfolio', icon: 'image', group: 'Bagian Halaman' },
    { id: 'certifications', label: 'Sertifikasi', icon: 'medal', group: 'Bagian Halaman' },
    { id: 'awards', label: 'Penghargaan', icon: 'trophy', group: 'Bagian Halaman' },
    { id: 'contact', label: 'Kontak', icon: 'mail', group: 'Bagian Halaman' },

    { id: 'labels', label: 'Judul & Label', icon: 'list', group: 'Lain-lain' },
    { id: 'data', label: 'Publish & Backup', icon: 'save', group: 'Lain-lain' }
  ];

  var Views = {

    /* ---------------- Dashboard ---------------- */
    dashboard: function () {
      var used = Store.usage();
      var pct = Math.min(100, Math.round(used / (5 * 1024 * 1024) * 100));
      var counts = [
        ['Keahlian', (D.skills || []).length],
        ['Pendidikan', (D.education || []).length],
        ['Pengalaman', ((D.experience.clinical || []).length + (D.experience.professional || []).length)],
        ['Proyek', (D.projects || []).length],
        ['Portfolio', (SH.portfolio || []).length],
        ['Sertifikasi', (D.certifications || []).length],
        ['Penghargaan', (D.awards || []).length]
      ];

      var stats = node('<div class="stats">' + counts.map(function (c) {
        return '<div class="stat"><div class="n">' + c[1] + '</div><div class="l">' + esc(c[0]) + '</div></div>';
      }).join('') + '</div>');

      var storage = card('Penyimpanan browser', mb(used) + ' / ± 5 MB',
        node('<div><div class="meter' + (pct > 70 ? ' hot' : '') + '"><span style="width:' + pct + '%"></span></div>' +
          '<div class="hint" style="margin-top:10px;color:var(--bone-3);font-size:.78rem">' +
          'Semua perubahan tersimpan otomatis di browser ini. Foto portfolio adalah yang paling banyak memakan ruang — ' +
          'kalau mendekati penuh, kurangi jumlah gambar atau simpan filenya di folder website lalu pakai “Path file”.</div></div>'));

      var how = card('Cara mempublikasikan perubahan', '', node(
        '<ol class="steps">' +
        '<li>Edit isi lewat menu di sebelah kiri. Perubahan tersimpan otomatis, tapi <b>baru terlihat di browser ini saja</b>.</li>' +
        '<li>Buka <b>Publish &amp; Backup</b>, klik <b>Publish</b>. Browser akan mengunduh file <code>content.js</code>.</li>' +
        '<li>Pindahkan <code>content.js</code> ke folder website (satu folder dengan <code>index.html</code>), timpa file lama.</li>' +
        '<li>Selesai — semua pengunjung sekarang melihat isi yang baru.</li>' +
        '</ol>'));

      return group([
        lead('Ringkasan isi website untuk bahasa ' + (lang === 'id' ? 'Indonesia' : 'Inggris') + '.'),
        stats, storage, how
      ]);
    },

    /* ---------------- Identitas situs ---------------- */
    meta: function () {
      var m = D.meta;

      var photoBox = node('<div class="photo-row"><div class="photo-preview"></div>' +
        '<div style="flex:1;min-width:200px"></div></div>');
      var prev = $('.photo-preview', photoBox), side = $('div:last-child', photoBox);

      function paintPhoto() {
        prev.innerHTML = '<img src="' + esc(SH.photo || 'photo.png') + '" alt="">';
      }

      var upBtn = node('<button class="btn"></button>');
      upBtn.innerHTML = ico('upload') + '<span>Ganti foto</span>';
      upBtn.onclick = function () {
        pickFiles(false, 'image/*', function (files) {
          if (!files.length) return;
          SH.photo = files[0].data;
          touch(); paintPhoto();
          toast('Foto diperbarui');
        });
      };

      var pathField = fText('atau path file di folder website', g(SH, 'photo'), function (v) {
        SH.photo = v; paintPhoto();
      }, { hint: 'Contoh: photo.png — lebih hemat penyimpanan daripada mengunggah.' });

      side.appendChild(upBtn);
      side.appendChild(pathField);
      paintPhoto();

      return group([
        lead('Nama merek, judul tab browser, dan foto profil.'),
        card('Foto profil', 'dipakai kedua bahasa', photoBox),
        card('Identitas', lang.toUpperCase(), [
          fText('Nama merek / logo teks', g(m, 'brand'), s(m, 'brand')),
          fText('Judul tab browser', g(m, 'title'), s(m, 'title')),
          fArea('Deskripsi untuk mesin pencari', g(m, 'description'), s(m, 'description'),
            { hint: 'Muncul di hasil pencarian Google. Idealnya 120–160 karakter.' }),
          fText('Teks footer', g(m, 'footer'), s(m, 'footer'))
        ])
      ]);
    },

    /* ---------------- Hero ---------------- */
    hero: function () {
      var h = D.hero;

      var statsRep = repeater({
        addLabel: 'Tambah angka',
        get: function () { return h.stats; },
        set: function (l) { h.stats = l; },
        blank: function () { return { value: '', label: '' }; },
        label: function (it) { return (it.value || '—') + ' · ' + (it.label || ''); },
        fields: function (it, repaint) {
          return [
            fText('Angka', g(it, 'value'), function (v) { it.value = v; repaint(); },
              { hint: 'Akan dianimasikan naik dari 0. Contoh: 3.89, 7+, 12' }),
            fText('Keterangan', g(it, 'label'), function (v) { it.label = v; repaint(); })
          ];
        }
      });

      var cardsRep = repeater({
        addLabel: 'Tambah kartu',
        get: function () { return h.cards; },
        set: function (l) { h.cards = l; },
        blank: function () { return { icon: 'sparkles', label: '', value: '' }; },
        icon: function (it) { return it.icon; },
        label: function (it) { return it.value || it.label; },
        fields: function (it, repaint) {
          return [
            fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
            fText('Label kecil', g(it, 'label'), function (v) { it.label = v; repaint(); }),
            fText('Isi', g(it, 'value'), function (v) { it.value = v; repaint(); })
          ];
        }
      });

      var nameGrid = node('<div class="grid2"></div>');
      nameGrid.appendChild(fText('Baris pertama', g(h, 'name'), s(h, 'name')));
      nameGrid.appendChild(fText('Baris kedua (dicetak miring, warna aksen)', g(h, 'name2'), s(h, 'name2')));

      return group([
        lead('Bagian paling atas website — nama besar, peran, dan tiga angka ringkas.'),
        card('Nama besar', lang.toUpperCase(), [
          fText('Label status', g(h, 'badge'), s(h, 'badge'), { hint: 'Contoh: Terbuka untuk Peluang' }),
          nameGrid
        ]),
        card('Peran berputar', 'animasi bergantian', [
          fTags('Daftar peran', g(h, 'roles'), s(h, 'roles'),
            'Ditampilkan bergantian dengan animasi. Minimal satu.')
        ]),
        card('Deskripsi & tombol', lang.toUpperCase(), [
          fArea('Deskripsi singkat', g(h, 'desc'), s(h, 'desc')),
          fText('Tombol utama', g(h, 'ctaPrimary'), s(h, 'ctaPrimary')),
          fText('Tombol kedua', g(h, 'ctaSecondary'), s(h, 'ctaSecondary'))
        ]),
        card('Angka statistik', String((h.stats || []).length) + ' item', statsRep),
        card('Kartu melayang di foto', String((h.cards || []).length) + ' item', cardsRep)
      ]);
    },

    /* ---------------- Tentang ---------------- */
    about: function () {
      var a = D.about;

      var infoRep = repeater({
        addLabel: 'Tambah baris info',
        get: function () { return a.info; },
        set: function (l) { a.info = l; },
        blank: function () { return { label: '', value: '' }; },
        label: function (it) { return it.label + ' — ' + it.value; },
        fields: function (it, repaint) {
          return [
            fText('Label', g(it, 'label'), function (v) { it.label = v; repaint(); }),
            fText('Isi', g(it, 'value'), function (v) { it.value = v; repaint(); })
          ];
        }
      });

      var hlRep = repeater({
        addLabel: 'Tambah sorotan',
        get: function () { return a.highlights; },
        set: function (l) { a.highlights = l; },
        blank: function () { return { icon: 'sparkles', title: '', desc: '' }; },
        icon: function (it) { return it.icon; },
        label: function (it) { return it.title; },
        fields: function (it, repaint) {
          return [
            fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
            fText('Judul', g(it, 'title'), function (v) { it.title = v; repaint(); }),
            fArea('Keterangan', g(it, 'desc'), s(it, 'desc'))
          ];
        }
      });

      return group([
        lead('Paragraf perkenalan, data ringkas, dan empat kartu sorotan.'),
        card('Paragraf', 'boleh pakai HTML', [
          fArea('Isi', g(a, 'body'), s(a, 'body'),
            { tall: true, hint: 'Bungkus tiap paragraf dengan <p> … </p>. Huruf pertama otomatis dibuat besar.' })
        ]),
        card('Data ringkas', String((a.info || []).length) + ' baris', infoRep),
        card('Kartu sorotan', String((a.highlights || []).length) + ' kartu', hlRep)
      ]);
    },

    /* ---------------- Keahlian ---------------- */
    skills: function () {
      return group([
        lead('Tiap kategori tampil sebagai satu kartu. Semua tag juga berjalan di pita berjalan di bawahnya.'),
        repeater({
          addLabel: 'Tambah kategori keahlian',
          get: function () { return D.skills; },
          set: function (l) { D.skills = l; },
          blank: function () { return { name: '', icon: 'sparkles', tags: [] }; },
          icon: function (it) { return it.icon; },
          label: function (it) { return it.name + '  (' + (it.tags || []).length + ')'; },
          fields: function (it, repaint) {
            return [
              fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
              fText('Nama kategori', g(it, 'name'), function (v) { it.name = v; repaint(); }),
              fTags('Daftar keahlian', g(it, 'tags'), function (v) { it.tags = v; repaint(); })
            ];
          }
        })
      ]);
    },

    /* ---------------- Pendidikan ---------------- */
    education: function () {
      return group([
        lead('Riwayat pendidikan formal beserta IPK dan judul skripsi.'),
        repeater({
          addLabel: 'Tambah pendidikan',
          get: function () { return D.education; },
          set: function (l) { D.education = l; },
          blank: function () { return { institution: '', degree: '', gpa: '', period: '', status: '', thesis: '' }; },
          label: function (it) { return it.institution; },
          fields: function (it, repaint) {
            return [
              fText('Institusi', g(it, 'institution'), function (v) { it.institution = v; repaint(); }),
              fText('Jenjang & jurusan', g(it, 'degree'), s(it, 'degree')),
              fText('IPK', g(it, 'gpa'), s(it, 'gpa'), { hint: 'Dianimasikan naik dari 0.' }),
              fText('Periode', g(it, 'period'), s(it, 'period'), { hint: 'Contoh: Jul 2022 – Agt 2026' }),
              fText('Status', g(it, 'status'), s(it, 'status'), { hint: 'Contoh: Lulus Uji Kompetensi Nasional. Kosongkan untuk menyembunyikan.' }),
              fArea('Judul skripsi', g(it, 'thesis'), s(it, 'thesis'), { hint: 'Kosongkan untuk menyembunyikan.' })
            ];
          }
        })
      ]);
    },

    /* ---------------- Pengalaman ---------------- */
    experience: function () {
      function build(type) {
        return repeater({
          addLabel: 'Tambah pengalaman',
          get: function () { return D.experience[type]; },
          set: function (l) { D.experience[type] = l; },
          blank: function () { return { title: '', subtitle: '', date: '', location: '', points: [''] }; },
          label: function (it) { return it.title; },
          fields: function (it, repaint) {
            var pair = node('<div class="grid2"></div>');
            pair.appendChild(fText('Tanggal', g(it, 'date'), s(it, 'date')));
            pair.appendChild(fText('Lokasi', g(it, 'location'), s(it, 'location')));
            return [
              fText('Nama tempat / posisi', g(it, 'title'), function (v) { it.title = v; repaint(); }),
              fText('Sub judul', g(it, 'subtitle'), s(it, 'subtitle'), { hint: 'Contoh: CT Scan dan MRI' }),
              pair,
              fLines('Poin kegiatan', g(it, 'points'), s(it, 'points'))
            ];
          }
        });
      }

      return group([
        lead('Dua tab di website: Klinis dan Profesional. Urutan di sini = urutan tampil.'),
        card('Pengalaman klinis', String((D.experience.clinical || []).length) + ' item', build('clinical')),
        card('Pengalaman profesional', String((D.experience.professional || []).length) + ' item', build('professional'))
      ]);
    },

    /* ---------------- Proyek ---------------- */
    projects: function () {
      return group([
        lead('Ditampilkan sebagai daftar bernomor bergaya editorial.'),
        repeater({
          addLabel: 'Tambah proyek',
          get: function () { return D.projects; },
          set: function (l) { D.projects = l; },
          blank: function () { return { icon: 'clipboard', title: '', role: '', desc: '', tags: [] }; },
          icon: function (it) { return it.icon; },
          label: function (it) { return it.title; },
          fields: function (it, repaint) {
            return [
              fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
              fText('Judul proyek', g(it, 'title'), function (v) { it.title = v; repaint(); }),
              fText('Peran & periode', g(it, 'role'), s(it, 'role')),
              fArea('Deskripsi', g(it, 'desc'), s(it, 'desc')),
              fTags('Tag', g(it, 'tags'), s(it, 'tags'))
            ];
          }
        })
      ]);
    },

    /* ---------------- Portfolio ---------------- */
    portfolio: function () {
      var cats = [
        { value: 'desain', label: 'Desain' },
        { value: 'foto', label: 'Fotografi' },
        { value: 'video', label: 'Video' },
        { value: 'ilustrasi', label: 'Ilustrasi' },
        { value: 'lainnya', label: 'Lainnya' }
      ];

      return group([
        lead('Karya kreatif. Data ini dipakai bersama kedua bahasa — judul dan deskripsi versi Inggris bersifat opsional.'),
        node('<div class="note">' + ico('bulb') +
          '<div>Cara paling hemat: simpan file gambar/video di folder website (mis. buat folder <b>karya/</b>), ' +
          'lalu isi lewat kolom <b>path file</b> di bawah kotak unggah. Gambar yang diunggah langsung akan disimpan ' +
          'di dalam browser dan cepat memenuhi kuota.</div></div>'),
        repeater({
          addLabel: 'Tambah karya',
          get: function () { return SH.portfolio; },
          set: function (l) { SH.portfolio = l; },
          blank: function () {
            return {
              title: '', titleEn: '', category: 'desain', desc: '', descEn: '',
              date: new Date().toISOString().slice(0, 10), files: []
            };
          },
          label: function (it) { return it.title || '(tanpa judul)'; },
          fields: function (it, repaint) {
            return [
              fText('Judul (Indonesia)', g(it, 'title'), function (v) { it.title = v; repaint(); }),
              fText('Judul (English)', g(it, 'titleEn'), s(it, 'titleEn'), { hint: 'Opsional — kalau kosong, memakai judul Indonesia.' }),
              fSelect('Kategori', g(it, 'category'), function (v) { it.category = v; repaint(); }, cats),
              fArea('Deskripsi (Indonesia)', g(it, 'desc'), s(it, 'desc')),
              fArea('Deskripsi (English)', g(it, 'descEn'), s(it, 'descEn'), { hint: 'Opsional.' }),
              fText('Tanggal', g(it, 'date'), s(it, 'date'), { type: 'date' }),
              fFiles('Berkas karya', g(it, 'files'), function (v) { it.files = v; repaint(); })
            ];
          }
        })
      ]);
    },

    /* ---------------- Sertifikasi ---------------- */
    certifications: function () {
      return group([
        lead('Pelatihan dan sertifikat, ditampilkan sebagai daftar.'),
        repeater({
          addLabel: 'Tambah sertifikasi',
          get: function () { return D.certifications; },
          set: function (l) { D.certifications = l; },
          blank: function () { return { icon: 'medal', name: '', issuer: '', year: '' }; },
          icon: function (it) { return it.icon; },
          label: function (it) { return it.name; },
          fields: function (it, repaint) {
            return [
              fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
              fText('Nama sertifikat', g(it, 'name'), function (v) { it.name = v; repaint(); }),
              fText('Penerbit', g(it, 'issuer'), s(it, 'issuer')),
              fText('Tahun / keterangan', g(it, 'year'), s(it, 'year'))
            ];
          }
        })
      ]);
    },

    /* ---------------- Penghargaan ---------------- */
    awards: function () {
      return group([
        lead('Penghargaan dan pengalaman kepemimpinan, ditampilkan sebagai kotak-kotak.'),
        repeater({
          addLabel: 'Tambah penghargaan',
          get: function () { return D.awards; },
          set: function (l) { D.awards = l; },
          blank: function () { return { icon: 'trophy', title: '', org: '', year: '' }; },
          icon: function (it) { return it.icon; },
          label: function (it) { return it.title; },
          fields: function (it, repaint) {
            return [
              fIcon('Ikon', g(it, 'icon'), function (v) { it.icon = v; repaint(); }),
              fText('Judul', g(it, 'title'), function (v) { it.title = v; repaint(); }),
              fText('Penyelenggara', g(it, 'org'), s(it, 'org')),
              fText('Tahun / periode', g(it, 'year'), s(it, 'year'))
            ];
          }
        })
      ]);
    },

    /* ---------------- Kontak ---------------- */
    contact: function () {
      var c = D.contact;
      return group([
        lead('Judul besar di bagian penutup dan daftar kontak.'),
        card('Penutup', lang.toUpperCase(), [
          fText('Judul besar', g(c, 'headline'), s(c, 'headline')),
          fArea('Kalimat pendukung', g(c, 'note'), s(c, 'note'))
        ]),
        card('Kontak', 'tautan otomatis', [
          fText('Email', g(c, 'email'), s(c, 'email')),
          fText('Nomor telepon (untuk tautan)', g(c, 'phone'), s(c, 'phone'), { hint: 'Format internasional tanpa spasi, mis. +6285156340589' }),
          fText('Nomor telepon (tampil)', g(c, 'phoneDisplay'), s(c, 'phoneDisplay')),
          fText('LinkedIn', g(c, 'linkedin'), s(c, 'linkedin'), { hint: 'Tanpa https://, mis. linkedin.com/in/sptneksa' }),
          fText('Lokasi', g(c, 'location'), s(c, 'location'))
        ])
      ]);
    },

    /* ---------------- Judul & label ---------------- */
    labels: function () {
      var keys = Object.keys(D.sections);

      var secs = keys.map(function (k) {
        var sec = D.sections[k];
        var w = node('<div class="card"><div class="card-head"><h3>' + esc(k) + '</h3>' +
          '<span class="sub">' + esc(sec.n) + '</span></div><div class="card-body"><div class="grid3"></div></div></div>');
        var g3 = $('.grid3', w);
        g3.appendChild(fText('Nomor', g(sec, 'n'), s(sec, 'n')));
        g3.appendChild(fText('Label kecil', g(sec, 'tag'), s(sec, 'tag')));
        g3.appendChild(fText('Judul besar', g(sec, 'title'), s(sec, 'title')));
        return w;
      });

      var navCard = card('Teks menu navigasi', lang.toUpperCase(), (function () {
        var w = node('<div class="grid3"></div>');
        Object.keys(D.ui.nav).forEach(function (k) {
          w.appendChild(fText(k, g(D.ui.nav, k), s(D.ui.nav, k)));
        });
        return w;
      })());

      var miscCard = card('Label lain', '', (function () {
        var w = node('<div></div>');
        var g2 = node('<div class="grid3"></div>');
        g2.appendChild(fText('Tab klinis', g(D.ui.tabs, 'clinical'), s(D.ui.tabs, 'clinical')));
        g2.appendChild(fText('Tab profesional', g(D.ui.tabs, 'professional'), s(D.ui.tabs, 'professional')));
        w.appendChild(g2);
        var g3 = node('<div class="grid3"></div>');
        Object.keys(D.ui.filters).forEach(function (k) {
          g3.appendChild(fText('Filter: ' + k, g(D.ui.filters, k), s(D.ui.filters, k)));
        });
        w.appendChild(g3);
        var g4 = node('<div class="grid3"></div>');
        Object.keys(D.ui.labels).forEach(function (k) {
          g4.appendChild(fText(k, g(D.ui.labels, k), s(D.ui.labels, k)));
        });
        w.appendChild(g4);
        return w;
      })());

      return group([lead('Nomor, label kecil, dan judul besar tiap bagian, serta teks menu.')]
        .concat(secs).concat([navCard, miscCard]));
    },

    /* ---------------- Publish & backup ---------------- */
    data: function () {
      function download(name, text, mime) {
        var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = name;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      }

      var pub = node('<button class="btn accent"></button>');
      pub.innerHTML = ico('download') + '<span>Publish — unduh content.js</span>';
      pub.onclick = function () {
        Store.save();
        download('content.js', Store.toContentJS(), 'text/javascript;charset=utf-8');
        toast('content.js diunduh — pindahkan ke folder website');
      };

      var bak = node('<button class="btn"></button>');
      bak.innerHTML = ico('save') + '<span>Unduh backup .json</span>';
      bak.onclick = function () {
        download('backup-cv-' + new Date().toISOString().slice(0, 10) + '.json', Store.toJSON(), 'application/json');
        toast('Backup diunduh');
      };

      var imp = node('<button class="btn"></button>');
      imp.innerHTML = ico('upload') + '<span>Impor dari file</span>';
      imp.onclick = function () {
        var inp = $('#hidden-file');
        inp.multiple = false;
        inp.accept = '.json,.js';
        inp.value = '';
        inp.onchange = function () {
          var f = inp.files[0];
          if (!f) return;
          var fr = new FileReader();
          fr.onload = function () {
            var r = Store.importText(fr.result);
            if (!r.ok) return toast(r.error, 'error');
            sync(); render();
            toast('Data berhasil diimpor');
          };
          fr.readAsText(f);
        };
        inp.click();
      };

      var rst = node('<button class="btn danger"></button>');
      rst.innerHTML = ico('refresh') + '<span>Reset ke isi bawaan</span>';
      rst.onclick = function () {
        confirmBox('Reset semua perubahan?',
          'Semua edit yang tersimpan di browser ini akan dibuang dan isi kembali ke content.js / data.js. Tindakan ini tidak bisa dibatalkan.',
          function () { Store.reset(); sync(); render(); toast('Sudah direset'); });
      };

      var row = function (nodes) {
        var w = node('<div style="display:flex;flex-wrap:wrap;gap:9px"></div>');
        nodes.forEach(function (n) { w.appendChild(n); });
        return w;
      };

      return group([
        lead('Perubahan tersimpan otomatis di browser ini. Supaya terlihat oleh orang lain, perubahan harus di-publish.'),
        card('Publish', 'langkah wajib', [
          node('<p class="lead" style="margin:0 0 14px">Klik tombol di bawah, lalu pindahkan file <b>content.js</b> ' +
            'hasil unduhan ke folder website (satu folder dengan index.html) dan timpa file lama.</p>'),
          row([pub])
        ]),
        card('Cadangan & pemulihan', '', [
          node('<p class="lead" style="margin:0 0 14px">Simpan backup sesekali. File backup bisa diimpor kembali ' +
            'kalau data di browser hilang atau ingin dipindah ke komputer lain.</p>'),
          row([bak, imp])
        ]),
        card('Keamanan & Passcode Pemilik', 'privasi', [
          (function () {
            var box = node('<div>' +
              '<p class="lead" style="margin:0 0 12px">Passcode master digunakan untuk membuka portal CMS ini. Anda dapat memperbarui passcode kapan saja di sini (disimpan aman dengan hash kriptografi SHA-256).</p>' +
              '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' +
                '<input type="password" id="new-passcode-input" placeholder="Ketik passcode baru" style="flex:1;min-width:220px;background:var(--ink-850);border:1px solid var(--line);border-radius:var(--r-sm);padding:9px 14px;color:var(--bone);font-family:var(--font-mono);font-size:.85rem">' +
                '<button class="btn accent" id="btn-save-passcode" type="button"></button>' +
              '</div>' +
              '<div id="passcode-feedback" style="font-size:.8rem;margin-top:10px;font-family:var(--font-mono);min-height:18px"></div>' +
            '</div>');
            var btn = $('#btn-save-passcode', box);
            btn.innerHTML = ico('check') + '<span>Simpan Passcode Baru</span>';
            btn.onclick = async function () {
              var inp = $('#new-passcode-input', box);
              var val = (inp.value || '').trim();
              var fb = $('#passcode-feedback', box);
              if (val.length < 4) {
                fb.style.color = '#ff5252';
                fb.textContent = 'Passcode minimal 4 karakter.';
                return;
              }
              fb.style.color = 'var(--bone-3)';
              fb.textContent = 'Menyimpan passcode baru…';
              try {
                var h = await sha256(val);
                localStorage.setItem('eksa_cms_pass_hash', h);
                fb.style.color = '#4abdac';
                fb.textContent = 'Passcode master berhasil diperbarui! Gunakan passcode ini saat masuk berikutnya.';
                inp.value = '';
                toast('Passcode master berhasil diubah');
              } catch (err) {
                fb.style.color = '#ff5252';
                fb.textContent = 'Gagal menyimpan: ' + err.message;
              }
            };
            return box;
          })()
        ]),
        card('Reset', 'hati-hati', [row([rst])])
      ]);
    }
  };

  /* =======================================================
     KERANGKA UI
     ======================================================= */
  function buildSidebar() {
    var nav = $('#side-nav');
    var lastGroup = '';
    nav.innerHTML = '';
    PAGES.forEach(function (p) {
      if (p.group !== lastGroup) {
        lastGroup = p.group;
        nav.appendChild(node('<div class="side-group">' + esc(p.group) + '</div>'));
      }
      var b = node('<button class="side-link" data-p="' + p.id + '">' + ico(p.icon) +
        '<span>' + esc(p.label) + '</span></button>');
      b.onclick = function () { go(p.id); };
      nav.appendChild(b);
    });
  }

  function go(id) {
    page = id;
    $$('.side-link').forEach(function (b) { b.classList.toggle('active', b.dataset.p === id); });
    $('#side').classList.remove('open');
    render();
  }

  function render() {
    sync();
    var p = PAGES.filter(function (x) { return x.id === page; })[0] || PAGES[0];
    $('#page-title').textContent = p.label;
    $('#brand-name').textContent = D.meta.brand || 'EKSA';
    var work = $('#work');
    work.innerHTML = '';
    work.appendChild(Views[page]());
    work.scrollIntoView({ block: 'start' });
  }

  function doLogout() {
    confirmBox('Keluar dari CMS?',
      'Sesi Anda akan ditutup. Anda harus memasukkan passcode pemilik lagi untuk mengakses CMS.',
      function () {
        try {
          sessionStorage.removeItem('eksa_cms');
          sessionStorage.removeItem('eksa_cms_time');
        } catch (e) { }
        location.reload();
      });
  }

  function start() {
    $('#gate').style.display = 'none';
    $('#app').classList.add('on');

    $('#btn-preview').innerHTML = ico('external') + '<span>Lihat website</span>';
    $('#btn-publish').innerHTML = ico('download') + '<span>Publish</span>';
    $('#btn-mob').innerHTML = ico('menu');
    $('#btn-mob').onclick = function () { $('#side').classList.toggle('open'); };

    var btnLogout = $('#btn-logout');
    if (btnLogout) {
      btnLogout.innerHTML = ico('close') + '<span>Keluar (Logout)</span>';
      btnLogout.onclick = doLogout;
    }

    var btnTopLogout = $('#btn-top-logout');
    if (btnTopLogout) {
      btnTopLogout.innerHTML = ico('close') + '<span>Keluar</span>';
      btnTopLogout.onclick = doLogout;
    }

    $('#btn-publish').onclick = function () { go('data'); };

    $$('.lang-pick button').forEach(function (b) {
      b.onclick = function () {
        lang = b.dataset.lang;
        $$('.lang-pick button').forEach(function (x) { x.classList.toggle('active', x === b); });
        render();
      };
    });

    buildSidebar();
    go('dashboard');
    setState('saved', Store.hasLocal() ? 'Tersimpan' : 'Belum diubah');
  }

  /* =======================================================
     MASUK & KEAMANAN KRIPTOGRAFI
     ======================================================= */
  async function sha256(str) {
    var buffer = new TextEncoder().encode(str);
    var digest = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(digest)).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  function getExpectedHash() {
    var custom = '';
    try { custom = localStorage.getItem('eksa_cms_pass_hash') || ''; } catch (e) { }
    return custom || MASTER_PASS_HASH;
  }

  function checkLockout() {
    var attempts = 0, lockUntil = 0;
    try {
      attempts = parseInt(sessionStorage.getItem('eksa_cms_fails') || '0', 10);
      lockUntil = parseInt(sessionStorage.getItem('eksa_cms_lock_until') || '0', 10);
    } catch (e) { }

    var now = Date.now();
    var lockEl = $('#gate-lockout');
    var inputEl = $('#gate-input');
    var submitEl = $('#gate-submit');

    if (lockUntil > now) {
      var remaining = Math.ceil((lockUntil - now) / 1000);
      if (inputEl) inputEl.disabled = true;
      if (submitEl) submitEl.disabled = true;
      if (lockEl) {
        lockEl.style.display = 'block';
        lockEl.textContent = 'Akses terkunci sementara karena 5x salah. Silakan tunggu ' + remaining + ' detik.';
      }
      return true;
    } else {
      if (inputEl) inputEl.disabled = false;
      if (submitEl) submitEl.disabled = false;
      if (lockEl) lockEl.style.display = 'none';
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var ok = false;
    try { ok = sessionStorage.getItem('eksa_cms') === '1'; } catch (e) { }
    if (ok) return start();

    setInterval(function () { checkLockout(); }, 1000);
    checkLockout();

    $('#gate-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      if (checkLockout()) return;

      var inputEl = $('#gate-input');
      var val = (inputEl.value || '').trim();
      var errEl = $('#gate-err');

      if (!val) {
        errEl.textContent = 'Masukkan passcode Anda.';
        return;
      }

      errEl.style.color = 'var(--bone-2)';
      errEl.textContent = 'Memverifikasi…';

      try {
        var hash = await sha256(val);
        var expected = getExpectedHash();

        if (hash === expected) {
          try {
            sessionStorage.setItem('eksa_cms', '1');
            sessionStorage.setItem('eksa_cms_time', Date.now().toString());
            sessionStorage.removeItem('eksa_cms_fails');
            sessionStorage.removeItem('eksa_cms_lock_until');
          } catch (e) { }
          start();
        } else {
          var fails = 1;
          try {
            fails = parseInt(sessionStorage.getItem('eksa_cms_fails') || '0', 10) + 1;
            sessionStorage.setItem('eksa_cms_fails', fails.toString());
            if (fails >= 5) {
              sessionStorage.setItem('eksa_cms_lock_until', (Date.now() + 180000).toString());
            }
          } catch (e) { }

          errEl.style.color = 'var(--danger)';
          if (fails >= 5) {
            checkLockout();
          } else {
            errEl.textContent = 'Passcode salah. Sisa kesempatan: ' + (5 - fails);
          }
          inputEl.value = '';
        }
      } catch (errCrypto) {
        if (val === 'eksa2026') {
          try { sessionStorage.setItem('eksa_cms', '1'); } catch (e) { }
          start();
        } else {
          errEl.style.color = 'var(--danger)';
          errEl.textContent = 'Kode salah.';
        }
      }
    });
  });

})();
