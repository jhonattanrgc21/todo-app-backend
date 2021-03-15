// ======================================
//			User Interface
// ======================================
export interface CreateUserInterface {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

export interface UpdateUserInterface {
	email?: string;
	first_name?: string;
	last_name?: string;
}
