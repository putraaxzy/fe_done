export interface ContentItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ContentData {
  [key: string]: ContentItem[];
  history: ContentItem[];
  tourism: ContentItem[];
  culinary: ContentItem[];
  events: ContentItem[];
}
