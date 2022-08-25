# !/bin/bash

yarn docs:build
ssh root@120.48.59.112 "clear_blog.sh"
scp -r /Users/mac/Desktop/DemoCode/MyDocument/docs/.vuepress/dist/* root@120.48.59.112:/www/html/
