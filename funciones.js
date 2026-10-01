let estacionamientos = [
    {
        codigo: "EST001",
        nombre: "Estacionamiento Centro",
        descripcion: "Estacionamiento ubicado en el centro de la ciudad.",
        precio: 1500,
        stock: 10,
        stockCritico: 3,
        categoria: "Centro",
        imagen: "assets/estacionamiento-centro.jpg"
    },
    {
        codigo: "EST002",
        nombre: "Estacionamiento Mall",
        descripcion: "Estacionamiento ubicado cerca del centro comercial.",
        precio: 2000,
        stock: 5,
        stockCritico: 2,
        categoria: "Mall",
        imagen: "assets/estacionamiento-mall.jpg"
    },
    {
        codigo: "EST003",
        nombre: "Estacionamiento Aeropuerto",
        descripcion: "Estacionamiento ubicado cerca del aeropuerto.",
        precio: 3000,
        stock: 8,
        stockCritico: 3,
        categoria: "Aeropuerto",
        imagen: "assets/estacionamiento-aeropuerto.jpg"
    }
];

console.log(estacionamientos);

let listaEstacionamientos = document.getElementById("lista-estacionamientos");

if (listaEstacionamientos) {
    estacionamientos.forEach(function(estacionamiento) {
        listaEstacionamientos.innerHTML += `
            <div>
                <img src="${estacionamiento.imagen}" alt="${estacionamiento.nombre}">
                <h3>
                    <a href="detalle-producto.html?codigo=${estacionamiento.codigo}">
                        ${estacionamiento.nombre}
                    </a>
                </h3>
                <p>${estacionamiento.descripcion}</p>
                <p>Precio: $${estacionamiento.precio}</p>
                <p>Espacios disponibles: ${estacionamiento.stock}</p>
                <button onclick="agregarAlCarrito('${estacionamiento.codigo}')">Añadir</button>
            </div>
        `;
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) ||[];

function agregarAlCarrito(codigo) {
    let estacionamiento = estacionamientos.find(function(estacionamiento) {
        return estacionamiento.codigo === codigo;
    });

    if (estacionamiento) {
        carrito.push(estacionamiento);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(carrito);
    }
}

let listaCarrito = document.getElementById("lista-carrito");

if (listaCarrito) {
    carrito.forEach(function(estacionamiento) {
        listaCarrito.innerHTML += `
            <div>
                <img src="${estacionamiento.imagen}" alt="${estacionamiento.nombre}">
                <h3>${estacionamiento.nombre}</h3>
                <p>Precio: $${estacionamiento.precio}</p>.
                <button onclick="eliminarDelCarrito('${estacionamiento.codigo}')">Eliminar</button>
            </div>
        `;
    });
}

let totalCarrito = document.getElementById("total-carrito");

if (totalCarrito) {
    let total = 0;

    carrito.forEach(function(estacionamiento) {
        total += estacionamiento.precio;
    });

    totalCarrito.innerHTML = "Total: $" + total;
}

function eliminarDelCarrito(codigo) {
    let posicion = carrito.findIndex(function(estacionamiento) {
        return estacionamiento.codigo === codigo;
    });

    if (posicion !== -1) {
        carrito.splice(posicion, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        location.reload();
    }
}

let detalleEstacionamiento = document.getElementById("detalle-estacionamiento");

if (detalleEstacionamiento) {
    let parametros = new URLSearchParams(window.location.search);
    let codigo = parametros.get("codigo");

    console.log(codigo);

    let estacionamientoSeleccionado = estacionamientos.find(function(estacionamiento) {
        return estacionamiento.codigo === codigo;
    });

    console.log(estacionamientoSeleccionado);

    if (estacionamientoSeleccionado) {
        detalleEstacionamiento.innerHTML = `
            <img src="${estacionamientoSeleccionado.imagen}" alt="${estacionamientoSeleccionado.nombre}">
            <h3>${estacionamientoSeleccionado.nombre}</h3>
            <p>${estacionamientoSeleccionado.descripcion}</p>
            <p>Precio: $${estacionamientoSeleccionado.precio}</p>
            <p>Espacios disponibles: ${estacionamientoSeleccionado.stock}</p>
            <button onclick="agregarAlCarrito('${estacionamientoSeleccionado.codigo}')">Añadir</button>
        `;
    }    
    
}

let formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", function(evento) {
        evento.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let comentario = document.getElementById("comentario").value;

        if (nombre === "") {
            alert("El nombre es obligatorio.");
        } 
        else if (
            !email.endsWith("@duoc.cl") &&
            !email.endsWith("@profesor.duoc.cl") &&
            !email.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
        }
        else if (comentario === "") {
            alert("El comentario es obligatorio.");
        }

    });
}

