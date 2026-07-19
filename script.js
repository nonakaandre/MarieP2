//Tempo

const tempoE1 = document.getElementById("tempo");


let tempo = 30000;
let cronometro = null;
let nivel = "Iniciante";

function atualizarTempo() {
    tempoE1.textContent = tempo;
}

function iniciarCronometro() {
    cronometro = setInterval(() => {
        tempo--;

        atualizarTempo();

        if (tempo <= 0) {
            tempo = 0;
            atualizarTempo();
            clearInterval(cronometro);
            tempoEsgotado();
        }
    }, 1000);

}


function reiniciarCronometro(novoTempo = 30) {
    clearInterval(cronometro);
    tempo = novoTempo;
    atualizarTempo();
    iniciarCronometro();
}

function tempoEsgotado() {
    alert("Tempo esgotado!");
}

atualizarTempo();
iniciarCronometro();


//Perguntas

const questoes = [
    {
        pergunta: "Um produto custa R$ 80 e recebe um desconto de 15%. Qual é o valor do desconto em reais?",
        resposta: 12,
        dica: "A resposta está entre 10 e 15",
        alternativas: [10, 12, 30, 46]
    },

    {
        pergunta: "Se três canetas custam R$12,60, quanto custaria apenas uma caneta?",
        resposta: 4.20,
        dica: "Divisão",
        alternativas: [4.20, 2.60, 5.0, 4.0]
    },

    {
        pergunta: "Qual é o resultado da expressão: 15 - 3 * 4 + 2?",
        resposta: 5,
        dica: "Inicie pela Multiplicação e depois some com o resultado da subtração",
        alternativas: [5, 9, 3, 10]
    },

    {
        pergunta: "Quanto é 12 elevado a 3 (12³)",
        resposta: 1728,
        dica: "12 elevado a 3 seria 12 vezes ele mesmo 3 vezes (12 * 12 * 12)",
        alternativas: [942, 1975, 1728, 643]
    },

    {
        pergunta: "Uma camisa custa R$ 120,00 e está com 25% de desconto. Qual é o preço final após o desconto?",
        resposta: 90,
        dica: "Calcule 25% de 120 e subtraia do valor original",
        alternativas: [90, 95, 30, 85]
    },

    // Nível 2

    {
        pergunta: "João tem o dobro da idade de Maria. Daqui a 5 anos, a soma das idades deles será 40. Qual é a idade atual de João?",
        resposta: 20,
        dica: "Monte uma equação: se Maria tem X, João tem 2X. Daqui a 5 anos: (X+5) + (2X+5) = 40",
        alternativas: [20, 15, 25, 10]
    },
    {
        pergunta: "Qual é a área de um triângulo com base de 14 cm e altura de 9 cm?",
        resposta: 63,
        dica: "Área do triângulo = (base × altura) / 2",
        alternativas: [63, 126, 45, 72]
    },
    {
        pergunta: "Um carro percorre 360 km em 4 horas. Mantendo a mesma velocidade, quantos km percorre em 7 horas?",
        resposta: 630,
        dica: "Calcule a velocidade média (km/h) primeiro",
        alternativas: [630, 560, 700, 480]
    },
    {
        pergunta: "Qual é o valor de X na equação: 3X + 7 = 2X + 19?",
        resposta: 12,
        dica: "Isole o X passando os termos semelhantes para cada lado",
        alternativas: [12, 6, 8, 26]
    },
    {
        pergunta: "Uma torneira enche um tanque em 6 horas. Outra enche o mesmo tanque em 3 horas. Trabalhando juntas, em quantas horas encherão o tanque?",
        resposta: 2,
        dica: "Some as frações de trabalho por hora: 1/6 + 1/3",
        alternativas: [2, 3, 4, 4.5]
    },

    // Nível 3

    {
        pergunta: "Quantos anagramas distintos podem ser formados com as letras da palavra MATEMATICA?",
        resposta: 151200,
        dica: "Use fatorial com divisão pelas repetições: A aparece 3x, T aparece 2x, M aparece 2x — 10! / (3! × 2! × 2!)",
        alternativas: [151200, 3628800, 75600, 302400]
    },
    {
        pergunta: "Qual é a soma dos 50 primeiros termos da PA (2, 5, 8, 11, ...)?",
        resposta: 3725,
        dica: "Use Sn = (n/2) × (a1 + an), onde an = a1 + (n-1) × r",
        alternativas: [3725, 3500, 4025, 3875]
    },
    {
        pergunta: "Em uma PG de razão 3 e primeiro termo 2, qual é o valor do 6º termo?",
        resposta: 486,
        dica: "Fórmula do termo geral da PG: an = a1 × r^(n-1)",
        alternativas: [486, 162, 1458, 243]
    },
    {
        pergunta: "Qual é o coeficiente de x³ no desenvolvimento de (x + 2)^5?",
        resposta: 80,
        dica: "Use o Binômio de Newton: C(5,2) × x³ × 2² — escolha o termo onde x fica com expoente 3",
        alternativas: [80, 40, 160, 10]
    },
    {
        pergunta: "Uma empresa tem 8 candidatos para 3 vagas distintas. De quantas formas diferentes as vagas podem ser preenchidas?",
        resposta: 336,
        dica: "É um arranjo (a ordem importa pois as vagas são distintas): A(8,3) = 8! / (8-3)!",
        alternativas: [336, 56, 512, 168]
    }

];

