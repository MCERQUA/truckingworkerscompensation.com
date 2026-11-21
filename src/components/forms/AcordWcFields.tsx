"use client";

import { useState } from "react";
import {
  CLASS_ROWS,
  CONTACTS,
  COVERAGE_OPTIONS,
  COVERAGE_OTHER,
  EL_FIELDS,
  EL_LIMITS,
  ENTITY_TYPES,
  EXPERIENCE,
  EXPLANATION_MAX,
  IDENTIFICATION,
  LOCATION,
  MAILING,
  POLICY_DATES,
  PRIOR_ROWS,
  UW_QUESTIONS,
  WORK_FROM_HOME_COUNT,
  WORK_STATES,
  classFields,
  explanationName,
  priorFields,
  type TextDef,
} from "./acord-wc-spec";

// ACORD 130 intake additions for /quote. Every control is a real named, UNCONTROLLED input (or a
// controlled radio) so the page's FormData(form) picks it up; collapsed <details> keep their inputs
// in the DOM, so nothing is lost when a section is closed. All fields here are OPTIONAL.
// See acord-wc-spec.ts for the rules.

interface Classes {
  inputClass: string;
  labelClass: string;
  mutedTextClass?: string;
  borderClass?: string;
}

const Group = ({ title, note, children, borderClass = "border-adobe" }: { title: string; note?: string; children: React.ReactNode; borderClass?: string }) => (
  <details className={`rounded-xl border ${borderClass} px-4 py-3`}>
    <summary className="cursor-pointer min-h-[44px] flex items-center font-heading font-bold text-sm uppercase tracking-wider">
      {title} <span className="ml-2 text-xs font-normal normal-case opacity-70">(optional)</span>
    </summary>
    {note && <p className="text-xs opacity-70 mt-1">{note}</p>}
    <div className="space-y-4 pt-4">{children}</div>
  </details>
);

