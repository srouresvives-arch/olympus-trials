/* Run only after explicit human approval of the exact Trials commit. */
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
function git(cwd,...args){return execFileSync('git',['-C',cwd,...args],{encoding:'utf8'}).trim();}
function promote(sourceDir,targetDir){
  const files=['app.js','data.js','legacy-data.js','v6.js','styles.css','index.html','icon.svg','manifest.webmanifest'];
  const contents=Object.fromEntries(files.map(f=>[f,fs.readFileSync(path.join(sourceDir,f),'utf8')]));
  const keys={selected:'oa3.selected',active:'oa3.active',history:'oa3.history',knee:'oa3.knee',customPlans:'oa4.customPlans',readiness:'oa5.readiness',goals:'oa5.goals',tests:'oa5.tests',blockWeek:'oa5.blockWeek',weeklyReviews:'oa5.weeklyReviews',importedOfficial:'oa5.trialsPromotedV60',oct3VideoImportedV1:'oa5.oct3VideoImportedV1'};
  Object.entries(keys).forEach(([suffix,key])=>{contents['app.js']=contents['app.js'].replaceAll('"oat5.'+suffix+'"','"'+key+'"');});
  contents['app.js']=contents['app.js'].replace('version: "olympus-trials-v6"','version: "olympus-official-v6"');
  contents['index.html']=contents['index.html'].replace('Olympus Athlete · Trials','Olympus Athlete · Oficial').replace('>TRIALS</span>','>OFICIAL</span>').replace('href="official/"','href="../"').replace('APP OFICIAL','TRIALS');
  contents['manifest.webmanifest']=contents['manifest.webmanifest'].replaceAll('Olympus Athlete Trials','Olympus Athlete').replaceAll('Olympus Trials','Olympus');
  if(contents['app.js'].includes('"oat5.'))throw Error('Incomplete official storage mapping; refusing promotion.');
  fs.mkdirSync(targetDir,{recursive:true});files.forEach(f=>fs.writeFileSync(path.join(targetDir,f),contents[f]));
}
if(require.main===module){
  const source=process.argv[2],approved=process.argv[3],repo=path.resolve(__dirname,'..');
  if(!source||!approved||!/^[0-9a-f]{40}$/.test(approved))throw Error('Usage: node scripts/promote-trials.cjs <clean-trials-checkout> <approved-40-character-commit-sha>');
  if(git(repo,'branch','--show-current')!=='main')throw Error('Promotion must run in the official main checkout.');
  if(git(source,'rev-parse','HEAD')!==approved)throw Error('Trials checkout does not match the approved SHA.');
  if(git(source,'status','--porcelain'))throw Error('Trials checkout has uncommitted changes.');
  if(git(repo,'status','--porcelain'))throw Error('Official checkout must be clean before promotion.');
  promote(path.resolve(source),path.join(repo,'official'));
  console.log('Prepared official release from approved Trials '+approved+'. Review, test and commit the official/ diff. No commit or deployment was performed.');
}
module.exports={promote};
