import { CreateUserInput, UpdateUserInput } from './inputs.resolver';;
import UsersService from '../../../services/users.service';
import { InjectRepository } from 'typeorm-typedi-extensions';
import GeneralResponse from '../../../config/general-response';
import { Arg, ID, Resolver, Mutation } from 'type-graphql';
import User from '../../models/users.model';

@Resolver()
export default class UsersMutations {
	// ======================================
	//				Constructor
	// ======================================
	constructor(
		@InjectRepository(UsersService)
		private readonly service: UsersService,
	) {}

	// ======================================
	//			Created User Resolver
	// ======================================
	@Mutation(() => User, { description: 'Created A New User Entity' })
	public async createUser(
		@Arg('input', () => CreateUserInput)
		input: CreateUserInput,
	) {
		return await this.service.created(input);
	}

	// ======================================
	//			Updated User Resolver
	// ======================================
	@Mutation(() => User, { description: 'Updated A New User Entity' })
	public async updateUser(
		@Arg('id', () => ID) id: number,
		@Arg('input', () => UpdateUserInput) input: UpdateUserInput,
	) {
		return await this.service.updated(id, input);
	}


	// ======================================
	//		Deleted User Resolver
	// ======================================
	@Mutation(() => GeneralResponse, {
		description: 'Deleted A User Entity',
	})
	public async deleteUser(@Arg('id', () => ID) id: number) {
		return await this.service.deleted(id);
	}
}
