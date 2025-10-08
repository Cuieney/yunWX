FROM alpine:3.15
RUN apk add --update --no-cache nodejs npm
COPY . .
RUN npm install
EXPOSE 8080
# 执行启动命令
# 写多行独立的CMD命令是错误写法！只有最后一行CMD命令会被执行，之前的都会被忽略，导致业务报错。
# 请参考[Docker官方文档之CMD命令](https://docs.docker.com/engine/reference/builder/#cmd)
CMD ["npm", "run", "start"]
