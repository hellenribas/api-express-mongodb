# Node serve como ambiente de execução para JavaScript, portanto, o usamos como nossa imagem base.
FROM node:16

# Definimos /app como o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiamos package.json e package-lock.json para o diretório /app no ​​contêiner
COPY package*.json ./

# As dependências são instaladas no contêiner
RUN npm install

# O restante do código é copiado para o contêiner
COPY . .

# A porta 3000 é exposta para permitir o acesso externo
EXPOSE 3000

# O comando necessário para executar o aplicativo é especificado
CMD ["node", "app.js"]
