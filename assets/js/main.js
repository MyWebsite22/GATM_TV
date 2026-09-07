document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL & FLOW LOGIC ---
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Pasos
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');             // Pago QR
    const step3Trial = document.getElementById('step3-trial');  // Prueba

    // Textos Dinámicos y Campos
    const selectedPlanText = document.getElementById('selectedPlanText');
    const dynamicPrice = document.getElementById('dynamicPrice');
    const userNameInput = document.getElementById('userName');
    const userHwidInput = document.getElementById('userHwid');

    // Botones
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnBackToPlans = document.getElementById('btnBackToPlans');
    const btnContinueToPay = document.getElementById('btnContinueToPay');
    const btnBackToData = document.getElementById('btnBackToData');
    const btnBackToDataTrial = document.getElementById('btnBackToDataTrial');
    
    const btnWhatsAppPaid = document.getElementById('btnWhatsAppPaid');
    const btnWhatsAppTrial = document.getElementById('btnWhatsAppTrial');

    let currentPlan = '';
    let isTrial = false;
    let priceNumber = '';
    const phone = '51904852996'; // WhatsApp de GATM TV

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Abrir Modal desde Hero
    if(btnOpenModal) {
        btnOpenModal.addEventListener('click', () => {
            resetModal();
            modal.classList.add('show');
            step1.classList.remove('hidden');
            setTimeout(() => step1.classList.add('active'), 50);
        });
    }

    // Abrir Modal desde las Tarjetas de Precio en la página principal
    const btnPlanTriggers = document.querySelectorAll('.btn-plan-trigger');
    btnPlanTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planToSelect = e.target.getAttribute('data-plan');
            openModalAndSelectPlan(planToSelect);
        });
    });

    // Cerrar Modal
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(resetModal, 300); // Reset tras la animación
    };
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function resetModal() {
        [step1, step2, step3, step3Trial].forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden');
        });
        userNameInput.value = '';
        userHwidInput.value = '';
    }

    // Lógica para detectar plan y precio
    function processPlanSelection(plan) {
        currentPlan = plan;
        selectedPlanText.innerText = currentPlan;
        
        isTrial = currentPlan.toLowerCase().includes('prueba');
        
        if (!isTrial) {
            // Extraer el precio numérico para mostrarlo en el Yape
            const match = currentPlan.match(/S\/\s*(\d+)/);
            priceNumber = match ? S/ .00 : 'S/ 0.00';
            dynamicPrice.innerText = priceNumber;
        }
    }

    // Iniciar Modal pre-seleccionando un plan (Desde Home)
    function openModalAndSelectPlan(plan) {
        resetModal();
        modal.classList.add('show');
        processPlanSelection(plan);
        
        step2.classList.remove('hidden');
        setTimeout(() => step2.classList.add('active'), 50);
    }

    // Seleccionar Plan dentro del Modal (Paso 1)
    const planCards = document.querySelectorAll('#step1 .plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            const planToSelect = card.getAttribute('data-plan');
            processPlanSelection(planToSelect);
            
            step1.classList.remove('active');
            setTimeout(() => {
                step1.classList.add('hidden');
                step2.classList.remove('hidden');
                setTimeout(() => step2.classList.add('active'), 50);
            }, 300);
        });
    });

    // (Volver) De Paso 2 a Paso 1
    btnBackToPlans.addEventListener('click', () => {
        step2.classList.remove('active');
        setTimeout(() => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
            setTimeout(() => step1.classList.add('active'), 50);
        }, 300);
    });

    // (Continuar) De Paso 2 a Paso 3 (Pago QR o Prueba)
    btnContinueToPay.addEventListener('click', () => {
        if (!userNameInput.value.trim() || !userHwidInput.value.trim()) {
            alert("Por favor ingresa tu Nombre y HWID para continuar.");
            return;
        }
        
        step2.classList.remove('active');
        setTimeout(() => {
            step2.classList.add('hidden');
            
            const nextStep = isTrial ? step3Trial : step3;
            nextStep.classList.remove('hidden');
            setTimeout(() => nextStep.classList.add('active'), 50);
        }, 300);
    });

    // (Volver) De Paso 3 a Paso 2
    btnBackToData.addEventListener('click', goBackToStep2);
    btnBackToDataTrial.addEventListener('click', goBackToStep2);

    function goBackToStep2() {
        step3.classList.remove('active');
        step3Trial.classList.remove('active');
        setTimeout(() => {
            step3.classList.add('hidden');
            step3Trial.classList.add('hidden');
            step2.classList.remove('hidden');
            setTimeout(() => step2.classList.add('active'), 50);
        }, 300);
    }

    // --- ACCIONES FINALES (WHATSAPP Y DESCARGA) ---
    
    // WhatsApp para Pago
    btnWhatsAppPaid.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        const hwid = userHwidInput.value.trim();
        
        const text = Hola, GATM TV. Quiero adquirir el plan . Que sea registrado a nombre de: . Mi código HWID es: . Aquí adjunto mi captura de pago.;
        const encodedText = encodeURIComponent(text);
        const waUrl = https://wa.me/?text=;
        
        window.open(waUrl, '_blank');
        closeModal();
    });

    // WhatsApp + Descarga para Prueba
    btnWhatsAppTrial.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        const hwid = userHwidInput.value.trim();
        
        // 1. Iniciar Descarga del APK (Direct CDN)
        const link = document.createElement('a');
        link.href = 'https://files.catbox.moe/adczex.apk';
        link.download = 'GATM_2210.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 2. Abrir WhatsApp (Con un pequeñísimo delay para asegurar que el navegador registre el click)
        setTimeout(() => {
            const text = Hola, GATM TV. Solicito mi plan de prueba de 3 días. Que sea registrado a nombre de: . Mi código HWID es: .;
            const encodedText = encodeURIComponent(text);
            const waUrl = https://wa.me/?text=;
            window.open(waUrl, '_blank');
            closeModal();
        }, 500);
    });

});
