import React from 'react';
import type { VisitorPass } from '../../store/slices/dashboardSlice';

interface VisitorPassListProps {
  visitors: VisitorPass[];
}

export const VisitorPassList: React.FC<VisitorPassListProps> = ({ visitors }) => {
  return (
    <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
      <h4 className="font-headline font-bold text-xl px-2 text-white">Active Visitor Passes</h4>
      
      {visitors.length > 0 ? (
        visitors.map(visitor => (
          <div key={visitor.id} className="bg-[#1a1919]/40 backdrop-blur-xl border-t border-l border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0058ca] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#f7f7ff]">person</span>
                </div>
                <div>
                  <h5 className="font-bold text-white tracking-tight">{visitor.visitorName}</h5>
                  <p className="text-xs text-[#adaaaa]">{visitor.type} • Entry at {visitor.entryTime}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#73ffe3] bg-[#73ffe3]/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                {visitor.status}
              </span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <div className="flex-1 h-1 bg-[#262626] rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#73ffe3] shadow-[0_0_8px_rgba(115,255,227,0.5)]"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#adaaaa]">Valid till {visitor.validTill}</span>
              <button className="text-xs font-bold text-[#73ffe3] hover:underline uppercase tracking-widest transition-all">Revoke</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-[#adaaaa] px-2">No active visitor passes right now.</p>
      )}

      {/* Action to create new */}
      <div className="bg-[#1a1919] rounded-3xl p-6 border border-dashed border-[#484847] flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:border-[#73ffe3]/50 transition-colors group">
        <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#73ffe3]">add</span>
        </div>
        <p className="text-xs text-[#adaaaa] font-medium group-hover:text-white transition-colors">Create New Invite</p>
      </div>
    </section>
  );
};
