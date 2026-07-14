# language: pt
Funcionalidade: Busca de Produtos
  Como um usuário do e-commerce
  Eu quero buscar produtos no catálogo
  Para encontrar itens específicos de meu interesse

  Contexto:
    Dado que estou na página inicial do site

  @positivo @smoke
  Cenário: Busca de produto existente retorna resultados
    Quando eu realizo uma busca por "dress"
    Então devo visualizar produtos relacionados à busca
    E os produtos exibidos devem conter o termo "dress" em suas informações

  @positivo
  Cenário: Busca por múltiplos termos
    Quando eu realizo uma busca por "blue top"
    Então devo visualizar produtos relacionados à busca
    E deve haver pelo menos 1 produto nos resultados

  @negativo
  Cenário: Busca sem correspondência retorna página vazia
    Quando eu realizo uma busca por "produtoinexistentexyz12345"
    Então não devo visualizar nenhum produto nos resultados
    E devo ver uma mensagem indicando ausência de resultados

  @negativo
  Cenário: Busca com campo vazio
    Quando eu tento buscar sem informar nenhum termo
    Então devo permanecer na página atual
    Ou devo visualizar todos os produtos disponíveis
