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

function sortearFuncoes() {
  if (participantes.length < 4) {
    alert("Adicione pelo menos 4 participantes.");
    return;
  }

  const listaFuncoes = document.getElementById("lista-funcoes");
  listaFuncoes.innerHTML = "";

  const sorteio = [...participantes];
  const resultado = [];

  if (participantes.length === 4) {
    resultado.push(
      `Monitor de recursos e Harmonizador: ${sorteio.splice(
        Math.floor(Math.random() * sorteio.length),
        1
      )}`
    );
  }

  funcoes.forEach(funcao => {
    if (sorteio.length > 0) {
      const participanteSorteado = sorteio.splice(
        Math.floor(Math.random() * sorteio.length),
        1
      )[0];
      resultado.push(`${funcao}: ${participanteSorteado}`);
    }
  });

  listaFuncoes.innerHTML = resultado.map(item => `<li>${item}</li>`).join("");
}

function reiniciar() {
  participantes = [];
  document.getElementById("lista-participantes").innerHTML = "";
  document.getElementById("lista-funcoes").innerHTML = "";
}
