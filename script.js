/* =========================================================
   SCRIPT — render konten + animasi website publik.
   Data diambil dari Store (data.js / content.js / localStorage).
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ico = function (n, c) { return window.Icons.svg(n, c); };
  // Animasi aktif secara default untuk pengalaman visual maksimal.
  // Tambahkan ?motion=off di URL jika ingin mematikan animasi secara manual.
  var reduced = false;
  if (location.search.indexOf('motion=off') >= 0) reduced = true;
  var coarse = matchMedia('(pointer: coarse)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }



  var lang = Store.lang();
  var D = null;          // data bahasa aktif
  var SH = null;         // data bersama
  var pFilter = 'all';

  var SECTION_IDS = ['about', 'skills', 'education', 'experience', 'projects', 'portfolio', 'certifications', 'awards', 'contact'];

  /* =======================================================
     RENDER
     ======================================================= */
  var Render = {

    head: function () {
      document.documentElement.lang = lang;
      document.title = D.meta.title;
      $('#meta-desc').setAttribute('content', D.meta.description);
      $('#nav-logo').textContent = D.meta.brand;
      // preloader sudah dilepas setelah animasinya selesai
      var pb = $('#pre-brand');
      if (pb) {
        var bName = D.meta.brand || 'EKSA';
        pb.innerHTML = bName.split('').map(function (ch, i) {
          return '<span style="--i:' + i + '">' + esc(ch) + '</span>';
        }).join('');
      }
      var pl = $('#pre-label'); if (pl) pl.textContent = D.ui.labels.loading;
      $('#scroll-label').textContent = D.ui.labels.scroll;
      $('#footer-text').textContent = D.meta.footer;
      var btt = $('#btt-icon');
      if (btt) btt.innerHTML = ico('arrowUp'); else $('#back-to-top').innerHTML = ico('arrowUp');
      $('#back-to-top').setAttribute('aria-label', D.ui.labels.backToTop);
      $('#lightbox-close').innerHTML = ico('close');
      $('#pd-close').innerHTML = ico('close');
    },

    nav: function () {
      $('#nav-links').innerHTML = '<span class="nav-ind" id="nav-ind"></span>' +
        SECTION_IDS.map(function (k) {
          return '<a href="#' + k + '">' + esc(D.ui.nav[k]) + '</a>';
        }).join('');
    },

    rail: function () {
      $('#rail').innerHTML = SECTION_IDS.map(function (k) {
        return '<button data-go="' + k + '" tabindex="-1">' +
          '<span class="rail-label">' + esc(D.ui.nav[k]) + '</span>' +
          '<span class="rail-dot"></span></button>';
      }).join('');
    },

    sectionHeads: function () {
      $$('.sec-head').forEach(function (el) {
        var s = D.sections[el.dataset.sec];
        if (!s) return;
        el.classList.remove('in');
        el.innerHTML =
          '<div class="sec-eyebrow" data-reveal style="--d:0.04s">' +
          '<span class="sec-n">' + esc(s.n) + '</span>' +
          '<span class="sec-dash"></span>' +
          '<span class="sec-tag">' + esc(s.tag) + '</span>' +
          '</div>' +
          '<h2 class="sec-title" data-reveal style="--d:0.12s">' + s.title + '</h2>';
      });
    },

    hero: function () {
      var h = D.hero;

      $('#hero-badge').textContent = h.badge;

      $('#hero-name').innerHTML =
        '<span class="ln">' + esc(h.name) + '</span>' +
        '<span class="ln accent">' + esc(h.name2) + '</span>';

      $('#hero-desc').textContent = h.desc;

      $('#hero-actions').innerHTML =
        '<a href="#contact" class="btn btn-primary magnetic">' + esc(h.ctaPrimary) + ico('arrowUpRight') + '</a>' +
        '<a href="#portfolio" class="btn btn-ghost magnetic">' + esc(h.ctaSecondary) + ico('arrowUpRight') + '</a>';

      $('#hero-stats').innerHTML = (h.stats || []).map(function (s) {
        return '<div class="stat-item">' +
          '<div class="stat-number" data-count>' + esc(s.value) + '</div>' +
          '<div class="stat-label">' + esc(s.label) + '</div></div>';
      }).join('');

      $('#hero-cards').innerHTML = (h.cards || []).map(function (c) {
        return '<div class="float-card">' + ico(c.icon) +
          '<div><div class="fc-label">' + esc(c.label) + '</div>' +
          '<div class="fc-value">' + esc(c.value) + '</div></div></div>';
      }).join('');

      $('#portrait-fallback').textContent =
        (h.name.charAt(0) + h.name2.charAt(0)).toUpperCase();

      Render.photo();
      Render.roles(h.roles && h.roles.length ? h.roles : [h.subtitle]);
    },

    photo: function () {
      var img = $('#hero-photo'), fb = $('#portrait-fallback'), xrayImg = $('#xray-photo');
      var src = (SH && SH.photo) || 'photo.png';
      var probe = new Image();
      probe.onload = function () { img.src = src; img.hidden = false; fb.style.display = 'none'; };
      probe.onerror = function () { img.hidden = true; fb.style.display = ''; };
      probe.src = src;

      if (xrayImg) {
        var xrayProbe = new Image();
        xrayProbe.onload = function () { xrayImg.src = 'xray.png'; };
        xrayProbe.src = 'xray.png';
      }
    },

    roles: (function () {
      var timer = null;
      return function (list) {
        clearInterval(timer);
        var slot = $('#hero-roles'), i = 0;
        slot.innerHTML = '<b class="in">' + esc(list[0]) + '</b>';
        if (list.length < 2 || reduced) return;
        timer = setInterval(function () {
          var cur = slot.querySelector('b');
          i = (i + 1) % list.length;
          var next = document.createElement('b');
          next.textContent = list[i];
          next.className = 'in';
          slot.appendChild(next);
          if (cur) {
            cur.className = 'out';
            setTimeout(function () { cur.remove(); }, 700);
          }
        }, 2800);
      };
    })(),

    about: function () {
      var a = D.about;
      $('#about-body').innerHTML = a.body; // sengaja HTML: diisi dari CMS

      $('#about-info').innerHTML = (a.info || []).map(function (r, i) {
        return '<div class="row" data-reveal style="--d:' + (i * 0.07) + 's">' +
          '<div class="k">' + esc(r.label) + '</div><div class="v">' + esc(r.value) + '</div></div>';
      }).join('');

      $('#about-highlights').innerHTML = (a.highlights || []).map(function (h, i) {
        return '<article class="hl-card spotlight tilt" data-reveal style="--d:' + (i * 0.09) + 's">' +
          '<div class="hl-head">' + ico(h.icon) + '<h3 class="hl-title">' + esc(h.title) + '</h3></div>' +
          '<p class="hl-desc">' + esc(h.desc) + '</p></article>';
      }).join('');
    },

    skills: function () {
      var list = D.skills || [];

      $('#skills-grid').innerHTML = list.map(function (s, i) {
        return '<article class="skill-card" data-reveal style="--d:' + (i * 0.07) + 's">' +
          '<div class="skill-head">' + ico(s.icon) + '<h3 class="skill-name">' + esc(s.name) + '</h3></div>' +
          '<div class="skill-tags">' + (s.tags || []).map(function (t) {
            return '<span class="chip">' + esc(t) + '</span>';
          }).join('') + '</div></article>';
      }).join('');

      // pita berjalan: semua tag, digandakan supaya loop-nya mulus
      var all = [];
      list.forEach(function (s) { all = all.concat(s.tags || []); });
      if (!all.length) { $('#skills-marquee').style.display = 'none'; return; }
      $('#skills-marquee').style.display = '';
      var row = all.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
      $('#marquee-track').innerHTML = row + row;
      Marquee.measure();
    },

    education: function () {
      var items = D.education || [];
      $('#education-list').innerHTML = items.map(function (e, i) {
        return '<article class="edu-card" data-reveal style="--d:' + (i * 0.08) + 's">' +
          '<div class="edu-top"><div>' +
          '<h3 class="edu-inst">' + esc(e.institution) + '</h3>' +
          '<div class="edu-degree">' + esc(e.degree) + '</div></div>' +
          '<div class="edu-gpa-box">' +
          '<div class="edu-gpa" data-count>' + esc(e.gpa) + '</div>' +
          '<div class="edu-gpa-label">' + esc(D.ui.labels.gpa) + '</div>' +
          '<div class="edu-period">' + esc(e.period) + '</div></div></div>' +
          (e.status ? '<div class="edu-meta-row"><span class="tagline">' + ico('shield') + esc(e.status) + '</span></div>' : '') +
          (e.thesis ? '<div class="edu-thesis"><div class="k">' + esc(D.ui.labels.thesis) + '</div>' +
            '<div class="v">' + esc(e.thesis) + '</div></div>' : '') +
          '</article>';
      }).join('');
    },

    experience: function () {
      $('#exp-tabs').innerHTML =
        '<button class="tab-btn active" data-tab="clinical">' + ico('stethoscope') + esc(D.ui.tabs.clinical) + '</button>' +
        '<button class="tab-btn" data-tab="professional">' + ico('briefcase') + esc(D.ui.tabs.professional) + '</button>';

      ['clinical', 'professional'].forEach(function (type) {
        var items = (D.experience && D.experience[type]) || [];
        $('#tl-' + type).innerHTML = items.map(function (x, i) {
          return '<div class="tl-item" data-reveal style="--d:' + (i * 0.07) + 's">' +
            '<span class="tl-dot"></span>' +
            '<div class="tl-card"><div class="tl-top"><div>' +
            '<h3 class="tl-title">' + esc(x.title) + '</h3>' +
            '<div class="tl-sub">' + esc(x.subtitle) + '</div></div>' +
            '<div class="tl-meta">' +
            '<span>' + ico('calendar') + esc(x.date) + '</span>' +
            '<span>' + ico('pin') + esc(x.location) + '</span>' +
            '</div></div>' +
            '<ul class="tl-points">' + (x.points || []).map(function (p) {
              return '<li>' + esc(p) + '</li>';
            }).join('') + '</ul></div></div>';
        }).join('');
      });
    },

    projects: function () {
      $('#projects-list').innerHTML = (D.projects || []).map(function (p, i) {
        return '<article class="proj-row" data-reveal style="--d:' + (i * 0.06) + 's">' +
          '<div class="proj-n">' + String(i + 1).padStart(2, '0') + '</div>' +
          '<div class="proj-main">' +
          '<h3 class="proj-title">' + esc(p.title) + '</h3>' +
          '<div class="proj-role">' + esc(p.role) + '</div>' +
          '<p class="proj-desc">' + esc(p.desc) + '</p>' +
          '<div class="proj-tags">' + (p.tags || []).map(function (t) {
            return '<span class="chip">' + esc(t) + '</span>';
          }).join('') + '</div></div>' +
          '<div class="proj-go">' + ico('arrowRight') + '</div></article>';
      }).join('');
    },

    portfolioFilters: function () {
      var f = D.ui.filters;
      var icons = { all: 'sparkles', desain: 'palette', foto: 'camera', video: 'film', ilustrasi: 'pen', lainnya: 'folder' };
      $('#portfolio-filters').innerHTML = Object.keys(f).map(function (k) {
        return '<button class="filter-btn' + (k === pFilter ? ' active' : '') + '" data-filter="' + k + '">' +
          ico(icons[k] || 'folder') + esc(f[k]) + '</button>';
      }).join('');
    },

    portfolio: function () {
      var items = (SH.portfolio || []).map(migrate);
      var list = pFilter === 'all' ? items : items.filter(function (x) { return x.category === pFilter; });
      var grid = $('#portfolio-grid');

      if (!list.length) {
        grid.innerHTML = '<div class="pf-empty">' + ico('image') +
          '<p>' + esc(D.ui.labels.emptyPortfolio) + '</p></div>';
        return;
      }

      grid.innerHTML = list.map(function (x, i) {
        var gi = items.indexOf(x);
        var f = (x.files || [])[0] || {};
        var isVid = f.type && f.type.indexOf('video/') === 0;
        var media = isVid
          ? '<video src="' + esc(f.data) + '" muted loop playsinline></video>'
          : '<img src="' + esc(f.data) + '" alt="' + esc(title(x)) + '" loading="lazy">';
        return '<article class="pf-item tilt" data-reveal style="--d:' + (i * 0.07) + 's" data-i="' + gi + '">' + media +
          '<div class="pf-overlay">' +
          '<div class="pf-cat">' + esc(D.ui.filters[x.category] || x.category) + '</div>' +
          '<div class="pf-title">' + esc(title(x)) + '</div>' +
          ((x.files || []).length > 1 ? '<div class="pf-count">' + x.files.length + ' files</div>' : '') +
          '</div></article>';
      }).join('');

      $$('.pf-item', grid).forEach(function (el) {
        el.addEventListener('click', function () { PortfolioDetail.open(+el.dataset.i); });
        var v = el.querySelector('video');
        if (v) {
          el.addEventListener('mouseenter', function () { v.play().catch(function () { }); });
          el.addEventListener('mouseleave', function () { v.pause(); v.currentTime = 0; });
        }
      });
    },

    certs: function () {
      $('#certs-list').innerHTML = (D.certifications || []).map(function (c, i) {
        return '<article class="cert-row" data-reveal style="--d:' + (i * 0.05) + 's">' +
          '<span class="cert-ico">' + ico(c.icon) + '</span>' +
          '<div><div class="cert-name">' + esc(c.name) + '</div>' +
          '<div class="cert-issuer">' + esc(c.issuer) + '</div></div>' +
          '<div class="cert-year">' + esc(c.year) + '</div></article>';
      }).join('');
    },

    awards: function () {
      $('#awards-grid').innerHTML = (D.awards || []).map(function (a, i) {
        return '<article class="award-card" data-reveal style="--d:' + (i * 0.05) + 's">' +
          ico(a.icon) +
          '<h3 class="award-title">' + esc(a.title) + '</h3>' +
          '<p class="award-org">' + esc(a.org) + '</p>' +
          '<div class="award-year">' + esc(a.year) + '</div></article>';
      }).join('');
    },

    contact: function () {
      var c = D.contact;
      var ch = $('#contact-headline');
      ch.textContent = c.headline;
      ch.setAttribute('data-reveal', '');
      ch.style.setProperty('--d', '0.08s');

      var cn = $('#contact-note');
      cn.textContent = c.note;
      cn.setAttribute('data-reveal', '');
      cn.style.setProperty('--d', '0.14s');

      var rows = [
        { icon: 'mail', k: 'Email', v: c.email, href: 'mailto:' + c.email },
        { icon: 'phone', k: 'Phone', v: c.phoneDisplay, href: 'tel:' + c.phone },
        { icon: 'linkedin', k: 'LinkedIn', v: c.linkedin, href: 'https://' + String(c.linkedin).replace(/^https?:\/\//, '') },
        { icon: 'pin', k: 'Location', v: c.location, href: '' }
      ].filter(function (r) { return r.v; });

      $('#contact-list').innerHTML = rows.map(function (r, i) {
        var inner = ico(r.icon) +
          '<div class="contact-k">' + esc(r.k) + '</div>' +
          '<div class="contact-v">' + esc(r.v) + '</div>' +
          '<span class="contact-go">' + (r.href ? ico('arrowUpRight') : '') + '</span>';
        var attrs = ' class="contact-row" data-reveal style="--d:' + (i * 0.07) + 's"';
        return r.href
          ? '<a href="' + esc(r.href) + '"' + (r.icon === 'linkedin' ? ' target="_blank" rel="noopener"' : '') + attrs + '>' + inner + '</a>'
          : '<div' + attrs + '>' + inner + '</div>';
      }).join('');
    },

    all: function () {
      D = Store.get(lang);
      SH = Store.shared();
      this.head(); this.nav(); this.rail(); this.sectionHeads(); this.hero(); this.about();
      this.skills(); this.education(); this.experience(); this.projects();
      this.portfolioFilters(); this.portfolio(); this.certs(); this.awards(); this.contact();
      Anim.bind();
      Scroll.refresh();
    }
  };

  function title(x) { return (lang === 'en' && x.titleEn) ? x.titleEn : x.title; }
  function desc(x) { return (lang === 'en' && x.descEn) ? x.descEn : x.desc; }

  /* format portfolio lama (1 file) -> format baru (banyak file) */
  function migrate(item) {
    if (item.files) return item;
    return {
      title: item.title, titleEn: item.titleEn, category: item.category,
      desc: item.desc || '', descEn: item.descEn, date: item.date,
      files: item.data ? [{ data: item.data, type: item.type, name: item.title }] : []
    };
  }

  /* =======================================================
     PITA BERJALAN
     Digerakkan sendiri lewat rAF supaya kecepatannya tetap
     (px per detik) berapa pun panjang pita, dan bisa ikut
     terdorong oleh arah & kecepatan scroll.
     ======================================================= */
  var Marquee = {
    track: null, half: 0, offset: 0, hover: false, speed: 42,

    init: function () {
      this.track = $('#marquee-track');
      if (!this.track) return;
      var m = $('#skills-marquee');
      m.addEventListener('mouseenter', function () { Marquee.hover = true; });
      m.addEventListener('mouseleave', function () { Marquee.hover = false; });
      addEventListener('resize', function () { Marquee.measure(); });
      this.measure();
    },

    measure: function () {
      if (!this.track) return;
      // isinya digandakan dua kali, jadi satu putaran = setengah lebar
      this.half = this.track.scrollWidth / 2;
      if (this.offset > this.half) this.offset = 0;
    },

    step: function (dt, velocity) {
      if (!this.track || !this.half || reduced) return;
      var v = this.hover ? this.speed * 0.25 : this.speed;
      // scroll ke bawah mempercepat, ke atas memperlambat / membalik
      this.offset += (v + velocity * 2.2) * dt;
      // tetap dalam satu putaran, arah mana pun
      this.offset = ((this.offset % this.half) + this.half) % this.half;
      this.track.style.transform = 'translate3d(' + (-this.offset).toFixed(2) + 'px,0,0)';
    }
  };

  /* =======================================================
     SCROLL — satu rAF untuk semua efek yang terikat scroll
     ======================================================= */
  var Scroll = {
    wrap: null,
    target: 0, current: 0, velocity: 0,
    last: 0,
    els: null,

    init: function () {
      this.wrap = $('#smooth-wrap');
      this.cache();
      this.current = this.target = scrollY;
      this.last = performance.now();

      addEventListener('resize', function () { Scroll.resize(); });
      $('#back-to-top').addEventListener('click', function () { Scroll.to(0); });
      $('#rail').addEventListener('click', function (e) {
        var b = e.target.closest('[data-go]');
        if (b) Scroll.toId(b.dataset.go);
      });

      (function loop(now) {
        Scroll.frame(now);
        requestAnimationFrame(loop);
      })(this.last);
    },

    /* elemen di-cache supaya loop tidak query DOM tiap frame */
    cache: function () {
      this.els = {
        bar: $('#scroll-progress'),
        nav: $('#navbar'),
        top: $('#back-to-top'),
        ringFill: $('#ring-fill'),
        sections: $$('main section[id]'),
        watermarks: $$('.sec-watermark'),
        links: $$('#nav-links a'),
        rails: $$('#rail button'),
        parallax: $$('[data-parallax]'),
        timelines: $$('.timeline'),
        dots: $$('.tl-item')
      };
    },

    refresh: function () {
      this.cache();
      Marquee.measure();
      Nav.sync();
    },

    resize: function () { Marquee.measure(); },

    to: function (y) {
      scrollTo({ top: y, behavior: 'smooth' });
    },

    toId: function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      this.to(el.offsetTop - (id === 'hero' ? 0 : 40));
    },

    frame: function (now) {
      var dt = Math.min((now - this.last) / 1000, 0.05);
      this.last = now;

      this.target = scrollY;
      var prev = this.current;
      // lerp dengan responsivitas stabil
      this.current += (this.target - this.current) * (1 - Math.pow(0.003, dt));
      if (Math.abs(this.target - this.current) < 0.08) this.current = this.target;
      this.velocity = this.current - prev;

      // Marquee meluncur stabil tanpa lonjakan tajam
      Marquee.step(dt, clamp(this.velocity * 0.12, -1.2, 1.2));

      var e = this.els;
      var max = document.documentElement.scrollHeight - innerHeight;
      var progress = max > 0 ? clamp(this.current / max, 0, 1) : 0;

      e.bar.style.transform = 'scaleX(' + progress + ')';
      if (e.ringFill) {
        var circ = 119.38;
        e.ringFill.style.strokeDashoffset = (circ - progress * circ).toFixed(2);
      }
      e.nav.classList.toggle('scrolled', this.current > 40);
      e.top.classList.toggle('show', this.current > 400);

      // Hanya hitung posisi elemen jika scroll aktif bergerak (mengeliminasi layout thrashing)
      var isScrolling = Math.abs(this.velocity) > 0.04 || Math.abs(this.target - this.current) > 0.5;
      if (isScrolling || !this._initPass) {
        this._initPass = true;

        // Section Watermarks Parallax
        if (!reduced && e.watermarks && e.watermarks.length) {
          e.watermarks.forEach(function (wm) {
            var p = wm.parentElement;
            if (!p) return;
            var r = p.getBoundingClientRect();
            if (r.bottom > -100 && r.top < innerHeight + 100) {
              var off = (r.top - innerHeight * 0.3) * -0.12;
              wm.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
            }
          });
        }

        // Penanda section aktif
        var mark = innerHeight * 0.35, current = '';
        for (var i = 0; i < e.sections.length; i++) {
          var r = e.sections[i].getBoundingClientRect();
          if (r.top <= mark && r.bottom > mark) { current = e.sections[i].id; break; }
        }
        if (current && current !== this._section) {
          this._section = current;
          e.links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
          e.rails.forEach(function (b) { b.classList.toggle('on', b.dataset.go === current); });
          Nav.sync();
        }

        if (!reduced) {
          e.parallax.forEach(function (el) {
            var r = el.getBoundingClientRect();
            var off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.parallax);
            el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
          });
        }

        // Garis timeline
        e.timelines.forEach(function (tl) {
          var r = tl.getBoundingClientRect();
          var p = (innerHeight * 0.72 - r.top) / r.height;
          tl.style.setProperty('--draw', clamp(p, 0, 1) * 100 + '%');
        });

        // Titik timeline
        e.dots.forEach(function (it) {
          var on = it.getBoundingClientRect().top < innerHeight * 0.72;
          var dot = it.firstElementChild;
          if (dot && dot.classList.contains('on') !== on) dot.classList.toggle('on', on);
        });
      }
    }
  };

  /* =======================================================
     INDIKATOR MENU YANG MELUNCUR
     ======================================================= */
  var Nav = {
    ind: null, box: null,

    init: function () {
      this.box = $('#nav-links');
      var self = this;
      this.box.addEventListener('mouseover', function (e) {
        var a = e.target.closest('a');
        if (a) self.move(a);
      });
      this.box.addEventListener('mouseleave', function () { self.sync(); });
      addEventListener('resize', function () { self.sync(); });
    },

    move: function (a) {
      this.ind = $('#nav-ind');
      if (!this.ind || !a || innerWidth <= 900) return;
      this.ind.style.width = a.offsetWidth + 'px';
      this.ind.style.transform = 'translateX(' + a.offsetLeft + 'px)';
      this.ind.classList.add('on');
    },

    sync: function () {
      this.ind = $('#nav-ind');
      if (!this.ind) return;
      var a = $('#nav-links a.active');
      if (a && innerWidth > 900) this.move(a);
      else this.ind.classList.remove('on');
    }
  };

  /* =======================================================
     ANIMASI (Modern Fluid & Spotlight)
     ======================================================= */
  var Anim = {

    io: null,

    observe: function () {
      if (!window.IntersectionObserver) {
        $$('[data-reveal], .sec-head').forEach(function (el) { el.classList.add('in'); });
        return;
      }
      if (!this.io) {
        this.io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            en.target.classList.add('in');
            Anim.io.unobserve(en.target);
          });
        }, { threshold: 0.04, rootMargin: '0px 0px -20px 0px' });
      }
      $$('[data-reveal]:not(.in), .sec-head:not(.in)').forEach(function (el) {
        Anim.io.observe(el);
      });
    },

    counters: function () {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, raw = el.textContent.trim();
          var num = parseFloat(raw);
          obs.unobserve(el);
          if (isNaN(num) || reduced) return;
          var suffix = raw.replace(/^[\d.,]+/, '');
          var decimals = (raw.split('.')[1] || '').replace(/\D.*$/, '').length;
          var t0 = performance.now(), dur = 1400;
          (function step(now) {
            var p = Math.min((now - t0) / dur, 1);
            var e2 = 1 - Math.pow(1 - p, 4);
            el.textContent = (num * e2).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
          })(t0);
        });
      }, { threshold: 0.2 });
      $$('[data-count]').forEach(function (el) { obs.observe(el); });
    },

    spotlight: function () {
      $$('.spotlight, .hl-card, .skill-card, .proj-row, .award-card, .edu-card, .pf-item').forEach(function (card) {
        if (card.dataset.sl) return;
        card.dataset.sl = '1';
        card.addEventListener('mousemove', function (ev) {
          var r = card.getBoundingClientRect();
          card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
          card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
        });
      });
    },

    /* kartu miring 3D mengikuti kursor */
    tilt: function () {
      if (reduced || coarse) return;
      $$('.tilt').forEach(function (el) {
        if (el.dataset.tl) return;
        el.dataset.tl = '1';
        el.addEventListener('mousemove', function (ev) {
          var r = el.getBoundingClientRect();
          var px = (ev.clientX - r.left) / r.width - 0.5;
          var py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform =
            'perspective(900px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' +
            (px * 7).toFixed(2) + 'deg) translate3d(0,-4px,0)';
        });
        el.addEventListener('mouseleave', function () { el.style.transform = ''; });
      });
    },

    magnetic: function () {
      if (reduced || coarse) return;
      $$('.magnetic').forEach(function (el) {
        if (el.dataset.mg) return;
        el.dataset.mg = '1';
        el.addEventListener('mousemove', function (ev) {
          var r = el.getBoundingClientRect();
          var x = ev.clientX - r.left - r.width / 2;
          var y = ev.clientY - r.top - r.height / 2;
          el.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.32 + 'px)';
        });
        el.addEventListener('mouseleave', function () {
          el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
          el.style.transform = '';
          setTimeout(function () { el.style.transition = ''; }, 500);
        });
        el.addEventListener('mouseenter', function () { el.style.transition = ''; });
      });
    },

    bind: function () {
      this.counters();
      this.spotlight();
      this.tilt();
      this.magnetic();
    }
  };

  /* --- ambient glow follower (modern dark mode atmosphere) --- */
  function initAmbientGlow() {
    var glow = $('#ambient-glow');
    if (!glow || reduced) return;
    var x = innerWidth * 0.5, y = innerHeight * 0.4;
    var tx = x, ty = y;
    var active = false;

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        glow.classList.add('visible');
      }
    });

    window.addEventListener('mouseleave', function () {
      glow.classList.remove('visible');
      active = false;
    });

    (function loop() {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* --- preloader modern bounce loader --- */
  function initPreloader(done) {
    var pre = $('#preloader');
    if (!pre) return done();

    document.body.classList.add('is-locked');
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(guard);
      pre.classList.add('done');
      document.body.classList.remove('is-locked');
      setTimeout(function () {
        done();
      }, 100);
      setTimeout(function () {
        if (pre.parentNode) pre.remove();
        Scroll.resize();
      }, 550);
    }

    var guard = setTimeout(finish, 2200);

    // Bounce sejenak (~850ms) dan pastikan seluruh font sudah siap sebelum preloader membuka
    var minTimer = new Promise(function (res) { setTimeout(res, 850); });
    var fontsPromise = (document.fonts && document.fonts.ready)
      ? document.fonts.ready
      : Promise.resolve();

    Promise.all([minTimer, fontsPromise]).then(function () {
      setTimeout(finish, 80);
    }).catch(function () {
      finish();
    });
  }

  /* =======================================================
     INTERAKSI
     ======================================================= */
  var Lightbox = {
    open: function (item) {
      var lb = $('#lightbox');
      var isVid = item.type && item.type.indexOf('video/') === 0;
      $('#lightbox-content').innerHTML = isVid
        ? '<video src="' + esc(item.data) + '" controls autoplay playsinline></video>'
        : '<img src="' + esc(item.data) + '" alt="' + esc(item.title || '') + '">';
      $('#lightbox-title').textContent = item.title || '';
      $('#lightbox-cat').textContent = item.cat || '';
      lb.classList.add('active');
      document.body.classList.add('is-locked');
    },
    close: function () {
      var lb = $('#lightbox');
      if (!lb.classList.contains('active')) return;
      lb.classList.remove('active');
      var v = $('#lightbox-content video'); if (v) v.pause();
      setTimeout(function () { $('#lightbox-content').innerHTML = ''; }, 300);
      if (!$('#portfolio-detail').classList.contains('active')) document.body.classList.remove('is-locked');
    }
  };

  var PortfolioDetail = {
    open: function (index) {
      var items = (SH.portfolio || []).map(migrate);
      var item = items[index];
      if (!item) return;

      $('#pd-title').textContent = title(item);

      var html = '<div class="pd-cat">' + esc(D.ui.filters[item.category] || item.category) + '</div>';
      if (desc(item)) html += '<p class="pd-desc">' + esc(desc(item)) + '</p>';
      html += '<div class="pd-gallery">' + (item.files || []).map(function (f, fi) {
        var isVid = f.type && f.type.indexOf('video/') === 0;
        return '<div class="pd-thumb" data-fi="' + fi + '">' +
          (isVid
            ? '<video src="' + esc(f.data) + '" muted></video><div class="play-icon">' + ico('play') + '</div>'
            : '<img src="' + esc(f.data) + '" alt="' + esc(f.name || '') + '">') + '</div>';
      }).join('') + '</div>';

      if (item.date) {
        html += '<div class="pd-date">' + ico('calendar') +
          new Date(item.date).toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID',
            { day: 'numeric', month: 'long', year: 'numeric' }) + '</div>';
      }

      var body = $('#pd-body');
      body.innerHTML = html;
      $$('.pd-thumb', body).forEach(function (el) {
        el.addEventListener('click', function () {
          var f = item.files[+el.dataset.fi];
          if (f) Lightbox.open({ data: f.data, type: f.type, title: f.name || title(item), cat: D.ui.filters[item.category] });
        });
      });

      $('#portfolio-detail').classList.add('active');
      document.body.classList.add('is-locked');
    },
    close: function () {
      $('#portfolio-detail').classList.remove('active');
      if (!$('#lightbox').classList.contains('active')) document.body.classList.remove('is-locked');
    }
  };

  function toast(msg, type) {
    var t = $('#toast');
    t.innerHTML = ico(type === 'error' ? 'close' : 'check') + '<span>' + esc(msg) + '</span>';
    t.className = 'toast show ' + (type || '');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  function initUI() {
    var nav = $('#nav-links'), ham = $('#hamburger');

    ham.addEventListener('click', function () {
      ham.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.classList.toggle('is-locked', nav.classList.contains('open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        ham.classList.remove('active');
        nav.classList.remove('open');
        document.body.classList.remove('is-locked');
      }
    });

    // tab pengalaman
    document.addEventListener('click', function (e) {
      var tab = e.target.closest('.tab-btn[data-tab]');
      if (!tab) return;
      $$('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      $$('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = $('#tab-' + tab.dataset.tab);
      panel.classList.add('active');
      $$('[data-reveal]', panel).forEach(function (el, i) {
        el.classList.remove('in');
        setTimeout(function () { el.classList.add('in'); }, 60 + i * 70);
      });
      Scroll.refresh();
    });

    // filter portfolio
    $('#portfolio-filters').addEventListener('click', function (e) {
      var b = e.target.closest('.filter-btn');
      if (!b) return;
      pFilter = b.dataset.filter;
      $$('.filter-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
      Render.portfolio();
      Anim.bind();
      Scroll.refresh();
    });

    // ganti bahasa
    $$('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.lang === lang) return;
        lang = Store.lang(b.dataset.lang);
        $$('.lang-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity .28s ease';
        setTimeout(function () {
          Render.all();
          $$('[data-reveal], .sec-head').forEach(function (el) { el.classList.add('in'); });
          document.body.style.opacity = '1';
        }, 280);
      });
    });

    $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') Lightbox.close(); });
    $('#lightbox-close').addEventListener('click', Lightbox.close);
    $('#portfolio-detail').addEventListener('click', function (e) { if (e.target.id === 'portfolio-detail') PortfolioDetail.close(); });
    $('#pd-close').addEventListener('click', PortfolioDetail.close);

    addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { Lightbox.close(); PortfolioDetail.close(); }
    });

    // semua tautan dalam halaman lewat Scroll supaya ikut smooth scroll
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      Scroll.toId(id);
    });

    // ===== THEME & APPEARANCE MODE (LIGHT / DARK) =====
    var modeBtn = $('#mode-toggle-btn');
    var themePill = $('#theme-mode-pill');
    var modeIcon = $('#mode-icon');
    var themeModeIcon = $('#theme-mode-icon');
    var themeModeText = $('#theme-mode-text');
    var metaThemeColor = $('meta[name="theme-color"]');

    function applyMode(mode, notify) {
      var isLight = (mode === 'light');
      if (isLight) {
        document.documentElement.setAttribute('data-mode', 'light');
        document.body.setAttribute('data-mode', 'light');
      } else {
        document.documentElement.removeAttribute('data-mode');
        document.body.removeAttribute('data-mode');
      }
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isLight ? '#f8fafc' : '#08080a');
      }
      var iconSvg = Icons.svg(isLight ? 'moon' : 'sun');
      if (modeIcon) modeIcon.innerHTML = iconSvg;
      if (themeModeIcon) themeModeIcon.innerHTML = iconSvg;
      if (themeModeText) themeModeText.textContent = isLight ? 'LIGHT' : 'DARK';
      if (modeBtn) {
        modeBtn.setAttribute('title', isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang');
        modeBtn.setAttribute('aria-label', isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang');
      }
      try { localStorage.setItem('eksa_mode', isLight ? 'light' : 'dark'); } catch (e) { }
      if (notify) {
        toast(isLight ? 'Mode Terang (Light Mode) Aktif' : 'Mode Gelap (Dark Mode) Aktif');
      }
    }

    var savedMode = 'dark';
    try { savedMode = localStorage.getItem('eksa_mode') || 'dark'; } catch (e) { }
    applyMode(savedMode, false);

    var toggleMode = function () {
      var cur = document.documentElement.getAttribute('data-mode') === 'light' ? 'light' : 'dark';
      applyMode(cur === 'light' ? 'dark' : 'light', true);
    };

    if (modeBtn) modeBtn.addEventListener('click', toggleMode);
    if (themePill) themePill.addEventListener('click', toggleMode);

    // ===== THEME ACCENT SWITCHER =====
    var savedTheme = 'solar';
    try { savedTheme = localStorage.getItem('eksa_theme') || 'solar'; } catch (e) { }
    if (savedTheme !== 'solar') {
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    }
    $$('.theme-dot').forEach(function (dot) {
      dot.classList.toggle('active', dot.dataset.theme === savedTheme);
      dot.addEventListener('click', function () {
        var th = dot.dataset.theme;
        $$('.theme-dot').forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
        if (th === 'solar') {
          document.documentElement.removeAttribute('data-theme');
          document.body.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', th);
          document.body.setAttribute('data-theme', th);
        }
        try { localStorage.setItem('eksa_theme', th); } catch (e) { }
        toast('Suasana: ' + dot.getAttribute('title'));
      });
    });

    // ===== RADIOGRAPHER X-RAY SCAN MODE =====
    var portrait = $('#portrait'), xrayBtn = $('#xray-toggle-btn');
    if (xrayBtn && portrait) {
      var btnLabel = xrayBtn.querySelector('.xray-btn-label');
      var hudBotL = $('#hud-bot-l');

      xrayBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var active = portrait.classList.toggle('xray-active');
        portrait.classList.remove('xray-manual');
        portrait.style.removeProperty('--scan-y');
        if (hudBotL) hudBotL.innerHTML = '<span>WL:400 WW:2000 [BONE]</span>';
        if (btnLabel) btnLabel.textContent = active ? 'X-RAY ACTIVE' : 'SCAN MODE';
        if (navigator.vibrate) { try { navigator.vibrate(active ? [30, 50, 30] : 20); } catch (err) { } }
        toast(active ? 'Mode Radiografi (Sinar-X) Aktif: Detektor Pemindai Tulang' : 'Mode Radiografi Dinonaktifkan');
      });

      // Interactive detector scrubbing (mouse drag / touch)
      function updateScanY(e) {
        if (!portrait.classList.contains('xray-active')) return;
        var rect = portrait.getBoundingClientRect();
        var clientY = e.clientY != null ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);
        if (clientY == null) return;
        var y = clientY - rect.top;
        var pct = clamp((y / rect.height) * 100, 0, 100);
        portrait.style.setProperty('--scan-y', pct.toFixed(1) + '%');
        if (hudBotL) {
          hudBotL.innerHTML = '<span>POS: ' + pct.toFixed(0) + '% · [BONE]</span>';
        }
      }

      portrait.addEventListener('pointerdown', function (e) {
        if (!portrait.classList.contains('xray-active')) return;
        if (e.target.closest('#xray-toggle-btn')) return;
        portrait.classList.add('xray-manual');
        updateScanY(e);
        if (portrait.setPointerCapture) {
          try { portrait.setPointerCapture(e.pointerId); } catch (err) { }
        }
      });

      portrait.addEventListener('pointermove', function (e) {
        if (!portrait.classList.contains('xray-active')) return;
        if (portrait.classList.contains('xray-manual')) {
          updateScanY(e);
        }
      });

      var releaseManual = function (e) {
        if (portrait.classList.contains('xray-manual')) {
          portrait.classList.remove('xray-manual');
          portrait.style.removeProperty('--scan-y');
          if (hudBotL) hudBotL.innerHTML = '<span>WL:400 WW:2000 [BONE]</span>';
          if (e && e.pointerId && portrait.releasePointerCapture) {
            try { portrait.releasePointerCapture(e.pointerId); } catch (err) { }
          }
        }
      };

      portrait.addEventListener('pointerup', releaseManual);
      portrait.addEventListener('pointercancel', releaseManual);
    }

    // ===== SECRET OWNER GATEWAY (CMS ACCESS) =====
    async function hashText(str) {
      var buffer = new TextEncoder().encode(str);
      var digest = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(digest)).map(function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    }

    function openOwnerModal() {
      var m = $('#owner-modal');
      if (!m) return;
      m.classList.add('active');
      document.body.classList.add('is-locked');
      var inp = $('#owner-pass-input');
      if (inp) { inp.value = ''; setTimeout(function () { inp.focus(); }, 120); }
      var err = $('#owner-err');
      if (err) err.textContent = '';
    }

    function closeOwnerModal() {
      var m = $('#owner-modal');
      if (!m) return;
      m.classList.remove('active');
      if (!$('#lightbox').classList.contains('active') && !$('#portfolio-detail').classList.contains('active')) {
        document.body.classList.remove('is-locked');
      }
    }

    var ownerClose = $('#owner-modal-close');
    if (ownerClose) ownerClose.addEventListener('click', closeOwnerModal);
    var ownerOverlay = $('#owner-modal');
    if (ownerOverlay) {
      ownerOverlay.addEventListener('click', function (e) {
        if (e.target.id === 'owner-modal') closeOwnerModal();
      });
    }

    // Shortcut: Ctrl + Shift + S atau Ctrl + Shift + E
    addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        openOwnerModal();
      }
      if (e.key === 'Escape') closeOwnerModal();
    });

    // Gesture rahasia: klik 3x logo brand atau titik rahasia footer
    function registerSecretClicks(el) {
      if (!el) return;
      var clicks = 0, timer = null;
      el.addEventListener('click', function (e) {
        clicks++;
        clearTimeout(timer);
        if (clicks >= 3) {
          clicks = 0;
          e.preventDefault();
          openOwnerModal();
        } else {
          timer = setTimeout(function () { clicks = 0; }, 550);
        }
      });
    }
    registerSecretClicks($('#nav-logo'));
    registerSecretClicks($('#footer-secret'));

    // Verifikasi passcode pemilik di modal
    var ownerForm = $('#owner-quick-form');
    if (ownerForm) {
      ownerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        var val = ($('#owner-pass-input').value || '').trim();
        var err = $('#owner-err');
        if (!val) {
          err.textContent = 'Passcode tidak boleh kosong.';
          return;
        }
        err.style.color = 'var(--bone-2)';
        err.textContent = 'Memverifikasi…';
        try {
          var h = await hashText(val);
          var masterHash = '80a016d3d7534b6539873671c2172852169ee3f14a0face8bd0450496a5a8a67';
          var customHash = '';
          try { customHash = localStorage.getItem('eksa_cms_pass_hash') || ''; } catch (ex) { }
          var valid = customHash ? (h === customHash) : (h === masterHash);
          if (valid) {
            try {
              sessionStorage.setItem('eksa_cms', '1');
              sessionStorage.setItem('eksa_cms_time', Date.now().toString());
            } catch (ex) { }
            err.style.color = '#4abdac';
            err.textContent = 'Akses diterima! Mengalihkan ke CMS…';
            setTimeout(function () { location.href = 'admin.html'; }, 350);
          } else {
            err.style.color = '#ff5252';
            err.textContent = 'Passcode salah. Akses ditolak.';
            $('#owner-pass-input').value = '';
          }
        } catch (errHash) {
          // fallback jika crypto digest error
          if (val === 'eksa2026') {
            try { sessionStorage.setItem('eksa_cms', '1'); } catch (ex) { }
            location.href = 'admin.html';
          } else {
            err.style.color = '#ff5252';
            err.textContent = 'Passcode salah.';
          }
        }
      });
    }
  }

  /* =======================================================
     START
     ======================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    $$('.lang-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });

    Render.all();
    initUI();
    initAmbientGlow();
    Marquee.init();
    Nav.init();
    Scroll.init();

    // font display mengubah tinggi baris -> ukur ulang setelah siap
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { Scroll.refresh(); });
    }

    initPreloader(function () {
      Anim.observe();
      // hero elemen masuk berurutan dengan jeda elegan
      var heroReveals = $$('#hero [data-reveal]');
      heroReveals.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('in');
        }, 50 + i * 80);
      });
      Scroll.resize();
    });

    window.EksaSite = { render: function () { Render.all(); }, toast: toast, scroll: Scroll, marquee: Marquee };
  });

})();
