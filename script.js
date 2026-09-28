  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('navOverlay');

  function toggleNav(){
    const isOpen = overlay.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function closeNav(){
    overlay.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  }
  menuBtn.addEventListener('click', toggleNav);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Contact form -> Formspree (AJAX, no page reload)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const btn = contactForm.querySelector('.send-btn');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Transmitting...';
      formStatus.style.display = 'none';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok){
          formStatus.textContent = "Report received and filed. I'll be in touch.";
          formStatus.style.color = '#22C55E';
          contactForm.reset();
        } else {
          formStatus.textContent = 'The signal was lost. Try again, or reach me by email directly.';
          formStatus.style.color = '#E5484D';
        }
        formStatus.style.display = 'block';
      }).catch(() => {
        formStatus.textContent = 'Connection compromised. Try again, or email me directly.';
        formStatus.style.color = '#E5484D';
        formStatus.style.display = 'block';
      }).finally(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      });
    });
  }

  // animate skill bars when scrolled into view
  const bars = document.querySelectorAll('.bar i');
  if ('IntersectionObserver' in window && bars.length){
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.style.width = entry.target.dataset.width;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(bar => barObserver.observe(bar));
  } else {
    bars.forEach(bar => bar.style.width = bar.dataset.width);
  }

  const slider = document.getElementById('gallerySlider');
  const dots = document.querySelectorAll('#galleryDots span');
  if (slider && dots.length){
    slider.addEventListener('scroll', () => {
      const cardWidth = slider.querySelector('.g-card').offsetWidth + 14;
      const index = Math.round(slider.scrollLeft / cardWidth);
      dots.forEach((d,i) => d.classList.toggle('active', i === Math.min(index, dots.length-1)));
    }, { passive:true });
  }

  // quote slider dot sync
  const quoteSlider = document.getElementById('quoteSlider');
  const quoteDots = document.querySelectorAll('#quoteDots span');
  if (quoteSlider && quoteDots.length){
    quoteSlider.addEventListener('scroll', () => {
      const cardWidth = quoteSlider.querySelector('.quote-card').offsetWidth + 16;
      const index = Math.round(quoteSlider.scrollLeft / cardWidth);
      quoteDots.forEach((d,i) => d.classList.toggle('active', i === Math.min(index, quoteDots.length-1)));
    }, { passive:true });
  }

  // case slider dot sync
  const caseSlider = document.getElementById('caseSlider');
  const caseDots = document.querySelectorAll('#caseDots span');
  if (caseSlider && caseDots.length){
    caseSlider.addEventListener('scroll', () => {
      const cardWidth = caseSlider.querySelector('.case-card').offsetWidth + 16;
      const index = Math.round(caseSlider.scrollLeft / cardWidth);
      caseDots.forEach((d,i) => d.classList.toggle('active', i === Math.min(index, caseDots.length-1)));
    }, { passive:true });
  }
