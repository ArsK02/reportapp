import { ThemeNames } from '../../theme';
import { RootState } from '../rootState';

const appState = (state: RootState) => state.app.appState;
const appAppearance = (state: RootState) => state.app.appAppearance;
const theme = (state: RootState): ThemeNames => state.app.theme;

// Plain field reads: wrapping them in createSelector only triggers
// reselect's identity-function warning.
export const selectAppState = () => appState;
export const selectAppAppearance = () => appAppearance;
export const selectThemeState = () => theme;
