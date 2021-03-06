console.log('Flappy Bird - JavaScript');
console.log('Confira mais projetos em: https://github.com/rafaasimi');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

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
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, // (dx) (dy),
            planoDeFundo.largura, planoDeFundo.altura, // dWidth, dHeight
        );
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// [CRIAÇÃO DO CHAO]
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },

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
        },
    };
    return chao;
};

///////////////////////////////////////////////////////////////////////////////////////////

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
};

// [CRIAÇÃO DO FLAPPYBIRD]
function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('jump!');
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,

        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                console.log('Fez colisao.');
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            //console.log('passouOIntervalo', passouOIntervalo)

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
            // console.log('[incremento]', incremento);
            // console.log('[baseRepeticao]',baseRepeticao);
            // console.log('[frame]', incremento % baseRepeticao);
        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // SpriteX(sx), SpriteY (sy)
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte da sprite (sWidth, sHeight,)
                flappyBird.x, flappyBird.y, // (dx) (dy),
                flappyBird.largura, flappyBird.altura, // dWidth, dHeight
            );
        }
    }
    return flappyBird;
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

// [CRIAÇÃO DOS CANOS]
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // [CANO DO CÉU]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                // [CANO DO CHÃO]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }

                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

            })

        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if (globais.flappyBird.x >= par.x) {
                console.log("Flappy invadiu a area dos canos")

                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }

            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                console.log("passou 100 frames");
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    console.log("Voce perdeu")
                    mudaParaTela(Telas.INICIO);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });

        }
    }
    return canos;
}

///////////////////////////////////////////////////////////////////////////////////////////
//
// [TELAS]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
    }
};

function loop() {
    // Chama a função para desenhar
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    // Função para otimizar a performance de animações
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click()
    };
});

mudaParaTela(Telas.INICIO);
loop();


