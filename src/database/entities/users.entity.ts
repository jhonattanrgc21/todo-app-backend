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
import { BeforeInsert } from 'typeorm';

// ======================================
//		User Entity - SQL
// ======================================
@Entity('users')
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
	public id!: number;

	@Index('users_email_unique', { unique: true })
	@Column({ type: 'varchar', length: 191 })
	public email!: string;

	@Column({ type: 'varchar', length: 191 })
	public password!: string;

	@Column({ type: 'varchar', length: 191, comment: 'Nombres.' })
	public first_name!: string;

	@Column({ type: 'varchar', length: 191, comment: 'Apellidos.' })
	public last_name!: string;

	// ======================================
	//			RelationShips
	// ======================================

	@CreateDateColumn({
		type: 'timestamptz',
		nullable: true,
	})
	public created_at?: string;

	@UpdateDateColumn({
		type: 'timestamptz',
		nullable: true,
	})
	public updated_at?: string;

	// ======================================
	//			Encrypt Password
	// ======================================
	@BeforeInsert()
	public async encryptPassword() {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}

	// ======================================
	//			Match Password
	// ======================================
	public async matchPassword(receivedPassword: string) {
		return await bcrypt.compare(receivedPassword, this.password);
	}
}
