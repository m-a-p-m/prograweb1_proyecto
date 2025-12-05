// BOTON DE AÑADIDO.
document.addEventListener('DOMContentLoaded', () => {
    let count = parseInt(localStorage.getItem('carritoCount')) || 0;
    const contadorElement = document.getElementById('contador-carrito');
    
    if (contadorElement) {
        contadorElement.textContent = count;
    }

    const btnAnadir = document.getElementById('btn-anadir-carrito');

    if (btnAnadir) {
        btnAnadir.addEventListener('click', () => {
            if (btnAnadir.classList.contains('btn-anadir-confirmado')) {
                return; 
            }

            const textoOriginal = btnAnadir.textContent;
            btnAnadir.textContent = '¡Añadido!';
            btnAnadir.classList.add('btn-anadir-confirmado');
            
            count++;
            localStorage.setItem('carritoCount', count);
            if (contadorElement) {
                contadorElement.textContent = count;
            }

            setTimeout(() => {
                btnAnadir.textContent = textoOriginal;
                btnAnadir.classList.remove('btn-anadir-confirmado');
            }, 2000);
        });
    }
});

const btnVaciar = document.getElementById('btn-vaciar-carrito');

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            count = 0;
            
            localStorage.setItem('carritoCount', 0);
            
            if (contadorElement) {
                contadorElement.textContent = 0;
            }
            alert('¡El carrito ha sido vaciado!');
        });
    }

// CONVERSION DE PLATA
const tasasDeConversion = {
        'USD': 1.0,  
        'EUR': 0.93,
        'BOB': 6.90,
    };

    const selectorMoneda = document.getElementById('selector-moneda');
    const precioElemento = document.getElementById('precio-actual');

    if (selectorMoneda && precioElemento) {
        const precioBaseUSD = parseFloat(precioElemento.textContent.replace('$', '').trim());

        const actualizarPrecio = () => {
            const monedaSeleccionada = selectorMoneda.value;
            const tasa = tasasDeConversion[monedaSeleccionada];
            
            const nuevoPrecio = precioBaseUSD * tasa;
            
            let simbolo;
            if (monedaSeleccionada === 'USD') {
                simbolo = '$';
            } else if (monedaSeleccionada === 'EUR') {
                simbolo = '€';
            } else if (monedaSeleccionada === 'BOB') {
                simbolo = 'Bs. ';
            }

            precioElemento.textContent = `${simbolo}${nuevoPrecio.toFixed(2)}`;
        };

        selectorMoneda.addEventListener('change', actualizarPrecio);

        actualizarPrecio(); 
    };

    /* BANNERS SLIDE */

    const slides = document.querySelectorAll('.banner-hero .slide');
    let slideIndex = 0;
    const intervalo = 5000;

    const mostrarSiguienteSlide = () => {
        slides[slideIndex].classList.remove('activo');

        slideIndex = (slideIndex + 1) % slides.length;

        slides[slideIndex].classList.add('activo');
};

    if (slides.length > 1) {
        setInterval(mostrarSiguienteSlide, intervalo);
}