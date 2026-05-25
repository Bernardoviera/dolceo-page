# 🧩 Componentes Reutilizáveis — Método Dolceo

Biblioteca de componentes prontos para usar em LPs futuras.
Cada pasta tem o HTML, CSS e JS necessários — basta copiar e adaptar.

---

## 📁 Estrutura

| Pasta | Componente | Impacto |
|---|---|---|
| `design-tokens/` | Variáveis CSS (cores, fontes, sombras) | Base de qualquer LP |
| `reveal-animations/` | Animações ao rolar a página | Visual premium |
| `timer-urgencia/` | Countdown regressivo na oferta | 🔴 Alta conversão |
| `sticky-cta/` | Botão fixo que aparece no mobile | 🔴 Alta conversão |
| `faq-accordion/` | Perguntas e respostas com animação | Reduz objeções |
| `contadores-animados/` | Números que contam ao entrar na tela | Prova social |
| `hero-section/` | Seção inicial completa com CTA | Primeira impressão |
| `oferta-preco/` | Card de preço com desconto e garantia | Fechamento |
| `depoimentos/` | Grid de depoimentos com card destaque | Prova social |

---

## ⚡ Como usar

1. Copie os tokens de `design-tokens/tokens.css` para o `<head>` da sua LP
2. Copie o CSS do componente para o seu `style.css`
3. Cole o HTML no local desejado na página
4. Se houver JS, cole no seu `script.js` ou antes do `</body>`

---

## 🎨 Design System

- **Fonte display:** Cormorant Garamond (Google Fonts)
- **Fonte corpo:** DM Sans (Google Fonts)
- **Cores:** Rose `#EF93A0` · Gold `#C9A96E` · Dark `#1A1015` · Cream `#F5EFE6`
- **Público:** Feminino, 25–50 anos, produto digital

Para mudar o esquema de cores de um projeto, altere apenas as variáveis em `design-tokens/tokens.css` — todos os componentes atualizarão automaticamente.
