// Datos de vehículos
const vehiculos = [
    {
        id: 1,
        tipo: 'Couple',
        nombre: 'Aurora Starlight Elite',
        descripcion: 'Elegante coupé con diseño deportivo y tecnología avanzada.',
        precio: 250000,
        imagen: 'imagen/catalogo/catalogo-1.png',
        estado: 'nuevo',
        especificaciones: {
            motor: '2.0L Turbo',
            combustible: 'Gasolina',
            transmision: 'Automática',
            año: 2024
        }
    },
    {
        id: 2,
        tipo: 'Crossover',
        nombre: 'Eclipse Moonlight Sport',
        descripcion: 'Crossover versátil perfecto para aventuras urbanas y familiares.',
        precio: 310000,
        imagen: 'imagen/catalogo/catalogo-2.png',
        estado: 'vendido',
        especificaciones: {
            motor: '2.5L Híbrido',
            combustible: 'Híbrido',
            transmision: 'CVT',
            año: 2024
        }
    },
    {
        id: 3,
        tipo: 'Sedan',
        nombre: 'Zephyr Windchaser XE',
        descripcion: 'Sedán ejecutivo con máximo confort y tecnología premium.',
        precio: 560000,
        imagen: 'imagen/catalogo/catalogo-3.png',
        estado: 'nuevo',
        especificaciones: {
            motor: '3.0L V6',
            combustible: 'Gasolina',
            transmision: 'Automática',
            año: 2024
        }
    },
    {
        id: 4,
        tipo: 'SUV',
        nombre: 'Radiant Sunburst Deluxe',
        descripcion: 'SUV espacioso ideal para familias grandes y viajes largos.',
        precio: 670000,
        imagen: 'imagen/catalogo/catalogo-4.jpg',
        estado: 'usado',
        especificaciones: {
            motor: '3.5L V6',
            combustible: 'Gasolina',
            transmision: 'Automática 8V',
            año: 2022
        }
    },
    {
        id: 5,
        tipo: 'Hatchback',
        nombre: 'Cosmic Thunder Pro',
        descripcion: 'Compacto urbano con excelente rendimiento de combustible.',
        precio: 180000,
        imagen: 'imagen/catalogo/catalogo-5.jpg',
        estado: 'nuevo',
        especificaciones: {
            motor: '1.6L',
            combustible: 'Gasolina',
            transmision: 'Manual',
            año: 2024
        }
    },
    {
        id: 6,
        tipo: 'Deportivo',
        nombre: 'Stellar Velocity Max',
        descripcion: 'Deportivo de alta gama con motor turbo y diseño aerodinámico.',
        precio: 890000,
        imagen: 'imagen/catalogo/catalogo-6.png',
        estado: 'usado',
        especificaciones: {
            motor: '4.0L V8 Turbo',
            combustible: 'Gasolina Premium',
            transmision: 'Automática Deportiva',
            año: 2023
        }
    }
];

// Filtros del catálogo
function initFiltros() {
    const botonesFiltro = document.querySelectorAll('.btn-catalogo');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase activa
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            
            const filtro = boton.textContent.toLowerCase();
            filtrarVehiculos(filtro);
        });
    });
}

function filtrarVehiculos(filtro) {
    let vehiculosFiltrados = vehiculos;
    
    if (filtro === 'nuevo') {
        vehiculosFiltrados = vehiculos.filter(v => v.estado === 'nuevo');
    } else if (filtro === 'usado') {
        vehiculosFiltrados = vehiculos.filter(v => v.estado === 'usado');
    } else if (filtro === 'más vendido') {
        vehiculosFiltrados = vehiculos.filter(v => v.estado === 'vendido');
    }
    
    renderizarVehiculos(vehiculosFiltrados);
}

function renderizarVehiculos(vehiculosArray) {
    const contenedor = document.querySelector('.fila.justify-content-between[role="list"]');
    
    contenedor.innerHTML = vehiculosArray.map(vehiculo => `
        <article class="panel mb-20 mx-12" role="listitem" data-id="${vehiculo.id}">
            <div class="imagen-panel">
                <img src="${vehiculo.imagen}" alt="${vehiculo.nombre} - Vehículo tipo ${vehiculo.tipo}">
            </div>
            <div class="datos p-15">
                <ul>
                    <li><span>${vehiculo.tipo}</span></li>
                    <li><h4>${vehiculo.nombre}</h4></li>
                    <li><p>${vehiculo.descripcion}</p></li>
                    <li><p>S/${vehiculo.precio.toLocaleString()}.00</p></li>
                </ul>
                <div class="botones-vehiculo">
                    <button class="btn-ver-mas" onclick="abrirModal(${vehiculo.id})">Vista Rápida</button>
                    <a href="detalle.html?id=${vehiculo.id}" class="btn-detalle">Ver Detalles</a>
                </div>
            </div>
        </article>
    `).join('');
}

