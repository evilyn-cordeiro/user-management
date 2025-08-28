## SGU - Frontend

Este documento detalha as etapas necessárias para configurar, rodar e testar o projeto de frontend.


## Pré-requisitos
Certifique-se de que você tem o Node.js e o npm (ou Yarn) instalados em sua máquina. Este projeto usa o TypeScript, então você precisará ter o compilador tsc e o ts-node-dev instalados.


## Instalação das Dependências
Primeiro, instale todas as dependências do projeto, incluindo as de desenvolvimento. Abra o terminal na pasta raiz do projeto e execute o seguinte comando:
    npm install
*Este comando lerá o arquivo `package.json` e instalará todas as bibliotecas listadas em `dependencies` e `devDependencies`.*

## Rodando o Projeto

Na pasta do projeto, você pode executar os seguintes comandos:

    npm start

*Este comando inicia a aplicação em modo de desenvolvimento. Ao executá-lo, o navegador abrirá automaticamente em http://localhost:3000. A página será recarregada a cada alteração que você fizer no código, e você verá possíveis erros diretamente no console.*

    npm test

*Este script inicia o executor de testes (test runner) em modo interativo. É ideal para escrever e verificar seus testes, pois ele assiste os arquivos e roda os testes relevantes a cada mudança.*

    npm run build

*Este comando compila a aplicação para produção. Ele otimiza e minifica todo o código React e os arquivos do projeto, gerando uma pasta chamada build. Os arquivos desta pasta estão prontos para serem enviados para um servidor e serem publicados.*

    npm run eject

*⚠️Atenção: Esta é uma operação irreversível.*
*Este comando remove a dependência de build única do projeto, copiando todos os arquivos de configuração (webpack, Babel, ESLint, etc.) diretamente para o seu projeto. Isso dá a você total controle sobre a configuração, mas significa que você é responsável por gerenciar e atualizar esses arquivos. Para a maioria dos projetos, você não precisa usar o eject.*