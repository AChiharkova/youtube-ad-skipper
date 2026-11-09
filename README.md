# YouTube Ad Skipper

A tiny Chrome extension (Manifest V3) that skips video ads on YouTube and hides ad banners on the page.

## How it works

- While an ad is playing, YouTube adds the `ad-showing` class to the player.
- The content script checks for it 4 times per second. During an ad it mutes the video, speeds it up 16x, jumps to the end and clicks "Skip" if the button is there.
- When the ad is over, your volume and playback speed are restored.
- `hide.css` hides ad banners in the feed, next to the player and on top of the video.

## Install

1. Download this repo (Code → Download ZIP) and unzip it.
2. Open `chrome://extensions` (works in Chrome, Edge, Brave, Opera).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and pick the `youtube-ad-skipper` folder.
5. Reload YouTube.

## Note

YouTube changes its page often, so selectors may break. Issues and PRs are welcome.
