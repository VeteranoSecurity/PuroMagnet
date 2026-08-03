export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  // Header
  howItWorks: string;
  history: string;
  supportBtn: string;

  // MagnetInput
  badgeText: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDesc: string;
  inputPlaceholder: string;
  clearInput: string;
  pasteLink: string;
  cleanedStatus: string;
  kbdShortcutHint: string;

  // ResultCard
  cleanMagnetBadge: string;
  removedAdsBadge: (count: number) => string;
  untitledMagnet: string;
  decodedUrlLabel: string;
  copyCleanMagnet: string;
  magnetCopied: string;
  openInClient: string;
  copyHash: string;
  hashCopied: string;
  extractionDetails: string;
  base64Found: string;
  rawDecoded: string;
  trackersAnalyzed: string;
  adTrackerRemoved: string;

  // ErrorCard
  noMagnetFoundTitle: string;
  helpBtn: string;
  tryAgainBtn: string;

  // EmptyState
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;

  // HistoryDrawer
  historyTitle: string;
  emptyHistory: string;
  emptyHistorySub: string;
  untitledHistory: string;
  clickToLoad: string;
  clearAllHistory: string;

  // HowItWorksModal
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  modalCloseBtn: string;

  // Donate Modal
  donateTitle: string;
  donateSub: string;
  pixCopyLabel: string;
  pixCopyBtn: string;
  pixCopiedToast: string;
  orBuyMeACoffee: string;

  // Visitor Counter
  visitorCountLabel: (count: number) => string;

  // Toasts
  toastAutoPastedTitle: string;
  toastAutoPastedDesc: string;
  toastMagnetCopiedTitle: string;
  toastHashCopiedTitle: string;
  toastHistoryClearedTitle: string;

  // Footer
  footerPhilosophy: string;
  footerBuiltWith: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    howItWorks: 'Como Funciona',
    history: 'Histórico',
    supportBtn: 'Apoiar Projeto',

    badgeText: 'Filtro Anti-Redirecionamento & Decodificador Instantâneo',
    heroTitle: 'Limpe seu',
    heroTitleHighlight: 'Magnet Link',
    heroDesc: 'Cole a URL encurtada com anúncios, o código Base64 ou a Magnet URI. Nós extraímos e limpamos o link original instantaneamente.',
    inputPlaceholder: 'Cole a URL poluída com anúncios ou a String Base64 aqui...',
    clearInput: 'Limpar Input',
    pasteLink: 'Colar Link',
    cleanedStatus: 'Limpo',
    kbdShortcutHint: 'Atalho: Pressione Ctrl+V em qualquer lugar para colar automaticamente',

    cleanMagnetBadge: 'Magnet Link Limpo',
    removedAdsBadge: (count) => `${count} Anúncio(s) Removidos`,
    untitledMagnet: 'Magnet Link Sem Título Explícito',
    decodedUrlLabel: 'URL Decodificada & Higienizada',
    copyCleanMagnet: 'Copiar Magnet Link Limpo',
    magnetCopied: 'Magnet Copiado para a Área de Transferência!',
    openInClient: 'Abrir no Cliente Torrent',
    copyHash: 'Copiar Hash',
    hashCopied: '✓ Hash Copiado',
    extractionDetails: 'Detalhes da Extração Base64 & Trackers',
    base64Found: 'Payload Base64 Encontrado:',
    rawDecoded: 'Decodificação Raw:',
    trackersAnalyzed: 'Trackers Analisados:',
    adTrackerRemoved: 'Ad Tracker Removido',

    noMagnetFoundTitle: 'Nenhum Magnet Link Encontrado',
    helpBtn: 'Ajuda',
    tryAgainBtn: 'Tentar Novamente',

    feat1Title: 'Decodificação Base64 In-Browser',
    feat1Desc: 'Processamento instantâneo no seu navegador sem enviar links para servidores externos.',
    feat2Title: 'Filtro Anti-Ad Trackers',
    feat2Desc: 'Remove parâmetros de acompanhamento e anúncios (popads, redirectors) da URI.',
    feat3Title: 'Privacidade Total',
    feat3Desc: 'Sem registro de logs. Sua navegação e downloads permanecem 100% confidenciais.',

    historyTitle: 'Histórico de Magnet Links',
    emptyHistory: 'Nenhum link limpo recentemente',
    emptyHistorySub: 'Os links decodificados ficarão salvos localmente aqui.',
    untitledHistory: 'Magnet Link Sem Título',
    clickToLoad: 'Clique para carregar →',
    clearAllHistory: 'Limpar Todo o Histórico',

    howItWorksTitle: 'Como o PuroMagnet Funciona?',
    step1Title: 'Identificação do Parámetro Base64',
    step1Desc: 'Sites de encurtadores e redes de anúncios encapsulam o Magnet Link original em uma string Base64 dentro do parâmetro de URL.',
    step2Title: 'Decodificação & Extração Segura',
    step2Desc: 'O PuroMagnet extrai o payload Base64 e o decodifica diretamente na memória do seu navegador via Web Crypto & TextDecoder API.',
    step3Title: 'Higienização de Ad Trackers',
    step3Desc: 'Filtramos parâmetros de rastreamento maliciosos ou desnecessários inseridos por encurtadores, entregando uma Magnet URI limpa.',
    modalCloseBtn: 'Entendi, voltar ao App',

    donateTitle: 'Apoie o PuroMagnet 💛',
    donateSub: 'Se este app te ajudou a economizar tempo e fugir dos anúncios, considere fazer uma doação via PIX para manter o projeto ativo e gratuito!',
    pixCopyLabel: 'Código PIX Copia e Cola:',
    pixCopyBtn: 'Copiar Código PIX',
    pixCopiedToast: 'Código PIX copiado para a área de transferência!',
    orBuyMeACoffee: 'Ou apoie via Buy Me a Coffee',

    visitorCountLabel: (count) => `${count.toLocaleString('pt-BR')} acessos`,

    toastAutoPastedTitle: 'Link Colado Automaticamente!',
    toastAutoPastedDesc: 'URL decodificada e higienizada via atalho de teclado.',
    toastMagnetCopiedTitle: 'Magnet Link Copiado!',
    toastHashCopiedTitle: 'InfoHash Copiado!',
    toastHistoryClearedTitle: 'Histórico Limpo com Sucesso!',

    footerPhilosophy: 'PuroMagnet Engine • 100% Desenvolvido por TrilhaRede',
    footerBuiltWith: 'Meu tesouro? Se quiserem, podem pegá-lo! Procurem-no! Deixei tudo o que ajuntei naquele lugar!',
  },
  en: {
    howItWorks: 'How It Works',
    history: 'History',
    supportBtn: 'Buy Me a Coffee',

    badgeText: 'Anti-Redirect Filter & Instant Decoder',
    heroTitle: 'Clean your',
    heroTitleHighlight: 'Magnet Link',
    heroDesc: 'Paste the ad-shortened URL, Base64 code, or Magnet URI. We extract and clean the original link instantly.',
    inputPlaceholder: 'Paste ad-polluted URL or Base64 string here...',
    clearInput: 'Clear Input',
    pasteLink: 'Paste Link',
    cleanedStatus: 'Cleaned',
    kbdShortcutHint: 'Shortcut: Press Ctrl+V anywhere to auto-paste',

    cleanMagnetBadge: 'Cleaned Magnet Link',
    removedAdsBadge: (count) => `${count} Ad Tracker(s) Removed`,
    untitledMagnet: 'Untitled Magnet Link',
    decodedUrlLabel: 'Decoded & Sanitized URL',
    copyCleanMagnet: 'Copy Clean Magnet Link',
    magnetCopied: 'Magnet Copied to Clipboard!',
    openInClient: 'Open in Torrent Client',
    copyHash: 'Copy Hash',
    hashCopied: '✓ Hash Copied',
    extractionDetails: 'Base64 Extraction & Tracker Details',
    base64Found: 'Base64 Payload Found:',
    rawDecoded: 'Raw Decoding:',
    trackersAnalyzed: 'Analyzed Trackers:',
    adTrackerRemoved: 'Ad Tracker Removed',

    noMagnetFoundTitle: 'No Magnet Link Found',
    helpBtn: 'Help',
    tryAgainBtn: 'Try Again',

    feat1Title: 'In-Browser Base64 Decoding',
    feat1Desc: 'Instant processing inside your browser without sending links to external servers.',
    feat2Title: 'Anti-Ad Tracker Filter',
    feat2Desc: 'Removes tracking parameters and popad trackers from the URI.',
    feat3Title: 'Total Privacy',
    feat3Desc: 'Zero logs stored. Your browsing and downloads remain 100% confidential.',

    historyTitle: 'Magnet Link History',
    emptyHistory: 'No links cleaned recently',
    emptyHistorySub: 'Decoded links will be stored locally here.',
    untitledHistory: 'Untitled Magnet Link',
    clickToLoad: 'Click to load →',
    clearAllHistory: 'Clear All History',

    howItWorksTitle: 'How Does PuroMagnet Work?',
    step1Title: 'Base64 Parameter Detection',
    step1Desc: 'Ad shorteners and redirect sites wrap the original Magnet Link in a Base64 string inside URL query parameters.',
    step2Title: 'Secure Decoding & Extraction',
    step2Desc: 'PuroMagnet extracts the Base64 payload and decodes it directly in your browser memory via Web Crypto & TextDecoder API.',
    step3Title: 'Ad Tracker Sanitization',
    step3Desc: 'We filter out tracking and spam parameters added by shorteners, delivering a clean, direct Magnet URI.',
    modalCloseBtn: 'Got it, back to App',

    donateTitle: 'Support PuroMagnet 💛',
    donateSub: 'If this tool saved you time and kept you safe from ads, support our open-source project!',
    pixCopyLabel: 'PIX Copy & Paste Code:',
    pixCopyBtn: 'Copy PIX Code',
    pixCopiedToast: 'PIX code copied to clipboard!',
    orBuyMeACoffee: 'Support on Buy Me a Coffee',

    visitorCountLabel: (count) => `${count.toLocaleString('en-US')} visits`,

    toastAutoPastedTitle: 'Link Auto-Pasted!',
    toastAutoPastedDesc: 'URL decoded & sanitized via keyboard shortcut.',
    toastMagnetCopiedTitle: 'Magnet Link Copied!',
    toastHashCopiedTitle: 'InfoHash Copied!',
    toastHistoryClearedTitle: 'History Cleared Successfully!',

    footerPhilosophy: 'PuroMagnet Engine • 100% Developed by TrilhaRede',
    footerBuiltWith: 'My treasure? If you want it, you can have it! Search for it! I left everything I gathered in that place!',
  },
  es: {
    howItWorks: 'Cómo Funciona',
    history: 'Historial',
    supportBtn: 'Apoyar Proyecto',

    badgeText: 'Filtro Anti-Redirección y Decodificador Instantáneo',
    heroTitle: 'Limpia tu',
    heroTitleHighlight: 'Magnet Link',
    heroDesc: 'Pega la URL acortada con anuncios, el código Base64 o la Magnet URI. Extraemos y limpiamos el enlace original al instante.',
    inputPlaceholder: 'Pega la URL con anuncios o la cadena Base64 aquí...',
    clearInput: 'Limpiar Input',
    pasteLink: 'Pegar Enlace',
    cleanedStatus: 'Limpio',
    kbdShortcutHint: 'Atajo: Presiona Ctrl+V en cualquier lugar para pegar automáticamente',

    cleanMagnetBadge: 'Magnet Link Limpio',
    removedAdsBadge: (count) => `${count} Anuncio(s) Removido(s)`,
    untitledMagnet: 'Magnet Link Sin Título',
    decodedUrlLabel: 'URL Decodificada y Higienizada',
    copyCleanMagnet: 'Copiar Magnet Link Limpio',
    magnetCopied: '¡Magnet Copiado al Portapapeles!',
    openInClient: 'Abrir en Cliente Torrent',
    copyHash: 'Copiar Hash',
    hashCopied: '✓ Hash Copiado',
    extractionDetails: 'Detalles de Extracción Base64 y Trackers',
    base64Found: 'Payload Base64 Encontrado:',
    rawDecoded: 'Decodificación Raw:',
    trackersAnalyzed: 'Trackers Analizados:',
    adTrackerRemoved: 'Ad Tracker Removido',

    noMagnetFoundTitle: 'Ningún Magnet Link Encontrado',
    helpBtn: 'Ayuda',
    tryAgainBtn: 'Reintentar',

    feat1Title: 'Decodificación Base64 en Navegador',
    feat1Desc: 'Procesamiento instantáneo en tu navegador sin enviar enlaces a servidores externos.',
    feat2Title: 'Filtro Anti-Ad Trackers',
    feat2Desc: 'Elimina parámetros de rastreo y anuncios de la URI.',
    feat3Title: 'Privacidad Total',
    feat3Desc: 'Sin registros de logs. Tu navegación y descargas permanecen 100% confidenciales.',

    historyTitle: 'Historial de Magnet Links',
    emptyHistory: 'Sin enlaces limpiados recientemente',
    emptyHistorySub: 'Los enlaces decodificados se guardarán localmente aquí.',
    untitledHistory: 'Magnet Link Sin Título',
    clickToLoad: 'Clic para cargar →',
    clearAllHistory: 'Limpar Todo el Historial',

    howItWorksTitle: '¿Cómo funciona PuroMagnet?',
    step1Title: 'Detección del Parámetro Base64',
    step1Desc: 'Los acortadores con anuncios encapsulan el Magnet Link original en una cadena Base64 dentro del parámetro de URL.',
    step2Title: 'Decodificación y Extracción Segura',
    step2Desc: 'PuroMagnet extrae el payload Base64 y lo decodifica directamente en la memoria de tu navegador.',
    step3Title: 'Higienización de Ad Trackers',
    step3Desc: 'Filtramos parámetros de rastreo maliciosos o innecesarios entregando una Magnet URI limpia.',
    modalCloseBtn: 'Entendido, volver a la App',

    donateTitle: 'Apoya a PuroMagnet 💛',
    donateSub: 'Si esta herramienta te ahorró tiempo y te libró de los anuncios, ¡considera apoyarnos!',
    pixCopyLabel: 'Código PIX Copiar y Pegar:',
    pixCopyBtn: 'Copiar Código PIX',
    pixCopiedToast: '¡Código PIX copiado al portapapeles!',
    orBuyMeACoffee: 'Apoyar en Buy Me a Coffee',

    visitorCountLabel: (count) => `${count.toLocaleString('es-ES')} visitas`,

    toastAutoPastedTitle: '¡Enlace Pegado Automáticamente!',
    toastAutoPastedDesc: 'URL decodificada e higienizada mediante atajo de teclado.',
    toastMagnetCopiedTitle: '¡Magnet Link Copiado!',
    toastHashCopiedTitle: '¡InfoHash Copiado!',
    toastHistoryClearedTitle: '¡Historial Limpiado con Éxito!',

    footerPhilosophy: 'PuroMagnet Engine • 100% Desarrollado por TrilhaRede',
    footerBuiltWith: '¿Mi tesoro? ¡Si lo queréis, es vuestro! ¡Buscadlo! ¡Lo dejé todo guardado en ese lugar!',
  },
};
