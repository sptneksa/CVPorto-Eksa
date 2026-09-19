/* =========================================================
   STORE — satu-satunya sumber data untuk website & CMS.

   Urutan prioritas saat memuat:
     1. localStorage  (hasil edit di admin.html)
     2. content.js    (file hasil "Publish" — window.PUBLISHED_CONTENT)
     3. data.js       (default bawaan)

   Kalau content.js lebih baru dari localStorage (cap waktu __v),
   content.js yang dipakai — supaya hasil publish tidak tertimpa draft lama.
   ========================================================= */
(function () {
  var KEY = 'eksa_cv_content';
  var LANG_KEY = 'eksa_cv_lang';
  var LANGS = ['id', 'en'];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function isPlainObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  /* merge dalam: object digabung rekursif, array & primitif ditimpa penuh */
  function merge(base, over) {
    if (!isPlainObject(base) || !isPlainObject(over)) {
      return over === undefined ? base : clone(over);
    }
    var out = clone(base);
    Object.keys(over).forEach(function (k) {
      out[k] = merge(base[k], over[k]);
    });
    return out;
  }

  function readLocal() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function published() {
    return (typeof window !== 'undefined' && window.PUBLISHED_CONTENT) || null;
  }

  function resolve() {
    var base = clone(window.DEFAULT_DATA);
    var pub = published();
    var loc = readLocal();

    if (pub && loc) {
      // yang lebih baru menang
      var pv = +pub.__v || 0, lv = +loc.__v || 0;
      return pv > lv ? merge(base, pub) : merge(base, loc);
    }
    if (loc) return merge(base, loc);
    if (pub) return merge(base, pub);
    return base;
  }

  var state = null;

  var Store = {
    LANGS: LANGS,

    /** seluruh data ({ id: {...}, en: {...} }) */
    all: function () {
      if (!state) state = resolve();
      return state;
    },

    /** data untuk satu bahasa */
    get: function (lang) {
      return Store.all()[LANGS.indexOf(lang) >= 0 ? lang : 'id'];
    },

    /** data yang dipakai bersama kedua bahasa (foto & portfolio) */
    shared: function () {
      var a = Store.all();
      if (!a.shared) a.shared = { photo: 'photo.png', portfolio: [] };
      return a.shared;
    },

    /** simpan seluruh data ke localStorage */
    save: function (data) {
      state = data || state;
      state.__v = Date.now();
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          error: 'Penyimpanan browser penuh (maksimal ±5 MB). ' +
            'Kurangi jumlah/ukuran gambar portfolio, lalu simpan lagi.'
        };
      }
    },

    /** ubah satu bagian, mis. set('id', 'skills', [...]) */
    set: function (lang, key, value) {
      var d = Store.get(lang);
      d[key] = value;
      return Store.save();
    },

    /** buang semua perubahan lokal, kembali ke content.js / data.js */
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) { }
      state = null;
      return Store.all();
    },

    /** apakah ada draft lokal yang belum di-publish */
    hasLocal: function () { return !!readLocal(); },

    /** perkiraan pemakaian localStorage dalam byte */
    usage: function () {
      try {
        var raw = localStorage.getItem(KEY);
        return raw ? raw.length * 2 : 0;
      } catch (e) { return 0; }
    },

    /** isi file content.js untuk di-download */
    toContentJS: function () {
      var d = clone(Store.all());
      d.__v = Date.now();
      return '/* content.js — dibuat otomatis oleh CMS (admin.html) pada ' +
        new Date().toLocaleString('id-ID') + '.\n' +
        '   Taruh file ini di folder yang sama dengan index.html.\n' +
        '   JANGAN diedit manual — gunakan admin.html. */\n' +
        'window.PUBLISHED_CONTENT = ' + JSON.stringify(d, null, 2) + ';\n';
    },

    /** isi file backup .json */
    toJSON: function () {
      return JSON.stringify(Store.all(), null, 2);
    },

    /** terima isi file .json atau content.js */
    importText: function (text) {
      var s = String(text).trim();
      var i = s.indexOf('{');
      var j = s.lastIndexOf('}');
      if (i < 0 || j < 0) return { ok: false, error: 'File tidak berisi data yang dikenali.' };
      var parsed;
      try {
        parsed = JSON.parse(s.slice(i, j + 1));
      } catch (e) {
        return { ok: false, error: 'Format file rusak: ' + e.message };
      }
      if (!parsed.id && !parsed.en) {
        return { ok: false, error: 'Data tidak berisi bahasa "id" atau "en".' };
      }
      state = merge(clone(window.DEFAULT_DATA), parsed);
      return Store.save();
    },

    /* --- bahasa aktif --- */
    lang: function (v) {
      if (v === undefined) {
        var saved;
        try { saved = localStorage.getItem(LANG_KEY); } catch (e) { }
        return LANGS.indexOf(saved) >= 0 ? saved : 'id';
      }
      try { localStorage.setItem(LANG_KEY, v); } catch (e) { }
      return v;
    }
  };

  window.Store = Store;
})();
