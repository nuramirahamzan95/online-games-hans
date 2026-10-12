/* Main Nombor — enjin pusingan kuiz (10 soalan) untuk game jenis soal-jawab.
   Dipakai oleh: soalan-math, baca-jam, banding-nombor.

   Setiap page perlu ada elemen dengan id ini:
     #st-q #st-ok #st-time   statistik
     #dots                   bulatan kemajuan
     #q-area                 kawasan soalan (game lukis sendiri)
     #result #stars #res-title #res-text #res-list #again #up   panel keputusan
     #status #next           mesej + butang "Seterusnya"

   const quiz = OG.quiz({
     game:'id-game',             // untuk rekod bintang di menu
     total:10,
     make(level)    -> {key, answer, ...}   // jana satu soalan (key untuk elak soalan berulang)
     show(q)                                // lukis soalan + aktifkan butang jawapan
     reveal(q, given, ok)                   // tanda butang betul / salah
     explain(q, given) -> 'teks bila salah'
     review(q, given)  -> {sum:'7 + 5 = 12', note:'kamu jawab 11'}   // senarai semak di akhir
     praise(q)?        -> 'teks bila betul'
     nextLevel(level)? -> {id, label} | null
     onUp(id)?, onFinish()?
   });
   quiz.start(level); quiz.submit(jawapan);
*/
(function(){
  OG.quiz=function(cfg){
    const $=id=>document.getElementById(id);
    const el={
      q:$('st-q'),ok:$('st-ok'),time:$('st-time'),dots:$('dots'),area:$('q-area'),
      res:$('result'),stars:$('stars'),title:$('res-title'),text:$('res-text'),list:$('res-list'),
      again:$('again'),up:$('up'),status:$('status'),next:$('next')
    };
    const total=cfg.total||10;
    let R=null,t0=0,adv=null;
    const elapsed=()=>R.done?R.elapsed:Math.floor((Date.now()-t0)/1000);

    function start(level){
      clearTimeout(adv);
      R={level,i:0,score:0,log:[],seen:new Set(),q:null,locked:false,done:false,elapsed:0};
      t0=Date.now();
      el.res.hidden=true;el.area.hidden=false;
      ask();
    }

    function ask(){
      let q,tries=0;
      do{q=cfg.make(R.level);tries++;}while(R.seen.has(q.key)&&tries<60);
      R.seen.add(q.key);R.q=q;R.locked=false;
      el.next.hidden=true;
      OG.say(el.status,cfg.prompt?cfg.prompt(q):'');
      cfg.show(q);
      paint();
    }

    function submit(given){
      if(!R||R.locked||R.done)return null;
      R.locked=true;
      const q=R.q,ok=given===q.answer;
      if(ok)R.score++;
      R.log.push({q,given,ok});
      cfg.reveal(q,given,ok);
      paint();
      if(ok){
        OG.say(el.status,cfg.praise?cfg.praise(q):OG.praise(),'good');
        adv=setTimeout(advance,cfg.delay||900);
      }else{
        OG.say(el.status,cfg.explain(q,given),'oops');
        el.next.querySelector('span').textContent=R.i+1>=total?'Tengok keputusan':'Seterusnya';
        el.next.hidden=false;
        el.next.focus({preventScroll:true});
      }
      return ok;
    }

    function advance(){
      clearTimeout(adv);
      if(!R||R.done||!R.locked)return;
      R.i++;
      if(R.i>=total)finish();else ask();
    }

    function stars(){return R.score>=total-1?3:R.score>=Math.ceil(total*.7)?2:1;}

    function finish(){
      R.elapsed=Math.floor((Date.now()-t0)/1000);
      R.done=true;
      const s=stars();
      OG.saveBest(cfg.game,s);
      el.stars.innerHTML=OG.starsHTML(s);
      el.title.textContent=s===3?'Tahniah!':s===2?'Bagus!':'Teruskan usaha!';
      el.text.textContent=`${R.score}/${total} betul · masa ${OG.fmt(R.elapsed)}`;
      const wrong=R.log.filter(x=>!x.ok);
      el.list.hidden=!wrong.length;
      el.list.innerHTML=wrong.length?'<h3>Semak semula</h3><ul>'+wrong.map(x=>{
        const r=cfg.review(x.q,x.given);
        return `<li><b>${r.sum}</b><small>${r.note}</small></li>`;
      }).join('')+'</ul>':'';
      const up=cfg.nextLevel&&s>=2?cfg.nextLevel(R.level):null;
      el.up.hidden=!up;
      if(up){el.up.textContent='Cuba '+up.label;el.up.dataset.level=up.id;}
      el.next.hidden=true;el.area.hidden=true;el.res.hidden=false;
      OG.say(el.status,s===3?'Semua hampir sempurna. Syabas!':'Main lagi untuk dapat lebih bintang.',s===3?'good':'');
      cfg.onFinish&&cfg.onFinish();
      paint();
      el.again.focus({preventScroll:true});
    }

    function paint(){
      el.q.textContent=Math.min(R.i+1,total)+'/'+total;
      el.ok.textContent=R.score;
      el.time.textContent=OG.fmt(elapsed());
      let h='';
      for(let k=0;k<total;k++){
        const x=R.log[k];
        h+='<i class="'+(x?(x.ok?'ok':'bad'):(k===R.i&&!R.done?'cur':''))+'"></i>';
      }
      el.dots.innerHTML=h;
      el.dots.setAttribute('aria-label',`Soalan ${Math.min(R.i+1,total)} daripada ${total}, ${R.score} betul`);
    }

    el.next.addEventListener('click',advance);
    el.again.addEventListener('click',()=>start(R.level));
    el.up.addEventListener('click',e=>{const id=e.currentTarget.dataset.level;cfg.onUp?cfg.onUp(id):start(id);});
    document.addEventListener('keydown',e=>{
      if(e.key==='Enter'&&R&&!el.next.hidden&&document.activeElement!==el.next){e.preventDefault();advance();}
    });
    setInterval(()=>{if(R&&!R.done)el.time.textContent=OG.fmt(elapsed());},500);

    return {start,submit,advance,get state(){return R;}};
  };
})();
