import { PROFILE_SECTIONS } from '../../constants/sections';
import type { ProfileField } from '../../types';

export const PROFILE_FIELDS: ProfileField[] = Object.values(PROFILE_SECTIONS).flat();