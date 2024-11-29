# -------- DEVELOPMENT ----------
# Usando a imagem base do Node.js versão 18 com Alpine Linux para otimização de tamanho
FROM node:18-alpine AS development

# Instalando dependências necessárias para o pdf2pic (Ghostscript, GraphicsMagick e ImageMagick)
# Essas ferramentas são necessárias para a conversão de PDF para imagem
RUN apk add --no-cache \
    ghostscript \ 
    graphicsmagick \ 
    imagemagick  \
    && mkdir -p /app/output

# Definindo o diretório de trabalho do contêiner
WORKDIR /app

# Copiando o arquivo de dependências (package.json e package-lock.json) para dentro do contêiner
COPY package*.json ./

# Copiando a pasta Prisma (caso esteja utilizando o Prisma no projeto)
COPY prisma /prisma/

# Instalando as dependências do Node.js usando o comando npm ci
RUN npm ci

# Copiando todos os arquivos da aplicação para dentro do contêiner
COPY . .

# Rodando o comando do Prisma para gerar os arquivos necessários
RUN npm run prisma:generate

# Expondo a porta 3000, que é a padrão para aplicações NestJS
EXPOSE 3000
# -------- END ---------- 

# -------- BUILD ----------
# Usando novamente a imagem do Node.js para a etapa de build
FROM node:18-alpine AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando novamente o package.json e package-lock.json
COPY package*.json ./

# Copiando o diretório node_modules da etapa de desenvolvimento para evitar reinstalar todas as dependências
COPY --from=development /app/node_modules ./node_modules

# Copiando os arquivos restantes da aplicação para o contêiner
COPY . .

# Rodando o comando de build do NestJS para gerar o bundle de produção
RUN npm run build

# Definindo a variável de ambiente NODE_ENV como produção para otimizar a aplicação
ENV NODE_ENV production

# Rodando novamente npm ci com a opção --omit=dev para garantir que apenas as dependências de produção sejam instaladas
# Isso também remove pacotes de desenvolvimento que não são necessários no ambiente de produção
RUN npm ci --omit=dev && npm cache clean --force
# -------- END ---------- 

# -------- PRODUCTION ----------
# Imagem final de produção
# Usando a imagem Node.js para rodar o app no ambiente de produção
FROM node:18-alpine AS production

# Instalando novamente as dependências necessárias para o pdf2pic, pois a conversão ocorrerá no ambiente de produção
RUN apk add --no-cache \
    ghostscript \ 
    graphicsmagick \ 
    imagemagick  \
    && mkdir -p /app/output

# Definindo o diretório de trabalho para a produção
WORKDIR /app

# Copiando as dependências (node_modules) e os arquivos do build para a imagem de produção
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Definindo o comando que irá iniciar a aplicação NestJS
CMD [ "node", "dist/main.js" ]
# -------- END ----------
