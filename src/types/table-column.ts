import { IResultItem } from ".";

export declare type SortOrder = "descend" | "ascend" | null;
export declare type CompareFn<T> = (
  a: T,
  b: T,
  sortOrder?: SortOrder
) => number;

export type IColumn = {
  title: string;
  dataIndex: string;
  render?: (value: any, record: IResultItem, index: number) => React.ReactNode;
  width?: number;
  sorter?:
    | boolean
    | CompareFn<IResultItem>
    | {
        compare?: CompareFn<IResultItem>;
        multiple?: number;
      };
  sortDirections?: SortOrder[];
  showSorterTooltip?: boolean;
};
