iniciarApp();

/* =========================
   INICIALIZAÇÃO
   ========================= */
function iniciarApp() {
    const btn = document.querySelector("#btnAnalisador");
    btn.addEventListener("click", analisarCorrida);
}

/* =========================
   FLUXO PRINCIPAL
   ========================= */
function analisarCorrida() {
    const dados = obterDados();

    if (!validarDados(dados)) return;

    const calculo = calcularCorrida(dados);
    const status = classificarCorrida(calculo);

    renderizarResultado(calculo, dados, status);
}

/* =========================
        ENTRADA DE DADOS
   ========================= */
function obterDados() {
    return {
        distanciaKm: Number(document.querySelector("#distanciaKm").value),
        tempoMinutos: Number(document.querySelector("#tempoMinutos").value),
        valorCorrida: Number(document.querySelector("#valorCorrida").value)
    };
}

/* =========================
        VALIDAÇÃO
   ========================= */
function validarDados({ distanciaKm, tempoMinutos, valorCorrida }) {
    const resultadoElement = document.querySelector("#resultado");

    if (!distanciaKm || !tempoMinutos || !valorCorrida) {
        resultadoElement.textContent = "Preencha todos os campos corretamente.";
        return false;
    }

    if (distanciaKm <= 0 || tempoMinutos <= 0 || valorCorrida <= 0) {
        resultadoElement.textContent = "Os valores devem ser maiores que zero.";
        return false;
    }

    return true;
}

/* =========================
        CÁLCULOS
   ========================= */
function calcularCorrida(dados) {
    return {
        valorPorKm: dados.valorCorrida / dados.distanciaKm,
        valorPorHora: dados.valorCorrida / (dados.tempoMinutos / 60)
    };
}

/* =========================
        REGRAS DE NEGÓCIO
   ========================= */
function classificarCorrida(calculo) {
    const minKm = 1.7;
    const minHora = 30;

    if (calculo.valorPorKm >= minKm && calculo.valorPorHora >= minHora) {
        return "boa";
    }

    if (calculo.valorPorKm >= minKm || calculo.valorPorHora >= minHora) {
        return "aceitavel";
    }

    return "ruim";
}

/* =========================
        FORMATAÇÃO
   ========================= */
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}

function formatarKm(km) {
    return `${km.toFixed(2)} km`;
}

function formatarTempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;

    return horas > 0
        ? `${horas}h ${min}min`
        : `${min}min`;
}

/* =========================
        INTERFACE (DOM)
   ========================= */
function renderizarResultado(calculo, dados, status) {
    const resultadoElement = document.querySelector("#resultado");

    resultadoElement.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card", status);

    const titulo = document.createElement("p");
    titulo.innerHTML = `<strong>${status.toUpperCase()}</strong>`;

    const km = document.createElement("p");
    km.textContent = `R$/km: ${formatarMoeda(calculo.valorPorKm)}`;

    const hora = document.createElement("p");
    hora.textContent = `R$/hora: ${formatarMoeda(calculo.valorPorHora)}`;

    const tempo = document.createElement("p");
    tempo.textContent = `Tempo: ${formatarTempo(dados.tempoMinutos)}`;

    const distancia = document.createElement("p");
    distancia.textContent = `Distância: ${formatarKm(dados.distanciaKm)}`;

    card.append(titulo, km, hora, tempo, distancia);
    resultadoElement.appendChild(card);
}