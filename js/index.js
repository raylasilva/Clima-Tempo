"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sectionform");
    const input = document.getElementById("input");
    const sectionInfo = document.getElementById("tempInfo");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (!input || !sectionInfo)
            return;
        const localizacao = input.value.trim();
        if (localizacao.length < 3) {
            console.log("nao encontrei");
            alert("O local não existe ou não foi encontrado");
            return;
        }
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=d0bc0d8c05ec59cc2504870d022d8d5f&units=metric&lang=pt_br`);
            const data = yield response.json();
            console.log(data);
            console.log("pfvr funcione");
            const infos = {
                descricao: data.weather[0].description,
                local: data.name,
                icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                temperatura: data.main.temp,
            };
            sectionInfo.innerHTML = `
      <center>
      <h2>${infos.local}</h2>
      <h2 style="color:rgb(148, 148, 148);">${infos.temperatura}°C</h2>
      <h5>${infos.descricao}</h5>  
      <img src="${infos.icone}" alt="${infos.descricao}" />   
    `;
        }
        catch (error) {
            console.error("Erro ao consumir a API:", error);
            alert("Houve um erro ao buscar as informações. Tente novamente.");
        }
    }));
});
