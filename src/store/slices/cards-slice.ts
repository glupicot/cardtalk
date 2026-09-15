import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../../types';
import { CARDS } from '../../constants/cards';

const initialState: Card[] = CARDS;

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
});

export default cardsSlice.reducer;