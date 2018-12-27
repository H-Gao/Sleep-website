const name = document.getElementById("nameTxt");
const sound = document.getElementById("soundTxt");
const volume = document.getElementById("volumeCtrl");
const start = document.getElementById("startTxt");
const end = document.getElementById("endTxt");

name.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.name = name.value;
    }
});

sound.addEventListener("change", function() {
    if (selectedAudio != null) {
        selectedAudio.audio = new Audio(sound.value);
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

document.getElementById("addmore").addEventListener("click", function() {
    audioList.add('', 'images/custom', '', true);
});

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