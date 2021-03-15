import {
	Index,
	Entity,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
} from 'typeorm';
import bcrypt from 'bcryptjs';

// ======================================
//		User Entity - SQL
// ======================================
@Entity('users')
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
	public id!: string;

	@Index('user_email_unique', { unique: true })
	@Column({
		type: 'varchar',
		length: 191,
	})
	public email!: string;

	@Column({
		type: 'varchar',
		length: 191,
	})
	public password!: string;

	@Column({
		type: 'varchar',
		length: 191,
		comment: 'Nombres.',
	})
	public first_name!: string;

	@Column({
		type: 'varchar',
		length: 191,
		comment: 'Apellidos.',
	})
	public last_name!: string;

	@CreateDateColumn({
		type: 'timestamp',
		nullable: true,
		select: false,
	})
	public created_at?: string;

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: true,
		select: false,
	})
	public updated_at?: string;

	// ======================================
	//			Encrypt Password
	// ======================================
	public encryptPassword() {
		const salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}

	// ======================================
	//			Match Password
	// ======================================
	public matchPassword(receivedPassword: string) {
		return bcrypt.compareSync(receivedPassword, this.password);
	}
}
