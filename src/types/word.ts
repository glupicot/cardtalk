export type Word = {
	id: string;
	word: string;
	partOfSpeech: string;
	example: string;
	translation: string;
	topics: string[];
};

export type Topic = {
	id: string;
	title: string;
	emoji: string;
};