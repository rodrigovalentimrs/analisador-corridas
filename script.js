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

    const valores = [distanciaKm, tempoMinutos, valorCorrida];

    const temErro = valores.some(valor => isNaN(valor) || valor <= 0);

    if (temErro) {
        resultadoElement.textContent = "Preencha os campos corretamente com valores válidos e maiores que zero";
        return false;
    }

    return true;
}

/* =========================
   CÁLCULOS
   ========================= */
function calcularCorrida(dados) {
    const { distanciaKm, tempoMinutos, valorCorrida } = dados;

    return {
        valorPorKm: valorCorrida / distanciaKm,
        valorPorHora: valorCorrida / (tempoMinutos / 60)
    };
}

/* =========================
   REGRAS DE NEGÓCIO
   ========================= */
function classificarCorrida(calculo) {
    const regras = {
        boa: {
            km: 2.0,
            hora: 40
        },
        aceitavel: {
            km: 1.7,
            hora: 30
        }
    };

    const { valorPorKm, valorPorHora } = calculo;

    if (valorPorKm >= regras.boa.km && valorPorHora >= regras.boa.hora) {
        return "boa";
    }

    if (valorPorKm >= regras.aceitavel.km && valorPorHora >= regras.aceitavel.hora) {
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
    return `${Number(km).toFixed(2)} km`;
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
    const strong = document.createElement("strong");
    strong.textContent = status.toUpperCase();
    titulo.appendChild(strong);

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