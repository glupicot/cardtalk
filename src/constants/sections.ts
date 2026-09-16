import type { ProfileField } from '../types';

export const PROFILE_SECTIONS: Record<string, ProfileField[]> = {
	'Личные данные': [
		{ name: 'firstName', label: 'Имя', type: 'text', value: '' },
		{ name: 'lastName', label: 'Фамилия', type: 'text', value: '' },
		{ name: 'age', label: 'Возраст', type: 'number', value: 0 },
		{ name: 'birthDate', label: 'Дата рождения', type: 'date', value: '' },
		{ name: 'gender', label: 'Пол', type: 'radio', value: '', options: ['М', 'Ж'] },
		{ name: 'maritalStatus', label: 'Семейное положение', type: 'radio', value: '', options: ['Не женат/Не замужем', 'Женат/Замужем', 'В разводе'] },
		{ name: 'spouseName', label: 'Имя супруга', type: 'text', value: '', visibleWhen: { field: 'maritalStatus', value: 'Женат/Замужем' } },
		{ name: 'maidenName', label: 'Девичья фамилия', type: 'text', value: '', disabledWhen: { field: 'maritalStatus', value: 'Женат/Замужем' }, valueWhenDisabled: 'не применимо' },
	],
	Контакты: [
		{ name: 'city', label: 'Город', type: 'text', value: '' },
		{ name: 'phone', label: 'Телефон', type: 'text', value: '' },
		{ name: 'email', label: 'Email', type: 'text', value: '' },
		{ name: 'website', label: 'Сайт', type: 'text', value: '' },
	],
	Обучение: [
		{ name: 'job', label: 'Работа', type: 'text', value: '' },
		{ name: 'company', label: 'Компания', type: 'text', value: '' },
		{ name: 'education', label: 'Образование', type: 'text', value: '' },
		{ name: 'englishLevel', label: 'Уровень английского', type: 'select', value: '', options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
		{ name: 'learningGoal', label: 'Цель обучения', type: 'select', value: '', options: ['Для работы', 'Для путешествий', 'Для себя', 'Для экзамена'] },
		{ name: 'dailyGoal', label: 'Цель в день (слов)', type: 'number', value: 10 },
	],
	Предпочтения: [
		{ name: 'interests', label: 'Интересы', type: 'checkbox', value: [], options: ['IT', 'Музыка', 'Спорт', 'Кино', 'Книги'] },
		{ name: 'studyTime', label: 'Удобное время для занятий', type: 'checkbox', value: [], options: ['Утро', 'День', 'Вечер', 'Ночь'] },
		{ name: 'bio', label: 'О себе', type: 'textarea', value: '' },
		{ name: 'notes', label: 'Заметки', type: 'textarea', value: '' },
	],
};

export const PROFILE_FIELDS: ProfileField[] = Object.values(PROFILE_SECTIONS).flat();