# 1. Imagem base com Node LTS
FROM node:18-alpine

# 2. Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia package.json e package-lock.json (para aproveitar cache do npm install)
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia todo o código para dentro do container
COPY . .

# 6. Compila TypeScript para JavaScript (geralmente vai pra pasta /dist)
RUN npm run build

# 7. Expõe a porta que seu app usa
EXPOSE 8085

# 8. Comando para rodar o app compilado
CMD ["node", "dist/server.js"]
