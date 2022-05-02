var dbConfig = {
  type: 'sqlite',
  synchronize: true,
};

switch (process.env.STAGE) {
  case 'dev':
    Object.assign(dbConfig, {
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'prod':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL, //already set on Heroku
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
      entities: ['**/*.entity.js'],
      autoloadEntities: true,
      synchronize: true, //setup migrations to avoid this!
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
