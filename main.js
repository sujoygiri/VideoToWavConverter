import getFileMimeTypeFromBuffer from "./fileMimeTypeFromBuffer.js";
import getRawAudioBuffer from "./videoToRawAudioBuffer.js";


(function (){
    const inputVideoFileNode = document.getElementById("input-video-file");
    inputVideoFileNode.addEventListener("input",(event) => {
        const inputVideoFile = event.target.files[0];
        inputVideoFile && inputVideoFile.arrayBuffer().then((fileBuffer) => {
            if(getFileMimeTypeFromBuffer(fileBuffer)){
                getRawAudioBuffer(fileBuffer);
            }else{

            }
            // audioContext.decodeAudioData(fileBuffer)
        }).catch(error => {
            console.log(error);
        })
    })

    if(globalThis.Worker){
        const worker = new Worker('./converter.js',{type:'module',credentials:'same-origin'})
        
    }else{

    }
})()