import Sprite from "../framework/sprite";
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// let atlas = new Image();
// // let restartBtn = new Image();
// let easy = new Image();
// let middle = new Image();
// let hard = new Image();

// atlas.src = 'resources/images/start.png'
// easy.src = 'resources/images/easy.png'
// middle.src = 'resources/images/middle.png'
// hard.src = 'resources/images/hard.png'


export default class StartmMenu extends Sprite {
    constructor(ctx, score) {
        let imgStartRatio = (screenWidth * 0.8) / 800;
        
        super(
            'resources/images/start.png',{
                x: (screenWidth - imgStartRatio * 800) / 2,
                y: (screenHeight - imgStartRatio * 1000) / 2,
                width:imgStartRatio * 800,
                height: imgStartRatio * 1000,
                zIndex:-10
            }
        );

    }
    renderGameStart(stage) {
        let btnRatio = (screenWidth * 0.4) / 400;
        this.easy =  new Sprite(
                'resources/images/easy.png',{
                    x: (screenWidth - btnRatio * 400) / 2,
                    y: (screenHeight - btnRatio * 200) / 2 - btnRatio * 200 * 1.5,
                    width:btnRatio * 400,
                    height: btnRatio * 200,
                    zIndex:-10
                }
            );
        this.middle = new Sprite(
                'resources/images/middle.png',{
                    x: (screenWidth - btnRatio * 400) / 2,
                    y: (screenHeight - btnRatio * 200) / 2,
                    width:btnRatio * 400,
                    height: btnRatio * 200,
                    zIndex:-10
                }
            );
        this.hard = new Sprite(
                'resources/images/hard.png',{
                    x: (screenWidth - btnRatio * 400) / 2,
                    y: (screenHeight - btnRatio * 200) / 2 + btnRatio * 200 * 1.5,
                    width:btnRatio * 400,
                    height: btnRatio * 200,
                    zIndex:-10
                }
            );
        stage.appendChild(this.easy)
        stage.appendChild(this.middle)
        stage.appendChild(this.hard)


        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        // this.btnArea = {
        //     startX: screenWidth / 2 - 80,
        //     startY: screenHeight / 2 + 10,
        //     endX: screenWidth / 2 + 80,
        //     endY: screenHeight / 2 + 50
        // }
    }
    removeChild(stage, actor, fn){
        stage.removeChild(actor);
        stage.removeChild(this.easy);
        stage.removeChild(this.middle);
        stage.removeChild(this.hard);
        fn({
            img: this.img,
            block: this.block,
            gameStart: true
        });
    }
    onTapStart(touches, actor, stage, fn) {
        this.img = `resources/images/${Math.floor(Math.random()*15)+1}.jpg`;

        if(this.easy.isTouched(touches)){
            this.block = 3;
            this.removeChild(stage, actor, fn);
            return;
        }
        if(this.middle.isTouched(touches)){
            this.block = 4;
            this.removeChild(stage, actor, fn);
            return;
        }
        if(this.hard.isTouched(touches)){
            this.block = 5;
            this.removeChild(stage, actor, fn);
            return;
        }
        
        // this._soundOn = !this._soundOn;
        // if (this._soundOn) {
        //     this._soundOn = true;
        //     this.img.src = "resources/images/soundOn.png";
        //     qq.setStorageSync("SOUND_SWITCH", "on");
        //     // _soundManage.playBackgroundMusic();
        // } else {
        //     this._soundOn = false;
        //     this.img.src = "resources/images/soundOff.png";
        //     qq.setStorageSync("SOUND_SWITCH", "off");
        //     // _soundManage.pauseBackgroundMusic();
        // }
    }
}