let indiceAtual = 0;

const titulo = document.getElementById("tituloQuestao");
const texto = document.getElementById("pergunta");
const inputResposta = document.getElementById("respostaInput");

function mostrarQuestao() {
    
    atualizarNivel();

    if (indiceAtual < questoes.length) {
        
        document.getElementById("DicaPergunta").innerText = "";

        titulo.innerText = `Questão ${indiceAtual + 1}`;
        texto.innerText = questoes[indiceAtual].pergunta;

    } else {
        titulo.innerText = "Fim do Quiz";
        texto.innerText = "Você respondeu todas as questões.";

        document.querySelector(".resposta").style.display = "none";
    }

}

//Função para verificar se a resposta está correta

function verificarResposta() {

    const respostaUsuario = Number(inputResposta.value);

    const respostaCorreta = questoes[indiceAtual].resposta;

    if (respostaUsuario === respostaCorreta) {

        let pontosGanhos = pontuacao_dica ? 50 : 100;

        pontuacao += pontosGanhos;

        atualizarPontuacao();

        alert(`Resposta Correta! +${pontosGanhos} pontos`);

    } else {

        alert("Resposta incorreta!");

    }

    indiceAtual++;

        inputResposta.value = "";

        pontuacao_dica = false;

        mostrarQuestao();
}

mostrarQuestao();

let cartaDicaUsada = false;
let cartaMultUsada = false;
let cartaPularUsada = false;

function usarDica() {
    if (cartaDicaUsada) {
        alert("Você já usou esta carta!");
        return;
    }

    cartaDicaUsada = true;

    pontuacao_dica = true;

    document.getElementById("DicaPergunta").innerText =
        questoes[indiceAtual].dica;

    document.getElementById("btnDica").disabled = true;
    
    document.getElementById("btnDica").classList.add("usada");

    document.getElementById("btnDica").innerHTML = questoes[indiceAtual].dica;
    
}

function usarPular() {
    
    if (cartaPularUsada) {
        alert("Você já usou esta carta!");
        return;
    }
    
    cartaPularUsada = true;
    
    indiceAtual++;
    
    document.getElementById("DicaPergunta").innerText = "";
    
    mostrarQuestao();
    
    document.getElementById("btnSkip").classList.add("usada");
    
    document.getElementById("btnSkip").disabled = true;
}

function usarMult() {
    
    if (cartaMultUsada) {
        alert("Você já usou esta carta!");
        return;
    }
    
    cartaMultUsada = true;
    
    const alternativas = questoes[indiceAtual].alternativas;

    const div = document.getElementById("alternativas");

    div.innerHTML = "";

    for (let i = 0; i < alternativas.length; i++) {
        const botao = document.createElement("button");

        botao.innerText = alternativas[i];

        botao.onclick = function() {
            verificarRespostaMultipla(alternativas[i]);
        };

        div.appendChild(botao);
    }

    document.getElementById("btnMult").classList.add("usada");
    
    document.getElementById("btnMult").disabled = true;

    document.getElementById("btnMult").innerHTML = "Escolha uma alternativa";
}

function verificarRespostaMultipla(respostaEscolhida) {
    const respostaCorreta = questoes[indiceAtual].resposta;

    if (respostaEscolhida === respostaCorreta) {

        pontuacao += 50;

        atualizarPontuacao();

        alert("Correto!");
    } else {
        alert("Errado!");
    }

    indiceAtual++;

    document.getElementById("alternativas").innerHTML = "";

    mostrarQuestao();
}

//Pontuação

let pontuacao = 0;

let pontuacao_dica = false;

function atualizarPontuacao() {
    document.getElementById("score").innerText =
        `${pontuacao}`;
}


function atualizarNivel() {

    if (indiceAtual >= 10) {

        nivel = "Avançado";

    } else if (indiceAtual >= 5) {

        nivel = "Intermediário";

    } else {

        nivel = "Iniciante";

    }

    document.getElementById("nivel").innerText = nivel;
}


const audioManager = new AudioManager();
audioManager.play();
