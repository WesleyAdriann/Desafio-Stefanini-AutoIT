# Desafio Stefanini AutoIT

Projeto do desafio proposto.

## Utilização
### Método 1
Clone o projeto e insira a pasta build em um servidor.

### Método 2
 Clone o projeto
                     
 Instale o NodeJS e npm
                    
* [Node](https://nodejs.org)

Execute os comandos para verificar se foram instalados corretamente
```
node --version
npm -v
```
Na pasta do projeto, execute o comando para instalar as dependências
```
npm i
```
Agora inicie o servidor do React
```
npm start
```
Pronto!

## Para verificação do codigo ver arquivos:
```
./src/App.js
./src/Components/AnaliseTexto.js
./src/Components/PainelEmocao.js
./src/Components/CorrecaoAutomatica.js
```

## Ferramentas utilizadas
* [React](https://reactjs.org)
* [React Router](https://reacttraining.com/react-router)
* [Bootstrap](https://getbootstrap.com)
* [Firebase](https://firebase.google.com/)
* [Axios](https://github.com/axios/axios)
* [API de Verificação Ortográfica do Bing](https://azure.microsoft.com/pt-br/services/cognitive-services/spell-check/)
* [API de Análises de texto do Bing](https://azure.microsoft.com/pt-br/services/cognitive-services/text-analytics/)

## Observações
Devido o verificação do codigo pela Stefanini e a conclusão do Desafio, removi as chaves do Firebase, Verificação Ortográfica e Analises de Texto do Bing. Então para utilização é necessario acessar os devidos links acima e criar a propria chave e inserir nos arquivos.

### Firebase
Dentro da const do arquivo
```
./src/config/config.js
```
### Verificação Ortográfica 7.0 / Spell Check
Dentro da função spellCheck, na const key, do arquivo
```
./src/App.js
```
### Análise de texto / Text Analytics
Dentro das funções handleLingua, handleSentimento e handlePalavras, as 3 possuem uma const key. Caso esteja utilizando um servidor Azure que não seja do Sul do Brasil, deve-se alterar o inicio da url que existem nas 3 funções, arquivo
```
.src/components/AnaliseTexto.js
```
