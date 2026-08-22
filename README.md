# HUMAN//OPS

**AI handles the volume. Humans keep the judgment.**

> **Governing principle:** Delegate execution. Never delegate agency.

HUMAN//OPS is a **human-governed AI operations orchestration system**: an applied experiment in how organizations can use AI to expand operational capacity without surrendering consequential human judgment.

It was born inside [Alive Systems Lab](https://alive-systems-lab.vercel.app/) from two connected bodies of work:

- **Philosophical lineage — [Humane Excellence / B.E. HUMAN(E)](https://humane-excellence.vercel.app/)**  
  *Excellence without humanity is not excellence.* Humane Excellence establishes the human standard: capability, performance, and progress are not sufficient if the system makes the human less human in the process.
- **Parent research — [Human First, AI Forward](https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/)**  
  HFAF narrows that question to intelligent technology: how can AI increase human capacity without decreasing human agency, discernment, authorship, accountability, or responsibility?
- **Incubator — [Alive Systems Lab](https://alive-systems-lab.vercel.app/)**  
  The Lab is where ideas and research become experiments, prototypes, systems, and products.

HUMAN//OPS is one such experiment.

## The research question

**What would an AI-enabled organization look like if automation were designed to expand human capacity without surrendering human agency?**

HUMAN//OPS tests one answer: do not treat automation as an all-or-nothing decision. Give every operational signal an explicit authority boundary.

```text
Can AI do this?
      ↓
Wrong first question.
      ↓
Should AI do this?
      ↓
Assess value · risk · confidence · reversibility · human consequence
      ↓
AUTOMATE · AUGMENT · ESCALATE · QUEUE
      ↓
Act within bounded authority
      ↓
Verify the outcome
      ↓
The human remains accountable for consequential judgment
```

## Intellectual lineage

```text
B.E. HUMAN(E) / HUMANE EXCELLENCE
              ↓
        HUMAN STANDARD
"Excellence without humanity is not excellence."
              ↓
     HUMAN FIRST, AI FORWARD
              ↓
       HUMAN–AI FRAMEWORK
"Increase human capacity without decreasing human agency."
              ↓
          HUMAN//OPS
              ↓
HUMAN-GOVERNED AI OPERATIONS
```

HUMAN//OPS can be understood as an applied **HFAF implementation for work and organizations**. It translates a research framework about agency into operational architecture that can be tested with real events, policies, agents, workflows, and humans.

## What HUMAN//OPS is

HUMAN//OPS is not another chatbot and it is not a replacement for CRM, voice agents, sales automation, or workflow tools.

It is a **decision and orchestration layer** that can sit across those systems and answer:

1. What happened?
2. What does it mean?
3. How consequential is it?
4. What authority may AI exercise here?
5. Does a human need to decide, approve, or override?
6. Who is the right human given expertise, context, relationship, and capacity?
7. Did the intended outcome actually occur?

## The five brains

### 1. The Listener
Receives operational signals from email, CRM, forms, voice systems, Slack, calendars, webhooks, meeting notes, support queues, and other sources. It converts messy inputs into structured intent and context.

### 2. The Judge
Evaluates **value, urgency, risk, confidence, reversibility, and human consequence** against explicit policy. It routes each signal to one of four authority modes:

- **AUTOMATE** — AI may execute bounded, reversible, high-confidence work.
- **AUGMENT** — AI prepares context, synthesis, or a recommended action; a human decides or approves.
- **ESCALATE** — the consequence, ambiguity, risk, or required judgment exceeds AI authority.
- **QUEUE** — action is preserved with context but deliberately deferred or rebalanced.

### 3. The Operator
Executes authorized actions through connected systems such as CRM, email, calendar, task tools, databases, and workflow engines. Every action is logged.

### 4. The Capacity Brain
Routes human work intelligently rather than blindly. It can account for expertise, relationship, current load, urgency, and contextual continuity before assigning an owner.

### 5. The Watcher
Closes the loop. It asks whether the intended outcome actually happened: Was the customer answered? Did the prospect book? Did the human review? Did an SLA drift? Did an automation fail? Was the AI overridden? The system is not finished when an action fires; it is finished when the outcome is verified.

## Why the `//`

The product name is **HUMAN//OPS**.

The `//` marks an interface and an authority boundary: **human // operations**, and more broadly **human // AI // operations**. The product lives at that boundary, deciding what machines may execute and where human agency must remain explicit.

The GitHub repository is named `HUMAN-OPS` because repository names are identifiers; the product brand remains **HUMAN//OPS**.

## Architecture

```text
                         HUMAN//OPS
                 decision + orchestration
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
   INPUT SYSTEMS       POLICY + AI          HUMAN TEAM
       │                    │                    │
 CRM · Email             Listener              Review
 Voice · Forms            Judge                Approve
 Slack · Events          Operator              Override
       │               Capacity Brain           Decide
       └───────────────── Watcher ───────────────┘
                            │
                    EXECUTION SYSTEMS
                            │
           Make · APIs · CRM · Calendar · Slack
```

### Product stack

| Layer | Initial implementation |
|---|---|
| Product interface | Next.js + TypeScript |
| Hosting | Vercel |
| Source control | GitHub |
| Operational model | Typed event + decision schema |
| Policy engine | Deterministic HUMAN//OPS Judge |
| AI classification | OpenAI structured outputs (next phase) |
| Persistence | Supabase/Postgres (next phase) |
| Workflow execution | Make.com + direct APIs (next phase) |
| Integrations | Webhooks, CRM, email, Slack, calendar |
| Verification | Watcher event/outcome loop |

## Current prototype

The first build proves the core interaction model:

- a live **System Pulse**
- a structured **Signal Inbox**
- an explicit **Human Attention** queue
- inspectable routing decisions
- a deterministic Judge policy engine
- a system map linking Listener → Judge → Operator → Capacity Brain → Watcher
- a research/provenance layer tying implementation back to HFAF and Humane Excellence

No performance metrics in this repository should be treated as validated until they are produced by an actual instrumented simulation or production workflow.

## Build roadmap

### Phase 1 — Product shell ✅
Build the interactive product surface and establish the research lineage.

### Phase 2 — Operational data model ✅ initial schema
Represent signals, authority decisions, owners, outcomes, and audit context as typed records.

### Phase 3 — The Judge ✅ initial deterministic engine
Implement transparent routing policies before delegating routing authority to an LLM.

### Phase 4 — AI Listener
Use structured AI output to classify unstructured incoming signals while keeping authority policy separate from model inference.

### Phase 5 — Persistence
Store signals, decisions, overrides, actions, and verified outcomes in a database so the full operational audit trail survives sessions.

### Phase 6 — Make.com execution
Connect HUMAN//OPS to a visual workflow engine. Make is an execution surface, not the governing brain: HUMAN//OPS decides the authority mode; Make executes authorized branches and reports outcomes back.

### Phase 7 — The Watcher
Build SLA, failure, response, booking, override, and outcome verification loops.

### Phase 8 — Simulation / Revenue Operations scenario
Inject large volumes of synthetic operational events, including ambiguous and high-consequence cases. Measure routing, latency, failures, human escalation rate, override rate, and workflow recovery without fabricating results.

### Phase 9 — External system demonstrations
Demonstrate how HUMAN//OPS can orchestrate across systems such as revenue automation, voice agents, CRM, support tooling, and internal operations without becoming dependent on any one vendor.

## Research → system → evidence

The project is intentionally structured so that its claims can be tested rather than merely asserted.

**Research** defines the human/AI question.  
**Policy** defines authority boundaries.  
**The product** makes those boundaries executable.  
**Simulation and integrations** produce evidence.  
**The Watcher** verifies whether execution created the intended outcome.

That is the experiment.

## Related work

- [Human First, AI Forward](https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/)
- [The Human Remains](https://iamlegend-imani.github.io/HFAF-Human-First-AI-Forward/essay-the-human-remains.html)
- [Humane Excellence / B.E. HUMAN(E)](https://humane-excellence.vercel.app/)
- [Humane Excellence — Technology + AI](https://humane-excellence.vercel.app/applications/technology-ai.html)
- [Alive Systems Lab](https://alive-systems-lab.vercel.app/)

## Status

**Research prototype / active build.** HUMAN//OPS is being developed in Alive Systems Lab as an applied experiment in human-centered AI operations. It is not represented here as production-ready infrastructure.