export function AcordWcFields({ inputClass, labelClass, mutedTextClass = "text-mocha", borderClass = "border-adobe" }: Classes) {
  const [ans, setAns] = useState<Record<string, string>>({});
  const [entity, setEntity] = useState("");
  const setYN = (name: string, value: string) => setAns((p) => ({ ...p, [name]: value }));

  const text = (d: TextDef, key?: string) => (
    <div key={key ?? d.name}>
      <label htmlFor={`acord-${d.name}`} className={labelClass}>{d.label}</label>
      <input
        id={`acord-${d.name}`}
        name={d.name}
        type={d.type ?? "text"}
        inputMode={d.inputMode}
        placeholder={d.placeholder}
        maxLength={d.max}
        autoComplete="off"
        className={inputClass}
      />
    </div>
  );

  const radioWrap = `inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border ${borderClass} px-4 py-2 text-sm font-semibold`;
  const yesNo = (name: string, label: string, gated = true) => (
    <fieldset key={name} className="space-y-2">
      <legend className={labelClass}>{label}</legend>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={label}>
        {["Yes", "No"].map((o) => (
          <label key={o} className={radioWrap}>
            <input type="radio" name={name} value={o} checked={ans[name] === o} onChange={() => setYN(name, o)} className="h-5 w-5 accent-current" />
            {o}
          </label>
        ))}
      </div>
      {gated && ans[name] === "Yes" && (
        <div>
          <label htmlFor={`acord-${explanationName(name)}`} className={labelClass}>Please explain (short answer)</label>
          <textarea
            id={`acord-${explanationName(name)}`}
            name={explanationName(name)}
            rows={2}
            maxLength={EXPLANATION_MAX}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}
    </fieldset>
  );

  const grid = (children: React.ReactNode) => <div className="grid sm:grid-cols-2 gap-4">{children}</div>;

  return (
    <div className="space-y-4 pt-5 border-t border-adobe">
      <div>
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider">More for your application</h3>
        <p className="text-xs opacity-70 mt-0.5">
          Everything in these sections is optional. The more you fill in, the fewer follow-up questions we need. Never enter a Social Security Number, driver license number or policy number anywhere on this form.
        </p>
      </div>

      <Group title="Business identification" borderClass={borderClass}>
        {text(IDENTIFICATION[0])}
        <div>
          <label htmlFor="acord-entityType" className={labelClass}>Legal entity type</label>
          <select id="acord-entityType" name="entityType" value={entity} onChange={(e) => setEntity(e.target.value)} className={`${inputClass} bg-white`}>
            <option value="">Select entity type...</option>
            {ENTITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {entity === "Other" && text({ name: "entityTypeOther", label: "Entity type, other", max: 21 })}
        <div>
          <label htmlFor="acord-fein" className={labelClass}>FEIN (federal employer ID number)</label>
          <input
            id="acord-fein"
            name="fein"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={10}
            pattern="\d{2}-\d{7}"
            title="FEIN format: 12-3456789"
            placeholder="12-3456789"
            aria-describedby="acord-fein-help"
            className={inputClass}
          />
          <p id="acord-fein-help" className={`mt-1 text-xs ${mutedTextClass}`}>
            Do not enter a Social Security Number. Leave blank if you do not have a FEIN (some sole proprietors do not).
          </p>
        </div>
        {grid(<>{IDENTIFICATION.slice(1, 3).map((d) => text(d))}</>)}
        {grid(<>{IDENTIFICATION.slice(3, 5).map((d) => text(d))}</>)}
        {grid(<>{IDENTIFICATION.slice(5).map((d) => text(d))}</>)}
      </Group>

      <Group title="Locations and contacts" note="County, mailing address and who we should call." borderClass={borderClass}>
        {LOCATION.map((d) => text(d))}
        {yesNo("mailingSameAsPhysical", "Is your mailing address the same as your business address?", false)}
        {ans.mailingSameAsPhysical === "No" && grid(<>{MAILING.map((d) => text(d))}</>)}
        {grid(<>{CONTACTS.map((d) => text(d))}</>)}
      </Group>

      <Group title="Policy requested" note="Dates, states and limits you want quoted." borderClass={borderClass}>
        {grid(<>{POLICY_DATES.map((d) => text(d))}</>)}
        {text(WORK_STATES)}
        {grid(
          <>
            {EL_FIELDS.map((f) => (
              <div key={f.name}>
                <label htmlFor={`acord-${f.name}`} className={labelClass}>{f.label}</label>
                <select id={`acord-${f.name}`} name={f.name} defaultValue="" className={`${inputClass} bg-white`}>
                  <option value="">Select...</option>
                  {EL_LIMITS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            ))}
          </>,
        )}
        {COVERAGE_OPTIONS.map((q) => yesNo(q.name, q.label, false))}
        {text(COVERAGE_OTHER)}
      </Group>

      <Group title="Payroll by class and state" note="Add the details behind each class code you listed above. Estimates are fine." borderClass={borderClass}>
        {Array.from({ length: CLASS_ROWS }, (_, i) => i + 1).map((n) => (
          <details key={n} open={n === 1} className={`rounded-xl border ${borderClass} px-4 py-3`}>
            <summary className="cursor-pointer min-h-[44px] flex items-center text-sm font-semibold">Class {n} details</summary>
            <div className="space-y-4 pt-3">
              {grid(<>{classFields(n).slice(0, 2).map((d) => text(d))}</>)}
              {grid(<>{classFields(n).slice(2).map((d) => text(d))}</>)}
            </div>
          </details>
        ))}
      </Group>

      <Group title="Experience mod and past coverage" note="Carrier name, premium and claims for your most recent policy years (most recent first). Enter 0 if there were no claims. Do not include policy numbers or claimant names." borderClass={borderClass}>
        {text(EXPERIENCE)}
        {Array.from({ length: PRIOR_ROWS }, (_, i) => i + 1).map((n) => (
          <details key={n} open={n === 1} className={`rounded-xl border ${borderClass} px-4 py-3`}>
            <summary className="cursor-pointer min-h-[44px] flex items-center text-sm font-semibold">
              {n === 1 ? "Most recent policy year (carrier name is in Current or prior coverage above)" : `Policy year ${n} back`}
            </summary>
            <div className="space-y-4 pt-3">
              {grid(<>
                {priorFields(n).map((d) => text(d))}
              </>)}
            </div>
          </details>
        ))}
      </Group>

      <Group title="Operations and exposures" note="Yes or No. If you answer Yes, add a one-line explanation." borderClass={borderClass}>
        {UW_QUESTIONS.map((q) => (
          <div key={q.name} className="space-y-3">
            {yesNo(q.name, q.label)}
            {q.name === "uwWorkFromHome" && ans[q.name] === "Yes" && text(WORK_FROM_HOME_COUNT)}
          </div>
        ))}
      </Group>
    </div>
  );
}
