import { GameObject } from '@/assets/scripts/GameObject'

export class Pieces extends GameObject {
  constructor (info, gameMap) {
    super()

    this.id = info.id

    this.color = info.color
    this.gameMap = gameMap

    this.map = gameMap.map
  }

  start () {
    console.log(this.gameMap)
  }

  update () {
    this.render()
  }

  render () {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] !== 0) {
          if (this.map[i][j] === this.id) {
            this.gameMap.ctx.getContext('2d').fillStyle = 'black'
          } else {
            this.gameMap.ctx.getContext('2d').fillStyle = 'white'
          }
          this.gameMap.ctx.getContext('2d').beginPath()
          this.gameMap.ctx.getContext('2d').arc(i * this.gameMap.L + 0.5, j * this.gameMap.L + 0.5, 18, 0, Math.PI * 2)
          this.gameMap.ctx.getContext('2d').fill()
        }
      }
    }
  }
}
