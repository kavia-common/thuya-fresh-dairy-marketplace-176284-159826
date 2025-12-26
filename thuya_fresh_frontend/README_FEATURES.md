# Thuya Fresh Frontend

- Routing: "/", "/product/:id", "/checkout"
- State: React Context (CartContext, UIContext)
- API: env-driven (REACT_APP_API_BASE), mock mode via REACT_APP_FEATURE_FLAGS=mock
- Components: TopNav, Filters, ProductGrid, ProductCard, CartModal, Footer
- Theme: Ocean Professional (blue/amber), responsive and accessible
- Tests: rendering, add-to-cart, cart modal toggle

To enable mock data (no backend required):
- set REACT_APP_FEATURE_FLAGS=mock (or 'mock-data')
- optionally set REACT_APP_API_BASE when backend is available
