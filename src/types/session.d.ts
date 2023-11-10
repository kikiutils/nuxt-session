import { changedSymbol, clearedSymbol, storageKeySymbol } from '../runtime/symbols';

export interface H3EventContextSession {
	[changedSymbol]?: true;
	[clearedSymbol]?: true;
	[storageKeySymbol]?: string;
}

export type PartialH3EventContextSession = Partial<H3EventContextSession>;
