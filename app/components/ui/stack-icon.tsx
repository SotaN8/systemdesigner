import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StackIconProps {
  icon: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showRemove?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    container: 'w-[60px] h-[60px]',
    icon: 40,
  },
  md: {
    container: 'w-[100px] h-[100px]',
    icon: 60,
  },
  lg: {
    container: 'w-[120px] h-[120px]',
    icon: 80,
  },
};

export function StackIcon({
  icon,
  name,
  size = 'md',
  onClick,
  showRemove = false,
  className,
}: StackIconProps) {
  const { container, icon: iconSize } = sizeMap[size];

  const Container = showRemove ? 'div' : 'button';

  return (
    <div className='relative group'>
      <Container
        onClick={showRemove ? undefined : onClick}
        className={cn(
          container,
          'bg-[#1A1F26] rounded-lg hover:bg-[#252B33] transition-colors flex items-center justify-center relative group overflow-hidden',
          !showRemove && 'cursor-pointer',
          className
        )}
      >
        <div className='group-hover:blur-sm transition-all duration-200'>
          <Image src={icon} alt={name} width={iconSize} height={iconSize} />
        </div>
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <span className='text-sm font-medium text-white px-2 text-center'>
            {name}
          </span>
        </div>
        {showRemove && (
          <button
            onClick={onClick}
            className='absolute -top-2 -right-2 w-6 h-6 bg-[#2A2F36] rounded-full flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-[#3A3F46] z-10'
          >
            ×
          </button>
        )}
      </Container>
    </div>
  );
}
