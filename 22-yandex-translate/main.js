const KEY = 'trnsl.1.1.20181014T132211Z.26709f931010ac46.ae8028e69c50b075ab81f6ae41b6634f2c759779';

const urlLangs = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + KEY + '&ui=ru';
const urlTranslate = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + KEY;

window.onload = () => {
    fetch(urlLangs)
        .then(res => res.json())
        .then(data => {
            for(let key in data.langs) {
                document.querySelector('#insert-lang').innerHTML 
                    += "<option value=" + key  + ">" + key + ' - ' + data.langs[key] + "</option>";
                document.querySelector('#translate-lang').innerHTML 
                    += "<option value=" + key  + ">" + key + ' - ' + data.langs[key] + "</option>";
            }
        })
        .catch(err => console.log(err));
};

function translateText(){
    const text = document.querySelector('#insert-text').value;
    const insSelect = document.querySelector('#insert-lang');
    const insL = insSelect.options[insSelect.selectedIndex].value;
    const traSelect = document.querySelector('#translate-lang');
    const traL = traSelect.options[traSelect.selectedIndex].value;

    if (text != null && text != '') {
        fetch(urlTranslate + '&text=' + text + '&lang=' + insL + '-' + traL)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#translate-text').value = data.text[0];
        })
        .catch(err => console.log(err));
    }     
}
