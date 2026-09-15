export interface Card {
	id: number;
	title: string;
	word: string;
	example: string;
	translation: string;
}
interface BaseField {
	name: string;
	label: string;
}

export interface TextField extends BaseField {
	type: 'text';
	value: string;
}

export interface NumberField extends BaseField {
	type: 'number';
	value: number;
}

export interface TextareaField extends BaseField {
	type: 'textarea';
	value: string;
}

export interface DateField extends BaseField {
	type: 'date';
	value: string;
}

export interface SelectField extends BaseField {
	type: 'select';
	value: string;
	options: string[];
}

export interface CheckboxField extends BaseField {
	type: 'checkbox';
	value: string[];
	options: string[];
}

export interface RadioField extends BaseField {
	type: 'radio';
	value: string;
	options: string[];
}

export type ProfileField =
	| TextField
	| NumberField
	| TextareaField
	| DateField
	| SelectField
	| CheckboxField
	| RadioField;


export interface User {
	login: string;
	isAuth: boolean;
}