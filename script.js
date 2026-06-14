/* ==========================================================================
   KOINOT SARGUZASHTI - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Make sections visible initially (except results)
  document.getElementById('lessons-section').classList.add('active-section');
  document.getElementById('quiz-section').classList.add('active-section');

  // ==========================================================================
  // 1. BACKGROUND STARS GENERATOR
  // ==========================================================================
  const starfield = document.getElementById('starfield');
  const starCount = 120;
  const twinkleCount = 30;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Randomize position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    
    // Randomize size (between 1px and 3.5px)
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Randomize color (white, or pale blue)
    if (Math.random() > 0.7) {
      star.classList.add('star-pale-blue');
    }
    
    // Assign twinkle animation to a subset of stars
    if (i < twinkleCount) {
      star.classList.add('twinkle');
      // Randomize animation delay and duration
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${Math.random() * 2 + 2}s`;
    }
    
    starfield.appendChild(star);
  }

  // ==========================================================================
  // 2. SHOOTING STARS GENERATOR
  // ==========================================================================
  const shootingStarsContainer = document.getElementById('shooting-stars-container');
  
  function triggerShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    
    // Random position starting high-left
    const startX = Math.random() * 80;
    const startY = Math.random() * 40;
    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    
    shootingStarsContainer.appendChild(star);
    
    // Remove star after animation completes
    setTimeout(() => {
      star.remove();
    }, 1200);
  }

  // Trigger shooting stars periodically
  setInterval(triggerShootingStar, 5000);
  // Trigger initial one
  setTimeout(triggerShootingStar, 1000);

  // ==========================================================================
  // 3. NAVIGATION & SCROLLING
  // ==========================================================================
  const startBtn = document.getElementById('start-btn');
  
  startBtn.addEventListener('click', () => {
    document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================================================
  // 4. LESSON TABS LOGIC
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextLessonBtn = document.getElementById('next-lesson-btn');
  
  let currentTabId = 'tab-1';

  function switchTab(tabId) {
    currentTabId = tabId;

    // Update active tab buttons
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update tab panes
    tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update progress steps visual styling
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

    // Update bottom next button text
    if (tabId === 'tab-3') {
      nextLessonBtn.innerHTML = "Quizni boshlash! 🌟";
    } else {
      nextLessonBtn.innerHTML = "Keyingi dars →";
    }
  }

  // Bind click event to tab buttons
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Next lesson button behavior
  nextLessonBtn.addEventListener('click', () => {
    if (currentTabId === 'tab-1') {
      switchTab('tab-2');
      document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
    } else if (currentTabId === 'tab-2') {
      switchTab('tab-3');
      document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
    } else if (currentTabId === 'tab-3') {
      // Scroll to quiz
      document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ==========================================================================
  // 5. PLANET GRID & POPUP MODAL LOGIC
  // ==========================================================================
  const planetGridItems = document.querySelectorAll('.planet-grid-item');
  const planetModal = document.getElementById('planet-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  const modalEmoji = document.getElementById('modal-emoji-el');
  const modalTitle = document.getElementById('modal-title-el');
  const modalOrder = document.getElementById('modal-order-el');
  const modalFactsList = document.getElementById('modal-facts-el');

  // Planet detailed facts in Uzbek
  const planetDetails = {
    merkuriy: {
      emoji: '🪐',
      title: 'Merkuriy',
      order: 'Quyoshdan 1-chi sayyora',
      color: '#8d99ae',
      glow: 'rgba(141, 153, 174, 0.4)',
      facts: [
        'Quyoshga eng yaqin sayyora',
        '1 yili Yerdagi 88 kunga teng',
        "Kechasi juda sovuq (-180°C), kunduzi esa o'ta issiq (+430°C) bo'ladi"
      ]
    },
    venera: {
      emoji: '🪐',
      title: 'Venera',
      order: 'Quyoshdan 2-chi sayyora',
      color: '#ffd700',
      glow: 'rgba(255, 215, 0, 0.4)',
      facts: [
        'Eng issiq sayyora — harorat 465°C gacha yetadi',
        'O\'z o\'qi atrofida boshqa sayyoralarga teskari aylanadi',
        'Uning hech qanday oyi (tabiiy yo\'ldoshi) yo\'q'
      ]
    },
    yer: {
      emoji: '🌍',
      title: 'Yer',
      order: 'Quyoshdan 3-chi sayyora',
      color: '#00d4ff',
      glow: 'rgba(0, 212, 255, 0.4)',
      facts: [
        'Quyosh tizimida hayot mavjud bo\'lgan yagona sayyora',
        'Sirtining 71 foizi suv bilan qoplangan',
        'Uning bitta yo\'ldoshi bor — u ham bo\'lsa Oy'
      ]
    },
    mars: {
      emoji: '🪐',
      title: 'Mars',
      order: 'Quyoshdan 4-chi sayyora',
      color: '#ff4d6d',
      glow: 'rgba(255, 77, 109, 0.4)',
      facts: [
        'Qizil rangda ko\'rinadi, bunga sabab uning tuprog\'idagi temir oksididir',
        'Koinotdagi eng baland vulqon tog\'i — "Olimp" shu yerda joylashgan',
        'Ikkita kichik oyi bor: Fobos va Deymos'
      ]
    },
    yupiter: {
      emoji: '🪐',
      title: 'Yupiter',
      order: 'Quyoshdan 5-chi sayyora',
      color: '#ffb703',
      glow: 'rgba(255, 183, 3, 0.4)',
      facts: [
        'Quyosh tizimidagi eng katta va eng og\'ir sayyora',
        'Katta Qizil Dog\' — bu kamida 350 yildan beri davom etayotgan ulkan bo\'rondir',
        'Uning atrofida aylanadigan 79 ta oyi bor'
      ]
    },
    saturn: {
      emoji: '🪐',
      title: 'Saturn',
      order: 'Quyoshdan 6-chi sayyora',
      color: '#ffd700',
      glow: 'rgba(255, 215, 0, 0.4)',
      facts: [
        'Eng go\'zal va keng halqalarga ega bo\'lgan sayyora',
        'Uning halqalari milliardlab muz bo\'laklari va changlardan iborat',
        'Hozirgi kunda aniqlangan 82 ta oyi mavjud'
      ]
    },
    uran: {
      emoji: '🪐',
      title: 'Uran',
      order: 'Quyoshdan 7-chi sayyora',
      color: '#00d4ff',
      glow: 'rgba(0, 212, 255, 0.4)',
      facts: [
        'O\'z o\'qi atrofida deyarli yonboshlab (tomonlama) aylanadi',
        'Tarkibi muzlardan iborat bo\'lgani uchun "Muzli gigant" deb ataladi',
        'Uning atrofida 27 ta oyi aylanadi'
      ]
    },
    neptun: {
      emoji: '🪐',
      title: 'Neptun',
      order: 'Quyoshdan 8-chi sayyora',
      color: '#0077b6',
      glow: 'rgba(0, 119, 182, 0.4)',
      facts: [
        'Quyoshdan eng uzoqda joylashgan ko\'k rangli sayyora',
        'Shamol tezligi o\'ta kuchli bo\'lib, soatiga 2000 km gacha yetadi',
        'Uning 14 ta tabiiy yo\'ldoshi (oyi) bor'
      ]
    }
  };

  // Click on planet circle
  planetGridItems.forEach(item => {
    item.addEventListener('click', () => {
      const planetKey = item.getAttribute('data-planet');
      const details = planetDetails[planetKey];
      
      if (details) {
        // Populate modal
        modalEmoji.textContent = details.emoji;
        modalTitle.textContent = details.title;
        modalOrder.textContent = details.order;
        
        // Dynamic color styling for premium feel
        planetModal.style.setProperty('--modal-border-color', details.color);
        planetModal.style.setProperty('--modal-border-color-glow', details.glow);
        
        // List facts
        modalFactsList.innerHTML = '';
        details.facts.forEach(factText => {
          const li = document.createElement('li');
          li.textContent = factText;
          modalFactsList.appendChild(li);
        });
        
        // Show modal
        planetModal.classList.add('active');
      }
    });
  });

  // Close modal
  function closeModal() {
    planetModal.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  planetModal.addEventListener('click', (e) => {
    if (e.target === planetModal) {
      closeModal();
    }
  });

  // ==========================================================================
  // 6. QUIZ GAME ENGINE
  // ==========================================================================
  
  // Custom SVG content generator for quiz illustrations
  const quizSVGs = {
    // Q1 illustration: simple solar system line
    q1: `
      <svg viewBox="0 0 300 120" class="quiz-illus-svg">
        <circle cx="10" cy="60" r="30" fill="#ffb703" filter="drop-shadow(0 0 10px #ffb703)" />
        <circle cx="70" cy="60" r="5" fill="#8d99ae" />
        <circle cx="95" cy="60" r="8" fill="#e9d8a6" />
        <circle cx="125" cy="60" r="10" fill="#0077b6" />
        <circle cx="155" cy="60" r="7" fill="#e63946" />
        <circle cx="190" cy="60" r="16" fill="#b07d62" />
        <ellipse cx="235" cy="60" rx="20" ry="6" fill="none" stroke="#ffe5a3" stroke-width="2" transform="rotate(-10 235 60)" />
        <circle cx="235" cy="60" r="12" fill="#ffd700" />
        <circle cx="270" cy="60" r="9" fill="#90e0ef" />
        <!-- line orbit helper -->
        <line x1="10" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="3,3" />
      </svg>
    `,
    // Q2: Jupiter
    q2: `
      <svg viewBox="0 0 120 120" class="quiz-illus-svg" style="max-height:120px;">
        <circle cx="60" cy="60" r="45" fill="#b07d62" />
        <path d="M 17 40 Q 60 30 103 40" fill="none" stroke="#7f5539" stroke-width="4" opacity="0.8"/>
        <path d="M 15 60 Q 60 68 105 60" fill="none" stroke="#ffd8be" stroke-width="3.5" opacity="0.8"/>
        <path d="M 17 80 Q 60 72 103 80" fill="none" stroke="#7f5539" stroke-width="5" opacity="0.8"/>
        <ellipse cx="78" cy="67" rx="9" ry="6" fill="#d90429" />
      </svg>
    `,
    // Q3: Galaxy
    q3: `
      <svg viewBox="0 0 120 120" class="quiz-illus-svg" style="max-height:120px; animation:rotatePlanet 30s linear infinite;">
        <circle cx="60" cy="60" r="35" fill="rgba(157, 78, 221, 0.2)" />
        <circle cx="60" cy="60" r="5" fill="#ffffff" filter="drop-shadow(0 0 5px #ffd700)" />
        <!-- swirl arms -->
        <path d="M 60 60 Q 75 50 85 30 T 70 10" fill="none" stroke="#9d4edd" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <path d="M 60 60 Q 45 70 35 90 T 50 110" fill="none" stroke="#00d4ff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      </svg>
    `,
    // Q4: Saturn
    q4: `
      <svg viewBox="0 0 160 100" class="quiz-illus-svg" style="max-height:100px;">
        <ellipse cx="80" cy="50" rx="70" ry="18" fill="none" stroke="#ffe5a3" stroke-width="6" transform="rotate(-12 80 50)" opacity="0.7"/>
        <circle cx="80" cy="50" r="32" fill="#ffd700" />
        <path d="M 14 56 A 70 18 0 0 0 146 44" fill="none" stroke="#ffe5a3" stroke-width="6" transform="rotate(-12 80 50)"/>
      </svg>
    `,
    // Q5: Earth Orbiting Sun
    q5: `
      <svg viewBox="0 0 240 120" class="quiz-illus-svg" style="max-height:120px;">
        <!-- Sun center-left -->
        <circle cx="60" cy="60" r="24" fill="#ffb703" filter="drop-shadow(0 0 8px #ffb703)" />
        <!-- Orbit Ellipse -->
        <ellipse cx="120" cy="60" rx="90" ry="40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
        <!-- Earth at 3rd spot indicator -->
        <g transform="translate(185, 82)">
          <circle cx="0" cy="0" r="10" fill="#0077b6" />
          <circle cx="0" cy="0" r="13" fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.5" />
        </g>
        <!-- Arrow pointing from Sun -->
        <path d="M 85 60 L 150 75" fill="none" stroke="#9d4edd" stroke-width="2" stroke-dasharray="3,3" />
        <polygon points="152,78 142,75 148,69" fill="#9d4edd" />
        <text x="120" y="50" fill="#00d4ff" font-size="10" font-family="Comfortaa" font-weight="bold">3-chi o'rin</text>
      </svg>
    `
  };

  const quizQuestions = [
    {
      illusKey: 'q1',
      question: 'Quyosh tizimida nechta sayyora bor?',
      options: ['7 ta', '8 ta', '9 ta', '10 ta'],
      correctIndex: 1, // 8 ta
      correctText: '✅ To\'g\'ri! Zo\'r! Quyosh tizimida 8 ta asosiy sayyora bor.',
      wrongText: '❌ Noto\'g\'ri. Quyosh tizimida jami 8 ta sayyora bor (Pluton endi karlik sayyora).'
    },
    {
      illusKey: 'q2',
      question: 'Quyosh tizimidagi eng katta sayyora qaysi?',
      options: ['Saturn', 'Yer', 'Yupiter', 'Neptun'],
      correctIndex: 2, // Yupiter
      correctText: '✅ To\'g\'ri! Yupiter eng ulkan gaz gigantidir.',
      wrongText: '❌ Noto\'g\'ri. Eng katta sayyora — Yupiter. U Saturn va Yerdan ancha katta!'
    },
    {
      illusKey: 'q3',
      question: 'Bizning galaktika qanday nomlanadi?',
      options: ['Andromeda', 'Perseus', 'Somon Yo\'li', 'Magellan buluti'],
      correctIndex: 2, // Somon Yo'li
      correctText: '✅ To\'g\'ri! Biz yashaydigan galaktika "Somon Yo\'li" (Milky Way) deb ataladi.',
      wrongText: '❌ Noto\'g\'ri. Bizning ulkan kosmik uyimiz "Somon Yo\'li" galaktikasi deb ataladi.'
    },
    {
      illusKey: 'q4',
      question: 'Qaysi sayyorada keng va yaqqol ko\'rinadigan chiroyli halqalar bor?',
      options: ['Mars', 'Yer', 'Saturn', 'Venera'],
      correctIndex: 2, // Saturn
      correctText: '✅ To\'g\'ri! Saturn o\'zining yorqin va ulkan muzli halqalari bilan mashhur.',
      wrongText: '❌ Noto\'g\'ri. Chiroyli halqalari bor eng mashhur sayyora — Saturn.'
    },
    {
      illusKey: 'q5',
      question: 'Yer Quyoshdan nechanchi o\'rindagi sayyora?',
      options: ['1-chi', '2-chi', '3-chi', '4-chi'],
      correctIndex: 2, // 3-chi
      correctText: '✅ To\'g\'ri! Yerimiz Quyoshdan uchinchi o\'rinda joylashgan ko\'k sayyora.',
      wrongText: '❌ Noto\'g\'ri. Yer Quyoshdan 3-chi o\'rindagi sayyoradir.'
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

  // Load a question
  function loadQuestion(index) {
    hasAnswered = false;
    feedbackMessageEl.textContent = '';
    feedbackMessageEl.className = 'feedback-message';
    nextQuestionBtn.classList.add('hide');

    const currentQ = quizQuestions[index];
    
    // Set badge text
    questionBadgeEl.textContent = `Savol ${index + 1} / 5`;
    
    // Inject illustration
    quizIllusContainer.innerHTML = quizSVGs[currentQ.illusKey];
    
    // Question text
    questionTextEl.textContent = currentQ.question;
    
    // Clear & Populate option buttons
    optionsGridEl.innerHTML = '';
    currentQ.options.forEach((optionText, optIdx) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.innerHTML = `
        <span class="option-marker">⚪</span>
        <span class="option-label-text">${optionText}</span>
      `;
      
      button.addEventListener('click', () => {
        handleAnswerSelection(button, optIdx);
      });
      
      optionsGridEl.appendChild(button);
    });
  }

  // Answer selection callback
  function handleAnswerSelection(selectedBtn, selectedIdx) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQ = quizQuestions[currentQuestionIndex];
    const correctIdx = currentQ.correctIndex;

    // Select all buttons
    const allButtons = optionsGridEl.querySelectorAll('.option-btn');
    
    // Disable buttons immediately
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
      // Correct answer clicked
      selectedBtn.classList.add('correct');
      selectedBtn.querySelector('.option-marker').textContent = '✅';
      
      // Update Score
      quizScore++;
      scoreCounter.textContent = quizScore;
      
      // Success feedback
      feedbackMessageEl.textContent = currentQ.correctText;
      feedbackMessageEl.classList.add('correct-text');
      
      // Starburst Particle FX
      const btnRect = selectedBtn.getBoundingClientRect();
      const originX = btnRect.left + btnRect.width / 2;
      const originY = btnRect.top + btnRect.height / 2;
      createStarburst(originX, originY);
      
    } else {
      // Wrong answer clicked
      selectedBtn.classList.add('wrong');
      selectedBtn.querySelector('.option-marker').textContent = '❌';
      
      // Highlight correct answer button
      const correctBtn = allButtons[correctIdx];
      correctBtn.classList.add('glow-correct');
      correctBtn.querySelector('.option-marker').textContent = '✅';
      
      // Failure feedback
      feedbackMessageEl.textContent = currentQ.wrongText;
      feedbackMessageEl.classList.add('wrong-text');
    }

    // Set bottom button text
    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextQuestionBtn.innerHTML = "Natijani ko'r 🏆";
    } else {
      nextQuestionBtn.innerHTML = "Keyingi savol →";
    }
    
    // Display next button
    nextQuestionBtn.classList.remove('hide');
  }

  // Next Question click
  nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      // Show results section
      showResults();
    }
  });

  // Load initial question
  loadQuestion(0);

  // ==========================================================================
  // 7. STARBURST PARTICLE SYSTEM
  // ==========================================================================
  const particleOverlay = document.getElementById('particle-overlay');

  function createStarburst(x, y) {
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
      const p = document.createElement('div');
      p.classList.add('particle-star');
      p.textContent = '★';
      
      // Starting coordinates
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      
      // Calculate random trajectories
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50; // travel distance
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      
      particleOverlay.appendChild(p);
      
      // Cleanup particle after animation
      setTimeout(() => {
        p.remove();
      }, 1200);
    }
  }

  // ==========================================================================
  // 8. FINAL RESULTS LOGIC & ANIMATION
  // ==========================================================================
  const resultsSection = document.getElementById('results-section');
  const resultCard = document.querySelector('.result-card');
  const finalScoreNum = document.getElementById('final-score-num');
  const resultTitleEl = document.getElementById('result-title-el');
  const resultMsgEl = document.getElementById('result-msg-el');
  const starRatingRowEl = document.getElementById('star-rating-row-el');
  const resultAstronautSvg = document.getElementById('result-astronaut-svg');
  
  const retryBtn = document.getElementById('retry-btn');
  const relearnBtn = document.getElementById('relearn-btn');

  // SVG representation of dynamic astronaut poses
  const astronautPoses = {
    // Celebrating (hands up, confetti dots)
    celebrating: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-celebrate">
        <!-- Celebrating hands raised -->
        <!-- Left Arm Raised -->
        <path d="M 45 80 Q 25 50 15 25 C 12 20 22 15 28 20 Q 38 42 48 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="15" cy="22" r="6" fill="#adb5bd"/>
        <!-- Right Arm Raised -->
        <path d="M 105 80 Q 125 50 135 25 C 138 20 128 15 122 20 Q 112 42 102 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="135" cy="22" r="6" fill="#adb5bd"/>
        
        <!-- Torso & Legs -->
        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.3)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#adb5bd" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#adb5bd" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#495057" />
        <circle cx="68" cy="95" r="2.5" fill="#e63946" />
        <circle cx="75" cy="95" r="2.5" fill="#00d4ff" />
        <rect x="80" y="93" width="5" height="4" fill="#ffd700" />
        
        <!-- Helmet & Face -->
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="75" cy="52" r="22" fill="#1d3557" />
        <circle cx="75" cy="52" r="19" fill="#00b4d8" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#03045e" />
          <circle cx="83" cy="48" r="2.5" fill="#03045e" />
          <!-- Big happy open mouth for celebration -->
          <path d="M 68 53 Q 75 64 82 53 Z" fill="#03045e" />
          <circle cx="63" cy="54" r="2" fill="#ff85a1" opacity="0.6" />
          <circle cx="87" cy="54" r="2" fill="#ff85a1" opacity="0.6" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `,
    // Thumbs-up pose
    thumbsup: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-thumbsup">
        <!-- Waving left arm -->
        <path d="M 45 80 Q 25 70 20 50 C 18 45 28 40 32 46 Q 38 62 48 72 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="18" cy="46" r="6" fill="#adb5bd"/>
        <!-- Thumbs-up right arm -->
        <path d="M 105 80 Q 120 75 130 75 C 135 75 135 65 130 65 Q 120 65 102 70 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <!-- Glove with thumb pointing up -->
        <circle cx="132" cy="65" r="5.5" fill="#adb5bd"/>
        <path d="M 132 62 Q 134 52 137 54" stroke="#adb5bd" stroke-width="2" stroke-linecap="round" fill="none"/>

        <!-- Torso & Legs -->
        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.3)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#adb5bd" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#adb5bd" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#495057" />
        <circle cx="68" cy="95" r="2.5" fill="#e63946" />
        <circle cx="75" cy="95" r="2.5" fill="#00d4ff" />
        
        <!-- Helmet & Face -->
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="75" cy="52" r="22" fill="#1d3557" />
        <circle cx="75" cy="52" r="19" fill="#00b4d8" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#03045e" />
          <circle cx="83" cy="48" r="2.5" fill="#03045e" />
          <path d="M 68 56 Q 75 64 82 56" fill="none" stroke="#03045e" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="63" cy="54" r="2" fill="#ff85a1" opacity="0.6" />
          <circle cx="87" cy="54" r="2" fill="#ff85a1" opacity="0.6" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `,
    // Encouraging wave pose
    waving: `
      <svg viewBox="0 0 150 180" xmlns="http://www.w3.org/2000/svg" class="astronaut-svg mascot-encourage">
        <!-- Left arm waving -->
        <path d="M 45 80 Q 25 70 20 50 C 18 45 28 40 32 46 Q 38 62 48 72 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="18" cy="46" r="6" fill="#adb5bd"/>
        <!-- Right arm down, waving/beckoning -->
        <path d="M 105 80 Q 120 95 130 115 C 132 120 122 125 118 118 Q 110 100 102 85 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="130" cy="115" r="6" fill="#adb5bd"/>

        <!-- Torso & Legs -->
        <ellipse cx="75" cy="170" rx="30" ry="8" fill="rgba(0,0,0,0.3)" />
        <path d="M 55 125 Q 50 145 42 160 C 38 165 48 170 52 165 Q 60 148 65 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 42 160 L 52 165 L 48 172 L 35 168 Z" fill="#adb5bd" />
        <path d="M 95 125 Q 100 145 108 160 C 112 165 102 170 98 165 Q 90 148 85 128 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <path d="M 108 160 L 98 165 L 102 172 L 115 168 Z" fill="#adb5bd" />
        <path d="M 45 80 C 45 65 105 65 105 80 L 95 130 C 95 130 75 135 55 130 Z" fill="#ffffff" stroke="#ced4da" stroke-width="1" />
        <rect x="62" y="85" width="26" height="20" rx="3" fill="#495057" />
        <circle cx="68" cy="95" r="2.5" fill="#e63946" />
        <circle cx="75" cy="95" r="2.5" fill="#00d4ff" />
        
        <!-- Helmet & Face -->
        <circle cx="75" cy="52" r="28" fill="#ffffff" stroke="#ced4da" stroke-width="1"/>
        <circle cx="75" cy="52" r="22" fill="#1d3557" />
        <circle cx="75" cy="52" r="19" fill="#00b4d8" />
        <g class="astronaut-face">
          <circle cx="67" cy="48" r="2.5" fill="#03045e" />
          <circle cx="83" cy="48" r="2.5" fill="#03045e" />
          <!-- slightly smaller smile -->
          <path d="M 70 57 Q 75 62 80 57" fill="none" stroke="#03045e" stroke-width="2" stroke-linecap="round" />
        </g>
        <path d="M 59 40 A 19 19 0 0 1 91 40 A 19 19 0 0 0 59 40 Z" fill="#ffffff" opacity="0.4" />
      </svg>
    `
  };

  // Show final results card
  function showResults() {
    // Show section container
    resultsSection.classList.add('active-section');
    
    // Clear dynamic borders
    resultCard.classList.remove('gold-border', 'green-border', 'purple-border');
    resultTitleEl.classList.remove('yellow-text', 'green-text', 'purple-text');

    // Remove earned stars first
    const ratingStars = starRatingRowEl.querySelectorAll('.rating-star');
    ratingStars.forEach(star => star.classList.remove('earned'));

    // Result calculations based on score
    if (quizScore === 5) {
      // Perfect (5/5)
      resultCard.classList.add('gold-border');
      resultTitleEl.textContent = "🏆 Koinot Qahramoni!";
      resultTitleEl.classList.add('yellow-text');
      resultMsgEl.textContent = "Zo'r! Siz koinot haqida hamma narsani bilasiz. Haqiqiy astronavt bo'lishga tayyor bo'lgan yosh olim!";
      
      // Waving celebratory mascot
      resultAstronautSvg.innerHTML = astronautPoses.celebrating;
      
      // Starburst animation
      triggerMultipleShootingStars();
      
    } else if (quizScore >= 3) {
      // Good (3-4/5)
      resultCard.classList.add('green-border');
      resultTitleEl.textContent = "🌟 Yulduzli Tadqiqotchi!";
      resultTitleEl.classList.add('green-text');
      resultMsgEl.textContent = "Ajoyib! Siz koinot haqida juda ko'p narsani bilasiz. Yana bir oz o'rgansangiz, kosmik ekspert bo'lasiz!";
      
      // Thumbsup pose
      resultAstronautSvg.innerHTML = astronautPoses.thumbsup;
      
    } else {
      // Below average (0-2/5)
      resultCard.classList.add('purple-border');
      resultTitleEl.textContent = "🚀 Boshlang'ich Kosmicheskiy!";
      resultTitleEl.classList.add('purple-text');
      resultMsgEl.textContent = "Davom eting! Koinot sirlari juda qiziqarli. Darslarni yana bir marta o'qib, qaytadan urinib ko'ring!";
      
      // Encouraging wave pose
      resultAstronautSvg.innerHTML = astronautPoses.waving;
    }

    // Scroll down to result screen
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    // Animate score counter counting up from 0 to score
    let currentCount = 0;
    finalScoreNum.textContent = '0';
    
    const countInterval = setInterval(() => {
      if (currentCount >= quizScore) {
        clearInterval(countInterval);
        finalScoreNum.textContent = quizScore;
        // Light up stars sequentially after counter finishes
        lightUpStarsSequentially();
      } else {
        currentCount++;
        finalScoreNum.textContent = currentCount;
      }
    }, 150);
  }

  // Sequentially fill in stars with delay
  function lightUpStarsSequentially() {
    const ratingStars = starRatingRowEl.querySelectorAll('.rating-star');
    
    ratingStars.forEach((star, idx) => {
      if (idx < quizScore) {
        setTimeout(() => {
          star.classList.add('earned');
          
          // Small burst at each star location
          const rect = star.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          createStarburst(cx, cy);
        }, idx * 250);
      }
    });
  }

  // Trigger brief starburst shower for 5/5
  function triggerMultipleShootingStars() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        triggerShootingStar();
      }, i * 300);
    }
  }

  // ==========================================================================
  // 9. RETRY / RESET ACTION BUTTONS
  // ==========================================================================
  
  // Retry Game button
  retryBtn.addEventListener('click', () => {
    // Reset state
    quizScore = 0;
    currentQuestionIndex = 0;
    scoreCounter.textContent = '0';
    
    // Hide results section
    resultsSection.classList.remove('active-section');
    
    // Reload first question
    loadQuestion(0);
    
    // Scroll back to quiz
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Relearn (Back to lessons) button
  relearnBtn.addEventListener('click', () => {
    // Reset state
    quizScore = 0;
    currentQuestionIndex = 0;
    scoreCounter.textContent = '0';
    
    // Hide results
    resultsSection.classList.remove('active-section');
    
    // Reset active lesson tab to first tab
    switchTab('tab-1');
    
    // Reload first question
    loadQuestion(0);
    
    // Scroll back to lessons
    document.getElementById('lessons-section').scrollIntoView({ behavior: 'smooth' });
  });

});
