# 🧲 PuroMagnet — Anti-Redirect Base64 & Clean Magnet Link Shield

![PuroMagnet Banner](https://raw.githubusercontent.com/TrilhaRede/PuroMagnet/main/public/favicon.svg)

> **PuroMagnet** é uma aplicação web SPA (Single Page Application) moderna, minimalista e de alta performance criada para extrair e higienizar **Magnet Links** encapsulados em strings **Base64** por encurtadores de links e redes de anúncios abusivas.

---

## ✨ Funcionalidades Principais

- ⚡ **Decodificação Base64 In-Browser:** Processamento 100% no navegador via Web Crypto & TextDecoder API. Nenhum link é enviado para servidores externos.
- 🛡️ **Filtro Anti-Ad Trackers:** Identifica e remove trackers maliciosos ou desnecessários (popads, redirectors, adservers) mantendo apenas os trackers limpos e ativos.
- 🚀 **Efeito 3D Hyperspace Warp Drive:** Shader procedural em tempo real desenvolvido com Three.js & GLSL Shaders que se adapta a 100% de qualquer resolução.
- 🌐 **Suporte Multilingue (i18n):** Alternância instantânea entre Português (🇧🇷 PT), Inglês (🇺🇸 EN) e Espanhol (🇪🇸 ES).
- ⌨️ **Atalhos de Teclado Globais:**
  - `Ctrl + V` / `Cmd + V`: Cola e limpa o link automaticamente em qualquer lugar da tela.
  - `Ctrl + K` / `Cmd + K`: Limpa o input instantaneamente.
  - `Esc`: Fecha modais e gavetas.
- 🔔 **Notificações Toast Animadas:** Sistema de toasts responsivo construído com Framer Motion.
- 📜 **Histórico de Links Recentes:** Armazenamento local (`localStorage`) para rápida reutilização.
- 🔍 **Modal de Detalhes da Extração:** Inspetor completo para visualizar o payload Base64, a decodificação Raw e os trackers analisados.

---

## 🛠️ Stack Tecnológica

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações & UI:** [Framer Motion](https://www.framer.com/motion/) + [Lucide React](https://lucide.dev/)
- **Graphics & Shaders:** [Three.js](https://threejs.org/) (GLSL Shaders + Orthographic Camera)

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/PuroMagnet.git
cd PuroMagnet
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173/` no seu navegador.

### 4. Gerar Build de Produção
```bash
npm run build
```

---


## 📜 Licença & Créditos

Desenvolvido por **TrilhaRede**.
*"Meu tesouro? Se quiserem, podem pegá-lo! Procurem-no! Deixei tudo o que ajuntei naquele lugar!"*
