// Variables

const inputDni = document.getElementById('dni');
const inputPassword = document.getElementById('password');

const btn_login = document.getElementById('btn-login');

const home_div = document.getElementById('home');
const login_div = document.getElementById('login');
const menu_div = document.getElementById('menu');
const consulta_div = document.getElementById('consulta-saldo');
const retiro_div = document.getElementById('retiro');
const retiro_resumen_div = document.getElementById('retiro-resumen');
const deposito_div = document.getElementById('deposito');
const deposito_resumen_div = document.getElementById('deposito-resumen');
const validar_div = document.getElementById('validar');
const procesar_div = document.getElementById('logear');

const txt_saldo = document.getElementById('txt-saldo');
const txt_saldo_retiro = document.getElementById('txt-saldo-retiro');
const mensaje = document.getElementById('login-mensaje');
const retiro_mensaje = document.getElementById('retiro-mensaje');
const retiro_total = document.getElementById('retiro-total');
const retiro_saldo = document.getElementById('retiro-saldo');
const retiro_input = document.getElementById('retiro-input');
const txt_deposito = document.getElementById('txt-deposito');
const inputCCI = document.getElementById('input-cci');
const inputCCIMonto = document.getElementById('input-cci-monto');
const deposito_monto = document.querySelectorAll('.deposito-resumen-total');
const deposito_saldo = document.getElementById('deposito-saldo');
const deposito_mensaje = document.getElementById('deposito-mensaje');

const btn_retiro_resumen_volver = document.getElementById('btn-retiro-resumen-volver');

// Datos de cuentas
const cuentas = [
  { nombre: 'Mali', saldo: 200, password: '1234', dni: 44788834, cci: 1 },
  { nombre: 'Gera', saldo: 150, password: '5678', dni: 10247439, cci: 12 },
  { nombre: 'Sabi', saldo: 60, password: '9102', dni: 98005362, cci: 123 },
];

function obtenerCuenta(dni) {
  return cuentas.find((cuenta) => cuenta.dni === parseInt(dni));
}

/*function obtenerSaldo(saldo) {
  saldo = obtenerCuenta(dni.saldo);

  console.log(saldo);
}*/

function mostrarMensaje(element, mensaje, tipo = 'error') {
  element.textContent = mensaje;
  element.className = tipo;
}

function cambiarVista(ocultar, mostrar) {
  ocultar.classList.add('ocultar');
  mostrar.classList.remove('ocultar');
}

// Función para validar cuenta y mostrar menú
function validarCuenta() {
  const cuenta = obtenerCuenta(inputDni.value);
  if (!inputDni.value || !inputPassword.value) {
    mostrarMensaje(mensaje, 'Debe completar todos los campos');
  } else if (cuenta && cuenta.password === inputPassword.value) {
    setTimeout(() => {
      cambiarVista(login_div, procesar_div);
      setTimeout(() => {
        cambiarVista(procesar_div, menu_div);
      }, 3000);
    }, 100);

    /*    cambiarVista(login_div, menu_div);*/
  } else {
    mostrarMensaje(mensaje, cuenta ? 'Contraseña incorrecta' : 'DNI incorrecto');
  }
  inputPassword.value = '';
}

let saldoOriginal;

