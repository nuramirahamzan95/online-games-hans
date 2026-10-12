/* Main Nombor — helper kecil yang dikongsi semua game. Global: window.OG
   Dwibahasa: teks statik guna atribut data-en="English" (teks BM dalam HTML),
   teks dinamik dalam JS guna OG.L('teks BM','English text'). */
(function(){
  const PREFIX='main-nombor:';
  const STAR='<svg viewBox="0 0 24 24"><path d="M12 2.6l2.85 6 6.55.78-4.85 4.55 1.28 6.5L12 17.2l-5.83 3.23 1.28-6.5L2.6 9.38l6.55-.78z"/></svg>';

  const OG={
    reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,

    shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;},
    pick(a){return a[Math.floor(Math.random()*a.length)];},
    rand(min,max){return min+Math.floor(Math.random()*(max-min+1));},
    fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');},

    /* localStorage boleh tak wujud (private mode, file://) — semua dibalut try/catch */
    get(key,fallback){
      try{const v=localStorage.getItem(PREFIX+key);return v==null?fallback:JSON.parse(v);}
      catch(e){return fallback;}
    },
    set(key,val){try{localStorage.setItem(PREFIX+key,JSON.stringify(val));}catch(e){}},

    /* Rekod bintang terbaik setiap game — menu utama baca nilai ini */
    best(game){return OG.get('best:'+game,0);},
    saveBest(game,stars){const b=OG.best(game);if(stars>b)OG.set('best:'+game,stars);return Math.max(b,stars);},

    starsHTML(n,total=3){
      return Array.from({length:total},(_,k)=>STAR.replace('<svg','<svg class="'+(k<n?'on':'')+'"')).join('');
    },
    say(el,msg,tone){el.textContent=msg;el.className='status'+(tone?' '+tone:'');},
    flash(el,cls){el.classList.remove('pop','shake','wave');void el.offsetWidth;el.classList.add(cls);},
    praise(){return OG.pick(OG.L(['Betul!','Pandai!','Bagus, betul!','Hebat!','Syabas!'],['Correct!','Well done!','Great, correct!','Awesome!','Brilliant!']));},

    /* Umur dari link menu, contoh: games/soalan-math/index.html?umur=9 */
    ageParam(){
      try{const v=parseInt(new URLSearchParams(location.search).get('umur'),10);return Number.isFinite(v)?v:null;}
      catch(e){return null;}
    },
    /* Tukar umur ke level mudah/sederhana/sukar. maxMudah & maxSederhana = umur paling tua untuk level itu */
    levelForAge(age,maxMudah,maxSederhana){
      if(age==null)return null;
      return age<=maxMudah?'mudah':age<=maxSederhana?'sederhana':'sukar';
    },

    /* ---------- Bahasa ---------- */
    lang:'ms',
    L(ms,en){return OG.lang==='en'?en:ms;},
    _langFns:[],
    onLang(fn){OG._langFns.push(fn);},
    applyLang(){
      document.documentElement.lang=OG.lang;
      document.querySelectorAll('[data-en]').forEach(el=>{
        if(el.dataset.ms==null)el.dataset.ms=el.innerHTML;
        el.innerHTML=OG.lang==='en'?el.dataset.en:el.dataset.ms;
      });
      document.querySelectorAll('[data-en-label]').forEach(el=>{
        if(el.dataset.msLabel==null)el.dataset.msLabel=el.getAttribute('aria-label')||'';
        el.setAttribute('aria-label',OG.lang==='en'?el.dataset.enLabel:el.dataset.msLabel);
      });
      document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.l===OG.lang)));
    },
    setLang(l){
      if(l!=='ms'&&l!=='en')return;
      OG.lang=l;OG.set('lang',l);OG.applyLang();
      OG._langFns.forEach(f=>f(l));
    }
  };
  const saved=OG.get('lang',null);
  OG.lang=saved==='en'||saved==='ms'?saved:'ms';
  window.OG=OG;

  /* Butang BM | EN di bar atas setiap page (dalam .topbar) */
  const bar=document.querySelector('.topbar');
  if(bar){
    const g=document.createElement('div');
    g.className='lang';g.setAttribute('role','group');g.setAttribute('aria-label','Bahasa / Language');
    g.innerHTML='<button type="button" data-l="ms" lang="ms">BM</button><button type="button" data-l="en" lang="en">EN</button>';
    g.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>OG.setLang(b.dataset.l)));
    bar.appendChild(g);
  }
  OG.applyLang();
})();
