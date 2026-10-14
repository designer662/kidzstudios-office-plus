/* Shared Job Management rules. Reuse in Office Pulse and the job editor. */
(function (root) {
  'use strict';
  const clean = v => String(v == null ? '' : v).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  function stage(job) {
    const dept=clean(job?.currentDepartment || '');
    if (/closed|complete|completed|done/.test(dept)) return 'completed';
    if (/design|artwork/.test(dept)) return 'artwork';
    if (/production|print|packing|qc/.test(dept)) return 'production';
    if (/sales|order|admin/.test(dept) || !dept) return 'orders';
    return 'unmapped';
  }
  function payloadSize(value) { return new TextEncoder().encode(JSON.stringify(value)).length; }
  function validateUniqueRefs(list) {
    const seen=new Set();
    for (const job of list) {
      const ref=clean(job.jobsheetFiles || job.ref);
      if (!ref) return 'Every job needs a JOBSHEET/FILES reference.';
      if (seen.has(ref)) return `Duplicate job reference: ${job.jobsheetFiles || job.ref}`;
      seen.add(ref);
    }
    return '';
  }
  root.KSJobs=Object.freeze({stage,payloadSize,validateUniqueRefs});
})(typeof window !== 'undefined' ? window : globalThis);
