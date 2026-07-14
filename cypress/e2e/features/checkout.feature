# language: pt
Funcionalidade: Finalização de Pedido (Checkout)
  Como um usuário autenticado do e-commerce
  Eu quero finalizar minha compra
  Para receber os produtos selecionados

  Contexto:
    Dado que estou na página inicial do site
    E estou autenticado no sistema

  @positivo @smoke @e2e
  Cenário: Checkout completo com todos os dados obrigatórios
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E prossigo para o checkout
    E preencho as informações de endereço obrigatórias
    E confirmo o pedido
    E preencho os dados do cartão de crédito
      | campo          | valor              |
      | Nome no Cartão | Test User HCXpert  |
      | Número         | 4242424242424242   |
      | CVC            | 123                |
      | Mês Expiração  | 12                 |
      | Ano Expiração  | 2028               |
    E confirmo o pagamento
    Então devo visualizar a mensagem de pedido confirmado
    E devo receber a confirmação "Congratulations! Your order has been confirmed!"

  @negativo
  Cenário: Tentativa de checkout sem preencher campo obrigatório de endereço
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E prossigo para o checkout
    E deixo o campo "First Name" vazio
    E tento confirmar o pedido
    Então devo visualizar mensagem de erro indicando campo obrigatório
    E o checkout não deve ser concluído

  @negativo
  Cenário: Tentativa de pagamento com número de cartão inválido
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E prossigo para o checkout
    E preencho as informações de endereço obrigatórias
    E confirmo o pedido
    E preencho o campo de número do cartão com "1111222233334444"
    E preencho os demais dados do cartão
    E confirmo o pagamento
    Então devo visualizar mensagem de erro de cartão inválido
    Ou o pagamento não deve ser processado

  @negativo
  Cenário: Tentativa de checkout sem adicionar produtos ao carrinho
    Quando eu acesso o carrinho de compras sem produtos
    Então o botão de checkout deve estar desabilitado
    Ou devo visualizar a mensagem "Cart is empty!"

  @negativo
  Cenário: Validação de campos obrigatórios do cartão de crédito
    Quando eu navego até a página de produtos
    E adiciono o primeiro produto disponível ao carrinho
    E acesso o carrinho de compras
    E prossigo para o checkout
    E preencho as informações de endereço obrigatórias
    E confirmo o pedido
    E deixo os campos do cartão vazios
    E confirmo o pagamento
    Então devo visualizar mensagens de erro para todos os campos obrigatórios do cartão
