const SYSTEMS_CONFIG = {
  titan: {
    name: 'Titan',
    logo: '/img/logos/titan-logo.png',
    favicon: '/img/logos/titan-logo.png',
    sidebarLogo: '/img/logos/titan-logo.png'
  },
  ss: {
    name: 'Self-Service',
    logo: '/img/logos/GrupoKCLogo300.png',
    favicon: '/img/logos/GrupoKCLogo300.png',
    sidebarLogo: '/img/logos/GrupoKCLogo300.png'
  },
  CHAT_URL_AUTH: process.env.CHAT_URL_AUTH,
  CHAT_BASE_URL: process.env.CHAT_BASE_URL,
};

module.exports = { SYSTEMS_CONFIG }; 