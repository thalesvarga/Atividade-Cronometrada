// Botões
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const btnStartPause = document.querySelector('#start-pause');
const btnIniciarOuPausarTexto = document.querySelector('#start-pause span');
const btnIconeStartPause = document.querySelector ('.app__card-primary-butto-icon');
const btnMusicaFoco = document.querySelector('#alternar-musica')

//_____________________ //______________//___________________//
const html = document.querySelector('html'); 
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tempoNaTela = document.querySelector('#timer');

// audio
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio ('./sons/pause.mp3');
const musicaTempoFinalizado = new Audio ('./sons/beep.mp3');
const musica = new Audio ('./sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alternarContexto('foco');
    btnFoco.classList.add('active')
    mostrarTempo()
});

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alternarContexto('descanso-curto');
    btnCurto.classList.add('active');
    mostrarTempo()
});
btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 600
    alternarContexto('descanso-longo');
    btnLongo.classList.add('active');
    mostrarTempo()
});

function alternarContexto(contexto){
    html.setAttribute('data-contexto',`${contexto}`);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    botoes.forEach(function (contexto) {
    contexto.classList.remove('active')        
    });
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>` 
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
        titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    
        default:
            break;
    }
};
btnStartPause.addEventListener('click', iniciarOuPausar)

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0 ){
        musicaTempoFinalizado.play()
        alert ('Tempo Finalizado!!')

    const focoAtivo = html.getAttribute("data-contexto") == "foco"
    if (focoAtivo){
    const evento = new CustomEvent('focoFinalizado')
    document.dispatchEvent(evento)
    }

    zerar()
    return
}
    btnIconeStartPause.setAttribute('src', "./imagens/pause.png");
    btnIniciarOuPausarTexto.textContent = 'Pausar'
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
}

 function iniciarOuPausar(){
    if (intervaloId){
        zerar()
        return
}
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    btnIniciarOuPausarTexto.textContent= "Começar"
    
}
 function zerar(){
    clearInterval(intervaloId)
    musicaPause.play()
    btnIconeStartPause.setAttribute('src', "./imagens/play_arrow.png");
    btnIniciarOuPausarTexto.textContent= "Começar"
    intervaloId = null
 }

 function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute:"2-digit", second:"2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
 }

mostrarTempo()
 