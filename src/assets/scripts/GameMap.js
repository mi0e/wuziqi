import { GameObject } from '@/assets/scripts/GameObject'

export class GameMap extends GameObject {
  constructor (ctx, parent) {
    super()

    this.ctx = ctx // 画布
    this.parent = parent

    this.L = 0 // 单元格边长
    this.cols = 14 // 地图列
    this.rows = 14 // 地图行
  }

  start () {
    this.addListeningEvent()
  }

  addListeningEvent () {
    this.ctx.addEventListener('click', (e) => {
      const x = e.offsetX
      const y = e.offsetY
      console.log('Mouse click at:', this.findNearestPoint(x, y))
    })
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

  update () {
    this.updateSize()
    this.render()
  }
}
