// src/data/cases.js
export const simulationCases = [
  {
    id: 1,
    title: "The Missing Mobile Phone",
    category: "theft",
    level: 1,
    difficulty: "Beginner",
    
    facts: "Ramesh claims Suresh stole his mobile phone. Suresh says the phone was given to him as a gift. There are no witnesses. The phone was found in Suresh's possession.",
    
    evidence: [
      "Phone found with Suresh",
      "Ramesh filed FIR immediately",
      "Suresh claims it was a gift",
      "No gift receipt or message proof",
      "No CCTV or witnesses"
    ],
    
    questions: [
      {
        id: 1,
        text: "Based on possession alone, what would you decide?",
        options: [
          { 
            id: "A", 
            text: "Convict Suresh - He has the stolen property", 
            reasoning: "Possession of stolen goods suggests guilt",
            scores: { legal: 5, justice: 3, reasoning: 4, bias: 2 }
          },
          { 
            id: "B", 
            text: "Acquit Suresh - Innocent until proven guilty", 
            reasoning: "Mere possession doesn't prove theft",
            scores: { legal: 8, justice: 9, reasoning: 8, bias: 9 }
          },
          { 
            id: "C", 
            text: "Ask for more evidence - Need proper investigation", 
            reasoning: "Insufficient evidence to decide",
            scores: { legal: 9, justice: 8, reasoning: 9, bias: 8 }
          }
        ],
        correctOption: "C",
        explanation: "A judge should ask for more evidence. Mere possession doesn't prove theft. The prosecution must prove dishonest intention."
      }
    ],
    
    legalPrinciples: [
      "Section 411 IPC: Dishonestly receiving stolen property",
      "Burden of proof is on prosecution",
      "Innocent until proven guilty",
      "Possession alone ≠ guilt"
    ],
    
    learningPoints: [
      "Presumption of innocence is fundamental",
      "Mere possession doesn't prove theft",
      "Judge must ensure fair investigation"
    ]
  },
  
  {
    id: 2,
    title: "The Broken Promise",
    category: "contract",
    level: 1,
    difficulty: "Beginner",
    
    facts: "Mohan promised to sell his old scooter to Sohan for ₹10,000. Sohan paid ₹2,000 advance. Mohan sold it to someone else for ₹12,000. Sohan wants either the scooter or compensation.",
    
    evidence: [
      "WhatsApp chat showing promise",
      "Bank receipt of ₹2,000 advance",
      "Mohan admitted to selling to third party",
      "No written contract signed"
    ],
    
    questions: [
      {
        id: 1,
        text: "How would you resolve this dispute?",
        options: [
          { 
            id: "A", 
            text: "Order Mohan to return scooter to Sohan", 
            reasoning: "Promise was made first",
            scores: { legal: 3, justice: 4, reasoning: 3, bias: 2 }
          },
          { 
            id: "B", 
            text: "Order Mohan to refund advance + pay damages", 
            reasoning: "Breach of promise requires compensation",
            scores: { legal: 9, justice: 8, reasoning: 9, bias: 9 }
          },
          { 
            id: "C", 
            text: "Dismiss case - No proper contract", 
            reasoning: "Informal promise not legally binding",
            scores: { legal: 6, justice: 3, reasoning: 5, bias: 4 }
          }
        ],
        correctOption: "B",
        explanation: "This is breach of contract. Mohan must refund advance and pay damages. The WhatsApp chat + payment creates a binding agreement."
      }
    ],
    
    legalPrinciples: [
      "Section 73 Indian Contract Act: Compensation for breach",
      "Advance payment creates obligation",
      "Electronic evidence is admissible"
    ],
    
    learningPoints: [
      "Promises with consideration create contracts",
      "Advance payments create legal obligations",
      "Digital evidence is valid in court"
    ]
  },
  
  {
    id: 3,
    title: "The Noisy Neighbor",
    category: "nuisance",
    level: 2,
    difficulty: "Intermediate",
    
    facts: "Mr. Sharma plays loud music every night till 2 AM. Mrs. Gupta, his 70-year-old neighbor, has heart problems and cannot sleep. Police warned Sharma twice. He continues.",
    
    evidence: [
      "Medical certificate of Mrs. Gupta",
      "Police complaints (2 times)",
      "Audio recordings of noise",
      "Neighbors' written statements"
    ],
    
    questions: [
      {
        id: 1,
        text: "What action should a judge take?",
        options: [
          { 
            id: "A", 
            text: "Fine Sharma and order strict silence after 10 PM", 
            reasoning: "Right to peaceful living is fundamental",
            scores: { legal: 9, justice: 9, reasoning: 9, bias: 9 }
          },
          { 
            id: "B", 
            text: "Ask them to compromise - limited hours", 
            reasoning: "Balance both parties' rights",
            scores: { legal: 7, justice: 6, reasoning: 7, bias: 8 }
          },
          { 
            id: "C", 
            text: "Dismiss - Not serious enough for court", 
            reasoning: "Neighbor disputes should resolve informally",
            scores: { legal: 3, justice: 2, reasoning: 3, bias: 2 }
          }
        ],
        correctOption: "A",
        explanation: "Right to peaceful living is fundamental. Repeated violations despite warnings need strict orders. Elderly health concerns make this urgent."
      }
    ],
    
    legalPrinciples: [
      "Section 268 IPC: Public nuisance",
      "Right to Life includes right to sleep",
      "Repeated offense needs strict action"
    ],
    
    learningPoints: [
      "Right to peaceful living is fundamental right",
      "Health concerns get priority",
      "Repeated violations need stronger action"
    ]
  }
];

export const categories = [
  { id: "theft", name: "Theft & Property", icon: "🔒" },
  { id: "contract", name: "Contracts", icon: "📝" },
  { id: "nuisance", name: "Public Nuisance", icon: "🏡" },
  { id: "family", name: "Family Matters", icon: "👨‍👩‍👧‍👦" },
  { id: "employment", name: "Employment", icon: "💼" }
];

export const difficultyLevels = [
  { level: 1, name: "Civil Judge (Junior Division)", casesNeeded: 1 },
  { level: 2, name: "Additional District Judge", casesNeeded: 3 },
  { level: 3, name: "District Judge", casesNeeded: 5 },
  { level: 4, name: "High Court Judge", casesNeeded: 10 }
];