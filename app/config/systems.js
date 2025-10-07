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
  AZURE_SERVICE_BUS_CONNECTION_STRING: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
  CHAT_URL_AUTH: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  CHAT_BASE_URL: "https://apipy.kcapis.net/chatbase",
};

module.exports = { SYSTEMS_CONFIG }; 