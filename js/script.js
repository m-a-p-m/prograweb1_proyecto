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
        slides[slideIndex].classList.add('activo');
        setInterval(mostrarSiguienteSlide, intervalo);
    }

    //REDIRECCION
    const btnExplorar1 = document.getElementById('btn-explorar1');
    const btnExplorar2 = document.getElementById('btn-explorar2');
    const btnExplorar3 = document.getElementById('btn-explorar3');

    if (btnExplorar1) {
        btnExplorar1.addEventListener('click', () => {
            window.location.href = 'producto4.html'; 
        });
    }

    if (btnExplorar2) {
        btnExplorar2.addEventListener('click', () => {
            window.location.href = 'producto.html'; 
        });
    }

    if (btnExplorar3) {
        btnExplorar3.addEventListener('click', () => {
            window.location.href = 'producto2.html'; 
        });
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
    const productoID = (document.querySelector('.producto-info h1')?.textContent.trim() || 'Desconocido').substring(0, 30);
    const productoNombre = document.querySelector('.producto-info h1')?.textContent.trim() || 'Producto Desconocido';
    const precioElement = document.getElementById('precio-actual');
    
    let BASE_PRECIO_NUMERICO = 0; 

    const obtenerCarrito = () => {
        try {
            const carritoJSON = localStorage.getItem('carritoProductos');
            return carritoJSON ? JSON.parse(carritoJSON) : [];
        } catch (e) {
            console.error("Error al obtener el carrito:", e);
            return [];
        }
    };
    
    const guardarCarrito = (carrito) => {
        localStorage.setItem('carritoProductos', JSON.stringify(carrito));
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        localStorage.setItem('carritoCount', totalItems);
    };

    const obtenerPrecioBase = () => {
        if (precioElement) {
            const precioString = precioElement.textContent || 'Bs. 0'; 
            
            let cleanString = precioString.replace(/\.|\s/g, ''); 
            cleanString = cleanString.replace(',', '.'); 
            cleanString = cleanString.replace(/[^\d.]/g, '');
            
            BASE_PRECIO_NUMERICO = parseFloat(cleanString);
            if (isNaN(BASE_PRECIO_NUMERICO)) {
                BASE_PRECIO_NUMERICO = 0.00;
            }
        }
    };

    const actualizarInterfaz = () => {
        const carrito = obtenerCarrito();
        let totalItems = 0;
        let totalPrecio = 0;
        let listaHTML = '';

        if (carrito.length === 0) {
            listaHTML = `<li class="carrito-vacio-mensaje">El carrito está vacío.</li>`;
        } else {
            carrito.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                totalItems += item.cantidad;
                totalPrecio += subtotal;
                
                listaHTML += `
                    <li>
                        <span>${item.nombre} (x${item.cantidad})</span>
                        <span>Bs. ${subtotal.toFixed(2)}</span>
                    </li>
                `;
            });
        }
        
        if (contadorElement) {
            contadorElement.textContent = totalItems;
        }

        if (listaProductosCarrito) {
            listaProductosCarrito.innerHTML = listaHTML;
        }
        
        const totalElement = document.getElementById('carrito-total');
        if (totalElement) {
            totalElement.textContent = `Bs. ${totalPrecio.toFixed(2)}`;
        }
    };

    obtenerPrecioBase();
    actualizarInterfaz();
    
    if (btnAnadir) {
        const textoOriginal = btnAnadir.textContent;
        const productoPrecio = BASE_PRECIO_NUMERICO;

        btnAnadir.addEventListener('click', () => {
            
            btnAnadir.disabled = true;
            btnAnadir.textContent = "Añadido";
            btnAnadir.classList.add('btn-anadir-confirmado'); 
            
            let carrito = obtenerCarrito();
            
            const productoExistenteIndex = carrito.findIndex(item => item.id === productoID);

            if (productoExistenteIndex !== -1) {
                carrito[productoExistenteIndex].cantidad += 1;
            } else {
                carrito.push({
                    id: productoID,
                    nombre: productoNombre,
                    precio: productoPrecio,
                    cantidad: 1
                });
            }

            guardarCarrito(carrito);
            actualizarInterfaz();

            setTimeout(() => {
                btnAnadir.textContent = textoOriginal;
                btnAnadir.disabled = false;
                btnAnadir.classList.remove('btn-anadir-confirmado');
            }, 1000); 
        });
    }

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                guardarCarrito([]);
                actualizarInterfaz();
                alert('¡El carrito ha sido vaciado!');
            }
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
            const carrito = obtenerCarrito();

            if (carrito.length > 0) {
                alert('¡Compra Realizada! Gracias por comprar.');
                guardarCarrito([]);
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
        if (event.key === 'carritoProductos') {
            actualizarInterfaz();
        }
        if (event.key === 'carritoCount') { 
            actualizarInterfaz();
        }
    });
});