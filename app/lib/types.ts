export type CategoryType =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'infra'
  | 'devops';

export const CATEGORY_ORDER: CategoryType[] = [
  'frontend',
  'backend',
  'database',
  'infra',
  'devops',
];

export interface StackItem {
  id: number;
  type: CategoryType;
  name: string;
  icon: string;
  url?: string;
}
