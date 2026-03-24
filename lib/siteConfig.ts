export const siteConfig = {
  name: "Cavalheiro Barbearia",
  tagline: "Estilo, precisão e atitude",
  description:
    "Barbearia premium em São José do Rio Preto — cortes, barba e transformações com precisão, estilo e atendimento de alto nível.",
  url: "https://cavalheirobarbearia.local",
  whatsappDisplay: "(17) 99999-9999"
};

function sanitizeDigits(v: string) {
  return (v || "").replace(/\D/g, "");
}

export function whatsappHref() {
  const number = sanitizeDigits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5517999999999");
  const text = encodeURIComponent(
    "Olá! Quero agendar um horário na Cavalheiro Barbearia. Pode me ajudar com os horários disponíveis?"
  );
  return `https://wa.me/${number}?text=${text}`;
}
