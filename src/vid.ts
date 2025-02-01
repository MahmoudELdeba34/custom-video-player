interface VideoPlayerOptions {
    container: string;
    sources: string[];
    skipTime?: number;
    preload?: 'auto' | 'metadata' | 'none';
    autoplay?: boolean;
    muted?: boolean;
    theme?: string;
    enableTheaterMode?: boolean;
    enableSpeedControl?: boolean;
    enableShortcuts?: boolean;
    enableNightMode?: boolean;
    enableSubtitles?: boolean;
    enablePictureInPicture?: boolean;
    enableVolumeControl?: boolean;
    enableTimer?: boolean;
    enablePlaylist?: boolean;
}
export default class VideoPlayer {
    private video: HTMLVideoElement;
    private options: VideoPlayerOptions;
    constructor(options: VideoPlayerOptions) {
        this.options = options;
        const containerElement = document.getElementById(options.container);
        if (!containerElement) throw new Error(`Container with ID "${options.container}" not found.`);
        this.video = document.createElement('video');
        this.setSource(options.sources[0]);
        this.video.preload = options.preload || 'auto';
        this.video.autoplay = options.autoplay || false;
        this.video.muted = options.muted || false;
        this.video.controls = false;
        if (options.theme) this.video.style.backgroundColor = options.theme;
        this.video.style.width = '100%';
        this.video.style.height = 'auto';
        containerElement.appendChild(this.video);
        this.createControls(containerElement);
    }
    private createControls(container: HTMLElement) {
        const controls = document.createElement('div');
        controls.classList.add('controls');
        const playPauseButton = this.createButton('fa fa-play', () => {
            this.video.paused ? this.video.play() : this.video.pause();
        });
        const skipForwardButton = this.createButton('fa fa-forward', () => {
            this.video.currentTime += this.options.skipTime || 5;
        });
        const skipBackwardButton = this.createButton('fa fa-backward', () => {
            this.video.currentTime -= this.options.skipTime || 5;
        });
        const fullscreenButton = this.createButton('fa fa-arrows-alt', () => {
            document.fullscreenElement ? document.exitFullscreen() : container.requestFullscreen();
        });
        controls.appendChild(skipBackwardButton);
        controls.appendChild(playPauseButton);
        controls.appendChild(skipForwardButton);
        controls.appendChild(fullscreenButton);
        container.appendChild(controls);
    }
    private createButton(iconClass: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add(...iconClass.split(' '));
        button.addEventListener('click', onClick);
        return button;
    }
    public changeSource(newSource: string) {
        this.video.src = newSource;
        this.video.load();
        this.video.play();
    }
}
