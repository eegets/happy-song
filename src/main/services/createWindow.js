import { BrowserWindow } from 'electron'

function createWindow(winConfig, devPath, prodPath) {
  const win = new BrowserWindow(winConfig)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
  } else {
    // createProtocol('app')
    win.loadURL(`app://./${prodPath}`)
  }
  console.log(prodPath, "prodPath")
  return win
}

export default createWindow
