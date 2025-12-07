document.addEventListener('DOMContentLoaded', () => {

    // HAMBURGUESA MENU

    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.getElementById('nav-principal');

    if (btnMenu && navPrincipal) {
        btnMenu.addEventListener('click', () => {
            navPrincipal.classList.toggle('activo-movil');
        });
    }

    // BANNER
    const slides = document.querySelectorAll('.banner-hero .slide');
    let slideIndex = 0;
    const intervalo = 5000;

    const mostrarSiguienteSlide = () => {
        if (slides.length === 0) return;

        if (slides[slideIndex]) {
            slides[slideIndex].classList.remove('activo');
        }

        slideIndex = (slideIndex + 1) % slides.length;

        slides[slideIndex].classList.add('activo');
    };

    if (slides.length > 0) {
        setInterval(mostrarSiguienteSlide, intervalo);
    }

    // CARRITO
    const contadorElement = document.getElementById('contador-carrito');
    const btnAnadir = document.getElementById('btn-anadir-carrito');
    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    const btnMostrarCarrito = document.getElementById('btn-mostrar-carrito');
    const modalCarrito = document.getElementById('modal-carrito');
    const btnCerrarModal = document.querySelector('.modal-cerrar');
    const btnFinalizarCompra = document.querySelector('.btn-comprar');
    const listaProductosCarrito = document.getElementById('lista-productos-carrito');

    const precioElement = document.getElementById('precio-actual');
    
    let BASE_PRECIO_NUMERICO = 0; 

    const obtenerPrecioBase = () => {
        if (precioElement) {
            const precioString = precioElement.textContent || 'Bs. 0'; 
            
            let cleanString = precioString.replace(/\.|\s/g, ''); 
            cleanString = cleanString.replace(',', '.'); 
            cleanString = cleanString.replace(/[^\d.]/g, '');
            
            BASE_PRECIO_NUMERICO = parseFloat(cleanString);
        }
    };

    const actualizarInterfaz = () => {
        const count = parseInt(localStorage.getItem('carritoCount')) || 0;
        
        const unitPrice = BASE_PRECIO_NUMERICO || 344.93; 
        
        const total = (count * unitPrice).toFixed(2);
        
        if (contadorElement) {
            contadorElement.textContent = count;
        }

        if (listaProductosCarrito) {
            if (count > 0) {
                listaProductosCarrito.innerHTML = `
                    <li><span>Cantidad de Productos:</span><span>${count}</span></li>
                `;
            } else {
                listaProductosCarrito.innerHTML = `<li class="carrito-vacio-mensaje">El carrito está vacío.</li>`;
            }
        }
        
        const totalElement = document.getElementById('carrito-total');
        if (totalElement) {
            totalElement.textContent = `Bs. ${total}`;
        }
    };

    obtenerPrecioBase();
    actualizarInterfaz();
    
    if (btnAnadir) {
        const textoOriginal = btnAnadir.textContent;
        
        btnAnadir.addEventListener('click', () => {
            
            btnAnadir.disabled = true;
            btnAnadir.textContent = "Añadido";
            
            let currentCount = parseInt(localStorage.getItem('carritoCount')) || 0;
            currentCount++;
            localStorage.setItem('carritoCount', currentCount);
            actualizarInterfaz();

            setTimeout(() => {
                btnAnadir.textContent = textoOriginal;
                btnAnadir.disabled = false;
            }, 1000); 
        });
    }

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            localStorage.setItem('carritoCount', 0);
            actualizarInterfaz();
            alert('¡El carrito ha sido vaciado!');
        });
    }

    if (btnMostrarCarrito && modalCarrito) {
        btnMostrarCarrito.addEventListener('click', () => {
            modalCarrito.classList.add('activo');
            actualizarInterfaz();
        });
    }
    
    if (btnFinalizarCompra && modalCarrito) {
        btnFinalizarCompra.addEventListener('click', () => {
            const count = parseInt(localStorage.getItem('carritoCount')) || 0;

            if (count > 0) {
                alert('¡Compra Realizada! Gracias por comprar.');
                localStorage.setItem('carritoCount', 0);
                actualizarInterfaz();
                modalCarrito.classList.remove('activo');
            } else {
                alert('¡El carrito está vacío!');
            }
        });
    }
    
    if (btnCerrarModal && modalCarrito) {
        btnCerrarModal.addEventListener('click', () => {
            modalCarrito.classList.remove('activo');
        });
    }

    if (modalCarrito) {
        window.addEventListener('click', (event) => {
            if (event.target === modalCarrito) {
                modalCarrito.classList.remove('activo');
            }
        });
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'carritoCount') {
            actualizarInterfaz();
        }
    });
});