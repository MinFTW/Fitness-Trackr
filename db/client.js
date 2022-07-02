const { Pool } = require('pg/lib');

const connectionString =
  process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
