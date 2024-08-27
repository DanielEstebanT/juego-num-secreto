/*// document sirve para que js pueda encontrar y manipular los elementos de html. Y querySelector es como un detective que busca elementos especificos dentro de la pagina web en este caso la etiqueta es 'elemento'
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del numero secreto'; //inner es para asignar un valor

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';
*/
// Como nos damos cuenta el codigo anterior de las dos definiciones se parece mucho
// cuando esto pasa se analiza y concluye que esto se puede reducir en una funcion

let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = numeroAleatorio();
    intentos = 1;
}

condicionesIniciales();


function verificarIntento(){
    //let numeroUsuario = document.querySelector('input'); // esto se usa en el caso de que solo haya un input
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); //Esto cuando se usa el ID porque hay varios input en el html. El .value es para obtener solo el valor y no todo el elemento
    //console.log(typeof(numeroUsuario));
    //console.log(typeof(numeroSecreto));
    //console.log(numeroUsuario);
    //console.log(numeroSecreto);
    //console.log(numeroUsuario === numeroSecreto); // usamos el parseint para que aca al usar === coincida y de True porque verifica si es igual tambien en el tipo de variable
    
    console.log(intentos)
    if (numeroUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos' }`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Usuario no acerto
        if (numeroUsuario > numeroSecreto){
            asignarTextoElemento('p','El numero es menor');
        } else {
            asignarTextoElemento('p','El numero es mayor');
        }
        intentos++; // contador de intentos
        limpiarCampo();
    }

    //alert('Click desde el boton')
    return;
}

function limpiarCampo(){
    let valorCampo = document.querySelector('#valorUsuario'); //Buscamos un elemento con querySelector por ID con #antes de la variable
    valorCampo.value = '';
    // o tambien se puede asi document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego(){
    // Limpiar caja
    limpiarCampo();
    // Indicar mensaje de intervalo de numeros
    // Generar numero aleatorio
    // Reiniciar el numero de intentos
    condicionesIniciales()
    // Desahibilitar el boton Nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true')
}


function numeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1; //se lo multiplica por el numero maximo del aleatorio que se desea, math.floor redondea a entero al numero de abajo 4.7 seria 4 y el +1 del final es para que el numero aleatorio vaya de 1 a 10
    console.log(numeroGenerado);
    console.log(numerosSorteados);
    // Preguntar si ya se sortearon todos los numeros
    if (numerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se generaron todos los numeros posibles');
    }else{
        //Si el numero generado esta en la lista hacemos algo
        if (numerosSorteados.includes(numeroGenerado)){
            return numeroAleatorio();
        }else{
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
}

