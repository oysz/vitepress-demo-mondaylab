#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init
git branch -M main
git add -A
git commit -m 'deploy'

# 将 main 构建后的代码合并到 gh-pages 分支上
git push -f git@github.com:oysz/vitepress-demo-mondaylab.git main:gh-pages

cd -