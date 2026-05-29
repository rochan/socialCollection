import { Collection, CollectionItem, User, WishlistItem, Comment, Reaction, FeedItem } from '../models';

// Mock current user
export const CURRENT_USER: User = {
  id: 'user-1',
  username: 'collector',
  displayName: 'Alex Collector',
  avatar: undefined,
  bio: 'Collecting experiences one sip at a time 🍷',
  followingIds: ['user-2', 'user-3'],
  followerIds: ['user-2'],
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user-2',
    username: 'winelover',
    displayName: 'Sam Sommelier',
    avatar: undefined,
    bio: 'Wine is poetry in a bottle',
    followingIds: ['user-1'],
    followerIds: ['user-1'],
  },
  {
    id: 'user-3',
    username: 'beernerd',
    displayName: 'Pat Pints',
    avatar: undefined,
    bio: 'Hops and dreams',
    followingIds: [],
    followerIds: ['user-1'],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    name: 'Weekend Wines',
    description: 'Wines I enjoy on lazy weekends',
    visibility: 'public',
    ownerId: 'user-1',
    collaboratorIds: [],
    templateId: 'wine',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-05-20T14:00:00Z',
  },
  {
    id: 'col-2',
    name: 'Favorite IPAs',
    description: 'Hoppy goodness',
    visibility: 'public',
    ownerId: 'user-1',
    collaboratorIds: [],
    templateId: 'beer',
    createdAt: '2025-02-01T08:00:00Z',
    updatedAt: '2025-05-18T09:30:00Z',
  },
  {
    id: 'col-3',
    name: 'Date Night Spots',
    description: 'Best places for a night out',
    visibility: 'private',
    ownerId: 'user-1',
    collaboratorIds: [],
    templateId: 'restaurant',
    createdAt: '2025-03-10T12:00:00Z',
    updatedAt: '2025-05-10T20:00:00Z',
  },
];

export const MOCK_ITEMS: CollectionItem[] = [
  {
    id: 'item-1',
    collectionId: 'col-1',
    title: 'Château Margaux 2015',
    photos: [],
    notes: 'Incredible depth, silky tannins',
    rating: 5,
    status: 'tried',
    tags: ['bordeaux', 'red', 'special-occasion'],
    metadata: { vintage: 2015, varietal: 'Cabernet Sauvignon blend', region: 'Bordeaux', producer: 'Château Margaux', type: 'Red' },
    createdAt: '2025-01-20T19:00:00Z',
    updatedAt: '2025-01-20T19:00:00Z',
  },
  {
    id: 'item-2',
    collectionId: 'col-1',
    title: 'Cloudy Bay Sauvignon Blanc 2022',
    photos: [],
    notes: 'Crisp and refreshing',
    rating: 4,
    status: 'owned',
    tags: ['new-zealand', 'white', 'everyday'],
    metadata: { vintage: 2022, varietal: 'Sauvignon Blanc', region: 'Marlborough', producer: 'Cloudy Bay', type: 'White' },
    createdAt: '2025-02-05T11:00:00Z',
    updatedAt: '2025-02-05T11:00:00Z',
  },
  {
    id: 'item-3',
    collectionId: 'col-2',
    title: 'Pliny the Elder',
    photos: [],
    notes: 'The gold standard of double IPAs',
    rating: 5,
    status: 'tried',
    tags: ['double-ipa', 'california', 'hoppy'],
    metadata: { style: 'Double IPA', brewery: 'Russian River Brewing', abv: 8, ibu: 100 },
    createdAt: '2025-02-10T15:00:00Z',
    updatedAt: '2025-02-10T15:00:00Z',
  },
];

export const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    userId: 'user-1',
    title: 'Opus One 2018',
    category: 'want',
    notes: 'Been on my list forever',
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    id: 'wish-2',
    userId: 'user-1',
    title: 'Heady Topper',
    category: 'try_next',
    notes: 'Heard great things',
    createdAt: '2025-04-15T10:00:00Z',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    itemId: 'item-1',
    userId: 'user-2',
    text: 'This is one of the best wines ever made!',
    createdAt: '2025-01-21T10:00:00Z',
  },
];

export const MOCK_REACTIONS: Reaction[] = [
  {
    id: 'reaction-1',
    itemId: 'item-1',
    userId: 'user-2',
    type: 'love',
    createdAt: '2025-01-21T09:00:00Z',
  },
  {
    id: 'reaction-2',
    itemId: 'item-3',
    userId: 'user-3',
    type: 'cheers',
    createdAt: '2025-02-11T08:00:00Z',
  },
];

export const MOCK_FEED: FeedItem[] = [
  {
    id: 'feed-1',
    type: 'new_item',
    userId: 'user-2',
    itemId: 'item-1',
    collectionId: 'col-1',
    timestamp: '2025-05-20T14:00:00Z',
  },
  {
    id: 'feed-2',
    type: 'new_collection',
    userId: 'user-3',
    collectionId: 'col-2',
    timestamp: '2025-05-18T09:30:00Z',
  },
  {
    id: 'feed-3',
    type: 'rating',
    userId: 'user-1',
    itemId: 'item-3',
    collectionId: 'col-2',
    timestamp: '2025-05-15T12:00:00Z',
  },
];
