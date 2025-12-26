const FEATURES = (process.env.REACT_APP_FEATURE_FLAGS || '').split(',').map(f => f.trim().toLowerCase());
const MOCK_MODE = FEATURES.includes('mock') || FEATURES.includes('mock-data');

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  'http://localhost:4000';

// PUBLIC_INTERFACE
export function isMockMode() {
  /** Returns true when frontend should serve mock data instead of calling backend. */
  return MOCK_MODE;
}

async function http(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} for ${url}: ${text}`);
  }
  return res.json();
}

const mockProducts = [
  {
    id: 'milk-1',
    name: 'Organic Whole Milk',
    price: 3.99,
    unit: '1L',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop',
    category: 'Milk',
    rating: 4.7
  },
  {
    id: 'cheese-1',
    name: 'Aged Cheddar Cheese',
    price: 6.49,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?q=80&w=1200&auto=format&fit=crop',
    category: 'Cheese',
    rating: 4.8
  },
  {
    id: 'yogurt-1',
    name: 'Greek Yogurt',
    price: 1.59,
    unit: '150g',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop',
    category: 'Yogurt',
    rating: 4.6
  },
  {
    id: 'butter-1',
    name: 'Unsalted Butter',
    price: 2.99,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    category: 'Butter',
    rating: 4.5
  }
];

// PUBLIC_INTERFACE
export async function fetchProducts(params = {}) {
  /** Fetch list of products, supports mock-mode via feature flags. */
  if (MOCK_MODE) {
    // Simulate filters/search
    const { q, category } = params;
    let list = mockProducts;
    if (q) list = list.filter(p => p.name.toLowerCase().includes(String(q).toLowerCase()));
    if (category && category !== 'All') list = list.filter(p => p.category === category);
    return new Promise(resolve => setTimeout(() => resolve(list), 200));
  }
  const search = new URLSearchParams(params).toString();
  return http(`/products${search ? `?${search}` : ''}`);
}

// PUBLIC_INTERFACE
export async function fetchProductById(id) {
  /** Fetch a single product by ID; mock-mode supported. */
  if (MOCK_MODE) {
    const prod = mockProducts.find(p => p.id === id);
    if (!prod) throw new Error('Not found');
    return new Promise(resolve => setTimeout(() => resolve(prod), 200));
  }
  return http(`/products/${id}`);
}