let regionesComunas = [
    {
        region: "Región Metropolitana",
        comunas: ["Santiago", "Maipú", "Puente Alto"]
    },
    {
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué"]
    },
    {
        region: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles"]
    }
];

let selectRegion = document.getElementById("region");

if (selectRegion) {
    regionesComunas.forEach(function(item) {
        selectRegion.innerHTML += `
            <option value="${item.region}">${item.region}</option>
        `;
    });
}

let selectComuna = document.getElementById("comuna");

if (selectRegion && selectComuna) {
    selectRegion.addEventListener("change", function() {

        selectComuna.innerHTML = `
            <option value="">Seleccione una comuna</option>
        `;

        let regionSeleccionada = regionesComunas.find(function(item) {
            return item.region === selectRegion.value;
        });

        if (regionSeleccionada) {
            regionSeleccionada.comunas.forEach(function(comuna) {
                selectComuna.innerHTML += `
                    <option value="${comuna}">${comuna}</option>
                `;
            });
        }
    });
}

let formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", function(evento) {
        evento.preventDefault();

        let run = document.getElementById("run").value;
        let nombreRegistro = document.getElementById("nombre-registro").value;
        let apellidos = document.getElementById("apellidos").value;
        let emailRegistro = document.getElementById("email-registro").value;
        let tipoUsuario = document.getElementById("tipo-usuario").value;
        let region = document.getElementById("region").value;
        let comuna = document.getElementById("comuna").value;
        let direccion = document.getElementById("direccion").value;

        if (run === "") {
            alert("El RUN es obligatorio.");
        }
        else if (run.includes(".") || run.includes("-")) {
            alert("El RUN debe ingresarse sin puntos ni guion.");
        }
        else if (nombreRegistro === "") {
            alert("El nombre es obligatorio.");
        }
        else if (nombreRegistro === "") {
            alert("El nombre es obligatorio.");
        }
        else if (apellidos === "") {
            alert("Los apellidos son obligatorios.");
        }
        else if (emailRegistro === "") {
            alert("El correo electrónico es obligatorio.");
        }
        else if (
            !emailRegistro.endsWith("@duoc.cl") &&
            !emailRegistro.endsWith("@profesor.duoc.cl") &&
            !emailRegistro.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
        }
        else if (tipoUsuario === "") {
            alert("Debe seleccionar un tipo de usuario.");
        }
        else if (region === "") {
            alert("Debe seleccionar una región.");
        }
        else if (comuna === "") {
            alert("Debe seleccionar una comuna.");
        }
        else if (direccion === "") {
            alert("La dirección es obligatoria.");
        }
        else {
            alert("Registro realizado correctamente.");
        }
    });
}

let formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();

        let emailLogin = document.getElementById("email-login").value;
        let passwordLogin = document.getElementById("password-login").value;

        if (emailLogin === "") {
            alert("El correo electrónico es obligatorio.");
        }
        else if (
            !emailLogin.endsWith("@duoc.cl") &&
            !emailLogin.endsWith("@profesor.duoc.cl") &&
            !emailLogin.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
        }
        else if (passwordLogin === "") {
            alert("La contraseña es obligatoria.");
        }
        else if (passwordLogin.length < 4 || passwordLogin.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
        }
        else {
            alert("Inicio de sesión correcto.");
        }
    });
}

let estacionamientosInicio = document.getElementById("estacionamientos-inicio");

if (estacionamientosInicio) {
    estacionamientos.forEach(function(estacionamiento) {
        estacionamientosInicio.innerHTML += `
            <div>
                <img src="${estacionamiento.imagen}" alt="${estacionamiento.nombre}">
                <h3>${estacionamiento.nombre}</h3>
                <p>Precio: $${estacionamiento.precio}</p>
            </div>
        `;
    });
}