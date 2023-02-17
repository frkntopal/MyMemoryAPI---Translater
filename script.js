const ui = new UI();

for (let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    ui.fromLang.insertAdjacentHTML("beforeend", option);
    ui.toLang.insertAdjacentHTML("beforeend", option);

    ui.fromLang.value = "tr-TR";
    ui.toLang.value = "en-GB";
}

ui.btnTranslate.addEventListener("click", () => {
    let text = ui.fromText.value;
    let from = ui.fromLang.value;
    let to = ui.toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            ui.toText.value = data.responseData.translatedText;
        });
});

ui.exchange.addEventListener("click", () => {
    let text = ui.fromText.value;
    ui.fromText.value = ui.toText.value;
    ui.toText.value = text

    let lang = ui.fromLang.value;
    ui.fromLang.value = ui.toLang.value;
    ui.toLang.value = lang;
})

for (let icon of ui.icons) {
    icon.addEventListener("click", (element) => {
        if (element.target.classList.contains("fa-copy")) {
            if (element.target.id == "from") {
                navigator.clipboard.writeText(ui.fromText.value);
            } else {
                navigator.clipboard.writeText(ui.toText.value);
            }
        } else {
            let utterance;
            if (element.target.id == "from") {
                utterance = new SpeechSynthesisUtterance(ui.fromText.value);
                utterance.lang = ui.fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(ui.toText.value);
                utterance.lang = ui.toLang.value;
            }

            speechSynthesis.speak(utterance); // Call Speech Api
        }

    })
}