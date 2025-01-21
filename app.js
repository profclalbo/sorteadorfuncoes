let participantes = [];
const funcoes = [
  "Monitor de recursos",
  "Harmonizador",
  "Facilitador",
  "Repórter",
  "Controlador do tempo"
];

function adicionarParticipante() {
  const input = document.getElementById("input-participante");
  const nome = input.value.trim();

  if (nome && !participantes.includes(nome)) {
    participantes.push(nome);
    atualizarListaParticipantes();
    input.value = "";
  } else {
    alert("Nome inválido ou já adicionado.");
  }
}

function atualizarListaParticipantes() {
  const lista = document.getElementById("lista-participantes");
  lista.innerHTML = participantes.map(nome => `<li>${nome}</li>`).join("");
}

function reiniciar() {
  participantes = []; // Limpa o array de participantes
  document.getElementById("lista-participantes").innerHTML = ""; // Limpa a lista de participantes
  document.getElementById("lista-funcoes").innerHTML = ""; // Limpa a lista de funções atribuídas
  const input = document.getElementById("input-participante");
  input.value = ""; // Limpa o campo de entrada
  alert("Todos os dados foram reiniciados!");
}

function shuffleArray(array) {
  // Algoritmo de Fisher-Yates para embaralhar
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortearFuncoes() {
  if (participantes.length < 4) {
    alert("Adicione pelo menos 4 participantes.");
    return;
  }

  const listaFuncoes = document.getElementById("lista-funcoes");
  listaFuncoes.innerHTML = ""; // Limpa a lista anterior

  const sorteio = shuffleArray([...participantes]); // Embaralha os participantes
  const resultado = [];

  if (participantes.length === 4) {
    // Seleciona um participante para acumular funções
    const acumulador = sorteio.shift(); // Remove o primeiro participante

    // Adiciona funções com a lógica específica
    resultado.push(`${funcoes[0]} e ${funcoes[1]}: ${acumulador}`); // Monitor e Harmonizador
    resultado.push(`${funcoes[2]}: ${sorteio[0]}`); // Facilitador
    resultado.push(
      `<li class="reporter-highlight">${funcoes[3]}: ${sorteio[1]}</li>` // Repórter com classe
    );
    resultado.push(`${funcoes[4]}: ${sorteio[2]}`); // Controlador do Tempo
  } else {
    // Distribui funções normalmente para 5 ou mais participantes
    funcoes.forEach((funcao, index) => {
      if (index < sorteio.length) {
        if (funcao === "Repórter") {
          resultado.push(
            `<li class="reporter-highlight">${funcao}: ${sorteio[index]}</li>` // Adiciona a classe
          );
        } else {
          resultado.push(`${funcao}: ${sorteio[index]}`);
        }
      }
    });
  }

  listaFuncoes.innerHTML = resultado
    .map(item => (item.includes("<li") ? item : `<li>${item}</li>`))
    .join("");
}
