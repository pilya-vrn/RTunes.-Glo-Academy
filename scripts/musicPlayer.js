import { addZero } from './supScript.js'

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length -1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if (trackIndex) {
            trackIndex--;
        } else {
            trackIndex = playlist.length -1;
        }
        loadTrack();
    };

    audioNavigation.addEventListener('click', evt => {
        const target = evt.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = currentTime / duration * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

        audioProgress.addEventListener('click', evt => {
            const x = evt.offsetX;
            const allWidth = audioProgress.clientWidth;
            const progress = x / allWidth * audioPlayer.duration;
            audioPlayer.currentTime = progress;
        });
    });

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });
    audioPlayer.volume = 0.5;
    audioVolume.value = audioPlayer.volume * 100;
};
