//Variables globales
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('button[type=submit]');
const btnReset = document.querySelector('button[type=reset]');

const spinner = document.querySelector('.spinner');
const formulario = document.querySelector('#formulario');

//Crear objeto de email 
const emailObj = {
    email: '',
    asunto: '',
    mensaje: ''
}

//Eventos
eventListeners();
function eventListeners(){
    //El evento input se dispara cuando se cambia la propiedad value del elemento
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', e => {
        e.preventDefault();
        reset();
    });

    btnEnviar.addEventListener('click', e => {
        e.preventDefault();
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.add('hidden');
            reset();

            const alertaExito = document.createElement('p');
            alertaExito.textContent = 'El email fué enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    });
}

//Crear objeto de email
const emailobj = {
    email: '',
    asunto: '',
    mensaje: ''
}

//Funciones
function reset(){
    formulario.reset();
    emailObj.email = '';
    emailObj.asunto = '';
    emailObj.mensaje = '';
    enviarEmail();
}
function validar(e){
    //Validar campos vacíos
    if(e.target.value.trim() === ''){
        emailObj[e.target.id] = '';
        enviarEmail();
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        return;
    }
    //Validar email
    if(e.target.id === 'email' && !validarEmail(e.target.value)){
        emailObj[e.target.id] = '';
        enviarEmail();
        mostrarAlerta('El email es inválido', e.target.parentElement);
        return;
    }

    //AQUÍ YA PASÓ LAS VALIDACIONES
    limpiarAlerta(e.target.parentElement);

    //Agregar valores al objeto
    emailObj[e.target.id] = e.target.value;

    enviarEmail();
}
function enviarEmail(){
    if(Object.values(emailObj).includes('')){
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50');
        return;
    }
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('opacity-50');
}
function validarEmail(email){
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return regex.test(email);
}
function mostrarAlerta(mensaje, referencia){
    //Limpiar alerta
    limpiarAlerta(referencia);
    
    //Crear alerta
    const alerta = document.createElement('p');
    alerta.classList.add('alerta');
    alerta.textContent = mensaje;

    //Agregar alerta
    referencia.appendChild(alerta);
}
function limpiarAlerta(referencia){
    const alerta = referencia.querySelector('.alerta');
    if(alerta){
        alerta.remove();
    }
}