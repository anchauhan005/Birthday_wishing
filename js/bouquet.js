(() => {
  const host = document.getElementById('experience');
  if (!host) return;
  const flowerMarkup = (position, color = '') => `<div class="bouquet-flower ${position} ${color}" role="button" tabindex="0" aria-label="Bloom flower"><i class="bouquet-petal"></i><i class="bouquet-petal"></i><i class="bouquet-petal"></i><i class="bouquet-petal"></i><i class="bouquet-petal"></i><i class="bouquet-petal"></i><i class="bouquet-center"></i></div>`;
  host.innerHTML = `
    <div class="bouquet-scene"><p class="bouquet-heading">A little bunch of happiness, picked just for you 💐</p>
      <div class="bouquet-art" aria-label="A hand-arranged bouquet of six pink, purple and white flowers">
        <div class="bouquet-stems">${Array.from({length:6}, () => '<i class="bouquet-stem"></i>').join('')}<i class="bouquet-leaf l1"></i><i class="bouquet-leaf l2"></i><i class="bouquet-leaf l3"></i><i class="bouquet-leaf l4"></i><i class="bouquet-leaf l5"></i></div>
        ${flowerMarkup('f1','red')}${flowerMarkup('f2','purple')}${flowerMarkup('f3','')}${flowerMarkup('f4','purple')}${flowerMarkup('f5','red')}${flowerMarkup('f6','white')}
        <div class="bouquet-wrapper"></div><div class="bouquet-ribbon"></div>
      </div><p class="bouquet-tip">Tap each flower and watch it bloom 🌷</p>
    </div><div class="bouquet-message hidden"><p class="reveal-message">A bouquet for a friend who makes ordinary days brighter. May your birthday bring you peaceful moments, unexpected joy, and a thousand reasons to smile. Keep blooming in your own beautiful way. 🌸</p></div>`;
  const bouquet = host.querySelector('.bouquet-art');
  function bloom(flower) {
    flower.classList.toggle('bloomed');
    for (let i = 0; i < 9; i++) {
      const petal = document.createElement('span'); petal.className = 'bouquet-particle'; petal.textContent = i % 2 ? '✿' : '✧';
      petal.style.left = `${flower.offsetLeft + 45}px`; petal.style.top = `${flower.offsetTop + 40}px`;
      petal.style.setProperty('--x', `${Math.random() * 140 - 70}px`); petal.style.setProperty('--y', `${Math.random() * 130 - 65}px`);
      bouquet.appendChild(petal); setTimeout(() => petal.remove(), 1450);
    }
    host.querySelector('.bouquet-message').classList.remove('hidden');
  }
  bouquet.querySelectorAll('.bouquet-flower').forEach(flower => {
    flower.addEventListener('click', () => bloom(flower));
    flower.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bloom(flower); } });
  });
})();
