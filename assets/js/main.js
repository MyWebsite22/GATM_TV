document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Elementos del Modal
    const modalTitle = document.getElementById('modalTitle');
    const modalPlanName = document.getElementById('modalPlanName');
    const userNameInput = document.getElementById('userName');
    const userHwidInput = document.getElementById('userHwid');
    
    // Contenedor QR y textos
    const qrSection = document.getElementById('qrSection');
    const modalPriceText = document.getElementById('modalPriceText');
    const btnActionWhatsApp = document.getElementById('btnActionWhatsApp');
    const btnWhatsAppText = document.getElementById('btnWhatsAppText');

    let currentPlan = '';
    let currentPrice = '0';
    let isTrial = false;
    const phone = '51904852996';

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Abrir Modal desde los botones de los planes
    const btnPlanTriggers = document.querySelectorAll('.btn-plan-trigger');
    btnPlanTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPlan = e.target.getAttribute('data-plan');
            currentPrice = e.target.getAttribute('data-price');
            isTrial = currentPlan.toLowerCase().includes('prueba');
            
            // Configurar textos dinámicos
            modalPlanName.innerText = currentPlan;
            userNameInput.value = '';
            userHwidInput.value = '';
            
            if (isTrial) {
                modalTitle.innerText = 'Solicitar Prueba';
                qrSection.style.display = 'none'; // Ocultar QR
                btnWhatsAppText.innerText = 'Descargar y Enviar WhatsApp';
                btnActionWhatsApp.style.background = 'var(--intense-red)';
            } else {
                modalTitle.innerText = 'Adquirir Plan';
                qrSection.style.display = 'block'; // Mostrar QR
                modalPriceText.innerText = S/ ;
                btnWhatsAppText.innerText = 'Enviar Captura por WhatsApp';
                btnActionWhatsApp.style.background = 'var(--whatsapp-green)';
            }
            
            modal.classList.add('show');
        });
    });

    // Cerrar Modal
    const closeModal = () => modal.classList.remove('show');
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Acción principal (WhatsApp)
    btnActionWhatsApp.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        const hwid = userHwidInput.value.trim();

        if (!name || !hwid) {
            alert('Por favor, ingresa tu Nombre y HWID para continuar.');
            return;
        }

        let text = '';
        if (isTrial) {
            text = Hola GATM TV, solicito mi plan de prueba. Que sea registrado a nombre de: . Mi código HWID es: .;
            // Disparar descarga en Prueba
            const link = document.createElement('a');
            link.href = 'https://files.catbox.moe/adczex.apk';
            link.download = 'GATM_2210.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            text = Hola GATM TV, quisiera adquirir el plan . Que sea registrado a nombre de: . Mi código HWID es: . Adjunto mi captura de pago.;
        }

        // Abrir WhatsApp con el mensaje pre-generado
        setTimeout(() => {
            const encodedText = encodeURIComponent(text);
            const waUrl = https://wa.me/?text=;
            window.open(waUrl, '_blank');
            closeModal();
        }, 500);
    });

});
