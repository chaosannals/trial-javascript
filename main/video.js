function getCurrentFrame(video) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
}

function getCurrentFrameFrom(file, currentTime = 1) {
    return new Promise((resolve, reject) => {
        var video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.onloadeddata = () => {
            video.onseeked = () => {
                resolve(getCurrentFrame(video));
            }
            video.currentTime = currentTime;
        }
        video.onerror = (e) => {
            reject(e);
        }
    });
}
