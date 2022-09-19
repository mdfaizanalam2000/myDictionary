let input = document.getElementById("exampleInput1");
let search = document.getElementById("submit");
let notFound = document.getElementById("not_found");
let dict = document.getElementById("def");
let audioPlayer = document.querySelector(".audio");
let loading = document.querySelector(".loading");
let heading = document.querySelector("h5");

search.addEventListener("click", (e) => {
    e.preventDefault();

    //clear old data
    audioPlayer.innerHTML = "";
    notFound.innerHTML = "";
    dict.innerText = "";

    //get input value
    let word = input.value;
    if (word == '') {
        return;
    }
    getData(word);
})

async function getData(word) {
    loading.style.display = "block";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const data = await response.json();

    //invalid input
    if (data.title == "No Definitions Found") {
        loading.style.display = "none";
        notFound.innerHTML = data.message;
        return;
    }

    //meaning found
    heading.style.display = "block";
    let meaning = data[0].meanings[0].definitions[0];
    dict.innerText = meaning.definition;
    dict.style.display = "block";

    //pronunciation
    let sound = data[0].phonetics[0].audio;
    if (sound != "") {
        pronounce(sound);
    }
    loading.style.display = "none";
}

pronounce = (sound) => {
    let audio = document.createElement("audio");
    audioPlayer.innerHTML = "<i>Pronunciation</i>:-<br>";
    audio.src = sound;
    audio.controls = true;
    audioPlayer.appendChild(audio);
}