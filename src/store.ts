import { createTauriStoreApi } from '~/libs/tauri-store-wrapper';
import { Store } from 'tauri-plugin-store-api';
import { path } from '@tauri-apps/api';

const tauriStorePath = await path.join(await path.appDataDir(), 'data.json');

export const tauriStore = new Store(tauriStorePath);

export const asyncStoreApiTauri = createTauriStoreApi(tauriStore);
