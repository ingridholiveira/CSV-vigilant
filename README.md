# CSV Vigilant

Uma aplicação desenvolvida para ler arquivos CSV.
## 🚀 Começando

Primeiro clone esse repositório seguindo as intruções descritas no link abaixo:
```
https://docs.github.com/pt/enterprise-cloud@latest/repositories/creating-and-managing-repositories/cloning-a-repository
```

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Para utilizar esta aplicação é necessário ter instalado em sua máquina:

```
Node.JS v16.13.1.
NPM v8.1.2
```

### 🔧 Executando o projeto

Abra a pasta clonada no seu editor de código ou diretamente no terminal do seu sistema e siga as intruções abaixo.

⚙️ Para instalar as dependências, rodar o leitor e gerar o JSON:

```
Pelo terminal abra a pasta CSV-vigilant;
Rode no terminal o comando: npm install;
Após terminar rode o comando: node index.js;
Verifique o arquivo output.json criado/modificado no seu editor de código;
```

⚙️ Para alterar o arquivo CSV que será lido com o exemplo já fornecido:

* No editor de código abra o arquivo index.js;
* Altere a linha 6 de:

```
const stream = fs.createReadStream("input.csv");
```
para 

```
const stream = fs.createReadStream("input1.csv");
```
* Verifique o novo arquivo output.json.

## 📌 Importante

Para a verificação de criação e/ou mudança com um diferente arquivo CSV é necessário que o mesmo esteja dentro da mesma pasta que o arquivo index.js conforme os dois exemplos fornecidos.

## 🛠️ Construído com

* [Node.JS](https://nodejs.org/en/) - Linguagem utilizada para construir o JSON
* [fast-csv, google-libphonenumber, node-email-validation](https://www.npmjs.com/package/) - Pacotes NPM utilizados
