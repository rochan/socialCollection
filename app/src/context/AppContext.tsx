import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  Collection,
  CollectionItem,
  User,
  WishlistItem,
  Comment,
  Reaction,
  FeedItem,
} from '../models';
import {
  CURRENT_USER,
  MOCK_COLLECTIONS,
  MOCK_ITEMS,
  MOCK_WISHLIST,
  MOCK_COMMENTS,
  MOCK_REACTIONS,
  MOCK_FEED,
  MOCK_USERS,
} from '../data/mockData';

// State shape
interface AppState {
  currentUser: User;
  users: User[];
  collections: Collection[];
  items: CollectionItem[];
  wishlist: WishlistItem[];
  comments: Comment[];
  reactions: Reaction[];
  feed: FeedItem[];
}

// Actions
type Action =
  | { type: 'ADD_COLLECTION'; payload: Collection }
  | { type: 'UPDATE_COLLECTION'; payload: Collection }
  | { type: 'DELETE_COLLECTION'; payload: string }
  | { type: 'ADD_ITEM'; payload: CollectionItem }
  | { type: 'UPDATE_ITEM'; payload: CollectionItem }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'ADD_WISHLIST_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_WISHLIST_ITEM'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'ADD_REACTION'; payload: Reaction }
  | { type: 'REMOVE_REACTION'; payload: { itemId: string; userId: string } }
  | { type: 'TOGGLE_FOLLOW'; payload: string };

const initialState: AppState = {
  currentUser: CURRENT_USER,
  users: MOCK_USERS,
  collections: MOCK_COLLECTIONS,
  items: MOCK_ITEMS,
  wishlist: MOCK_WISHLIST,
  comments: MOCK_COMMENTS,
  reactions: MOCK_REACTIONS,
  feed: MOCK_FEED,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_COLLECTION':
      return { ...state, collections: [...state.collections, action.payload] };
    case 'UPDATE_COLLECTION':
      return {
        ...state,
        collections: state.collections.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_COLLECTION':
      return {
        ...state,
        collections: state.collections.filter((c) => c.id !== action.payload),
        items: state.items.filter((i) => i.collectionId !== action.payload),
      };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'ADD_WISHLIST_ITEM':
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_WISHLIST_ITEM':
      return { ...state, wishlist: state.wishlist.filter((w) => w.id !== action.payload) };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'ADD_REACTION':
      return { ...state, reactions: [...state.reactions, action.payload] };
    case 'REMOVE_REACTION':
      return {
        ...state,
        reactions: state.reactions.filter(
          (r) => !(r.itemId === action.payload.itemId && r.userId === action.payload.userId)
        ),
      };
    case 'TOGGLE_FOLLOW': {
      const targetId = action.payload;
      const isFollowing = state.currentUser.followingIds.includes(targetId);
      const newFollowing = isFollowing
        ? state.currentUser.followingIds.filter((id) => id !== targetId)
        : [...state.currentUser.followingIds, targetId];
      return {
        ...state,
        currentUser: { ...state.currentUser, followingIds: newFollowing },
      };
    }
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
