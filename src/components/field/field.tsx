import type { FieldProps } from './types';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Checkbox } from '../checkbox/checkbox';
import { Radio } from '../radio/radio';
import { Textarea } from '../textarea/textarea';
import styles from './field.module.css';



export const Field = ({ field, disabled, onChange }: FieldProps) => {
    const renderControl = () => {
        switch (field.type) {
            case 'text':
                return (
                    <Input
                        type="text"
                        value={field.value}
                        disabled={disabled}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />
                );
   case 'number':
	return (
		<Input
			type="number"
			value={field.value}
			disabled={disabled}
			onChange={(e) => onChange(field.name, e.target.value)}
		/>
	);

            case 'textarea':
                return (
                    <Textarea
                        value={field.value}
                        disabled={disabled}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />
                );

            case 'date':
                return (
                    <Input
                        type="date"
                        value={field.value}
                        disabled={disabled}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />
                );

            case 'select':
                return (
                    <Select
                        options={field.options.map((o) => ({ value: o, label: o }))}
                        value={field.value}
                        disabled={disabled}
                        onChange={(value) => onChange(field.name, value)}
                        placeholder="Выберите..."
                    />
                );

            case 'checkbox':
                return (
                    <Checkbox
                        name={field.name}
                        options={field.options}
                        value={field.value}
                        disabled={disabled}
                        onChange={(value) => onChange(field.name, value)}
                    />
                );

            case 'radio':
                return (
                    <Radio
                        name={field.name}
                        options={field.options}
                        value={field.value}
                        disabled={disabled}
                        onChange={(value) => onChange(field.name, value)}
                    />
                );
        }
    };

    return (
        <div className={styles.field}>
            <label className={styles.label}>{field.label}</label>
            {renderControl()}
        </div>
    );
};