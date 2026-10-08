import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const DECISIONS = [
  {
    title: 'Situation-based navigation',
    userNeed: 'A distressed person may not know what to search for or which resource applies to them.',
    decision: 'Organize the homepage around four recognizable situations rather than categories or topics.',
    reason: 'Meeting users where they are emotionally reduces cognitive load when they are overwhelmed.',
    evidence: 'The live homepage presents four entry points: "I need help now," "I\'m afraid to tell someone," "I told someone, but still need help," and "I\'m worried about a child."',
    validation: 'Current implementation visible on the live site. Usability testing with target users would further confirm whether these labels resonate.',
  },
  {
    title: 'Plain-language question framing',
    userNeed: 'Young people may have specific fears about what happens if they ask for help.',
    decision: 'Use common questions as content headings rather than requiring users to formulate their own.',
    reason: 'Naming the fear directly is more accessible than asking someone in distress to search for answers.',
    evidence: 'The "Before I Tell" page uses a Q&A structure with questions like "Can I ask questions without giving my name?" and "Will someone tell my parent?"',
    validation: 'Content visible on the live site. Reading-level scoring and comprehension testing with young users would further validate accessibility.',
  },
  {
    title: 'Distinguishing support from reporting',
    userNeed: 'Users may confuse talking to a counselor with making a formal report, which have different privacy implications.',
    decision: 'Explicitly differentiate browsing, speaking with a support service, and making a formal report.',
    reason: 'This distinction has real privacy and safety consequences for users deciding whether to share details.',
    evidence: 'The "Before I Tell" and "Worried About a Child" pages both present structured comparisons of these three actions and their privacy implications.',
    validation: 'Content visible on the live site. The site itself notes that content has not received independent professional review; legal accuracy review is identified as future work.',
  },
  {
    title: 'Honest communication about platform limitations',
    userNeed: 'Users in crisis need to know what the platform can and cannot do to make safe decisions.',
    decision: 'Place clear disclaimers about what the site does not do throughout, rather than in a single footer.',
    reason: 'Overstating capabilities could lead someone to rely on the site for emergency response it cannot provide.',
    evidence: 'The homepage and key pages state "Choosing any button on this site does not dispatch help or file a report." A browsing history notice appears across pages. Contact verification dates are shown.',
    validation: 'Consistent disclaimers visible across live pages. Ongoing review should verify that disclaimers remain accurate as the site evolves.',
  },
];

function DecisionCard({ decision, index }) {
  return (
    <div
      style={{
        background: P.surface,
        border: `1px solid ${P.rule}`,
        borderRadius: '6px',
        padding: '1.5rem 1.75rem',
      }}
    >
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: '0.64rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: P.muted,
          margin: '0 0 0.5rem',
        }}
      >
        Decision 0{index + 1}
      </p>
      <h3
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: '1.2rem',
          color: P.ink,
          margin: '0 0 1.25rem',
          letterSpacing: '-0.01em',
        }}
      >
        {decision.title}
      </h3>
      <div className="flex flex-col gap-3">
        {[
          { label: 'User need', value: decision.userNeed },
          { label: 'Decision', value: decision.decision },
          { label: 'Reason', value: decision.reason },
          { label: 'Evidence', value: decision.evidence },
          { label: 'Validation status', value: decision.validation },
        ].map((row) => (
          <div key={row.label}>
            <p
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: P.accent,
                margin: '0 0 0.3rem',
              }}
            >
              {row.label}
            </p>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: P.secondary,
                margin: 0,
              }}
            >
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LukesLightDecisions() {
  return (
    <section
      id="decisions"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
        borderTop: `1px solid ${P.rule}`,
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Design & content"
          heading="Key design and content decisions"
          intro="Each decision follows a consistent structure: user need, decision, reason, evidence, and current validation status."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {DECISIONS.map((d, i) => (
            <DecisionCard key={i} decision={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}