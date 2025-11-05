import { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    businessModel: '',
    targetMarket: '',
    productStage: '',
    budget: '',
    timeline: '',
    differentiator: '',
    primaryGoal: ''
  });
  const [strategy, setStrategy] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateStrategy = () => {
    const { productType, businessModel, targetMarket, productStage, budget, timeline, differentiator, primaryGoal } = formData;

    // Generate positioning statement
    const positioning = generatePositioning(productType, differentiator, targetMarket);

    // Generate ICP
    const icp = generateICP(businessModel, targetMarket);

    // Generate channels
    const channels = generateChannels(businessModel, targetMarket, budget);

    // Generate tactics
    const tactics = generateTactics(productStage, primaryGoal, budget);

    // Generate metrics
    const metrics = generateMetrics(primaryGoal, businessModel);

    // Generate timeline
    const phases = generatePhases(timeline, productStage);

    setStrategy({
      positioning,
      icp,
      channels,
      tactics,
      metrics,
      phases
    });
  };

  const generatePositioning = (productType, differentiator, targetMarket) => {
    const typeMap = {
      'saas': 'software solution',
      'physical': 'product',
      'service': 'service',
      'platform': 'platform'
    };

    return `For ${targetMarket} who need ${differentiator}, our ${typeMap[productType] || 'solution'} delivers exceptional value by solving their key challenges in a way that no other solution can match.`;
  };

  const generateICP = (businessModel, targetMarket) => {
    const icpMap = {
      'b2b-smb': {
        size: '10-200 employees',
        decision: 'Director or VP level',
        cycle: '1-3 months',
        characteristics: ['Budget-conscious', 'Quick decision-making', 'Self-service preferred']
      },
      'b2b-midmarket': {
        size: '200-1000 employees',
        decision: 'VP or C-level with committee',
        cycle: '3-6 months',
        characteristics: ['ROI-focused', 'Security-conscious', 'Integration requirements']
      },
      'b2b-enterprise': {
        size: '1000+ employees',
        decision: 'C-level with procurement',
        cycle: '6-12 months',
        characteristics: ['Enterprise features required', 'Compliance-focused', 'Complex integration needs']
      },
      'b2c-mass': {
        size: 'Individual consumers',
        decision: 'End user',
        cycle: 'Minutes to hours',
        characteristics: ['Price-sensitive', 'Impulse buyers', 'Mobile-first']
      },
      'b2c-premium': {
        size: 'Affluent consumers',
        decision: 'End user with research',
        cycle: 'Days to weeks',
        characteristics: ['Quality-focused', 'Brand-conscious', 'Experience-driven']
      }
    };

    const key = `${businessModel}-${targetMarket}`.toLowerCase();
    return icpMap[key] || icpMap['b2b-smb'];
  };

  const generateChannels = (businessModel, targetMarket, budget) => {
    const channelSets = {
      'b2b-low': [
        { name: 'LinkedIn Organic', priority: 'High', rationale: 'Cost-effective reach to B2B audience' },
        { name: 'Content Marketing', priority: 'High', rationale: 'Build authority and SEO presence' },
        { name: 'Email Outreach', priority: 'Medium', rationale: 'Direct connection with prospects' },
        { name: 'Industry Communities', priority: 'Medium', rationale: 'Build credibility in niche' }
      ],
      'b2b-medium': [
        { name: 'LinkedIn Ads', priority: 'High', rationale: 'Targeted B2B advertising' },
        { name: 'Google Search Ads', priority: 'High', rationale: 'Capture high-intent searches' },
        { name: 'Content Marketing', priority: 'High', rationale: 'Build authority and inbound leads' },
        { name: 'Webinars', priority: 'Medium', rationale: 'Educate and generate qualified leads' },
        { name: 'Partnership Marketing', priority: 'Medium', rationale: 'Leverage existing networks' }
      ],
      'b2b-high': [
        { name: 'Multi-Channel ABM', priority: 'High', rationale: 'Targeted approach to key accounts' },
        { name: 'LinkedIn Ads', priority: 'High', rationale: 'Reach decision-makers' },
        { name: 'Google Search Ads', priority: 'High', rationale: 'Capture demand' },
        { name: 'Content Marketing', priority: 'High', rationale: 'Thought leadership' },
        { name: 'Events & Conferences', priority: 'Medium', rationale: 'Face-to-face connections' },
        { name: 'PR & Analyst Relations', priority: 'Medium', rationale: 'Build credibility' }
      ],
      'b2c-low': [
        { name: 'Social Media Organic', priority: 'High', rationale: 'Build community cost-effectively' },
        { name: 'Content Marketing', priority: 'High', rationale: 'SEO and brand awareness' },
        { name: 'Referral Program', priority: 'Medium', rationale: 'Word-of-mouth growth' },
        { name: 'Email Marketing', priority: 'Medium', rationale: 'Nurture and retention' }
      ],
      'b2c-medium': [
        { name: 'Facebook/Instagram Ads', priority: 'High', rationale: 'Broad consumer reach' },
        { name: 'Google Ads', priority: 'High', rationale: 'Capture purchase intent' },
        { name: 'Influencer Marketing', priority: 'Medium', rationale: 'Social proof and reach' },
        { name: 'Content Marketing', priority: 'Medium', rationale: 'SEO and engagement' }
      ],
      'b2c-high': [
        { name: 'Multi-Channel Performance Marketing', priority: 'High', rationale: 'Maximize reach' },
        { name: 'TV/Connected TV', priority: 'Medium', rationale: 'Mass awareness' },
        { name: 'Influencer Partnerships', priority: 'High', rationale: 'Authenticity at scale' },
        { name: 'Content Marketing', priority: 'High', rationale: 'SEO and brand' }
      ]
    };

    const key = `${businessModel}-${budget}`.toLowerCase();
    return channelSets[key] || channelSets['b2b-low'];
  };

  const generateTactics = (productStage, primaryGoal, budget) => {
    const tacticsByGoal = {
      'awareness': [
        'Launch content campaign targeting your ICP',
        'Create thought leadership pieces',
        'Start a podcast or video series',
        'Engage in industry communities',
        'Develop a strong social media presence'
      ],
      'leads': [
        'Create gated content (whitepapers, guides)',
        'Launch targeted ad campaigns',
        'Optimize website for conversion',
        'Implement lead magnets',
        'Host webinars and workshops'
      ],
      'revenue': [
        'Implement free trial or freemium model',
        'Launch promotional campaigns',
        'Optimize sales funnel',
        'Create urgency with limited-time offers',
        'Develop partnership channels'
      ],
      'adoption': [
        'Create comprehensive onboarding',
        'Develop educational content',
        'Implement in-app guidance',
        'Build customer success program',
        'Launch user community'
      ]
    };

    return tacticsByGoal[primaryGoal] || tacticsByGoal['awareness'];
  };

  const generateMetrics = (primaryGoal, businessModel) => {
    const metricsByGoal = {
      'awareness': [
        'Website traffic growth',
        'Social media impressions and engagement',
        'Brand search volume',
        'Share of voice in industry'
      ],
      'leads': [
        'Marketing Qualified Leads (MQLs)',
        'Lead conversion rate',
        'Cost per lead',
        'Lead-to-opportunity rate'
      ],
      'revenue': [
        'Monthly Recurring Revenue (MRR) or Revenue',
        'Customer Acquisition Cost (CAC)',
        'Average Contract Value (ACV)',
        'Sales cycle length',
        'Win rate'
      ],
      'adoption': [
        'Activation rate',
        'Time to value',
        'Feature adoption',
        'User engagement score',
        'Net Promoter Score (NPS)'
      ]
    };

    return metricsByGoal[primaryGoal] || metricsByGoal['awareness'];
  };

  const generatePhases = (timeline, productStage) => {
    if (timeline === 'short') {
      return [
        { phase: 'Week 1-2', focus: 'Foundation', activities: 'Set up tracking, finalise messaging, prepare assets' },
        { phase: 'Week 3-6', focus: 'Launch', activities: 'Execute initial campaigns, start content creation' },
        { phase: 'Week 7-12', focus: 'Optimise', activities: 'Analyse results, optimise channels, scale what works' }
      ];
    } else if (timeline === 'medium') {
      return [
        { phase: 'Month 1', focus: 'Foundation', activities: 'Research, positioning, asset creation' },
        { phase: 'Month 2-3', focus: 'Launch', activities: 'Initial campaigns across 2-3 channels' },
        { phase: 'Month 4-6', focus: 'Scale', activities: 'Expand successful channels, test new ones' }
      ];
    } else {
      return [
        { phase: 'Q1', focus: 'Foundation & Testing', activities: 'Market research, positioning, MVP campaigns' },
        { phase: 'Q2', focus: 'Launch & Learn', activities: 'Full campaign launch, A/B testing, optimisation' },
        { phase: 'Q3', focus: 'Scale & Expand', activities: 'Scale winning channels, add new channels' },
        { phase: 'Q4', focus: 'Optimise & Refine', activities: 'Advanced optimisation, partnership development' }
      ];
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      generateStrategy();
      setStep(6);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      productName: '',
      productType: '',
      businessModel: '',
      targetMarket: '',
      productStage: '',
      budget: '',
      timeline: '',
      differentiator: '',
      primaryGoal: ''
    });
    setStrategy(null);
  };

  const exportStrategy = () => {
    const text = `
GTM STRATEGY FOR ${formData.productName.toUpperCase()}

POSITIONING
${strategy.positioning}

IDEAL CUSTOMER PROFILE
Company Size: ${strategy.icp.size}
Decision Maker: ${strategy.icp.decision}
Sales Cycle: ${strategy.icp.cycle}
Key Characteristics:
${strategy.icp.characteristics.map(c => `- ${c}`).join('\n')}

RECOMMENDED CHANNELS
${strategy.channels.map(c => `${c.name} (${c.priority} Priority)\n  Rationale: ${c.rationale}`).join('\n\n')}

KEY TACTICS
${strategy.tactics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

SUCCESS METRICS
${strategy.metrics.map(m => `- ${m}`).join('\n')}

TIMELINE & PHASES
${strategy.phases.map(p => `${p.phase} - ${p.focus}\n  ${p.activities}`).join('\n\n')}

────────────────────────────────────────────────────────────
Generated by Edou Mota's GTM Strategy Generator
https://gtm-strategy-generator.vercel.app
GitHub: https://github.com/TheDuGuy
────────────────────────────────────────────────────────────
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtm-strategy-${formData.productName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Let's start with the basics</h2>
            <p className="text-gray-300 mb-6">Tell us about your product</p>

            <div>
              <label className="block text-white font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your product name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Product Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['SaaS', 'Physical', 'Service', 'Platform'].map(type => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('productType', type.toLowerCase())}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.productType === type.toLowerCase()
                        ? 'border-blue-400 bg-blue-400/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Business Model</label>
              <div className="grid grid-cols-2 gap-3">
                {['B2B', 'B2C'].map(model => (
                  <button
                    key={model}
                    onClick={() => handleInputChange('businessModel', model.toLowerCase())}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.businessModel === model.toLowerCase()
                        ? 'border-blue-400 bg-blue-400/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-medium">{model}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Target Market</h2>
            <p className="text-gray-300 mb-6">Who are you selling to?</p>

            <div>
              <label className="block text-white font-medium mb-2">
                {formData.businessModel === 'b2b' ? 'Company Size' : 'Customer Segment'}
              </label>
              <div className="grid grid-cols-1 gap-3">
                {formData.businessModel === 'b2b' ? (
                  ['SMB', 'MidMarket', 'Enterprise'].map(market => (
                    <button
                      key={market}
                      onClick={() => handleInputChange('targetMarket', market.toLowerCase())}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.targetMarket === market.toLowerCase()
                          ? 'border-blue-400 bg-blue-400/20'
                          : 'border-white/20 bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <span className="text-white font-medium">{market}</span>
                      <p className="text-gray-300 text-sm mt-1">
                        {market === 'SMB' && '10-200 employees'}
                        {market === 'MidMarket' && '200-1000 employees'}
                        {market === 'Enterprise' && '1000+ employees'}
                      </p>
                    </button>
                  ))
                ) : (
                  ['Mass', 'Premium'].map(market => (
                    <button
                      key={market}
                      onClick={() => handleInputChange('targetMarket', market.toLowerCase())}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.targetMarket === market.toLowerCase()
                          ? 'border-blue-400 bg-blue-400/20'
                          : 'border-white/20 bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <span className="text-white font-medium">{market} Market</span>
                      <p className="text-gray-300 text-sm mt-1">
                        {market === 'Mass' && 'Broad consumer audience'}
                        {market === 'Premium' && 'Affluent, quality-focused consumers'}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Product Stage</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'mvp', label: 'MVP / Pre-Launch', desc: 'Just starting out' },
                  { value: 'growth', label: 'Growth', desc: 'Product-market fit achieved' },
                  { value: 'mature', label: 'Mature', desc: 'Established in market' }
                ].map(stage => (
                  <button
                    key={stage.value}
                    onClick={() => handleInputChange('productStage', stage.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.productStage === stage.value
                        ? 'border-blue-400 bg-blue-400/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-medium">{stage.label}</span>
                    <p className="text-gray-300 text-sm mt-1">{stage.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Budget & Timeline</h2>
            <p className="text-gray-300 mb-6">What resources do you have?</p>

            <div>
              <label className="block text-white font-medium mb-2">Monthly Marketing Budget</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'low', label: 'Low Budget', desc: 'Under $5K/month' },
                  { value: 'medium', label: 'Medium Budget', desc: '$5K-$25K/month' },
                  { value: 'high', label: 'High Budget', desc: '$25K+/month' }
                ].map(budget => (
                  <button
                    key={budget.value}
                    onClick={() => handleInputChange('budget', budget.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.budget === budget.value
                        ? 'border-blue-400 bg-blue-400/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-medium">{budget.label}</span>
                    <p className="text-gray-300 text-sm mt-1">{budget.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Launch Timeline</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'short', label: 'Short', desc: '1-3 months' },
                  { value: 'medium', label: 'Medium', desc: '3-6 months' },
                  { value: 'long', label: 'Long', desc: '6-12 months' }
                ].map(timeline => (
                  <button
                    key={timeline.value}
                    onClick={() => handleInputChange('timeline', timeline.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.timeline === timeline.value
                        ? 'border-blue-400 bg-blue-400/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-medium">{timeline.label} Term</span>
                    <p className="text-gray-300 text-sm mt-1">{timeline.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Differentiation</h2>
            <p className="text-gray-300 mb-6">What makes you unique?</p>

            <div>
              <label className="block text-white font-medium mb-2">
                Key Differentiator
              </label>
              <textarea
                value={formData.differentiator}
                onChange={(e) => handleInputChange('differentiator', e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
                placeholder="What problem do you solve better than anyone else? What makes you different?"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Primary Goal</h2>
            <p className="text-gray-300 mb-6">What's your top priority?</p>

            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'awareness', label: 'Brand Awareness', desc: 'Get your name out there' },
                { value: 'leads', label: 'Lead Generation', desc: 'Build your pipeline' },
                { value: 'revenue', label: 'Revenue Growth', desc: 'Drive sales and conversions' },
                { value: 'adoption', label: 'Product Adoption', desc: 'Get users engaged' }
              ].map(goal => (
                <button
                  key={goal.value}
                  onClick={() => handleInputChange('primaryGoal', goal.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.primaryGoal === goal.value
                      ? 'border-blue-400 bg-blue-400/20'
                      : 'border-white/20 bg-white/10 hover:border-white/40'
                  }`}
                >
                  <span className="text-white font-medium">{goal.label}</span>
                  <p className="text-gray-300 text-sm mt-1">{goal.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">Your GTM Strategy</h2>
              <p className="text-gray-300">for {formData.productName}</p>
            </div>

            {/* Positioning */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-3">Positioning Statement</h3>
              <p className="text-white text-lg leading-relaxed">{strategy.positioning}</p>
            </div>

            {/* ICP */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Ideal Customer Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Company/Customer Size</p>
                  <p className="text-white font-medium">{strategy.icp.size}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Decision Maker</p>
                  <p className="text-white font-medium">{strategy.icp.decision}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Sales Cycle</p>
                  <p className="text-white font-medium">{strategy.icp.cycle}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Key Characteristics</p>
                <ul className="space-y-2">
                  {strategy.icp.characteristics.map((char, i) => (
                    <li key={i} className="text-white flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Channels */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Recommended Channels</h3>
              <div className="space-y-4">
                {strategy.channels.map((channel, i) => (
                  <div key={i} className="border-l-4 border-blue-400 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold">{channel.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        channel.priority === 'High'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {channel.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{channel.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactics */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Key Tactics</h3>
              <ul className="space-y-3">
                {strategy.tactics.map((tactic, i) => (
                  <li key={i} className="text-white flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 text-sm">
                      {i + 1}
                    </span>
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Success Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {strategy.metrics.map((metric, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">{metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Timeline & Phases</h3>
              <div className="space-y-4">
                {strategy.phases.map((phase, i) => (
                  <div key={i} className="relative pl-8 pb-6 border-l-2 border-blue-400 last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-[9px]"></div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{phase.phase}</h4>
                      <p className="text-blue-300 font-medium mb-1">{phase.focus}</p>
                      <p className="text-gray-300 text-sm">{phase.activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={exportStrategy}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold"
              >
                Export Strategy
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold border border-white/20"
              >
                Start Over
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.productName && formData.productType && formData.businessModel;
      case 2:
        return formData.targetMarket && formData.productStage;
      case 3:
        return formData.budget && formData.timeline;
      case 4:
        return formData.differentiator;
      case 5:
        return formData.primaryGoal;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            GTM Strategy Generator
          </h1>
          <p className="text-xl text-gray-300">
            Answer a few questions to get your personalised go-to-market strategy
          </p>
        </div>

        {/* Progress Bar */}
        {step < 6 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300 text-sm">Step {step} of 5</span>
              <span className="text-gray-300 text-sm">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {renderStep()}

          {/* Navigation Buttons */}
          {step < 6 && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold border border-white/20"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 5 ? 'Generate Strategy' : 'Next'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Built by <a href="https://github.com/TheDuGuy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Edou Mota</a>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            RevOps & Marketing Automation Specialist
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
