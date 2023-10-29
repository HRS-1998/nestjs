# #单次构建 包含src文件和dist文件
# #可用node:18-alpine3.14更小版本的的linux镜像
# FROM node:18     

# WORKDIR /app

# COPY package.json .

# RUN npm  install

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD [ "node" , "./dist/main.js" ]



# ## 多阶段构建 包含dist文件
# FROM node:18 as build-stage

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . . 

# RUN  npm run build

# #production stage

# FROM node:18 as production-stage

# COPY --from=build-stage /app/dist /app

# COPY --from=build-stage /app/package.json /app/package.json

# WORKDIR /app

# RUN  npm install --production

# EXPOSE 3001

# CMD [ "node","/app/main.js" ]



## pm2监控进程
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . . 

RUN  npm run build

#production stage

FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app

COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN  npm install --production

RUN npm install pm2 -g

EXPOSE 3008

CMD [ "pm2-runtime","/app/main.js" ]


