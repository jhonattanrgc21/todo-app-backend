// ======================================
//			Main Modules
// ======================================
import { join } from 'path';
import express from 'express';
import { Container } from 'typedi';
import connect from '../config/database';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, ResolverData } from 'type-graphql';

// ======================================
//				Middlewares
// ======================================
//import { authChecker } from './middlewares/auth.middleware';

// ======================================
//				Bootstraping
// ======================================
export default async function App() {
	await connect();
	const app = express();
	const schema = await buildSchema({
		validate: false,
		//authChecker,
		resolvers: [
			join(__dirname, '/models/**.model.{ts,js}'),
			join(__dirname, '/resolvers/**/**.resolver.{ts,js}'),
		],
		dateScalarMode: 'timestamp',
		container: ({ context }: ResolverData<any>) =>
			Container.of(context.requestId),
	});

	const apolloServer = new ApolloServer({
		schema,
		playground: process.env.NODE_PLAY ? true : false,
		context: ({ req, res }) => ({ req, res }),
		uploads: false,
	});
	apolloServer.applyMiddleware({ app, path: '/v1' });
	return app;
}
