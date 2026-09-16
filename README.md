# Vem e Vê — Website Experience

Primeira implementação do site do movimento evangelístico **Vem e Vê**, baseada no protótipo do Figma.

## Stack

- Next.js (App Router)
- React
- TypeScript
- CSS nativo
- Animações CSS + IntersectionObserver

Nesta primeira versão não há dependências de animação externas. Isso deixa a base leve e permite adicionar GSAP/Framer Motion depois, quando as interações forem fechadas.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Onde colocar as fotos depois

Há três espaços de galeria na seção **Experiências**. As fotos finais poderão ser colocadas em:

```text
public/events/
```

Sugestão de nomes:

```text
public/events/louvor.jpg
public/events/testemunhos.jpg
public/events/missao.jpg
```

Os placeholders estão no componente:

```text
components/PhotoSlot.tsx
```

Quando as imagens chegarem, basta substituir o conteúdo do `PhotoSlot` por `next/image` ou transformar o componente para receber `src`.

## Formulário de voluntariado

O formulário está propositalmente bloqueado nesta primeira versão. A próxima etapa pode conectar:

- Supabase/PostgreSQL
- validação dos campos
- WhatsApp
- confirmação de inscrição
- painel interno de voluntários

## Direção de motion

Já há movimento em:

- frames do hero
- glows
- símbolos `+`
- entrada das seções no scroll
- cards de experiência e voluntariado

A próxima camada pode usar GSAP ScrollTrigger para cenas mais cinematográficas.
