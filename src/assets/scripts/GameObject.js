// 游戏对象基类

// eslint-disable-next-line camelcase
const Game_Object = []

export class GameObject {
  constructor () {
    Game_Object.push(this)
    this.has_called_start = false
    this.timeDelta = 0
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  start () {

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update () {

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDestroy () {

  }

  destroy () {
    this.onDestroy()
    // eslint-disable-next-line camelcase
    for (const i in Game_Object) {
      const obj = Game_Object[i]
      if (obj === this) {
        Game_Object.splice(i)
        break
      }
    }
  }
}

let lastTime
const step = (t) => {
  for (const obj of Game_Object) {
    if (!obj.has_called_start) {
      obj.has_called_start = true
      obj.start()
    } else {
      obj.timeDelta = t - lastTime
      obj.update()
    }
  }

  lastTime = t
  requestAnimationFrame(step)
}
requestAnimationFrame(step)
