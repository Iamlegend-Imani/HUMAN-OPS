export type AuthorityMode = 'AUTOMATE' | 'AUGMENT' | 'ESCALATE' | 'QUEUE';

export type SignalSource =
  | 'email'
  | 'crm'
  | 'form'
  | 'voice'
  | 'slack'
  | 'calendar'
  | 'webhook'
  | 'internal';

export type Signal = {
  id: string;
  source: SignalSource;
  summary: string;
  intent: string;
  urgency: number;
  value: number;
  risk: number;
  confidence: number;
  reversibility: number;
  humanConsequence: number;
  humanJudgment: number;
  createdAt: string;
};

export type Decision = {
  signalId: string;
  mode: AuthorityMode;
  reason: string;
  policy: string;
  requiresHuman: boolean;
};
