export type CategoryType = 'frontend' | 'backend';

export const CATEGORY_ORDER: CategoryType[] = ['frontend', 'backend'];

export interface StackItem {
  id: number;
  type: CategoryType;
  name: string;
  icon: string;
  url?: string;
}
