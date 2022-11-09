let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    apellido: '',
    puesto: '',
    telefono: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const puestoInput = document.querySelector('#puesto');
const telefonoInput = document.querySelector('#telefono');
const btnAgregar = document.querySelector('#btn_Agregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || puestoInput.value === '' || telefonoInput.value === '') {
        alert('Todos los Campos son Obligatorios.')
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.apellido = apellidoInput.value;
        objEmpleado.puesto = puestoInput.value;
        objEmpleado.telefono = telefonoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objEmpleado});

    mostrarEmpleado();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.apellido = '';
    objEmpleado.puesto = '';
    objEmpleado.telefono = '';
}

function mostrarEmpleado() {

    limpiarHTML();

    const divEmpleados = document.querySelector('.empleados');

    listaEmpleados.forEach( empleado => {
        const {id, nombre, apellido, puesto, telefono} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} ${apellido} - ${puesto} - ${telefono}`;
        parrafo.dataset.id = id;

        const salto = document.createElement('br');
        parrafo.append(salto);

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn_editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn_eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, apellido, puesto, telefono } = empleado;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    puestoInput.value = puesto;
    telefonoInput.value = telefono;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() {
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.apellido = apellidoInput.value;
    objEmpleado.puesto = puestoInput.value;
    objEmpleado.telefono = telefonoInput.value;

    listaEmpleados.map( empleado => {
        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.apellido = objEmpleado.apellido;
            empleado.puesto = objEmpleado.puesto;
            empleado.telefono = objEmpleado.telefono;
        }
    });

    limpiarHTML();
    mostrarEmpleado();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleado();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}