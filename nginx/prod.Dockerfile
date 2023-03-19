FROM nginx:1.18

RUN rm /etc/nginx/conf.d/default.conf
COPY ./prod.proxy.conf /etc/nginx/conf.d/proxy.conf

CMD ["nginx", "-g", "daemon off;"]