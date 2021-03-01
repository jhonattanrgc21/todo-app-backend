import {
	ID,
	Field,
	ObjectType,
	GraphQLISODateTime,
} from 'type-graphql';

// ======================================
//		User Entity - GraphQL
// ======================================
@ObjectType({ description: 'User Model' })
export default class User {
	@Field(() => ID)
	public id!: number;

	@Field(() => String)
	public email!: string;

	@Field(() => String)
	public first_name!: string;

	@Field(() => String)
	public last_name!: string;

	@Field(() => GraphQLISODateTime, { nullable: true })
	public created_at?: string;

	@Field(() => GraphQLISODateTime, { nullable: true })
	public updated_at?: string;


	// ======================================
	//				Full Name
	// ======================================
	@Field(() => String)
	public nombre_completo(): string {
		return `${this.first_name.replace(
			/^./,
			this.first_name[0].toUpperCase(),
		)} ${this.last_name.replace(/^./, this.last_name[0].toUpperCase())}`;
	}
}
