var btn = document.querySelector("#btn-converter");
var spanValorConvertido = document.querySelector("#span-valor-convertido")
var spanTaxa = document.querySelector("#span-taxa")
var spanDataCotacao = document.querySelector("#span-data-cotacao")
var spanResultadoConversao = document.querySelector("#span-resultado-conversao")
var campoInput = document.querySelector("#inputValor");


var resultadoTratado;

btn.addEventListener("click", converter)

function converter() {
    var moeda1 = document.querySelector('input[name=moeda1]:checked').value;
    var moeda2 = document.querySelector('input[name=moeda2]:checked').value;

    if (moeda1 != moeda2) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`);
        xhr.send();

        xhr.addEventListener("load", function() {
            var resultado = xhr.responseText;
            var resultadoJSON = JSON.parse(resultado)
            console.log(resultadoJSON)
            resultadoTratado = compararEscolhas(moeda1, moeda2, resultadoJSON);

            console.log(resultadoTratado)
            var resultadoFinal = calcularValorSolicitado(moeda1, moeda2)
            preencherCampos(resultadoTratado[0], resultadoFinal[1], resultadoFinal[0], resultadoTratado[1], resultadoTratado[2])


            campoInput.value=1;


        })
    } else {
        alert("Não é necessário convereter moedas iguais")
    }

}

function compararEscolhas(moeda1, moeda2, resultadoJSON) {
    let resultado;
    if ((moeda1 == "BRL") && (moeda2 == "USD")) {
        resultado = conventerRealDolar(resultadoJSON)
    }
    if ((moeda1 == "BRL") && (moeda2 == "EUR")) {
        resultado = conventerRealEuro(resultadoJSON)
    }
    if (moeda1 == moeda2) {
        resultado = "Moedas iguais não podem ser convertidas";
    }
    if ((moeda1 == "USD") && (moeda2 == "EUR")) {
        resultado = conventerDolarEuro(resultadoJSON)
    }
    if ((moeda1 == "USD") && (moeda2 == "BRL")) {
        resultado = conventerDolarReal(resultadoJSON)
    }
    if ((moeda1 == "EUR") && (moeda2 == "USD")) {
        resultado = conventerEuroDolar(resultadoJSON)
    }
    if ((moeda1 == "EUR") && (moeda2 == "BRL")) {
        resultado = conventerEuroReal(resultadoJSON)
    }

    return resultado;

}

function conventerRealDolar(resultadoJSON) {
    var nome = resultadoJSON.BRLUSD.name;
    var valor = resultadoJSON.BRLUSD.bid;
    var dataCotacao = resultadoJSON.BRLUSD.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function conventerRealEuro(resultadoJSON) {
    var nome = resultadoJSON.BRLEUR.name;
    var valor = resultadoJSON.BRLEUR.bid;
    var dataCotacao = resultadoJSON.BRLEUR.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function conventerDolarEuro(resultadoJSON) {
    var nome = resultadoJSON.USDEUR.name;
    var valor = resultadoJSON.USDEUR.bid;
    var dataCotacao = resultadoJSON.USDEUR.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function conventerDolarReal(resultadoJSON) {
    var nome = resultadoJSON.USDBRL.name;
    var valor = resultadoJSON.USDBRL.bid;
    var dataCotacao = resultadoJSON.USDBRL.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function conventerEuroDolar(resultadoJSON) {
    var nome = resultadoJSON.EURUSD.name;
    var valor = resultadoJSON.EURUSD.bid;
    var dataCotacao = resultadoJSON.EURUSD.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function conventerEuroReal(resultadoJSON) {
    var nome = resultadoJSON.EURBRL.name;
    var valor = resultadoJSON.EURBRL.bid;
    var dataCotacao = resultadoJSON.EURBRL.create_date;
    var informacoesMoeda = [nome, valor, dataCotacao]
    return informacoesMoeda;
}

function calcularValorSolicitado(moeda1, moeda2) {

    var inputValorEntrada = document.querySelector("#inputValor")
    var valorEntrada = inputValorEntrada.value;
    var valorConvertido = valorEntrada * resultadoTratado[1];
    valorEntrada = parseFloat(valorEntrada)

    var valoresFinais = []
    valoresFinais.push(valorEntrada.toLocaleString("pt-BR", { style: "currency", currency: moeda1 }))
    valoresFinais.push(valorConvertido.toLocaleString("pt-BR", { style: "currency", currency: moeda2 }))
    console.log(valoresFinais)
    return valoresFinais;
}

function preencherCampos(titulo, resultado, valorConvertido, taxa, data) {
    var tituloConversao = document.querySelector("#titulo-conversao");
    var resultadoConversao = document.querySelector("#resultado-conversao");
    tituloConversao.innerHTML = titulo;
    resultadoConversao.innerHTML = `${valorConvertido} = ${resultado}`;
    spanValorConvertido.innerHTML = `Valor convertido: ${valorConvertido}`;
    spanResultadoConversao.innerHTML = `Resultado da conversão: ${resultado}`;
    spanDataCotacao.innerHTML = `Data da cotação: ${data}`;
    spanTaxa.innerHTML = `Taxa de conversão: ${taxa}`;
}