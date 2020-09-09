const Koa = require('koa')
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

router.get('/getQcode', async (ctx) => {
  // try {
  //   const port = await getMiniProgramPort()
  //   axois.get(`http://127.0.0.1:${port}/v2/preview?project=%2FUsers%2Fusername%2Fdemo`).then(res => {
  //     console.log('成功', res)
  //     ctx.body = res
  //   }).catch(err => {
  //     console.log('错了', err)
  //     ctx.body = err
  //   })
  // } catch(e) {
  //   ctx.body = e
  // }
  const port = await getMiniProgramPort()
  axois.get(`http://127.0.0.1:${port}/v2/preview?project=%2FUsers%2Fusername%2Fdemo`).then(res => {
    console.log('resres', res.data)
    ctx.body = 'hello world'
  }).catch(e => {
    console.log('eeee', e)
    ctx.body = e
  })
})

app.use(router.routes())

app.listen(3000)
