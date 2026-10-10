import { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { Eye, X } from 'lucide-react';

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filters = ['All', 'Specialty Coffee', 'Bakery', 'Savory', 'Desserts', 'Ambiance'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-[#FAF7F0] border-t border-[#EBE3D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#5F7A61] uppercase">
            Visual Story
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#382210]">
            Moments at Urban Brew
          </h2>
          <p className="text-sm sm:text-base text-[#6B533F]">
            A peek behind the espresso bar, warm deck ovens, and welcoming spaces at 24 Market Street.
          </p>
        </div>

        {/* Filter Pills / Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeFilter === filter
                  ? 'bg-[#4A2E18] text-white font-medium'
                  : 'bg-[#EFE8DC] text-[#6B533F] hover:bg-[#E5DDCF]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-xl overflow-hidden border border-[#EBE3D0] bg-[#FDFBF7] shadow-xs cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-[#EFE8DC]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay with Title and Category */}
              <div className="p-4 bg-[#FDFBF7] border-t border-[#EBE3D0]/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#5F7A61] font-semibold block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-[#382210] group-hover:text-[#4A2E18]">
                    {item.title}
                  </h3>
                </div>
                <div className="p-1.5 text-[#8C7460] group-hover:text-[#382210] group-hover:bg-[#FAF5EE] rounded-md transition-colors">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-[#FDFBF7] rounded-xl overflow-hidden max-w-3xl w-full border border-[#DECFBE] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full max-h-[70vh] object-contain bg-black/90"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 bg-[#FDFBF7] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#EBE3D0]">
              <div>
                <span className="text-xs uppercase text-[#5F7A61] font-semibold tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-base font-serif font-bold text-[#382210]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#6B533F] mt-0.5">{selectedPhoto.caption}</p>
              </div>
              <span className="text-xs text-[#8C7460] font-mono shrink-0">
                Urban Brew Photography
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
