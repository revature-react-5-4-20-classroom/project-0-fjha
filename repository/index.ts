import { Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config();
// export PG_HOST=database-ems.chkovyfhlhvp.us-east-2.rds.amazonaws.com
// export PG_USER=postgres
// export PG_PASSWORD=wasspord
// export PG_DATABASE=postgres
export const connectionPool : Pool = new Pool({
    host: process.env['PG_HOST'],
    user: process.env['PG_USER'],
    password: process.env['PG_PASSWORD'],
    database: process.env['PG_DATABASE'],
    port: 5432,
    max: 5 //max number of connections
  });