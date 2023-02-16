const ui = new UI();

for (let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    ui.fromLang.insertAdjacentHTML("beforeend", option);
    ui.toLang.insertAdjacentHTML("beforeend", option);

    ui.fromLang.value = "tr";
    ui.toLang.value = "en";
}