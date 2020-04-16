console.log('Flappy Bird - JavaScript');
console.log('Confira mais projetos em: https://github.com/rafaasimi');

// Criando uma variavel e associando as sprites do projeto
const sprites = new Image();
sprites.src = './sprites.png';

// Selecionando o elemento CANVAS no HTML
// Definindo que o jogo será em 2D.
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

///////////////////////////////////////////////////////////////////////////////////////////

// [CRIAÇÃO DO PLANO DE FUNDO]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        // Cria um estilo de prenchimento da cor informada
        contexto.fillStyle = '#70C5CE';
        // Preenche com a cor de acordo com o tamanho do canvas
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // SpriteX(sx), SpriteY (sy)
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            planoDeFundo.x, planoDeFundo.y, // (dx) (dy),
            planoDeFundo.largura, planoDeFundo.altura, // dWidth, dHeight
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // SpriteX(sx), SpriteY (sy)
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            (planoDeFundo.x + chao.largura), planoDeFundo.y, // (dx) (dy),
            planoDeFundo.largura, planoDeFundo.altura, // dWidth, dHeight
        );
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// [CRIAÇÃO DO CHAO]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // SpriteX(sx), SpriteY (sy)
            chao.largura, chao.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            chao.x, chao.y, // (dx) (dy),
            chao.largura, chao.altura, // dWidth, dHeight
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // SpriteX(sx), SpriteY (sy)
            chao.largura, chao.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            (chao.x + chao.largura), chao.y, // (dx) (dy),
            chao.largura, chao.altura, // dWidth, dHeight
        );
    }
}
///////////////////////////////////////////////////////////////////////////////////////////

// [CRIAÇÃO DO FLAPPYBIRD]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    desenha() {
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // SpriteX(sx), SpriteY (sy)
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            flappyBird.x, flappyBird.y, // (dx) (dy),
            flappyBird.largura, flappyBird.altura, // dWidth, dHeight
        );
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

// [MENSAGEM GET READY]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, // SpriteX(sx), SpriteY (sy)
            mensagemGetReady.largura, mensagemGetReady.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
            mensagemGetReady.x, mensagemGetReady.y, // (dx) (dy),
            mensagemGetReady.largura, mensagemGetReady.altura, // dWidth, dHeight
        );
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

//
// [TELAS]
//
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha() {
            chao.desenha();
            planoDeFundo.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha() {
        chao.desenha();
        planoDeFundo.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {
    // Chama a função para desenhar
    telaAtiva.desenha();
    telaAtiva.atualiza();


    // Função para otimizar a performance de animações
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if(telaAtiva.click){
        telaAtiva.click()
    };
});

mudaParaTela(Telas.INICIO);
loop();


