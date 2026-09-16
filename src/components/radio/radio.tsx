import styles from './radio.module.css';

interface Props {
	name: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export const Radio = ({ name, options, value, onChange, disabled = false }: Props) => {
	return (
		<div className={styles.group}>
			{options.map((option) => (
				<label key={option} className={styles.option}>
					<input
						type="radio"
						name={name}
						value={option}
						checked={value === option}
						onChange={() => onChange(option)}
                        disabled={disabled}
					/>
					<span>{option}</span>
				</label>
			))}
		</div>
	);
};