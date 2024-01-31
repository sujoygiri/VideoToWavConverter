import getFileMimeTypeFromBuffer from "./fileMimeTypeFromBuffer.js";

(function () {
    self.onmessage = (event) => {
        let [messageData,message] = event.data;
        switch (message) {
            case 'send_file':
                messageData.arrayBuffer().then((fileBuffer)=>{
                    let isValidMimeType = getFileMimeTypeFromBuffer(fileBuffer);
                    self.postMessage([fileBuffer,isValidMimeType],{transfer:[fileBuffer]});  
                });
                break;
            case 'send_raw_audio_buffer':
                console.log(messageData);
                break;
            default:
                break;
        }
        // console.log(messageData);
        // self.postMessage(fileBuffer,{transfer:[fileBuffer]})

        
    }
})()