import { CategoryTemplate } from '../models';

export const TEMPLATES: CategoryTemplate[] = [
  {
    id: 'wine',
    name: 'Wine',
    icon: '🍷',
    fields: [
      { key: 'vintage', label: 'Vintage', type: 'number' },
      { key: 'varietal', label: 'Varietal', type: 'text' },
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'producer', label: 'Producer', type: 'text' },
      {
        key: 'type',
        label: 'Type',
        type: 'select',
        options: ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert', 'Orange'],
      },
    ],
  },
  {
    id: 'beer',
    name: 'Beer',
    icon: '🍺',
    fields: [
      { key: 'style', label: 'Style', type: 'text' },
      { key: 'brewery', label: 'Brewery', type: 'text' },
      { key: 'abv', label: 'ABV %', type: 'number' },
      { key: 'ibu', label: 'IBU', type: 'number' },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    fields: [
      { key: 'cuisine', label: 'Cuisine', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      {
        key: 'priceTier',
        label: 'Price Tier',
        type: 'select',
        options: ['$', '$$', '$$$', '$$$$'],
      },
      { key: 'bestDish', label: 'Best Dish', type: 'text' },
    ],
  },
  {
    id: 'recipe',
    name: 'Recipe',
    icon: '👨‍🍳',
    fields: [
      { key: 'cuisine', label: 'Cuisine', type: 'text' },
      { key: 'prepTime', label: 'Prep Time (min)', type: 'number' },
      { key: 'cookTime', label: 'Cook Time (min)', type: 'number' },
      {
        key: 'difficulty',
        label: 'Difficulty',
        type: 'select',
        options: ['Easy', 'Medium', 'Hard'],
      },
      { key: 'servings', label: 'Servings', type: 'number' },
    ],
  },
];

export function getTemplate(id: string): CategoryTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
