export interface StackItem {
  id: string;
  type: string;
  name: string;
  icon: string;
}

export type CategoryType = 'frontend' | 'backend';

export const CATEGORY_ORDER: CategoryType[] = ['frontend', 'backend'];

export const ICONS = {
  React: '/icons/ReactLogo.svg',
  'Node.js': '/icons/nodejsLight.svg',
} as const;

export type IconType = keyof typeof ICONS;