// Función para manejar retiro de saldo
function retiro() {
  const cuenta = obtenerCuenta(inputDni.value);
  if (cuenta) {
    saldoOriginal = cuenta.saldo;

    txt_saldo_retiro.textContent = `S/ ${cuenta.saldo}.00`;

    setTimeout(() => {
      cambiarVista(menu_div, procesar_div);
      setTimeout(() => {
        cambiarVista(procesar_div, retiro_div);
      }, 3000);
    }, 100);
    /*cambiarVista(menu_div, retiro_div);*/

    const procesarRetiro = (monto) => {
      if (cuenta.saldo >= monto) {
        cuenta.saldo -= monto;
        retiro_total.textContent = `S/ ${monto}.00`;
        retiro_saldo.textContent = `S/ ${cuenta.saldo}.00`;
        setTimeout(() => {
          cambiarVista(retiro_div, procesar_div);
          setTimeout(() => {
            cambiarVista(procesar_div, retiro_resumen_div);
          }, 3000);
        }, 100);
        /*cambiarVista(retiro_div, retiro_resumen_div);*/
      } else {
        mostrarMensaje(retiro_mensaje, 'No tiene saldo suficiente', 'retiro-error');
      }
    };

    // Añadir event listeners
    document.getElementById('btn-retiro-20').onclick = () => procesarRetiro(20);
    document.getElementById('btn-retiro-60').onclick = () => procesarRetiro(60);
    document.getElementById('btn-retiro-120').onclick = () => procesarRetiro(120);
    document.getElementById('btn-retiro-volver').onclick = () => volverRetiro();

    document.getElementById('btn-retiro-next').onclick = () => {
      const monto = parseInt(retiro_input.value);
      if (monto) {
        procesarRetiro(monto);
      } else {
        mostrarMensaje(retiro_mensaje, 'Ingrese un monto válido', 'retiro-error');
      }
    };

    document.getElementById('btn-retiro-confirmar').onclick = () => {
      setTimeout(() => {
        cambiarVista(retiro_resumen_div, procesar_div);
        setTimeout(() => {
          cambiarVista(procesar_div, menu_div);
        }, 3000);
      }, 100);
      /*cambiarVista(retiro_resumen_div, menu_div);*/
      retiro_input.value = '';
      retiro_mensaje.textContent = '';
    };

    document.getElementById('btn-retiro-resumen-volver').onclick = volverRetiroResumen;
  }
}

// Función para consultar saldo
function consultarSaldo() {
  const cuenta = obtenerCuenta(inputDni.value);
  if (cuenta) {
    txt_saldo.textContent = `S/ ${cuenta.saldo}.00`;
    setTimeout(() => {
      cambiarVista(menu_div, procesar_div);
      setTimeout(() => {
        cambiarVista(procesar_div, consulta_div);
      }, 3000);
    }, 100);
    /*cambiarVista(menu_div, consulta_div);*/
  }
}

// Salir de la sesión
function salir() {
  setTimeout(() => {
    cambiarVista(menu_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, home_div);
    }, 3000);
  }, 100);
  /*cambiarVista(menu_div, login_div);*/
  inputDni.value = '';
  inputPassword.value = '';
}

function salirConsulta() {
  setTimeout(() => {
    cambiarVista(consulta_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, home_div);
    }, 3000);
  }, 100);
  /*  cambiarVista(consulta_div, login_div);*/
  inputDni.value = '';
  inputPassword.value = '';
}

// Volver al menú
function volverMenu() {
  setTimeout(() => {
    cambiarVista(consulta_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, menu_div);
    }, 3000);
  }, 100);
  /*cambiarVista(consulta_div, menu_div);*/
}

function volverRetiro() {
  setTimeout(() => {
    cambiarVista(retiro_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, menu_div);
    }, 3000);
  }, 100);
  /*cambiarVista(retiro_div, menu_div);*/
}

function volverDeposito() {
  setTimeout(() => {
    cambiarVista(deposito_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, menu_div);
    }, 3000);
  }, 100);
  /*cambiarVista(deposito_div, menu_div);*/
}

function volverResumenDeposito() {
  /* cambiarVista(deposito_resumen_div, deposito_div);*/
  setTimeout(() => {
    cambiarVista(deposito_resumen_div, procesar_div);
    setTimeout(() => {
      cambiarVista(procesar_div, deposito_div);
    }, 3000);
  }, 100);
}

function irLogin() {
  setTimeout(() => {
    cambiarVista(home_div, validar_div);
    setTimeout(() => {
      cambiarVista(validar_div, login_div);
    }, 3000);
  }, 100);
}

