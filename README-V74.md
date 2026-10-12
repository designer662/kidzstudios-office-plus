# Office Plus V74 — Click Outside to Close

V74 improves dismissal behavior across all 10 Office Plus pages on GitHub Pages and Supabase.

## How it works

- Clicking an empty area **outside** an open popup or panel closes that panel.
- Clicking **inside** a form, editor, or dropdown leaves it open.
- Job Management uses its existing Cancel / Close handlers for the edit job, delete confirmation, Excel preview, Google Sheet import, export, and dropdown editor. When a confirmation is layered over an editor, an outside click closes the confirmation **only**.
- Clicking away from dropdowns such as Tools, More Filters, and editable job options collapses them.
- The Office dashboard closes character mood selection, profile and room information cards, team chat, notifications, and expanded Live Activity / Office Pulse panels when clicking outside them.
- Clicking the empty office canvas also returns the Office Pulse tabs to Pulse, without changing the browser page.
- Orderform 1 / 2 image previews and Save Profile dialogs use their own cleanup functions on click-away.
- Notification and local PC profile panels follow the same close-on-outside behavior.

**Important:** Closing an unsaved editor does not save its draft. Use Save before clicking away. Clicking outside never deletes a job or bypasses its delete confirmation.

## Implementation

- `public/office-outside-close.js`: shared click-away handler, attached in each page.
- `scripts/test-outside-close.mjs`: regression tests for stacked confirmation/editor dialogs, clicks inside forms, dropdowns, chat, notifications, emoji picker and orderform preview.
- `.github/workflows/deploy-pages.yml`: runs the new test before deployment.
- `office-release.json`: V74. Automatic build-number stamping is unchanged.

No Supabase migrations or configuration changes are necessary. Deploy the ZIP contents to the existing repository, then hard-refresh.
