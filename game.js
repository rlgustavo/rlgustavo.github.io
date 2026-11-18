/**
 * PORTFOLIO QUEST — motor de jogo em Canvas 2D (sem dependências externas).
 * MECÂNICA:
 * - Scroll vertical avança pelo mundo horizontal e revela capítulos.
 * - A/D ou ←/→: caminhar. Espaço/W/↑/toque no cenário: pular.
 * - Colete 8 estrelas de café pulando quando passar perto delas.
 * - Conteúdo, navegação e leitura funcionam sem coletar itens.
 * - Sons sintetizados são opcionais e começam desligados.
 */
(() => {
  'use strict';
  const canvas = document.querySelector('#game-canvas');
  const stage = document.querySelector('#game-stage');
  const journey = document.querySelector('#jornada');
  if (!canvas || !stage || !journey) return;
  const ctx = canvas.getContext('2d', {alpha: false});
  if (!ctx) return;
  const SCENE_COUNT = 7;
  const VIEW_WORLD = 1000;
  const STAGE_LENGTH = 1150;
  const WORLD_SPAN = STAGE_LENGTH * (SCENE_COUNT - 1);
  const WORLD_NAMES = [
    'MUNDO 01 — VILA DAS IDEIAS',
    'MUNDO 02 — MINHA HISTÓRIA',
    'MUNDO 03 — TORRE DO CÓDIGO',
    'MUNDO 04 — LABORATÓRIO WEB',
    'MUNDO 05 — VALE DOS GAMES',
    'MUNDO 06 — ACADEMIA TECH',
    'MUNDO 07 — PORTAL DE CONTATO'
  ];
  const PHASE_NAMES = ['OLÁ, MUNDO!', 'QUEM SOU EU?', 'HABILIDADES', 'PROJETOS WEB', 'JOGOS PUBLICADOS', 'CURSOS & AULAS', 'CONEXÕES'];
  const anchorIds = ['ponto-inicio','ponto-sobre','ponto-skills','ponto-projetos','ponto-games','ponto-cursos','ponto-contato'];
  const BEANS = [520, 1280, 2220, 3000, 3910, 4700, 5590, 6600];
  const NAV_ELEMS = Array.from(document.querySelectorAll('[data-nav]'));
  const DOT_ELEMS = Array.from(document.querySelectorAll('[data-dot]'));
  const SCENES = Array.from(document.querySelectorAll('.scene'));
  const $phase = document.querySelector('#hud-phase');
  const $phaseName = document.querySelector('#hud-level-name');
  const $fill = document.querySelector('#progress-fill');
  const $counter = document.querySelector('#bean-counter');
  const $world = document.querySelector('#world-label-text');
  const $end = document.querySelector('#end-message');
  const $toast = document.querySelector('#game-toast');
  const $sound = document.querySelector('#sound-toggle');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let W = 1, H = 1, dpr = 1, progress = 0, chapter = 0, camera = 0;
  let lastFrame = 0, raf = 0, stageVisible = true, animTime = 0, walkCycle = 0;
  let prevWorldPos = 260, wasMoving = false, toastTimeout = 0;
  let audioCtx = null, soundOn = false;
  const pressed = new Set();
  const player = {lift: 0, verticalSpeed: 0, jumping: false};
  const collected = new Set();
  try {
    const data = JSON.parse(localStorage.getItem('gustavo-quest-beans-v1') || '[]');
    if (Array.isArray(data)) data.forEach(index => {if (Number.isInteger(index) && index >= 0 && index < BEANS.length) collected.add(index);});
  } catch { /* Navegadores com armazenamento bloqueado ainda funcionam. */ }

  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const lerp = (a,b,f) => a+(b-a)*f;
  const rand = n => {
    const v = Math.sin(n * 92.141 + 3.743) * 15238.263;
    return v - Math.floor(v);
  };
  function resize() {
    const rect = stage.getBoundingClientRect();
    W = Math.max(1, Math.floor(rect.width));
    H = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, W < 600 ? 1.65 : 2);
    canvas.width = Math.round(W*dpr);
    canvas.height = Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled = false;
    updateScroll(true);
    draw(0);
  }
  function updateScroll(initial = false) {
    const rect = journey.getBoundingClientRect();
    const scrollLength = Math.max(1,journey.offsetHeight-H);
    const nextProgress = clamp(-rect.top/scrollLength,0,1);
    progress = nextProgress;
    const current = clamp(Math.round(progress * (SCENE_COUNT-1)),0,SCENE_COUNT-1);
    if (initial) camera = progress * WORLD_SPAN;
    $fill.style.width = `${(progress*100).toFixed(2)}%`;
    if (current !== chapter || initial) {
      chapter = current;
      SCENES.forEach((element,i) => {
        const active = i === chapter;
        element.classList.toggle('is-active',active);
        element.inert = !active;
        element.setAttribute('aria-hidden',String(!active));
      });
      NAV_ELEMS.forEach(a => {
        const isActive = Number(a.dataset.nav) === chapter;
        a.classList.toggle('is-current',isActive);
        if (isActive) a.setAttribute('aria-current','location');
        else a.removeAttribute('aria-current');
      });
      DOT_ELEMS.forEach(a => {
        const isActive = Number(a.dataset.dot) === chapter;
        a.classList.toggle('is-current',isActive);
        if (isActive) a.setAttribute('aria-current','step');
        else a.removeAttribute('aria-current');
      });
      $phase.innerHTML = `${String(chapter+1).padStart(2,'0')} <span>/ 07</span>`;
      $phaseName.textContent = PHASE_NAMES[chapter];
      $world.textContent = WORLD_NAMES[chapter];
      updateEndMessage();
    }
    if (!raf && stageVisible) draw(0);
  }
  document.querySelector('#restart-game').addEventListener('click', () => {
    collected.clear();
    saveBeans();
    $counter.textContent = '00';
    updateEndMessage();
    player.lift = 0;
    player.verticalSpeed = 0;
    player.jumping = false;
    showToast('↺ NOVA AVENTURA INICIADA!');
  });
  function updateEndMessage() {
    const c = collected.size;
    $end.textContent = c === BEANS.length
      ? 'Conquista secreta: você coletou todas as 8 estrelas de café! ✨'
      : `Você encontrou ${c} de 8 estrelas de café. A aventura continua!`;
  }
  function saveBeans() {
    try { localStorage.setItem('gustavo-quest-beans-v1',JSON.stringify([...collected])); } catch { /* opcional */ }
  }
  function showToast(message) {
    $toast.textContent = message;
    $toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => $toast.classList.remove('visible'),2100);
  }
  function tone(frequency, duration=.11, wave='sine', gain=.09) {
    if (!soundOn) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      const osc = audioCtx.createOscillator();
      const volume = audioCtx.createGain();
      const now = audioCtx.currentTime;
      osc.type = wave;
      osc.frequency.setValueAtTime(frequency,now);
      osc.frequency.exponentialRampToValueAtTime(frequency*1.18,now+duration);
      volume.gain.setValueAtTime(gain,now);
      volume.gain.exponentialRampToValueAtTime(.0001,now+duration);
      osc.connect(volume).connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now+duration+.005);
    } catch { /* sons nunca podem impedir a navegação */ }
  }
  $sound.addEventListener('click', () => {
    soundOn = !soundOn;
    $sound.setAttribute('aria-pressed',String(soundOn));
    $sound.setAttribute('aria-label',soundOn ? 'Desativar sons do jogo' : 'Ativar sons do jogo');
    $sound.querySelector('use').setAttribute('href', soundOn ? '#ico-sound' : '#ico-mute');
    if (soundOn) tone(660);
  });
  function jump() {
    if (player.jumping || !stageVisible) return;
    player.jumping = true;
    player.verticalSpeed = 500;
    player.lift = 2;
    tone(300,.10,'triangle',.07);
  }
  function scrollToScene(index) {
    const next = document.getElementById(anchorIds[clamp(index,0,SCENE_COUNT-1)]);
    if (next) next.scrollIntoView({behavior: reduceMotion.matches ? 'instant' : 'smooth',block:'start'});
  }
  document.querySelector('#mobile-jump').addEventListener('click',jump);
  document.querySelector('#mobile-left').addEventListener('click',() => scrollToScene(chapter-1));
  document.querySelector('#mobile-right').addEventListener('click',() => scrollToScene(chapter+1));
  canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    jump();
  });
  function isJourneyInFocus() {
    const rect=journey.getBoundingClientRect();
    return rect.bottom > H*.2 && rect.top < H*.8;
  }
  function isFormOrLinkTarget(node) {
    return !!node && (node.closest('a, button, input, textarea, select, [contenteditable="true"]') !== null);
  }
  document.addEventListener('keydown', event => {
    if (!isJourneyInFocus() || event.altKey || event.metaKey || event.ctrlKey || isFormOrLinkTarget(event.target)) return;
    const key=event.key.toLowerCase();
    if (['arrowright','arrowleft','a','d','arrowup','w',' '].includes(key)) event.preventDefault();
    if (key === 'arrowright' || key === 'd') pressed.add('right');
    if (key === 'arrowleft' || key === 'a') pressed.add('left');
    if (key === ' ' || key === 'arrowup' || key === 'w') jump();
  });
  document.addEventListener('keyup', event => {
    const k=event.key.toLowerCase();
    if (k === 'arrowright' || k === 'd') pressed.delete('right');
    if (k === 'arrowleft' || k === 'a') pressed.delete('left');
  });
  window.addEventListener('blur', () => pressed.clear());

  function checkBeanPickup(playerWorldX) {
    if (player.lift < 37) return;
    const previous = prevWorldPos;
    BEANS.forEach((beanX,i) => {
      if (collected.has(i)) return;
      const direct = Math.abs(beanX-playerWorldX) < 54;
      const crossed = (beanX >= Math.min(previous,playerWorldX)-17 && beanX <= Math.max(previous,playerWorldX)+17);
      if (direct || crossed) {
        collected.add(i);
        saveBeans();
        $counter.textContent = String(collected.size).padStart(2,'0');
        updateEndMessage();
        showToast(collected.size === BEANS.length ? '✦ CONQUISTA: BARISTA LENDÁRIO!' : `✦ CAFÉ COLETADO! ${collected.size}/8`);
        tone(740,.11,'triangle');
        window.setTimeout(() => tone(960,.14,'sine',.055),80);
      }
    });
  }
  $counter.textContent=String(collected.size).padStart(2,'0');
  updateEndMessage();

  function rect(x,y,w,h,color) {
    ctx.fillStyle=color;
    ctx.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));
  }
  function pixelText(text,x,y,size=11,color='#f6d8b2',align='left') {
    ctx.font=`bold ${size}px 'Silkscreen', monospace`;
    ctx.textAlign=align;
    ctx.fillStyle='rgba(12,6,4,.7)';ctx.fillText(text,x+2,y+2);
    ctx.fillStyle=color;ctx.fillText(text,x,y);
    ctx.textAlign='left';
  }
  function screenX(wx, cam, scale=W/VIEW_WORLD) {return (wx-cam)*scale;}
  function gradient(y1,y2,top,bottom) {
    const g=ctx.createLinearGradient(0,y1,0,y2);
    g.addColorStop(0,top);g.addColorStop(1,bottom);return g;
  }
  function drawSky(t) {
    const worldMood = chapter/6;
    ctx.fillStyle=gradient(0,H,
      worldMood < .5 ? '#23120f' : '#2b1618',
      worldMood < .65 ? '#78462b' : '#482625');
    ctx.fillRect(0,0,W,H);
    const sunX=W*(.15+.03*Math.sin(camera/900));
    const sunY=H*.25;
    const halo=ctx.createRadialGradient(sunX,sunY,4,sunX,sunY,Math.max(150,W*.26));
    halo.addColorStop(0,'rgba(255,146,64,.28)');halo.addColorStop(.38,'rgba(245,121,56,.12)');halo.addColorStop(1,'rgba(231,104,32,0)');
    ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);
    const r=clamp(Math.min(W*.055,55),25,55);
    rect(sunX-r,sunY-r,2*r,2*r,'#d77b46');
    rect(sunX-r+9,sunY-r+9,2*r-18,2*r-18,'#e3a164');
    rect(sunX-r+17,sunY-r+17,2*r-34,2*r-34,'#ffd3a0');
    for(let i=0;i<65;i++) {
      const x=((rand(i+50)*W*2-camera*.035)% (W+80)+(W+80))%(W+80)-35;
      const y=rand(i+221)*H*.55+14;
      const twinkle=reduceMotion.matches ? .65 : .3+.7*Math.sin(t*.6+i*3.2)**2;
      rect(x,y,i%8===0?3:2,i%8===0?3:2,`rgba(255,223,180,${(.16+twinkle*.26).toFixed(2)})`);
    }
  }
  function drawCloud(x,y,s,opacity=.45) {
    const p=Math.max(4,s);
    const a=`rgba(88,54,43,${opacity})`;
    const b=`rgba(160,90,59,${opacity*.45})`;
    rect(x+10*p,y,16*p,3*p,a);
    rect(x+4*p,y+3*p,34*p,4*p,a);
    rect(x,y+7*p,40*p,5*p,a);
    rect(x+7*p,y+12*p,31*p,2*p,b);
  }
  function drawParallax(t) {
    const scale = W / 1000;
    // Blocos distantes e nuvens — camadas com velocidades diferentes.
    for (let i=-3;i<16;i++) {
      const worldCloud=i*350+rand(i+701)*130;
      const x=screenX(worldCloud,camera*.12,scale);
      if (x<-330 || x>W+240) continue;
      drawCloud(x,H*(.18+.10*rand(i+99)),clamp(scale*1.9,1,2.6),.25);
    }
    const backY=H*.76;
    const layers=[{parallax:.20,base:backY,alpha:'#44291f',step:162,h:150},{parallax:.43,base:backY+15,alpha:'#523021',step:112,h:98}];
    layers.forEach((layer,layerIndex) => {
      for(let i=-10;i<85;i++) {
        const worldX=i*layer.step;
        const sx=screenX(worldX,camera*layer.parallax,scale);
        const width=layer.step*scale+2;
        if(sx<-width || sx>W+20) continue;
        const height=(layer.h*(.48+rand(i*3+layerIndex+18)*.9))*clamp(scale,.6,1.35);
        rect(sx,layer.base-height,width,height,layer.alpha);
        if(layerIndex===1 && i%3!==0) {
          for(let k=0;k<3;k++) {
            const px=sx+16+k*24*scale;
            const py=layer.base-height+13+k*9;
            rect(px,py,5*scale,8*scale,'rgba(229,150,88,.20)');
          }
        }
      }
    });
    // Colinas ao longe, com silhuetas suaves.
    ctx.fillStyle='#3a241b'; ctx.beginPath(); ctx.moveTo(0,H*.80);
    for(let x=0;x<=W+16;x+=16) {
      const world=(x/scale)+camera*.18;
      const y=H*.70-Math.sin(world*.006)*38-Math.sin(world*.017)*13;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  }
  function drawGround(t) {
    const y=Math.round(H*.80);
    const s=W/1000;
    rect(0,y,W,H-y,'#271811');
    rect(0,y,W,7,'#bc6a39');
    rect(0,y+7,W,5,'#88512e');
    rect(0,y+12,W,3,'#472a20');
    const segment=43*s;
    const offset=-(camera* s)%segment;
    for(let x=offset-segment;x<W+segment;x+=segment) {
      const index=Math.floor((x+camera*s)/segment);
      rect(x,y+20+(Math.abs(index)%3)*3,Math.round(24*s),Math.round(12*s),'#372218');
      rect(x+12*s,y+51,Math.round(12*s),Math.round(8*s),'#3b261b');
      rect(x+22*s,y+84,Math.round(18*s),Math.round(9*s),'#382219');
      rect(x+5*s,y+12,Math.round(16*s),2,'#6b3c25');
      if(index%5===0){rect(x+12*s,y-4,4*s,7,'#b0763a');rect(x+18*s,y-7,3*s,10,'#9f653a');}
    }
  }
  function drawLantern(worldX,cam,groundY,scale,t) {
    const x=screenX(worldX,cam,scale);
    if(x<-80 || x>W+80) return;
    rect(x,groundY-137,9*scale,137,'#281815');
    rect(x-6*scale,groundY-145,21*scale,9,'#8a4a30');
    rect(x-13*scale,groundY-174,35*scale,29,'#a85f31');
    rect(x-8*scale,groundY-170,25*scale,21,'#ffd398');
    rect(x-13*scale,groundY-174,35*scale,6,'#ed9851');
    const glow=ctx.createRadialGradient(x+4,groundY-154,0,x+4,groundY-154,65);
    glow.addColorStop(0,'rgba(255,188,89,.28)');glow.addColorStop(1,'rgba(255,147,72,0)');
    ctx.fillStyle=glow;ctx.fillRect(x-70,groundY-222,150,150);
  }
  function drawSign(worldX,cam,groundY,scale,label,number,t) {
    const x=screenX(worldX,cam,scale);
    if(x<-340 || x>W+180) return;
    const signW=155*scale;
    const signY=groundY-205;
    rect(x,signY+37,8*scale,165,'#2a1912');
    rect(x-13*scale,signY,signW,52,'#7c4227');
    rect(x-9*scale,signY+4,signW-8*scale,44,'#e89c55');
    rect(x-4*scale,signY+10,signW-18*scale,31,'#41251a');
    pixelText(`0${number+1} / ${label}`,x+6*scale,signY+29,clamp(9*scale,8,13),'#ffe6bd');
    rect(x+signW-9*scale,signY+15,5,19,'#e99551');
    rect(x-4*scale,signY+50,signW-18*scale,4,'#422316');
  }
  function drawGate(worldX,cam,groundY,scale,isLast,t) {
    const x=screenX(worldX,cam,scale);
    if(x<-240 || x>W+240) return;
    const gateW=108*scale;
    const top=groundY-187;
    rect(x-11*scale,top,gateW+22*scale,17,'#422416');
    rect(x-11*scale,top+16,17*scale,groundY-top-16,'#75402a');
    rect(x+gateW-6*scale,top+16,17*scale,groundY-top-16,'#75402a');
    rect(x-4*scale,top+10,gateW+8*scale,7,'#ed994c');
    const shimmer=reduceMotion.matches?.65:(.5+.5*Math.sin(t*2.5));
    ctx.fillStyle=`rgba(${isLast?'255,190,114':'255,122,70'},${(.09+.11*shimmer).toFixed(2)})`;
    ctx.fillRect(x+6*scale,top+26,gateW-12*scale,groundY-top-26);
    for(let i=0;i<6;i++) rect(x+(14+i*14)*scale,top+30+Math.sin(t*1.7+i)*8+i*15,4*scale,4*scale,'#ffba7e');
    pixelText(isLast?'CONTATO':'CHECKPOINT',x+gateW/2,top-12,clamp(scale*11,9,13),'#ffcf9f','center');
  }
  function drawCrate(worldX,cam,groundY,scale,t) {
    const x=screenX(worldX,cam,scale);
    if(x<-90 || x>W+90) return;
    const size=41*scale;
    rect(x,groundY-size,size,size,'#9b552a');
    rect(x+4,groundY-size+4,size-8,size-8,'#bd7841');
    rect(x+9,groundY-size+9,size-18,size-18,'#75452b');
    rect(x+size*.46,groundY-size+4,5,size-8,'#dd9556');
    rect(x+4,groundY-size*.52,size-8,5,'#dd9556');
  }
  function drawTerminal(worldX,cam,groundY,scale,t,variant) {
    const x=screenX(worldX,cam,scale);
    if(x<-170 || x>W+170) return;
    const s=clamp(scale,.65,1.6);
    const y=groundY-130;
    rect(x,y,112*s,86*s,'#181414');
    rect(x+7*s,y+7*s,98*s,66*s,'#8e4c2b');
    rect(x+12*s,y+11*s,88*s,55*s,'#1d231f');
    if(variant===2){
      for(let i=0;i<4;i++) rect(x+20*s,y+(20+i*10)*s,(40+rand(i+variant)*30)*s,4*s,['#e59b61','#d3b487','#80ad83','#ffbb73'][i]);
    } else {
      pixelText(variant===3?'WEB.DEV':variant===5?'LEARN':'HELLO',x+21*s,y+45*s,clamp(10*s,9,15),'#d8c99b');
      rect(x+20*s,y+49*s,48*s,2*s,'#dc8651');
    }
    rect(x+45*s,y+84*s,18*s,25*s,'#754a2b');
    rect(x+26*s,y+109*s,60*s,7*s,'#b66d36');
  }
  function drawBean(worldX,cam,groundY,scale,t,index) {
    if(collected.has(index)) return;
    const x=screenX(worldX,cam,scale);
    if(x<-80 || x>W+80) return;
    const y=groundY-101-Math.sin(t*2.2+index*.8)*7;
    const r=clamp(12*scale,9,19);
    const glow=ctx.createRadialGradient(x,y,2,x,y,r*3.2);
    glow.addColorStop(0,'rgba(255,190,89,.35)');glow.addColorStop(1,'rgba(255,159,48,0)');
    ctx.fillStyle=glow;ctx.fillRect(x-r*4,y-r*4,r*8,r*8);
    ctx.fillStyle='#ffd27a';
    ctx.beginPath();ctx.moveTo(x,y-r*1.2);ctx.lineTo(x+r*.57,y-r*.38);ctx.lineTo(x+r,y);ctx.lineTo(x+r*.43,y+r*.40);ctx.lineTo(x,y+r*1.2);ctx.lineTo(x-r*.44,y+r*.4);ctx.lineTo(x-r,y);ctx.lineTo(x-r*.57,y-r*.38);ctx.closePath();ctx.fill();
    rect(x-2,y-r*.60,4,6,'#fff2c7');
  }
  function drawPlants(cam,groundY,scale,t) {
    for(let i=-10;i<90;i++){
      const x=screenX(i*135+rand(i+814)*38,cam,scale);
      if(x<-70 || x>W+70) continue;
      const h=(13+rand(i+10)*13)*clamp(scale,.65,1.5);
      rect(x,groundY-h,6*scale,h,'#6d5632');
      rect(x-8*scale,groundY-h+4,20*scale,6*scale,'#76643d');
      rect(x-4*scale,groundY-h-5,13*scale,7*scale,'#987044');
      if(i%4===0){
        rect(x,groundY-h-10,6*scale,7*scale,'#e28b53');
        rect(x+2*scale,groundY-h-11,3,3,'#ffdd9c');
      }
    }
  }
  const CHARACTER_FRAMES = [
    [
      '....HHHHHH.....', '...HHHHHHHH....', '..HHHHHHHHHH...', '..HHFFFFFFHH...', '..HFFFEFFEHH...', '..HFFFEFFEHH...', '..HHFFFFFFHH...', '...HFFFFFFH....', '...HHHHHHHH....', '....JJJJJJ.....', '...JJJJJJJJ....', '..JJJJJJJJJJ...', '..J.JJJJJJ.J...', '..A.JJJJJJ.A...', '....JJJJJJ.....', '....BBB.BB.....', '....BBB.BB.....', '...BBB...BBB...', '...SSS...SSS...', '...SSS...SSS...'
    ],
    [
      '....HHHHHH.....', '...HHHHHHHH....', '..HHHHHHHHHH...', '..HHFFFFFFHH...', '..HFFFEFFEHH...', '..HFFFEFFEHH...', '..HHFFFFFFHH...', '...HFFFFFFH....', '...HHHHHHHH....', '....JJJJJJ.....', '...JJJJJJJJ....', '..JJJJJJJJJJ...', '..A.JJJJJJ.A...', '..A.JJJJJJ.A...', '....JJJJJJ.....', '...BBB..BB.....', '...BBB..BBB....', '...BBB...BBB...', '...SSS...SSS...', '..SSS.....SSS..'
    ]
  ];
  const CHAR_COLORS={H:'#291810',F:'#f5be88',E:'#1b120e',J:'#eb883f',A:'#ffe0b7',B:'#3c2b35',S:'#201717'};
  function drawPlayer(groundY,t,moving) {
    const px=clamp(W/330,2.5,4.8);
    const sprite=CHARACTER_FRAMES[(moving && !player.jumping)?(Math.floor(walkCycle*1.5)%2):0];
    const charW=sprite[0].length*px;
    const charH=sprite.length*px;
    const cx=W*.26;
    const left=Math.round(cx-charW*.5);
    const foot=groundY-player.lift;
    // Sombras, poeira e movimento de personagem animado.
    ctx.fillStyle=`rgba(12,7,4,${(0.5-player.lift*.002).toFixed(3)})`;
    ctx.beginPath();ctx.ellipse(cx,groundY+1,Math.max(8,charW*.52-player.lift*.10),Math.max(3,4-player.lift*.007),0,0,Math.PI*2);ctx.fill();
    if(moving && !player.jumping){
      for(let j=0;j<3;j++) rect(cx-26-j*12,groundY-5-j*5,5+j*2,5,'rgba(222,144,84,.18)');
    }
    const bop = player.jumping ? 0 : (moving?Math.round(Math.sin(walkCycle*5)*2):Math.round(Math.sin(t*2)*1));
    sprite.forEach((row,y) => {
      for(let x=0;x<row.length;x++) {
        const color=CHAR_COLORS[row[x]];
        if(color) rect(left+x*px,foot-charH+y*px+bop,px+0.5,px+0.5,color);
      }
    });
    // Mochila laranja e um brilho na gola deixam o avatar reconhecível.
    rect(left-3*px,foot-charH+11*px+bop,4*px,5*px,'#b96330');
    rect(left+6*px,foot-charH+10*px+bop,3*px,2*px,'#ffd47a');
    if(player.jumping) {
      rect(cx-10,foot+7,7,3,'rgba(255,172,82,.5)');
      rect(cx+9,foot+9,5,3,'rgba(255,192,94,.4)');
    }
  }
  function drawProps(cam,t) {
    const scale=W/VIEW_WORLD;
    const groundY=H*.80;
    // Objetos únicos por fase: placas, terminais, portais e caixas.
    const labels=['START','SOBRE','SKILLS','PROJETOS','GAMES','CURSOS','CONTATO'];
    for(let i=0;i<SCENE_COUNT;i++) {
      const base=i*STAGE_LENGTH;
      drawSign(base+410,cam,groundY,scale,labels[i],i,t);
      drawLantern(base+100,cam,groundY,scale,t);
      drawLantern(base+900,cam,groundY,scale,t);
      if(i===2 || i===3 || i===5) drawTerminal(base+710,cam,groundY,scale,t,i);
      else drawCrate(base+760,cam,groundY,scale,t);
      drawGate(base+1030,cam,groundY,scale,i===6,t);
    }
    drawPlants(cam,groundY,scale,t);
    BEANS.forEach((wx,i)=>drawBean(wx,cam,groundY,scale,t,i));
    drawPlayer(groundY,t,wasMoving);
  }
  function draw(dt) {
    if(!W || !H)return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=false;
    const t=reduceMotion.matches?0:animTime;
    drawSky(t);
    drawParallax(t);
    drawGround(t);
    drawProps(camera,t);
    // Vinheta/sinalização inferior feita no Canvas, independente da interface HTML.
    ctx.fillStyle='rgba(15,8,6,.35)';
    ctx.fillRect(0,H*.95,W,H*.05);
  }
  function frame(timestamp) {
    raf=0;
    if(!stageVisible || document.hidden) return;
    const dt=lastFrame?clamp((timestamp-lastFrame)/1000,0,.048):.016;
    lastFrame=timestamp;
    animTime+=dt;
    let dir=0;
    if(pressed.has('left'))dir-=1;
    if(pressed.has('right'))dir+=1;
    if(dir && isJourneyInFocus()) window.scrollBy({top: dir*dt*540,behavior:'instant'});
    const target=progress*WORLD_SPAN;
    const previousCamera=camera;
    camera=reduceMotion.matches?target:lerp(camera,target,Math.min(1,dt*11));
    const moved=Math.abs(camera-previousCamera);
    wasMoving=moved>.2 || dir!==0;
    if(wasMoving) walkCycle+=moved*.045;
    if(player.jumping) {
      player.lift+=player.verticalSpeed*dt;
      player.verticalSpeed-=1180*dt;
      if(player.lift<=0){player.lift=0;player.verticalSpeed=0;player.jumping=false;}
    }
    const currentWorldX=camera+VIEW_WORLD*.26;
    checkBeanPickup(currentWorldX);
    prevWorldPos=currentWorldX;
    draw(dt);
    if(!reduceMotion.matches || player.jumping || dir) raf=requestAnimationFrame(frame);
  }
  function startLoop() {
    if(raf || !stageVisible || document.hidden) return;
    lastFrame=0;
    raf=requestAnimationFrame(frame);
  }
  function onScroll() {
    updateScroll();
    if(reduceMotion.matches) {
      camera=progress*WORLD_SPAN;
      draw(0);
    } else startLoop();
  }
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      stageVisible=entries[0].isIntersecting;
      if(stageVisible) startLoop();
      else { pressed.clear(); if(raf)cancelAnimationFrame(raf);raf=0; }
    },{threshold:.01});
    observer.observe(stage);
  }
  reduceMotion.addEventListener?.('change',()=>{updateScroll(true);startLoop();});
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',()=>{resize();startLoop();},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)startLoop();});
  resize();
  startLoop();
})();
