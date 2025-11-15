// Cargar detalles del vehículo desde URL
function cargarDetalleVehiculo() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehiculoId = urlParams.get('id');
    
    if (!vehiculoId) {
        window.location.href = 'index.html';
        return;
    }
    
    const vehiculo = vehiculos.find(v => v.id == vehiculoId);
    if (!vehiculo) {
        window.location.href = 'index.html';
        return;
    }
    
    // Actualizar contenido de la página
    document.getElementById('breadcrumb-nombre').textContent = vehiculo.nombre;
    document.getElementById('imagen-principal').src = vehiculo.imagen;
    document.getElementById('imagen-principal').alt = vehiculo.nombre;
    document.getElementById('vehiculo-tipo').textContent = vehiculo.tipo;
    document.getElementById('vehiculo-nombre').textContent = vehiculo.nombre;
    document.getElementById('vehiculo-precio').textContent = `S/${vehiculo.precio.toLocaleString()}.00`;
    document.getElementById('vehiculo-descripcion').textContent = vehiculo.descripcion;
    
    // Especificaciones
    document.getElementById('spec-motor').textContent = vehiculo.especificaciones.motor;
    document.getElementById('spec-combustible').textContent = vehiculo.especificaciones.combustible;
    document.getElementById('spec-transmision').textContent = vehiculo.especificaciones.transmision;
    document.getElementById('spec-año').textContent = vehiculo.especificaciones.año;
    
    // Actualizar título de la página
    document.title = `${vehiculo.nombre} - Asfalés`;
    
    // Event listeners para botones
    document.getElementById('btn-cotizar-detalle').addEventListener('click', () => {
        agregarCotizacion(vehiculo.id);
    });
    
    document.getElementById('btn-contactar').addEventListener('click', () => {
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        // Pre-llenar el formulario con el vehículo
        document.getElementById('mensaje').value = `Estoy interesado en el ${vehiculo.nombre}. ¿Podrían contactarme para más información?`;
    });
    
    document.getElementById('btn-favorito').addEventListener('click', toggleFavorito);
}

// Toggle favorito
function toggleFavorito() {
    const btn = document.getElementById('btn-favorito');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        btn.classList.add('favorito-activo');
        mostrarNotificacion('Agregado a favoritos');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        btn.classList.remove('favorito-activo');
        mostrarNotificacion('Removido de favoritos');
    }
}

// Formulario de contacto
function initFormularioContacto() {
    const formulario = document.getElementById('formulario-contacto');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(formulario);
        const datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            interes: formData.get('interes'),
            mensaje: formData.get('mensaje'),
            vehiculo: document.getElementById('vehiculo-nombre').textContent,
            fecha: new Date().toISOString()
        };
        
        // Simular envío
        enviarFormulario(datos);
    });
}

function enviarFormulario(datos) {
    const btnEnviar = document.querySelector('.btn-enviar');
    const textoOriginal = btnEnviar.innerHTML;
    
    // Estado de carga
    btnEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    btnEnviar.disabled = true;
    
    // Simular envío (en producción sería una llamada a API)
    setTimeout(() => {
        // Guardar en localStorage (simulación)
        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos.push(datos);
        localStorage.setItem('contactos', JSON.stringify(contactos));
        
        // Mostrar éxito
        btnEnviar.innerHTML = '<i class="fa-solid fa-check"></i> ¡Enviado!';
        btnEnviar.style.backgroundColor = '#28a745';
        
        mostrarNotificacion('Mensaje enviado correctamente. Te contactaremos pronto.');
        
        // Limpiar formulario
        document.getElementById('formulario-contacto').reset();
        
        // Restaurar botón
        setTimeout(() => {
            btnEnviar.innerHTML = textoOriginal;
            btnEnviar.disabled = false;
            btnEnviar.style.backgroundColor = '';
        }, 3000);
        
    }, 2000);
}

// Validación en tiempo real
function initValidacionFormulario() {
    const inputs = document.querySelectorAll('#formulario-contacto input, #formulario-contacto textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validarCampo);
        input.addEventListener('input', limpiarError);
    });
}

function validarCampo(e) {
    const campo = e.target;
    const valor = campo.value.trim();
    
    // Limpiar errores previos
    limpiarError(e);
    
    if (campo.hasAttribute('required') && !valor) {
        mostrarError(campo, 'Este campo es obligatorio');
        return false;
    }
    
    if (campo.type === 'email' && valor) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            mostrarError(campo, 'Ingresa un email válido');
            return false;
        }
    }
    
    if (campo.type === 'tel' && valor) {
        const telRegex = /^[+]?[\d\s\-()]{9,}$/;
        if (!telRegex.test(valor)) {
            mostrarError(campo, 'Ingresa un teléfono válido');
            return false;
        }
    }
    
    return true;
}

function mostrarError(campo, mensaje) {
    campo.classList.add('error');
    
    let errorDiv = campo.parentNode.querySelector('.error-mensaje');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        campo.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = mensaje;
}

function limpiarError(e) {
    const campo = e.target;
    campo.classList.remove('error');
    
    const errorDiv = campo.parentNode.querySelector('.error-mensaje');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarDetalleVehiculo();
    initFormularioContacto();
    initValidacionFormulario();
    actualizarContadorCotizaciones();
});