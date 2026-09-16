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

Na seção **Servir**, a pessoa escolhe uma das quatro áreas e clica em **Seja um voluntário**. O formulário abre sobre a página, com a área de interesse já preenchida, e solicita:

- nome completo;
- celular com DDD;
- nome da igreja local que frequenta;
- se já serve em algum ministério e, em caso positivo, qual;
- autorização para usar os dados na análise da inscrição e no contato.

O envio usa o [FormSubmit AJAX](https://formsubmit.co/ajax-documentation), diretamente do navegador, sem servidor de backend próprio. O destinatário padrão é **deniswendell0101@gmail.com**. A confirmação na tela aparece somente quando o serviço aceita o envio; ela informa que a inscrição será analisada e que a equipe retornará pelo celular informado. A aceitação do serviço não comprova a entrega na caixa de entrada.

### Configurar o email destinatário

Para mudar o destinatário, copie `.env.example` para `.env.local` e altere:

```dotenv
NEXT_PUBLIC_VOLUNTEER_EMAIL=deniswendell0101@gmail.com
```

Essa variável é pública e incorporada ao código do navegador durante o build; não coloque senhas ou chaves nela. Reinicie `npm run dev` após mudar o arquivo. Na hospedagem, configure a variável no projeto e faça um novo build/deploy para aplicar a mudança.

### Ativar e conferir o recebimento

1. Abra o site pelo servidor local ou pelo endereço publicado; não use um arquivo `file://`.
2. Faça um primeiro envio com dados de teste. O FormSubmit enviará um email de ativação ao destinatário configurado.
3. Abra o link de confirmação recebido. Verifique também a pasta de spam.
4. Depois da ativação, faça outro envio de teste e confira se todos os campos chegaram ao email e se a confirmação apareceu no site.

Nenhuma mensagem de teste real foi enviada durante a implementação. A ativação e a entrega precisam ser verificadas antes de divulgar as inscrições. Se mudar o destinatário, repita a ativação. Consulte a [ajuda oficial do FormSubmit](https://formsubmit.co/help).

### Onde ficam os dados

O site não mantém banco de dados nem grava inscrições no `localStorage`. Cada inscrição recebida fica registrada no email do destinatário, conforme a retenção da própria caixa postal. O FormSubmit também informa que mantém um arquivo temporário por **30 dias**, acessível pela API com limite de **cinco consultas por dia**; ele não substitui um arquivo permanente da equipe.

O formulário usa um campo invisível contra bots (honeypot), com reCAPTCHA desativado para o envio dentro da página. O fornecedor pode aplicar restrições contra abuso. Não há autoresposta por email para o voluntário; o retorno combinado é pelo celular. Detalhes na [documentação do FormSubmit](https://formsubmit.co/documentation).

## Direção de motion

Já há movimento em:

- frames do hero
- glows
- símbolos `+`
- entrada das seções no scroll
- cards de experiência e voluntariado

A próxima camada pode usar GSAP ScrollTrigger para cenas mais cinematográficas.
