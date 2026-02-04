# Online Shopping Website - Dynamic Product Display

A React-based online shopping website that displays products dynamically using component-based architecture.

## Project Structure

```
29-01-2026/
├── App.jsx              # Main application component (parent)
├── App.css              # Main application styles
├── ProductList.jsx      # Product list container component
├── ProductList.css      # Product list styles
├── ProductCard.jsx      # Individual product card component (child)
├── ProductCard.css      # Product card styles
├── package.json         # Project dependencies
└── README.md           # This file
```

## Component Hierarchy

```
App (Parent Component)
└── ProductList
    └── ProductCard (Child Components - Multiple instances)
```

## Features

### 1. **Parent-to-Child Data Flow**
   - Product data is stored in the parent `App` component
   - Data is passed down through props to child components
   - Demonstrates React's unidirectional data flow

### 2. **Dynamic Product Display**
   - Each product is rendered as a separate `ProductCard` component
   - Products are mapped from an array of product objects
   - Each product card displays:
     - Product image
     - Product name
     - Description
     - Price
     - Star rating
     - Stock availability
     - Add to Cart button

### 3. **Interactive Features**
   - Add to Cart functionality
   - Cart counter in header
   - Disabled state for out-of-stock items
   - Hover effects on product cards

### 4. **Responsive Design**
   - Mobile-first approach
   - Grid layout adapts to different screen sizes:
     - Mobile: 1 column
     - Tablet: 2 columns
     - Desktop: 3+ columns

## Component Details

### App.jsx (Parent Component)
- Manages product data state
- Manages shopping cart state
- Passes product data and callback functions to child components
- Contains 6 sample products with realistic data

### ProductList.jsx
- Receives products array as props
- Maps over products and renders a ProductCard for each
- Passes individual product data and callbacks to ProductCard

### ProductCard.jsx (Child Component)
- Receives individual product data via props
- Displays product information
- Implements star rating visualization
- Handles "Add to Cart" button click
- Shows out-of-stock badge when applicable

## Data Structure

Each product object contains:
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Product name
  price: number,        // Product price
  image: string,        // Product image URL
  description: string,  // Product description
  rating: number,       // Rating (0-5)
  inStock: boolean      // Availability status
}
```

## How to Run

1. **Install Dependencies:**
   ```bash
   cd C:\FullStack_DevOps\29-01-2026
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Open in Browser:**
   - The application will automatically open at `http://localhost:3000`

## Key Concepts Demonstrated

1. **Component Composition**: Breaking down UI into reusable components
2. **Props**: Passing data from parent to child components
3. **State Management**: Using useState hook for managing data
4. **Event Handling**: Handling user interactions (Add to Cart)
5. **Conditional Rendering**: Showing/hiding elements based on state
6. **Array Mapping**: Dynamically rendering lists of components
7. **CSS Modules**: Component-specific styling
8. **Responsive Design**: Mobile-friendly layouts

## Customization

### Adding More Products
Edit the products array in `App.jsx`:
```javascript
const [products] = useState([
  {
    id: 7,
    name: 'Your Product',
    price: 99.99,
    image: 'https://your-image-url.com',
    description: 'Product description',
    rating: 4.5,
    inStock: true
  }
]);
```

### Styling
- Modify `*.css` files to change colors, layouts, and styles
- Current theme uses purple gradient (`#667eea` to `#764ba2`)

## Future Enhancements

- Implement full shopping cart with quantity management
- Add product filtering and sorting
- Implement product search functionality
- Add product detail pages
- Integrate with backend API for real product data
- Add user authentication
- Implement checkout process

## Technologies Used

- **React 18**: UI library
- **CSS3**: Styling and animations
- **Unsplash**: Product images

---

**Created Date**: 29-01-2026  
**Project Type**: Full Stack DevOps Practice
