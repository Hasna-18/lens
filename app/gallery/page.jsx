'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  Image as ImageIcon, 
  Sparkles, 
  Filter, 
  X, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryCategories = ['All', 'Conferences', 'Camps', 'Labs', 'Workshops', 'Campus'];

  const galleryItems = [
    {
      id: 1,
      title: "4th SIET International Conference on Educational Technology",
      category: "Conferences",
      image: "/events/conference.jpg",
      description: "Inauguration by Minister Sri. V. Sivankutty & Chief Guest Prof. Jan De Waters (Clarkson University, USA)."
    },
    {
      id: 2,
      title: "State-wide 'STEM 4 Girls' Camp Series",
      category: "Camps",
      image: "/events/workshop.jpg",
      description: "Inauguration by Hon'ble Minister for Finance Sri. K. N. Balagopal for ICSSR funded STEM camps."
    },
    {
      id: 3,
      title: "Residential STEM Camp for Gifted Students at Manvila",
      category: "Camps",
      image: "/events/events_book_plant.jpg",
      description: "Residential STEM training held at Agriculture Cooperative Staff Training Institute, Manvila, Thiruvananthapuram."
    },
    {
      id: 4,
      title: "LEnSE Dedicated STEM Learning Lab & Robotics Workbenches",
      category: "Labs",
      image: "/events/scholar.jpg",
      description: "Hands-on experiential STEM learning lab providing activity-based robotics and microcontroller training."
    },
    {
      id: 5,
      title: "ELTAI & Hornby Trust (UK) Secondary Teacher Workshop",
      category: "Workshops",
      image: "/events/sustainability.jpg",
      description: "Secondary level English teacher transformation workshop at Centre for Under Graduate Studies."
    },
    {
      id: 6,
      title: "University of Kerala Kariavattom Campus Architecture",
      category: "Campus",
      image: "/about/about4.png",
      description: "Department of Education & LEnSE Headquarters, Kariavattom Campus, Thiruvananthapuram."
    }
  ];

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-8 w-[650px] h-[650px] bg-[#dbe8d0]/40 dark:bg-[#082214]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="relative">
          
          <div className="relative z-10 max-w-2xl space-y-4 pt-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Media &amp; Gallery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-normal text-[#122016] dark:text-white leading-[1.1] tracking-tight font-serif">
              Media &amp; Image Gallery
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.7] max-w-xl font-normal">
              Explore dynamic photographs, laboratory facilities, state camp workshops, and conference memories across LEnSE initiatives.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm'
                    : 'bg-white/80 dark:bg-[#0b1c14]/80 hover:bg-white dark:hover:bg-[#11261a] text-[#384c3e] dark:text-slate-300 border border-[#dbe6dc] dark:border-[#183a27]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. GALLERY PHOTO GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group rounded-[2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-4 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-lg hover:-translate-y-1 hover:bg-white dark:hover:bg-[#10271c] transition-all cursor-pointer"
            >
              <div className="h-56 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] relative shadow-xs">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                  onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0d2216]/85 backdrop-blur-md text-[#a2d45e] text-[9px] font-bold uppercase tracking-wider border border-[#1e422c]/50">
                  {item.category}
                </div>

                {/* Maximize Icon */}
                <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-[#11261a] backdrop-blur-md flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] shadow-sm group-hover:scale-110 transition-transform">
                  <Maximize2 size={13} />
                </div>
              </div>

              <div className="space-y-1 px-1">
                <h3 className="text-[15px] font-serif font-semibold text-[#14261a] dark:text-white leading-snug group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#4d6052] dark:text-slate-300 leading-relaxed line-clamp-2 font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0d2216]/80 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="rounded-[2rem] bg-white dark:bg-[#0b1c14] border dark:border-[#183a27] max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] text-[10px] font-bold uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#163824] hover:bg-slate-200 dark:hover:bg-[#1e4b30] text-slate-700 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a]">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#14261a] dark:text-white">
                {selectedImage.title}
              </h3>
              <p className="text-xs text-[#526656] dark:text-slate-300 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
