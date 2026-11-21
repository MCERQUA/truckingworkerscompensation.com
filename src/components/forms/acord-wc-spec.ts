// ACORD 130 (workers compensation) intake additions for /quote — 2026-11-20 (josh-sms task 029).
// Source spec: skills/acord-forms/forms/acord-130/FIELDS.md.
//
// Rules this file encodes (every one is also checked by validateAcordExtras / the registration check):
//  - ADD-ONLY: no existing field name is renamed. Every name below is new and OPTIONAL.
//  - No policy-number field of any kind (current / prior / other carrier). Carrier NAME, dates,
//    years, premium and claim figures are fine.
//  - FEIN only; a Social Security Number is never accepted there.
//  - No SSN, driver licence, DOB (new), upload or payment fields.
//  - Every name must also be declared in public/__forms.html (kept in lockstep by hand/script).

export const ENTITY_TYPES = [
  "Sole proprietor",
  "Partnership",
  "Corporation",
  "S-Corporation",
  "LLC",
  "Joint venture",
  "Trust",
  "Unincorporated association",
  "Other",
];

export const EL_LIMITS = ["100,000", "500,000", "1,000,000"];

export const CLASS_ROWS = 5;
export const PRIOR_ROWS = 5;
export const OWNER_ROWS = 6;

export const ELECTION_INCLUDE = "Included";
export const ELECTION_EXCLUDE = "Excluded";

export interface TextDef {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "tel" | "email" | "url";
  max?: number;
  hint?: string;
  inputMode?: "numeric" | "decimal";
}

export interface QuestionDef {
  name: string;
  label: string;
}

// ---- Business identification ------------------------------------------------------------------
export const IDENTIFICATION: TextDef[] = [
  { name: "dba", label: "Doing business as (DBA), if different", placeholder: "Trade name", max: 71 },
  { name: "sicCode", label: "SIC code (if known)", placeholder: "4213", max: 8 },
  { name: "naicsCode", label: "NAICS code (if known)", placeholder: "484121", max: 8 },
  { name: "secondaryPhone", label: "Secondary phone", type: "tel", placeholder: "602-555-0100", max: 29 },
  { name: "websiteUrl", label: "Business website", type: "url", placeholder: "https://example.com", max: 80 },
  { name: "ncciRiskId", label: "NCCI risk ID number (if you have one)", max: 20 },
  { name: "ratingBureauId", label: "State rating bureau / employer registration number", max: 20 },
];

// ---- Locations & contacts ---------------------------------------------------------------------
export const LOCATION: TextDef[] = [{ name: "physicalCounty", label: "County of the business address", max: 30 }];
export const MAILING: TextDef[] = [
  { name: "mailingAddress", label: "Mailing address", placeholder: "PO Box 100", max: 47 },
  { name: "mailingCity", label: "Mailing city", max: 30 },
  { name: "mailingState", label: "Mailing state", max: 4 },
  { name: "mailingZip", label: "Mailing ZIP", max: 11 },
];
export const CONTACTS: TextDef[] = [
  { name: "inspectionContactName", label: "Premises inspection contact name", max: 71 },
  { name: "inspectionContactPhone", label: "Premises inspection contact phone", type: "tel", max: 29 },
  { name: "accountingContactName", label: "Billing / audit contact name", max: 71 },
  { name: "accountingContactPhone", label: "Billing / audit contact phone", type: "tel", max: 29 },
  { name: "claimsContactName", label: "Claims contact name", max: 71 },
  { name: "claimsContactPhone", label: "Claims contact phone", type: "tel", max: 29 },
];

