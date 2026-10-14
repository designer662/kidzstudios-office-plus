import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync('public/index.html','utf8');
const profile=html.split('  function openEmployee(e){')[1]?.split('  const characterEmojiPresets=')[0];
assert(profile,'Missing staff profile renderer');
assert.match(profile,/data-profile-tab="staff"/,'Staff tab remains available');
assert.match(profile,/data-profile-tab="emoji"/,'Dedicated Emoji tab remains available');
assert.match(profile,/data-edit-profile-workload/,'Workload editor remains available');
assert.match(profile,/data-edit-profile-staff/,'Staff editor remains available');
assert.match(profile,/data-profile-mood/,'Emoji tab can set a mood');
assert.match(profile,/data-profile-emoji-clear/,'Emoji tab can clear a mood');
assert.match(profile,/await triggerCharacterEmoji\(e,button\.dataset\.profileMood\)/,'Mood still uses shared persistence handler');
assert.match(profile,/await clearCharacterMood\(e\)/,'Clear still uses shared persistence handler');
assert.doesNotMatch(html,/ks-staff-quick-emoji|ks-staff-quick-heading|ks-staff-quick-grid|data-quick-mood|Set Mood/,'Duplicate mood controls or unused styles must not return');
assert.match(profile,/choice\.dataset\.profileMood===e\.mood/,'Selected mood state must reflect actual result, including failed clear');
console.log('PASS V86.50 staff profile: single Emoji chooser, Staff actions intact, persistent mood and clear states consistent.');
