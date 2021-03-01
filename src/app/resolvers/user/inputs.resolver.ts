import { Field, InputType } from 'type-graphql';

// ======================================
//			User Input
// ======================================
@InputType({ description: 'Input To Create A User Entity' })
export class CreateUserInput {
	@Field(() => String)
	public email: string;

	@Field(() => String)
	public password: string;

	@Field(() => String)
	public first_name: string;

	@Field(() => String)
	public last_name: string;
}

@InputType({ description: 'Input To Update A User Entity' })
export class UpdateUserInput {
	@Field(() => String, { nullable: true })
	public email?: string;

	@Field(() => String, { nullable: true })
	public password?: string;

	@Field(() => String, { nullable: true })
	public first_name?: string;

	@Field(() => String, { nullable: true })
	public last_name?: string;
}
