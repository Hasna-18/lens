'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Globe, Calendar, MapPin, Users, Sparkles, CheckCircle2, Mail, Leaf } from 'lucide-react';
import { DEFAULT_OUTREACH, getStoredData } from '../../lib/data';

export default function OutreachPage() {
  const [outreachItems] = useState(getStoredData('outreach', DEFAULT_OUTREACH));
  const [sliderIndex, setSliderIndex] = useState(0);

  const eventsList = [
    {
      title: "National Conference on Learning Engineering & Climate Literacy",
      date: "October 14-16, 2026",
      location: "Senate Hall, University of Kerala, Thiruvananthapuram",
      desc: "Bringing international researchers, policy makers, and educators together to establish NEP 2020 energy education benchmarks."
    },
    {
      title: "Mobile STEM Van Rural School Workshop Series",
      date: "September 05-20, 2026",
      location: "44+ Schools in Wayanad & Idukki Districts",
      desc: "Hands-on robotics, solar power kits, and digital optics experiments delivered directly to rural secondary school students."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 pb-28 pt-28 sm:pt-36 transition-colors duration-300 relative overflow-hidden selection:bg-[#a2d45e]/30">
      
      {/* Top Ambient Glow & Hero Section */}
      <div className="relative pb-12 overflow-hidden text-center max-w-5xl mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400 mb-3">
          <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
          <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
          <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
          <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Field Initiatives</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#131f17] dark:text-white tracking-tight mt-2">
          Outreach &amp; <span className="italic text-[#243d2c] dark:text-[#a2d45e]">Impact</span>
        </h1>

        <p className="text-[#405245] dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-3 leading-relaxed font-normal">
          Connecting academic research to rural schools, community energy literacy, and national teacher capacity building bootcamps.
        </p>
      </div>

      {/* Featured Outreach Spotlight Card */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="relative p-6 sm:p-10 rounded-[2.5rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-72 h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
              alt="LEnSE Mobile STEM Van"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "/events/workshop.jpg"; }}
            />
            <span className="absolute bottom-3 left-3 bg-[#1b3726] dark:bg-[#a2d45e] text-white dark:text-[#031008] text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow">
              FLAGSHIP OUTREACH
            </span>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <h2 className="font-serif font-bold text-3xl text-[#14261a] dark:text-white">Mobile Experiential STEM Van Fleet</h2>
              <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                44+ Rural Schools • 1,200+ Students Reached
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
              Equipped with solar power micro-grid demo models, robotics workbench kits, micro-controller coding tools, and optics packages delivered straight to rural classrooms.
            </p>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#f0f4ef] dark:border-[#183a27] text-center">
              <div>
                <span className="font-serif font-bold text-xl text-[#14261a] dark:text-white block">44+</span>
                <span className="text-[10px] text-[#637667] dark:text-slate-400 font-bold uppercase tracking-wider block">Schools Visited</span>
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-[#14261a] dark:text-white block">1,200+</span>
                <span className="text-[10px] text-[#637667] dark:text-slate-400 font-bold uppercase tracking-wider block">Student Beneficiaries</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#254d35] dark:hover:bg-[#1c5c34] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Mail size={14} />
              <span>Request School Visit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Events Portal Section */}
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e2ece4] dark:border-[#183a27] pb-3">
            <h2 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white flex items-center gap-2">
              <span>Event Management Portal</span>
            </h2>
            <span className="text-xs text-[#637667] dark:text-slate-400 font-semibold">
              0{sliderIndex + 1} / 0{eventsList.length}
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-[2.2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
                alt={eventsList[sliderIndex].title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "/events/conference.jpg"; }}
              />
            </div>
            <div className="space-y-4 text-left flex-1">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">{eventsList[sliderIndex].title}</h3>
                <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                  {eventsList[sliderIndex].date}
                </span>
              </div>
              <p className="text-xs text-[#556758] dark:text-slate-400 flex items-center gap-1 font-semibold">
                <MapPin size={14} className="text-[#2d5a3c] dark:text-[#a2d45e]" /> {eventsList[sliderIndex].location}
              </p>
              <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
                {eventsList[sliderIndex].desc}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSliderIndex((prev) => (prev === 0 ? eventsList.length - 1 : prev - 1))}
                  className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => setSliderIndex((prev) => (prev === eventsList.length - 1 ? 0 : prev + 1))}
                  className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
