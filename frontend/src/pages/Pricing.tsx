import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const PRICING_TIERS = [
  {
    name: 'Free Tier',
    description: 'Perfect for small societies up to 20 units.',
    price: '₹0',
    unit: 'forever',
    features: [
      'Up to 20 units included',
      'All core management features',
      'Direct UPI payments to society',
      'Zero setup fees'
    ],
    buttonText: 'Get Started',
    isPopular: false,
    color: 'secondary'
  },
  {
    name: 'Standard',
    description: 'For comprehensive estates over 20 units.',
    price: '₹50',
    unit: 'per unit / month',
    features: [
      'Unlimited units support',
      'Priority 24/7 technical support',
      'Direct UPI payments with instant settlement',
      'Advanced financial reporting'
    ],
    buttonText: 'Upgrade Estate',
    isPopular: true,
    color: 'primary'
  }
];

const FAQS = [
  {
    question: 'How do direct UPI payments work?',
    answer: 'We integrate with your society\'s bank account directly. When a resident pays their maintenance via any UPI app, the money goes straight to the society account. We do not hold funds or charge transaction fees.'
  },
  {
    question: 'Are there any hidden setup or onboarding fees?',
    answer: 'Absolutely not. Our pricing is transparent. There are no setup fees, onboarding charges, or hidden maintenance costs. You only pay the per-unit subscription fee for the Standard tier.'
  },
  {
    question: 'What happens when our society crosses 20 units?',
    answer: 'If your society expands beyond 20 units, you will automatically be transitioned to the Standard tier. You will then be billed ₹50 per unit per month for all units in your society.'
  }
];

export function Pricing() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-clip min-h-screen bg-mesh">
      <Header />

      <main className="pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="relative px-6 md:px-8 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-[1.1]">
              Simple, Transparent <br />
              <span className="text-primary italic text-glow">Pricing</span>
            </h1>
            <p className="text-on-surface-variant opacity-80 text-lg md:text-xl leading-relaxed">
              No setup fees, no transaction cuts. UPI payments go directly to your society. Everything you need to manage your estate, clearly priced.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 md:px-8 lg:px-16 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
           
           <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
             {PRICING_TIERS.map((tier) => (
               <div 
                 key={tier.name}
                 className={`relative rounded-[2.5rem] p-10 md:p-12 flex flex-col h-full border ${
                   tier.isPopular 
                    ? 'bg-surface-container-highest border-primary/30 shadow-[0_0_50px_rgba(var(--color-primary),0.1)]' 
                    : 'bg-surface-container-low border-outline-variant/20'
                 }`}
               >
                 {tier.isPopular && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background font-headline font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-full">
                     Most Popular
                   </div>
                 )}
                 
                 <div className="space-y-4 mb-8">
                   <h3 className="text-3xl font-headline font-bold">{tier.name}</h3>
                   <p className="text-on-surface-variant opacity-80 h-12 line-clamp-2">{tier.description}</p>
                 </div>
                 
                 <div className="flex items-baseline gap-2 mb-10">
                   <span className="text-5xl font-headline font-black">{tier.price}</span>
                   <span className="text-on-surface-variant opacity-60 font-label tracking-wide uppercase text-sm">/ {tier.unit}</span>
                 </div>
                 
                 <div className="space-y-5 flex-1 mb-12">
                   {tier.features.map((feature, idx) => (
                     <div key={idx} className="flex items-start gap-4">
                       <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: '20px' }}>check_circle</span>
                       <span className="text-on-surface-variant opacity-90">{feature}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link to="/signup" className="mt-auto">
                   <button className={`w-full py-4 rounded-xl font-headline font-bold text-base transition-all active:scale-[0.98] ${
                     tier.isPopular 
                       ? 'bg-primary text-background hover:shadow-[0_0_30px_var(--color-primary)]' 
                       : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant border border-outline-variant/20'
                   }`}>
                     {tier.buttonText}
                   </button>
                 </Link>
               </div>
             ))}
           </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-8 lg:px-16 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-on-surface-variant opacity-80 text-lg">Everything you need to know about our billing.</p>
          </div>
          
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-8 hover:bg-surface-container transition-colors">
                <h3 className="text-xl font-headline font-bold mb-3">{faq.question}</h3>
                <p className="text-on-surface-variant opacity-70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
