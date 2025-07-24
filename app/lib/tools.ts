import { CategoryType } from './types';

export interface Tool {
  id: number;
  name: string;
  icon: string;
  color?: string; // For potential colored backgrounds or accents
  url?: string; // Official documentation/website
}

export const tools: Record<CategoryType, Tool[]> = {
  frontend: [
    {
      id: 1,
      name: 'React',
      icon: '/icons/react.svg',
      url: 'https://react.dev',
    },
    {
      id: 2,
      name: 'Next.js',
      icon: '/icons/next.svg',
      url: 'https://nextjs.org',
    },
    {
      id: 3,
      name: 'Vue',
      icon: '/icons/vue.svg',
      url: 'https://vuejs.org',
    },
    {
      id: 4,
      name: 'Angular',
      icon: '/icons/angular.svg',
      url: 'https://angular.io',
    },
    {
      id: 5,
      name: 'Svelte',
      icon: '/icons/svelte.svg',
      url: 'https://svelte.dev',
    },
    {
      id: 6,
      name: 'Tailwind CSS',
      icon: '/icons/tailwind.svg',
      url: 'https://tailwindcss.com',
    },
    {
      id: 7,
      name: 'JavaScript',
      icon: '/icons/javascript.svg',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      id: 8,
      name: 'TypeScript',
      icon: '/icons/typescript.svg',
      url: 'https://www.typescriptlang.org',
    },
  ],
  backend: [
    {
      id: 9,
      name: 'Node.js',
      icon: '/icons/nodejs.svg',
      url: 'https://nodejs.org',
    },
    {
      id: 10,
      name: 'Go',
      icon: '/icons/go.svg',
      url: 'https://go.dev',
    },
    {
      id: 11,
      name: 'Python',
      icon: '/icons/python.svg',
      url: 'https://www.python.org',
    },
  ],
};
