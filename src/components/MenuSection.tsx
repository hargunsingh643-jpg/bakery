import { useState, useMemo } from 'react';
import { Search, Plus, Eye, Check, X, Sparkles } from 'lucide-react';
import { MENU_PRODUCTS, ProductItem } from '../data/cafeData';

interface MenuSectionProps {
  onAddToCart: (product: ProductItem) => void;
  onOpenProductModal: (product: ProductItem) => void;
}

type CategoryType = 'all' | 'coffee' | 'bakery' | 'savory' | 'dessert';
type DietaryType = 'all' | 'Vegetarian' | 'Vegan' | 'Eggless';

export function MenuSection({ onAddToCart, onOpenProductModal }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'bakery', label: 'Fresh Bakery' },
    { id: 'savory', label: 'Savory & Sandwiches' },
    { id: 'dessert', label: 'Desserts & Cakes' },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Diets' },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Vegan', label: 'Vegan Friendly' },
    { id: 'Eggless', label: 'Eggless' },
  ];

  const filteredProducts = useMemo(() => {
    return MENU_PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!item.dietary.includes(selectedDietary as any)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF7F0] border-t border-[#EBE3D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-wider text-[#5F7A61] uppercase">
            Handcrafted With Care
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#382210]">
            Our Artisanal Menu
          </h2>
          <p className="text-sm sm:text-base text-[#6B533F]">
            Freshly prepared with sustainably sourced Arabica beans, pure butter, and unbleached stoneground flours.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE8DC] rounded-lg overflow-x-auto max-w-full w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as CategoryType)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-[#4A2E18] text-white shadow-xs'
                      : 'text-[#6B533F] hover:text-[#382210] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7460]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, croissants..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#FDFBF7] border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61] focus:border-[#5F7A61]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7460] hover:text-[#382210]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Dietary Sub-filter */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto text-xs text-[#7A634E]">
            <span className="font-medium whitespace-nowrap shrink-0 text-[#382210]">Dietary:</span>
            {dietaryOptions.map((diet) => (
              <button
                key={diet.id}
                type="button"
                onClick={() => setSelectedDietary(diet.id as DietaryType)}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap shrink-0 ${
                  selectedDietary === diet.id
                    ? 'bg-[#5F7A61] text-white font-medium'
                    : 'bg-[#F2ECE1] text-[#6B533F] hover:bg-[#E8DFC2]/80'
                }`}
              >
                {diet.label}
              </button>
            ))}
            {(selectedCategory !== 'all' || selectedDietary !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                  setSearchQuery('');
                }}
                className="ml-auto text-xs text-[#7A634E] hover:text-[#382210] underline whitespace-nowrap shrink-0"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#FDFBF7] border border-[#EBE3D0] rounded-xl p-8 space-y-3">
            <p className="text-base font-serif font-bold text-[#382210]">No items found</p>
            <p className="text-xs text-[#7A634E] max-w-sm mx-auto">
              We couldn't find anything matching &quot;{searchQuery}&quot;. Try adjusting your keywords or category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-[#4A2E18] rounded-md hover:bg-[#382210] transition-colors"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onOpenProductModal(product)}
                  className="group bg-[#FDFBF7] border border-[#EBE3D0] rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* Image Container with Fallback */}
                  <div className="relative h-48 bg-[#EFE8DC] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback styling if image cannot load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Popular indicator */}
                    {product.isPopular && (
                      <div className="absolute top-3 left-3 bg-[#382210]/90 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D8B48D]" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Quick view button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(product);
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#382210] rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Quiet metadata line */}
                      <div className="flex items-center justify-between text-xs text-[#8C7460] mb-1">
                        <span className="capitalize">{product.category}</span>
                        {product.dietary.length > 0 && (
                          <span>{product.dietary.join(', ')}</span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#382210] group-hover:text-[#5F7A61] transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#6B533F] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Add button */}
                    <div className="pt-3 border-t border-[#EBE3D0]/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#8C7460]">Price</span>
                        <div className="text-[1.1rem] font-bold text-[#382210] font-mono tabular-nums leading-snug">
                          ₹{product.price}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          isAdded
                            ? 'bg-[#5F7A61] text-white'
                            : 'bg-[#4A2E18] hover:bg-[#382210] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
