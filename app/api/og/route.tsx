import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface StackItem {
  id: string;
  type: string;
  name: string;
  icon: string;
}

type GroupedItems = {
  [key: string]: StackItem[];
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const stackItems = JSON.parse(
      searchParams.get('stack') || '[]'
    ) as StackItem[];

    // Group items by type
    const groupedItems = stackItems.reduce((acc: GroupedItems, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#0C1015',
            padding: '48px',
          }}
        >
          {Object.entries(groupedItems).map(([category, items]) => (
            <div
              key={category}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '48px',
                width: '100%',
              }}
            >
              <div
                style={{
                  color: '#f0f0f0',
                  fontSize: '20px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {category}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  width: '100%',
                }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: '#1A1F26',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={`${req.nextUrl.origin}${item.icon}`}
                      alt={item.name}
                      width='60'
                      height='60'
                      style={{
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
      {
        width: 1200,
        height: Math.max(630, 200 + stackItems.length * 132),
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
