
# SGU - Backend

Este documento detalha as etapas necessárias para configurar, rodar e testar o projeto de backend.

## Pré-requisitos
Certifique-se de que você tem o Node.js e o npm (ou Yarn) instalados em sua máquina. Este projeto usa o TypeScript, então você precisará ter o compilador tsc e o ts-node-dev instalados.


## Instalação das Dependências
Primeiro, instale todas as dependências do projeto, incluindo as de desenvolvimento. Abra o terminal na pasta raiz do projeto e execute o seguinte comando:
    npm install
*Este comando lerá o arquivo `package.json` e instalará todas as bibliotecas listadas em `dependencies` e `devDependencies`.*

## Rodando o Projeto

**Modo de Desenvolvimento**
Para rodar o servidor em modo de desenvolvimento com hot-reload, execute:

    npm run dev
  
**Executando Testes**

    npm run test

## ⚠️*Aviso: Usando um Banco de Dados "Fake"*

Este projeto utiliza um banco de dados "fake" (ou simulado) para fins de desenvolvimento e teste. Isso significa que as operações de leitura, escrita e atualização de dados são simuladas em memória, sem a necessidade de uma conexão com um banco de dados real, como o *MongoDB* ou *PostgreSQL*.

**Vantagens de Usar um Banco de Dados Fake**
Agilidade no Desenvolvimento: Não é necessário configurar um ambiente de banco de dados real, como instalar, configurar e manter um servidor de banco de dados. Isso acelera o início do desenvolvimento e a colaboração entre a equipe.

- Isolamento e Testes
- Portabilidade

**Desvantagens e Limitações**
- Não é para Produção
- Comportamento Incompleto
- Risco de Surpresas

Caso precise de um banco real recomendo a utilização do PostgreSQL e Prisma.
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL: Documentation](https://www.postgresql.org/docs/)