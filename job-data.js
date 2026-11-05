/* Office Plus v70: shared data parsing for Excel, CSV, JSON and Google Sheets. */
(() => {
  'use strict';
  const normalize = v => String(v ?? '').replace(/^\uFEFF/, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const dates = new Set(['orderDate', 'deliveryTime', 'actualComplete1', 'actualComplete2', 'lastUpdate']);
  const aliases = {
    'jobsheet': 'jobsheetFiles', 'job sheet': 'jobsheetFiles', 'job sheet files': 'jobsheetFiles',
    'job ref': 'jobsheetFiles', 'job reference': 'jobsheetFiles', 'ref': 'jobsheetFiles',
    'customer name': 'customer', 'client': 'customer', 'invoice no': 'invoice',
    'invoice number': 'invoice', 'items': 'item', 'due date': 'deliveryTime',
    'delivery date': 'deliveryTime', 'department': 'currentDepartment',
    'remarks': 'remark', 'notes': 'remark', 'production person': 'productionPic'
  };
  function dateValue(value, date1904 = false) {
    const s = String(value ?? '').trim();
    const gv = s.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})(?:,[\d,]+)?\)$/);
    if (gv) return `${gv[1]}-${String(+gv[2] + 1).padStart(2, '0')}-${gv[3].padStart(2, '0')}`;
    if (/^\d{4,5}(?:\.\d+)?$/.test(s) && +s > 0 && +s < 100000) {
      return new Date((Math.floor(+s) - 25569 + (date1904 ? 1462 : 0)) * 86400000).toISOString().slice(0, 10);
    }
    const m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/);
    if (m) {
      const year = +m[3] < 100 ? +m[3] + 2000 : +m[3];
      const d = new Date(Date.UTC(year, +m[2] - 1, +m[1]));
      if (d.getUTCFullYear() === year && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[1]) return d.toISOString().slice(0, 10);
    }
    return s;
  }
  function columns(headers, fields) {
    const map = { ...aliases };
    fields.forEach(([label, key]) => { if (!(normalize(label) in map)) map[normalize(label)] = key; map[normalize(key)] = key; });
    let actual = 0, days = 0;
    return Array.from(headers, h => {
      const n = normalize(h);
      if (n === 'actual complete') return ++actual === 1 ? 'actualComplete1' : 'actualComplete2';
      if (n === 'days left') return ++days === 1 ? 'daysLeft1' : 'daysLeft2';
      return map[n] || null;
    });
  }
  function hasHeader(headers, fields) {
    const keys = columns(headers, fields);
    return keys.includes('customer') && (keys.includes('jobsheetFiles') || keys.includes('invoice'));
  }
  function recordsFromGrid(headers, rows, fields, { date1904 = false } = {}) {
    const all = [headers, ...rows];
    const at = all.slice(0, 20).findIndex(row => hasHeader(row, fields));
    if (at < 0) throw Error('Could not find job headings. Include CUSTOMER and JOBSHEET/FILES (or INVOICE). Use the Excel template for all 28 fields.');
    const keys = columns(all[at], fields), jobs = [];
    for (const row of all.slice(at + 1)) {
      if (hasHeader(row, fields)) continue;
      const job = {};
      keys.forEach((key, i) => { if (key) job[key] = dates.has(key) ? dateValue(row[i], date1904) : String(row[i] ?? '').trim(); });
      if (['jobsheetFiles', 'invoice', 'customer', 'item'].some(key => job[key])) jobs.push(job);
    }
    return jobs;
  }
  function parseDelimited(text) {
    text = String(text).replace(/^\uFEFF/, '');
    if (/^\s*(?:<!doctype|<html|<head|<body)/i.test(text)) throw Error('The link returned a web page, not sheet data. Check the link and sheet access.');
    let delimiter = ',', first = text.split(/\r?\n/, 1)[0];
    if (/^sep=[,;\t]$/i.test(first)) { delimiter = first.slice(4); text = text.slice(first.length).replace(/^\r?\n/, ''); }
    else {
      let quoted = false; const count = { ',': 0, ';': 0, '\t': 0 };
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') { if (quoted && text[i + 1] === '"') i++; else quoted = !quoted; }
        else if (!quoted && (c === '\n' || c === '\r')) break;
        else if (!quoted && c in count) count[c]++;
      }
      delimiter = Object.keys(count).sort((a, b) => count[b] - count[a])[0];
    }
    const grid = []; let row = [], value = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"' && (quoted || value === '')) {
        if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted;
      } else if (!quoted && (c === delimiter || c === '\n' || c === '\r')) {
        row.push(value); value = '';
        if (c !== delimiter) { grid.push(row); row = []; if (c === '\r' && text[i + 1] === '\n') i++; }
      } else value += c;
      if (grid.length > 10000 || row.length > 200) throw Error('File exceeds the supported row or column limit.');
    }
    if (quoted) throw Error('CSV has an unclosed quoted field. Export it again and retry.');
    if (value || row.length) { row.push(value); grid.push(row); }
    return { headers: grid[0] || [], rows: grid.slice(1) };
  }
  function readBackup(text) {
    let data; try { data = JSON.parse(text); } catch { throw Error('This is not a valid JSON backup.'); }
    const list = Array.isArray(data) ? data : data?.jobs ?? data?.payload?.jobs;
    if (!Array.isArray(list) || !list.length) throw Error('JSON must contain a non-empty jobs array.');
    if (list.some(j => !j || typeof j !== 'object' || Array.isArray(j) || !['jobsheetFiles', 'ref', 'invoice', 'customer', 'item', 'jobType'].some(k => String(j[k] ?? '').trim()))) throw Error('JSON contains an invalid job record.');
    return list;
  }
  function parseSheetUrl(value) {
    let u; try { u = new URL(String(value).trim()); } catch { throw Error('Paste the full Google spreadsheet link.'); }
    const m = u.pathname.match(/^\/spreadsheets\/(?:u\/\d+\/)?d\/(e\/)?([A-Za-z0-9_-]+)(?:\/|$)/);
    if (u.protocol !== 'https:' || u.hostname !== 'docs.google.com' || u.port || u.username || u.password || !m) throw Error('Use a https://docs.google.com/spreadsheets/d/… link to a specific spreadsheet.');
    const gid = new URLSearchParams(u.hash.slice(1)).get('gid') || u.searchParams.get('gid') || '0';
    if (!/^\d+$/.test(gid)) throw Error('The sheet tab ID (gid) must be a number.');
    const published = Boolean(m[1]), base = `https://docs.google.com/spreadsheets/d/${published ? 'e/' : ''}${m[2]}`;
    return { base, gid, published, url: `${base}/${published ? 'pubhtml' : 'edit'}?gid=${gid}`, csv: `${base}/${published ? 'pub?output=csv' : 'export?format=csv'}&gid=${gid}&single=true` };
  }
  async function loadGoogleSheet(value) {
    const sheet = parseSheetUrl(value), controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(sheet.csv, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
      if (!response.ok) throw Error('Sheet is not accessible.');
      if (Number(response.headers.get('content-length')) > 12000000) throw Error('Sheet exceeds 12 MB.');
      const text = await response.text();
      if (text.length > 12000000) throw Error('Sheet exceeds 12 MB.');
      return { ...parseDelimited(text), sheetName: `Google Sheet · tab ${sheet.gid}`, url: sheet.url };
    } catch (error) {
      if (sheet.published) throw Error('Could not load the published sheet. Check its publishing settings, or download and import XLSX / CSV.');
    } finally { clearTimeout(timer); }
    // Google Visualization's documented callback transport handles hosts without CSV CORS.
    return new Promise((resolve, reject) => {
      const callback = `__ksSheet_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script'); let done = false, timeout;
      const finish = (error, data) => {
        if (done) return; done = true; clearTimeout(timeout); script.remove();
        // Ignore a delayed JSONP response after a network timeout.
        window[callback] = () => {}; setTimeout(() => { delete window[callback]; }, 60000);
        error ? reject(error) : resolve(data);
      };
      const unavailable = () => Error('Google Sheet unavailable. This loader needs a link-viewable or published sheet. For a private sheet, download XLSX / CSV and import that file.');
      window[callback] = response => {
        if (response?.status === 'error' || !Array.isArray(response?.table?.rows)) { finish(unavailable()); return; }
        const table = response.table;
        const grid = table.rows.map(r => (r.c || []).map((cell, i) => {
          if (!cell) return '';
          if (/^date/.test(table.cols?.[i]?.type || '')) return dateValue(cell.v);
          return cell.f ?? cell.v ?? '';
        }));
        finish(null, { headers: (table.cols || []).map(c => c.label || ''), rows: grid, sheetName: `Google Sheet · tab ${sheet.gid}`, url: sheet.url });
      };
      timeout = setTimeout(() => finish(unavailable()), 15000);
      script.src = `${sheet.base}/gviz/tq?gid=${sheet.gid}&headers=0&tqx=${encodeURIComponent(`out:json;responseHandler:${callback}`)}`;
      script.onerror = () => finish(unavailable()); document.head.appendChild(script);
    });
  }
  const csvValue = value => {
    let s = String(value ?? '');
    // Prevent spreadsheet formula execution when opening a CSV export.
    if (/^[\s]*[=+@\-]/.test(s) && !/^-?\d+(?:\.\d+)?$/.test(s.trim())) s = "'" + s;
    return `"${s.replace(/"/g, '""')}"`;
  };
  window.KSJobData = Object.freeze({ normalize, dateValue, hasHeader, recordsFromGrid, parseDelimited, readBackup, parseSheetUrl, loadGoogleSheet, csvValue });
})();
