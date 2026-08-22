import type { AuthorityMode } from './types';

export type OutcomeStatus = 'PENDING' | 'VERIFIED' | 'FAILED' | 'REOPENED';

export type OutcomeEvent = {
  signalId: string;
  mode: AuthorityMode;
  action: string;
  expectedOutcome: string;
  observedOutcome?: string;
  status: OutcomeStatus;
  dueAt?: string;
  verifiedAt?: string;
};

export function evaluateOutcome(event: OutcomeEvent): OutcomeEvent {
  if (event.status === 'VERIFIED' || event.status === 'FAILED') return event;

  if (event.dueAt && Date.now() > new Date(event.dueAt).getTime() && !event.observedOutcome) {
    return { ...event, status: 'REOPENED' };
  }

  if (event.observedOutcome && event.observedOutcome === event.expectedOutcome) {
    return { ...event, status: 'VERIFIED', verifiedAt: new Date().toISOString() };
  }

  return event;
}
