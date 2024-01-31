import getFileMimeTypeFromBuffer from "./fileMimeTypeFromBuffer.js";
import audioBufferToWav from "./rawAudioBufferToWavBuffer.js";
import getRawAudioBuffer from "./videoToRawAudioBuffer.js";


(function () {
    const inputVideoFileNode = document.getElementById("input-video-file");
    const downloadSectionNode = document.querySelector(".download-section");
    const videoFileNameNode = document.getElementById("video-file-name");
    const actionButtonNode = document.getElementById("action-btn");

    let inputVideoFile = null;
    let urlObject = null;

    inputVideoFileNode.addEventListener("change", (event) => {
        inputVideoFile = event.target.files[0];
        if (inputVideoFile) {
            downloadSectionNode.style.display = 'block';
            videoFileNameNode.innerText = inputVideoFile.name;
            actionButtonNode.innerText = 'Convert To Wav';
        }else{
            downloadSectionNode.style.display = 'none';
        }
    });

    actionButtonNode.addEventListener("click", async () => {
        const fileBuffer = await inputVideoFile.arrayBuffer();
        if (actionButtonNode.innerText === "Download") {
            let aTag = document.createElement("a");
            aTag.href = urlObject;
            aTag.download = inputVideoFile.name.split('.')[0] + '.wav';
            aTag.click();
        } else {
            actionButtonNode.innerText = 'Converting...';
            actionButtonNode.setAttribute("disabled","true")
            inputVideoFileNode.setAttribute("disabled","true")
            if (getFileMimeTypeFromBuffer(fileBuffer)) {
                const audioBuffer = await getRawAudioBuffer(fileBuffer);
                const wavAudioArrayBuffer = audioBufferToWav(audioBuffer);
                let blob = new Blob([wavAudioArrayBuffer], { type: 'audio/wav' });
                urlObject = URL.createObjectURL(blob);
                actionButtonNode.innerText = "Download"
                actionButtonNode.removeAttribute("disabled")
                inputVideoFileNode.removeAttribute("disabled")
            } else {
                alert("Currently we don't support this type of file.");
            }
        }
    });

})();