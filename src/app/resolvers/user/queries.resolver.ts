import User from '../../models/users.model';
import UsersService from '../../../services/users.service';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ID, Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export default class UsersQueries {
	// ======================================
	//				Constructor
	// ======================================
	constructor(
		@InjectRepository(UsersService)
		private readonly service: UsersService,
	) {}

	// ======================================
	//				Get All Users
	// ======================================
	@Query(() => [User], { description: 'Get all Users' })
	public async users() {
		return await this.service.findAllUser();
	}

	// ======================================
	//				Get User
	// ======================================
	@Query(() => User, { description: 'Get User By ID' })
	public async user(@Arg('id', () => ID) id: number) {
		return await this.service.findOneByID(id);
	}

	// ======================================
	//			Find User Bby Email
	// ======================================
	@Query(() => User, { description: 'Get User By Email' })
	public async userByEmail(@Arg('email', () => String) email: string) {
		return await this.service.findOneByEmail(email);
	}
}
