import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_PROGRESS_KEY = 'videoplayer-current-time';

const setCurrentTimeVideo = evt => {
  const stringifyData = JSON.stringify(evt);

  localStorage.setItem(TIME_PROGRESS_KEY, stringifyData);
};

const setSavedTimeVideo = () => {
  const savedDataTime = localStorage.getItem(TIME_PROGRESS_KEY);
  const parsedDataTime = JSON.parse(savedDataTime) ?? {};

  if (savedDataTime) {
    player.setCurrentTime(parsedDataTime.seconds);
  }
};

setSavedTimeVideo();
player.on('timeupdate', throttle(setCurrentTimeVideo, 1000));
