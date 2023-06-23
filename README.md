
## 河山的幻灯片存档 [<img src="https://wrm244.github.io/svg/logo_large.svg" width="90" height="90" align="right">](https://wrm244.github.io/slides/)

![GitHub last commit](https://img.shields.io/github/last-commit/wrm244/wrm244.github.io?label=update&logo=github)  [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

<p align=center>
<a href="https://wrm244.gitee.io/slides/">Online Preview</a> | <a href="https://wrm244.github.io/slides/">Github Pages</a>
</p>

<p align=center>
<a href="https://www.netlify.com/" target="_blank"><img alt="Built with Netlify" height:"50px" src="https://wrm244.github.io/assets/images/netlify-color-accent.svg" /></a>     
</p>

## 介绍

这是一个我用来制作幻灯片的网站，请


## 代码结构


```bash
src
    ├───.vuepress
    │   ├───.cache
    │   │   └───deps
    │   ├───.temp
    │   │   ├───components
    │   │   ├───internal
    │   │   ├───md-enhance
    │   │   ├───pages
    │   │   │   ├───bar
    │   │   │   ├───demo
    │   │   │   ├───foo
    │   │   │   ├───guide
    │   │   │   │   ├───bar
    │   │   │   │   └───foo
    │   │   │   ├───slides
    │   │   │   │   ├───bar
    │   │   │   │   └───foo
    │   │   │   └───专业课程
    │   │   ├───sass-palette
    │   │   ├───theme-hope
    │   │   └───vite-root
    │   ├───dist
    │   │   └───assets
    │   │       ├───icon
    │   │       └───image
    │   ├───public
    │   │   └───assets
    │   │       ├───icon
    │   │       └───image
    │   └───styles
    └───专业课程
```


## Github Action CI
该流程会同步部署到云服务器与GitHub Pages上面：
```yml

name: 部署文档

on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true



      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn

      - name: 安装依赖
        run: yarn install --frozen-lockfile

      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          yarn run docs:build
          > src/.vuepress/dist/.nojekyll

      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: src/.vuepress/dist
          token: ${{ secrets.ACCESS_TOKEN }}
          repository-name: wrm244/slides
  
  sync-2-gitee:
    needs: deploy-gh-pages
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:wrm244/slides.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:wrm244/slides.git
  
  reload-pages:
    needs: sync-2-gitee
    runs-on: ubuntu-latest
    steps:
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: wrm244
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: wrm244/slides
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages
```


## 协议

[EPL-1.0](./LICENSE) © 河山 100%
