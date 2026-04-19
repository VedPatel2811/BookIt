import React from 'react';

export const QuickActionsGrid: React.FC = () => {
  const actions = [
    { icon: 'person_add', label: 'Register Visitor', bgColor: 'bg-[#73ffe3]/10', iconColor: 'text-[#73ffe3]', hoverBg: 'group-hover:bg-[#73ffe3]', hoverIcon: 'group-hover:text-[#006152]' },
    { icon: 'report_problem', label: 'Raise Complaint', bgColor: 'bg-[#6e9bff]/10', iconColor: 'text-[#6e9bff]', hoverBg: 'group-hover:bg-[#6e9bff]', hoverIcon: 'group-hover:text-[#001d4e]' },
    { icon: 'calendar_month', label: 'Book Amenity', bgColor: 'bg-[#ff6b98]/10', iconColor: 'text-[#ff6b98]', hoverBg: 'group-hover:bg-[#ff6b98]', hoverIcon: 'group-hover:text-[#47001d]' },
    { icon: 'history', label: 'History', bgColor: 'bg-[#adaaaa]/10', iconColor: 'text-[#adaaaa]', hoverBg: 'group-hover:bg-[#adaaaa]', hoverIcon: 'group-hover:text-[#0e0e0e]' },
  ];

  return (
    <section className="col-span-12 lg:col-span-8 mt-6 lg:mt-0">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-headline font-bold text-xl px-2 text-white">Quick Actions</h4>
        <button className="text-xs font-bold text-[#adaaaa] hover:text-[#73ffe3] transition-colors uppercase tracking-widest">VIEW ALL</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {actions.map((action, idx) => (
          <div key={idx} className="bg-[#1a1919]/40 backdrop-blur-xl border-t border-l border-white/5 p-6 rounded-3xl flex flex-col gap-8 cursor-pointer hover:bg-[#262626] transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${action.bgColor} flex items-center justify-center ${action.hoverBg} transition-colors duration-300`}>
              <span className={`material-symbols-outlined ${action.iconColor} ${action.hoverIcon} transition-colors duration-300`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {action.icon}
              </span>
            </div>
            <p className="font-headline font-bold text-sm text-white tracking-tight">{action.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
