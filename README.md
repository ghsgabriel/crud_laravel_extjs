# CRUD de Usuários em Laravel 11 e ExtJS 7.8

## Descrição
Aplicação full-stack de CRUD de Usuários utilizando Laravel 11 para a API backend e ExtJS 7.8 para o frontend. Demonstração de desenvolvimento full-stack sênior, integrando esses dois frameworks.


## Ambiente de Produção

- Frontend: https://laravel-extjs.ghs.dev.br/
- API: https://laravel-extjs.ghs.dev.br/api/users
- Swagger: https://laravel-extjs.ghs.dev.br/swagger/

## Executando Localmente

1. Clone o repositório:
   ```
   git clone https://github.com/ghsgabriel/crud_laravel_extjs.git
   cd crud_laravel_extjs
   ```

2. Inicie os containers:
   ```
   docker compose up -d
   ```

3. Copie o arquivo de ambiente:
   ```
   docker exec -it backend cp .env.example .env
   ```

4. Instale dependências:
   ```
   docker exec -it backend composer install
   ```

5. Execute migrations e seeders:
   ```
   docker exec -it backend php artisan migrate --seed
   ```

6. Execute os testes:
   ```
   docker exec -it backend php artisan test
   ```

7. Acesse:
   - Frontend: http://localhost:1962
   - API: http://localhost:8888/api/users
   - Swagger: http://localhost:8890


## Agradecimentos

Aos recrutadores e avaliadores,

Obrigado por dedicarem tempo à análise deste projeto. Ele foi desenvolvido para demonstrar minhas habilidades em desenvolvimento full-stack, integrando Laravel 11 e ExtJS 7.8. Busquei implementar boas práticas de arquitetura, utilizar tecnologias modernas como FrankenPHP e PostgreSQL, e aplicar princípios de TDD para garantir a qualidade do código.

Estou à disposição para esclarecer quaisquer dúvidas sobre as decisões técnicas tomadas ou discutir possíveis melhorias. Agradeço a oportunidade e aguardo ansiosamente por seus comentários e feedback.