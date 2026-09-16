import { PROFILE_SECTIONS } from '../../constants/sections';
import type { ProfileField } from '../../types/profile';

export const PROFILE_FIELDS: ProfileField[] = PROFILE_SECTIONS.flatMap(
	(section) => section.fields
);