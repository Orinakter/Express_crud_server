import {Pool} from "pg";

export const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_r1icMGOla2px@ep-restless-voice-apzy25j6-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

  export const initDb = async()=>{
    try{

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR (50) NOT NULL,
            email VARCHAR (60) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role VARCHAR (20) DEFAULT 'user',
            age INT DEFAULT 18,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)

    }catch (error){
        console.log(error);
    }

}