function volverRetiroResumen() {
  const cuenta = obtenerCuenta(inputDni.value);
  if (cuenta) {
    cuenta.saldo = saldoOriginal;

    txt_saldo_retiro.textContent = `S/ ${cuenta.saldo}`;

    retiro_input.value = '';
    retiro_mensaje.textContent = '';

    setTimeout(() => {
      cambiarVista(retiro_resumen_div, validar_div);
      setTimeout(() => {
        cambiarVista(validar_div, retiro_div);
      }, 3000);
    }, 100);
    /*cambiarVista(retiro_resumen_div, retiro_div);*/
  }
}

function depositar() {
  const cuenta = obtenerCuenta(inputDni.value);

  if (cuenta) {
    saldoOriginal = cuenta.saldo;

    txt_deposito.textContent = `S/ ${cuenta.saldo}.00`;
    setTimeout(() => {
      cambiarVista(menu_div, procesar_div);
      setTimeout(() => {
        cambiarVista(procesar_div, deposito_div);
      }, 3000);
    }, 100);
    /* cambiarVista(menu_div, deposito_div);*/

    document.getElementById('deposito-ok').onclick = () => {
      const monto = parseInt(inputCCIMonto.value);
      if (monto && monto > 0) {
        procesarDeposito(monto);
      } else {
        mostrarMensaje(deposito_mensaje, 'Ingrese un monto válido', 'retiro-error');
      }
    };

    function procesarDeposito(monto) {
      if (cuenta.saldo >= monto) {
        cuenta.saldo -= monto;
        deposito_monto.forEach((el) => {
          el.textContent = `S/ ${monto}.00`;
        });
        deposito_saldo.textContent = `S/ ${cuenta.saldo}.00`;
        setTimeout(() => {
          cambiarVista(deposito_div, procesar_div);
          setTimeout(() => {
            cambiarVista(procesar_div, deposito_resumen_div);
          }, 3000);
        }, 100);
        /*cambiarVista(deposito_div, deposito_resumen_div);*/
      } else {
        mostrarMensaje(deposito_mensaje, 'No tiene saldo suficiente', 'retiro-error');
      }
    }

    deposito_mensaje.textContent = '';

    document.getElementById('btn-deposito-volver').addEventListener('click', volverDeposito);
    document.getElementById('btn-resumen-deposito').addEventListener('click', volverDepositoResumen);

    document.getElementById('btn-deposito-confirmar').onclick = () => {
      setTimeout(() => {
        cambiarVista(deposito_resumen_div, procesar_div);
        setTimeout(() => {
          cambiarVista(procesar_div, menu_div);
        }, 3000);
      }, 100);
      /*cambiarVista(deposito_resumen_div, menu_div);*/
      inputCCI.value = '';
      inputCCIMonto.value = '';
      deposito_mensaje.textContent = '';
    };
  }
}

function volverDepositoResumen() {
  const cuenta = obtenerCuenta(inputDni.value);
  if (cuenta) {
    cuenta.saldo = saldoOriginal;

    txt_deposito.textContent = `S/ ${cuenta.saldo}`;

    inputCCI.value = '';
    inputCCIMonto.value = '';
    deposito_mensaje.textContent = '';
    cambiarVista(deposito_resumen_div, deposito_div);
  }
}

/*function retiroVolver() {
  cambiarVista(retiro_div, menu_div);
}*/

/*function obtenerSaldo(dni) {
  const cuenta = obtenerCuenta(dni);
  return cuenta ? cuenta.saldo : 'Cuenta no encontrada';
}*/

// Asignación de event listeners
document.getElementById('btn-insert').addEventListener('click', irLogin);
btn_login.addEventListener('click', validarCuenta);
document.getElementById('btn-salir').addEventListener('click', salir);
document.getElementById('btn-saldo').addEventListener('click', consultarSaldo);
document.getElementById('btn-volver').addEventListener('click', volverMenu);
/*document.getElementById('btn-retiro-volver').addEventListener('click', volverMenu);*/
document.getElementById('btn-consulta-salir').addEventListener('click', salirConsulta);
document.getElementById('btn-retirar').addEventListener('click', retiro);
document.getElementById('btn-depositar').addEventListener('click', depositar);
/*console.log(obtenerSaldo(44788834));*/
