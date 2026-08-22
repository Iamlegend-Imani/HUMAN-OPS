'use client';

import { useMemo, useState } from 'react';
import { demoSignals } from '@/lib/demo-data';
import { judgeSignal } from '@/lib/judge';
import type { AuthorityMode, Signal } from '@/lib/types';

const modeLabel: Record<AuthorityMode, string> = {
  AUTOMATE: 'AUTOMATE',
  AUGMENT: 'AUGMENT',
  ESCALATE: 'ESCALATE',
  QUEUE: 'QUEUE',
};

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>(demoSignals);
  const [active, setActive] = useState<'pulse'|'signals'|'attention'|'system'|'research'>('pulse');
  const decisions = useMemo(() => signals.map(signal => ({ signal, decision: judgeSignal(signal) })), [signals]);
  const escalations = decisions.filter(x => x.decision.requiresHuman);
  const automated = decisions.filter(x => x.decision.mode === 'AUTOMATE').length;

  function simulate() {
    const n = signals.length + 1;
    const examples: Signal[] = [
      { id:`sig-${n}`, source:'webhook', summary:'Routine billing receipt requested', intent:'support', urgency:25, value:20, risk:8, confidence:98, reversibility:98, humanConsequence:8, humanJudgment:8, createdAt:new Date().toISOString() },
      { id:`sig-${n}`, source:'email', summary:'Strategic account asks for an exception to standard terms', intent:'negotiate', urgency:74, value:91, risk:58, confidence:82, reversibility:45, humanConsequence:71, humanJudgment:79, createdAt:new Date().toISOString() },
      { id:`sig-${n}`, source:'voice', summary:'Client threatens cancellation after repeated service failure', intent:'churn_risk', urgency:96, value:97, risk:95, confidence:94, reversibility:20, humanConsequence:96, humanJudgment:98, createdAt:new Date().toISOString() },
    ];
    setSignals(current => [examples[Math.floor(Math.random()*examples.length)], ...current]);
  }

  return <main className="shell">
    <aside className="rail">
      <div><div className="brand">HUMAN<span>//</span>OPS</div><div className="micro">HUMAN FIRST · AI FORWARD</div></div>
      <nav>{[
        ['pulse','Pulse'],['signals','Signal Inbox'],['attention','Human Attention'],['system','System Map'],['research','Research']
      ].map(([id,label]) => <button key={id} onClick={()=>setActive(id as typeof active)} className={active===id?'active':''}>{label}</button>)}</nav>
      <div className="alive"><i/>System alive</div>
    </aside>

    <section className="stage">
      {active==='pulse' && <>
        <header className="hero">
          <div><div className="eyebrow">Operational nervous system</div><h1>AI handles the volume.<br/>Humans keep the judgment.</h1><p>HUMAN//OPS is a human-governed AI operations orchestration layer. It decides what AI may execute, what AI should prepare, and where human authority must remain explicit.</p></div>
          <button className="primary" onClick={simulate}>Simulate signal</button>
        </header>
        <div className="kpis">
          <Metric label="Signals" value={signals.length}/>
          <Metric label="Automated" value={automated}/>
          <Metric label="Human attention" value={escalations.length}/>
          <Metric label="Authority policies" value={4}/>
        </div>
        <div className="split">
          <Panel title="Human Attention" subtitle="Only the things machines should not decide for you.">
            <div className="stack">{escalations.slice(0,4).map(({signal,decision}) => <article className="signalCard" key={signal.id}><div><strong>{signal.summary}</strong><p>{decision.reason}</p></div><span className={`mode ${decision.mode.toLowerCase()}`}>{decision.mode}</span></article>)}</div>
          </Panel>
          <Panel title="Authority Engine" subtitle="The Judge keeps AI inference separate from decision rights.">
            <div className="question">Can AI do this?<span>Wrong first question.</span></div><div className="question accent">Should AI do this?<span>Value · risk · confidence · reversibility · human consequence</span></div>
          </Panel>
        </div>
      </>}

      {active==='signals' && <>
        <PageHead eyebrow="Signal Inbox" title="Noise becomes structured work." text="Every signal receives an inspectable authority decision before execution." action={simulate}/>
        <div className="tableWrap"><table><thead><tr><th>Signal</th><th>Intent</th><th>Value</th><th>Risk</th><th>Confidence</th><th>Human judgment</th><th>Decision</th></tr></thead><tbody>{decisions.map(({signal,decision})=><tr key={signal.id}><td>{signal.summary}</td><td>{signal.intent}</td><td>{signal.value}</td><td>{signal.risk}</td><td>{signal.confidence}</td><td>{signal.humanJudgment}</td><td><span className={`mode ${decision.mode.toLowerCase()}`}>{modeLabel[decision.mode]}</span></td></tr>)}</tbody></table></div>
      </>}

      {active==='attention' && <>
        <PageHead eyebrow="Human Attention" title="AI prepares. Humans remain accountable." text="When consequence, ambiguity, risk, or required judgment exceeds policy, automation stops and context moves to a named human."/>
        <div className="cards">{escalations.map(({signal,decision})=><article className="decisionCard" key={signal.id}><div className="eyebrow">{decision.policy} · {decision.mode}</div><h2>{signal.summary}</h2><p>{decision.reason}</p><div className="scoreRow"><span>Value {signal.value}</span><span>Risk {signal.risk}</span><span>Judgment {signal.humanJudgment}</span><span>Reversibility {signal.reversibility}</span></div></article>)}</div>
      </>}

      {active==='system' && <>
        <PageHead eyebrow="System Map" title="Five brains. One nervous system." text="Intelligence is separated from authority so the system can move fast without pretending every decision should be autonomous."/>
        <div className="brains">{[
          ['01 · Intake','The Listener','Turns messy operational inputs into structured intent and context.'],
          ['02 · Judgment','The Judge','Applies transparent authority policy: automate, augment, escalate, or queue.'],
          ['03 · Execution','The Operator','Executes only actions permitted by the current authority mode and logs what happened.'],
          ['04 · Human system','The Capacity Brain','Routes work using expertise, relationship, urgency, context, and human capacity.'],
          ['05 · Verification','The Watcher','Checks whether the intended outcome actually happened and reopens unresolved loops.'],
        ].map(([tag,title,text])=><article className="brain" key={title}><div className="eyebrow">{tag}</div><h2>{title}</h2><p>{text}</p></article>)}</div>
      </>}

      {active==='research' && <>
        <PageHead eyebrow="Research → System" title="This did not begin as an automation product." text="HUMAN//OPS is an applied experiment born from a longer inquiry into humane excellence, human agency, and AI-enabled systems."/>
        <div className="lineage">
          <a href="https://humane-excellence.vercel.app/" target="_blank" rel="noreferrer"><span>B.E. HUMAN(E)</span><strong>What does excellence require if humanity remains part of the standard?</strong><em>Excellence without humanity is not excellence.</em></a>
          <b>↓</b>
          <a href="https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/" target="_blank" rel="noreferrer"><span>HUMAN FIRST, AI FORWARD</span><strong>How can AI increase capacity without decreasing human agency?</strong><em>Delegate execution. Never delegate agency.</em></a>
          <b>↓</b>
          <div className="lineageProduct"><span>HUMAN//OPS</span><strong>What does that principle look like inside an operating organization?</strong><em>A human-governed AI operations orchestration system.</em></div>
          <b>↓</b>
          <a href="https://alive-systems-lab.vercel.app/" target="_blank" rel="noreferrer"><span>ALIVE SYSTEMS LAB</span><strong>Where the research becomes an experiment, prototype, and working system.</strong><em>Ideas → experiments → systems.</em></a>
        </div>
      </>}
    </section>
  </main>;
}

function Metric({label,value}:{label:string;value:number}){return <div className="metric"><span>{label}</span><strong>{value}</strong></div>}
function Panel({title,subtitle,children}:{title:string;subtitle:string;children:React.ReactNode}){return <section className="panel"><h3>{title}</h3><p className="sub">{subtitle}</p>{children}</section>}
function PageHead({eyebrow,title,text,action}:{eyebrow:string;title:string;text:string;action?:()=>void}){return <header className="pageHead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>{action?<button className="primary" onClick={action}>Inject signal</button>:null}</header>}
