import React from 'react';
import { Link } from 'react-router-dom';
import type { Facility } from '../../store/slices/facilitiesSlice';

interface FacilityCardProps {
  facility: Facility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  return (
    <div className={`${facility.spanClasses} group`}>
      <div className="relative h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden bg-surface-container shadow-2xl transition-transform duration-500 hover:-translate-y-2">
        <img 
          alt={facility.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={facility.imageUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
        
        {facility.badge && (
          <div className="absolute top-6 left-6 flex gap-2">
            <span className={`px-4 py-1.5 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full ${facility.badge === 'Popular' ? 'bg-[#fc0078]/90' : 'bg-[#0058ca]/90'}`}>
              {facility.badge}
            </span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
          <div className="max-w-md">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{facility.title}</h3>
            <p className="text-slate-300 text-sm mb-4 line-clamp-2 md:line-clamp-3 lg:mb-4">{facility.description}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#73ffe3] bg-[#73ffe3]/10 px-3 py-1.5 rounded-lg border border-[#73ffe3]/20">
                <span className="material-symbols-outlined text-base">timer</span>
                {facility.maxTimePerSession} / session
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
                <span className="material-symbols-outlined text-base text-[#adaaaa]">event_available</span>
                Max {facility.maxSessionsPerDay} session{facility.maxSessionsPerDay !== 1 ? 's' : ''}/day
              </div>
            </div>
          </div>
          
          <Link to={`/facilities/${facility.id}`} className="px-6 lg:px-8 py-3 lg:py-4 mt-4 lg:mt-0 bg-[#73ffe3] text-[#006152] font-bold rounded-xl active:scale-95 transition-all w-full md:w-auto shadow-[0_0_30px_rgba(115,255,227,0.4)] flex justify-center items-center gap-2 shrink-0">
            Book Session
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
