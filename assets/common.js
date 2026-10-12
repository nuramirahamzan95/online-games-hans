/* Main Nombor — helper kecil yang dikongsi semua game. Global: window.OG */
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
    praise(){return OG.pick(['Betul!','Pandai!','Bagus, betul!','Hebat!','Syabas!']);}
  };
  window.OG=OG;
})();
