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

console.log(config.wxInstallPath)

fs.readFile(`${baseFilePath}/AppData/Local/微信开发者工具/User Data/${wxFileMd5}/Default/.ide`, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

router.get('/getQcode', async (ctx) => {
  axois.get('get', 'http://127.0.0.1:')
  ctx.body = 'giaogiao'
})

app.use(router.routes())

app.listen(3000)
