import { IResultItem } from ".";

export interface IResponse {
    incomplete_results: boolean;
    items: IResultItem[];
    total_count: number;
}