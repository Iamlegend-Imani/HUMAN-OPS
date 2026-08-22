import type { Signal } from './types';

export const demoSignals: Signal[] = [
  { id:'sig-001', source:'form', summary:'Enterprise prospect asks for a demo this week', intent:'buy', urgency:88, value:94, risk:12, confidence:96, reversibility:92, humanConsequence:18, humanJudgment:22, createdAt:'2026-08-22T08:41:00-04:00' },
  { id:'sig-002', source:'email', summary:'Existing client says they are considering cancelling', intent:'churn_risk', urgency:96, value:98, risk:94, confidence:91, reversibility:23, humanConsequence:94, humanJudgment:97, createdAt:'2026-08-22T08:47:00-04:00' },
  { id:'sig-003', source:'crm', summary:'Customer asks for last month’s invoice', intent:'support', urgency:34, value:30, risk:8, confidence:99, reversibility:98, humanConsequence:8, humanJudgment:10, createdAt:'2026-08-22T08:52:00-04:00' },
  { id:'sig-004', source:'voice', summary:'High-value lead requests a custom pricing exception', intent:'negotiate', urgency:84, value:96, risk:61, confidence:87, reversibility:56, humanConsequence:64, humanJudgment:86, createdAt:'2026-08-22T08:58:00-04:00' },
  { id:'sig-005', source:'internal', summary:'Team member has crossed 93% assigned capacity', intent:'capacity', urgency:58, value:72, risk:52, confidence:95, reversibility:81, humanConsequence:55, humanJudgment:65, createdAt:'2026-08-22T09:03:00-04:00' },
];
