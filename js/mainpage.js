const name = document.getElementById("nameTxt");
const sound = document.getElementById("soundTxt");
const volume = document.getElementById("volumeCtrl");
const start = document.getElementById("startTxt");
const end = document.getElementById("endTxt");
const dim = document.getElementById("dim");
const dimmer = document.getElementById("dimmer");

name.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.name = name.value;
    }
});

sound.addEventListener("change", function() {
    if (selectedAudio != null) {
        alert(sound.files[0]);
        selectedAudio.audio = new Audio(URL.createObjectURL(sound.files[0]));
    }
});

volume.addEventListener("input", function() {
    if (selectedAudio != null) {
        selectedAudio.setVolume(volume.value);
    }
});

start.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.setStartTime(start.value);
    }
});

end.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.setEndTime(start.value);
    }
});

end.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.setEndTime(start.value);
    }
});

dim.addEventListener("click", function() {
    toggleDim();
});

dimmer.addEventListener("click", function() {
    toggleDim();
});

document.getElementById("addmore").addEventListener("click", function() {
    audioList.add('', 'images/custom', '', true);
});

name.disabled = true;
sound.disabled = true;
volume.disabled = true;
start.disabled = true;
end.disabled = true;

var audioList = new AudioList();
audioList.add('rain', 'images/icon', 'sounds/rain.mp3', false);
audioList.add('leaves', 'images/icon', 'sounds/leaves.mp3', false);

setInterval(checkTime, 500);

function checkTime() {
    var date = new Date();

    var curr = audioList.head;

    for (i = 0;i < audioList._length;++i) {
        if (curr.hasStart && date.getTime() >= curr.start.getTime()) {
            curr.audio.play();
            curr.start.setDate(curr.start.getDate() + 1);
        }

        if (curr.hasEnd && date.getTime() >= curr.end.getTime()) {
            curr.audio.pause();
            curr.end.setDate(curr.end.getDate() + 1);
        }

        curr = curr.next;
    }
}

function toggleDim() {
    if (dimmer.style.display == "block") {
        dimmer.style.display = "none";
    } else {
        dimmer.style.display = "block";
    }
}

/*loadDoc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:8080/", true);
    xhttp.send();
}*/