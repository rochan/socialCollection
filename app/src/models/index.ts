// Generic domain models for socialCollection

export type ItemStatus = 'owned' | 'tried' | 'want_to_try' | 'archived';
export type Visibility = 'public' | 'private';
export type WishlistCategory = 'want' | 'gift_ideas' | 'try_next';

export interface CategoryTemplate {
  id: string;
  name: string; // wine, beer, restaurant, recipe
  icon: string;
  fields: TemplateField[];
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[]; // for select type
  required?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  visibility: Visibility;
  ownerId: string;
  collaboratorIds: string[];
  templateId: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  title: string;
  photos: string[];
  notes?: string;
  rating?: number; // 1-5
  status: ItemStatus;
  tags: string[];
  metadata: Record<string, string | number>; // template-specific fields
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followingIds: string[];
  followerIds: string[];
}

export interface WishlistItem {
  id: string;
  userId: string;
  itemId?: string; // reference to existing item, or standalone
  title: string;
  category: WishlistCategory;
  notes?: string;
  photo?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  itemId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Reaction {
  id: string;
  itemId: string;
  userId: string;
  type: 'like' | 'love' | 'fire' | 'cheers';
  createdAt: string;
}

export interface FeedItem {
  id: string;
  type: 'new_item' | 'new_collection' | 'rating' | 'comment';
  userId: string;
  collectionId?: string;
  itemId?: string;
  timestamp: string;
}
