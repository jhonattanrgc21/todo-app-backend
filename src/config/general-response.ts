import { ObjectType, Field } from 'type-graphql';

// ======================================
//		General Response - GraphQL
// ======================================
@ObjectType({ description: 'General Response' })
export default class GeneralResponse {
	@Field(() => String)
	public status!: string;

	@Field(() => String, { nullable: true })
	public message?: string;
}
