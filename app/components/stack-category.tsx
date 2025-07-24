import { StackItem } from '../lib/types';
import { StackIcon } from './ui/stack-icon';

interface StackCategoryProps {
  title: string;
  items: StackItem[];
  onRemove?: (id: number) => void;
}

export function StackCategory({ title, items, onRemove }: StackCategoryProps) {
  if (items.length === 0) return null;

  return (
    <div className='space-y-4'>
      <h3 className='text-white text-lg font-medium tracking-wider uppercase'>
        {title}
      </h3>
      <div className='grid grid-cols-3 gap-4'>
        {items.map((item) => (
          <StackIcon
            key={item.id}
            icon={item.icon}
            name={item.name}
            onClick={() => onRemove?.(item.id)}
            showRemove={!!onRemove}
          />
        ))}
      </div>
    </div>
  );
}
