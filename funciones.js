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

let estacionamientosGuardados = JSON.parse(
    localStorage.getItem("estacionamientos")
);

if (estacionamientosGuardados) {
    estacionamientos = estacionamientosGuardados;
}

console.log(estacionamientos);

let listaEstacionamientos = document.getElementById("lista-estacionamientos");

if (listaEstacionamientos) {
    estacionamientos.forEach(function(estacionamiento) {
        listaEstacionamientos.innerHTML += `
            <div>
                ${estacionamiento.imagen
                    ? `<img src="${estacionamiento.imagen}" alt="${estacionamiento.nombre}">`
                    : ""}
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
                <p>Precio: $${estacionamiento.precio}</p>
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
        else if (nombre.length > 100) {
            alert("El nombre no puede superar los 100 caracteres.");
        }
        else if (email.length > 100) {
            alert("El correo electrónico no puede superar los 100 caracteres.");
        }
        else if (
            email !== "" &&
            !email.endsWith("@duoc.cl") &&
            !email.endsWith("@profesor.duoc.cl") &&
            !email.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
        }
        else if (comentario === "") {
            alert("El comentario es obligatorio.");
        }
        else if (comentario.length > 500) {
            alert("El comentario no puede superar los 500 caracteres.");
        }
        else {
            alert("Mensaje enviado correctamente.");
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
        let region = document.getElementById("region").value;
        let comuna = document.getElementById("comuna").value;
        let direccion = document.getElementById("direccion").value;

        if (run === "") {
            alert("El RUN es obligatorio.");
        }
        else if (run.length < 7 || run.length > 9) {
            alert("El RUN debe tener entre 7 y 9 caracteres.");
        }
        else if (run.includes(".") || run.includes("-")) {
            alert("El RUN debe ingresarse sin puntos ni guion.");
        }
        else if (!validarRun(run)) {
            alert("El RUN ingresado no es válido.");
        }
        else if (nombreRegistro === "") {
            alert("El nombre es obligatorio.");
        }
        else if (nombreRegistro.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
        }
        else if (apellidos === "") {
            alert("Los apellidos son obligatorios.");
        }
        else if (apellidos.length > 100) {
            alert("Los apellidos no pueden superar los 100 caracteres.");
        }
        else if (emailRegistro === "") {
            alert("El correo electrónico es obligatorio.");
        }
        else if (emailRegistro.length > 100) {
            alert("El correo electrónico no puede superar los 100 caracteres.");
        }
        else if (
            !emailRegistro.endsWith("@duoc.cl") &&
            !emailRegistro.endsWith("@profesor.duoc.cl") &&
            !emailRegistro.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
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
        else if (direccion.length > 300) {
            alert("La dirección no puede superar los 300 caracteres.");
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
        else if (emailLogin.length > 100) {
            alert("El correo electrónico no puede superar los 100 caracteres.");
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

            let rol;

            if (emailLogin.endsWith("@profesor.duoc.cl")) {
                rol = "Administrador";
            }
            else if (emailLogin.endsWith("@duoc.cl")) {
                rol = "Vendedor";
            }
            else {
                rol = "Cliente";
            }

            let sesion = {
                email: emailLogin,
                rol: rol
            };

            localStorage.setItem(
                "sesion",
                JSON.stringify(sesion)
            );

            if (rol === "Administrador") {
                window.location.href = "admin.html";
            }
            else if (rol === "Vendedor") {
                window.location.href = "admin-productos.html";
            }
            else {
                window.location.href = "index.html";
            }
        }
    });
}

function protegerPaginaAdmin() {

    let sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion) {
        alert("Debe iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    if (sesion.rol !== "Administrador") {
        alert("No tiene permisos para acceder a esta página.");
        window.location.href = "index.html";
    }
}

function protegerPaginaProductos() {

    let sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion) {
        alert("Debe iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    if (
        sesion.rol !== "Administrador" &&
        sesion.rol !== "Vendedor"
    ) {
        alert("No tiene permisos para acceder a esta página.");
        window.location.href = "index.html";
    }
}

function controlarVistaProductos() {

    let sesion = JSON.parse(localStorage.getItem("sesion"));

    if (sesion && sesion.rol === "Vendedor") {

        let elementosAdministrador =
            document.querySelectorAll(".solo-administrador");

        elementosAdministrador.forEach(function(elemento) {
            elemento.style.display = "none";
        });
    }
}

let estacionamientosInicio = document.getElementById("estacionamientos-inicio");

if (estacionamientosInicio) {
    estacionamientos.forEach(function(estacionamiento) {
        estacionamientosInicio.innerHTML += `
            <div>
                ${estacionamiento.imagen
                    ? `<img src="${estacionamiento.imagen}" alt="${estacionamiento.nombre}">`
                    : ""}
                <h3>${estacionamiento.nombre}</h3>
                <p>Precio: $${estacionamiento.precio}</p>
            </div>
        `;
    });
}

let listaProductosAdmin = document.getElementById("lista-productos-admin");

function mostrarProductosAdmin() {

    if (listaProductosAdmin) {

        listaProductosAdmin.innerHTML = "";

        estacionamientos.forEach(function(estacionamiento) {

            listaProductosAdmin.innerHTML += `
                <div>
                    <p><strong>Código:</strong> ${estacionamiento.codigo}</p>
                    <p><strong>Nombre:</strong> ${estacionamiento.nombre}</p>
                    <p><strong>Precio:</strong> $${estacionamiento.precio}</p>
                    <p><strong>Stock:</strong> ${estacionamiento.stock}</p>

                    ${estacionamiento.stockCritico !== null &&
                      estacionamiento.stock <= estacionamiento.stockCritico
                        ? "<p>Stock crítico</p>"
                        : ""}

                    <p><strong>Categoría:</strong> ${estacionamiento.categoria}</p>

                    <a href="detalle-producto.html?codigo=${estacionamiento.codigo}">
                        Ver detalle
                    </a>

                    ${JSON.parse(localStorage.getItem("sesion"))?.rol === "Administrador"
                        ? `
                            <button onclick="editarProducto('${estacionamiento.codigo}')">Editar</button>
                            <button onclick="eliminarProducto('${estacionamiento.codigo}')">Eliminar</button>
                          `
                        : ""}
                </div>
            `;
        });
    }
}

mostrarProductosAdmin();

function eliminarProducto(codigo) {

    let posicion = estacionamientos.findIndex(function(estacionamiento) {
        return estacionamiento.codigo === codigo;
    });

    if (posicion !== -1) {

        estacionamientos.splice(posicion, 1);

        localStorage.setItem(
            "estacionamientos",
            JSON.stringify(estacionamientos)
        );

        mostrarProductosAdmin();

        alert("Producto eliminado correctamente.");
    }
}

let codigoEditando = null;

function editarProducto(codigo) {

    let producto = estacionamientos.find(function(estacionamiento) {
        return estacionamiento.codigo === codigo;
    });

    if (producto) {

        codigoEditando = codigo;

        document.getElementById("codigo-producto").value = producto.codigo;
        document.getElementById("nombre-producto").value = producto.nombre;
        document.getElementById("descripcion-producto").value = producto.descripcion;
        document.getElementById("precio-producto").value = producto.precio;
        document.getElementById("stock-producto").value = producto.stock;

        document.getElementById("stock-critico").value =
            producto.stockCritico === null ? "" : producto.stockCritico;

        document.getElementById("categoria-producto").value = producto.categoria;
    }
}

let formularioProducto = document.getElementById("formulario-producto");

if (formularioProducto) {

    formularioProducto.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let codigoProducto = document.getElementById("codigo-producto").value;
        let nombreProducto = document.getElementById("nombre-producto").value;
        let descripcionProducto = document.getElementById("descripcion-producto").value;
        let precioProducto = document.getElementById("precio-producto").value;
        let stockProducto = document.getElementById("stock-producto").value;
        let stockCritico = document.getElementById("stock-critico").value;
        let categoriaProducto = document.getElementById("categoria-producto").value;

        if (codigoProducto === "") {
            alert("El código es obligatorio.");
        }
        else if (codigoProducto.length < 3) {
            alert("El código debe tener mínimo 3 caracteres.");
        }
        else if (nombreProducto === "") {
    alert("El nombre es obligatorio.");
        }
        else if (nombreProducto.length > 100) {
            alert("El nombre no puede superar los 100 caracteres.");
        }
        else if (descripcionProducto.length > 500) {
            alert("La descripción no puede superar los 500 caracteres.");
        }
        else if (precioProducto === "") {
            alert("El precio es obligatorio.");
        }
        else if (Number(precioProducto) < 0) {
            alert("El precio no puede ser negativo.");
        }
        else if (stockProducto === "") {
            alert("El stock es obligatorio.");
        }
        else if (Number(stockProducto) < 0) {
            alert("El stock no puede ser negativo.");
        }
        else if (!Number.isInteger(Number(stockProducto))) {
            alert("El stock debe ser un número entero.");
        }
        else if (stockCritico !== "" && Number(stockCritico) < 0) {
            alert("El stock crítico no puede ser negativo.");
        }
        else if (
            stockCritico !== "" &&
            !Number.isInteger(Number(stockCritico))
        ) {
            alert("El stock crítico debe ser un número entero.");
        }
        else if (categoriaProducto === "") {
            alert("Debe seleccionar una categoría.");
        }
        else {

            if (codigoEditando !== null) {

                let producto = estacionamientos.find(function(estacionamiento) {
                    return estacionamiento.codigo === codigoEditando;
                });

                if (producto) {

                    producto.codigo = codigoProducto;
                    producto.nombre = nombreProducto;
                    producto.descripcion = descripcionProducto;
                    producto.precio = Number(precioProducto);
                    producto.stock = Number(stockProducto);

                    producto.stockCritico =
                        stockCritico === "" ? null : Number(stockCritico);

                    producto.categoria = categoriaProducto;
                }

                codigoEditando = null;

                alert("Producto actualizado correctamente.");
            }
            else {

                let nuevoProducto = {
                    codigo: codigoProducto,
                    nombre: nombreProducto,
                    descripcion: descripcionProducto,
                    precio: Number(precioProducto),
                    stock: Number(stockProducto),
                    stockCritico: stockCritico === "" ? null : Number(stockCritico),
                    categoria: categoriaProducto,
                    imagen: ""
                };

                estacionamientos.push(nuevoProducto);

                alert("Producto guardado correctamente.");
            }

            localStorage.setItem(
                "estacionamientos",
                JSON.stringify(estacionamientos)
            );

            mostrarProductosAdmin();

            formularioProducto.reset();

            console.log(estacionamientos);
        }
    });
}


// ADMINISTRACIÓN DE USUARIOS


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let listaUsuariosAdmin = document.getElementById("lista-usuarios-admin");

let runEditando = null;

function mostrarUsuariosAdmin() {

    if (listaUsuariosAdmin) {

        listaUsuariosAdmin.innerHTML = "";

        usuarios.forEach(function(usuario) {

            listaUsuariosAdmin.innerHTML += `
                <div>
                    <p><strong>RUN:</strong> ${usuario.run}</p>
                    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                    <p><strong>Apellidos:</strong> ${usuario.apellidos}</p>
                    <p><strong>Correo:</strong> ${usuario.email}</p>
                    <p><strong>Tipo de usuario:</strong> ${usuario.tipoUsuario}</p>
                    <p><strong>Región:</strong> ${usuario.region}</p>
                    <p><strong>Comuna:</strong> ${usuario.comuna}</p>
                    <p><strong>Dirección:</strong> ${usuario.direccion}</p>

                    <button onclick="editarUsuario('${usuario.run}')">
                        Editar
                    </button>

                    <button onclick="eliminarUsuario('${usuario.run}')">
                        Eliminar
                    </button>
                </div>
            `;
        });
    }
}

mostrarUsuariosAdmin();

let regionUsuario = document.getElementById("region-usuario");
let comunaUsuario = document.getElementById("comuna-usuario");

if (regionUsuario && comunaUsuario) {

    regionesComunas.forEach(function(item) {

        regionUsuario.innerHTML += `
            <option value="${item.region}">
                ${item.region}
            </option>
        `;
    });

    regionUsuario.addEventListener("change", function() {

        comunaUsuario.innerHTML =
            '<option value="">Seleccione una comuna</option>';

        let regionSeleccionada = regionesComunas.find(function(item) {
            return item.region === regionUsuario.value;
        });

        if (regionSeleccionada) {

            regionSeleccionada.comunas.forEach(function(comuna) {

                comunaUsuario.innerHTML += `
                    <option value="${comuna}">
                        ${comuna}
                    </option>
                `;
            });
        }
    });
}

let formularioUsuario = document.getElementById("formulario-usuario");

if (formularioUsuario) {

    formularioUsuario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let runUsuario = document.getElementById("run-usuario").value;
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let apellidosUsuario = document.getElementById("apellidos-usuario").value;
        let emailUsuario = document.getElementById("email-usuario").value;
        let fechaUsuario = document.getElementById("fecha-usuario").value;
        let tipoUsuarioAdmin = document.getElementById("tipo-usuario-admin").value;
        let regionUsuarioValor = document.getElementById("region-usuario").value;
        let comunaUsuarioValor = document.getElementById("comuna-usuario").value;
        let direccionUsuario = document.getElementById("direccion-usuario").value;

        

        if (runUsuario === "") {
            alert("El RUN es obligatorio.");
        }
        else if (runUsuario.length < 7 || runUsuario.length > 9) {
            alert("El RUN debe tener entre 7 y 9 caracteres.");
        }
        else if (runUsuario.includes(".") || runUsuario.includes("-")) {
            alert("El RUN debe ingresarse sin puntos ni guion.");
        }
        else if (!validarRun(runUsuario)) {
            alert("El RUN no es válido.");
        }
        else if (nombreUsuario === "") {
            alert("El nombre es obligatorio.");
        }
        else if (nombreUsuario.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
        }
        else if (apellidosUsuario === "") {
            alert("Los apellidos son obligatorios.");
        }
        else if (apellidosUsuario.length > 100) {
            alert("Los apellidos no pueden superar los 100 caracteres.");
        }
        else if (emailUsuario === "") {
            alert("El correo electrónico es obligatorio.");
        }
        else if (emailUsuario.length > 100) {
            alert("El correo electrónico no puede superar los 100 caracteres.");
        }
        else if (
            !emailUsuario.endsWith("@duoc.cl") &&
            !emailUsuario.endsWith("@profesor.duoc.cl") &&
            !emailUsuario.endsWith("@gmail.com")
        ) {
            alert("El correo electrónico no es válido.");
        }
        else if (tipoUsuarioAdmin === "") {
            alert("Debe seleccionar un tipo de usuario.");
        }
        else if (regionUsuarioValor === "") {
            alert("Debe seleccionar una región.");
        }
        else if (comunaUsuarioValor === "") {
            alert("Debe seleccionar una comuna.");
        }
        else if (direccionUsuario === "") {
            alert("La dirección es obligatoria.");
        }
        else if (direccionUsuario.length > 300) {
            alert("La dirección no puede superar los 300 caracteres.");
        }
        else {

            
            if (runEditando !== null) {

                let usuario = usuarios.find(function(usuario) {
                    return usuario.run === runEditando;
                });

                if (usuario) {
                    usuario.run = runUsuario;
                    usuario.nombre = nombreUsuario;
                    usuario.apellidos = apellidosUsuario;
                    usuario.email = emailUsuario;
                    usuario.fechaNacimiento = fechaUsuario;
                    usuario.tipoUsuario = tipoUsuarioAdmin;
                    usuario.region = regionUsuarioValor;
                    usuario.comuna = comunaUsuarioValor;
                    usuario.direccion = direccionUsuario;
                }

                runEditando = null;

                alert("Usuario actualizado correctamente.");
            }

            
            else {

                let nuevoUsuario = {
                    run: runUsuario,
                    nombre: nombreUsuario,
                    apellidos: apellidosUsuario,
                    email: emailUsuario,
                    fechaNacimiento: fechaUsuario,
                    tipoUsuario: tipoUsuarioAdmin,
                    region: regionUsuarioValor,
                    comuna: comunaUsuarioValor,
                    direccion: direccionUsuario
                };

                usuarios.push(nuevoUsuario);

                alert("Usuario guardado correctamente.");
            }

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );

            mostrarUsuariosAdmin();

            formularioUsuario.reset();

            comunaUsuario.innerHTML =
                '<option value="">Seleccione una comuna</option>';
        }
    });
}

function editarUsuario(run) {

    let usuario = usuarios.find(function(usuario) {
        return usuario.run === run;
    });

    if (usuario) {

        runEditando = run;

        document.getElementById("run-usuario").value = usuario.run;
        document.getElementById("nombre-usuario").value = usuario.nombre;
        document.getElementById("apellidos-usuario").value = usuario.apellidos;
        document.getElementById("email-usuario").value = usuario.email;
        document.getElementById("fecha-usuario").value = usuario.fechaNacimiento;
        document.getElementById("tipo-usuario-admin").value = usuario.tipoUsuario;
        document.getElementById("region-usuario").value = usuario.region;

        comunaUsuario.innerHTML =
            '<option value="">Seleccione una comuna</option>';
        
        let regionSeleccionada = regionesComunas.find(function(item) {
            return item.region === usuario.region;
        });

        if (regionSeleccionada) {

            regionSeleccionada.comunas.forEach(function(comuna) {

                comunaUsuario.innerHTML += `
                    <option value="${comuna}">
                        ${comuna}
                    </option>
                `;
            });
        }

        document.getElementById("comuna-usuario").value = usuario.comuna;
        document.getElementById("direccion-usuario").value = usuario.direccion;
    }
}

function eliminarUsuario(run) {

    let posicion = usuarios.findIndex(function(usuario) {
        return usuario.run === run;
    });

    if (posicion !== -1) {

        usuarios.splice(posicion, 1);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        mostrarUsuariosAdmin();

        alert("Usuario eliminado correctamente.");
    }
}

function validarRun(run) {

    run = run.toUpperCase();

    let cuerpo = run.slice(0, -1);
    let digitoVerificador = run.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador === 8) {
            multiplicador = 2;
        }
    }

    let resto = 11 - (suma % 11);
    let digitoCalculado;

    if (resto === 11) {
        digitoCalculado = "0";
    }
    else if (resto === 10) {
        digitoCalculado = "K";
    }
    else {
        digitoCalculado = String(resto);
    }

    return digitoCalculado === digitoVerificador;
}

let ordenes = [
    {
        id: "001",
        cliente: "Ana Pérez",
        producto: "Estacionamiento Centro",
        cantidad: 2,
        total: 3000
    },
    {
        id: "002",
        cliente: "Carlos Soto",
        producto: "Estacionamiento Mall",
        cantidad: 1,
        total: 2000
    }
];

let detalleOrden = document.getElementById("detalle-orden");

if (detalleOrden) {

    let parametrosOrden = new URLSearchParams(window.location.search);
    let idOrden = parametrosOrden.get("id");

    let ordenSeleccionada = ordenes.find(function(orden) {
        return orden.id === idOrden;
    });

    if (ordenSeleccionada) {

        detalleOrden.innerHTML = `
            <p><strong>Orden:</strong> ${ordenSeleccionada.id}</p>
            <p><strong>Cliente:</strong> ${ordenSeleccionada.cliente}</p>
            <p><strong>Producto:</strong> ${ordenSeleccionada.producto}</p>
            <p><strong>Cantidad:</strong> ${ordenSeleccionada.cantidad}</p>
            <p><strong>Total:</strong> $${ordenSeleccionada.total}</p>
        `;
    }
    else {
        detalleOrden.innerHTML = "<p>Orden no encontrada.</p>";
    }
}