// ---- Policy requested -------------------------------------------------------------------------
export const POLICY_DATES: TextDef[] = [
  { name: "desiredEffectiveDate", label: "Desired policy effective date", type: "date" },
  { name: "desiredExpirationDate", label: "Desired policy expiration date", type: "date" },
];
export const WORK_STATES: TextDef = {
  name: "workStates",
  label: "States where your employees work (Part 1 states)",
  placeholder: "AZ, NM, TX",
  max: 40,
};
export const EL_FIELDS = [
  { name: "elEachAccident", label: "Employers liability: each accident" },
  { name: "elDiseasePolicy", label: "Employers liability: disease, policy limit" },
  { name: "elDiseaseEachEmployee", label: "Employers liability: disease, each employee" },
];
export const COVERAGE_OPTIONS: QuestionDef[] = [
  { name: "wcDeductibleMedical", label: "Do you want a medical deductible?" },
  { name: "wcDeductibleIndemnity", label: "Do you want an indemnity deductible?" },
  { name: "wcCoverageUSLH", label: "Do you need U.S. Longshore and Harbor Workers (USL&H) coverage?" },
  { name: "wcCoverageVoluntaryComp", label: "Do you need voluntary compensation coverage?" },
  { name: "wcCoverageForeign", label: "Do you need foreign coverage?" },
  { name: "wcCoverageManagedCare", label: "Do you want a managed care option?" },
];
export const COVERAGE_OTHER: TextDef = {
  name: "wcCoverageOther",
  label: "Any other coverage or deductible type you need",
  max: 60,
};

// ---- Payroll by class (rows 1..5; the existing classCode1..5 inputs hold the codes) -----------
export const classFields = (n: number): TextDef[] => [
  { name: `classState${n}`, label: `Class ${n}: state where this payroll is earned`, placeholder: "AZ", max: 20 },
  { name: `classDuties${n}`, label: `Class ${n}: what these employees do`, placeholder: "Long-haul driving", max: 120 },
  { name: `classFullTime${n}`, label: `Class ${n}: full-time employees`, inputMode: "numeric", max: 6 },
  { name: `classPartTime${n}`, label: `Class ${n}: part-time employees`, inputMode: "numeric", max: 6 },
  { name: `classPayroll${n}`, label: `Class ${n}: estimated annual payroll`, placeholder: "$", inputMode: "decimal", max: 16 },
];

// ---- Experience mod + prior coverage / loss history (rows 1..5, most recent first) ------------
export const EXPERIENCE: TextDef = {
  name: "priorExperienceMod",
  label: "Experience mod (most recent policy year), if you know it",
  placeholder: "1.00",
  inputMode: "decimal",
  max: 8,
};
// Shared ACORD 130 names (desk-1, all WC sites). Year 1 reuses this site's existing priorCarrierName /
// priorPolicyExpiration and the new priorExperienceMod; years 2-5 use priorYearN*.
export const priorFields = (n: number): TextDef[] => {
  const p = `priorYear${n}`;
  const rows: TextDef[] = [
    { name: `${p}Year`, label: `Policy year`, placeholder: "2025", inputMode: "numeric", max: 4 },
    ...(n === 1 ? [] : [{ name: `${p}Carrier`, label: `Workers comp carrier name`, max: 71 } as TextDef]),
    { name: `${p}Premium`, label: `Annual premium paid`, placeholder: "$", inputMode: "decimal", max: 16 },
    ...(n === 1 ? [] : [{ name: `${p}Mod`, label: `Experience mod used`, placeholder: "1.00", inputMode: "decimal", max: 8 } as TextDef]),
    { name: `${p}ClaimCount`, label: `Number of claims (0 if none)`, inputMode: "numeric", max: 6 },
    { name: `${p}Paid`, label: `Amount paid on claims (0 if none)`, placeholder: "$", inputMode: "decimal", max: 16 },
    { name: `${p}Reserved`, label: `Amount still reserved (0 if none)`, placeholder: "$", inputMode: "decimal", max: 16 },
  ];
  return rows;
};

// ---- Owners / officers extras (row i keeps the existing ownerName*/ownerOwnershipPct* fields) --
export const ownerExtraNames = (i: number) => {
  const s = i === 0 ? "" : String(i + 1);
  return {
    duties: `ownerDuties${s}`,
    election: `ownerIncludedExcluded${s}`,
    classCode: `ownerClassCode${s}`,
    payroll: `ownerPayroll${s}`,
  };
};

