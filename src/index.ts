// ======================================
//			Main Modules
// ======================================
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import App from './app/app.module';
import { createServer } from 'http';

// ======================================
//				Constant
// ======================================
const PORT = process.env.NODE_PORT || 4000;

// ======================================
//				Constant
// ======================================
async function main() {
	dotenv.config();
	const app = await App();
	app.listen(PORT, () =>
		console.log(`Application is running on: http://localhost:${PORT}`),
	);
	/*const httpServer = createServer(server);
	console.log(`Application is running on: http://localhost:${PORT}`);*/
}

main();
