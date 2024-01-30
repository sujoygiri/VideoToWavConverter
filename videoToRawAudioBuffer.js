export default function getRawAudioBuffer(fileBuffer) {
    const sampleRate = 16000;
    const numberOfChannels = 1;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return audioContext.decodeAudioData(fileBuffer)
    /**
     * .then((audioBuffer)=>{
        let duration = audioBuffer.duration;
        const offlineAudioContext = new OfflineAudioContext(numberOfChannels,sampleRate*duration,sampleRate)
        const soundSource = offlineAudioContext.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.connect(offlineAudioContext.destination)
        soundSource.start()
        offlineAudioContext.startRendering().then((renderedAudioBuffer) => {
            console.log(renderedAudioBuffer);
        })
    })
     */
}