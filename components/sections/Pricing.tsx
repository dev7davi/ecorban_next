"use client";

import { BuildingOffice2Icon, CheckIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { brl, ciclos, type Faixa, incluso, precoPorMes, tiers } from "@/content/pricing";
import { whatsappLink } from "@/content/site";

// Ilustrações line-art em círculos pastel, no estilo dos avisos do sistema.
const art = [
  { icon: UserGroupIcon, bg: "bg-brand-50 dark:bg-brand-950", fg: "text-brand-600 dark:text-brand-300", ring: "#fb923c" },
  { icon: ChartBarIcon, bg: "bg-green-50 dark:bg-green-950/50", fg: "text-success", ring: "#2751c5" },
  { icon: BuildingOffice2Icon, bg: "bg-orange-50 dark:bg-orange-950/40", fg: "text-pipe-analise", ring: "#22c55e" },
];

export function Pricing() {
  const [cicloId, setCicloId] = useState("anual");
  const ciclo = ciclos.find((c) => c.id === cicloId)!;
  const [escolha, setEscolha] = useState<Record<string, Faixa>>(Object.fromEntries(tiers.map((t) => [t.id, t.faixas[0]])));

  return (
    <section id="planos" className="px-[19px] py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle title="Planos por tamanho de equipe">De 3 a 320 usuários, com todos os módulos. Você escolhe a faixa e o ciclo.</SectionTitle>
        </Reveal>

        {/* Seletor de ciclo */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Grade 2×2 no celular; pílula única a partir do sm */}
          <div role="radiogroup" aria-label="Ciclo de pagamento" className="grid w-full max-w-sm grid-cols-2 gap-1 rounded-2xl bg-page-alt p-1 ring-1 ring-line/60 sm:inline-flex sm:w-auto sm:max-w-none sm:rounded-full">
            {ciclos.map((c) => (
              <button
                key={c.id}
                role="radio"
                aria-checked={c.id === cicloId}
                onClick={() => setCicloId(c.id)}
                className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors sm:rounded-full sm:py-2 ${c.id === cicloId ? "bg-brand-600 text-white shadow" : "text-body hover:text-strong"}`}
              >
                {c.nome}
                {c.popular && <span className="ml-1.5 rounded-full bg-pipe-averbado px-1.5 py-0.5 text-[10px] text-white">Mais escolhido</span>}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-balance text-muted">Trimestral 5% off · Semestral 10% off · Anual com 2 meses grátis</p>
        </div>

        {/* Cards de plano */}
        <div className="mx-auto mt-12 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const faixa = escolha[tier.id];
            const mes = precoPorMes(faixa, ciclo);
            const A = art[i];
            return (
              <Reveal key={tier.id}>
                <div className={`flex h-full flex-col rounded-2xl bg-page-alt p-6 ring-1 ${tier.destaque ? "ring-2 ring-brand-600" : "ring-line/60"}`}>
                  <div className={`relative grid h-40 place-items-center overflow-hidden rounded-xl ${A.bg}`} aria-hidden="true">
                    <span className="absolute top-5 right-8 size-5 rounded-full border-4" style={{ borderColor: A.ring }} />
                    <span className="absolute bottom-6 left-8 size-3 rounded-full" style={{ background: A.ring }} />
                    <span className="grid size-24 place-items-center rounded-full bg-surface shadow-sm">
                      <A.icon className={`size-12 ${A.fg}`} strokeWidth={1.75} />
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-strong">{tier.nome}</h3>
                    {tier.destaque && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-300">Recomendado</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted">{tier.descricao}</p>

                  <label className="mt-5 block text-xs font-semibold text-muted" htmlFor={`faixa-${tier.id}`}>
                    Usuários
                  </label>
                  <select
                    id={`faixa-${tier.id}`}
                    value={faixa}
                    onChange={(e) => setEscolha({ ...escolha, [tier.id]: Number(e.target.value) as Faixa })}
                    className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-[15px] font-semibold text-strong"
                  >
                    {tier.faixas.map((f) => (
                      <option key={f} value={f}>
                        Até {f} usuários
                      </option>
                    ))}
                  </select>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-strong tabular-nums">{brl(mes)}</span>
                    <span className="text-sm text-muted">/mês</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {ciclo.meses === 1 ? "Cobrado todo mês" : `${brl(mes * ciclo.meses)} à vista a cada ${ciclo.meses} meses`}
                  </div>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {[`Até ${faixa} usuários`, ...incluso].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[15px] text-body">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-600">
                          <CheckIcon className="size-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button href={whatsappLink(`Olá, quero contratar o plano ${tier.nome} ${ciclo.nome} (até ${faixa} usuários).`)} external arrow className="mt-6 w-full">
                    Contratar
                  </Button>
                  <Button href={whatsappLink(`Olá, tenho dúvidas sobre o plano ${tier.nome} (até ${faixa} usuários).`)} external variant="secondary" className="mt-2 w-full">
                    Falar no WhatsApp
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Comparativo de ciclos */}
        <Reveal>
          {/* Celular: um mini-card por ciclo + o que todos incluem (a tabela exigiria rolagem lateral) */}
          <div className="mt-12 md:hidden">
            <h3 className="text-center font-semibold text-strong">Ciclos e condições</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {ciclos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCicloId(c.id)}
                  aria-pressed={c.id === cicloId}
                  className={`rounded-xl p-4 text-left ring-1 transition-colors ${c.id === cicloId ? "bg-brand-50 ring-2 ring-brand-600 dark:bg-brand-950" : "bg-page-alt ring-line/60"}`}
                >
                  <div className="font-semibold text-strong">{c.nome}</div>
                  <div className="mt-1 text-sm font-medium text-success">{c.desconto === "—" ? "Sem desconto" : c.desconto}</div>
                  <div className="mt-0.5 text-xs text-muted">{c.meses === 1 ? "Cobrança mensal" : `Cobrança a cada ${c.meses} meses`}</div>
                </button>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 rounded-xl bg-page-alt p-4 text-sm text-body ring-1 ring-line/60">
              {["Pagamento à vista no boleto", "Renovação automática", "Todos os módulos", "Teste grátis de 7 dias"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 hidden overflow-x-auto rounded-2xl ring-1 ring-line/60 md:block">
            <table className="w-full min-w-[640px] text-center text-[15px]">
              <caption className="sr-only">Comparativo dos ciclos de pagamento</caption>
              <thead className="bg-page-alt">
                <tr>
                  <th scope="col" className="px-5 py-4 text-left font-semibold text-strong">
                    Ciclos e condições
                  </th>
                  {ciclos.map((c) => (
                    <th key={c.id} scope="col" className={`px-5 py-4 font-semibold ${c.id === cicloId ? "text-brand-600 dark:text-brand-300" : "text-strong"}`}>
                      {c.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {[
                  ["Desconto", ciclos.map((c) => c.desconto)],
                  ["Cobrança", ciclos.map((c) => (c.meses === 1 ? "Mensal" : `A cada ${c.meses} meses`))],
                  ["Pagamento à vista no boleto", ciclos.map(() => true)],
                  ["Renovação automática", ciclos.map(() => true)],
                  ["Todos os módulos", ciclos.map(() => true)],
                  ["Teste grátis de 7 dias", ciclos.map(() => true)],
                ].map(([label, vals]) => (
                  <tr key={label as string}>
                    <th scope="row" className="px-5 py-3.5 text-left font-medium text-body">
                      {label as string}
                    </th>
                    {(vals as (string | boolean)[]).map((v, i) => (
                      <td key={i} className="px-5 py-3.5 text-muted">
                        {v === true ? <CheckIcon className="mx-auto size-5 text-success" strokeWidth={2.5} aria-label="Incluso" /> : (v as string)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-muted">Há taxa de adesão na contratação. Valores ilustrativos até a confirmação da tabela oficial.</p>
        </Reveal>
      </div>
    </section>
  );
}
