'use client';

import { useMemo, useState } from 'react';
import { demoSignals } from '@/lib/demo-data';
import { judgeSignal } from '@/lib/judge';
import type { AuthorityMode, Signal } from '@/lib/types';

type Tab = 'pulse'|'thesis'|'signals'|'attention'|'system'|'layers'|'research';
type BrainKey = 'listener'|'judge'|'operator'|'capacity'|'watcher';

const modeLabel: Record<AuthorityMode,string> = { AUTOMATE:'AUTOMATE', AUGMENT:'AUGMENT', ESCALATE:'ESCALATE', QUEUE:'QUEUE' };

const brainData: Record<BrainKey,{n:string;title:string;verb:string;text:string;input:string;output:string}> = {
  listener:{n:'01',title:'The Listener',verb:'UNDERSTAND',text:'Receives messy operational signals and turns them into structured intent, urgency, entities, sentiment, deadlines, missing context, and confidence.',input:'Message · call · CRM event · form · workflow event',output:'Structured operational signal'},
  judge:{n:'02',title:'The Judge',verb:'BOUND AUTHORITY',text:'Separates intelligence from authority. It evaluates value, risk, confidence, reversibility, human consequence, and required judgment before deciding what AI may do.',input:'Structured signal + policy',output:'Automate · Augment · Escalate · Queue'},
  operator:{n:'03',title:'The Operator',verb:'ACT',text:'Executes only what the Judge has authorized: updating systems, drafting communication, scheduling, routing, or triggering workflows while logging the action.',input:'Authorized action',output:'Execution + audit event'},
  capacity:{n:'04',title:'The Capacity Brain',verb:'ROUTE HUMAN ATTENTION',text:'When a human is needed, it asks who has the right expertise, relationship, context, urgency window, and actual capacity instead of simply assigning the next person.',input:'Human-required work',output:'Right human · right context · right time'},
  watcher:{n:'05',title:'The Watcher',verb:'VERIFY',text:'Closes the loop. It checks whether the intended outcome happened, detects stalls and exceptions, and reopens work when “automation completed” did not mean “problem solved.”',input:'Action + expected outcome',output:'Verified outcome · exception · reopen'},
};

const genericLayers = [
  {name:'Revenue + customer systems',examples:'CRM · lead forms · support queues · billing',role:'Generate signals about prospects, customers, revenue, service, risk, and operational exceptions.'},
  {name:'Communication channels',examples:'Mailbox · calls · chat · team messages',role:'Carry messy human language into the organization and receive authorized responses or handoffs.'},
  {name:'Workflow + execution tools',examples:'Automation engine · calendar · tasks · documents',role:'Execute actions after HUMAN//OPS determines the authority mode and permitted next step.'},
  {name:'Human teams',examples:'Sales · success · operations · legal · leadership',role:'Receive only the work that requires human judgment, approval, context, accountability, or exception handling.'},
];

const attentionContext: Record<string,{why:string;need:string}> = {
  'sig-002':{why:'A valuable existing relationship is at risk after repeated service failure. An automatic save attempt could worsen trust.',need:'A human should review account history, recovery options, ownership, and the relationship context before responding.'},
  'sig-004':{why:'The request is commercially valuable but falls outside standard pricing authority.',need:'AI can prepare the account context and options; a human owns the exception decision.'},
  'sig-005':{why:'The issue is not simply workload. Reassigning work can affect continuity, relationship ownership, and team capacity.',need:'A human should decide whether to rebalance work, change priority, or protect the existing owner relationship.'},
  'sig-006':{why:'The request touches customer-level data and an agreement boundary. Consequence and privacy risk are high.',need:'A named human should review contractual scope, risk, and whether access is appropriate.'},
  'sig-007':{why:'A safety-sensitive question has consequences that should not be delegated to an autonomous system.',need:'Automation stops. AI may summarize context, but a qualified human makes the determination.'},
  'sig-008':{why:'The model is uncertain and its recommendation conflicts with prior human context.',need:'A human should reconcile the contradiction before any downstream action is allowed.'},
};

