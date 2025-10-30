// Basic interactivity: menu toggle, smooth scroll, reveal on scroll, form validation, fake submit
document.addEventListener('DOMContentLoaded', function(){
  // menu toggle for mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(0,0,0,0.6)';
    nav.style.padding = '1rem';
    nav.style.borderRadius = '8px';
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.card, .benefit, .two-col .text, .prof-info, .map, .form').forEach(el => {
    observer.observe(el);
  });

  // back to top
  const back = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) back.style.display = 'block';
    else back.style.display = 'none';
  });
  back.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // form handling
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const modality = form.modality.value;
    if(!name || !email || !phone || !modality){
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }
    // simulate send
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar Mensagem';
      form.reset();
      // nice confirmation modal
      const confirmed = document.createElement('div');
      confirmed.className = 'confirm-toast';
      confirmed.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
      Object.assign(confirmed.style, {
        position: 'fixed',
        right: '18px',
        bottom: '90px',
        padding: '1rem 1.2rem',
        background: 'rgba(0,0,0,0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
        color: '#fff',
        borderRadius: '10px',
        zIndex: 9999
      });
      document.body.appendChild(confirmed);
      setTimeout(()=> confirmed.remove(), 4200);
    }, 1100);
  });
});


document.addEventListener('DOMContentLoaded', () => {
        // O elemento que define a área de rolagem na página (a coluna da direita)
        const scrollArea = document.getElementById('benefits-section');
        // O elemento que contém os cards e será rolado internamente
        const listWrapper = document.getElementById('benefits-list-wrapper');
        // O elemento da barra de progresso
        const progressBar = document.getElementById('vertical-progress-bar');
        
        // A altura de rolagem máxima que o wrapper interno pode ter
        const maxScroll = listWrapper.scrollHeight - listWrapper.clientHeight;

        // Função para calcular o progresso da rolagem da seção
        function updateScroll() {
            // 1. Obter a posição da área de rolagem em relação à viewport
            const rect = scrollArea.getBoundingClientRect();
            
            // 2. Calcular o progresso de rolagem (0 a 1)
            
            // Distância total de rolagem da seção (altura da seção - altura da viewport)
            const scrollDistance = scrollArea.offsetHeight - window.innerHeight;
            
            // Posição atual da rolagem (quanto do topo da seção já saiu da viewport)
            const currentScroll = -rect.top;
            
            // Progresso de rolagem de 0 a 1
            let progress = currentScroll / scrollDistance;
            
            // Limitar o progresso entre 0 e 1 (para quando a seção entra ou sai da tela)
            progress = Math.max(0, Math.min(1, progress));

            // 3. Aplicar o progresso à rolagem interna da lista
            listWrapper.scrollTop = progress * maxScroll;

            // 4. Aplicar o progresso à altura da barra vertical
            progressBar.style.height = (progress * 100) + '%';
        }

        // Adicionar o listener para o evento de scroll da janela
        window.addEventListener('scroll', updateScroll);
        
        // Executar uma vez para garantir o estado inicial correto
        updateScroll();
    });