// Modal de detalles
function abrirModal(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (!vehiculo) return;
    
    const modal = document.getElementById('modalVehiculo');
    const contenido = modal.querySelector('.modal-contenido');
    
    contenido.innerHTML = `
        <span class="cerrar" onclick="cerrarModal()">&times;</span>
        <div class="modal-body">
            <img src="${vehiculo.imagen}" alt="${vehiculo.nombre}">
            <div class="modal-info">
                <h3>${vehiculo.nombre}</h3>
                <p class="tipo">${vehiculo.tipo}</p>
                <p class="descripcion">${vehiculo.descripcion}</p>
                <div class="precio">S/${vehiculo.precio.toLocaleString()}.00</div>
                <div class="especificaciones">
                    <h4>Especificaciones:</h4>
                    <ul>
                        <li><strong>Motor:</strong> ${vehiculo.especificaciones.motor}</li>
                        <li><strong>Combustible:</strong> ${vehiculo.especificaciones.combustible}</li>
                        <li><strong>Transmisión:</strong> ${vehiculo.especificaciones.transmision}</li>
                        <li><strong>Año:</strong> ${vehiculo.especificaciones.año}</li>
                    </ul>
                </div>
                <div class="modal-botones">
                    <button class="btn-cotizar" onclick="agregarCotizacion(${vehiculo.id})">Cotizar</button>
                    <a href="detalle.html?id=${vehiculo.id}" class="btn-contacto">Ver Detalles</a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalVehiculo').style.display = 'none';
}

// Carrito de cotización
let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];

function agregarCotizacion(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (!vehiculo) return;
    
    if (!cotizaciones.find(c => c.id === id)) {
        cotizaciones.push(vehiculo);
        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
        actualizarContadorCotizaciones();
        mostrarNotificacion('Vehículo agregado a cotización');
    } else {
        mostrarNotificacion('Ya está en tu lista de cotización');
    }
}

function actualizarContadorCotizaciones() {
    const contador = document.querySelector('.contador-cotizaciones');
    if (contador) {
        contador.textContent = cotizaciones.length;
        contador.style.display = cotizaciones.length > 0 ? 'block' : 'none';
    }
}

function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.className = 'notificacion';
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.classList.add('mostrar');
    }, 100);
    
    setTimeout(() => {
        notif.classList.remove('mostrar');
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// Búsqueda y Comboboxes
function initBusqueda() {
    const formBusqueda = document.getElementById('form-busqueda');
    formBusqueda.addEventListener('submit', realizarBusqueda);
    
    // Llenar comboboxes
    llenarComboboxes();
    
    // Event listeners para filtros dependientes
    document.getElementById('marca').addEventListener('change', actualizarModelos);
}

function llenarComboboxes() {
    const marcas = [...new Set(vehiculos.map(v => v.tipo))];
    const selectMarca = document.getElementById('marca');
    
    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca.toLowerCase();
        option.textContent = marca;
        selectMarca.appendChild(option);
    });
    
    // Llenar todos los modelos inicialmente
    actualizarModelos();
}

function actualizarModelos() {
    const marcaSeleccionada = document.getElementById('marca').value;
    const selectModelo = document.getElementById('modelo');
    
    // Limpiar opciones
    selectModelo.innerHTML = '<option value="">Todos los modelos</option>';
    
    let vehiculosFiltrados = vehiculos;
    if (marcaSeleccionada) {
        vehiculosFiltrados = vehiculos.filter(v => v.tipo.toLowerCase() === marcaSeleccionada);
    }
    
    vehiculosFiltrados.forEach(vehiculo => {
        const option = document.createElement('option');
        option.value = vehiculo.id;
        option.textContent = vehiculo.nombre;
        selectModelo.appendChild(option);
    });
}

function realizarBusqueda(e) {
    e.preventDefault();
    
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const precio = document.getElementById('precio').value;
    
    let resultados = vehiculos;
    
    // Filtrar por marca (tipo)
    if (marca) {
        resultados = resultados.filter(v => v.tipo.toLowerCase() === marca);
    }
    
    // Filtrar por modelo específico
    if (modelo) {
        resultados = resultados.filter(v => v.id == modelo);
    }
    
    // Filtrar por precio
    if (precio) {
        const [min, max] = precio.split('-').map(Number);
        if (max) {
            resultados = resultados.filter(v => v.precio >= min && v.precio <= max);
        } else {
            resultados = resultados.filter(v => v.precio >= min);
        }
    }
    
    renderizarVehiculos(resultados);
    document.querySelector('#modelos').scrollIntoView({ behavior: 'smooth' });
    
    // Mostrar mensaje si no hay resultados
    if (resultados.length === 0) {
        mostrarNotificacion('No se encontraron vehículos con esos criterios');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initFiltros();
    initBusqueda();
    actualizarContadorCotizaciones();
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalVehiculo');
        if (e.target === modal) {
            cerrarModal();
        }
    });
});