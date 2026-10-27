import React from "react";

export function SchemaJsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "MedicalBusiness", "ProfessionalService"],
        "@id": "https://libertyscience.com/#organization",
        "name": "Liberty Science Coaching",
        "alternateName": [
          "Liberty Science",
          "Liberty Science LLC",
          "Vera Shury Coaching",
          "Metabolic Neuroplasticity™ System Tucson",
          "Parkinson'strength"
        ],
        "url": "https://libertyscience.com",
        "logo": "https://libertyscience.com/logo.png",
        "image": "https://libertyscience.com/curated-hero.jpg",
        "telephone": "+1-520-275-8755",
        "email": "vera@libertysciencecoaching.com",
        "priceRange": "$$$",
        "taxID": "71400000X",
        "description":
          "Liberty Science Coaching is a premier life, business, and health advisory in Tucson, Arizona, founded by Vera Shury, MS. Specializing in the Metabolic Neuroplasticity™ System, HeartMath HRV coherence, PWR!Moves for Parkinson's, and executive longevity coaching so business owners, caregivers, and active adults stay capable of running what they built. No stagnancy.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12995 N Oracle Rd #141-135",
          "addressLocality": "Tucson",
          "addressRegion": "AZ",
          "postalCode": "85737",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 32.4173,
          "longitude": -110.9634
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Tucson",
            "sameAs": "https://en.wikipedia.org/wiki/Tucson,_Arizona"
          },
          {
            "@type": "City",
            "name": "Oro Valley",
            "sameAs": "https://en.wikipedia.org/wiki/Oro_Valley,_Arizona"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Southern Arizona"
          },
          {
            "@type": "Country",
            "name": "Worldwide Virtual"
          }
        ],
        "founder": {
          "@type": "Person",
          "@id": "https://libertyscience.com/#founder",
          "name": "Vera Shury, MS",
          "jobTitle": "Chief Clinician, Health Coach & Neuro-Functional Longevity Advisor",
          "gender": "Female",
          "worksFor": {
            "@id": "https://libertyscience.com/#organization"
          },
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "ACE Licensed Health Coach #W54776"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "HeartMath Certified Practitioner"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "PWR!Moves Certified Parkinson's Specialist"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "Senior Fitness & Weight Management Specialist"
            }
          ],
          "knowsAbout": [
            "Metabolic Neuroplasticity™",
            "Adult Hippocampal Neurogenesis",
            "HeartMath HRV Coherence",
            "PWR!Moves for Parkinson's Disease",
            "Neuromuscular Re-Education",
            "Cyclic Metabolic Switching Diet Plans",
            "Fall Prevention and Vestibular Balance",
            "Executive Leadership Longevity"
          ]
        },
        "medicalSpecialty": [
          "PreventiveMedicine",
          "PhysicalTherapy",
          "DietNutrition",
          "Cardiovascular"
        ],
        "availableService": [
          {
            "@type": "MedicalTherapy",
            "name": "Metabolic Neuroplasticity™ System Coaching",
            "description": "Pairing HeartMath coherence, brain-body neuromuscular recruitment, and cyclic metabolic switching fuel so the brain-body loop keeps hiring."
          },
          {
            "@type": "MedicalTherapy",
            "name": "Parkinson'strength™ & PWR!Moves",
            "description": "High-amplitude neuro-motor exercise, gait modulation, and vestibular balance training for Parkinson's and movement disorders."
          },
          {
            "@type": "MedicalTherapy",
            "name": "HeartMath® HRV Coherence Coaching",
            "description": "Autonomic nervous system calibration to restore vagal brake control, quiet sympathetic overdrive, and sharpen executive focus."
          },
          {
            "@type": "MedicalTherapy",
            "name": "Life & Business Advisory for Owners",
            "description": "Energy management, decision clarity, and sustainable enterprise balance so leaders stay able to run what they built without physical stagnancy."
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://libertyscience.com/#website",
        "url": "https://libertyscience.com",
        "name": "Liberty Science Coaching",
        "publisher": {
          "@id": "https://libertyscience.com/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "FAQPage",
        "@id": "https://libertyscience.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Metabolic Neuroplasticity™ coaching in Tucson?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Metabolic Neuroplasticity™ is an evidence-based clinical modality created by Vera Shury, MS at Liberty Science Coaching in Tucson, Arizona. It pairs targeted metabolic nutrition (cyclic 12–14 hour fasting and ketone switching), high-amplitude neuromuscular movement (PWR!Moves and Strength4Balance), and regulated emotional attention (HeartMath HRV coherence) to activate Brain-Derived Neurotrophic Factor (BDNF) and adult hippocampal neurogenesis."
            }
          },
          {
            "@type": "Question",
            "name": "How does HeartMath coherence improve neuroplasticity and decision-making?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "HeartMath coherence uses 0.10 Hz heart-rate variability (HRV) biofeedback to calm the autonomic nervous system and restore vagal brake tone. Chronic fight-or-flight sympathetic stress biochemically blocks neurogenesis. Establishing coherence first relieves the stress load, enabling prefrontal executive clarity and allowing newly stimulated brain cells to wire permanently."
            }
          },
          {
            "@type": "Question",
            "name": "What is Parkinson'strength™ and PWR!Moves in Tucson, Arizona?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Parkinson'strength™ is a proprietary neuromuscular protocol developed by Vera Shury, integrating certified PWR!Moves (Parkinson Wellness Recovery) to combat rigidity, bradykinesia, gait freezing, and fall risks. Training is available on-site at the Tucson clinic and virtually worldwide."
            }
          },
          {
            "@type": "Question",
            "name": "How does Liberty Science Coaching help business owners and caregivers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Liberty Science Coaching provides a comprehensive life-business-health advisory. Designed for business owners, entrepreneurs, and caregivers, the protocol prevents physical and cognitive stagnancy, ensuring leaders maintain the executive decision clarity, emotional regulation, and biological stamina needed to stay able to run what they built."
            }
          },
          {
            "@type": "Question",
            "name": "Is Liberty Science Coaching eligible for healthcare tax deductions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Liberty Science Coaching operates under Healthcare Taxonomy Code 71400000X (Specialized Clinical Exercise & Health Coaching), which qualifies many client programs for medical tax deductibility or health reimbursement (HSA/FSA)."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
