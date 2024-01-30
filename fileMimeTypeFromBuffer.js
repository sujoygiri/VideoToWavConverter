export default function getFileMimeTypeFromBuffer(fileBuffer){
    const uint8Arr = new Uint8Array(fileBuffer);
    const len = 4;
    if(uint8Arr.length >= len){
        let signatureArr = new Array(len);
        for(let index = 0; index < len; ++index){
            signatureArr[index] = (new Uint8Array(fileBuffer))[index].toString(16)
        }
        const signature = signatureArr.join('').toUpperCase();
        return signature === '00020';
    }
}