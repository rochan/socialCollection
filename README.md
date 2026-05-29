# socialCollection

A collector-first, social mobile experience for recording, organizing, and sharing collections.

## Vision
Create a generic platform that works for:
- Wine collections
- Beer collections
- Restaurants visited
- Recipes tried/cooked

The core experience should be reusable and reskinnable by changing category templates, terminology, and branding.

## Core product goals
1. Make collection creation extremely easy (photo-first capture).
2. Encourage social interaction around collections.
3. Keep the domain model generic so new collection types can be added quickly.

## Key features

### 1) Record your own collections
- Create multiple collections (e.g., “Weekend Wines”, “Favorite IPAs”, “Date Night Restaurants”, “Family Recipes”).
- Add items manually or from quick capture flow.
- Track item status (owned, tried, want to try, archived).

### 2) Categorize and organize
- Flexible tags (region, varietal, cuisine, occasion, difficulty, price tier, etc.).
- Smart filters and sorting (recently added, top rated, wishlist, recommended by friends).
- Custom fields per category template (wine vintage, beer style, restaurant location, recipe prep time).

### 3) Share + wishlist
- Public/private collections.
- Share item cards and collection links.
- Personal wishlist with “want”, “gift ideas”, and “try next”.
- Follow friends/creators and copy items into your own collection.

### 4) Social features (recommended)
- Activity feed: new additions, reviews, ratings, comments.
- Reactions/comments on collection items.
- Collaborative collections (invite friends to contribute).
- Recommendations engine (based on your history + people you follow).
- Challenges/prompts (e.g., “Try 5 new white wines this month”).

## Fast photo-first collection creation
To minimize friction, support a “Snap to Add” flow:
1. User takes 1–2 photos.
2. System extracts metadata (OCR + vision + optional barcode/label lookup).
3. Pre-fills title, category, brand/producer, location, date, and suggested tags.
4. User confirms/edits and saves in one tap.

Fallback is always available for manual entry when detection confidence is low.

## Generic domain model (portable across verticals)
- **Collection**: name, visibility, owner, collaborators.
- **Item**: title, photos, notes, rating, status, tags, metadata JSON.
- **Template**: category schema (wine/beer/restaurant/recipe) defining optional fields.
- **Social**: follows, likes/reactions, comments, shares, saves, wishlist.

This keeps the platform generic while allowing category-specific experiences.

## App or mobile web?
**Recommendation: mobile app first, with a lightweight mobile web companion.**

Why app-first:
- Better camera integration for fast photo-first capture.
- Smoother upload/offline behavior while collecting on the go.
- Push notifications for social activity and wishlist updates.
- Better retention for frequent social interactions.

Why also support mobile web:
- Easy onboarding from shared links.
- SEO/discoverability for public collections.
- Lower-friction trial before app install.

Practical approach:
1. Launch with an app-first MVP for capture + social feed.
2. Add mobile web for public viewing, sharing, and sign-up funnel.
