const DEFAULT_VOLUME = 0.4;

let selectedAudio = null;

function AudioData(name, fileName, audioName, isCustom) {
    this.audio = new Audio(audioName);
    this.audio.volume = DEFAULT_VOLUME;

    var self = this;

    this.names = name;

    this.fileName = fileName;

    this.img = document.createElement("img");
    this.img.src = this.fileName + ".png";
    this.img.addEventListener("click", function() {self.toggle();}, false);
    this.img.addEventListener("mouseover", function() {self.onHover();}, false);
    this.img.addEventListener("mouseout", function() {self.onExit();}, false);
    document.getElementById("main").appendChild(this.img);

    this.edit = document.createElement("img");
    this.edit.src = "images/edit.png";
    this.edit.addEventListener("click", function() {selectSettings(self)}, false);
    document.getElementById("main").appendChild(this.edit);

    this.hasStart = false;
    this.hasEnd = false;
    this.isCustom = isCustom;

    this.start = null;
    this.end = null;

    this.previous = null;
    this.next = null;
}

AudioData.prototype.setStartTime = function(time) {
    let hour = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);
    // Extract the hours and minutes only. Seconds set to 0.
    this.start = new Date();
    this.start.setHours(hour);
    this.start.setMinutes(min);
    this.start.setSeconds(0);

    this.hasStart = true;
}

AudioData.prototype.setEndTime = function(time) {
    let hour = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);
    // Extract the hours and minutes only. Seconds set to 0.
    this.end = new Date();
    this.end.setHours(hour);
    this.end.setMinutes(min);
    this.end.setSeconds(0);

    this.hasEnd = true;
}

AudioData.prototype.toggle = function(){
    if (this.audio.paused) {
        this.audio.play();
    } else {
        this.audio.pause();
    }
}

AudioData.prototype.onHover = function(){
    this.img.src = this.fileName + "_hover.gif";
}

AudioData.prototype.onExit = function(){
    this.img.src = this.fileName + ".png";
}

AudioData.prototype.setVolume = function(volume){
    if (volume >= 0 && volume <= 1) {
        this.audio.volume = volume;
    }
}

function selectSettings(audioDevice) {
    selectedAudio = audioDevice;

    if (selectedAudio == null) {
        return;
    }

    if (!selectedAudio.isCustom) {
        document.getElementById("soundTxt").disabled = true;
        document.getElementById("nameTxt").disabled = true;
    } else {
        document.getElementById("soundTxt").disabled = false;
        document.getElementById("nameTxt").disabled = false;
    }

    if (!selectedAudio.hasStart) {
        document.getElementById("startTxt").value = "";
    } else {
        document.getElementById("startTxt").value = selectedAudio.start.getHours() + ":" + selectedAudio.start.getMinutes();
    }

    if (!selectedAudio.hasEnd) {
        document.getElementById("endTxt").value = "";
    } else {
        document.getElementById("startTxt").value = selectedAudio.end.getHours() + ":" + selectedAudio.end.getMinutes();
    }

    document.getElementById("nameTxt").value = selectedAudio.names;
    document.getElementById("volumeCtrl").value = selectedAudio.volume;
}