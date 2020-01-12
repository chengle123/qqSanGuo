import Sprite from "../framework/sprite";
// const SOUND_SWITCH_TOP = 80;

export default class Reset extends Sprite {
    constructor() {
        let replayRatio = (window.innerWidth * 0.12) / 300
        let contentPadding = (window.innerWidth - window.innerWidth * 0.85) / 2;
        let contentPaddingTop = window.innerHeight - (window.innerWidth * 0.85) - contentPadding;
        super("resources/images/replay.png", {
            height: replayRatio * 200,
            width: replayRatio * 300,
            x: (contentPadding + window.innerWidth * 0.85) - replayRatio * 300,
            y: contentPaddingTop - (replayRatio * 200 + 15),
            zIndex: -40,
        });
      
    }
    onResetTap(data, fn) {
        fn();
    }
}