export interface ContentItem {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string | null; // Make updatedAt optional and allow null
}

export interface ContentData {
  [key: string]: ContentItem[];
  history: ContentItem[];
  tourism: ContentItem[];
  culinary: ContentItem[];
  events: ContentItem[];
}
