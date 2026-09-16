import { z } from 'zod';

export const profileSchema = z.object({
	firstName: z.string().min(1, 'Имя обязательно'),
	lastName: z.string().min(1, 'Фамилия обязательна'),
	age: z
		.string()
		.refine((v) => v === '' || /^\d+$/.test(v), 'Только цифры')
		.refine((v) => v === '' || Number(v) >= 18, 'Возраст от 18 лет')
		.refine((v) => v === '' || Number(v) <= 120, 'Возраст до 120 лет'),
	birthDate: z.string(),
	city: z.string(),
	phone: z
		.string()
		.refine((v) => v === '' || /^\+?[\d\s()-]+$/.test(v), 'Некорректный телефон'),
	email: z.string().email('Некорректный email').or(z.literal('')),
	website: z.string().url('Некорректный URL').or(z.literal('')),
	job: z.string(),
	company: z.string(),
	education: z.string(),
	englishLevel: z.string(),
	learningGoal: z.string(),
	dailyGoal: z
		.string()
		.refine((v) => v === '' || /^\d+$/.test(v), 'Только цифры')
		.refine((v) => v === '' || Number(v) > 0, 'Больше нуля'),
	bio: z.string(),
	notes: z.string(),
	gender: z.string(),
	maritalStatus: z.string(),
	spouseName: z.string(),
	maidenName: z.string(),
	interests: z.array(z.string()),
	studyTime: z.array(z.string()),
});

export type ProfileFormData = z.infer<typeof profileSchema>;