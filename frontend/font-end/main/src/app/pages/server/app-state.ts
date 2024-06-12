import { DataState } from "src/app/enum/data-state.enum";

export interface AppState<T> {
    dataState: DataState;
    appData?: T;
    error?: string;
}
