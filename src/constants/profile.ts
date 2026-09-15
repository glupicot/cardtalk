import type { ProfileField } from '../types'
export const PROFILE_FIELDS: ProfileField[] = [
    { name: 'firstName', label: 'Имя', type: 'text', value: '' },
    { name: 'lastName', label: 'Фамилия', type: 'text', value: '' },
    { name: 'age', label: 'Возраст', type: 'number', value: 0 },
    { name: 'bio', label: 'О себе', type: 'textarea', value: '' },
    { name: 'country', label: 'Страна', type: 'select', value: '', options: ['Россия', 'США', 'Германия'] },
    { name: 'gender', label: 'Пол', type: 'radio', value: '', options: ['М', 'Ж'] },
];