// ---- ACORD 130 underwriting questions (Yes/No radio pair + Yes-gated explanation) -------------
export const UW_QUESTIONS: QuestionDef[] = [
  { name: "uwAircraftWatercraft", label: "Do you own, operate or lease aircraft or watercraft?" },
  { name: "uwHazardousMaterial", label: "Do past, present or discontinued operations involve storing, treating, discharging, applying, disposing of or transporting hazardous material?" },
  { name: "uwUndergroundOr15Ft", label: "Is any work performed underground or above 15 feet?" },
  { name: "uwOverWater", label: "Is work performed on barges, vessels, docks or bridges over water?" },
  { name: "uwOtherBusiness", label: "Are you engaged in any other type of business?" },
  { name: "uwSubcontractorsUsed", label: "Are subcontractors used?" },
  { name: "uwSubletNoCerts", label: "Is any work sublet without certificates of insurance?" },
  { name: "uwSafetyProgram", label: "Is a written safety program in operation?" },
  { name: "uwGroupTransportation", label: "Is any group transportation provided?" },
  { name: "uwUnder16Over60", label: "Any employees under 16 or over 60 years of age?" },
  { name: "uwSeasonalEmployees", label: "Any seasonal employees?" },
  { name: "uwVolunteerLabor", label: "Is there any volunteer or donated labor?" },
  { name: "uwPhysicalHandicaps", label: "Any employees with physical handicaps?" },
  { name: "uwTravelOutOfState", label: "Do employees travel out of state?" },
  { name: "uwAthleticTeams", label: "Are athletic teams sponsored?" },
  { name: "uwPhysicalsRequired", label: "Are physicals required after offers of employment are made?" },
  { name: "uwOtherInsuranceSameCarrier", label: "Any other insurance with this company?" },
  { name: "uwDeclinedCancelled", label: "Any policy or coverage declined, cancelled or non-renewed in the past 3 years? (not applicable in Missouri)" },
  { name: "uwEmployeeHealthPlan", label: "Is an employee health plan provided?" },
  { name: "uwWorkForOtherBusinesses", label: "Do any employees perform work for other businesses or subsidiaries?" },
  { name: "uwLeasedEmployees", label: "Do you lease employees to or from other employers?" },
  { name: "uwWorkFromHome", label: "Do employees predominantly work from home?" },
  { name: "uwTaxLiensBankruptcy", label: "Any tax liens or bankruptcy in the past 5 years?" },
  { name: "uwUnpaidWcPremium", label: "Any undisputed and unpaid workers compensation premium due from you or any commonly owned or managed business?" },
];
export const EXPLANATION_MAX = 136;
export const explanationName = (q: string) => `${q}Explanation`;
export const WORK_FROM_HOME_COUNT: TextDef = {
  name: "uwWorkFromHomeCount",
  label: "How many employees predominantly work from home?",
  inputMode: "numeric",
  max: 6,
};

// ---- Every NEW field name (for __forms.html) --------------------------------------------------
export function allNewFieldNames(): string[] {
  const names: string[] = [];
  const add = (defs: { name: string }[]) => defs.forEach((d) => names.push(d.name));
  add(IDENTIFICATION);
  names.push("entityType", "entityTypeOther", "fein");
  add(LOCATION);
  names.push("mailingSameAsPhysical");
  add(MAILING);
  add(CONTACTS);
  add(POLICY_DATES);
  names.push(WORK_STATES.name);
  add(EL_FIELDS);
  add(COVERAGE_OPTIONS);
  names.push(COVERAGE_OTHER.name);
  for (let n = 1; n <= CLASS_ROWS; n++) add(classFields(n));
  names.push(EXPERIENCE.name);
  for (let n = 1; n <= PRIOR_ROWS; n++) add(priorFields(n));
  for (let i = 0; i < OWNER_ROWS; i++) {
    const o = ownerExtraNames(i);
    names.push(o.duties, o.election, o.classCode, o.payroll);
  }
  UW_QUESTIONS.forEach((q) => names.push(q.name, explanationName(q.name)));
  names.push(WORK_FROM_HOME_COUNT.name);
  return names;
}

// ---- Validation (runs on submit; new fields only) ---------------------------------------------
const FEIN_RE = /^\d{2}-\d{7}$/;

export interface Problem {
  name: string;
  message: string;
}

export function validateAcordExtras(values: Record<string, string>): Problem[] {
  const out: Problem[] = [];
  const v = (k: string) => (values[k] ?? "").trim();

  const fein = v("fein");
  if (fein && !FEIN_RE.test(fein)) {
    out.push({
      name: "fein",
      message: "FEIN must look like 12-3456789. Do not enter a Social Security Number. Leave it blank if you do not have a FEIN.",
    });
  }

  return out;
}
