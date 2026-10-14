// A single stable entry point keeps GitHub Actions from fixing the first red
// legacy test only to discover another one on the next deployment.
import {spawnSync} from 'node:child_process';

export const stabilityTests=Object.freeze([
  'scripts/test-walking-routes.cjs',
  'scripts/test-movement-timeline.mjs',
  'scripts/test-living-timeline-sync.mjs',
  'scripts/test-v86-16-simulation-rebuild.mjs',
  'scripts/test-v86-22-simulation.mjs',
  'scripts/test-v86-28-synchronized-walking.mjs',
  'scripts/test-v86-29-smart-ai.mjs',
  'scripts/test-v86-30-furniture-ai.mjs',
  'scripts/test-v86-36-activity-lifecycle.mjs',
  'scripts/test-v86-39-staff-mobility.mjs',
  'scripts/test-v86-44-smart-ai.mjs'
]);

export function runStabilitySuite(tests=stabilityTests,runner=file=>spawnSync(process.execPath,[file],{stdio:'inherit'}),report=console){
  const failed=[];
  for(const file of tests){
    report.log(`\n--- Simulator check: ${file} ---`);
    let result;
    try{result=runner(file)}catch(error){result={status:1,error}}
    if(result?.status!==0){
      failed.push(file);
      report.error(`FAIL ${file}: ${result?.error?.message||'exit code '+String(result?.status)}`);
    }else report.log(`PASS ${file}`);
  }
  report.log(`\nSimulator checks: ${tests.length-failed.length}/${tests.length} passed.`);
  if(failed.length)report.error(`Failed simulator checks:\n${failed.map(f=>` - ${f}`).join('\n')}`);
  return {failed,passed:tests.length-failed.length,exitCode:failed.length?1:0};
}
