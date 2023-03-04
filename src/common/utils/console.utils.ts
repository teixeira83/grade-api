/* eslint-disable no-console */
class Console {
  log(msg: string) {
    console.log(`⚫️ ${msg}`)
  }

  info(msg: string) {
    console.log(`🔵 ${msg}`)
  }

  success(msg: string) {
    console.log(`🟢 ${msg}`)
  }

  error(msg: string) {
    console.log(`🔴 ${msg}`)
  }

  alert(msg: string) {
    console.log(`🟠 ${msg}`)
  }

  clear() {
    console.clear()
  }
}

export default new Console()
