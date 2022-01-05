FROM node:16-alpine3.15
# создание директории приложения
WORKDIR /docker

COPY . .
# копируем исходный код

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

EXPOSE "${PORT}"

CMD [ "npm", "start" ]