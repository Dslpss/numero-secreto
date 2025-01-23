let listaDeNumerosSorteados = [];
let numeroLimete = 10;
// Gera um número aleatório entre 1 e 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto em um elemento HTML específico
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

// Exibe o título e a instrução do jogo na tela
function mensagemIncial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
mensagemIncial();

// Função para verificar o chute do usuário
function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentivas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
    document.getElementById("reiniciar").removeAttribute("disabled");

    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", mensagemTentivas);
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

// Função para gerar um número aleatório entre 1 e 10
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimete + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimete) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

// Função para limpar o campo de entrada do usuário
function limparCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemIncial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
