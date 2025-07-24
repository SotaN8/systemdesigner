'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Download,
  Copy,
  Link,
  Image as ImageIcon,
} from 'lucide-react';
import { CATEGORY_ORDER, ICONS, IconType, StackItem } from './lib/types';
import { generateId } from './lib/utils';
import { StackCategory } from './components/stack-category';
import { StackIcon } from './components/ui/stack-icon';

const tools = {
  frontend: ['React'],
  backend: ['Node.js'],
} as const;

export default function Builder() {
  const [stackItems, setStackItems] = useState<StackItem[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const addToStack = (type: string, name: IconType) => {
    const exists = stackItems.some(
      (item) => item.type === type && item.name === name
    );
    if (exists) {
      alert(`${name} is already in your ${type} stack!`);
      return;
    }

    setStackItems([
      ...stackItems,
      {
        id: generateId(),
        type,
        name,
        icon: ICONS[name],
      },
    ]);
  };

  const removeFromStack = (id: string) => {
    setStackItems(stackItems.filter((item) => item.id !== id));
  };

  const groupedItems = CATEGORY_ORDER.reduce((acc, category) => {
    acc[category] = stackItems.filter((item) => item.type === category);
    return acc;
  }, {} as Record<string, StackItem[]>);

  const handleExportPNG = async () => {
    if (stackItems.length === 0) {
      alert('Please add some items to your stack first!');
      return;
    }

    try {
      setIsExporting(true);
      const params = new URLSearchParams();
      params.set('stack', JSON.stringify(stackItems));

      const response = await fetch(`/api/og?${params.toString()}`);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'system-design.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (stackItems.length === 0) {
      alert('Please add some items to your stack first!');
      return;
    }

    try {
      setIsExporting(true);
      const params = new URLSearchParams();
      params.set('stack', JSON.stringify(stackItems));

      const response = await fetch(`/api/og?${params.toString()}`);
      const blob = await response.blob();
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-bold'>System Designer</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700 hover:text-white'
                disabled={isExporting}
              >
                <Download className='mr-2 h-4 w-4' />
                Export Image
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 bg-neutral-900 border-neutral-800'>
              <DropdownMenuItem
                className='flex items-center cursor-pointer hover:bg-neutral-800 text-white'
                onClick={handleExportPNG}
              >
                <ImageIcon className='mr-2 h-4 w-4' />
                Save PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center cursor-pointer hover:bg-neutral-800 text-white'
                onClick={handleCopyImage}
              >
                <Copy className='mr-2 h-4 w-4' />
                Copy Image
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-neutral-800' />
              <DropdownMenuItem className='flex items-center cursor-pointer hover:bg-neutral-800 text-white'>
                <Link className='mr-2 h-4 w-4' />
                Copy URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column - Canvas Preview */}
          <div className='relative'>
            <div
              className='bg-[#0C1015] rounded-xl overflow-hidden min-h-[600px] w-full'
              style={{
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              <div className='p-12'>
                {stackItems.length === 0 ? (
                  <div className='flex items-center justify-center h-[200px] text-gray-400 text-center'>
                    Select components from the right to start building your
                    stack
                  </div>
                ) : (
                  <div className='space-y-12'>
                    {CATEGORY_ORDER.map((category) => (
                      <StackCategory
                        key={category}
                        title={category}
                        items={groupedItems[category]}
                        onRemove={removeFromStack}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Tool Selection */}
          <div className='space-y-8'>
            {CATEGORY_ORDER.map((category) => (
              <div
                key={category}
                className='bg-[#0C1015] rounded-xl p-6 border border-[#222222]'
              >
                <h2 className='text-xl font-semibold mb-4 capitalize'>
                  {category}
                </h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                  {tools[category].map((tool) => (
                    <StackIcon
                      key={tool}
                      icon={ICONS[tool]}
                      name={tool}
                      onClick={() => addToStack(category, tool)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
