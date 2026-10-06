/* Trials V6: pure tracking helpers, shared by live sessions and history. */
const V6 = (() => {
  const field = (key,label,unit='',step='1',max) => ({key,label,unit,step,max});
  function fields(ex) {
    if (ex.intervals) return [field('distanceKm','DISTANCE','km','0.001'),field('speedKmh','AVG SPEED','km/h','0.1'),field('paceSec','PACE',ex.machine==='Rower'?'s/500m':'s/km'),...(ex.machine==='Treadmill'?[]:[field('watts','WATTS','W')]),field('cadence',ex.machine==='Rower'||ex.machine==='Treadmill'?'SPM':'RPM',ex.machine==='Rower'||ex.machine==='Treadmill'?'spm':'rpm'),field('rpe','RPE','','0.5',10)];
    if (ex.reaction) return ['Left','Right','Front','Back'].flatMap(d=>[field('cues'+d,d+' cues'),field('correct'+d,d+' correct'),field('onTime'+d,d+' on time')]);
    if (ex.track) return ex.track.map(([k,l,u])=>field(k,l,u,'0.5')).concat([field('repsDone','REPS'),field('rpe','RPE','','0.5',10),field('pain','KNEE PAIN','','1',10),field('quality','QUALITY /5','','1',5)]);
    return null;
  }
  function speed(s,ex) {
    const n=k=>s[k]!==''&&s[k]!=null&&Number.isFinite(Number(s[k]))&&Number(s[k])>0?Number(s[k]):null;
    if(n('distanceKm')&&n('durationSec')) return n('distanceKm')*3600/n('durationSec');
    if(n('speedKmh')) return n('speedKmh');
    if(n('paceSec')) return (ex.machine==='Rower'?1800:3600)/n('paceSec');
    return null;
  }
  function summary(sets,ex) {
    const logged=sets.filter(s=>s.done), sum=a=>a.reduce((n,s)=>n+(s.distanceKm!==''&&s.distanceKm!=null?Number(s.distanceKm)||0:(speed(s,ex)||0)*(Number(s.durationSec)||0)/3600),0);
    const hard=logged.filter(s=>s.intervalType==='Hard'), chill=logged.filter(s=>['Chill','Recovery'].includes(s.intervalType));
    const avg=a=>{const v=a.map(s=>({v:speed(s,ex),t:Number(s.durationSec)||0})).filter(s=>s.v&&s.t);const t=v.reduce((n,s)=>n+s.t,0);return t?v.reduce((n,s)=>n+s.v*s.t,0)/t:null;};
    const values=hard.map(s=>speed(s,ex)).filter(v=>v!=null), best=values.length?Math.max(...values):null,worst=values.length?Math.min(...values):null;
    const hs=avg(hard),cs=avg(chill),pace=v=>v?(ex.machine==='Rower'?1800:3600)/v:null;
    return {totalDistance:sum(logged),hardDistance:sum(hard),chillDistance:sum(chill),averageHardSpeed:hs,averageChillSpeed:cs,averageHardPace:pace(hs),averageChillPace:pace(cs),bestHardInterval:best,worstHardInterval:worst,dropOff:best==null?null:100*(best-worst)/best,loggedIntervals:logged.length};
  }
  function reactionSummary(sets) {
    const dirs=['Left','Right','Front','Back'];
    return dirs.map(d=>{const total=k=>sets.filter(s=>s.done).reduce((n,s)=>n+(Number(s[k+d])||0),0);const cues=total('cues'),correct=total('correct'),onTime=total('onTime');return {direction:d,cues,correct,onTime,lateMissed:Math.max(0,cues-onTime),success:cues?100*onTime/cues:null};});
  }
  function summaryHTML(sets,ex) {
    const f=(v,u='')=>v==null?'—':v.toFixed(2)+u;
    if(ex.reaction) return '<div class="v6-summary">'+reactionSummary(sets).map(r=>r.direction+': '+r.cues+' cues · '+r.correct+' correct · '+r.onTime+' in time · '+r.lateMissed+' late/missed · '+f(r.success,'%')).join('<br>')+'</div>';
    if(!ex.intervals) return '';
    const s=summary(sets,ex),pu=ex.machine==='Rower'?' s/500m':' s/km';
    return '<div class="v6-summary">Logged '+s.loggedIntervals+'/'+sets.length+' intervals · Total '+f(s.totalDistance,' km')+' · Hard '+f(s.hardDistance,' km')+' · Chill/recovery '+f(s.chillDistance,' km')+'<br>Hard average '+f(s.averageHardSpeed,' km/h')+' / '+f(s.averageHardPace,pu)+' · Chill average '+f(s.averageChillSpeed,' km/h')+' / '+f(s.averageChillPace,pu)+'<br>Best hard '+f(s.bestHardInterval,' km/h')+' · Worst hard '+f(s.worstHardInterval,' km/h')+' · Drop-off (best→worst) '+f(s.dropOff,'%')+'</div>';
  }
  return {fields,speed,summary,reactionSummary,summaryHTML};
})();
