import Sprite from "../framework/sprite";
// const SOUND_SWITCH_TOP = 80;

export default class TimeBanner extends Sprite {
    constructor() {
        let timeRatio = (window.innerWidth * 0.3) / 400;
        let contentPadding = (window.innerWidth - window.innerWidth * 0.85) / 2;
        let contentPaddingTop = window.innerHeight - (window.innerWidth * 0.85) - contentPadding;
        super("resources/images/time_bg.png", {
            height: timeRatio * 200,
            width: timeRatio * 400,
            x: contentPadding,
            y: contentPaddingTop - (timeRatio * 200 + 15),
            zIndex: -40
        });
        

        // let switchConfig = qq.getStorageSync("SOUND_SWITCH") || "on";
        // this._soundOn = switchConfig === "on";

        // if (this._soundOn) {
        //     this.img.src = "resources/images/soundOn.png";
        // } else {
        //     this.img.src = "resources/images/soundOff.png";
        // }
    }
    // onTap() {
    //     this._soundOn = !this._soundOn;
    //     if (this._soundOn) {
    //         this._soundOn = true;
    //         this.img.src = "resources/images/soundOn.png";
    //         // qq.setStorageSync("SOUND_SWITCH", "on");
    //     } else {
    //         this._soundOn = false;
    //         this.img.src = "resources/images/soundOff.png";
    //         // qq.setStorageSync("SOUND_SWITCH", "off");
    //     }
    // }
    // update() {
    //     if (this.parent) {
    //         this.y = SOUND_SWITCH_TOP - this.parent.y;
    //     }
    // }
}