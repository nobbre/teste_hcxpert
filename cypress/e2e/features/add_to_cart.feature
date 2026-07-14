# language: pt
Funcionalidade: Adicionar Produto ao Carrinho
  Como um usuário do e-commerce
  Eu quero adicionar produtos ao carrinho
  Para posteriormente finalizar minha compra

  Contexto:
    Dado que estou na página inicial do site

  @positivo @smoke
  Cenário: Adicionar produto ao carrinho a partir da listagem
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    Então devo ver a confirmação de adição ao carrinho
    E o produto deve estar presente no carrinho com nome correto
    E o preço do produto deve estar correto no carrinho

  @positivo
  Cenário: Adicionar múltiplos produtos ao carrinho
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E continuo comprando
    E adiciono o segundo produto disponível ao carrinho
    Então devo visualizar 2 produtos no carrinho
    E o valor total deve corresponder à soma dos produtos

  @positivo
  Cenário: Aumentar quantidade de produto no carrinho
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E altero a quantidade do produto para 3 unidades
    Então o subtotal do produto deve ser multiplicado por 3

  @negativo
  Cenário: Remover produto do carrinho
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E removo o produto do carrinho
    Então o carrinho deve estar vazio
    E devo visualizar a mensagem "Cart is empty!"

  @positivo
  Cenário: Persistência do carrinho durante navegação
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E continuo comprando
    E navego para a página inicial
    E acesso o carrinho de compras pelo menu
