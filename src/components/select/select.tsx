import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './select.module.css';

export interface IOption {
    value: string;
    label: string;
}

interface Props {
    options: IOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const DROPDOWN_GAP = 4;
const VIEWPORT_PADDING = 8;

interface IDropdownPosition {
    left: number;
    width: number;
    top?: number;
    bottom?: number;
}

const getDropdownPosition = (trigger: HTMLElement): IDropdownPosition => {
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - DROPDOWN_GAP - VIEWPORT_PADDING;
    const spaceAbove = rect.top - DROPDOWN_GAP - VIEWPORT_PADDING;
    const shouldFlipUp = spaceBelow < 200 && spaceAbove > spaceBelow;

    return {
        left: rect.left,
        width: rect.width,
        top: shouldFlipUp ? undefined : rect.bottom + DROPDOWN_GAP,
        bottom: shouldFlipUp ? window.innerHeight - rect.top + DROPDOWN_GAP : undefined,
    };
};

export const Select = ({ options, value, onChange, placeholder = 'Выберите...', disabled = false }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<IDropdownPosition | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target) || dropdownRef.current?.contains(target)) return;
            setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useLayoutEffect(() => {
        if (!isOpen || !triggerRef.current) return;

        const update = () => setPosition(getDropdownPosition(triggerRef.current!));
        update();

        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update, true);
            window.removeEventListener('resize', update);
        };
    }, [isOpen]);

    const selected = options.find((o) => o.value === value);

    const handleSelect = (option: IOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <>
            <div
                ref={triggerRef}
                className={`${styles.trigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className={selected ? styles.value : styles.placeholder}>
                    {selected ? selected.label : placeholder}
                </span>
                <span className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}>▾</span>
            </div>

            {isOpen &&
                position &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        className={styles.dropdown}
                        style={{
                            left: position.left,
                            width: position.width,
                            top: position.top,
                            bottom: position.bottom,
                        }}
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    );
};