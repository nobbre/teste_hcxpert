# language: pt
Funcionalidade: Autenticação de Usuário
  Como um usuário do sistema
  Eu quero realizar login na plataforma
  Para acessar funcionalidades restritas

  Contexto:
    Dado que estou na página inicial do site

  @positivo @smoke
  Cenário: Login com credenciais válidas
    Quando eu acesso a página de login
    E preencho o campo de email com um usuário válido
    E preencho o campo de senha com uma senha válida
    E clico no botão de login
    Então devo ser autenticado com sucesso

  @negativo
  Cenário: Tentativa de login com senha incorreta
    Quando eu acesso a página de login
    E preencho o campo de email com um usuário válido
    E preencho o campo de senha com "senhaincorreta123"
    E clico no botão de login
    Então devo visualizar a mensagem de erro "Your email or password is incorrect!"

  @negativo
  Cenário: Tentativa de login com email não cadastrado
    Quando eu acesso a página de login
    E preencho o campo de email com "usuario_inexistente@test.com"
    E preencho o campo de senha com "qualquersenha"
    E clico no botão de login
    Então devo visualizar a mensagem de erro "Your email or password is incorrect!"

  @negativo
  Cenário: Tentativa de login com campos vazios
    Quando eu acesso a página de login
    E clico no botão de login sem preencher os campos
    Então os campos de email e senha devem ser obrigatórios