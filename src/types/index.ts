export interface Card {
	id: number;
	title: string;
	word: string;
	example: string;
	translation: string;
}

export interface ProfileField {
	name: string;
	label: string;
	type: 'text' | 'number' | 'textarea' | 'date' | 'select' | 'checkbox' | 'radio';
	value: string | number | boolean | string[];
	options?: string[];
}

export interface User {
	login: string;
	isAuth: boolean;
}