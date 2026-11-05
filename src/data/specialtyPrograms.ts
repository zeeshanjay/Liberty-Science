export interface SpecialtyProgram {
  id: string;
  title: string;
  subtitle: string;
  pillar: "life" | "business" | "health";
  pillarLabel: string;
  duration: string;
  originalPrice: string;
  specialPrice: string;
  amountCents: number;
  stripeCheckoutUrl: string;
  summary: string;
  highlights: string[];
  bestFor: string;
  badge?: string;
}

export const SPECIALTY_PROGRAMS: SpecialtyProgram[] = [
  // ==========================================
  // LIFE ADVISORY & EMOTIONAL RESILIENCE (5)
  // ==========================================
  {
    id: "thrive-mentally",
    title: "Thrive Mentally",
    subtitle: "Better Holistic Treatment Through Coaching",
    pillar: "life",
    pillarLabel: "Life Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Elevate your mental health with integrative tools for emotional balance and resilience. Foundation explores mindfulness, nutrition's role in mood, and biofeedback basics, followed by customized techniques like journaling and breathwork tracking improvements in stress and focus.",
    highlights: [
      "Mindfulness & nutrition's role in neuro-chemical mood",
      "Biofeedback & heart rate variability basics",
      "Custom breathwork, journaling & stress tracking",
      "Ideal for navigating anxiety or executive burnout",
    ],
    bestFor: "Individuals navigating anxiety, cognitive burnout, or emotional fatigue.",
    badge: "Emotional Balance",
  },
  {
    id: "master-self-regulation",
    title: "Master Self-Regulation for Daily Resilience",
    subtitle: "HeartMath® Scientifically Documented Coherence",
    pillar: "life",
    pillarLabel: "Life Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Harness HeartMath's biofeedback for emotional self-management. The 1-hour core session trains coherence techniques to regulate heart rhythms and build resilience; 4 follow-ups refine applications for daily life, tracking heart rate variability (HRV) improvements.",
    highlights: [
      "0.10 Hz Heart-Rate Variability (HRV) biofeedback",
      "Autonomic vagal tone regulation under pressure",
      "Cortisol down-regulation & executive composure",
      "Master inner emotional state virtually",
    ],
    bestFor: "High-stress lifestyles, executive pressure, and emotional reactivity.",
    badge: "HeartMath® Certified",
  },
  {
    id: "bust-your-stress",
    title: "Bust Your Stress",
    subtitle: "Proven Techniques for Calm Living",
    pillar: "life",
    pillarLabel: "Life Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Bust stress with HeartMath's quick coherence tools. 1-hour session teaches breath-focused methods; four follow-ups apply them to real-life high-friction scenarios. Evidence-based for lowering cortisol and reclaiming mental calm.",
    highlights: [
      "Quick coherence breath-focused shift tools",
      "Evidence-based cortisol reduction",
      "Real scenario friction de-escalation",
      "Sustainable mental calm without withdrawal",
    ],
    bestFor: "Chronic stress, overwhelmed professionals, and caregiver friction.",
  },
  {
    id: "anxiety-relief-now",
    title: "Anxiety Relief Now",
    subtitle: "Build Inner Peace Step-by-Step",
    pillar: "life",
    pillarLabel: "Life Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Reduce anxiety through HeartMath's step-by-step coherence. Sessions build skills for peace, backed by neuroscience for nervous system balance. Learn breath-focused methods and apply them to calm sympathetic fight-or-flight loops.",
    highlights: [
      "Step-by-step coherence skills for peace",
      "Autonomic nervous system stabilization",
      "Panic, worry & racing-thought interruption",
      "Durable inner quiet and sleep composure",
    ],
    bestFor: "Acute worry, autonomic restlessness, and sleep-disrupting anxiety.",
  },
  {
    id: "anger-tamer",
    title: "Anger Tamer",
    subtitle: "Transform Emotions for Better Relationships",
    pillar: "life",
    pillarLabel: "Life Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Tame reactive anger and frustration with HeartMath's emotional shift techniques. Sessions foster empathy and self-regulation; clinically proven for healthier interactions across workplace and personal relationships.",
    highlights: [
      "HeartMath emotional shift techniques",
      "Empathy cultivation and trigger awareness",
      "De-escalation protocols for intense friction",
      "Healthier professional and personal interactions",
    ],
    bestFor: "Relationship friction, executive frustration, and reactive anger triggers.",
  },

  // ==========================================
  // BUSINESS & EXECUTIVE CAPACITY (2)
  // ==========================================
  {
    id: "scale-up",
    title: "Scale Up",
    subtitle: "Accelerate Your Project / Find the Glitch in Pattern",
    pillar: "business",
    pillarLabel: "Business Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "A 5-session sprint for owners, founders, and project leads who feel momentum slipping or a pattern repeating that slows the work. A focused Metabolic Neuroplasticity™ loop pairing Fuel + Movement + Attention to clear the stall and accelerate projects without adding hours or burnout.",
    highlights: [
      "Metabolic Neuroplasticity™ loop: Fuel + Movement + Attention",
      "Identify the repetitive pattern or cognitive glitch",
      "Prefrontal bandwidth preservation under pressure",
      "Accelerate project delivery without adding hours",
    ],
    bestFor: "Owners, founders, and project leads facing momentum loss or operational stalls.",
    badge: "Executive Sprint",
  },
  {
    id: "women-business-owners",
    title: "Women Business Owners & Participants",
    subtitle: "Scale Without Stagnancy — Capacity for Women Who Run What They Built",
    pillar: "business",
    pillarLabel: "Business Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "For women owners, founders, and key leaders who need steady capacity, clear decisions, and energy that does not collapse under business and life load. Features Readiness & Load Map, HeartMath® 0.10 Hz Coherence Reset, high-amplitude movement drills, and cyclic fuel timing.",
    highlights: [
      "Readiness & Load Map to target decision fatigue",
      "HeartMath® 0.10 Hz practice to quiet cortisol spikes",
      "Movement drills (PWR!Moves / Strength4Balance style) locked into a 6-day micro-loop",
      "Cyclic metabolic switch for sustained output without crashes",
    ],
    bestFor: "Women entrepreneurs, founders, and leaders balancing demanding enterprises.",
    badge: "Founder Capacity",
  },

  // ==========================================
  // HEALTH & NEURO-METABOLIC LONGEVITY (9)
  // ==========================================
  {
    id: "menopausal-women",
    title: "Menopausal Women",
    subtitle: "Still Generating — Metabolic Neuroplasticity™ Through Menopause",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "For women navigating menopause who want cognitive clarity, stable energy, and movement that supports brain and body instead of fighting the shift. Features Signal Map, HeartMath® autonomic calm for hot flashes and sleep, BDNF stability drills, and cyclic meal-clock adjustments.",
    highlights: [
      "Readiness & Signal Map for sleep, temperature, mood & focus",
      "Autonomic calm lowering cortisol that amplifies hot flashes & brain fog",
      "Targeted amplitude & balance drills for BDNF & bone stability",
      "Cyclic metabolic switching to eliminate afternoon energy crashes",
    ],
    bestFor: "Women navigating perimenopause and menopause wanting sharp mental clarity & vitality.",
    badge: "Metabolic Longevity",
  },
  {
    id: "jumpstart-weight-loss",
    title: "Jumpstart Weight Loss",
    subtitle: "Result-Driven Metabolic Flexibility",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Tailored science-backed strategies for cyclic metabolic switching, fat loss, energy stability, and durable habit building. Personalized to your schedule and goals with on-demand plans and expert guidance from a Licensed Board Certified Health Coach.",
    highlights: [
      "Personalized nutrition & cyclic fuel switching",
      "Science-backed fat loss without metabolic slowdown",
      "Flexible virtual check-ins with text/email support",
      "Led by Licensed Board Certified Health Coach",
    ],
    bestFor: "Sustained fat loss, overcoming weight stalls, and restoring metabolic flexibility.",
  },
  {
    id: "revive-senior-balance",
    title: "Revive Senior Balance",
    subtitle: "Fall-Proof Your Life with Science",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Restore balance and prevent falls through evidence-based neuromuscular integration. Learn full-body fall-reduction techniques, vestibular calibration, and reactive balance drills to navigate real-world situations with complete confidence.",
    highlights: [
      "Full-body integration for fall reduction",
      "Vestibular balance & proprioceptive drills",
      "Evidence-based reactive stepping techniques",
      "Preserves physical autonomy and independence",
    ],
    bestFor: "Active seniors, individuals experiencing balance slips, and fall prevention.",
    badge: "Fall-Proof Protocol",
  },
  {
    id: "reclaim-mobility",
    title: "Reclaim Mobility",
    subtitle: "Integrative Pain Relief Mastery",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Break free from chronic pain with holistic techniques blending nutrition, movement, and mind-body practices. Root-cause analysis and tailored strategies like acupuncture-inspired self-care and anti-inflammatory supports to improve daily function and reduce reliance on meds.",
    highlights: [
      "Root-cause analysis for chronic joint & back pain",
      "Anti-inflammatory nutrition & tissue support",
      "Acupuncture-inspired self-care & gentle movement",
      "Reduce reliance on pain medication safely",
    ],
    bestFor: "Arthritis, chronic joint stiffness, post-injury pain, and restricted mobility.",
  },
  {
    id: "optimize-bone-rebuilding",
    title: "Optimize Bone Rebuilding",
    subtitle: "Fortify Bone Density & Vitality",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Rebuild and fortify your bones with integrative approaches to combat osteoporosis or age-related loss. Explores evidence-based nutrition (calcium, vitamin D, collagen signaling), targeted loading exercises, and functional lifestyle hacks for enhanced bone density.",
    highlights: [
      "Evidence-based bone nutrition (Ca, Vit D, collagen)",
      "Targeted osteogenic loading exercises",
      "Simple progress tracking assessments",
      "Rooted in functional medicine & bone density research",
    ],
    bestFor: "Osteoporosis, osteopenia, and seniors seeking fracture prevention.",
  },
  {
    id: "senior-posture-revival",
    title: "Senior Posture Revival",
    subtitle: "Stand Tall, Feel Strong Again",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Revive posture for confidence and vitality. Thorough assessment with targeted moves to re-align spinal posture, expand lung volume, reduce neck/shoulder fatigue, and age gracefully with biomechanical ease.",
    highlights: [
      "Thorough postural & spinal alignment assessment",
      "Breath-focused chest opening & core activation",
      "Reduce neck, back & shoulder compression",
      "Stand tall with renewed poise and stability",
    ],
    bestFor: "Forward head carriage, rounded shoulders, and stooped posture.",
  },
  {
    id: "pwr-parkinsons-power-up",
    title: "PWR! Parkinson’s Power Up",
    subtitle: "Balance & Symptom Mastery",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Energize with certified PWR!UP moves for strength, balance, and neuroplasticity. Core session focuses on symptom management, bradykinesia modulation, and motor agility; follow-ups track progress and solidify functional gains.",
    highlights: [
      "Certified PWR!Moves® high-amplitude neuro-motor drills",
      "Rigidity reduction & bradykinesia modulation",
      "Targeted vestibular & dynamic gait re-education",
      "Backed by Parkinson's exercise neurology",
    ],
    bestFor: "Individuals diagnosed with Parkinson's disease seeking active symptom mastery.",
    badge: "PWR! Certified",
  },
  {
    id: "communication-clarity",
    title: "Communication Clarity",
    subtitle: "Swallow & Voice Safeguard",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 30-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Safeguard vocal projection, speech clarity, and swallowing reflexes for Parkinson's or neuro-diverse challenges. Sessions preserve critical neurological functions, prevent speech fade, and protect airway safety.",
    highlights: [
      "Voice amplitude & breath-stream coordination",
      "Swallow preservation & laryngeal elevation drills",
      "Neurologically grounded functional speech pacing",
      "Maintain conversational confidence and safety",
    ],
    bestFor: "Parkinson's voice softening, speech fade, and swallowing hesitation.",
  },
  {
    id: "empower-your-journey",
    title: "Empower Your Journey",
    subtitle: "Integrative Cancer Care Companion",
    pillar: "health",
    pillarLabel: "Health Advisory",
    duration: "1-Hr Foundation + 4 @ 45-Min Follow-ups",
    originalPrice: "$350",
    specialPrice: "$297",
    amountCents: 29700,
    stripeCheckoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    summary:
      "Navigate cancer with supportive integrative strategies alongside conventional medical treatments. Focuses on nutrition, stress reduction, symptom management, energy restoration, and immune-supporting practices backed by oncology research.",
    highlights: [
      "Integrative oncology-supportive nutrition",
      "Autonomic stress reduction & immune support",
      "Fatigue management & side-effect mitigation",
      "Compassionate, evidence-based companionship",
    ],
    bestFor: "Cancer patients and survivors seeking holistic support alongside medical care.",
    badge: "Integrative Oncology Support",
  },
];
