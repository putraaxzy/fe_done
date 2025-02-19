import { ContentData } from '../types';

export async function fetchData(): Promise<ContentData> {
  const defaultData: ContentData = {
    history: [],
    tourism: [],
    culinary: [],
    events: []
  };

  try {
    const response = await fetch('/api/proxy?endpoint=all');
    const data = await response.json();
    console.log('Raw API response:', data);

    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        const category = String(item.category).toLowerCase();  // ensure lowercase
        switch (category) {
          case 'sejarah':
            defaultData.history.push(item);
            break;
          case 'wisata':
            defaultData.tourism.push(item);
            break;
          case 'kuliner':
            defaultData.culinary.push(item);
            break;
          case 'event':
            defaultData.events.push(item);
            break;
          default:
            // Optionally handle unmatched categories
            console.warn('Unmatched category:', item.category);
            break;
        }
      });
    } else {
      console.error('Invalid data format:', data);
    }

    Object.entries(defaultData).forEach(([key, items]) => {
      console.log(`${key} items:`, items.length);
    });

    return defaultData;
  } catch (error) {
    console.error('API Error:', error);
    return defaultData;
  }
}
