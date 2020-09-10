# qcode-preview

支持局域网下访问本地小程序预览码

# Project setup
open file config.js
```
{
  wxInstallPath: 微信开发者工具安装路径,
  projectPath: 项目路径
}
```
# Porject Build and Run

## install dependencies
```
npm i 
```
## run project
```
npm run serve
```
## build
```
npm run build
```
## run serve
```
node server.js
```
## 访问地址
局域网下其他人可以通过以下地址访问:
```
${ip:v4}:3000 (example: 192.168.31.202:3000)
```