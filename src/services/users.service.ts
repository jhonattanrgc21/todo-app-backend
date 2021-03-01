import User from '../database/entities/users.entity';
import GeneralResponse from '../config/general-response';
import { Repository, EntityRepository } from 'typeorm';
import { UsersInterface } from '../app/interfaces/users.interface';

@EntityRepository(User)
export default class UsersService extends Repository<User> {
	// ======================================
	//				Created User
	// ======================================
	public async created(
		input: UsersInterface,
	): Promise<User> {
		const entity = this.create(input);
		return await entity.save();
	}

	// ======================================
	//				Find All
	// ======================================
	public async findAllUser(): Promise<User[]> {
		return await this.find();
	}

	// ======================================
	//			Find One By Email
	// ======================================
	public async findOneByEmail(email: string): Promise<User | undefined> {
		return await this.findOne({ email });
	}

	// ======================================
	//			Find One By ID
	// ======================================
	public async findOneByID(id: number): Promise<User | undefined> {
		return await this.findOne(id);
	}

	// ======================================
	//				Update
	// ======================================
	public async updated(
		id: number,
		input: UsersInterface,
	): Promise<User> {
		const entity = await this.findOneOrFail(id);
		entity.email = input.email ? input.email : entity.email;
		entity.last_name = input.last_name ? input.last_name : entity.last_name;
		entity.first_name = input.first_name
			? input.first_name
			: entity.first_name;
		return await this.save(entity);
	}

	// ======================================
	//				Deleted
	// ======================================
	public async deleted(id: number): Promise<GeneralResponse> {
		await this.delete(id);
		return {
			status: '200',
			message: 'Registro eliminado..',
		};
	}
}
