import { GameObject } from '@/assets/scripts/GameObject'
import { Pieces } from '@/assets/scripts/Pieces'
import { time } from 'eslint/lib/linter/timing'

export class GameMap extends GameObject {
  constructor (ctx, parent) {
    super()

    this.currentUser = 1

    this.dx = [-1, 0, 1, 0, -1, -1, 1, 1]
    this.dy = [0, 1, 0, -1, -1, 1, 1, -1]

    this.ctx = ctx // 画布
    this.parent = parent

    this.L = 0 // 单元格边长
    this.cols = 14 // 地图列
    this.rows = 14 // 地图行

    this.map = new Array(this.cols) // 地图

    for (let i = 0; i < this.cols; i++) {
      this.map[i] = new Array(this.rows)
    }

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.map[i][j] = 0
      }
    }

    this.pieces = [
      new Pieces({id: 1, color: 'white'}, this),
      new Pieces({id: 2, color: 'black'}, this),
    ]
  }

  start () {
    this.addListeningEvent()
  }


  addListeningEvent() {
    // 定义点击事件处理函数
    const clickHandler = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const nearestPoint = this.findNearestPoint(x, y);
      if (this.currentUser === 1 && this.map[nearestPoint.x][nearestPoint.y] === 0) {
        this.map[nearestPoint.x][nearestPoint.y] = 1;
        this.currentUser = 2;
      } else if (this.currentUser === 2 && this.map[nearestPoint.x][nearestPoint.y] === 0) {
        this.map[nearestPoint.x][nearestPoint.y] = 2;
        this.currentUser = 1;
      }

      if (this.checkGameOver(nearestPoint.x, nearestPoint.y)) {
        setTimeout(() => {
          alert('游戏结束');
          this.ctx.removeEventListener('click', clickHandler);
        }, 100);
      }
    };

    // 添加点击事件监听器
    this.ctx.addEventListener('click', clickHandler);
  }

  // 找到最近的格子,欧几里得距离
  findNearestPoint (x, y) {
    const xOffset = Math.floor(x / this.L)
    const yOffset = Math.floor(y / this.L)

    let nearestX = xOffset * this.L
    let nearestY = yOffset * this.L
    let minDistance = Math.sqrt((x - nearestX) ** 2 + (y - nearestY) ** 2)

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const gridX = (xOffset + dx) * this.L
        const gridY = (yOffset + dy) * this.L
        const distance = Math.sqrt((x - gridX) ** 2 + (y - gridY) ** 2)
        if (distance < minDistance) {
          minDistance = distance
          nearestX = gridX
          nearestY = gridY
        }
      }
    }

    // 改为数组坐标
    return { y: nearestY / this.L, x: nearestX / this.L }
  }

  // 更新地图、单位格大小
  updateSize () {
    this.L = Math.floor(Math.min(this.parent.clientWidth / this.cols
      , this.parent.clientHeight / this.rows))
    this.ctx.getContext('2d').canvas.width = this.L * this.cols
    this.ctx.getContext('2d').canvas.height = this.L * this.rows
  }

  // 绘制地图
  render () {
    const ctx = this.ctx.getContext('2d') // 获取绘图上下文对象
    ctx.strokeStyle = 'black' // 设置线条颜色为黑色

    for (let r = 0; r <= this.rows; r++) {
      let y = r * this.L + 0.5
      if (r === this.rows) y -= 0.5
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.cols * this.L, y)
      ctx.stroke()
    }

    for (let c = 0; c <= this.cols; c++) {
      let x = c * this.L + 0.5
      if (c === this.cols) x -= 0.5
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, this.rows * this.L)
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(7 * this.L + 0.5, 7 * this.L + 0.5, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(3 * this.L + 0.5, 3 * this.L + 0.5, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(3 * this.L + 0.5, 11 * this.L + 0.5, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(11 * this.L + 0.5, 11 * this.L + 0.5, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(11 * this.L, 3 * this.L, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  checkGameOver (x, y) {
    for (let i = 0; i < 8; i++) {
      let tx = x + this.dx[i]
      let ty = y + this.dy[i]
      let cnt = 0
      while (tx >= 0 && tx < this.cols && ty >= 0 && ty < this.rows
        && this.map[tx][ty] === this.map[x][y] && this.map[tx][ty] !== 0) {
          cnt++
          tx += this.dx[i]
          ty += this.dy[i]
          if (cnt >= 4) return true
      }
    }
    return false
  }

  update () {
    this.updateSize()
    this.render()
  }
}
