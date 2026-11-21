"use client";

import { useEffect, useRef, useState } from "react";
import { ELECTION_EXCLUDE, ELECTION_INCLUDE, ownerExtraNames } from "./acord-wc-spec";

// APP-004b (Josh, Insurance App Adjustments): solo vs multiple owners/officers.
// Row 1 keeps the original field names (ownerNames / ownerDateOfBirth / ownerOwnershipPct) so the
// leads webhook mapping is unchanged. Extra rows are numbered (ownerName2, ownerDateOfBirth2,
// ownerOwnershipPct2 ... up to 6) and every one is declared in public/__forms.html so Netlify
// captures them. owners_summary carries every row on one line each for the lead email/DB.
// Inputs are real named fields (DOM-serialised forms pick them up); onFieldsChange also reports
// them for forms that submit from React state.

const MAX_OWNERS = 6;

interface OwnerRow {
  name: string;
  dob: string;
  pct: string;
  // ACORD 130 additions (all optional; no SSN / DOB / licence data is collected here).
  duties: string;
  titleRel: string;
  election: string;
  classCode: string;
  payroll: string;
}

const blankRow = (pct = ""): OwnerRow => ({ name: "", dob: "", pct, duties: "", titleRel: "", election: "", classCode: "", payroll: "" });

interface OwnersFieldsetProps {
  inputClass: string;
  labelClass: string;
  /** Classes for the "Add another owner" button (site's secondary button style). */
  buttonClass?: string;
  /** Text colour class for links / the Remove button. */
  accentTextClass?: string;
  /** Muted helper text class. */
  mutedTextClass?: string;
  /** Site border colour token for the row cards and choice boxes. */
  borderClass?: string;
  idPrefix?: string;
  onFieldsChange?: (fields: Record<string, string>) => void;
}

const fieldNames = (i: number) =>
  i === 0
    ? { name: "ownerNames", dob: "ownerDateOfBirth", pct: "ownerOwnershipPct" }
    : { name: `ownerName${i + 1}`, dob: `ownerDateOfBirth${i + 1}`, pct: `ownerOwnershipPct${i + 1}` };

