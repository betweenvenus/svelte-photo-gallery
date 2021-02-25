import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const urlFragment: Writable<null | string> = writable(location.hash)