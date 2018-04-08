FROM node

RUN mkdir /wwwroot
WORKDIR /wwwroot

FROM nginx
ADD nginx.conf /etc/nginx/nginx.conf
RUN service nginx start
