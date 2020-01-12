import GameInstance from "./GameInstance";
import GameMap from './libs/gameMap'
// import SoundManage from "./SoundManage";
import Sprite from "./framework/sprite";
import Stage from "./actors/Stage";
// import SoundSwitch from "./actors/SoundSwitch";
// import Cloud from "./actors/Cloud";
// import Building from "./actors/Building.js";
import TimeBanner from "./actors/TimeBanner.js";
import Reset from "./actors/Reset.js";
// import GameInfo from "./GameInfo.js";
import StartmMenu from "./actors/StartmMenu.js";
import Piece from "./actors/Piece.js";


let gameMap = new GameMap();

export default class Main {
    constructor() {
        this.animationHandler = null;
        this.restart();
    }

    restart() {
        this.selectImg = '';
        this.emptyPosition = 0;
        this.pieces = [];

        this.canvas = window.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.gameInstance = new GameInstance();
        this.gameInstance.initGameInstance();
        // this.soundManage = new SoundManage();
        this.bindLoop = this.mainLoop.bind(this);
        // this.gameInfo = new GameInfo();
        // this.building = new Building();

        // this.startmMenu = new StartmMenu();

        this.stage = new Stage();

        this.touchStartHandler = this.onTouchStart.bind(this);

        qq.onTouchStart(this.touchStartHandler);
        this.start();
    }

    start() {
        if (this.animationHandler) {
            window.cancelAnimationFrame(this.animationHandler);
        }
        this.animationHandler = window.requestAnimationFrame(
            this.bindLoop,
            this.canvas
        );

        // this.soundManage.playBackgroundMusic();
        
        this.stage.appendChild(
            new Sprite("resources/images/bg.jpg", {
                x: 0,
                y: 0,
                height: window.innerHeight,
                width: window.innerWidth,
                zIndex: -50
            })
        );

        this.stage.appendChild(
            new Sprite("resources/images/paper.png", {
                x: (window.innerWidth - window.innerWidth * 0.85 * (1020 / 1000)) / 2,
                y: window.innerHeight - window.innerWidth * 0.85 * (1020 / 1000) - ((window.innerWidth - window.innerWidth * 0.85 * (1020 / 1000)) / 2),
                height: window.innerWidth * 0.85 * (1020 / 1000),
                width: window.innerWidth * 0.85 * (1020 / 1000),
                zIndex: -40
            })
        );
        this.stage.appendChild(
            new Sprite("resources/images/border.png", {
                x: (window.innerWidth - window.innerWidth * 0.85 * (1020 / 1000)) / 2,
                y: window.innerHeight - window.innerWidth * 0.85 * (1020 / 1000) - ((window.innerWidth - window.innerWidth * 0.85 * (1020 / 1000)) / 2),
                height: window.innerWidth * 0.85 * (1020 / 1000),
                width: window.innerWidth * 0.85 * (1020 / 1000),
                zIndex: -40
            })
        );


        this.startmMenu = new StartmMenu();

        this.stage.appendChild(new TimeBanner());
        // this.stage.appendChild(new Reset());
        this.stage.appendChild(this.startmMenu);
        this.startmMenu.renderGameStart(this.stage);
        // this.stage.appendChild(this.building);
    }

    update() {
        let { gameInstance, stage } = this;

        if (!gameInstance.gameRunning) {
            return;
        }

        stage.update();

        // if (
        //     this.building.moveEnd &&
        //     !this.stage.isMoving &&
        //     this.gameInstance.gameRunning
        // ) {
            // this.building = new Building();
            // this.stage.appendChild(this.building);
        // }
    }
    render() {
        let { ctx, canvas, gameInstance, stage } = this;
        ctx.clearRect(0, 0, this.canvas.width, canvas.height);

        let waitingToBeRenderedActors = stage
            .getChildrenTraversing()
            .concat(stage);

        waitingToBeRenderedActors.sort((child1, child2) => {
            child1.zIndex = child1.zIndex || 0;
            child2.zIndex = child2.zIndex || 0;
            return child1.zIndex - child2.zIndex;
        });

        waitingToBeRenderedActors.forEach(actor => {
            actor.render(ctx);
        });
// console.log( this.gameInstance.score)
        // this.gameInfo.renderGameScore(ctx, this.gameInstance.score);

        // if (!gameInstance.gameRunning) {
        //     this.gameInfo.renderGameOver(ctx, this.gameInstance.score);
        // }

            // this.gameInfo.renderGameOver(ctx, this.gameInstance.score);
        // this.startmMenu.renderGameStart(ctx, this.gameInstance.score);
    }

    onTouchStart({ touches, changedTouches, timeStamp }) {
        let { stage, selectImg, ctx, emptyPosition, pieces } = this;
        let actors = stage.getChildrenTraversing().concat(stage);
        
        if (!this.gameInstance.gameRunning) {
            qq.offTouchStart(this.touchStartHandler);
            this.restart();
            return;
        }

        actors.sort((child1, child2) => {
            child1.zIndex = child1.zIndex || 0;
            child2.zIndex = child2.zIndex || 0;
            return child2.zIndex - child1.zIndex;
        });

        
        // this.startmMenu.onTapStart(touches);

        for (let i = 0; i < actors.length; ++i) {
            let actor = actors[i];
            if(actor.isTouched(touches) && typeof actor.onTapStart === "function"){
                let contentPadding = (window.innerWidth - window.innerWidth * 0.85) / 2;
                let contentPaddingTop = window.innerHeight - (window.innerWidth * 0.85) - contentPadding;
                let hintContentRatio = (window.innerWidth * 0.75 * 0.6) / 300;
                actor.onTapStart.bind(actor)(touches, actor, stage, (data)=>{
                    stage.appendChild(new Reset());
                    selectImg = data.img;
                    stage.appendChild(
                        new Sprite(data.img, {
                            height: hintContentRatio * 300,
                            width: hintContentRatio * 300,
                            x: (contentPadding + window.innerWidth * 0.85) - hintContentRatio * 300,
                            y: contentPaddingTop - (hintContentRatio * 300 + 50),
                            zIndex: -40
                        })
                    );

                    // 放入拼图
                    emptyPosition = (data.block * data.block) - 1;
                    let randomMap = gameMap.getMap(data.block)
                    for (let j = 0; j < randomMap.length; j++) {
                        let position = randomMap[j] - 1
                        let block = new Piece(j, position, data, stage);
                        // stage.appendChild(a);
                        // console.log(a)
                        if(block){
                            pieces.push(block);
                        }
                    }
                        // console.log(pieces)
                    
                    // for (let i = 0; i < pieces.length; i++) {
                    //     pieces[i].render(stage)
                    // }
                    console.log(stage)
                });
                return;
            }
            if(actor.isTouched(touches) && typeof actor.onResetTap === "function"){
                actor.onResetTap.bind(actor)([touches, changedTouches, timeStamp], ()=>{
                    qq.offTouchStart(this.touchStartHandler);
                    this.restart();
                });
                return;
            }
            if (actor.isTouched(touches) && typeof actor.onTap === "function") {
                actor.onTap.bind(actor)([touches, changedTouches, timeStamp]);
                return;
            }
        }

        if (this.stage.isMoving) {
            return;
        }

        // this.building.touchHandler();
    }

    mainLoop() {
        this.gameInstance.frame++;

        this.update();
        this.render();

        this.animationHandler = window.requestAnimationFrame(
            this.bindLoop,
            this.canvas
        );
    }
}
