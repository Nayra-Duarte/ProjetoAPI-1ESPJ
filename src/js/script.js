//Declarações dos elementos usando o DOM(Document Object Model)

const videoElemento = document.getElementById('video')
const botaoScanear = document.getElementById('btn-texto')
const resultado = document.getElementById('saida')
const canvas = document.getElementById('canvas')

//Função que vai habilitar a câmera

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video:{facingMode: 'environment'},//garante que o video comece - 'environment' abre a camera traseira
            audio: false
        })
        videoElemento.srcObject = midia;
        videoElemento.play();
    }catch(erro){
        resultado.innerText="Erro ao acessar a Câmera"
    }
}

configurarCamera();

//Função para ler o texto da imagem e mostrar na tela

botaoScanear.onclick = async()=>{
    botaoScanear.disable= true;
    resultado.innerText= 'Fazendo a leitura, aguarde...'

    //chama a estrutura do canvas
    const context = canvas.getContexte('2d')

    //ajusta o tamanho da tela
    canvas.width = videoElemento.videoWidth;
    canvas.videoElemento = videoElemento.videoHeight;

    //reset de qualquer transformação para garantir que a foto não fique invertida
    context.setTransform(1, 0, 1, 0, 0, 0);

    //Aplica o filtro de contrste e escala de cinza no canvas antes de tirar a foto(ajuda a evitar letras aleatórias)
    context.filter = 'contrast(1.2) grayscale(1)';

    context.drawImage(videoElemento, 0 , 0, canvas.width, canvas.heitgh);
    try{
        //Captura do texto da imagem e tradução
        const {data: {text}} = await Tesseract.recognize( // API
            canvas,
            'por'
        )
        //remove os espaços em branco
        const textoFinal = text.trim();

        resultado,innerText = textoFinal.length > 0 ? textoFinal: "Não foi possível identificar o texto."
        // ? = if
        // : = else
        //estrutura condicional ternaria
    }catch(erro){
        console.error(erro);
        resultado.innerText = 'Erro ao processar', erro;
    }finally{
        //
        botaoScanear.disable = false;
    }
}