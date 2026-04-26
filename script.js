const btn = document.querySelector("#btnAnalisador");

btn.addEventListener("click", analisarCorrida);

function analisarCorrida(){

    const km = Number(document.querySelector("#km").value);
    const tempo = Number(document.querySelector("#tempo").value);
    const valor = Number(document.querySelector("#valor").value);

    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    // validação
    if (km <= 0 || tempo <= 0 || valor <= 0) {
        resultado.innerHTML = "<p>Preencha os dados corretamente.</p>";
        return;
    }

    // cálculos
    const valorPorKm = valor / km;
    const valorPorHora = valor / (tempo / 60);

    // parâmetros internos (ajuste aqui se quiser)
    const minKm = 1.7;
    const minHora = 30;

    // decisão
    let status = "";

    if (valorPorKm >= minKm && valorPorHora >= minHora) {
        status = "BOA";
    } else if (valorPorKm >= minKm || valorPorHora >= minHora) {
        status = "ACEITÁVEL";
    } else {
        status = "RUIM";
    }

    // card
    const card = document.createElement("div");
    card.className = `card ${status.toLowerCase()}`;

    card.innerHTML = `
        <p><strong>${status}</strong></p>
        <p>R$/km: ${valorPorKm.toFixed(2)}</p>
        <p>R$/hora: ${valorPorHora.toFixed(2)}</p>
    `;

    resultado.appendChild(card);
}