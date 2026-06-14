/* ==========================================================================
   KOINOT SARGUZASHTI - INTERACTIVE SCRIPT (BRIGHT THEME & DRAG-DROP GAME)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Make sections visible initially (except results)
  document.getElementById('lessons-section').classList.add('active-section');
  document.getElementById('quiz-section').classList.add('active-section');

  // ==========================================================================
  // 1. CONFETTI & DECORATIVE ANIMATIONS
  // ==========================================================================
  const particleOverlay = document.getElementById('particle-overlay');

  // Particle Star Burst (for correct answers and successful drops)
  function createStarburst(x, y) {
    const starCount = 18;
    for (let i = 0; i < starCount; i++) {
      const p = document.createElement('div');
      p.classList.add('particle-star-light');
      p.textContent = '★';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      
      particleOverlay.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // Confetti Rain (for overall victories)
  function triggerConfettiRain() {
    const colors = ['#7C3AED', '#F59E0B', '#0EA5E9', '#10B981', '#F97316', '#EC4899'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      
      // Randomize styles
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.width = `${Math.random() * 6 + 6}px`;
      confetti.style.height = `${Math.random() * 10 + 8}px`;
      
      // Animations
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      
      particleOverlay.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3500);
    }
  }

  // ==========================================================================
  // 2. WELCOME NAVIGATION
  // ==========================================================================
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', () => {
    document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================================
  // 3. LESSON TABS
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-button-light');
  const tabPanes = document.querySelectorAll('.tab-pane-light');
  const progressSteps = document.querySelectorAll('.progress-step-light');
  const nextLessonBtn = document.getElementById('next-lesson-btn');
  
  let currentTabId = 'tab-1';

  function switchTab(tabId) {
    currentTabId = tabId;

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    progressSteps.forEach(step => {
      const stepTab = step.getAttribute('data-step');
      step.classList.remove('active', 'completed');
      
      if (stepTab === tabId) {
        step.classList.add('active');
      } else if (
        (tabId === 'tab-2' && stepTab === 'tab-1') ||
        (tabId === 'tab-3' && (stepTab === 'tab-1' || stepTab === 'tab-2'))
      ) {
        step.classList.add('completed');
      }
    });

    if (tabId === 'tab-3') {
      nextLessonBtn.innerHTML = "Quizni boshlash! 🌟";
    } else {
      nextLessonBtn.innerHTML = "Keyingi dars →";
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  nextLessonBtn.addEventListener('click', () => {
    if (currentTabId === 'tab-1') {
      switchTab('tab-2');
      document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
    } else if (currentTabId === 'tab-2') {
      switchTab('tab-3');
      document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
    } else if (currentTabId === 'tab-3') {
      document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ==========================================================================
  // 4. PLANET INFO MODAL
  // ==========================================================================
  const planetCardItems = document.querySelectorAll('.planet-card-item-light');
  const planetModal = document.getElementById('planet-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  const modalImgWrap = document.getElementById('modal-img-wrap-el');
  const modalTitle = document.getElementById('modal-title-el');
  const modalOrder = document.getElementById('modal-order-el');
  const modalFactsList = document.getElementById('modal-facts-el');

  // Map of planet keys → real image src (relative to root)
  const planetImgSrc = {
    merkuriy: 'images/mercury.png',
    venera:   'images/venus.png',
    yer:      'images/earth.png',
    mars:     'images/mars.png',
    yupiter:  'images/jupiter.png',
    saturn:   'images/saturn.png',
    uran:     'images/uranus.jpg',
    neptun:   null   // no real photo – uses decorative SVG fallback
  };

  const neptuneSVG = `<svg viewBox="0 0 100 100" class="modal-planet-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="np-modal" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="40%" stop-color="#2563eb"/>
        <stop offset="100%" stop-color="#1e3a8a"/>
      </radialGradient>
      <clipPath id="np-modal-clip"><circle cx="50" cy="50" r="48"/></clipPath>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#np-modal)"/>
    <g clip-path="url(#np-modal-clip)">
      <path d="M 4 36 Q 25 28 50 32 Q 75 36 96 32" fill="none" stroke="#93c5fd" stroke-width="3.5" opacity="0.5"/>
      <path d="M 4 50 Q 30 42 50 48 Q 70 54 96 48" fill="none" stroke="#60a5fa" stroke-width="5" opacity="0.4"/>
      <path d="M 4 64 Q 30 58 50 62 Q 72 66 96 62" fill="none" stroke="#93c5fd" stroke-width="3" opacity="0.35"/>
      <ellipse cx="65" cy="40" rx="12" ry="6" fill="#1d4ed8" opacity="0.6" transform="rotate(-8 65 40)"/>
    </g>
    <ellipse cx="35" cy="32" rx="14" ry="8" fill="white" opacity="0.07" transform="rotate(-20 35 32)"/>
  </svg>`;

  const planetDetails = {
    merkuriy: {
      title: 'Merkuriy',
      order: 'Quyoshdan 1-chi sayyora',
      color: '#94a3b8',
      facts: [
        'Quyoshga eng yaqin sayyora bo\'lsa-da, u eng issiq sayyora emas.',
        'Merkuriyda 1 yil juda tez o\'tadi — Yerdagi atigi 88 kunga teng.',
        'Kechalari muzday sovuq (-180°C), kunduzlari esa juda issiq (+430°C) bo\'ladi.'
      ]
    },
    venera: {
      title: 'Venera',
      order: 'Quyoshdan 2-chi sayyora',
      color: '#f59e0b',
      facts: [
        'Koinotdagi eng issiq sayyora! Harorat doimo 465°C darajani tashkil etadi.',
        'O\'z o\'qi atrofida boshqa sayyoralarga teskari tomonga aylanadi.',
        'Osmonda juda yorqin porlaydi, shuning uchun uni ba\'zan "Tong yulduzi" deyishadi.'
      ]
    },
    yer: {
      title: 'Yer',
      order: 'Quyoshdan 3-chi sayyora',
      color: '#0ea5e9',
      facts: [
        'Quyosh tizimida tirik jonivorlar va hayot borligi aniqlangan yagona maskan.',
        'Yer yuzasining 71 foizini suv (okean va dengizlar) tashkil qiladi.',
        'Bizning bitta yo\'ldoshimiz bor — u kechalari yorug\'lik sochadigan Oydir.'
      ]
    },
    mars: {
      title: 'Mars',
      order: 'Quyoshdan 4-chi sayyora',
      color: '#ef4444',
      facts: [
        'Qizg\'ish-olovrang tusda bo\'lgani uchun uni "Qizil sayyora" deb atashadi.',
        'Koinotdagi eng baland va ulkan vulqon tog\'i — "Olimp" shu sayyoradadir.',
        'Marsda juda kuchli qum bo\'ronlari sodir bo\'lib turadi.'
      ]
    },
    yupiter: {
      title: 'Yupiter',
      order: 'Quyoshdan 5-chi sayyora',
      color: '#b45309',
      facts: [
        'Quyosh tizimidagi eng katta va eng og\'ir gigant sayyoradir.',
        'Undagi "Katta Qizil Dog\'" — bu 350 yildan ortiq vaqtdan beri tinmagan ulkan bo\'ronga teng.',
        'Uning atrofida aylanuvchi 79 ta yo\'ldoshi (oylar) bor.'
      ]
    },
    saturn: {
      title: 'Saturn',
      order: 'Quyoshdan 6-chi sayyora',
      color: '#b8860b',
      facts: [
        'O\'zining ajoyib keng va yorqin halqalari bilan koinotning eng go\'zal sayyorasidir.',
        'Halqalar asosan muz bo\'laklari, changlar va toshlardan tashkil topgan.',
        'Hozirgi kunda Saturn atrofida aylanuvchi 82 ta oy aniqlangan.'
      ]
    },
    uran: {
      title: 'Uran',
      order: 'Quyoshdan 7-chi sayyora',
      color: '#38bdf8',
      facts: [
        'O\'z o\'qi atrofida deyarli yonboshlab aylanadigan g\'ayrioddiy sayyora.',
        'Muzlardan iborat o\'ta sovuq bo\'lgani uchun u "Muzli gigant" deyiladi.',
        'Uran atrofida ham ko\'zga deyarli tashlanmaydigan 13 ta ingichka halqa bor.'
      ]
    },
    neptun: {
      title: 'Neptun',
      order: 'Quyoshdan 8-chi sayyora',
      color: '#1d4ed8',
      facts: [
        'Quyoshdan eng uzoqda joylashgan va muzlagan ko\'k sayyora.',
        'Undagi bo\'ron shamollari tezligi soatiga 2000 km ga yetishi mumkin.',
        'Neptun Quyosh atrofida 1 marta aylanib chiqishi uchun 165 yil kerak bo\'ladi!'
      ]
    }
  };

  planetCardItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-planet');
      const details = planetDetails[key];
      if (details) {
        // Show real planet image (or SVG fallback for neptun)
        const imgSrc = planetImgSrc[key];
        if (imgSrc) {
          modalImgWrap.innerHTML = `<img src="${imgSrc}" alt="${details.title}" class="modal-planet-real-img">`;
        } else {
          modalImgWrap.innerHTML = neptuneSVG;
        }

        modalTitle.textContent = details.title;
        modalOrder.textContent = details.order;
        planetModal.style.setProperty('--modal-accent', details.color);
        
        modalFactsList.innerHTML = '';
        details.facts.forEach(fact => {
          const li = document.createElement('li');
          li.textContent = fact;
          modalFactsList.appendChild(li);
        });
        
        planetModal.classList.add('active');
      }
    });
  });

  function closeModal() {
    planetModal.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  planetModal.addEventListener('click', (e) => {
    if (e.target === planetModal) closeModal();
  });

  // ==========================================================================
  // 5. THE DRAG AND DROP PLANETS GAME
  // ==========================================================================
  
  // Real planet images for drag game pills (img tags for 6 real photos, SVG for neptun)
  const planetGameIcons = {
    merkuriy: `<img src="images/mercury.png" alt="Merkuriy" class="drag-planet-real-img">`,
    venera:   `<img src="images/venus.png"   alt="Venera"   class="drag-planet-real-img">`,
    yer:      `<img src="images/earth.png"   alt="Yer"      class="drag-planet-real-img">`,
    mars:     `<img src="images/mars.png"    alt="Mars"     class="drag-planet-real-img">`,
    yupiter:  `<img src="images/jupiter.png" alt="Yupiter"  class="drag-planet-real-img">`,
    saturn:   `<img src="images/saturn.png"  alt="Saturn"   class="drag-planet-real-img drag-planet-saturn">`,
    uran:     `<img src="images/uranus.jpg"  alt="Uran"     class="drag-planet-real-img">`,
    neptun: `
      <svg viewBox="0 0 100 100" class="drag-planet-real-img" style="border-radius:50%;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="np-drag" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#60a5fa"/>
            <stop offset="40%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </radialGradient>
          <clipPath id="np-drag-clip"><circle cx="50" cy="50" r="48"/></clipPath>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#np-drag)"/>
        <g clip-path="url(#np-drag-clip)">
          <path d="M 4 38 Q 25 30 50 34 Q 75 38 96 34" fill="none" stroke="#93c5fd" stroke-width="3" opacity="0.5"/>
          <path d="M 4 52 Q 30 44 50 50 Q 70 56 96 50" fill="none" stroke="#60a5fa" stroke-width="4" opacity="0.4"/>
          <ellipse cx="65" cy="40" rx="10" ry="5" fill="#1d4ed8" opacity="0.6" transform="rotate(-8 65 40)"/>
        </g>
      </svg>
    `
  };

  const initialPlanetsList = [
    { key: 'merkuriy', name: 'Merkuriy', order: 1, color: '#94a3b8' },
    { key: 'venera', name: 'Venera', order: 2, color: '#f59e0b' },
    { key: 'yer', name: 'Yer', order: 3, color: '#0ea5e9' },
    { key: 'mars', name: 'Mars', order: 4, color: '#ef4444' },
    { key: 'yupiter', name: 'Yupiter', order: 5, color: '#f59e0b' },
    { key: 'saturn', name: 'Saturn', order: 6, color: '#f59e0b' },
    { key: 'uran', name: 'Uran', order: 7, color: '#0ea5e9' },
    { key: 'neptun', name: 'Neptun', order: 8, color: '#1d4ed8' }
  ];

  const mixedPlanetsZone = document.getElementById('mixed-planets-zone');
  const dropSlotsZone = document.getElementById('drop-slots-zone');
  const gameCorrectCount = document.getElementById('game-correct-count');
  const gameResetBtn = document.getElementById('game-reset-btn');
  const gameSuccessBanner = document.getElementById('game-success-banner');

  let correctPositionsCount = 0;
  let draggedElement = null;

  // Initialize Game board
  function initDragDropGame() {
    correctPositionsCount = 0;
    gameCorrectCount.textContent = '0';
    gameSuccessBanner.classList.add('hide');
    mixedPlanetsZone.innerHTML = '';
    
    // Clear slots
    const slots = dropSlotsZone.querySelectorAll('.drop-slot');
    slots.forEach(slot => {
      slot.className = 'drop-slot';
      const num = slot.getAttribute('data-slot');
      slot.innerHTML = `
        <span class="slot-num">${num}</span>
        ${num === '1' ? '<span class="slot-desc"><small>☀️ Yaqin</small></span>' : ''}
        ${num === '8' ? '<span class="slot-desc"><small>Uzoq</small></span>' : ''}
      `;
    });

    // Shuffle planets
    const shuffled = [...initialPlanetsList].sort(() => Math.random() - 0.5);

    // Create Draggable cards
    shuffled.forEach(planet => {
      const item = document.createElement('div');
      item.classList.add('draggable-planet');
      item.setAttribute('draggable', 'true');
      item.setAttribute('data-order', planet.order);
      item.setAttribute('data-key', planet.key);
      item.style.setProperty('--planet-color', planet.color);
      
      item.innerHTML = `
        <div class="draggable-planet-icon">${planetGameIcons[planet.key]}</div>
        <span>${planet.name}</span>
      `;
      
      // Bind Desktop drag events
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      
      // Bind Mobile touch events
      item.addEventListener('touchstart', handleTouchStart, { passive: false });
      item.addEventListener('touchmove', handleTouchMove, { passive: false });
      item.addEventListener('touchend', handleTouchEnd, { passive: false });

      mixedPlanetsZone.appendChild(item);
    });
  }

  // Desktop drag actions
  function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', this.getAttribute('data-order'));
  }

  function handleDragEnd() {
    this.classList.remove('dragging');
    draggedElement = null;
  }

  // Set up Drop target listeners
  const dropSlots = dropSlotsZone.querySelectorAll('.drop-slot');
  dropSlots.forEach(slot => {
    slot.addEventListener('dragover', (e) => e.preventDefault());
    
    slot.addEventListener('dragenter', function() {
      if (!this.classList.contains('correct-slot')) {
        this.classList.add('drag-over');
      }
    });

    slot.addEventListener('dragleave', function() {
      this.classList.remove('drag-over');
    });

    slot.addEventListener('drop', function(e) {
      this.classList.remove('drag-over');
      const order = parseInt(e.dataTransfer.getData('text/plain'));
      const slotNum = parseInt(this.getAttribute('data-slot'));
      
      verifyMatch(draggedElement, order, this, slotNum);
    });
  });

  // Verify function
  function verifyMatch(element, planetOrder, slotElement, slotNum) {
    if (slotElement.classList.contains('correct-slot')) return;

    if (planetOrder === slotNum) {
      slotElement.classList.add('correct-slot');
      
      slotElement.innerHTML = '';
      const key = element.getAttribute('data-key');
      const name = element.querySelector('span').textContent;
      
      const lockedPlanet = document.createElement('div');
      lockedPlanet.classList.add('draggable-planet');
      lockedPlanet.innerHTML = `
        <div class="draggable-planet-icon">${planetGameIcons[key]}</div>
        <span>${name}</span>
      `;
      slotElement.appendChild(lockedPlanet);
      
      element.remove();
      
      // Update counters
      correctPositionsCount++;
      gameCorrectCount.textContent = correctPositionsCount;
      
      // Success explosion
      const rect = slotElement.getBoundingClientRect();
      createStarburst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      
      // Check for Game Victory
      if (correctPositionsCount === 8) {
        triggerConfettiRain();
        triggerConfettiRain();
        gameSuccessBanner.classList.remove('hide');
      }
      
    } else {
      slotElement.classList.add('wrong-slot');
      setTimeout(() => {
        slotElement.classList.remove('wrong-slot');
      }, 400);
      
      if (element) {
        element.style.transform = 'scale(0.9) translate(-10px, 0)';
        setTimeout(() => element.style.transform = '', 150);
      }
    }
  }

  // Mobile Touch dragging helper coords
  let touchStartCoords = { x: 0, y: 0 };
  let touchOffset = { x: 0, y: 0 };
  let activeTouchElement = null;

  function handleTouchStart(e) {
    if (this.parentElement.classList.contains('drop-slot')) return;
    
    activeTouchElement = this;
    const touch = e.touches[0];
    const rect = this.getBoundingClientRect();
    
    touchStartCoords = {
      x: rect.left,
      y: rect.top
    };
    
    touchOffset = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
    this.style.position = 'fixed';
    this.style.width = `${rect.width}px`;
    this.style.height = `${rect.height}px`;
    this.style.left = `${rect.left}px`;
    this.style.top = `${rect.top}px`;
    this.style.zIndex = '2000';
    this.classList.add('dragging');
  }

  function handleTouchMove(e) {
    if (!activeTouchElement) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = touch.clientX - touchOffset.x;
    const newY = touch.clientY - touchOffset.y;
    
    activeTouchElement.style.left = `${newX}px`;
    activeTouchElement.style.top = `${newY}px`;
  }

  function handleTouchEnd(e) {
    if (!activeTouchElement) return;
    
    const touch = e.changedTouches[0];
    activeTouchElement.style.display = 'none';
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    activeTouchElement.style.display = '';
    
    let slotElement = null;
    if (dropTarget) {
      slotElement = dropTarget.closest('.drop-slot');
    }
    
    if (slotElement && !slotElement.classList.contains('correct-slot')) {
      const planetOrder = parseInt(activeTouchElement.getAttribute('data-order'));
      const slotNum = parseInt(slotElement.getAttribute('data-slot'));
      
      activeTouchElement.style.position = '';
      activeTouchElement.style.width = '';
      activeTouchElement.style.height = '';
      activeTouchElement.style.left = '';
      activeTouchElement.style.top = '';
      activeTouchElement.style.zIndex = '';
      activeTouchElement.classList.remove('dragging');
      
      verifyMatch(activeTouchElement, planetOrder, slotElement, slotNum);
      
    } else {
      activeTouchElement.style.transition = 'all 0.3s ease-out';
      activeTouchElement.style.left = `${touchStartCoords.x}px`;
      activeTouchElement.style.top = `${touchStartCoords.y}px`;
      
      const el = activeTouchElement;
      setTimeout(() => {
        el.style.position = '';
        el.style.width = '';
        el.style.height = '';
        el.style.left = '';
        el.style.top = '';
        el.style.zIndex = '';
        el.style.transition = '';
        el.classList.remove('dragging');
      }, 300);
    }
    
    activeTouchElement = null;
  }

  gameResetBtn.addEventListener('click', initDragDropGame);
  initDragDropGame();

  // ==========================================================================
  // 6. QUIZ GAME ENGINE
  // ==========================================================================
  
  // Custom framed mini solar system lineup illustration for the quiz questions
  const quizSVGs = {
    q1: `
      <svg viewBox="0 0 300 120" class="quiz-illus-svg">
        <rect x="0" y="0" width="300" height="120" fill="#0f172a" rx="16"/>
        <circle cx="10" cy="60" r="30" fill="#f59e0b" />
        <circle cx="70" cy="60" r="5" fill="#94a3b8" />
        <circle cx="95" cy="60" r="8" fill="#fef08a" />
        <circle cx="125" cy="60" r="10" fill="#0ea5e9" />
        <circle cx="155" cy="60" r="7" fill="#ef4444" />
        <circle cx="190" cy="60" r="15" fill="#f59e0b" />
        <ellipse cx="235" cy="60" rx="18" ry="5" fill="none" stroke="#fef08a" stroke-width="2" transform="rotate(-10 235 60)" />
        <circle cx="235" cy="60" r="11" fill="#ffd700" />
        <circle cx="270" cy="60" r="9" fill="#38bdf8" />
        <line x1="10" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="3,3" />
      </svg>
    `,
    q2: `
      <svg viewBox="0 0 120 120" class="quiz-illus-svg" style="max-height:120px;">
        <circle cx="60" cy="60" r="45" fill="#f59e0b" />
        <path d="M 17 40 Q 60 32 103 40" fill="none" stroke="#b45309" stroke-width="4" />
        <path d="M 15 60 Q 60 68 105 60" fill="none" stroke="#fef08a" stroke-width="3" />
        <ellipse cx="78" cy="65" rx="8" ry="5" fill="#ef4444" />
      </svg>
    `,
    q3: `
      <svg viewBox="0 0 120 120" class="quiz-illus-svg" style="max-height:120px; animation:rotatePlanet 30s linear infinite;">
        <circle cx="60" cy="60" r="35" fill="rgba(124, 58, 237, 0.1)" />
        <circle cx="60" cy="60" r="5" fill="#ffffff" filter="drop-shadow(0 0 5px #ffd700)" />
        <path d="M 60 60 Q 75 50 85 30 T 70 10" fill="none" stroke="#ec4899" stroke-width="4" stroke-linecap="round" />
        <path d="M 60 60 Q 45 70 35 90 T 50 110" fill="none" stroke="#7c3aed" stroke-width="3" stroke-linecap="round" />
      </svg>
    `,
    q4: `
      <svg viewBox="0 0 160 100" class="quiz-illus-svg" style="max-height:100px;">
        <ellipse cx="80" cy="50" rx="66" ry="16" fill="none" stroke="#fef08a" stroke-width="5" transform="rotate(-12 80 50)" />
        <circle cx="80" cy="50" r="28" fill="#ffd700" />
        <path d="M 17 56 A 66 16 0 0 0 143 44" fill="none" stroke="#fef08a" stroke-width="5" transform="rotate(-12 80 50)"/>
      </svg>
    `,
    q5: `
      <svg viewBox="0 0 240 120" class="quiz-illus-svg" style="max-height:120px;">
        <circle cx="60" cy="60" r="24" fill="#f59e0b" filter="drop-shadow(0 0 8px #ffd700)" />
        <ellipse cx="120" cy="60" rx="90" ry="40" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5" />
        <g transform="translate(185, 82)">
          <circle cx="0" cy="0" r="10" fill="#0ea5e9" />
          <circle cx="0" cy="0" r="13" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5" />
        </g>
        <path d="M 85 60 L 150 75" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3,3" />
        <polygon points="152,78 142,75 148,69" fill="#7c3aed" />
        <text x="120" y="46" fill="#7c3aed" font-size="11" font-family="Comfortaa" font-weight="bold">3-chi o\'rin</text>
      </svg>
    `
  };

  const quizQuestions = [
    {
      illusKey: 'q1',
      question: 'Quyosh tizimida nechta sayyora bor?',
      options: ['7 ta', '8 ta', '9 ta', '10 ta'],
      correctIndex: 1, // 8 ta
      correctText: '🎉 To\'g\'ri! +1 yulduz. Quyosh tizimida 8 ta asosiy sayyora bor.',
      wrongText: '❌ Noto\'g\'ri, qayta urining! Quyosh tizimida jami 8 ta sayyora bor.'
    },
    {
      illusKey: 'q2',
      question: 'Quyosh tizimidagi eng katta sayyora qaysi?',
      options: ['Saturn', 'Yer', 'Yupiter', 'Neptun'],
      correctIndex: 2, // Yupiter
      correctText: '🎉 To\'g\'ri! +1 yulduz. Yupiter eng ulkan gaz gigantidir.',
      wrongText: '❌ Noto\'g\'ri, qayta urining! Eng katta sayyora — Yupiter.'
    },
    {
      illusKey: 'q3',
      question: 'Bizning galaktika qanday nomlanadi?',
      options: ['Andromeda', 'Perseus', 'Somon Yo\'li', 'Magellan buluti'],
      correctIndex: 2, // Somon Yo'li
      correctText: '🎉 To\'g\'ri! +1 yulduz. Biz yashaydigan galaktika "Somon Yo\'li" (Milky Way) deb ataladi.',
      wrongText: '❌ Noto\'g\'ri, qayta urining! Bizning ulkan kosmik uyimiz "Somon Yo\'li" galaktikasidir.'
    },
    {
      illusKey: 'q4',
      question: 'Qaysi sayyorada keng va ko\'rinadigan halqa bor?',
      options: ['Mars', 'Yer', 'Saturn', 'Venera'],
      correctIndex: 2, // Saturn
      correctText: '🎉 To\'g\'ri! +1 yulduz. Saturn o\'zining yorqin va ulkan halqalari bilan mashhur.',
      wrongText: '❌ Noto\'g\'ri, qayta urining! Chiroyli halqalari bor eng mashhur sayyora — Saturn.'
    },
    {
      illusKey: 'q5',
      question: 'Yer Quyoshdan nechanchi sayyora?',
      options: ['1-chi', '2-chi', '3-chi', '4-chi'],
      correctIndex: 2, // 3-chi
      correctText: '🎉 To\'g\'ri! +1 yulduz. Yerimiz Quyoshdan uchinchi o\'rinda joylashgan ko\'k sayyora.',
      wrongText: '❌ Noto\'g\'ri, qayta urining! Yer Quyoshdan uchinchi o\'rindagi sayyora.'
    }
  ];

  let currentQuestionIndex = 0;
  let quizScore = 0;
  let hasAnswered = false;

  const quizIllusContainer = document.getElementById('quiz-illus-container');
  const questionBadgeEl = document.getElementById('question-badge-el');
  const questionTextEl = document.getElementById('question-text-el');
  const optionsGridEl = document.getElementById('options-grid-el');
  const feedbackMessageEl = document.getElementById('feedback-message-el');
  const nextQuestionBtn = document.getElementById('next-question-btn');
  const scoreCounter = document.getElementById('score-counter');

  function loadQuestion(index) {
    hasAnswered = false;
    feedbackMessageEl.textContent = '';
    feedbackMessageEl.className = 'feedback-message-light';
    nextQuestionBtn.classList.add('hide');

    const currentQ = quizQuestions[index];
    questionBadgeEl.textContent = `Savol ${index + 1} / 5`;
    
    // Always use the lineups SVG as a hint helper for Q1 and other questions
    quizIllusContainer.innerHTML = quizSVGs[currentQ.illusKey];
    questionTextEl.textContent = currentQ.question;
    
    optionsGridEl.innerHTML = '';
    currentQ.options.forEach((optionText, optIdx) => {
      const button = document.createElement('button');
      button.classList.add('option-btn-light');
      button.innerHTML = `
        <span class="option-indicator-circle"></span>
        <span class="option-label-text">${optionText}</span>
      `;
      
      button.addEventListener('click', () => {
        handleAnswerSelection(button, optIdx);
      });
      
      optionsGridEl.appendChild(button);
    });
  }

  function handleAnswerSelection(selectedBtn, selectedIdx) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQ = quizQuestions[currentQuestionIndex];
    const correctIdx = currentQ.correctIndex;
    const allButtons = optionsGridEl.querySelectorAll('.option-btn-light');
    
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
      selectedBtn.classList.add('correct');
      
      // Increment Score
      quizScore++;
      scoreCounter.textContent = quizScore;
      
      feedbackMessageEl.textContent = currentQ.correctText;
      feedbackMessageEl.classList.add('correct-text');
      
      // Starburst FX
      const rect = selectedBtn.getBoundingClientRect();
      createStarburst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      
    } else {
      selectedBtn.classList.add('wrong');
      const correctBtn = allButtons[correctIdx];
      correctBtn.classList.add('glow-correct');
      
      feedbackMessageEl.textContent = currentQ.wrongText;
      feedbackMessageEl.classList.add('wrong-text');
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextQuestionBtn.innerHTML = "Natijani ko'r 🏆";
    } else {
      nextQuestionBtn.innerHTML = "Keyingi savol →";
    }
    
    nextQuestionBtn.classList.remove('hide');
  }

  nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  });

  loadQuestion(0);

  // ==========================================================================
  // 7. FINAL RESULTS LOGIC
  // ==========================================================================
  const resultsSection = document.getElementById('results-section');
  const resultCard = document.querySelector('.result-card-light');
  const finalScoreNum = document.getElementById('final-score-num');
  const resultTitleEl = document.getElementById('result-title-el');
  const resultMsgEl = document.getElementById('result-msg-el');
  const starRatingRowEl = document.getElementById('star-rating-row-el');
  const resultAstronautSvg = document.getElementById('result-astronaut-svg');
  
  const retryBtn = document.getElementById('retry-btn');
  const relearnBtn = document.getElementById('relearn-btn');

  // SVGs of astronaut poses for results card
  const resultsAstronautPoses = {
    celebrating: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-celebrate">
        <!-- Celebrating hands raised -->
        <path d="M 45 80 Q 25 50 15 25 C 12 20 22 15 28 20 Q 38 42 48 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="15" cy="22" r="6.5" fill="#f97316"/>
        <path d="M 105 80 Q 125 50 135 25 C 138 20 128 15 122 20 Q 112 42 102 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="135" cy="22" r="6.5" fill="#f97316"/>
        
        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#f97316" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#f97316" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#e2e8f0" />
        
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="75" cy="52" r="22" fill="#0ea5e9" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#1e1b4b" />
          <circle cx="83" cy="48" r="2.5" fill="#1e1b4b" />
          <path d="M 68 53 Q 75 64 82 53 Z" fill="#1e1b4b" />
          <circle cx="63" cy="54" r="2" fill="#ec4899" opacity="0.6" />
          <circle cx="87" cy="54" r="2" fill="#ec4899" opacity="0.6" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `,
    thumbsup: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-thumbsup">
        <path d="M 45 80 Q 25 70 20 50 C 18 45 28 40 32 46 Q 38 62 48 72 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="18" cy="46" r="6.5" fill="#f97316"/>
        
        <path d="M 105 80 Q 120 75 130 75 C 135 75 135 65 130 65 Q 120 65 102 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="132" cy="65" r="6" fill="#f97316"/>
        <path d="M 132 62 Q 134 52 137 54" stroke="#f97316" stroke-width="2" stroke-linecap="round" fill="none"/>

        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#f97316" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#f97316" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#e2e8f0" />
        
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="75" cy="52" r="22" fill="#0ea5e9" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#1e1b4b" />
          <circle cx="83" cy="48" r="2.5" fill="#1e1b4b" />
          <path d="M 68 56 Q 75 64 82 56" fill="none" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `,
    waving: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-encourage">
        <path d="M 45 80 Q 25 70 20 50 C 18 45 28 40 32 46 Q 38 62 48 72 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="18" cy="46" r="6.5" fill="#f97316"/>
        <path d="M 105 80 Q 120 95 130 115 C 132 120 122 125 118 118 Q 110 100 102 85 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="130" cy="115" r="6" fill="#f97316"/>

        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#f97316" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#f97316" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#e2e8f0" />
        
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
        <circle cx="75" cy="52" r="22" fill="#0ea5e9" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#1e1b4b" />
          <circle cx="83" cy="48" r="2.5" fill="#1e1b4b" />
          <path d="M 70 57 Q 75 62 80 57" fill="none" stroke="#1e1b4b" stroke-width="2" stroke-linecap="round" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `
  };

  function showResults() {
    resultsSection.classList.add('active-section');
    resultTitleEl.className = 'result-title-light';

    // Reset stars
    const ratingStars = starRatingRowEl.querySelectorAll('.rating-star-light');
    ratingStars.forEach(star => star.classList.remove('earned'));

    if (quizScore === 5) {
      resultTitleEl.textContent = "🏆 Koinot Qahramoni!";
      resultTitleEl.classList.add('yellow-text');
      resultMsgEl.textContent = "Zo'r! Siz koinot haqida hamma narsani bilasiz. Haqiqiy astronavt bo'lishga tayyor bo'lgan yosh olim!";
      resultAstronautSvg.innerHTML = resultsAstronautPoses.celebrating;
      
      // Confetti shower
      triggerConfettiRain();
      triggerConfettiRain();
      
    } else if (quizScore >= 3) {
      resultTitleEl.textContent = "🌟 Yulduzli Tadqiqotchi!";
      resultTitleEl.classList.add('green-text');
      resultMsgEl.textContent = "Ajoyib! Siz koinot haqida juda ko'p narsani bilasiz. Yana bir oz o'rgansangiz, kosmik ekspert bo'lasiz!";
      resultAstronautSvg.innerHTML = resultsAstronautPoses.thumbsup;
      
    } else {
      resultTitleEl.textContent = "🚀 Yana bir marta!";
      resultTitleEl.classList.add('purple-text');
      resultMsgEl.textContent = "Davom eting! Koinot sirlari juda qiziqarli. Darslarni yana bir marta o'qib, qaytadan urinib ko'ring!";
      resultAstronautSvg.innerHTML = resultsAstronautPoses.waving;
    }

    resultsSection.scrollIntoView({ behavior: 'smooth' });

    // Count-up
    let currentCount = 0;
    finalScoreNum.textContent = '0';
    
    const countInterval = setInterval(() => {
      if (currentCount >= quizScore) {
        clearInterval(countInterval);
        finalScoreNum.textContent = quizScore;
        lightUpStarsSequentially();
      } else {
        currentCount++;
        finalScoreNum.textContent = currentCount;
      }
    }, 150);
  }

  function lightUpStarsSequentially() {
    const ratingStars = starRatingRowEl.querySelectorAll('.rating-star-light');
    ratingStars.forEach((star, idx) => {
      if (idx < quizScore) {
        setTimeout(() => {
          star.classList.add('earned');
          const rect = star.getBoundingClientRect();
          createStarburst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, idx * 250);
      }
    });
  }

  // ==========================================================================
  // 8. RETRY & REPLAY TRIGGERS
  // ==========================================================================
  retryBtn.addEventListener('click', () => {
    quizScore = 0;
    currentQuestionIndex = 0;
    scoreCounter.textContent = '0';
    resultsSection.classList.remove('active-section');
    loadQuestion(0);
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
  });

  relearnBtn.addEventListener('click', () => {
    quizScore = 0;
    currentQuestionIndex = 0;
    scoreCounter.textContent = '0';
    resultsSection.classList.remove('active-section');
    switchTab('tab-1');
    loadQuestion(0);
    document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
  });

});
