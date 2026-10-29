export const hero = {
  badge: "Teste grátis por 7 dias",
  titleStart: "Gestão eficiente para a sua",
  titleHighlight: "promotora de crédito",
  subtitle:
    "Do primeiro contato ao repasse pago, o eCorban organiza a esteira de propostas, o atendimento, as metas e as comissões da sua operação de consignado — em um só lugar, em tempo real.",
  lead: {
    placeholder: "Nome da sua promotora",
    button: "Começar teste grátis",
    message: (empresa: string) =>
      empresa ? `Olá, sou da ${empresa} e quero testar o eCorban por 7 dias.` : "Olá, quero testar o eCorban por 7 dias.",
  },
};
