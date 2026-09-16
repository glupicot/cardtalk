import styles from './checkbox.module.css';

interface Props {
	name: string;
	options: string[];
	value: string[];
	onChange: (value: string[]) => void;
	disabled?: boolean;
}
export const Checkbox = ({ name, options, value, onChange, disabled = false }: Props) => {	const handleToggle = (option: string) => {
		if (value.includes(option)) {
			onChange(value.filter((v) => v !== option));
		} else {
			onChange([...value, option]);
		}
	};

	return (
		<div className={styles.group}>
			{options.map((option) => (
				<label key={option} className={styles.option}>
					<input
						type="checkbox"
						name={name}
						value={option}
						checked={value.includes(option)}
						onChange={() => handleToggle(option)}
                        disabled={disabled}
					/>
					<span>{option}</span>
				</label>
			))}
		</div>
	);
};