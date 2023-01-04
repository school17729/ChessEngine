import { Globals } from "./globals.js";

class Resources {

    IMAGE_MAXIMUM_LOADING_TIME: number = 1000;
    AUDIO_MAXIMUM_LOADING_TIME: number = 1000;
    VIDEO_MAXIMUM_LOADING_TIME: number = 1000;
    
    globals: Globals;
    images: HTMLImageElement[];
    audios: HTMLAudioElement[];
    videos: HTMLVideoElement[];

    imagePaths: string[];
    audioPaths: string[];
    videoPaths: string[];

    imagePromises: Promise<any>[];
    audioPromises: Promise<any>[];
    videoPromises: Promise<any>[];

    imagesLoaded: boolean = false;
    audiosLoaded: boolean = false;
    videosLoaded: boolean = false;
    
    constructor(globals: Globals) {
        this.globals = globals;
        this.images = [] as HTMLImageElement[];
        this.audios = [] as HTMLAudioElement[];
        this.videos = [] as HTMLVideoElement[];

        this.imagePaths = [] as string[];
        this.audioPaths = [] as string[];
        this.videoPaths = [] as string[];

        this.imagePromises = [] as Promise<any>[];
        this.audioPromises = [] as Promise<any>[];
        this.videoPromises = [] as Promise<any>[];
    }

    init(): void {
        
    }

    addImage(imagePath: string): void {
        const imageElement: HTMLImageElement = this.globals.document.createElement("img");
        imageElement.src = imagePath;

        this.images.push(imageElement);
        this.imagePaths.push(imagePath);
    }

    addAudio(audioPath: string): void {
        const audioElement: HTMLAudioElement = this.globals.document.createElement("audio");
        audioElement.src = audioPath;

        this.audios.push(audioElement);
        this.audioPaths.push(audioPath);
    }

    addVideo(videoPath: string): void {
        const videoElement: HTMLVideoElement = this.globals.document.createElement("video");
        videoElement.src = videoPath;

        this.videos.push(videoElement);
        this.videoPaths.push(videoPath);
    }

    makeImagePromise(image: HTMLImageElement): Promise<any> {
        
        return new Promise(
                (
                    resolve: (value: any) => void,
                    reject: (value: any) => void
                ): void => {
                    image.addEventListener("load", (): void => {
                        resolve(0);
                    });
                    this.globals.window.setTimeout((): void => {
                        reject("Couldn't load image " + image.src + " in " + this.IMAGE_MAXIMUM_LOADING_TIME + " milliseconds.");
                    }, this.IMAGE_MAXIMUM_LOADING_TIME);
                }
            );
        
    }

    makeAudioPromise(audio: HTMLAudioElement): Promise<any> {
        
        return new Promise(
                (
                    resolve: (value: any) => void,
                    reject: (value: any) => void
                ): void => {
                    audio.addEventListener("load", (): void => {
                        resolve(0);
                    });
                    this.globals.window.setTimeout((): void => {
                        reject("Couldn't load audio " + audio.src + " in " + this.AUDIO_MAXIMUM_LOADING_TIME + " milliseconds.");
                    }, this.AUDIO_MAXIMUM_LOADING_TIME);
                }
            );
        
    }

    makeVideoPromise(video: HTMLVideoElement): Promise<any> {
        
        return new Promise(
                (
                    resolve: (value: any) => void,
                    reject: (value: any) => void
                ): void => {
                    video.addEventListener("load", (): void => {
                        resolve(0);
                    });
                    this.globals.window.setTimeout((): void => {
                        reject("Couldn't load video " + video.src + " in " + this.VIDEO_MAXIMUM_LOADING_TIME + " milliseconds.");
                    }, this.VIDEO_MAXIMUM_LOADING_TIME);
                }
            );
        
    }

    loadImages(): Promise<any> {
        for (let i: number = 0; i < this.images.length; i++) {
            this.imagePromises.push(this.makeImagePromise(this.images[i]));
        }
        
        return Promise.all(this.imagePromises);
    }

    loadAudios(): Promise<any> {
        for (let i: number = 0; i < this.audios.length; i++) {
            this.audioPromises.push(this.makeAudioPromise(this.audios[i]));
        }
        
        return Promise.all(this.audios);
    }

    loadVideos(): Promise<any> {
        for (let i: number = 0; i < this.videos.length; i++) {
            this.videoPromises.push(this.makeVideoPromise(this.videos[i]));
        }
        
        return Promise.all(this.videos);
    }

    loadResources(): Promise<any> {

        const totalImagePromise: Promise<any> = this.loadImages();
        const totalAudioPromise: Promise<any> = this.loadAudios();
        const totalVideoPromise: Promise<any> = this.loadVideos();
        
        totalImagePromise
            .then((value: any): void => {
                this.imagesLoaded = true;
            }, (value: any): void => {
                this.globals.console.log("[RESOURCES]: Image(s) failed to load.", value);
            });
        totalAudioPromise
            .then((value: any): void => {
                this.audiosLoaded = true;
            }, (value: any): void => {
                this.globals.console.log("[RESOURCES]: Audio(s) failed to load.", value);
            });
        totalVideoPromise
            .then((value: any): void => {
                this.videosLoaded = true;
            }, (value: any): void => {
                this.globals.console.log("[RESOURCES]: Video(s) failed to load.", value);
            });

        return Promise.all([totalImagePromise, totalAudioPromise, totalVideoPromise]);
    }

    getImage(imagePath: string): HTMLImageElement {
        if (this.imagesLoaded) {
            for (let i: number = 0; i < this.images.length; i++) {
                if (this.imagePaths[i] === imagePath) {
                    return this.images[i];
                }
            }
        }
        this.globals.console.log("[RESOURCES]: Couldn't get image " + imagePath + ". Returning empty image.");
        return this.globals.document.createElement("img");
    }

    getAudio(audioPath: string): HTMLAudioElement {
        if (this.audiosLoaded) {
            for (let i: number = 0; i < this.audios.length; i++) {
                if (this.audioPaths[i] === audioPath) {
                    return this.audios[i];
                }
            }
        }
        this.globals.console.log("[RESOURCES]: Couldn't get audio " + audioPath + ". Returning empty audio.");
        return this.globals.document.createElement("audio");
    }

    getVideo(videoPath: string): HTMLVideoElement {
        if (this.videosLoaded) {
            for (let i: number = 0; i < this.videos.length; i++) {
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