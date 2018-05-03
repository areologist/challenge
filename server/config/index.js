const requiredVars = [
  'GEOCODE_API_TOKEN',
];

requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const defaults = {
  env: 'dev',
  geocode: {
    apiToken: '',
  },
  logger: {
    level: 'info',
    enabled: false,
  },
  server: {
    port: 8080,
  },
};

const config = {
  env: process.env.NODE_ENV || defaults.env,
  geocode: {
    apiToken: process.env.GEOCODE_API_TOKEN || defaults.geocode.apiToken,
  },
  logger: {
    level: process.env.LOG_LEVEL || defaults.logger.level,
    enabled: process.env.BOOLEAN ?
      process.env.BOOLEAN.toLowerCase() === 'true' :
      defaults.logger.enabled,
  },
  server: {
    port: Number(process.env.PORT) || defaults.server.port,
  },
};

export default config;
