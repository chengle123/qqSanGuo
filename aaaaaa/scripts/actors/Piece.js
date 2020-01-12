import Sprite from "../framework/sprite";
import Bezier from '../libs/bezier'

const ANI_SPEED = 0.2;
let easeInOut = Bezier(0.42, 0, 0.58, 1);
const contentWidth = window.innerWidth * 0.85;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const contentPadding = (screenWidth - contentWidth) / 2;
const contentPaddingTop = screenHeight - contentWidth - contentPadding;
const btnRatio = (screenWidth * 0.4) / 400;

function getPositionXY (position, block) {
  let width = contentWidth / block;
  let result = {};
  result.x = contentPadding + (position % block) * width;
  result.y = contentPaddingTop + Math.floor(position / block) * width;
  return result;
};

export default class Piece extends Sprite {
    constructor(index, position, data, stage) {
        
        super("", {});


        this.index = index || 0;
        this.position = position || 0;
        this.visible = true;

        // 根据contentWidth、index和stage来判断如何绘制图片
        let cut = 1000 / data.block;
        let width = contentWidth / data.block;

        // this.img = new Image();
        // this.img.src = data.img;
        this.img = data.img;
        this.sx = (index % data.block) * cut;
        this.sy = Math.floor(index / data.block) * cut;
        this.swidth = cut;
        this.sheight = cut;

        let positionXY = getPositionXY(position, data.block);
        this.x = positionXY.x;
        this.y = positionXY.y;
        this.width = width;
        this.height = width;

        // old和new坐标用于动画效果
        this.oldX = positionXY.x;
        this.oldY = positionXY.y;
        this.newX = positionXY.x;
        this.newY = positionXY.y;
        this.ani = 1; // ani为0的时候开始动画，ani为1的时候动画完成
        console.log({
                    sx: this.sx,
                    sy: this.sy,
                    swidth: this.swidth,
                    sheight: this.sheight,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    zIndex:-10
                })
        // console.log(stage)
        stage.appendChild(
            new Sprite(
                this.img,{
                    sx: this.sx,
                    sy: this.sy,
                    swidth: this.swidth,
                    sheight: this.sheight,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    zIndex:-10
                }
            )
        )
    }

    // 设定新的方块位置
    move (position = 0) {
        this.ani = 0;
        this.position = position;
        let positionXY = getPositionXY(position, data.block);
        this.newX = positionXY.x;
        this.newY = positionXY.y;
        this.oldX = this.x;
        this.oldY = this.y;
    }

    // 更新方块位置
    update () {
        if (this.ani >= 1) {
            this.ani = 1;
            this.x = this.newX;
            this.y = this.newY;
            return;
        }
        this.ani += ANI_SPEED;
        this.x = this.oldX + (this.newX - this.oldX) * easeInOut(this.ani);
        this.y = this.oldY + (this.newY - this.oldY) * easeInOut(this.ani);
    }

    // 绘制方块
    render (stage) {
        if (!this.visible) { return; }
        stage.appendChild(
            new Sprite(
                this.img,{
                    sx: this.sx,
                    sy: this.sy,
                    swidth: this.swidth,
                    sheight: this.sheight,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    zIndex:-10
                }
            )
        )

    }
}