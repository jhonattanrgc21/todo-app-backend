import { join } from 'path';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

// ======================================
//			Connect to DB
// ======================================
export default async function connect() {
	useContainer(Container);
	await createConnection({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		schema: 'kernel',
		synchronize: true,
		entities: [join(__dirname, '../database/entities/**.entity.{ts,js}')],
	})
		.then(() => console.log('Database is Connected'))
		.catch((error) => console.log(error));
}
