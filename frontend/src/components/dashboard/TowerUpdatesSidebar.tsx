import React from 'react';
import type { TowerUpdate } from '../../store/slices/dashboardSlice';

interface TowerUpdatesSidebarProps {
  updates: TowerUpdate[];
}

export const TowerUpdatesSidebar: React.FC<TowerUpdatesSidebarProps> = ({ updates }) => {
  const getUpdateStyles = (type: string) => {
    switch (type) {
      case 'primary': return { dot: 'bg-[#73ffe3]', hover: 'group-hover:text-[#73ffe3]' };
      case 'secondary': return { dot: 'bg-[#6e9bff]', hover: 'group-hover:text-[#6e9bff]' };
      case 'tertiary': return { dot: 'bg-[#ff6b98]', hover: 'group-hover:text-[#ff6b98]' };
      default: return { dot: 'bg-white', hover: 'group-hover:text-white' };
    }
  };

  return (
    <section className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
      <div className="bg-[#131313] rounded-[2rem] p-8 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#73ffe3]">campaign</span>
          <h4 className="font-headline font-bold text-xl text-white">Tower Updates</h4>
        </div>
        
        <div className="space-y-8 flex-1">
          {updates.map((update, index) => {
            const styles = getUpdateStyles(update.type);
            const isLast = index === updates.length - 1;

            return (
              <div key={update.id} className="flex gap-4 group cursor-pointer">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${styles.dot} mt-2`}></div>
                  {!isLast && <div className="flex-1 w-[1px] bg-[#484847]/30 min-h-[40px]"></div>}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-bold text-[#adaaaa] mb-1 tracking-tighter uppercase">{update.date}</p>
                  <h6 className={`font-bold text-sm text-white ${styles.hover} transition-colors`}>{update.title}</h6>
                  <p className="text-xs text-[#adaaaa] mt-2 leading-relaxed">{update.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full mt-10 py-4 text-xs font-bold text-[#adaaaa] border border-[#484847]/20 rounded-xl hover:bg-[#201f1f] transition-colors uppercase tracking-widest">
          See All Announcements
        </button>
      </div>
    </section>
  );
};
