document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL LOGIC ---
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close-modal');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const btnBack = document.getElementById('btnBack');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const selectedPlanText = document.getElementById('selectedPlanText');
    const userNameInput = document.getElementById('userName');
    const userHwidInput = document.getElementById('userHwid');

    let currentPlan = '';
    const phone = '51904852996'; // WhatsApp de GATM TV

    // Smooth Scroll for Nav Links & Anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Abrir Modal desde Hero
    const btnOpenModal = document.getElementById('btnOpenModal');
    if(btnOpenModal) {
        btnOpenModal.addEventListener('click', () => {
            openModal();
        });
    }

    // Abrir Modal desde las Tarjetas de Precio en la página
    const btnPlanTriggers = document.querySelectorAll('.btn-plan-trigger');
    btnPlanTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planToSelect = e.target.getAttribute('data-plan');
            openModalAndSelectPlan(planToSelect);
        });
    });

    function openModal() {
        modal.classList.add('show');
        step1.classList.add('active');
        step2.classList.remove('active');
        step1.classList.remove('hidden');
        step2.classList.add('hidden');
    }

    function openModalAndSelectPlan(plan) {
        modal.classList.add('show');
        currentPlan = plan;
        selectedPlanText.innerText = currentPlan;
        
        // Skip step 1 and go directly to step 2
        step1.classList.remove('active');
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        setTimeout(() => step2.classList.add('active'), 50);
    }

    // Cerrar Modal
    const closeModal = () => {
        modal.classList.remove('show');
    };
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Seleccionar Plan dentro del Modal (Step 1)
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            currentPlan = card.getAttribute('data-plan');
            selectedPlanText.innerText = currentPlan;
            
            // Animación para pasar al Paso 2
            step1.classList.remove('active');
            setTimeout(() => {
                step1.classList.add('hidden');
                step2.classList.remove('hidden');
                setTimeout(() => step2.classList.add('active'), 50);
            }, 300);
        });
    });

    // Volver al Paso 1
    btnBack.addEventListener('click', () => {
        step2.classList.remove('active');
        setTimeout(() => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
            setTimeout(() => step1.classList.add('active'), 50);
        }, 300);
    });

    // Generar WhatsApp URL
    btnWhatsApp.addEventListener('click', () => {
        const name = userNameInput.value.trim() || '[Sin Nombre]';
        const hwid = userHwidInput.value.trim() || '[Sin HWID]';
        
        const text = Hola, GATM TV. Quiero adquirir el plan . Que sea registrado a nombre de: . Mi código HWID es: ;
        const encodedText = encodeURIComponent(text);
        const waUrl = https://wa.me/?text=;
        
        window.open(waUrl, '_blank');
    });
});
