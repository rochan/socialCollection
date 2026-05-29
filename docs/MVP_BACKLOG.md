# socialCollection – MVP Backlog

## Epic 1: App Shell & Navigation
| Story | Priority | Status |
|-------|----------|--------|
| Set up Expo/React Native project with TypeScript | P0 | ✅ |
| Bottom tab navigation (Home Feed, My Collections, Add, Explore, Profile) | P0 | ✅ |
| Authentication placeholder (mock user context) | P0 | ✅ |

## Epic 2: Collections CRUD
| Story | Priority | Status |
|-------|----------|--------|
| Create a new collection (name, visibility, category template) | P0 | ✅ |
| View list of my collections | P0 | ✅ |
| View single collection with items | P0 | ✅ |
| Edit collection details | P1 | ✅ |
| Delete collection | P1 | ✅ |

## Epic 3: Items CRUD
| Story | Priority | Status |
|-------|----------|--------|
| Add item to collection (manual entry) | P0 | ✅ |
| View item detail | P0 | ✅ |
| Edit item | P1 | ✅ |
| Delete item | P1 | ✅ |
| Rate item (1-5 stars) | P0 | ✅ |
| Set item status (owned, tried, want to try, archived) | P0 | ✅ |
| Add tags to item | P0 | ✅ |

## Epic 4: Photo-First "Snap to Add"
| Story | Priority | Status |
|-------|----------|--------|
| Camera capture screen (take 1-2 photos) | P0 | ✅ |
| Image analysis service interface (OCR/vision stub) | P0 | ✅ |
| Pre-fill item form from analysis results | P0 | ✅ |
| Fallback to manual entry | P0 | ✅ |

## Epic 5: Category Templates
| Story | Priority | Status |
|-------|----------|--------|
| Define template schema (custom fields per category) | P0 | ✅ |
| Wine template (vintage, varietal, region, producer) | P0 | ✅ |
| Beer template (style, brewery, ABV) | P0 | ✅ |
| Restaurant template (cuisine, location, price tier) | P0 | ✅ |
| Recipe template (cuisine, prep time, difficulty, servings) | P0 | ✅ |

## Epic 6: Social – Feed & Follow
| Story | Priority | Status |
|-------|----------|--------|
| Activity feed (recent additions from people you follow) | P0 | ✅ |
| Follow/unfollow users | P0 | ✅ |
| View another user's public profile & collections | P1 | ✅ |

## Epic 7: Social – Interactions
| Story | Priority | Status |
|-------|----------|--------|
| Like/react to an item | P0 | ✅ |
| Comment on an item | P0 | ✅ |
| Share item card (deep link) | P1 | ✅ |

## Epic 8: Wishlist
| Story | Priority | Status |
|-------|----------|--------|
| Add item to personal wishlist | P0 | ✅ |
| Wishlist categories (want, gift ideas, try next) | P0 | ✅ |
| View and manage wishlist | P0 | ✅ |

## Epic 9: Explore & Discovery
| Story | Priority | Status |
|-------|----------|--------|
| Browse public collections | P1 | ✅ |
| Search collections/items by keyword/tag | P1 | ✅ |

---

## Tech Stack (MVP)
- **Frontend**: React Native (Expo) + TypeScript
- **State**: React Context + useReducer (upgradeable to Zustand/Redux)
- **Navigation**: Expo Router (file-based)
- **Camera**: expo-camera / expo-image-picker
- **Backend (stub)**: Local mock data / JSON (real backend deferred)
- **Image Analysis**: Service interface with mock implementation (real AI deferred)

## Out of Scope for MVP
- Real backend/API server
- Real OCR/vision AI integration
- Push notifications
- Collaborative collections (invite flow)
- Recommendations engine
- Challenges/prompts
- Mobile web companion
