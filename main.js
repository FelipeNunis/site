    document.addEventListener('DOMContentLoaded', () => {
      feather.replace();

      // Theme toggle
      const themeBtn = document.getElementById('theme-toggle');
      themeBtn.addEventListener('click', () => document.body.classList.toggle('dark'));

      // Language toggle
      const langBtn = document.getElementById('lang-toggle');
      langBtn.addEventListener('click', function() {
        let newLang;
        if (document.body.classList.contains('lang-pt')) {
          document.body.classList.replace('lang-pt','lang-en');
          this.textContent='PT';
          newLang = 'en';
        } else {
          document.body.classList.replace('lang-en','lang-pt');
          this.textContent='EN';
          newLang = 'pt';
        }
        setupReadMore(newLang);
      });

      // Lógica para o botão "Leia Mais"
      function setupReadMore(currentLang) {
          document.querySelectorAll('.read-more-btn').forEach(button => {
              const lang = button.dataset.lang;
              const moreContent = button.nextElementSibling;
              if (lang === currentLang) {
                  button.style.display = 'block';
                  const isExpanded = moreContent.style.maxHeight && moreContent.style.maxHeight !== '0px';
                  button.textContent = isExpanded ? (lang === 'pt' ? 'Mostrar Menos' : 'Show Less') : (lang === 'pt' ? 'Leia Mais' : 'Read More');
              } else {
                  button.style.display = 'none';
              }
              const newClickHandler = function() {
                  const isExpanded = moreContent.style.maxHeight && moreContent.style.maxHeight !== '0px';
                  if (isExpanded) {
                      moreContent.style.maxHeight = null;
                      button.textContent = (lang === 'pt' ? 'Leia Mais' : 'Read More');
                  } else {
                      moreContent.style.maxHeight = moreContent.scrollHeight + 'px';
                      button.textContent = (lang === 'pt' ? 'Mostrar Menos' : 'Show Less');
                  }
              };
              if (button.clickHandler) { button.removeEventListener('click', button.clickHandler); }
              button.addEventListener('click', newClickHandler);
              button.clickHandler = newClickHandler;
          });
      }
      const initialLang = document.body.classList.contains('lang-en') ? 'en' : 'pt';
      setupReadMore(initialLang);

      // Lógica do Modal para a seção "Experiência Técnica"
      const modal = document.getElementById('experience-modal');
      if (modal) {
          const modalBody = document.getElementById('modal-body');
          const closeModalBtn = modal.querySelector('.modal-close-btn');

          document.querySelectorAll('#experience .card').forEach(card => {
              card.addEventListener('click', () => {
                  const targetId = card.dataset.target;
                  const contentSource = document.getElementById(targetId);
                  
                  if (contentSource) {
                      modalBody.innerHTML = contentSource.innerHTML;
                      modal.classList.add('active');
                  }
              });
          });

          function closeModal() {
              modal.classList.remove('active');
          }

          closeModalBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  closeModal();
              }
          });
      }

      // Lógica das seções "Skills" e "Experiência Profissional" (Acordeão)
      document.querySelectorAll('.skill-item').forEach(item => {
        const content = item.querySelector('.skill-content');
        if (!content) return;
        content.style.maxHeight = '0';

        item.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const isActive = content.classList.contains('active');
            
            // Fecha todos os outros da mesma lista
            item.closest('.skills-list').querySelectorAll('.skill-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.classList.remove('active');
                    activeContent.style.maxHeight = '0';
                }
            });

            // Alterna o estado do item clicado
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                content.style.maxHeight = '0';
            }
        });
      });
    });
