(() => {
  const wishes = [
    'May this year bring you gentle mornings, brave dreams and happiness that finds you in the smallest things. 🌷',
    'May you always be surrounded by people who see your kindness and celebrate your beautiful heart. 💗',
    'May every new chapter bring laughter, little adventures and moments you wish could last forever. ✨',
    'May you keep growing into the person you dream of being, while loving who you are right now. 🌙',
    'May your birthday sparkle with sweet surprises and your days ahead glow with hope. 🎂',
    'May you never run out of reasons to smile, songs to sing or friends to lean on. 💫',
    'May life surprise you with beautiful opportunities, loyal friends and memories worth keeping. 🌸',
    'Whenever the world feels cloudy, may you find a little light reminding you how wonderful you are. ⭐'
  ];
  const host = document.getElementById('experience');
  if (!host) return;
  host.innerHTML = `
    <div class="sky-scene">
      <div class="moon" aria-hidden="true"></div><div class="cloud" aria-hidden="true">☁</div><div class="cloud c2" aria-hidden="true">☁</div><div class="shooting-star" aria-hidden="true"></div>
      <h2 class="sky-title">Pick a star &amp; make a wish</h2><p class="sky-subtitle">The sky has a little birthday message for you</p>
      <canvas class="fireworks-canvas" id="fireworks-canvas" aria-hidden="true"></canvas><div class="starfield" id="starfield"></div>
    </div>
    <div class="wish-popup hidden" id="wish-popup" role="dialog" aria-modal="true" aria-labelledby="wish-text"><div class="wish-card"><div class="wish-emoji">🌟</div><p id="wish-text"></p><button class="wish-close" type="button">Keep sparkling</button></div></div>`;

  const scene = host.querySelector('.sky-scene');
  const field = host.querySelector('#starfield');
  const popup = host.querySelector('#wish-popup');
  const wishText = host.querySelector('#wish-text');
  for (let i = 0; i < 28; i++) {
    const star = document.createElement('button');
    star.type = 'button'; star.className = 'wish-star'; star.textContent = i % 4 === 0 ? '✦' : '✧';
    star.style.left = `${4 + Math.random() * 91}%`;
    star.style.top = `${18 + Math.random() * 75}%`;
    star.style.animationDelay = `${Math.random() * 2.5}s`;
    star.setAttribute('aria-label', `Reveal birthday wish ${i + 1}`);
    star.addEventListener('click', () => { wishText.textContent = wishes[i % wishes.length]; popup.classList.remove('hidden'); });
    field.appendChild(star);
  }
  const closePopup = () => popup.classList.add('hidden');
  host.querySelector('.wish-close').addEventListener('click', closePopup);
  popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

  // Diwali-style fireworks: rising rocket trails followed by expanding particle bursts.
  // The canvas is decorative (pointer-events:none), so stars remain easy to tap.
  const canvas = host.querySelector('#fireworks-canvas');
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, raf = 0, lastAutoLaunch = 0;
  const rockets = [], sparks = [];
  const palette = ['#ffe7a8', '#ffd0eb', '#d9c5ff', '#ffffff', '#ffb8c9', '#ffc77d'];
  function resizeCanvas() {
    const rect = scene.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function launchFirework() {
    const x = width * (.12 + Math.random() * .76);
    const targetY = height * (.20 + Math.random() * .47);
    rockets.push({x, y:height + 5, targetY, vx:(Math.random()-.5)*1.1, color:palette[Math.floor(Math.random()*palette.length)], trail:[]});
  }
  function explode(rocket) {
    const count = 58;
    const hueColor = rocket.color;
    for (let i=0;i<count;i++) {
      const angle = Math.PI*2*i/count + Math.random()*.08;
      const speed = 1.1 + Math.random()*3.4;
      sparks.push({x:rocket.x,y:rocket.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:48+Math.random()*28,max:76,size:1.1+Math.random()*2.1,color:Math.random()<.72?hueColor:palette[Math.floor(Math.random()*palette.length)]});
    }
  }
  function drawFireworks(time=0) {
    ctx.clearRect(0,0,width,height);
    // Launch a new rocket every ~1.8 seconds for a lively but not crowded sky.
    if (time-lastAutoLaunch>1850) { launchFirework(); lastAutoLaunch=time; }
    for (let i=rockets.length-1;i>=0;i--) {
      const r=rockets[i]; r.trail.push({x:r.x,y:r.y}); if(r.trail.length>8)r.trail.shift();
      r.y-=4.2; r.x+=r.vx; 
      ctx.beginPath(); r.trail.forEach((pt,j)=>{if(j===0)ctx.moveTo(pt.x,pt.y);else ctx.lineTo(pt.x,pt.y)});
      ctx.strokeStyle=r.color;ctx.globalAlpha=.65;ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=1;
      ctx.beginPath();ctx.arc(r.x,r.y,2.2,0,Math.PI*2);ctx.fillStyle='#fff';ctx.shadowBlur=12;ctx.shadowColor=r.color;ctx.fill();ctx.shadowBlur=0;
      if(r.y<=r.targetY){explode(r);rockets.splice(i,1)}
    }
    for(let i=sparks.length-1;i>=0;i--){
      const p=sparks[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.vy=p.vy*.985+.035;p.life--;
      const alpha=Math.max(0,p.life/p.max);
      ctx.globalAlpha=alpha;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=p.color;ctx.shadowBlur=10;ctx.shadowColor=p.color;ctx.fill();ctx.shadowBlur=0;
      if(p.life<=0)sparks.splice(i,1);
    }
    ctx.globalAlpha=1;
    raf=requestAnimationFrame(drawFireworks);
  }
  const launchButton = document.querySelector('.launch-fireworks');
  launchButton?.addEventListener('click', launchFirework);
  resizeCanvas(); window.addEventListener('resize',resizeCanvas,{passive:true});
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf=requestAnimationFrame(drawFireworks);

  // Firecracker sound is separate from the shared music track; the visitor opts in.
  const fireworkButton = document.querySelector('.firework-toggle');
  const volume = document.getElementById('firework-volume');
  const firecracker = new Audio('assets/music/firecracker.mp3');
  firecracker.loop = true; firecracker.preload = 'none'; firecracker.volume = Number(volume?.value || 40) / 100;
  const setFirecracker = async playing => {
    if (playing) { try { await firecracker.play(); fireworkButton.textContent='Ⅱ Pause firecracker sound'; fireworkButton.setAttribute('aria-pressed','true'); } catch (_) { fireworkButton.textContent='🎆 Add firecracker.mp3'; } }
    else { firecracker.pause(); firecracker.currentTime=0; fireworkButton.textContent='🎆 Play firecracker sound'; fireworkButton.setAttribute('aria-pressed','false'); }
  };
  // On this page, the shared music button starts/stops both tracks together (60% + 40%).
  window.addEventListener('birthday-music-state', e => setFirecracker(Boolean(e.detail?.playing))); 
  volume?.addEventListener('input', () => { firecracker.volume = Number(volume.value) / 100; });
  fireworkButton?.addEventListener('click', async () => { await setFirecracker(firecracker.paused); });
  window.addEventListener('pagehide', () => { firecracker.pause(); firecracker.currentTime = 0; if (raf) cancelAnimationFrame(raf); });
})();
