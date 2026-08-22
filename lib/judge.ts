import type { Decision, Signal } from './types';

export function judgeSignal(signal: Signal): Decision {
  const highConsequence = signal.humanConsequence >= 80 || signal.humanJudgment >= 85;
  const highRisk = signal.risk >= 75;
  const lowConfidence = signal.confidence < 60;
  const safeToAutomate =
    signal.risk < 30 &&
    signal.confidence >= 90 &&
    signal.reversibility >= 80 &&
    signal.humanConsequence < 30 &&
    signal.humanJudgment < 35;

  if (highConsequence || highRisk || lowConfidence) {
    const reasons = [
      highConsequence ? 'human consequence or judgment threshold exceeded' : null,
      highRisk ? 'risk threshold exceeded' : null,
      lowConfidence ? 'model confidence below authority threshold' : null,
    ].filter(Boolean);

    return {
      signalId: signal.id,
      mode: 'ESCALATE',
      reason: reasons.join('; '),
      policy: 'HFAF-A3',
      requiresHuman: true,
    };
  }

  if (safeToAutomate) {
    return {
      signalId: signal.id,
      mode: 'AUTOMATE',
      reason: 'bounded, reversible, high-confidence, low-consequence action',
      policy: 'HFAF-A1',
      requiresHuman: false,
    };
  }

  if (signal.value >= 80 || signal.humanJudgment >= 60 || signal.risk >= 45) {
    return {
      signalId: signal.id,
      mode: 'AUGMENT',
      reason: 'AI may prepare context and recommendation; human retains decision authority',
      policy: 'HFAF-A2',
      requiresHuman: true,
    };
  }

  return {
    signalId: signal.id,
    mode: 'QUEUE',
    reason: 'preserve context and defer until urgency, capacity, or priority changes',
    policy: 'HFAF-A4',
    requiresHuman: false,
  };
}
