import getFileMimeTypeFromBuffer from "./fileMimeTypeFromBuffer.js";
import audioBufferToWav from "./rawAudioBufferToWavBuffer.js";
import getRawAudioBuffer from "./videoToRawAudioBuffer.js";


(function () {
    const inputVideoFileNode = document.getElementById("input-video-file");
    inputVideoFileNode.addEventListener("input", (event) => {
        const inputVideoFile = event.target.files[0];
        inputVideoFile && inputVideoFile.arrayBuffer().then((fileBuffer) => {
            if (getFileMimeTypeFromBuffer(fileBuffer)) {
                getRawAudioBuffer(fileBuffer).then((audioBuffer) => {
                    const wavAudioArrayBuffer = audioBufferToWav(audioBuffer);
                    let blob = new Blob([wavAudioArrayBuffer], { type: 'audio/wav' });
                    let urlObject = URL.createObjectURL(blob);
                    let aTag = document.createElement("a");
                    aTag.href = urlObject;
                    aTag.download = inputVideoFile.name.split('.')[0] + '.wav';
                    aTag.click();
                });
            } else {
                alert("Currently we don't support this type of file.")
            }
            // audioContext.decodeAudioData(fileBuffer)
        }).catch(error => {
            console.log(error);
        });
    });

    if (globalThis.Worker) {
        const worker = new Worker('./converter.js', { type: 'module', credentials: 'same-origin' });

    } else {

    }
})();