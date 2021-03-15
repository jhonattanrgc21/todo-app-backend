import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {
	CreateUserInterface,
	UpdateUserInterface,
} from '../app/interfaces/user.interface';
import User from '../database/entities/users.entity';

// ======================================
//			User Controller
// ======================================
export default class UserController {
	static getAll = async (req: Request, res: Response) => {
		let users;
		users = await getRepository(User).find({
			select: [
				'id',
				'email',
				'first_name',
				'last_name',
			]
		});

		if (users.length)
			// Si existen usuarios, devuelvo sus datos
			res.json(users);
		// En caso contrario, envio un error.
		else
			return res.status(404).json({
				message: 'Error, no existen usuarios registrados.',
			});
	};

	static getById = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			// Si existe el usuario, devuelvo sus datos.
			const user = await getRepository(User).findOneOrFail(id);
			delete user.password;
			res.json(user);
		} catch (error) {
			// En caso contrario, envio un error.
			return res.status(404).json({
				message: 'Error, este usuario no existe.',
			});
		}
	};

	static newUser = async (req: Request, res: Response) => {
		const input: CreateUserInterface = req.body;
		let user;

		// Validando que vienen datos del Front-End
		if (
			!(
				input.email &&
				input.password &&
				input.first_name &&
				input.last_name
			)
		)
			return res
				.status(400)
				.json({ message: 'Todos los campos son requeridos.' });

		// Validando por email
		user = await getRepository(User).findOne(input.email);
		if (user)
			return res.status(409).json({
				message: 'Error, ya existe un usuario con este email.',
			});

		let entity = new User();
		entity.email = input.email;
		entity.password = input.password;
		entity.first_name = input.first_name;
		entity.last_name = input.last_name;
	
		try {
			// Si no hay errores, guardo el registro de Usuario
			entity.encryptPassword();
			await getRepository(User).save(entity);
		} catch (error) {
			// En caso contrario, envio un error.
			return res.status(404).json({
				message: 'Algo salio mal.',
			});
		}

		res.status(201).json({
			message: 'Usuario registrado con exito.',
		});
	};

	static editUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const input: UpdateUserInterface = req.body;
		let entity: User;

		try {
			// Si existe el usuario, actualizo sus datos.
			entity = await getRepository(User).findOneOrFail(id);

			// Validando por email
			if (input.email) {
				const user = await getRepository(User).findOne(input.email);
				if (user)
					return res.status(409).json({
						message: 'Error, ya existe un usuario con este email.',
					});
				entity.email = input.email;
			}

			entity.first_name = input.first_name
				? input.first_name
				: entity.first_name;

			entity.last_name = input.last_name
				? input.last_name
				: entity.last_name;
		} catch (error) {
			// En caso contrario, envio un error.
			return res.status(404).json({
				message: 'Error, el usuario no existe.',
			});
		}

		try {
			// Si no hay errores, guardo el registro de Usuario
			await getRepository(User).save(entity);
		} catch (error) {
			// En caso contrario, envio un error.
			return res.status(409).json({
				message: 'Error, ya existe un usuario con este profesionalID.',
			});
		}

		return res.status(201).json('Usuario actualizado con exito.');
	};

	static deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			// Verifico si el usuario existe.
			await getRepository(User).findOneOrFail(id);
		} catch (error) {
			// En caso contrario, envio un error.
			return res.status(404).json({
				message: 'Error, el usuario no existe.',
			});
		}

		await getRepository(User).delete(id);

		res.status(201).json({
			message: 'Usuario eliminado con exito.',
		});
	};
}
