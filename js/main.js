/* global canvas */

import EventUtil from './base/eventUtil'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()
/**
 * 游戏主函数
 */
export default class Main {
  constructor () {

    
    this.bg = new BackGround(ctx)
    this.gameInfo = new GameInfo()

    this.eventUtil = new EventUtil((e) => {
      this.gameInfo.tap(e)
    }, (e) => {
      this.movePieces(e.direction)
    })

    qq.onHide(()=>{
      console.log('切换后台')
      this.BannerAd.hide();
      this.BannerAd.destroy();
      window.cancelAnimationFrame();
    })    
    qq.onShow(()=>{
      console.log('切换前台');
      this.init ();
    })
      // let AppBox = qq.createAppBox({adUnitId:'07c0b3bcce2ee47bb1b2a334492c47ed'});
      // AppBox.load(()=>{
      //   console.log(1111)
      //   AppBox.show();
      // })
  }

  init (){

    databus.reset()
    
    window.requestAnimationFrame(
      this.loop.bind(this),
      databus.pieces.forEach((item, position) => {
        item.render(ctx)
      })
    );
  }

  /**
   * 移动方块的方法
   *
   * @param {any} direction 移动方向
   * @returns
   * @memberof Main
   */
  movePieces (direction) {
    let targetPiece
    switch (direction) {
      case 'up':
        targetPiece = databus.emptyPosition + databus.stage
        break
      case 'down':
        targetPiece = databus.emptyPosition - databus.stage
        break
      case 'left':
        targetPiece = databus.emptyPosition + 1
        if (Math.floor(targetPiece / databus.stage) !== Math.floor(databus.emptyPosition / databus.stage)) {
          // 如果两个商不相等，说明左右滑动出现了换行现象，不能执行
          return
        }
        break
      case 'right':
        targetPiece = databus.emptyPosition - 1
        if (Math.floor(targetPiece / databus.stage) !== Math.floor(databus.emptyPosition / databus.stage)) {
          return
        }
        break
      default:
        break
    }
    databus.pieces.forEach((item) => {
      if (item.position === targetPiece) {
        item.move(databus.emptyPosition)
        databus.emptyPosition = targetPiece
      }
    })
  }

  checkGameOver () {
    if (databus.gameOver || databus.pieces.length === 0) {
      return
    }
    for (let i = 0; i < databus.pieces.length; i++) {
      let piece = databus.pieces[i]
      if (piece.index !== piece.position) {
        return false
      }
    }
    databus.gameOver = true
    databus.finalTime = databus.getCurrentTime()
  }
  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    databus.pieces.forEach((item) => {
      item.render(ctx)
    })
    this.gameInfo.render(ctx)
  }
  // 游戏逻辑更新主函数
  update () {
    // 统计是否有动画正在播放
    let isAniPlaying = false
    databus.pieces.forEach((item) => {
      item.update()
      if (item.ani !== 1) {
        isAniPlaying = true
      }
    })

    // 如果没有动画正在播放，查看游戏是否结束
    if (!isAniPlaying) {
      this.checkGameOver()
    }
  };
  // 实现游戏帧循环
  loop () {
      this.update()
      this.render()
      window.requestAnimationFrame(
        this.loop.bind(this),
        canvas
      )
  }
}