export default function Home(){
  const [signals,setSignals] = useState<Signal[]>(demoSignals);
  const [active,setActive] = useState<Tab>('pulse');
  const [selectedBrain,setSelectedBrain] = useState<BrainKey>('judge');
  const [selectedSignal,setSelectedSignal] = useState<string|null>(null);
  const [pulseKey,setPulseKey] = useState(0);

  const decisions = useMemo(()=>signals.map(signal=>({signal,decision:judgeSignal(signal)})),[signals]);
  const humanRequired = decisions.filter(x=>x.decision.requiresHuman);
  const automated = decisions.filter(x=>x.decision.mode==='AUTOMATE').length;

  function simulate(){
    const n=signals.length+1;
    const examples:Signal[]=[
      {id:`sig-${n}`,source:'webhook',summary:'Routine receipt request arrives from a customer',intent:'support',urgency:24,value:22,risk:7,confidence:98,reversibility:99,humanConsequence:7,humanJudgment:8,createdAt:new Date().toISOString()},
      {id:`sig-${n}`,source:'email',summary:'Strategic customer asks for an exception outside normal policy',intent:'exception',urgency:76,value:92,risk:61,confidence:84,reversibility:44,humanConsequence:72,humanJudgment:82,createdAt:new Date().toISOString()},
      {id:`sig-${n}`,source:'voice',summary:'Customer threatens cancellation after repeated service failure',intent:'churn_risk',urgency:96,value:97,risk:95,confidence:94,reversibility:20,humanConsequence:96,humanJudgment:98,createdAt:new Date().toISOString()},
    ];
    setSignals(current=>[examples[Math.floor(Math.random()*examples.length)],...current]);
    setPulseKey(k=>k+1);
  }

  return <main className="shell">
    <aside className="rail">
      <button className="brandButton" onClick={()=>setActive('pulse')}><div className="brand">HUMAN<span>//</span>OPS</div><div className="micro">HUMAN FIRST · AI FORWARD</div></button>
      <nav>{[
        ['pulse','Pulse'],['thesis','Thesis / About'],['signals','Signal Inbox'],['attention','Human Attention'],['system','Nervous System'],['layers','System Layers'],['research','Research']
      ].map(([id,label])=><button key={id} onClick={()=>setActive(id as Tab)} className={active===id?'active':''}>{label}</button>)}</nav>
      <div className="alive"><i/>System alive<span>Interactive research prototype</span></div>
    </aside>

    <section className="stage">
      {active==='pulse'&&<>
        <header className="hero">
          <div><div className="eyebrow">HUMAN//OPS · live prototype pulse</div><h1>AI handles the volume.<br/>Humans keep the judgment.</h1><p>Signals enter the system. HUMAN//OPS interprets them, applies an authority boundary, routes the work, and verifies what happens next.</p></div>
          <button className="primary" onClick={simulate}>Simulate a signal</button>
        </header>
        <div className="pulseStrip" key={pulseKey}>
          <div className="pulseLabel"><span>LIVE SYSTEM PULSE</span><strong>{signals.length} signals currently in view</strong></div>
          <svg viewBox="0 0 900 120" role="img" aria-label="Animated system pulse line"><polyline className="pulseBase" points="0,62 150,62 185,62 205,28 225,92 250,48 270,62 410,62 445,62 465,40 485,80 505,62 650,62 685,62 705,22 730,100 755,50 775,62 900,62"/><polyline className="pulseLive" points="0,62 150,62 185,62 205,28 225,92 250,48 270,62 410,62 445,62 465,40 485,80 505,62 650,62 685,62 705,22 730,100 755,50 775,62 900,62"/></svg>
          <div className="pulseLegend"><span>signal enters</span><b>→</b><span>authority decided</span><b>→</b><span>action / handoff</span><b>→</b><span>outcome watched</span></div>
        </div>
        <Explainer title="What am I looking at?" text="This is not yet a production control center. It is the interactive demonstration surface for HUMAN//OPS: a place to see the model behave before real business systems are connected."/>
        <div className="kpis"><Metric label="Signals in view" value={signals.length}/><Metric label="AI may execute" value={automated}/><Metric label="Human attention" value={humanRequired.length}/><Metric label="Authority modes" value={4}/></div>
        <div className="split">
          <Panel title="Human Attention" subtitle="These are not random tasks. They are situations where the system has deliberately retained human authority."><div className="stack">{humanRequired.slice(0,4).map(({signal,decision})=><button className="signalCard interactive" key={signal.id} onClick={()=>{setSelectedSignal(signal.id);setActive('attention')}}><div><strong>{signal.summary}</strong><p>{attentionContext[signal.id]?.why||decision.reason}</p></div><span className={`mode ${decision.mode.toLowerCase()}`}>{decision.mode}</span></button>)}</div></Panel>
          <Panel title="The central question" subtitle="HUMAN//OPS separates what technology can do from what it should be allowed to decide."><div className="question">Can AI do this?<span>Capability.</span></div><div className="question accent">Should AI do this?<span>Authority: value · risk · confidence · reversibility · consequence.</span></div><button className="textAction" onClick={()=>setActive('thesis')}>Read the thesis →</button></Panel>
        </div>
      </>}

      {active==='thesis'&&<>
        <PageHead eyebrow="Thesis / About" title="What HUMAN//OPS actually is." text="A human-governed AI operations layer designed to increase machine capacity without quietly transferring consequential human agency to machines."/>
        <div className="thesisGrid">
          <article className="thesisLead"><span>THE PROBLEM</span><h2>Organizations are adding AI everywhere. Very few are making authority explicit.</h2><p>AI can read, classify, recommend, draft, route, schedule, and act. But capability alone does not answer who should decide, who remains accountable, when automation should stop, or whether the intended outcome actually happened.</p></article>
          <article><span>THE PRODUCT</span><h3>HUMAN//OPS sits between signal and action.</h3><p>It understands what happened, applies a policy boundary, selects one of four authority modes, routes the next step, and closes the loop through verification.</p></article>
          <article><span>THE FOUR MODES</span><div className="modeStack"><b className="automate">AUTOMATE</b><b className="augment">AUGMENT</b><b className="escalate">ESCALATE</b><b className="queue">QUEUE</b></div><p>Automation is not binary. Each event receives a different level of machine authority.</p></article>
          <article><span>WHAT THIS SITE IS TODAY</span><h3>An interactive research prototype.</h3><p>The current site simulates signals, policy decisions, human-attention cases, system anatomy, and operating layers so the idea can be explored and tested visibly.</p></article>
          <article><span>WHAT THE FULL SYSTEM BECOMES</span><h3>A live operational layer.</h3><p>Real signals arrive from connected business systems. HUMAN//OPS classifies them, applies policy, authorizes workflows, routes consequential work to humans, records decisions, and verifies outcomes.</p></article>
        </div>
      </>}

      {active==='signals'&&<>
        <PageHead eyebrow="01 · Signal Inbox" title="Noise becomes structured work." text="Every incoming event becomes an inspectable signal before the system grants any authority to act." action={simulate}/>
        <Explainer title="What can I do here?" text="Inject a sample event and click any row. HUMAN//OPS will reveal why that event was routed to Automate, Augment, Escalate, or Queue."/>
        <div className="tableWrap"><table><thead><tr><th>Signal</th><th>Intent</th><th>Value</th><th>Risk</th><th>Confidence</th><th>Judgment</th><th>Authority</th></tr></thead><tbody>{decisions.map(({signal,decision})=><tr key={signal.id} className={selectedSignal===signal.id?'selectedRow':''} onClick={()=>setSelectedSignal(selectedSignal===signal.id?null:signal.id)}><td>{signal.summary}{selectedSignal===signal.id?<div className="rowReveal"><b>{decision.policy}</b>{decision.reason}<br/><span>Reversibility {signal.reversibility} · Human consequence {signal.humanConsequence}</span></div>:null}</td><td>{signal.intent}</td><td>{signal.value}</td><td>{signal.risk}</td><td>{signal.confidence}</td><td>{signal.humanJudgment}</td><td><span className={`mode ${decision.mode.toLowerCase()}`}>{modeLabel[decision.mode]}</span></td></tr>)}</tbody></table></div>
      </>}

      {active==='attention'&&<>
        <PageHead eyebrow="02 · Human Attention" title="Six situations the machine should not quietly own." text="This is a protected decision surface. Each case explains what happened, why automation stopped or slowed, and what the human is actually being asked to decide."/>
        <div className="attentionGrid">{humanRequired.slice(0,6).map(({signal,decision},index)=>{const ctx=attentionContext[signal.id];return <article className={`attentionCase ${selectedSignal===signal.id?'focusCard':''}`} key={signal.id} onClick={()=>setSelectedSignal(signal.id)}><div className="caseTop"><i>{String(index+1).padStart(2,'0')}</i><span className={`mode ${decision.mode.toLowerCase()}`}>{decision.mode}</span></div><h2>{signal.summary}</h2><div className="caseSection"><span>WHAT IS THE ISSUE?</span><p>{ctx?.why||decision.reason}</p></div><div className="caseSection"><span>WHAT DOES THE HUMAN DO?</span><p>{ctx?.need||'Review the prepared context and retain the final decision.'}</p></div><div className="scoreRow"><span>Risk {signal.risk}</span><span>Confidence {signal.confidence}</span><span>Judgment {signal.humanJudgment}</span></div></article>})}</div>
      </>}

      {active==='system'&&<>
        <PageHead eyebrow="03 · Nervous System" title="Five brains inside one operational brain." text="The large brain represents HUMAN//OPS as one nervous system. Click each region to see its specialized role in the same living loop."/>
        <div className="nervousLayout">
          <div className="brainVisual">
            <svg className="brainSvg" viewBox="0 0 820 560" role="img" aria-label="Interactive brain-shaped HUMAN//OPS nervous system">
              <path className="brainSilhouette" d="M403 77C337 27 237 45 203 111c-68-7-122 47-112 111-51 38-54 118-5 160 7 75 79 117 142 91 39 50 115 58 169 23 49 36 128 31 169-22 65 25 137-20 140-91 51-43 48-124-5-160 11-67-47-122-117-111-38-66-135-83-181-35Z"/>
              <path className="brainDivide" d="M405 82c-22 84-10 160 2 231 11 68 8 121-8 179"/>
              <path className="brainFold" d="M185 172c62-50 129-15 146 37M146 286c59-41 124-23 153 30M201 394c54-30 110-15 143 29M625 174c-61-49-128-13-145 38M668 286c-57-40-122-21-151 31M616 395c-55-31-111-13-143 30"/>
              <g className={selectedBrain==='listener'?'region selected':''} onClick={()=>setSelectedBrain('listener')}><ellipse cx="270" cy="177" rx="86" ry="63"/><text x="270" y="171">01</text><text x="270" y="193">LISTENER</text></g>
              <g className={selectedBrain==='judge'?'region selected':''} onClick={()=>setSelectedBrain('judge')}><ellipse cx="410" cy="268" rx="90" ry="70"/><text x="410" y="260">02</text><text x="410" y="284">JUDGE</text></g>
              <g className={selectedBrain==='operator'?'region selected':''} onClick={()=>setSelectedBrain('operator')}><ellipse cx="553" cy="178" rx="86" ry="63"/><text x="553" y="171">03</text><text x="553" y="193">OPERATOR</text></g>
              <g className={selectedBrain==='capacity'?'region selected':''} onClick={()=>setSelectedBrain('capacity')}><ellipse cx="278" cy="379" rx="88" ry="66"/><text x="278" y="371">04</text><text x="278" y="395">CAPACITY</text></g>
              <g className={selectedBrain==='watcher'?'region selected':''} onClick={()=>setSelectedBrain('watcher')}><ellipse cx="545" cy="379" rx="88" ry="66"/><text x="545" y="371">05</text><text x="545" y="395">WATCHER</text></g>
              <text className="brainBrand" x="410" y="518">HUMAN//OPS · OPERATIONAL NERVOUS SYSTEM</text>
            </svg>
            <div className="systemFlow"><span>signal</span><b>→</b><span>understand</span><b>→</b><span>decide</span><b>→</b><span>act / hand off</span><b>→</b><span>verify</span></div>
          </div>
          <BrainDetail brain={brainData[selectedBrain]}/>
        </div>
      </>}

      {active==='layers'&&<>
        <PageHead eyebrow="04 · System Layers" title="HUMAN//OPS is the authority layer in the middle." text="The point is not to advertise other products. The point is to show where HUMAN//OPS sits in a modern operating stack."/>
        <div className="layerDiagram">
          <div className="layer external"><span>01 · SIGNAL + EXECUTION SURFACES</span><strong>Customer systems · communication channels · workflow tools · internal operations</strong><em>They sense what happened or carry out an authorized action.</em></div>
          <div className="down">↓ operational signals</div>
          <div className="layer humanops"><span>02 · HUMAN//OPS — THE GOVERNING LAYER</span><strong>Understand → Assess → Assign authority → Route → Verify</strong><em>Capability does not automatically equal permission.</em></div>
          <div className="authorityModes"><b className="automate">AUTOMATE</b><b className="augment">AUGMENT</b><b className="escalate">ESCALATE</b><b className="queue">QUEUE</b></div>
          <div className="down">↓ authorized machine action &nbsp;&nbsp; / &nbsp;&nbsp; protected human decision</div>
          <div className="layer humans"><span>03 · OUTCOME LAYER</span><strong>Systems execute · humans decide · Watcher verifies</strong><em>Work closes only when the intended outcome is actually confirmed.</em></div>
        </div>
        <div className="integrationGrid">{genericLayers.map(item=><article key={item.name}><div><span>{item.examples}</span><h2>{item.name}</h2></div><p>{item.role}</p></article>)}</div>
      </>}

      {active==='research'&&<>
        <PageHead eyebrow="05 · Research → System" title="HUMAN//OPS is the thing we are building." text="It did not appear out of nowhere. It is one applied system born from a chain of inquiry about what humans should remain responsible for as technology becomes more capable."/>
        <div className="researchStory"><div className="storyIntro"><span>THE LINEAGE</span><h2>Start with the human.<br/>Then introduce the machine.<br/>Then build the operating system.</h2><p>B.E. HUMAN(E) establishes the human standard. Human First, AI Forward asks how that standard survives and evolves alongside intelligent technology. HUMAN//OPS turns those principles into executable organizational behavior. Alive Systems Lab is where the idea becomes an experiment, prototype, and eventually evidence.</p></div><div className="lineageFlow"><a href="https://humane-excellence.vercel.app/" target="_blank" rel="noreferrer"><i>01</i><span>B.E. HUMAN(E) / HUMANE EXCELLENCE</span><strong>What does excellence require if humanity remains part of the standard?</strong><em>Excellence without humanity is not excellence.</em></a><b>+</b><a href="https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/" target="_blank" rel="noreferrer"><i>02</i><span>HUMAN FIRST, AI FORWARD</span><strong>What changes when increasingly capable AI enters that human system?</strong><em>Increase human capacity without decreasing human agency.</em></a><b>=</b><div className="lineageProduct"><i>03</i><span>HUMAN//OPS</span><strong>What does that principle look like inside an operating organization?</strong><em>Delegate execution. Never delegate agency.</em><button onClick={()=>setActive('system')}>Explore the system →</button></div></div><a className="labOrigin" href="https://alive-systems-lab.vercel.app/" target="_blank" rel="noreferrer"><span>BORN IN ALIVE SYSTEMS LAB</span><strong>Ideas → research → experiments → prototypes → working systems</strong><em>The Lab is where the philosophy gets tested.</em></a></div>
      </>}
    </section>
  </main>;
}

function Metric({label,value}:{label:string;value:number}){return <div className="metric"><span>{label}</span><strong>{value}</strong></div>}
function Panel({title,subtitle,children}:{title:string;subtitle:string;children:React.ReactNode}){return <section className="panel"><h3>{title}</h3><p className="sub">{subtitle}</p>{children}</section>}
function PageHead({eyebrow,title,text,action}:{eyebrow:string;title:string;text:string;action?:()=>void}){return <header className="pageHead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>{action?<button className="primary" onClick={action}>Inject signal</button>:null}</header>}
function Explainer({title,text}:{title:string;text:string}){return <div className="explainer"><span>{title}</span><p>{text}</p></div>}
function BrainDetail({brain}:{brain:{n:string;title:string;verb:string;text:string;input:string;output:string}}){return <aside className="brainDetail"><div className="eyebrow">BRAIN {brain.n} · {brain.verb}</div><h2>{brain.title}</h2><p>{brain.text}</p><div className="io"><div><span>RECEIVES</span><strong>{brain.input}</strong></div><b>→</b><div><span>PRODUCES</span><strong>{brain.output}</strong></div></div></aside>}