export function OwnersFieldset({
  inputClass,
  labelClass,
  buttonClass = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold",
  accentTextClass = "",
  mutedTextClass = "text-gray-600",
  borderClass = "border-gray-200",
  idPrefix = "owner",
  onFieldsChange,
}: OwnersFieldsetProps) {
  const [count, setCount] = useState<"1" | "2+">("1");
  const [owners, setOwners] = useState<OwnerRow[]>([blankRow("100")]);
  const focusRow = useRef<number | null>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const rowRefs = useRef<(HTMLInputElement | null)[]>([]);

  const total = owners.reduce((sum, o) => sum + (parseFloat(o.pct) || 0), 0);
  const anyPct = owners.some((o) => o.pct.trim() !== "");
  const totalOff = anyPct && Math.abs(total - 100) > 0.01;

  const summary = owners
    .filter((o) => o.name || o.dob || o.pct)
    .map((o, i) => `Owner ${i + 1}: ${o.name || "(no name)"} | DOB ${o.dob || "(not given)"} | ${o.pct || "0"}% ownership${o.election ? ` | ${o.election}` : ""}`)
    .join("\n");

  useEffect(() => {
    if (!onFieldsChange) return;
    const fields: Record<string, string> = { ownerCount: count, owners_summary: summary };
    owners.forEach((o, i) => {
      const n = fieldNames(i);
      fields[n.name] = o.name;
      if (i === 0) fields.ownerName1 = o.name; // mirror of row 1's ownerNames
      fields[n.dob] = o.dob;
      fields[n.pct] = o.pct;
      const x = ownerExtraNames(i);
      fields[x.titleRel] = o.titleRel;
      fields[x.duties] = o.duties;
      fields[x.election] = o.election;
      fields[x.classCode] = o.classCode;
      fields[x.payroll] = o.payroll;
    });
    onFieldsChange(fields);
  }, [owners, count, summary, onFieldsChange]);

  useEffect(() => {
    if (focusRow.current !== null) {
      rowRefs.current[focusRow.current]?.focus();
      focusRow.current = null;
    }
  }, [owners.length]);

  const chooseCount = (value: "1" | "2+") => {
    setCount(value);
    if (value === "1") {
      // Solo: keep only row 1; an untouched or blank % becomes 100.
      setOwners((prev) => [{ ...prev[0], pct: prev[0].pct.trim() === "" ? "100" : prev[0].pct }]);
    } else {
      // Multiple: at least two rows; the solo 100% default no longer makes sense.
      setOwners((prev) => {
        const first = { ...prev[0], pct: prev[0].pct === "100" ? "" : prev[0].pct };
        return prev.length >= 2 ? [first, ...prev.slice(1)] : [first, blankRow()];
      });
    }
  };

  const update = (i: number, key: keyof OwnerRow, value: string) =>
    setOwners((prev) => prev.map((o, idx) => (idx === i ? { ...o, [key]: value } : o)));

  const add = () => {
    if (owners.length >= MAX_OWNERS) return;
    focusRow.current = owners.length;
    setOwners((prev) => [...prev, blankRow()]);
  };

  const remove = (i: number) => {
    setOwners((prev) => prev.filter((_, idx) => idx !== i));
    requestAnimationFrame(() => addRef.current?.focus());
  };

  const radioWrap =
    `flex min-h-[44px] flex-1 cursor-pointer items-center gap-3 rounded-xl border ${borderClass} px-4 py-2 text-sm font-semibold has-[:checked]:border-current has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-1`;

  return (
    <fieldset className="space-y-4 pb-2">
      <legend className={labelClass}>How many owners/officers?</legend>
      <div className="flex flex-col gap-3 sm:flex-row" role="radiogroup" aria-label="How many owners/officers?">
        <label className={`${radioWrap} ${count === "1" ? accentTextClass : ""}`}>
          <input
            type="radio"
            name="ownerCount"
            value="1"
            checked={count === "1"}
            onChange={() => chooseCount("1")}
            className="h-5 w-5 accent-current"
          />
          Just me (1 owner)
        </label>
        <label className={`${radioWrap} ${count === "2+" ? accentTextClass : ""}`}>
          <input
            type="radio"
            name="ownerCount"
            value="2+"
            checked={count === "2+"}
            onChange={() => chooseCount("2+")}
            className="h-5 w-5 accent-current"
          />
          2 or more owners/officers
        </label>
      </div>

      {owners.map((o, i) => {
        const n = fieldNames(i);
        const x = ownerExtraNames(i);
        const id = (k: string) => `${idPrefix}-${k}-${i + 1}`;
        return (
          <div key={i} className={`space-y-3 rounded-xl border ${borderClass} p-4`} role="group" aria-labelledby={id("heading")}>
            <div className="flex items-center justify-between gap-3">
              <p id={id("heading")} className={`text-sm font-semibold ${mutedTextClass}`}>
                {count === "1" ? "Owner" : `Owner ${i + 1}`}
              </p>
              {count === "2+" && owners.length > 2 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-semibold underline underline-offset-2 ${accentTextClass}`}
                  aria-label={`Remove owner ${i + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
            <div>
              <label htmlFor={id("name")} className={labelClass}>Owner or officer name</label>
              <input
                ref={(el) => { rowRefs.current[i] = el; }}
                id={id("name")}
                name={n.name}
                type="text"
                autoComplete={i === 0 ? "name" : "off"}
                value={o.name}
                onChange={(e) => update(i, "name", e.target.value)}
                placeholder="Full name and role"
                className={inputClass}
              />
              {i === 0 && <input type="hidden" name="ownerName1" value={o.name} />}
            </div>
            <div>
              <label htmlFor={id("titleRel")} className={labelClass}>Title or relationship to the business (optional)</label>
              <input id={id("titleRel")} name={x.titleRel} type="text" autoComplete="off" maxLength={80} value={o.titleRel} onChange={(e) => update(i, "titleRel", e.target.value)} placeholder="Owner, President, Spouse" className={inputClass} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={id("dob")} className={labelClass}>Date of birth</label>
                <input
                  id={id("dob")}
                  name={n.dob}
                  type="date"
                  value={o.dob}
                  onChange={(e) => update(i, "dob", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={id("pct")} className={labelClass}>Ownership %</label>
                <input
                  id={id("pct")}
                  name={n.pct}
                  type="text"
                  inputMode="decimal"
                  value={o.pct}
                  onChange={(e) => update(i, "pct", e.target.value)}
                  placeholder={count === "1" ? "100" : "e.g. 50"}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor={id("duties")} className={labelClass}>Duties</label>
              <input id={id("duties")} name={x.duties} type="text" autoComplete="off" maxLength={136} value={o.duties} onChange={(e) => update(i, "duties", e.target.value)} placeholder="Dispatch, driving, office" className={inputClass} />
            </div>
            <div>
              <label htmlFor={id("election")} className={labelClass}>Include or exclude this person from workers comp coverage?</label>
              <select id={id("election")} name={x.election} value={o.election} onChange={(e) => update(i, "election", e.target.value)} className={`${inputClass} bg-white`}>
                <option value="">Select...</option>
                <option value={ELECTION_INCLUDE}>{ELECTION_INCLUDE}</option>
                <option value={ELECTION_EXCLUDE}>{ELECTION_EXCLUDE}</option>
              </select>
            </div>
            {o.election === ELECTION_INCLUDE && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={id("classCode")} className={labelClass}>Class code if included</label>
                  <input id={id("classCode")} name={x.classCode} type="text" autoComplete="off" maxLength={8} value={o.classCode} onChange={(e) => update(i, "classCode", e.target.value)} placeholder="7219" className={inputClass} />
                </div>
                <div>
                  <label htmlFor={id("payroll")} className={labelClass}>Annual payroll if included</label>
                  <input id={id("payroll")} name={x.payroll} type="text" inputMode="numeric" autoComplete="off" maxLength={16} value={o.payroll} onChange={(e) => update(i, "payroll", e.target.value)} placeholder="$" className={inputClass} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <input type="hidden" name="owners_summary" value={summary} />

      {count === "2+" && (
        <div className="flex flex-wrap items-center gap-4">
          {owners.length < MAX_OWNERS ? (
            <button ref={addRef} type="button" onClick={add} className={buttonClass}>
              + Add another owner
            </button>
          ) : (
            <p className={`text-sm ${mutedTextClass}`}>Up to {MAX_OWNERS} owners can be listed here — mention any others in your message.</p>
          )}
          <p className={`text-sm font-semibold ${totalOff ? "text-amber-700" : mutedTextClass}`} aria-live="polite">
            Total ownership: {Math.round(total * 100) / 100}%
          </p>
        </div>
      )}
      <div aria-live="polite">
        {totalOff && (
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Ownership percentages usually add up to 100% — right now they total {Math.round(total * 100) / 100}%. You can still send the form.
          </p>
        )}
      </div>
    </fieldset>
  );
}
