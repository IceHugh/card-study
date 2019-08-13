FROM nginx:latest
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 复制配置
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf