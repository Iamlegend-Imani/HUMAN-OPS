'use client';

import { useMemo, useState } from 'react';
import { demoSignals } from '@/lib/demo-data';
import { judgeSignal } from '@/lib/judge';
import type { AuthorityMode, Signal } from '@/lib/types';

type Tab = 'pulse'|'signals'|'attention'|'system'|'integrations'|'research';

type BrainKey = 'listener'|'judge'|'operator'|'capacity'|'watcher';

const modeLabel: Record<AuthorityMode, string> = {
  AUTOMATE: 'AUTOMATE', AUGMENT: 'AUGMENT', ESCALATE: 'ESCALATE', QUEUE: 'QUEUE',
};

const brainData: Record<BrainKey,{n:string;title:string;verb:string;text:string;input:string;output:string}> = {
  listener:{n:'01',title:'The Listener',verb:'UNDERSTAND',text:'Receives messy operational signals from humans and systems, then turns them into structured intent, urgency, entities, sentiment, deadlines, missing context, and confidence.',input:'Email · voice · CRM · form · Slack · event',output:'Structured operational signal'},
  judge:{n:'02',title:'The Judge',verb:'BOUND AUTHORITY',text:'Separates intelligence from authority. It evaluates value, risk, confidence, reversibility, human consequence, and required judgment before deciding what AI may do.',input:'Structured signal + policy',output:'Automate · Augment · Escalate · Queue'},
  operator:{n:'03',title:'The Operator',verb:'ACT',text:'Executes only what the Judge has authorized. It can call workflows, update systems, draft communication, schedule, route, and log every action taken.',input:'Authorized action',output:'Execution + audit event'},
  capacity:{n:'04',title:'The Capacity Brain',verb:'ROUTE HUMAN ATTENTION',text:'When a human is needed, this brain asks who has the right expertise, relationship, context, urgency window, and actual capacity — not merely who is next in line.',input:'Human-required work',output:'Right human · right context · right time'},
  watcher:{n:'05',title:'The Watcher',verb:'VERIFY',text:'Closes the loop. It checks whether the intended outcome happened, detects stalls and exceptions, and reopens work when “automation completed” did not mean “problem solved.”',input:'Action + expected outcome',output:'Verified outcome · exception · reopen'},
};

const integrations = [
  {name:'Aletto',kind:'Revenue system',role:'Aletto can acquire, nurture, qualify, and book. HUMAN//OPS can sit above or beside those flows to decide when the machine keeps running and when unusual value, risk, or consequence requires a human.'},
  {name:'TalkwAI',kind:'Voice agent',role:'TalkwAI can conduct the conversation. HUMAN//OPS can interpret what the conversation means operationally, assign authority, prepare context, and decide whether the voice agent continues, hands off, or stops.'},
  {name:'LineSquire',kind:'Personal AI delegate',role:'LineSquire can act within delegated permission. HUMAN//OPS provides a compatible organizational authority model: bounded delegation, explicit stop conditions, human approval, and verified outcomes.'},
  {name:'Make.com',kind:'Execution engine',role:'Make is not the governing brain. HUMAN//OPS decides the authority mode; Make executes the authorized branch across connected tools and reports what happened back to the Watcher.'},
  {name:'CRM / Slack / Gmail / Calendar',kind:'Operational surfaces',role:'These systems generate signals and receive actions. HUMAN//OPS can become the layer that decides what should move automatically, what needs preparation, and what deserves human attention.'},
];

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>(demoSignals);
  const [active, setActive] = useState<Tab>('pulse');
  const [selectedBrain, setSelectedBrain] = useState<BrainKey>('judge');
  const [selectedSignal, setSelectedSignal] = useState<string|null>(null);
  const decisions = useMemo(() => signals.map(signal => ({ signal, decision: judgeSignal(signal) })), [signals]);
  const humanRequired = decisions.filter(x => x.decision.requiresHuman);
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
      <button className="brandButton" onClick={()=>setActive('pulse')}><div className="brand">HUMAN<span>//</span>OPS</div><div className="micro">HUMAN FIRST · AI FORWARD</div></button>
      <nav>{[
        ['pulse','Pulse'],['signals','Signal Inbox'],['attention','Human Attention'],['system','Nervous System'],['integrations','Integrations'],['research','Research']
      ].map(([id,label]) => <button key={id} onClick={()=>setActive(id as Tab)} className={active===id?'active':''}>{label}</button>)}</nav>
      <div className="alive"><i/>System alive<span>Prototype runtime</span></div>
    </aside>

    <section className="stage">
      {active==='pulse' && <>
        <header className="hero">
          <div><div className="eyebrow">HUMAN//OPS · operational nervous system</div><h1>AI handles the volume.<br/>Humans keep the judgment.</h1><p>HUMAN//OPS is a human-governed AI operations orchestration layer. Signals enter. The system understands them, decides what authority AI may exercise, acts within that boundary, routes the rest to humans, and verifies the outcome.</p></div>
          <button className="primary" onClick={simulate}>Simulate a signal</button>
        </header>
        <Explainer title="What is happening here?" text="This is the live pulse of the system. The numbers change as operational signals move through HUMAN//OPS. The goal is not maximum automation; it is maximum useful machine capacity with explicit human authority where consequence requires it." />
        <div className="kpis"><Metric label="Signals in system" value={signals.length}/><Metric label="AI may execute" value={automated}/><Metric label="Human attention" value={humanRequired.length}/><Metric label="Authority modes" value={4}/></div>
        <div className="split">
          <Panel title="Human Attention" subtitle="The machine has already done the triage. These are the things it refuses to decide for you.">
            <div className="stack">{humanRequired.slice(0,4).map(({signal,decision}) => <button className="signalCard interactive" key={signal.id} onClick={()=>{setSelectedSignal(signal.id);setActive('attention')}}><div><strong>{signal.summary}</strong><p>{decision.reason}</p></div><span className={`mode ${decision.mode.toLowerCase()}`}>{decision.mode}</span></button>)}</div>
          </Panel>
          <Panel title="Authority Engine" subtitle="The core distinction inside HUMAN//OPS.">
            <div className="question">Can AI do this?<span>Capability question.</span></div><div className="question accent">Should AI do this?<span>Authority question: value · risk · confidence · reversibility · consequence.</span></div>
            <button className="textAction" onClick={()=>setActive('system')}>Open the nervous system →</button>
          </Panel>
        </div>
      </>}

      {active==='signals' && <>
        <PageHead eyebrow="01 · Signal Inbox" title="Noise becomes structured work." text="This is the intake surface. HUMAN//OPS turns messy events into inspectable operational signals, then passes them to the Judge before anything acts." action={simulate}/>
        <Explainer title="What can I do here?" text="Inject a sample signal, inspect how it was scored, and click any row to see why HUMAN//OPS routed it the way it did. Later, these signals will arrive from real systems such as email, voice agents, CRMs, forms, Slack, calendars, and webhooks." />
        <div className="tableWrap"><table><thead><tr><th>Signal</th><th>Intent</th><th>Value</th><th>Risk</th><th>Confidence</th><th>Judgment</th><th>Authority</th></tr></thead><tbody>{decisions.map(({signal,decision})=><tr key={signal.id} className={selectedSignal===signal.id?'selectedRow':''} onClick={()=>setSelectedSignal(selectedSignal===signal.id?null:signal.id)}><td>{signal.summary}{selectedSignal===signal.id?<div className="rowReveal"><b>{decision.policy}</b>{decision.reason}<br/><span>Reversibility {signal.reversibility} · Human consequence {signal.humanConsequence}</span></div>:null}</td><td>{signal.intent}</td><td>{signal.value}</td><td>{signal.risk}</td><td>{signal.confidence}</td><td>{signal.humanJudgment}</td><td><span className={`mode ${decision.mode.toLowerCase()}`}>{modeLabel[decision.mode]}</span></td></tr>)}</tbody></table></div>
      </>}

      {active==='attention' && <>
        <PageHead eyebrow="02 · Human Attention" title="This is where automation deliberately stops." text="Human Attention is not a task inbox. It is a protected decision surface for work whose risk, ambiguity, consequence, value, or required judgment exceeds machine authority."/>
        <Explainer title="Why this exists" text="Most automation systems optimize for how much work they can remove from humans. HUMAN//OPS optimizes for what deserves human cognition. AI should arrive here with the context already assembled, not dump the original mess back on a person." />
        <div className="cards">{humanRequired.map(({signal,decision})=><article className={`decisionCard ${selectedSignal===signal.id?'focusCard':''}`} key={signal.id} onClick={()=>setSelectedSignal(signal.id)}><div className="eyebrow">{decision.policy} · {decision.mode}</div><h2>{signal.summary}</h2><p>{decision.reason}</p><div className="scoreRow"><span>Value {signal.value}</span><span>Risk {signal.risk}</span><span>Confidence {signal.confidence}</span><span>Judgment {signal.humanJudgment}</span><span>Reversibility {signal.reversibility}</span></div><div className="humanAction">Human authority retained → Review · approve · override · decide</div></article>)}</div>
      </>}

      {active==='system' && <>
        <PageHead eyebrow="03 · Nervous System" title="Five brains. One living operational system." text="Click a brain region. Each part has one job, but the intelligence comes from the loop between them."/>
        <div className="nervousLayout">
          <div className="brainCanvas" aria-label="Interactive HUMAN//OPS nervous system">
            <div className="brainGlow"/>
            <div className="brainOutline">
              <button className={`brainNode listener ${selectedBrain==='listener'?'selected':''}`} onClick={()=>setSelectedBrain('listener')}><span>01</span>Listener</button>
              <button className={`brainNode judge ${selectedBrain==='judge'?'selected':''}`} onClick={()=>setSelectedBrain('judge')}><span>02</span>Judge</button>
              <button className={`brainNode operator ${selectedBrain==='operator'?'selected':''}`} onClick={()=>setSelectedBrain('operator')}><span>03</span>Operator</button>
              <button className={`brainNode capacity ${selectedBrain==='capacity'?'selected':''}`} onClick={()=>setSelectedBrain('capacity')}><span>04</span>Capacity</button>
              <button className={`brainNode watcher ${selectedBrain==='watcher'?'selected':''}`} onClick={()=>setSelectedBrain('watcher')}><span>05</span>Watcher</button>
              <div className="synapse s1"/><div className="synapse s2"/><div className="synapse s3"/><div className="synapse s4"/>
              <div className="brainCore"><small>HUMAN//OPS</small><strong>Operational<br/>Nervous System</strong><em>Agency boundary</em></div>
            </div>
            <div className="systemFlow"><span>signal</span><b>→</b><span>understand</span><b>→</b><span>decide</span><b>→</b><span>act / hand off</span><b>→</b><span>verify</span></div>
          </div>
          <BrainDetail brain={brainData[selectedBrain]} />
        </div>
      </>}

      {active==='integrations' && <>
        <PageHead eyebrow="04 · Layering + Integrations" title="HUMAN//OPS does not need to replace your stack." text="It can sit across agents, workflow tools, revenue systems, communication channels, and human teams as an authority and orchestration layer."/>
        <div className="layerDiagram">
          <div className="layer external"><span>SYSTEMS THAT SENSE + ACT</span><strong>Aletto · TalkwAI · LineSquire · CRM · Gmail · Slack · Calendar · Make</strong></div>
          <div className="down">↓ signals &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↑ authorized actions / outcomes</div>
          <div className="layer humanops"><span>HUMAN//OPS</span><strong>Understand → Bound authority → Route → Verify</strong><em>AI handles the volume. Humans keep the judgment.</em></div>
          <div className="down">↓ only when human authority is required</div>
          <div className="layer humans"><span>HUMAN ATTENTION</span><strong>Review · Approve · Override · Decide · Remain accountable</strong></div>
        </div>
        <div className="integrationGrid">{integrations.map(item=><article key={item.name}><div><span>{item.kind}</span><h2>{item.name}</h2></div><p>{item.role}</p></article>)}</div>
      </>}

      {active==='research' && <>
        <PageHead eyebrow="05 · Research → System" title="HUMAN//OPS is the thing we are building." text="It did not appear out of nowhere. It is one applied system born from a chain of inquiry about what humans should remain responsible for as technology becomes more capable."/>
        <div className="researchStory">
          <div className="storyIntro"><span>THE LINEAGE</span><h2>Start with the human.<br/>Then introduce the machine.<br/>Then build the operating system.</h2><p>B.E. HUMAN(E) establishes the human standard. Human First, AI Forward asks how that standard survives and evolves alongside intelligent technology. HUMAN//OPS turns those principles into executable organizational behavior. Alive Systems Lab is where the idea becomes an experiment, prototype, and eventually evidence.</p></div>
          <div className="lineageFlow">
            <a href="https://humane-excellence.vercel.app/" target="_blank" rel="noreferrer"><i>01</i><span>B.E. HUMAN(E) / HUMANE EXCELLENCE</span><strong>What does excellence require if humanity remains part of the standard?</strong><em>Excellence without humanity is not excellence.</em></a>
            <b>+</b>
            <a href="https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/" target="_blank" rel="noreferrer"><i>02</i><span>HUMAN FIRST, AI FORWARD</span><strong>What changes when increasingly capable AI enters that human system?</strong><em>Increase human capacity without decreasing human agency.</em></a>
            <b>=</b>
            <div className="lineageProduct"><i>03</i><span>HUMAN//OPS</span><strong>What does that principle look like inside an operating organization?</strong><em>Delegate execution. Never delegate agency.</em><button onClick={()=>setActive('system')}>Explore the system →</button></div>
          </div>
          <a className="labOrigin" href="https://alive-systems-lab.vercel.app/" target="_blank" rel="noreferrer"><span>BORN IN ALIVE SYSTEMS LAB</span><strong>Ideas → research → experiments → prototypes → working systems</strong><em>The Lab is not another layer of philosophy. It is where the philosophy gets tested.</em></a>
        </div>
      </>}
    </section>
  </main>;
}

function Metric({label,value}:{label:string;value:number}){return <div className="metric"><span>{label}</span><strong>{value}</strong></div>}
function Panel({title,subtitle,children}:{title:string;subtitle:string;children:React.ReactNode}){return <section className="panel"><h3>{title}</h3><p className="sub">{subtitle}</p>{children}</section>}
function PageHead({eyebrow,title,text,action}:{eyebrow:string;title:string;text:string;action?:()=>void}){return <header className="pageHead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>{action?<button className="primary" onClick={action}>Inject signal</button>:null}</header>}
function Explainer({title,text}:{title:string;text:string}){return <div className="explainer"><span>{title}</span><p>{text}</p></div>}
function BrainDetail({brain}:{brain:{n:string;title:string;verb:string;text:string;input:string;output:string}}){return <aside className="brainDetail"><div className="eyebrow">BRAIN {brain.n} · {brain.verb}</div><h2>{brain.title}</h2><p>{brain.text}</p><div className="io"><div><span>RECEIVES</span><strong>{brain.input}</strong></div><b>→</b><div><span>PRODUCES</span><strong>{brain.output}</strong></div></div></aside>}
