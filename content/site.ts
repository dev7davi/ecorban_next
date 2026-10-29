export const site = {
  name: "eCorban",
  tagline: "Gestão Eficiente para Corbans",
  url: "https://ecorban.com.br",
  // TODO: confirmar a URL do portal de login
  loginUrl: "#",
  contact: {
    email: "comercial@ecorban.com.br",
    whatsappSales: "5517997055756",
    whatsappSupport: "5517982261920",
    city: "São José do Rio Preto - SP",
  },
};

export function whatsappLink(message = "Olá, gostaria de saber mais sobre o eCorban.", phone = site.contact.whatsappSales) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Trava de conteúdo: ligue cada item só depois que o time confirmar.
export const features = {
  anosDeMercado: false, // "16 anos de mercado"
  anosDeMercadoValor: 16,
  numeroDeClientes: false,
  apiPublica: false, // o código só tem webhooks de entrada — não anunciar
  produtosPorBanco: false, // FGTS, CLT, portabilidade…
  consultaCpfCnpj: false,
  logosDeClientes: true, // faixa de logos de clientes (confirmado pelo time em 29/10/2026)
};

// 5 integrações por API. Os demais bancos são apenas cadastráveis (não anunciar como integrados).
export const integratedBanks = ["PAN", "C6", "Crefaz", "Facta", "QualiBanking"];
