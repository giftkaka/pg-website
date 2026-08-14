// ===== SECTION: MAIN FEATURED SLIDER ===== 
// Controls the main slider carousel with auto-advance functionality
(function(){
  let currentSlideIndex = 0;
  const slider = document.querySelector('.slider');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = dots.length || 0;

  function showSlide(n) {
    if (!slider) return;
    currentSlideIndex = (n + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex] && dots[currentSlideIndex].classList.add('active');
  }

  function nextSlide() { showSlide(currentSlideIndex + 1); }
  function prevSlide() { showSlide(currentSlideIndex - 1); }

  document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
  document.getElementById('prevBtn')?.addEventListener('click', prevSlide);
  setInterval(nextSlide, 5000);
  // expose handler for inline dot onclick from HTML
  window.currentSlide = showSlide;
})();

// ===== SECTION: WORKS SLIDER ===== 
// Portfolio/works carousel with navigation and auto-advance
(function(){
  let workIndex = 0;
  const track = document.querySelector('.works-slider-track');
  const dots = document.querySelectorAll('.works-dot');
  const total = dots.length || 0;

  function showWorkSlide(n){
    if(!track) return;
    workIndex = (n + total) % total;
    track.style.transform = `translateX(-${workIndex * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[workIndex] && dots[workIndex].classList.add('active');
  }

  function nextWork(){ showWorkSlide(workIndex + 1); }
  function prevWork(){ showWorkSlide(workIndex - 1); }

  document.getElementById('worksNext')?.addEventListener('click', nextWork);
  document.getElementById('worksPrev')?.addEventListener('click', prevWork);

  dots.forEach(d => d.addEventListener('click', (e)=>{
    const i = parseInt(d.getAttribute('data-index') || '0', 10);
    showWorkSlide(i);
  }));

  // Auto-advance every 6s
  setInterval(nextWork, 6000);
})();

// ===== SECTION: WORKS LIGHTBOX / MODAL ===== 
// Handles opening and closing modal for detailed work/project views
(function(){
  const viewButtons = document.querySelectorAll('.view-btn');
  const modalHtml = `
    <div class="work-modal" id="workModal" role="dialog" aria-hidden="true">
      <div class="work-modal-inner">
        <button class="work-modal-close" aria-label="Close">✕</button>
        <div class="work-modal-media"></div>
        <div class="work-modal-content">
          <h3 class="work-modal-title"></h3>
          <p class="work-modal-desc muted"></p>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('workModal');
  const modalMedia = modal.querySelector('.work-modal-media');
  const modalTitle = modal.querySelector('.work-modal-title');
  const modalDesc = modal.querySelector('.work-modal-desc');
  const close = modal.querySelector('.work-modal-close');

  function openModal(card){
    const img = card.getAttribute('data-image');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    modalMedia.innerHTML = `<img src="${img}" alt="${title}" />`;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
  }

  function closeModal(){ modal.setAttribute('aria-hidden','true'); modal.classList.remove('open'); }

  viewButtons.forEach(btn => btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.slide-card');
    if(card) openModal(card);
  }));

  close.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
})();

// ===== SECTION: CASE STUDIES SLIDER ===== 
// Handles case studies carousel on services page with auto-rotation
(function(){
  const track = document.querySelector('.case-track');
  const dots = document.querySelectorAll('.case-dot');
  let i = 0; const total = dots.length || 1;
  function show(n){ i = (n+total)%total; track.style.transform = `translateX(-${i*100}%)`; dots.forEach(d=>d.classList.remove('active')); dots[i] && dots[i].classList.add('active'); }
  document.getElementById('caseNext')?.addEventListener('click', ()=>show(i+1));
  document.getElementById('casePrev')?.addEventListener('click', ()=>show(i-1));
  dots.forEach(d=>d.addEventListener('click', ()=>show(parseInt(d.getAttribute('data-i')))));
  setInterval(()=>show(i+1),7000);
})();