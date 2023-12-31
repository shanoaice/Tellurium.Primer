import { type Store as TauriStore } from 'tauri-plugin-store-api';
import { type AsyncStorage } from '@solid-primitives/storage';

export const createTauriStoreApi = (tauriStore: TauriStore): AsyncStorage => ({
	getItem: async (key: string) => tauriStore.get(key),
	getAll: async () => tauriStore.entries(),
	setItem: async (key: string, value: string) => tauriStore.set(key, value),
	removeItem(key) {
		void tauriStore.delete(key);
	},
	clear: async () => tauriStore.clear(),
	// eslint-disable-next-line unicorn/no-await-expression-member
	key: async (index: number) => (await tauriStore.keys())[index],
	get length() {
		return tauriStore.length();
	},
});
