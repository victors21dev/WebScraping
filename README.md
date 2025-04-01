# WebScraping

## Descrição

Este projeto realiza a coleta de dados do site https://nahoradoocio.lowlevel.com.br/ e armazena as informações extraídas em um banco de dados MySQL utilizando o DBeaver para visualização e gerenciamento.

## Tecnologias

- Axios: Para fazer requisições HTTP e buscar os dados do site.
- Cheerio: Para realizar o parsing e extração de dados HTML.
- MySQL: Banco de dados relacional para armazenar as informações coletadas.
- DBeaver: Ferramenta para gerenciamento do banco de dados MySQL.

## Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado:

- Node.js (com npm ou yarn)
- MySQL ou XAMPP para rodar o MySQL localmente.
- DBeaver para gerenciar o banco de dados.

## Instalação

#### Clone o repositório:

```bash
git clone https://github.com/victors21dev/WebScraping.git
cd webscraping
```

#### Instale as dependências:

```bash
npm install
```

#### Ou, se você estiver usando yarn:

```bash
yarn install
```

#### Configure o banco de dados:

- Crie um banco de dados no MySQL com o nome desejado (ex: scraping_db).
- No DBeaver, crie uma conexão com o banco de dados MySQL e anote as credenciais de conexão (usuário, senha, host).

#### Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```plaintext
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

## Executando o Projeto

#### Para rodar o scraper, basta executar o script:

```brash
node index.js
```

Isso irá iniciar o processo de scraping, coletando os dados do site e inserindo-os no banco de dados MySQL.

Depois de rodar o script, você pode visualizar os dados diretamente no DBeaver, conectando-se ao banco de dados com as credenciais configuradas.

## Contribuindo

- Faça o fork do repositório.
- Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
- Faça suas alterações e commit com uma mensagem clara.
- Push para a branch (git push origin feature/nova-funcionalidade).
- Abra um pull request.

## Testes

Não foram definidos testes automáticos para este projeto até o momento, mas contribuições de testes são bem-vindas!

## Licença

Este projeto está licenciado sob a MIT License.
