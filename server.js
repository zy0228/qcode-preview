const Koa = require('koa')
const serve = require('koa-static')
const cors = require('koa2-cors')
const Router = require('koa-router')
const axois = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const app = new Koa()
const router = new Router()
const wxFileMd5 = crypto.createHash('md5').update(Buffer.from(config.wxInstallPath)).digest('hex')
const baseFilePath = path.resolve('../')

app.use(cors())

/**
 * ---------------------------------------------------
 * 获取小程序运行端口
 * @public
 * ---------------------------------------------------
 */
function getMiniProgramPort () {
  return new Promise((resolve, reject) => {
    fs.readFile(`${baseFilePath}/AppData/Local/微信开发者工具/User Data/${wxFileMd5}/Default/.ide`, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function getQcode (port) {
  return axois.get(`http://127.0.0.1:${port}/v2/preview?project=${config.projectPath}&qr-format=base64`)
}

router.get('/getQcode', async (ctx) => {
  const port = await getMiniProgramPort()
  const body = await getQcode(port)
  ctx.body = body.data
})

app.use(router.routes())

app.use(serve('./dist'))

app.listen(3000)
