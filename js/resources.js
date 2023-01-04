class Resources {
    constructor(globals) {
        this.IMAGE_MAXIMUM_LOADING_TIME = 1000;
        this.AUDIO_MAXIMUM_LOADING_TIME = 1000;
        this.VIDEO_MAXIMUM_LOADING_TIME = 1000;
        this.imagesLoaded = false;
        this.audiosLoaded = false;
        this.videosLoaded = false;
        this.globals = globals;
        this.images = [];
        this.audios = [];
        this.videos = [];
        this.imagePaths = [];
        this.audioPaths = [];
        this.videoPaths = [];
        this.imagePromises = [];
        this.audioPromises = [];
        this.videoPromises = [];
    }
    init() {
    }
    addImage(imagePath) {
        const imageElement = this.globals.document.createElement("img");
        imageElement.src = imagePath;
        this.images.push(imageElement);
        this.imagePaths.push(imagePath);
    }
    addAudio(audioPath) {
        const audioElement = this.globals.document.createElement("audio");
        audioElement.src = audioPath;
        this.audios.push(audioElement);
        this.audioPaths.push(audioPath);
    }
    addVideo(videoPath) {
        const videoElement = this.globals.document.createElement("video");
        videoElement.src = videoPath;
        this.videos.push(videoElement);
        this.videoPaths.push(videoPath);
    }
    makeImagePromise(image) {
        return new Promise((resolve, reject) => {
            image.addEventListener("load", () => {
                resolve(0);
            });
            this.globals.window.setTimeout(() => {
                reject("Couldn't load image " + image.src + " in " + this.IMAGE_MAXIMUM_LOADING_TIME + " milliseconds.");
            }, this.IMAGE_MAXIMUM_LOADING_TIME);
        });
    }
    makeAudioPromise(audio) {
        return new Promise((resolve, reject) => {
            audio.addEventListener("load", () => {
                resolve(0);
            });
            this.globals.window.setTimeout(() => {
                reject("Couldn't load audio " + audio.src + " in " + this.AUDIO_MAXIMUM_LOADING_TIME + " milliseconds.");
            }, this.AUDIO_MAXIMUM_LOADING_TIME);
        });
    }
    makeVideoPromise(video) {
        return new Promise((resolve, reject) => {
            video.addEventListener("load", () => {
                resolve(0);
            });
            this.globals.window.setTimeout(() => {
                reject("Couldn't load video " + video.src + " in " + this.VIDEO_MAXIMUM_LOADING_TIME + " milliseconds.");
            }, this.VIDEO_MAXIMUM_LOADING_TIME);
        });
    }
    loadImages() {
        for (let i = 0; i < this.images.length; i++) {
            this.imagePromises.push(this.makeImagePromise(this.images[i]));
        }
        return Promise.all(this.imagePromises);
    }
    loadAudios() {
        for (let i = 0; i < this.audios.length; i++) {
            this.audioPromises.push(this.makeAudioPromise(this.audios[i]));
        }
        return Promise.all(this.audios);
    }
    loadVideos() {
        for (let i = 0; i < this.videos.length; i++) {
            this.videoPromises.push(this.makeVideoPromise(this.videos[i]));
        }
        return Promise.all(this.videos);
    }
    loadResources() {
        const totalImagePromise = this.loadImages();
        const totalAudioPromise = this.loadAudios();
        const totalVideoPromise = this.loadVideos();
        totalImagePromise
            .then((value) => {
            this.imagesLoaded = true;
        }, (value) => {
            this.globals.console.log("[RESOURCES]: Image(s) failed to load.", value);
        });
        totalAudioPromise
            .then((value) => {
            this.audiosLoaded = true;
        }, (value) => {
            this.globals.console.log("[RESOURCES]: Audio(s) failed to load.", value);
        });
        totalVideoPromise
            .then((value) => {
            this.videosLoaded = true;
        }, (value) => {
            this.globals.console.log("[RESOURCES]: Video(s) failed to load.", value);
        });
        return Promise.all([totalImagePromise, totalAudioPromise, totalVideoPromise]);
    }
    getImage(imagePath) {
        if (this.imagesLoaded) {
            for (let i = 0; i < this.images.length; i++) {
                if (this.imagePaths[i] === imagePath) {
                    return this.images[i];
                }
            }
        }
        this.globals.console.log("[RESOURCES]: Couldn't get image " + imagePath + ". Returning empty image.");
        return this.globals.document.createElement("img");
    }
    getAudio(audioPath) {
        if (this.audiosLoaded) {
            for (let i = 0; i < this.audios.length; i++) {
                if (this.audioPaths[i] === audioPath) {
                    return this.audios[i];
                }
            }
        }
        this.globals.console.log("[RESOURCES]: Couldn't get audio " + audioPath + ". Returning empty audio.");
        return this.globals.document.createElement("audio");
    }
    getVideo(videoPath) {
        if (this.videosLoaded) {
            for (let i = 0; i < this.videos.length; i++) {
                if (this.videoPaths[i] === videoPath) {
                    return this.videos[i];
                }
            }
        }
        this.globals.console.log("[RESOURCES]: Couldn't get video " + videoPath + ". Returning empty video.");
        return this.globals.document.createElement("video");
    }
}
export { Resources };
