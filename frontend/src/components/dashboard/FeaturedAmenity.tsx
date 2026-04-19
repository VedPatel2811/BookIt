import React from 'react';

export const FeaturedAmenity: React.FC = () => {
  return (
    <section className="mt-12 rounded-[2rem] overflow-hidden relative min-h-[300px] sm:h-64 flex items-center">
      <img 
        alt="Luxury Amenity" 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9bjGEycGOS-3krDcpGYYc7rGUAz_KDGQL9BWPCfskUv3bXEEMzMbAKu09c5-S2pChaIzrTuKNM0YAc_9wKe56q9e_wyfv3djMzowOK3sjMOV-XPJeZ5hoci4edrZlCUGtyfoX_Z8yS6LcOhoYi0XwaaskS5cDCT1x_Q0w0y57cnMdT2krGvN3ZWs7Eg_mUplPgEdE-zo9IE2cUPLg-EFlHf-3mPONMcR-K49yGzmE7dOaxojVjLa2nSGhaqYyb6qEP2ULZE6Ww"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent"></div>
      
      <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-center max-w-xl">
        <span className="text-[10px] font-black tracking-[0.2em] text-[#73ffe3] uppercase mb-3">Featured Spot</span>
        <h4 className="text-3xl md:text-4xl font-headline font-black mb-4 tracking-tight text-white leading-tight">The Zenith Rooftop Lounge</h4>
        <p className="text-[#adaaaa] text-sm md:text-base mb-8 max-w-md">Experience the city skyline from our premium rooftop facility. Now open for evening bookings.</p>
        <div>
          <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/20 text-white transition-all">
            Explore Details
          </button>
        </div>
      </div>
    </section>
  );
};
