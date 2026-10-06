(function () {
  "use strict";

  const KEY = {
    selected: "oa3.selected",
    active: "oa3.active",
    history: "oa3.history",
    knee: "oa3.knee",
    plans: "oa4.customPlans",
    readiness: "oa5.readiness",
    goals: "oa5.goals",
    tests: "oa5.tests",
    blockWeek: "oa5.blockWeek",
    weeklyReviews: "oa5.weeklyReviews",
    importedOfficial: "oa5.trialsPromotedV60",
    oct3VideoImported: "oa5.oct3VideoImportedV1"
  };
  const $ = function (id) { return document.getElementById(id); };
  const E = {
    dayGrid: $("day-grid"), selectedNum: $("selected-num"), selectedTitle: $("selected-title"), selectedSubtitle: $("selected-subtitle"),
    start: $("start-session"), viewSelected: $("view-selected-plan"), basePlanDetail: $("base-plan-detail"),
    workoutNum: $("workout-num"), workoutTitle: $("workout-title"), elapsed: $("elapsed-time"), progress: $("progress-fill"),
    workoutContent: $("workout-content"), finishCard: $("finish-card"), finish: $("finish-session"), cancelSession: $("cancel-session"),
    restDock: $("rest-dock"), restTime: $("rest-time"), restPause: $("rest-pause"), restClose: $("rest-close"),
    calPrev: $("calendar-prev"), calNext: $("calendar-next"), calTitle: $("calendar-title"), calGrid: $("calendar-grid"),
    calDayTitle: $("calendar-day-title"), calDayCount: $("calendar-day-count"), calSessions: $("calendar-sessions"),
    sessionEditor: $("session-editor"), editorSessionTitle: $("editor-session-title"), editorClose: $("editor-close"),
    editDate: $("edit-date"), editDuration: $("edit-duration"), editRpe: $("edit-rpe"), editSets: $("edit-sets"),
    editSessionDetails: $("edit-session-details"), editNewExerciseName: $("edit-new-exercise-name"),
    editNewExerciseBlock: $("edit-new-exercise-block"), editNewExerciseSets: $("edit-new-exercise-sets"), editAddExercise: $("edit-add-exercise"),
    deleteSession: $("delete-session"), saveSessionEdit: $("save-session-edit"),
    newPlan: $("new-plan"), customPlanList: $("custom-plan-list"), planEditor: $("plan-editor"), planEditorKicker: $("plan-editor-kicker"),
    planEditorTitle: $("plan-editor-title"), planEditorClose: $("plan-editor-close"), planName: $("plan-name"), planFocus: $("plan-focus"),
    planContent: $("plan-content"), planNotes: $("plan-notes"), savePlan: $("save-plan"), deletePlan: $("delete-plan"),
    pain: $("pain"), stiff: $("stiff"), confidence: $("confidence"), painLabel: $("pain-label"), stiffLabel: $("stiff-label"),
    confidenceLabel: $("confidence-label"), kneeNote: $("knee-note"), saveKnee: $("save-knee"),
    metricSessions: $("metric-sessions"), metricMinutes: $("metric-minutes"), metricRpe: $("metric-rpe"), metricPain: $("metric-pain"),
    statExercise: $("stat-exercise"), statMetric: $("stat-metric"), statSummary: $("stat-summary"), statChart: $("stat-chart"), statEmpty: $("stat-empty"),
    athleteScorecard: $("athlete-scorecard"), blockWeekPill: $("block-week-pill"), blockWeekLabel: $("block-week-label"), blockWeekNote: $("block-week-note"),
    blockWeekPrev: $("block-week-prev"), blockWeekNext: $("block-week-next"),
    readinessCard: $("readiness-card"), readinessClose: $("readiness-close"), readyEnergy: $("ready-energy"), readySleep: $("ready-sleep"),
    readyPain: $("ready-pain"), readyStiff: $("ready-stiff"), readyConfidence: $("ready-confidence"),
    readyEnergyLabel: $("ready-energy-label"), readySleepLabel: $("ready-sleep-label"), readyPainLabel: $("ready-pain-label"),
    readyStiffLabel: $("ready-stiff-label"), readyConfidenceLabel: $("ready-confidence-label"), skipReadiness: $("skip-readiness"), confirmReadiness: $("confirm-readiness"),
    weeklySummary: $("weekly-summary"), prFeed: $("pr-feed"),
    newGoal: $("new-goal"), goalList: $("goal-list"), goalEditor: $("goal-editor"), goalExercise: $("goal-exercise"), goalMetric: $("goal-metric"),
    goalTarget: $("goal-target"), goalDirection: $("goal-direction"), goalCancel: $("goal-cancel"), goalSave: $("goal-save"),
    testType: $("test-type"), testValue: $("test-value"), saveTest: $("save-test"), testSummary: $("test-summary"),
    sessionPaceLabel: $("session-pace-label"),
    tempoDock: $("tempo-dock"), tempoPhase: $("tempo-phase"), tempoCount: $("tempo-count"), tempoStart: $("tempo-start"), tempoStop: $("tempo-stop"),
    weeklyReviewWeek: $("weekly-review-week"), weeklyKneePain: $("weekly-knee-pain"), weeklyKneeStiff: $("weekly-knee-stiff"),
    weeklyConfidence: $("weekly-confidence"), weeklyFatigue: $("weekly-fatigue"), weeklyNotes: $("weekly-notes"),
    saveWeeklyReview: $("save-weekly-review"), copyWeeklySummary: $("copy-weekly-summary"), weeklyReviewHistory: $("weekly-review-history"),
    exportData: $("export-data"), history: $("history")
  };

  var memoryStore = {};
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? JSON.parse(memoryStore[key]) : fallback;
    }
  }
  function write(key, value) {
    var encoded = JSON.stringify(value);
    try { localStorage.setItem(key, encoded); }
    catch (err) { memoryStore[key] = encoded; }
  }
  function remove(key) {
    try { localStorage.removeItem(key); }
    catch (err) { delete memoryStore[key]; }
  }

  function importTrialsIntoOfficialOnce() {
    if (read(KEY.importedOfficial, false)) return;
    try {
      function parsed(key, fallback) {
        var raw=localStorage.getItem(key);
        return raw===null ? fallback : JSON.parse(raw);
      }
      function detailScore(session) {
        return (session.details||[]).reduce(function(total,d){
          return total + (d.sets||[]).reduce(function(t,set){
            return t + (set.done ? 2 : 0) + ["weight","repsDone","rpe","heightCm","distanceCm","distanceM","distanceKm","timeMin","seconds"].reduce(function(a,k){
              return a + (set[k]!=="" && set[k]!=null ? 1 : 0);
            },0);
          },0);
        },0);
      }

      var officialHistory=read(KEY.history,[]);
      var trialHistory=parsed("oat5.history",[]);
      if(Array.isArray(trialHistory)&&trialHistory.length){
        var byId={};
        officialHistory.forEach(function(x){byId[x.id || ((x.finishedAt||0)+":"+x.dayId)] = x;});
        trialHistory.forEach(function(x){
          var k=x.id || ((x.finishedAt||0)+":"+x.dayId);
          var current=byId[k];
          if(!current){
            officialHistory.push(x); byId[k]=x;
          } else if(detailScore(x)>detailScore(current) || (x.manualEntry && !current.manualEntry)){
            var idx=officialHistory.indexOf(current);
            if(idx>=0) officialHistory[idx]=x;
            byId[k]=x;
          }
        });
        officialHistory.sort(function(a,b){return (b.finishedAt||0)-(a.finishedAt||0);});
        write(KEY.history,officialHistory.slice(0,150));
      }

      var mappings=[
        ["oat5.knee",KEY.knee,150],
        ["oat5.customPlans",KEY.plans,75],
        ["oat5.readiness",KEY.readiness,100],
        ["oat5.goals",KEY.goals,30],
        ["oat5.tests",KEY.tests,100],
        ["oat5.weeklyReviews",KEY.weeklyReviews,52]
      ];
      mappings.forEach(function(m){
        var incoming=parsed(m[0],[]);
        var current=read(m[1],[]);
        if(Array.isArray(incoming)&&incoming.length){
          var seen={};
          current.forEach(function(x){seen[x.id || x.at || x.weekStart || x.name || JSON.stringify(x)] = true;});
          incoming.forEach(function(x){
            var k=x.id || x.at || x.weekStart || x.name || JSON.stringify(x);
            if(!seen[k]){seen[k]=true;current.push(x);}
          });
          write(m[1],current.slice(0,m[2]));
        }
      });

      if(localStorage.getItem("oat5.blockWeek")!==null && localStorage.getItem(KEY.blockWeek)===null){
        write(KEY.blockWeek,parsed("oat5.blockWeek",1));
      }
    } catch(e) {}
    write(KEY.importedOfficial,true);
  }

  function recoverOct3WorkoutIfMissing() {
    var history = read(KEY.history, []);
    var targetDate = "2026-10-03";
    var recoveryId = "recovered-2026-10-03-knee-force";
    var manualRecovery = history.find(function (x) { return x.id === recoveryId && x.manualEntry; });
    if (manualRecovery) return;

    var originalExists = history.some(function (x) {
      return x.id !== recoveryId && dateKey(x.finishedAt) === targetDate && x.dayId === "day1" && !x.recovered;
    });

    if (originalExists) {
      var cleaned = history.filter(function (x) { return x.id !== recoveryId; });
      if (cleaned.length !== history.length) write(KEY.history, cleaned);
      return;
    }

    var alreadyRecovered = history.some(function (x) { return x.id === recoveryId; });
    if (alreadyRecovered) return;

    var finishedAt = new Date(2026, 9, 3, 20, 0, 0, 0).getTime();
    history.push({
      id: "recovered-2026-10-03-knee-force",
      dayId: "day1",
      startedAt: finishedAt - (117 * 60 * 1000),
      finishedAt: finishedAt,
      durationSec: 117 * 60,
      completedSets: 0,
      avgRpe: 0,
      recovered: true,
      recoveryNote: "Sessió recuperada del 3 d'octubre: 92 min abans del cardio + ~25 min de bici. Pesos, reps i RPE detallats no disponibles.",
      details: []
    });
    history.sort(function (a,b) { return (b.finishedAt||0) - (a.finishedAt||0); });
    write(KEY.history, history.slice(0, 150));
  }


  function importOct3VideoResultsOnce() {
    if (read(KEY.oct3VideoImported, false)) return;

    function setObj(values) {
      return {
        done: values.done !== false,
        weight: values.weight == null ? "" : String(values.weight),
        repsDone: values.repsDone == null ? "" : String(values.repsDone),
        rpe: values.rpe == null ? "" : String(values.rpe),
        heightCm: "", distanceCm: "",
        distanceM: values.distanceM == null ? "" : String(values.distanceM),
        distanceKm: values.distanceKm == null ? "" : String(values.distanceKm),
        timeMin: values.timeMin == null ? "" : String(values.timeMin),
        seconds: ""
      };
    }

    var history = read(KEY.history, []);
    var targetDate = "2026-10-03";
    var session = history.find(function(x){ return x.id === "recovered-2026-10-03-knee-force"; }) ||
      history.find(function(x){ return x.dayId === "day1" && dateKey(x.finishedAt) === targetDate; });

    var finishedAt = session && session.finishedAt ? session.finishedAt : new Date(2026, 9, 3, 20, 0, 0, 0).getTime();
    if (!session) {
      session = { id:"recovered-2026-10-03-knee-force", dayId:"day1", finishedAt:finishedAt };
      history.push(session);
    }

    session.dayId = "day1";
    session.durationSec = 117 * 60;
    session.startedAt = finishedAt - session.durationSec;
    session.finishedAt = finishedAt;
    session.completedSets = 34;
    session.avgRpe = 146 / 33;
    session.readiness = { at:session.startedAt, dayId:"day1", energy:3, sleep:3, pain:1, stiffness:0, confidence:4 };
    session.recovered = false;
    session.manualEntry = true;
    session.manualEditedAt = Date.now();
    session.sourceNote = "Dades reconstruïdes del screen recording del 4 d'octubre. Duració corregida a 117 min: ~92 min abans de la bici + 25 min Bike Z2.";
    session.details = [
      {name:"Leg Extension Unilateral",block:"GENOLL + CAMA",sets:[
        setObj({weight:11,repsDone:10,rpe:8}),
        setObj({weight:11,repsDone:10,rpe:8}),
        setObj({})
      ]},
      {name:"Bulgarian Split Squat",block:"GENOLL + CAMA",sets:[
        setObj({weight:0,repsDone:10,rpe:1}),
        setObj({weight:12.5,repsDone:10,rpe:4}),
        setObj({weight:25,repsDone:10,rpe:4})
      ]},
      {name:"Seated Soleus Calf Raise",block:"GENOLL + CAMA",sets:[
        setObj({weight:30,repsDone:10,rpe:2}),
        setObj({weight:40,repsDone:10,rpe:3}),
        setObj({weight:65,repsDone:10,rpe:5})
      ]},
      {name:"Single-Leg Leg Press",block:"GENOLL + CAMA",sets:[
        setObj({weight:0,repsDone:10,rpe:3}),
        setObj({weight:20,repsDone:10,rpe:6})
      ]},
      {name:"Step-Down Lent",block:"GENOLL + CAMA",sets:[
        setObj({weight:10,repsDone:10,rpe:6}),
        setObj({weight:10,repsDone:10,rpe:7})
      ]},
      {name:"Tibialis Raise",block:"GENOLL + CAMA",sets:[
        setObj({weight:16,repsDone:10,rpe:1}),
        setObj({weight:12.5,repsDone:15,rpe:2})
      ]},
      {name:"Weighted Pull-Up",block:"COS SENCER",sets:[
        setObj({weight:0,repsDone:10,rpe:6}),
        setObj({weight:0,repsDone:8,rpe:9}),
        setObj({weight:0,repsDone:9,rpe:8})
      ]},
      {name:"DB Incline Bench",block:"COS SENCER",sets:[
        setObj({weight:30,repsDone:10,rpe:2}),
        setObj({weight:40,repsDone:10,rpe:5}),
        setObj({weight:40,repsDone:10,rpe:5})
      ]},
      {name:"Chest-Supported Row",block:"COS SENCER",sets:[
        setObj({weight:5,repsDone:10,rpe:3}),
        setObj({weight:10,repsDone:10,rpe:4}),
        setObj({weight:10,repsDone:10,rpe:3})
      ]},
      {name:"Half-Kneeling Landmine Press",block:"COS SENCER",sets:[
        setObj({weight:10,repsDone:10,rpe:4}),
        setObj({weight:10,repsDone:10,rpe:4}),
        setObj({weight:10,repsDone:10,rpe:5})
      ]},
      {name:"Farmer Carry",block:"COS SENCER",sets:[
        setObj({weight:15,distanceM:40,rpe:2}),
        setObj({weight:20,distanceM:40,rpe:3}),
        setObj({weight:20,distanceM:40,rpe:4})
      ]},
      {name:"Pallof Press",block:"COS SENCER",sets:[
        setObj({weight:5,repsDone:10,rpe:4}),
        setObj({weight:5,repsDone:10,rpe:5}),
        setObj({weight:5,repsDone:10,rpe:6})
      ]},
      {name:"Bike Z2",block:"MOTOR",sets:[
        setObj({distanceKm:11,timeMin:25,rpe:4})
      ]}
    ];

    session.prs = [];
    history.sort(function(a,b){ return (b.finishedAt||0) - (a.finishedAt||0); });
    write(KEY.history, history.slice(0,150));

    var readinessItems = read(KEY.readiness, []);
    if (!readinessItems.some(function(r){ return r.dayId==="day1" && dateKey(r.at)===targetDate; })) {
      readinessItems.unshift(session.readiness);
      write(KEY.readiness, readinessItems.slice(0,100));
    }

    write(KEY.oct3VideoImported, true);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function getDay(id) { return DAYS.find(function (d) { return d.id === id; }) || DAYS[0]; }
  function formatTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    return String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");
  }
  function uid() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : "oa-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  }
  function dateKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function parseDateInput(value) {
    var parts = String(value).split("-").map(Number);
    if (parts.length !== 3 || parts.some(function (x) { return !Number.isFinite(x); })) return Date.now();
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0).getTime();
  }
  function formatDayLong(key) {
    return new Date(parseDateInput(key)).toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "long" });
  }

  function trackingFor(ex) {
    var n = ex.name.toLowerCase();
    if (n.indexOf("countermovement jump") >= 0) return [
      { key: "heightCm", label: "CM", unit: "cm", step: "0.5" },
      { key: "repsDone", label: "REPS", unit: "reps", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("lateral bound") >= 0) return [
      { key: "distanceCm", label: "CM", unit: "cm", step: "1" },
      { key: "repsDone", label: "REPS", unit: "reps", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("run / walk") >= 0 || n.indexOf("bike") >= 0 || n.indexOf("rower") >= 0 || n.indexOf("airbike") >= 0) return [
      { key: "distanceKm", label: "KM", unit: "km", step: "0.01" },
      { key: "timeMin", label: "MIN", unit: "min", step: "0.5" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("carry") >= 0 || n.indexOf("sled") >= 0) return [
      { key: "weight", label: "KG", unit: "kg", step: "0.5" },
      { key: "distanceM", label: "M", unit: "m", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("copenhagen plank") >= 0) return [
      { key: "seconds", label: "SEC", unit: "s", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("acceleration") >= 0 || n.indexOf("shuffle") >= 0) return [
      { key: "distanceM", label: "M", unit: "m", step: "0.5" },
      { key: "repsDone", label: "REPS", unit: "reps", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("pogos") >= 0) return [
      { key: "repsDone", label: "CONTACTES", unit: "contactes", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    if (n.indexOf("snap-down") >= 0 || n.indexOf("explosive push-up") >= 0) return [
      { key: "repsDone", label: "REPS", unit: "reps", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
    return [
      { key: "weight", label: "KG", unit: "kg", step: "0.5" },
      { key: "repsDone", label: "REPS", unit: "reps", step: "1" },
      { key: "rpe", label: "RPE", unit: "", step: "0.5", max: 10 }
    ];
  }

  function findExerciseByName(name) {
    for (var d = 0; d < DAYS.length; d++) {
      for (var i = 0; i < DAYS[d].exercises.length; i++) {
        if (DAYS[d].exercises[i].name === name) return DAYS[d].exercises[i];
      }
    }
    return null;
  }

  function metricOptionsFor(ex) {
    var fields = trackingFor(ex).map(function (f) {
      return { key: f.key, label: f.label, unit: f.unit };
    });
    var hasWeight = fields.some(function (f) { return f.key === "weight"; });
    var hasReps = fields.some(function (f) { return f.key === "repsDone"; });
    if (hasWeight && hasReps) fields.push({ key: "volume", label: "VOLUM", unit: "kg·rep" });
    return fields;
  }

  function numberOrNull(v) {
    if (v === "" || v == null) return null;
    var n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function metricValue(metricKey, sets) {
    var done = sets.filter(function (set) { return set.done; });
    if (!done.length) return null;
    if (metricKey === "volume") {
      var volume = done.reduce(function (sum, set) {
        var kg = numberOrNull(set.weight);
        var reps = numberOrNull(set.repsDone);
        return sum + ((kg != null && reps != null) ? kg * reps : 0);
      }, 0);
      return volume > 0 ? volume : null;
    }
    var vals = done.map(function (set) { return numberOrNull(set[metricKey]); }).filter(function (v) { return v != null; });
    if (!vals.length) return null;
    if (metricKey === "weight" || metricKey === "heightCm" || metricKey === "distanceCm" || metricKey === "seconds") return Math.max.apply(null, vals);
    if (metricKey === "rpe") return vals.reduce(function (a,b) { return a+b; }, 0) / vals.length;
    return vals.reduce(function (a,b) { return a+b; }, 0);
  }

  function formatMetricValue(value, unit) {
    if (value == null || !Number.isFinite(value)) return "—";
    var decimals = Math.abs(value - Math.round(value)) < 0.001 ? 0 : (Math.abs(value) < 10 ? 2 : 1);
    return value.toFixed(decimals) + (unit ? " " + unit : "");
  }

  function uniqueExerciseNames() {
    var seen = {};
    var names = [];
    DAYS.forEach(function (d) {
      d.exercises.forEach(function (ex) {
        if (!seen[ex.name]) { seen[ex.name] = true; names.push(ex.name); }
      });
    });
    read(KEY.history, []).forEach(function(session){
      (session.details||[]).forEach(function(detail){
        if(detail.name && !seen[detail.name]) { seen[detail.name]=true; names.push(detail.name); }
      });
    });
    return names;
  }


  const ATHLETE_TESTS = [
    { key:"cmj", label:"CMJ", unit:"cm", direction:"high" },
    { key:"broad", label:"Broad jump", unit:"cm", direction:"high" },
    { key:"slhopL", label:"Single-leg hop L", unit:"cm", direction:"high" },
    { key:"slhopR", label:"Single-leg hop R", unit:"cm", direction:"high" },
    { key:"sprint10", label:"Sprint 10 m", unit:"s", direction:"low" },
    { key:"sprint20", label:"Sprint 20 m", unit:"s", direction:"low" },
    { key:"505", label:"5-0-5 COD", unit:"s", direction:"low" }
  ];

  function bestExerciseMetric(history, exerciseName, metricKey, since, until) {
    var vals = [];
    history.forEach(function (session) {
      if (since && session.finishedAt < since) return;
      if (until && session.finishedAt >= until) return;
      if (!session.details) return;
      var detail = session.details.find(function (d) { return d.name === exerciseName; });
      if (!detail) return;
      var value = metricValue(metricKey, detail.sets || []);
      if (value != null) vals.push(value);
    });
    return vals.length ? Math.max.apply(null, vals) : null;
  }

  function pctDelta(nowValue, prevValue) {
    if (nowValue == null || prevValue == null || prevValue === 0) return null;
    return ((nowValue - prevValue) / Math.abs(prevValue)) * 100;
  }

  function renderHomeIntelligence() {
    var history = read(KEY.history, []);
    var knee = read(KEY.knee, []);
    var nowTs = Date.now(), d28 = 28*86400000, d56 = 56*86400000;
    var force = bestExerciseMetric(history, "Trap-Bar Deadlift", "weight", nowTs-d28, nowTs);
    var forcePrev = bestExerciseMetric(history, "Trap-Bar Deadlift", "weight", nowTs-d56, nowTs-d28);
    var spring = bestExerciseMetric(history, "Countermovement Jump", "heightCm", nowTs-d28, nowTs);
    var springPrev = bestExerciseMetric(history, "Countermovement Jump", "heightCm", nowTs-d56, nowTs-d28);
    var engine = bestExerciseMetric(history, "Run / Walk", "distanceKm", nowTs-d28, nowTs);
    var enginePrev = bestExerciseMetric(history, "Run / Walk", "distanceKm", nowTs-d56, nowTs-d28);
    var latestKnee = knee.length ? knee[0] : null;
    function tile(label, value, delta, sub) {
      return '<div class="score-tile"><small>'+label+'</small><strong>'+value+'</strong><span>' +
        (delta == null ? sub : ((delta>=0?"+":"")+delta.toFixed(1)+"% vs 4 setm.")) + '</span></div>';
    }
    E.athleteScorecard.innerHTML =
      tile("FORÇA", force==null?"—":formatMetricValue(force,"kg"), pctDelta(force,forcePrev), "Trap bar") +
      tile("SPRING", spring==null?"—":formatMetricValue(spring,"cm"), pctDelta(spring,springPrev), "CMJ") +
      tile("ENGINE", engine==null?"—":formatMetricValue(engine,"km"), pctDelta(engine,enginePrev), "Run / Walk") +
      tile("KNEE", latestKnee ? latestKnee.pain+"/10" : "—", null, latestKnee ? "confiança "+latestKnee.confidence+"/5" : "sense check-in");
    renderBlockWeek();
  }

  function renderBlockWeek() {
    var week = Math.max(1, Math.min(8, Number(read(KEY.blockWeek,1)) || 1));
    E.blockWeekPill.textContent = "BLOC 1 · SETMANA "+week+"/8";
    E.blockWeekLabel.textContent = "SETMANA "+week+" / 8";
    var note = week===4 ? "DELOAD: baixa volum ~20–30% i mantén qualitat." :
      week===8 ? "RETEST: compara força, spring, motor i genoll." :
      week<=2 ? "Construeix base i qualitat." :
      week<=6 ? "Progressa una variable cada vegada." : "Consolida abans del següent bloc.";
    E.blockWeekNote.textContent = note;
  }

  function changeBlockWeek(delta) {
    var week = Math.max(1, Math.min(8, Number(read(KEY.blockWeek,1)) + delta));
    write(KEY.blockWeek, week); renderBlockWeek();
  }

  function openReadiness() {
    if (active) { show("workout"); return; }
    E.readinessCard.hidden = false;
    E.readinessCard.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function closeReadiness() { E.readinessCard.hidden = true; }
  function readinessPayload() {
    return { at:Date.now(), dayId:selectedId, energy:Number(E.readyEnergy.value), sleep:Number(E.readySleep.value),
      pain:Number(E.readyPain.value), stiffness:Number(E.readyStiff.value), confidence:Number(E.readyConfidence.value) };
  }

  function detectPRs(session, previousHistory) {
    var prs=[];
    if (!session.details) return prs;
    session.details.forEach(function(detail){
      var ex=findExerciseByName(detail.name); if(!ex) return;
      metricOptionsFor(ex).filter(function(m){return m.key!=="rpe";}).forEach(function(metric){
        var current=metricValue(metric.key,detail.sets||[]); if(current==null) return;
        var previous=[];
        previousHistory.forEach(function(old){
          if(!old.details) return;
          var od=old.details.find(function(d){return d.name===detail.name;}); if(!od) return;
          var v=metricValue(metric.key,od.sets||[]); if(v!=null) previous.push(v);
        });
        if(previous.length && current>Math.max.apply(null,previous)){
          prs.push({exercise:detail.name,metric:metric.label,value:current,unit:metric.unit});
        }
      });
    });
    return prs;
  }

  function aggregateWindow(history, start, end) {
    var out={sessions:0,minutes:0,sets:0,volume:0,km:0};
    history.forEach(function(s){
      if(s.finishedAt<start||s.finishedAt>=end) return;
      out.sessions++; out.minutes+=(s.durationSec||0)/60; out.sets+=s.completedSets||0;
      (s.details||[]).forEach(function(d){
        out.volume += metricValue("volume",d.sets||[]) || 0;
        out.km += metricValue("distanceKm",d.sets||[]) || 0;
      });
    }); return out;
  }

  function renderWeekly(history) {
    var end=Date.now(), cur=aggregateWindow(history,end-7*86400000,end), prev=aggregateWindow(history,end-14*86400000,end-7*86400000);
    function item(label,key,unit){
      var c=cur[key],p=prev[key],delta=p?((c-p)/Math.abs(p))*100:null;
      return '<div class="weekly-item"><small>'+label+'</small><strong>'+ (key==="minutes"||key==="sets"||key==="sessions"?Math.round(c):c.toFixed(key==="km"?1:0)) +(unit||"")+'</strong><span>'+(delta==null?"sense comparativa":((delta>=0?"+":"")+delta.toFixed(0)+"% vs setmana anterior"))+'</span></div>';
    }
    E.weeklySummary.innerHTML=item("SESSIONS","sessions","")+item("MINUTS","minutes","")+item("SÈRIES","sets","")+item("KM","km"," km");
  }

  function renderPRs(history) {
    var rows=[];
    history.slice(0,20).forEach(function(s){(s.prs||[]).forEach(function(pr){rows.push({pr:pr,at:s.finishedAt});});});
    E.prFeed.innerHTML=rows.length?rows.slice(0,8).map(function(x){
      return '<div class="pr-row"><div><b>'+esc(x.pr.exercise)+'</b><small>'+new Date(x.at).toLocaleDateString("ca-ES",{day:"2-digit",month:"short"})+' · '+esc(x.pr.metric)+' '+formatMetricValue(x.pr.value,x.pr.unit)+'</small></div><span class="pr-badge">NEW PR</span></div>';
    }).join(""):'<div class="empty">Encara no hi ha PRs. El primer registre crea baseline; el següent ja pot batre rècord.</div>';
  }

  function currentGoalValue(goal, history) {
    var ex=findExerciseByName(goal.exercise); if(!ex) return null;
    var vals=[];
    history.forEach(function(s){if(!s.details)return;var d=s.details.find(function(x){return x.name===goal.exercise;});if(!d)return;var v=metricValue(goal.metric,d.sets||[]);if(v!=null)vals.push(v);});
    if(!vals.length)return null;
    return goal.direction==="low"?Math.min.apply(null,vals):Math.max.apply(null,vals);
  }
  function populateGoalMetrics() {
    var ex=findExerciseByName(E.goalExercise.value); if(!ex)return;
    E.goalMetric.innerHTML=metricOptionsFor(ex).filter(function(m){return m.key!=="rpe";}).map(function(m){return '<option value="'+m.key+'" data-unit="'+esc(m.unit)+'">'+esc(m.label)+(m.unit?" ("+esc(m.unit)+")":"")+'</option>';}).join("");
  }
  function renderGoals(history) {
    var goals=read(KEY.goals,[]);
    E.goalList.innerHTML=goals.length?goals.map(function(g){
      var current=currentGoalValue(g,history), reached=current!=null&&(g.direction==="low"?current<=g.target:current>=g.target);
      var pct=current==null?0:(g.direction==="low"?(g.target/current)*100:(current/g.target)*100); pct=Math.max(0,Math.min(100,pct));
      var ex=findExerciseByName(g.exercise), metric=ex?metricOptionsFor(ex).find(function(m){return m.key===g.metric;}):null, unit=metric?metric.unit:"";
      return '<div class="goal-row"><div class="goal-top"><b>'+esc(g.exercise)+' · '+esc(metric?metric.label:g.metric)+'</b><strong>'+formatMetricValue(g.target,unit)+'</strong></div><div class="goal-progress"><i style="width:'+pct.toFixed(0)+'%"></i></div><small>'+(current==null?"sense dades":"actual "+formatMetricValue(current,unit))+(reached?" · OBJECTIU ASSOLIT":"")+'</small><button data-delete-goal="'+esc(g.id)+'">ESBORRAR</button></div>';
    }).join(""):'<div class="empty">Afegeix objectius mesurables per veure el progrés cap al target.</div>';
    Array.from(E.goalList.querySelectorAll("[data-delete-goal]")).forEach(function(btn){btn.addEventListener("click",function(){
      write(KEY.goals,read(KEY.goals,[]).filter(function(g){return g.id!==btn.getAttribute("data-delete-goal");}));renderGoals(history);
    });});
  }

  function renderTests() {
    var tests=read(KEY.tests,[]);
    E.testType.innerHTML=ATHLETE_TESTS.map(function(t){return '<option value="'+t.key+'">'+t.label+' ('+t.unit+')</option>';}).join("");
    var grouped={};tests.forEach(function(x){(grouped[x.type]||(grouped[x.type]=[])).push(x);});
    var rows=ATHLETE_TESTS.map(function(cfg){
      var arr=grouped[cfg.key]||[]; if(!arr.length)return "";
      var vals=arr.map(function(x){return x.value;}); var best=cfg.direction==="low"?Math.min.apply(null,vals):Math.max.apply(null,vals);
      var latest=arr.slice().sort(function(a,b){return b.at-a.at;})[0];
      return '<div class="test-row"><b>'+cfg.label+'</b><span>últim '+formatMetricValue(latest.value,cfg.unit)+'</span><strong>best '+formatMetricValue(best,cfg.unit)+'</strong></div>';
    }).filter(Boolean);
    E.testSummary.innerHTML=rows.length?rows.join(""):'<div class="empty">Sense tests encara. Guarda un baseline i repeteix-lo cada bloc.</div>';
  }


  function tempoFor(ex) {
    var n=ex.name.toLowerCase();
    if (n.indexOf("bike")>=0 || n.indexOf("rower")>=0 || n.indexOf("run / walk")>=0 || n.indexOf("carry")>=0 ||
        n.indexOf("sled")>=0 || n.indexOf("jump")>=0 || n.indexOf("pogos")>=0 || n.indexOf("bound")>=0 ||
        n.indexOf("throw")>=0 || n.indexOf("slam")>=0 || n.indexOf("acceleration")>=0 || n.indexOf("shuffle")>=0) return null;
    if (n.indexOf("plank")>=0) return null;
    return { down: n.indexOf("step-down")>=0 || n.indexOf("leg extension")>=0 || n.indexOf("nordic")>=0 || n.indexOf("rdl")>=0 ? 3 : 2, up:1 };
  }

  var tempoState={running:false,phase:"down",remaining:3,down:3,up:1,timer:null,audio:null};

  function tempoBeep(strong) {
    try {
      var AC=window.AudioContext||window.webkitAudioContext;
      if(!AC) return;
      if(!tempoState.audio) tempoState.audio=new AC();
      var ctx=tempoState.audio;
      if(ctx.state==="suspended") ctx.resume();
      var osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.frequency.value=strong?760:520;
      gain.gain.setValueAtTime(.035,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.06);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+.065);
    } catch(e){}
  }

  function paintTempo() {
    E.tempoPhase.textContent=tempoState.phase==="down"?"BAIXA":"PUJA";
    E.tempoCount.textContent=String(tempoState.remaining);
    E.tempoStart.textContent=tempoState.running?"PAUSA":"START";
    E.tempoDock.classList.add("visible");
  }

  function tempoTick() {
    if(!tempoState.running) return;
    tempoState.remaining-=1;
    if(tempoState.remaining<=0){
      tempoState.phase=tempoState.phase==="down"?"up":"down";
      tempoState.remaining=tempoState.phase==="down"?tempoState.down:tempoState.up;
      tempoBeep(true);
      try{if(navigator.vibrate)navigator.vibrate(30);}catch(e){}
    } else tempoBeep(false);
    paintTempo();
  }

  function openTempo(down,up) {
    clearInterval(tempoState.timer);
    tempoState.down=down; tempoState.up=up; tempoState.phase="down"; tempoState.remaining=down; tempoState.running=true;
    paintTempo(); tempoBeep(true);
    tempoState.timer=setInterval(tempoTick,1000);
  }
  function toggleTempo() {
    tempoState.running=!tempoState.running;
    if(tempoState.running && !tempoState.timer) tempoState.timer=setInterval(tempoTick,1000);
    paintTempo();
  }
  function closeTempo() {
    tempoState.running=false; clearInterval(tempoState.timer); tempoState.timer=null; E.tempoDock.classList.remove("visible");
  }

  function mondayStart(ts) {
    var d=new Date(ts||Date.now()); d.setHours(0,0,0,0);
    var day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); return d.getTime();
  }
  function weeklyWindow() {
    var start=mondayStart(Date.now()); return {start:start,end:start+7*86400000};
  }
  function weekLabel(start) {
    var a=new Date(start), b=new Date(start+6*86400000);
    return a.toLocaleDateString("ca-ES",{day:"2-digit",month:"short"})+" – "+b.toLocaleDateString("ca-ES",{day:"2-digit",month:"short"});
  }

  function renderWeeklyReview() {
    var w=weeklyWindow(), reviews=read(KEY.weeklyReviews,[]);
    E.weeklyReviewWeek.textContent=weekLabel(w.start);
    var current=reviews.find(function(r){return r.weekStart===w.start;});
    if(current){
      E.weeklyKneePain.value=current.kneePain; E.weeklyKneeStiff.value=current.kneeStiff;
      E.weeklyConfidence.value=current.confidence; E.weeklyFatigue.value=current.fatigue; E.weeklyNotes.value=current.notes||"";
    }
    E.weeklyReviewHistory.innerHTML=reviews.length?reviews.slice(0,6).map(function(r){
      return '<div class="weekly-review-row"><b>'+esc(weekLabel(r.weekStart))+'</b><span>dolor '+r.kneePain+'/10 · confiança '+r.confidence+'/5 · fatiga '+r.fatigue+'/5</span></div>';
    }).join(""):'';
  }

  function saveWeeklyReviewData() {
    var w=weeklyWindow(), reviews=read(KEY.weeklyReviews,[]);
    var item={weekStart:w.start,savedAt:Date.now(),kneePain:Number(E.weeklyKneePain.value||0),kneeStiff:Number(E.weeklyKneeStiff.value||0),
      confidence:Number(E.weeklyConfidence.value||0),fatigue:Number(E.weeklyFatigue.value||0),notes:E.weeklyNotes.value.trim()};
    var idx=reviews.findIndex(function(r){return r.weekStart===w.start;});
    if(idx>=0) reviews[idx]=item; else reviews.unshift(item);
    reviews.sort(function(a,b){return b.weekStart-a.weekStart;}); write(KEY.weeklyReviews,reviews.slice(0,52));
    renderWeeklyReview();
    E.saveWeeklyReview.textContent="GUARDAT ✓";
    setTimeout(function(){E.saveWeeklyReview.textContent="GUARDAR SETMANA";},1200);
  }

  function setDetailsText(detail) {
    var ex=findExerciseByName(detail.name) || {name:detail.name}, fields=trackingFor(ex);
    var done=(detail.sets||[]).filter(function(set){return set.done;});
    if(!done.length) return "";
    var rows=done.map(function(set,idx){
      var vals=fields.map(function(field){
        var v=numberOrNull(set[field.key]); return v==null?null:field.label+" "+v+(field.unit?" "+field.unit:"");
      }).filter(Boolean);
      return "S"+(idx+1)+": "+(vals.length?vals.join(", "):"fet");
    });
    return detail.name+" — "+rows.join(" | ");
  }

  function buildWeeklySummaryText() {
    var w=weeklyWindow(), history=read(KEY.history,[]).filter(function(x){return x.finishedAt>=w.start&&x.finishedAt<w.end;});
    var reviews=read(KEY.weeklyReviews,[]), review=reviews.find(function(r){return r.weekStart===w.start;});
    var knees=read(KEY.knee,[]).filter(function(x){return x.at>=w.start&&x.at<w.end;});
    var lines=["OLYMPUS ATHLETE — WEEKLY REVIEW",weekLabel(w.start),"","SESSIONS: "+history.length];
    var mins=Math.round(history.reduce(function(a,x){return a+(x.durationSec||0);},0)/60);
    lines.push("TOTAL MIN: "+mins);
    history.slice().reverse().forEach(function(session){
      var day=getDay(session.dayId);
      lines.push("","["+new Date(session.finishedAt).toLocaleDateString("ca-ES",{weekday:"short",day:"2-digit",month:"2-digit"})+"] "+day.title+
        " — "+Math.round((session.durationSec||0)/60)+" min"+(session.recovered?" — SESSIÓ RECUPERADA (sense detall de sets/RPE)":" — RPE "+Number(session.avgRpe||0).toFixed(1)+" — "+(session.completedSets||0)+" sets"));
      if(session.readiness) lines.push("Readiness: energia "+session.readiness.energy+"/5, son "+session.readiness.sleep+"/5, dolor "+session.readiness.pain+"/10, rigidesa "+session.readiness.stiffness+"/3, confiança "+session.readiness.confidence+"/5");
      (session.details||[]).forEach(function(d){var t=setDetailsText(d);if(t)lines.push("• "+t);});
      (session.prs||[]).forEach(function(pr){lines.push("PR: "+pr.exercise+" — "+pr.metric+" "+formatMetricValue(pr.value,pr.unit));});
    });
    if(knees.length){
      lines.push("","CHECK-INS GENOLL:");
      knees.slice().reverse().forEach(function(k){lines.push("• dolor "+k.pain+"/10, rigidesa "+k.stiffness+"/3, confiança "+k.confidence+"/5"+(k.note?" — "+k.note:""));});
    }
    if(review){
      lines.push("","FEEDBACK SETMANAL:");
      lines.push("Dolor: "+review.kneePain+"/10 | Rigidesa/inflor: "+review.kneeStiff+"/3 | Confiança: "+review.confidence+"/5 | Fatiga: "+review.fatigue+"/5");
      if(review.notes) lines.push("Notes: "+review.notes);
    }
    lines.push("","Analitza la progressió de càrrega/rendiment, la resposta del genoll i si convé ajustar volum, intensitat o exercicis la setmana següent. No assumeixis que dolor o sorolls impliquen una lesió concreta.");
    return lines.join("\n");
  }

  function copyWeeklySummaryText() {
    var text=buildWeeklySummaryText();
    function ok(){E.copyWeeklySummary.textContent="COPIAT ✓";setTimeout(function(){E.copyWeeklySummary.textContent="COPIAR RESUM PER CHATGPT";},1500);}
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok).catch(function(){fallbackCopy(text);});
    else fallbackCopy(text);
    function fallbackCopy(value){
      var ta=document.createElement("textarea");ta.value=value;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
      try{document.execCommand("copy");ok();}catch(e){} document.body.removeChild(ta);
    }
  }

  function exportBackup() {
    var payload = {
      exportedAt: new Date().toISOString(),
      version: "olympus-official-v60",
      history: read(KEY.history, []),
      knee: read(KEY.knee, []),
      readiness: read(KEY.readiness, []),
      plans: read(KEY.plans, []),
      goals: read(KEY.goals, []),
      tests: read(KEY.tests, []),
      weeklyReviews: read(KEY.weeklyReviews, []),
      blockWeek: read(KEY.blockWeek, 1)
    };
    var blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "olympus-athlete-backup-" + dateKey(Date.now()) + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(url);},500);
    E.exportData.textContent="EXPORTAT ✓";
    setTimeout(function(){E.exportData.textContent="BACKUP";},1500);
  }





  var selectedId = read(KEY.selected, "day1");
  var active = read(KEY.active, null);
  var elapsedTick = null;
  var restTick = null;
  var basePlanOpen = false;

  var now = new Date();
  var calendarYear = now.getFullYear();
  var calendarMonth = now.getMonth();
  var selectedCalendarDate = dateKey(now.getTime());
  var editingSessionId = null;
  var editingSessionDraft = null;
  var expandedSessionId = null;

  var expandedPlanId = null;
  var editingPlanId = null;
  var selectedStatExercise = uniqueExerciseNames()[0] || "";
  var selectedStatMetric = "";

  function renderPlan() {
    E.dayGrid.innerHTML = DAYS.map(function (d) {
      return '<button class="day-card ' + (d.id === selectedId ? 'selected' : '') + '" data-day="' + d.id + '" data-tone="' + d.tone + '">' +
        '<span class="num">DAY ' + d.num + '</span><h3>' + esc(d.title) + '</h3><p>' + esc(d.subtitle) + '</p></button>';
    }).join("");

    Array.from(E.dayGrid.querySelectorAll("[data-day]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedId = btn.getAttribute("data-day");
        write(KEY.selected, selectedId);
        basePlanOpen = false;
        renderPlan();
      });
    });

    var d = getDay(selectedId);
    E.selectedNum.textContent = "DAY " + d.num;
    E.selectedTitle.textContent = d.title;
    E.selectedSubtitle.textContent = d.subtitle;
    E.viewSelected.textContent = basePlanOpen ? "TANCAR PLA" : "VEURE PLA";
    renderBasePlanDetail();
    renderHomeIntelligence();
  }

  function renderBasePlanDetail() {
    E.basePlanDetail.hidden = !basePlanOpen;
    if (!basePlanOpen) return;
    var day = getDay(selectedId);
    var blocks = ["GENOLL + CAMA", "COS SENCER", "MOTOR"];
    E.basePlanDetail.innerHTML = '<h3>' + esc(day.title) + '</h3>' + blocks.map(function (block) {
      var items = day.exercises.filter(function (ex) { return ex.block === block; });
      if (!items.length) return "";
      return '<div class="plan-block"><div class="plan-block-title">' + block + '</div>' +
        items.map(function (ex) {
          return '<div class="plan-exercise"><span>' + esc(ex.name) + '</span><span>' + esc(ex.sets + " × " + ex.reps) + '</span></div>';
        }).join("") + '</div>';
    }).join("");
  }

  function newSession(readiness) {
    if (active) { show("workout"); return; }
    var d = getDay(selectedId);
    if (readiness) {
      var readinessItems=read(KEY.readiness,[]); readinessItems.unshift(readiness); write(KEY.readiness,readinessItems.slice(0,100));
    }
    active = {
      id: uid(), dayId: d.id, startedAt: Date.now(), readiness: readiness || null, restEnd: 0, restPaused: false, restRemaining: 0,
      sets: d.exercises.reduce(function (all, ex, exerciseIndex) {
        for (var i = 0; i < ex.sets; i++) all.push({ exerciseIndex: exerciseIndex, setIndex: i, weight: "", repsDone: "", rpe: "", heightCm: "", distanceCm: "", distanceM: "", distanceKm: "", timeMin: "", seconds: "", done: false });
        return all;
      }, [])
    };
    closeReadiness();
    write(KEY.active, active);
    renderWorkout(); startElapsed(); show("workout");
  }

  function cancelActiveSession() {
    if (!active) return;
    if (E.cancelSession.dataset.confirm !== "1") {
      E.cancelSession.dataset.confirm = "1";
      E.cancelSession.textContent = "TOCA DE NOU PER DESCARTAR";
      setTimeout(function () {
        if (E.cancelSession && E.cancelSession.dataset.confirm === "1") {
          E.cancelSession.dataset.confirm = "0";
          E.cancelSession.textContent = "CANCEL·LAR I DESCARTAR";
        }
      }, 3500);
      return;
    }
    E.cancelSession.dataset.confirm = "0";
    E.cancelSession.textContent = "CANCEL·LAR I DESCARTAR";
    active = null;
    remove(KEY.active);
    clearInterval(elapsedTick);
    clearInterval(restTick);
    renderWorkout();
    show("plan");
  }

  function startElapsed() {
    clearInterval(elapsedTick);
    if (!active) return;
    function paint() {
      var sec = Math.max(0, (Date.now() - active.startedAt) / 1000);
      var min = sec / 60;
      E.elapsed.textContent = formatTime(sec);
      if (E.sessionPaceLabel) {
        if (min < 30) E.sessionPaceLabel.textContent = "GENOLL · intenta arribar a força abans de 30'";
        else if (min < 65) E.sessionPaceLabel.textContent = "FORÇA · cardio idealment abans de 65'";
        else if (min < 90) E.sessionPaceLabel.textContent = "CARDIO · vas dins del target de 90'";
        else E.sessionPaceLabel.textContent = "OVER 90' · acaba el bloc actual i retalla accessoris";
      }
    }
    paint();
    elapsedTick = setInterval(paint, 1000);
  }

  function renderWorkout() {
    if (!active) {
      E.workoutNum.textContent = "";
      E.workoutTitle.textContent = "Cap sessió activa";
      E.elapsed.textContent = "00:00";
      E.progress.style.width = "0%";
      E.workoutContent.innerHTML = '<div class="empty">Torna a PLA i inicia un dels quatre dies.</div>';
      E.finishCard.hidden = true;
      renderRest();
      return;
    }

    var day = getDay(active.dayId);
    E.workoutNum.textContent = "DAY " + day.num;
    E.workoutTitle.textContent = day.title;
    E.finishCard.hidden = false;

    var blocks = ["GENOLL + CAMA", "COS SENCER", "MOTOR"];
    E.workoutContent.innerHTML = blocks.map(function (block) {
      var body = day.exercises
        .map(function (ex, exIndex) { return { ex: ex, exIndex: exIndex }; })
        .filter(function (x) { return x.ex.block === block; })
        .map(function (x) {
          var logs = active.sets.filter(function (s) { return s.exerciseIndex === x.exIndex; });
          var q = encodeURIComponent(x.ex.name + " exercise technique");
          var fields = trackingFor(x.ex);
          var rows = logs.map(function (s) {
            var inputs = fields.map(function (field) {
              var value = s[field.key] == null ? "" : s[field.key];
              var maxAttr = field.max ? ' max="' + field.max + '"' : '';
              return '<label>' + field.label + '<input class="metric-input" data-key="' + field.key + '" type="number" inputmode="decimal" min="0"' + maxAttr + ' step="' + field.step + '" value="' + esc(value) + '"></label>';
            }).join("");
            return '<div class="set-row metric-row ' + (s.done ? 'done' : '') + '" style="--metric-count:' + fields.length + '" data-ex="' + x.exIndex + '" data-set="' + s.setIndex + '">' +
              '<span class="set-index">S' + (s.setIndex + 1) + '</span>' + inputs +
              '<button class="set-done">' + (s.done ? '✓' : 'FET') + '</button></div>';
          }).join("");
          var tempo=tempoFor(x.ex);
          return '<article class="exercise"><h3>' + esc(x.ex.name) + '</h3>' +
            '<div class="dose">' + esc(x.ex.sets + " × " + x.ex.reps + (x.ex.rest ? " · descans " + x.ex.rest + "s" : "")) + '</div>' +
            '<p class="cue">' + esc(x.ex.cue) + '</p>' +
            (tempo?'<button class="tempo-btn" data-tempo-down="'+tempo.down+'" data-tempo-up="'+tempo.up+'">TEMPO '+tempo.down+'↓ · '+tempo.up+'↑</button>':'') +
            '<div class="set-list">' + rows + '</div>' +
            '<a class="video-link" target="_blank" rel="noreferrer" href="https://www.youtube.com/results?search_query=' + q + '">VÍDEO TÈCNIC ↗</a></article>';
        }).join("");
      return body ? '<section class="block"><div class="block-title">' + block + '</div>' + body + '</section>' : "";
    }).join("");

    Array.from(E.workoutContent.querySelectorAll(".tempo-btn")).forEach(function(btn){
      btn.addEventListener("click",function(){openTempo(Number(btn.getAttribute("data-tempo-down")),Number(btn.getAttribute("data-tempo-up")));});
    });
    Array.from(E.workoutContent.querySelectorAll(".set-row")).forEach(function (row) {
      var exIndex = Number(row.getAttribute("data-ex"));
      var setIndex = Number(row.getAttribute("data-set"));
      var log = active.sets.find(function (s) { return s.exerciseIndex === exIndex && s.setIndex === setIndex; });
      Array.from(row.querySelectorAll(".metric-input")).forEach(function (input) {
        input.addEventListener("input", function (ev) {
          log[input.getAttribute("data-key")] = ev.target.value;
          write(KEY.active, active);
        });
      });
      row.querySelector(".set-done").addEventListener("click", function () {
        log.done = !log.done;
        if (log.done) startRest(day.exercises[exIndex].rest);
        write(KEY.active, active);
        renderWorkout();
      });
    });

    var done = active.sets.filter(function (s) { return s.done; }).length;
    E.progress.style.width = Math.round(done / active.sets.length * 100) + "%";
    renderRest();
  }

  function finishSession() {
    if (!active) return;
    var rpes = active.sets.map(function (s) { return Number(s.rpe); }).filter(function (n) { return Number.isFinite(n) && n > 0; });
    var history = read(KEY.history, []);
    var session = {
      id: active.id, dayId: active.dayId, startedAt: active.startedAt, finishedAt: Date.now(), readiness: active.readiness || null,
      durationSec: Math.max(0, Math.floor((Date.now() - active.startedAt) / 1000)),
      completedSets: active.sets.filter(function (s) { return s.done; }).length,
      avgRpe: rpes.length ? rpes.reduce(function (a, b) { return a + b; }, 0) / rpes.length : 0,
      details: getDay(active.dayId).exercises.map(function (ex, exerciseIndex) {
        return { name: ex.name, block: ex.block, sets: active.sets.filter(function (set) { return set.exerciseIndex === exerciseIndex; }).map(function (set) {
          return { done:!!set.done, weight:set.weight||"", repsDone:set.repsDone||"", rpe:set.rpe||"", heightCm:set.heightCm||"", distanceCm:set.distanceCm||"", distanceM:set.distanceM||"", distanceKm:set.distanceKm||"", timeMin:set.timeMin||"", seconds:set.seconds||"" };
        })};
      })
    };
    session.prs = detectPRs(session, history);
    history.unshift(session); write(KEY.history, history.slice(0, 100));
    active = null; remove(KEY.active); clearInterval(elapsedTick); clearInterval(restTick);
    renderWorkout(); renderProgress(); renderHomeIntelligence();
    selectedCalendarDate = dateKey(Date.now()); calendarYear = new Date().getFullYear(); calendarMonth = new Date().getMonth();
    renderCalendar(); show("calendar");
  }

  function startRest(seconds) {
    if (!active || !seconds) return;
    active.restEnd = Date.now() + seconds * 1000;
    active.restPaused = false;
    active.restRemaining = seconds;
    write(KEY.active, active);
    scheduleRest();
    renderRest();
  }
  function scheduleRest() {
    clearInterval(restTick);
    if (!active) return;
    restTick = setInterval(function () {
      if (!active || active.restPaused) return;
      if (active.restEnd && Date.now() >= active.restEnd) {
        active.restEnd = 0;
        active.restRemaining = 0;
        write(KEY.active, active);
        clearInterval(restTick);
      }
      renderRest();
    }, 250);
  }
  function restSeconds() {
    if (!active) return 0;
    if (active.restPaused) return Math.max(0, active.restRemaining || 0);
    if (!active.restEnd) return 0;
    return Math.max(0, Math.ceil((active.restEnd - Date.now()) / 1000));
  }
  function renderRest() {
    var seconds = restSeconds();
    E.restDock.classList.toggle("visible", seconds > 0);
    E.restTime.textContent = formatTime(seconds);
    E.restPause.textContent = active && active.restPaused ? "START" : "PAUSA";
  }
  function toggleRestPause() {
    if (!active || restSeconds() <= 0) return;
    if (active.restPaused) {
      active.restPaused = false;
      active.restEnd = Date.now() + active.restRemaining * 1000;
    } else {
      active.restRemaining = restSeconds();
      active.restPaused = true;
      active.restEnd = 0;
    }
    write(KEY.active, active);
    scheduleRest();
    renderRest();
  }
  function closeRest() {
    if (!active) return;
    active.restEnd = 0;
    active.restRemaining = 0;
    active.restPaused = false;
    write(KEY.active, active);
    clearInterval(restTick);
    renderRest();
  }

  function renderCalendar() {
    var history = read(KEY.history, []);
    var monthDate = new Date(calendarYear, calendarMonth, 1);
    E.calTitle.textContent = monthDate.toLocaleDateString("ca-ES", { month: "long", year: "numeric" });

    var firstDay = (monthDate.getDay() + 6) % 7;
    var daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    var prevDays = new Date(calendarYear, calendarMonth, 0).getDate();
    var cells = [];

    for (var i = 0; i < 42; i++) {
      var dayNum, cellMonth, cellYear, muted = false;
      if (i < firstDay) {
        dayNum = prevDays - firstDay + i + 1;
        cellMonth = calendarMonth - 1;
        cellYear = calendarYear;
        muted = true;
      } else if (i >= firstDay + daysInMonth) {
        dayNum = i - firstDay - daysInMonth + 1;
        cellMonth = calendarMonth + 1;
        cellYear = calendarYear;
        muted = true;
      } else {
        dayNum = i - firstDay + 1;
        cellMonth = calendarMonth;
        cellYear = calendarYear;
      }
      var d = new Date(cellYear, cellMonth, dayNum, 12, 0, 0, 0);
      var key = dateKey(d.getTime());
      var count = history.filter(function (s) { return dateKey(s.finishedAt) === key; }).length;
      var cls = "calendar-cell" + (muted ? " muted" : "") + (key === dateKey(Date.now()) ? " today" : "") + (key === selectedCalendarDate ? " selected" : "");
      cells.push('<button class="' + cls + '" data-date="' + key + '"><span>' + d.getDate() + '</span>' + (count ? '<span class="count">' + count + '</span>' : '') + '</button>');
    }

    E.calGrid.innerHTML = cells.join("");
    Array.from(E.calGrid.querySelectorAll("[data-date]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedCalendarDate = btn.getAttribute("data-date");
        var d = new Date(parseDateInput(selectedCalendarDate));
        calendarYear = d.getFullYear();
        calendarMonth = d.getMonth();
        editingSessionId = null;
        expandedSessionId = null;
        E.sessionEditor.hidden = true;
        renderCalendar();
      });
    });
    renderCalendarDay();
  }

  function sessionDetailHTML(session) {
    if (!session.details || !session.details.length) {
      return '<div class="session-detail-empty">No hi ha detall per exercici guardat en aquesta sessió.</div>';
    }
    var fieldMeta = [
      ["weight","KG","kg"],["repsDone","REPS",""],["rpe","RPE",""],["heightCm","ALTURA","cm"],
      ["distanceCm","DIST","cm"],["distanceM","DIST","m"],["distanceKm","DIST","km"],
      ["timeMin","TEMPS","min"],["seconds","TEMPS","s"]
    ];
    var groups = session.details.map(function(detail){
      var visibleSets=(detail.sets||[]).map(function(set,idx){
        var vals=fieldMeta.map(function(meta){
          var raw=set[meta[0]];
          if(raw===""||raw==null) return null;
          return '<span><small>'+meta[1]+'</small><b>'+esc(raw)+(meta[2]?' '+meta[2]:'')+'</b></span>';
        }).filter(Boolean);
        if(!vals.length && !set.done) return "";
        return '<div class="saved-set '+(set.done?'done':'')+'"><em>S'+(idx+1)+'</em>'+vals.join("")+'<i>'+(set.done?'FET':'NO MARCAT')+'</i></div>';
      }).filter(Boolean).join("");
      if(!visibleSets) return "";
      return '<section class="saved-exercise"><div class="saved-exercise-head"><b>'+esc(detail.name)+'</b><span>'+esc(detail.block||"")+'</span></div>'+visibleSets+'</section>';
    }).filter(Boolean).join("");

    var readiness = session.readiness ? '<div class="saved-readiness"><b>READINESS</b><span>energia '+session.readiness.energy+'/5</span><span>son '+session.readiness.sleep+'/5</span><span>dolor '+session.readiness.pain+'/10</span><span>rigidesa '+session.readiness.stiffness+'/3</span><span>confiança '+session.readiness.confidence+'/5</span></div>' : '';
    var prs = (session.prs||[]).length ? '<div class="saved-prs">'+session.prs.map(function(pr){return '<span>PR · '+esc(pr.exercise)+' · '+esc(pr.metric)+' '+formatMetricValue(pr.value,pr.unit)+'</span>';}).join("")+'</div>' : '';
    return readiness + groups + prs || '<div class="session-detail-empty">No hi ha valors introduïts per exercici en aquesta sessió.</div>';
  }

  function renderCalendarDay() {
    var history = read(KEY.history, []);
    var sessions = history.filter(function (s) { return dateKey(s.finishedAt) === selectedCalendarDate; });
    E.calDayTitle.textContent = formatDayLong(selectedCalendarDate);
    E.calDayCount.textContent = sessions.length ? sessions.length + (sessions.length === 1 ? " entreno" : " entrenos") : "cap entreno";
    E.calSessions.innerHTML = sessions.length ? sessions.map(function (s) {
      var day = getDay(s.dayId);
      var meta = s.recovered
        ? Math.round((s.durationSec || 0) / 60) + ' min · SESSIÓ RECUPERADA'
        : Math.round((s.durationSec || 0) / 60) + ' min · RPE ' + Number(s.avgRpe || 0).toFixed(1) + ' · ' + Number(s.completedSets || 0) + ' sets';
      var open = expandedSessionId === s.id;
      return '<article class="calendar-session-card"><div class="calendar-session"><div><h3>' + esc(day.title) + '</h3><p>' + meta + '</p></div>' +
        '<div class="calendar-session-actions"><button data-view-session="' + esc(s.id) + '">' + (open ? 'TANCAR' : 'DADES') + '</button><button data-edit-session="' + esc(s.id) + '">EDITA</button></div></div>' +
        (open ? '<div class="saved-session-detail">' + sessionDetailHTML(s) + '</div>' : '') + '</article>';
    }).join("") : '<div class="empty">No hi ha cap entreno guardat aquest dia.</div>';

    Array.from(E.calSessions.querySelectorAll("[data-view-session]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id=btn.getAttribute("data-view-session");
        expandedSessionId = expandedSessionId===id ? null : id;
        renderCalendarDay();
      });
    });
    Array.from(E.calSessions.querySelectorAll("[data-edit-session]")).forEach(function (btn) {
      btn.addEventListener("click", function () { openSessionEditor(btn.getAttribute("data-edit-session")); });
    });
  }

  function blankSavedSet() {
    return { done:false, weight:"", repsDone:"", rpe:"", heightCm:"", distanceCm:"", distanceM:"", distanceKm:"", timeMin:"", seconds:"" };
  }

  function sessionDetailsDraft(session) {
    if (Array.isArray(session.details) && session.details.length) {
      return JSON.parse(JSON.stringify(session.details));
    }
    var day=getDay(session.dayId);
    return day.exercises.map(function(ex){
      var sets=[];
      for(var i=0;i<ex.sets;i++) sets.push(blankSavedSet());
      return {name:ex.name,block:ex.block,sets:sets};
    });
  }

  function editorTrackingFor(detail) {
    var ex=findExerciseByName(detail.name) || {name:detail.name};
    return trackingFor(ex);
  }

  function renderSessionPhysicalEditor() {
    if (!editingSessionDraft) {
      E.editSessionDetails.innerHTML="";
      return;
    }
    E.editSessionDetails.innerHTML = editingSessionDraft.map(function(detail,di){
      var fields=editorTrackingFor(detail);
      var setRows=(detail.sets||[]).map(function(set,si){
        var inputs=fields.map(function(field){
          var value=set[field.key]==null?"":set[field.key];
          var maxAttr=field.max?' max="'+field.max+'"':'';
          return '<label>'+esc(field.label)+'<input class="edit-detail-input" data-detail="'+di+'" data-set="'+si+'" data-key="'+field.key+'" type="number" inputmode="decimal" min="0"'+maxAttr+' step="'+field.step+'" value="'+esc(value)+'"></label>';
        }).join("");
        return '<div class="edit-saved-set" style="--edit-field-count:'+fields.length+'">'+
          '<span class="set-index">S'+(si+1)+'</span>'+inputs+
          '<label class="edit-done-label"><input class="edit-detail-done" data-detail="'+di+'" data-set="'+si+'" type="checkbox" '+(set.done?'checked':'')+'><span>FET</span></label>'+
          '<button type="button" class="edit-remove-set" data-detail="'+di+'" data-set="'+si+'" aria-label="Eliminar sèrie">×</button>'+
        '</div>';
      }).join("");
      return '<article class="edit-exercise-card" data-edit-name="'+esc(detail.name)+'" data-edit-block="'+esc(detail.block||"")+'">'+
        '<div class="edit-exercise-head"><div><small>'+esc(detail.block||"")+'</small><h5>'+esc(detail.name)+'</h5></div><button type="button" data-remove-edit-exercise="'+di+'">TREURE</button></div>'+
        '<div class="edit-set-list">'+setRows+'</div>'+
        '<button type="button" class="edit-add-set" data-add-edit-set="'+di+'">+ SÈRIE</button>'+
      '</article>';
    }).join("");

    Array.from(E.editSessionDetails.querySelectorAll(".edit-detail-input")).forEach(function(input){
      input.addEventListener("input",function(){
        var di=Number(input.getAttribute("data-detail")), si=Number(input.getAttribute("data-set")), key=input.getAttribute("data-key");
        editingSessionDraft[di].sets[si][key]=input.value;
      });
    });
    Array.from(E.editSessionDetails.querySelectorAll(".edit-detail-done")).forEach(function(input){
      input.addEventListener("change",function(){
        var di=Number(input.getAttribute("data-detail")), si=Number(input.getAttribute("data-set"));
        editingSessionDraft[di].sets[si].done=!!input.checked;
      });
    });
    Array.from(E.editSessionDetails.querySelectorAll("[data-add-edit-set]")).forEach(function(btn){
      btn.addEventListener("click",function(){
        var di=Number(btn.getAttribute("data-add-edit-set"));
        editingSessionDraft[di].sets.push(blankSavedSet());
        renderSessionPhysicalEditor();
      });
    });
    Array.from(E.editSessionDetails.querySelectorAll(".edit-remove-set")).forEach(function(btn){
      btn.addEventListener("click",function(){
        var di=Number(btn.getAttribute("data-detail")), si=Number(btn.getAttribute("data-set"));
        editingSessionDraft[di].sets.splice(si,1);
        renderSessionPhysicalEditor();
      });
    });
    Array.from(E.editSessionDetails.querySelectorAll("[data-remove-edit-exercise]")).forEach(function(btn){
      btn.addEventListener("click",function(){
        editingSessionDraft.splice(Number(btn.getAttribute("data-remove-edit-exercise")),1);
        renderSessionPhysicalEditor();
      });
    });
  }

  function addExerciseToSessionEditor() {
    if (!editingSessionDraft) return;
    var name=E.editNewExerciseName.value.trim();
    if(!name){E.editNewExerciseName.focus();return;}
    var count=Math.max(1,Math.min(20,Number(E.editNewExerciseSets.value)||1));
    var sets=[]; for(var i=0;i<count;i++) sets.push(blankSavedSet());
    editingSessionDraft.push({name:name,block:E.editNewExerciseBlock.value,sets:sets});
    E.editNewExerciseName.value="";
    E.editNewExerciseSets.value="3";
    renderSessionPhysicalEditor();
    var cards=E.editSessionDetails.querySelectorAll(".edit-exercise-card");
    if(cards.length) cards[cards.length-1].scrollIntoView({behavior:"smooth",block:"center"});
  }

  function openSessionEditor(id) {
    var history = read(KEY.history, []);
    var session = history.find(function (s) { return s.id === id; });
    if (!session) return;
    editingSessionId = id;
    editingSessionDraft = sessionDetailsDraft(session);
    E.deleteSession.dataset.confirm = "0";
    E.deleteSession.textContent = "ESBORRAR";
    E.editorSessionTitle.textContent = getDay(session.dayId).title;
    E.editDate.value = dateKey(session.finishedAt);
    E.editDuration.value = Math.round((session.durationSec || 0) / 60);
    E.editRpe.value = Number(session.avgRpe || 0).toFixed(1);
    E.editSets.value = Number(session.completedSets || 0);
    renderSessionPhysicalEditor();
    E.sessionEditor.hidden = false;
    E.sessionEditor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeSessionEditor() {
    editingSessionId = null;
    editingSessionDraft = null;
    E.sessionEditor.hidden = true;
  }

  function collectSessionEditorDetails() {
    return Array.from(E.editSessionDetails.querySelectorAll(".edit-exercise-card")).map(function(card){
      var detail={name:card.getAttribute("data-edit-name")||"Exercici",block:card.getAttribute("data-edit-block")||"",sets:[]};
      Array.from(card.querySelectorAll(".edit-saved-set")).forEach(function(row){
        var set=blankSavedSet();
        Array.from(row.querySelectorAll(".edit-detail-input")).forEach(function(input){
          set[input.getAttribute("data-key")]=input.value;
        });
        var done=row.querySelector(".edit-detail-done");
        set.done=!!(done&&done.checked);
        detail.sets.push(set);
      });
      return detail;
    });
  }

  function saveSessionEdit() {
    if (!editingSessionId) return;
    var history = read(KEY.history, []);
    var session = history.find(function (s) { return s.id === editingSessionId; });
    if (!session) return;

    var newDate = parseDateInput(E.editDate.value);
    var oldFinished=session.finishedAt||newDate;
    var oldStarted=session.startedAt||oldFinished;
    var oldDuration=Math.max(0,oldFinished-oldStarted);
    session.finishedAt = newDate;
    session.startedAt = newDate - oldDuration;
    session.durationSec = Math.max(0, Math.min(600, Number(E.editDuration.value) || 0)) * 60;

    var collectedDetails = collectSessionEditorDetails();
    session.details = collectedDetails.length ? collectedDetails : (editingSessionDraft ? JSON.parse(JSON.stringify(editingSessionDraft)) : []);

    var allSets=[];
    (session.details||[]).forEach(function(detail){(detail.sets||[]).forEach(function(set){allSets.push(set);});});
    var completed=allSets.filter(function(set){return set.done;}).length;
    var rpes=allSets.map(function(set){return numberOrNull(set.rpe);}).filter(function(v){return v!=null&&v>0;});

    session.completedSets = allSets.length ? completed : Math.max(0, Math.min(200, Math.round(Number(E.editSets.value) || 0)));
    session.avgRpe = rpes.length ? rpes.reduce(function(a,b){return a+b;},0)/rpes.length : Math.max(0, Math.min(10, Number(E.editRpe.value) || 0));

    var hasPhysicalData=allSets.some(function(set){
      return set.done || ["weight","repsDone","rpe","heightCm","distanceCm","distanceM","distanceKm","timeMin","seconds"].some(function(key){return set[key]!==""&&set[key]!=null;});
    });
    if(hasPhysicalData){
      session.recovered=false;
      session.manualEntry=true;
      session.recoveryNote="Sessió reconstruïda/editada manualment a partir de les dades guardades per l'usuari.";
    }
    session.manualEditedAt=Date.now();

    write(KEY.history, history);
    selectedCalendarDate = dateKey(newDate);
    expandedSessionId = session.id;
    closeSessionEditor();
    renderCalendar();
    renderProgress();
    renderHomeIntelligence();
  }

  function deleteSession() {
    if (!editingSessionId) return;
    if (E.deleteSession.dataset.confirm !== "1") {
      E.deleteSession.dataset.confirm = "1";
      E.deleteSession.textContent = "TOCA DE NOU PER ESBORRAR";
      setTimeout(function () {
        if (E.deleteSession && E.deleteSession.dataset.confirm === "1") {
          E.deleteSession.dataset.confirm = "0";
          E.deleteSession.textContent = "ESBORRAR";
        }
      }, 3500);
      return;
    }
    E.deleteSession.dataset.confirm = "0";
    E.deleteSession.textContent = "ESBORRAR";
    var history = read(KEY.history, []).filter(function (s) { return s.id !== editingSessionId; });
    write(KEY.history, history);
    closeSessionEditor();
    renderCalendar();
    renderProgress();
  }

  function renderCustomPlans() {
    var plans = read(KEY.plans, []);
    if (!plans.length) {
      E.customPlanList.innerHTML = '<div class="empty">Encara no tens plans propis. Prem + PLA per guardar-ne un.</div>';
      return;
    }
    E.customPlanList.innerHTML = plans.map(function (p) {
      var expanded = expandedPlanId === p.id;
      return '<article class="custom-plan-card"><h3>' + esc(p.name) + '</h3>' +
        '<p class="focus">' + esc(p.focus || "Sense focus definit") + '</p>' +
        '<div class="custom-plan-actions"><button data-view-plan="' + esc(p.id) + '">' + (expanded ? "TANCAR" : "VEURE") + '</button><button data-edit-plan="' + esc(p.id) + '">EDITAR</button></div>' +
        (expanded ? '<div class="custom-plan-body"><pre>' + esc(p.content || "Sense contingut.") + '</pre>' +
          (p.notes ? '<div class="custom-plan-notes"><b>Notes</b><br>' + esc(p.notes).replace(/\n/g, "<br>") + '</div>' : '') + '</div>' : '') +
        '</article>';
    }).join("");

    Array.from(E.customPlanList.querySelectorAll("[data-view-plan]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-view-plan");
        expandedPlanId = expandedPlanId === id ? null : id;
        renderCustomPlans();
      });
    });
    Array.from(E.customPlanList.querySelectorAll("[data-edit-plan]")).forEach(function (btn) {
      btn.addEventListener("click", function () { openPlanEditor(btn.getAttribute("data-edit-plan")); });
    });
  }

  function openPlanEditor(id) {
    var plans = read(KEY.plans, []);
    var plan = id ? plans.find(function (p) { return p.id === id; }) : null;
    editingPlanId = plan ? plan.id : null;
    E.deletePlan.dataset.confirm = "0";
    E.deletePlan.textContent = "ESBORRAR";
    E.planEditorKicker.textContent = plan ? "EDITAR PLA" : "NOU PLA";
    E.planEditorTitle.textContent = plan ? plan.name : "Crear pla";
    E.planName.value = plan ? plan.name : "";
    E.planFocus.value = plan ? plan.focus : "";
    E.planContent.value = plan ? plan.content : "";
    E.planNotes.value = plan ? plan.notes : "";
    E.deletePlan.hidden = !plan;
    E.planEditor.hidden = false;
    E.planEditor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closePlanEditor() {
    editingPlanId = null;
    E.planEditor.hidden = true;
  }

  function savePlan() {
    var name = E.planName.value.trim();
    if (!name) {
      E.planName.focus();
      E.planName.setCustomValidity("Posa un nom al pla.");
      E.planName.reportValidity();
      E.planName.setCustomValidity("");
      return;
    }
    var plans = read(KEY.plans, []);
    if (editingPlanId) {
      var existing = plans.find(function (p) { return p.id === editingPlanId; });
      if (existing) {
        existing.name = name;
        existing.focus = E.planFocus.value.trim();
        existing.content = E.planContent.value.trim();
        existing.notes = E.planNotes.value.trim();
        existing.updatedAt = Date.now();
      }
    } else {
      var newPlan = {
        id: uid(),
        name: name,
        focus: E.planFocus.value.trim(),
        content: E.planContent.value.trim(),
        notes: E.planNotes.value.trim(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      plans.unshift(newPlan);
      expandedPlanId = newPlan.id;
    }
    write(KEY.plans, plans.slice(0, 50));
    closePlanEditor();
    renderCustomPlans();
  }

  function deletePlan() {
    if (!editingPlanId) return;
    if (E.deletePlan.dataset.confirm !== "1") {
      E.deletePlan.dataset.confirm = "1";
      E.deletePlan.textContent = "TOCA DE NOU PER ESBORRAR";
      setTimeout(function () {
        if (E.deletePlan && E.deletePlan.dataset.confirm === "1") {
          E.deletePlan.dataset.confirm = "0";
          E.deletePlan.textContent = "ESBORRAR";
        }
      }, 3500);
      return;
    }
    E.deletePlan.dataset.confirm = "0";
    E.deletePlan.textContent = "ESBORRAR";
    var plans = read(KEY.plans, []).filter(function (p) { return p.id !== editingPlanId; });
    write(KEY.plans, plans);
    if (expandedPlanId === editingPlanId) expandedPlanId = null;
    closePlanEditor();
    renderCustomPlans();
  }

  function renderPerformanceStats(history) {
    var names = uniqueExerciseNames();
    if (!selectedStatExercise || names.indexOf(selectedStatExercise) < 0) selectedStatExercise = names[0] || "";
    E.statExercise.innerHTML = names.map(function (name) {
      return '<option value="' + esc(name) + '"' + (name === selectedStatExercise ? ' selected' : '') + '>' + esc(name) + '</option>';
    }).join("");

    var ex = findExerciseByName(selectedStatExercise) || (selectedStatExercise ? {name:selectedStatExercise} : null);
    if (!ex) {
      E.statMetric.innerHTML = "";
      E.statSummary.innerHTML = "";
      E.statChart.innerHTML = "";
      E.statEmpty.hidden = false;
      return;
    }

    var options = metricOptionsFor(ex);
    if (!selectedStatMetric || !options.some(function (m) { return m.key === selectedStatMetric; })) selectedStatMetric = options[0].key;
    E.statMetric.innerHTML = options.map(function (m) {
      return '<option value="' + m.key + '"' + (m.key === selectedStatMetric ? ' selected' : '') + '>' + esc(m.label) + '</option>';
    }).join("");

    var metric = options.find(function (m) { return m.key === selectedStatMetric; }) || options[0];
    var points = history.slice().reverse().map(function (session) {
      if (!session.details) return null;
      var detail = session.details.find(function (d) { return d.name === selectedStatExercise; });
      if (!detail) return null;
      var value = metricValue(metric.key, detail.sets || []);
      if (value == null) return null;
      return { ts: session.finishedAt, label: new Date(session.finishedAt).toLocaleDateString("ca-ES", { day: "2-digit", month: "short" }), value: value };
    }).filter(Boolean);

    if (!points.length) {
      E.statSummary.innerHTML = "";
      E.statChart.innerHTML = "";
      E.statEmpty.hidden = false;
      return;
    }

    E.statEmpty.hidden = true;
    var first = points[0].value;
    var latest = points[points.length - 1].value;
    var best = Math.max.apply(null, points.map(function (p) { return p.value; }));
    var delta = first ? ((latest - first) / Math.abs(first)) * 100 : 0;

    E.statSummary.innerHTML =
      '<div><small>PRIMER</small><strong>' + formatMetricValue(first, metric.unit) + '</strong></div>' +
      '<div><small>ÚLTIM</small><strong>' + formatMetricValue(latest, metric.unit) + '</strong></div>' +
      '<div><small>MILLOR</small><strong>' + formatMetricValue(best, metric.unit) + '</strong></div>' +
      '<div><small>CANVI</small><strong>' + (first ? (delta >= 0 ? "+" : "") + delta.toFixed(1) + "%" : "—") + '</strong></div>';

    var W = 360, H = 190, L = 34, R = 12, T = 16, B = 34;
    var maxV = Math.max.apply(null, points.map(function (p) { return p.value; }));
    var minV = Math.min.apply(null, points.map(function (p) { return p.value; }));
    var yMin = Math.min(0, minV);
    var span = Math.max(1, maxV - yMin);
    var xStep = points.length > 1 ? (W - L - R) / (points.length - 1) : 0;
    function px(i) { return points.length > 1 ? L + i * xStep : (W + L - R) / 2; }
    function py(v) { return T + (H - T - B) * (1 - (v - yMin) / span); }
    var path = points.map(function (p, i) { return (i ? "L" : "M") + px(i).toFixed(1) + " " + py(p.value).toFixed(1); }).join(" ");
    var circles = points.map(function (p, i) {
      return '<circle cx="' + px(i).toFixed(1) + '" cy="' + py(p.value).toFixed(1) + '" r="4"></circle>';
    }).join("");
    var labels = points.map(function (p, i) {
      if (points.length > 6 && i !== 0 && i !== points.length - 1 && i % Math.ceil(points.length / 5) !== 0) return "";
      return '<text x="' + px(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle">' + esc(p.label) + '</text>';
    }).join("");
    var yLabels = '<text x="28" y="' + (T + 5) + '" text-anchor="end">' + formatMetricValue(maxV, metric.unit) + '</text>' +
      '<text x="28" y="' + (H - B + 4) + '" text-anchor="end">' + formatMetricValue(yMin, metric.unit) + '</text>';

    E.statChart.innerHTML =
      '<div class="chart-title"><b>' + esc(selectedStatExercise) + '</b><span>' + esc(metric.label) + '</span></div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Evolució de ' + esc(metric.label) + '">' +
      '<line class="chart-gridline" x1="' + L + '" x2="' + (W-R) + '" y1="' + T + '" y2="' + T + '"></line>' +
      '<line class="chart-gridline" x1="' + L + '" x2="' + (W-R) + '" y1="' + (H-B) + '" y2="' + (H-B) + '"></line>' +
      '<path class="chart-line" d="' + path + '"></path><g class="chart-points">' + circles + '</g><g class="chart-labels">' + labels + yLabels + '</g></svg>';
  }

  function renderProgress() {
    var history = read(KEY.history, []);
    var knee = read(KEY.knee, []);
    E.metricSessions.textContent = String(history.length);
    E.metricMinutes.textContent = String(Math.round(history.reduce(function (a, x) { return a + (x.durationSec || 0); }, 0) / 60));
    var rpes = history.map(function (x) { return Number(x.avgRpe || 0); }).filter(function (x) { return x > 0; });
    E.metricRpe.textContent = rpes.length ? (rpes.reduce(function (a, b) { return a + b; }, 0) / rpes.length).toFixed(1) : "0.0";
    E.metricPain.textContent = String(knee.length ? knee[0].pain : 0) + "/10";
    renderPerformanceStats(history);
    renderWeekly(history);
    renderPRs(history);
    renderGoals(history);
    renderTests();
    renderWeeklyReview();
    E.history.innerHTML = history.length ? history.slice(0, 12).map(function (x) {
      var date = new Date(x.finishedAt).toLocaleDateString("ca-ES", { day: "2-digit", month: "short" });
      return '<div class="history-row"><span>' + date + '</span><b>' + esc(getDay(x.dayId).title) + (x.recovered ? ' · RECUP.' : '') + '</b><span>' + Math.round((x.durationSec || 0) / 60) + ' min</span></div>';
    }).join("") : '<div class="empty">Encara no hi ha sessions guardades.</div>';
  }

  function saveKnee() {
    var items = read(KEY.knee, []);
    items.unshift({
      at: Date.now(),
      pain: Number(E.pain.value),
      stiffness: Number(E.stiff.value),
      confidence: Number(E.confidence.value),
      note: E.kneeNote.value
    });
    write(KEY.knee, items.slice(0, 50));
    renderProgress();
    E.saveKnee.textContent = "GUARDAT ✓";
    setTimeout(function () { E.saveKnee.textContent = "GUARDAR CHECK-IN"; }, 1200);
  }

  function show(name) {
    ["plan", "workout", "calendar", "plans", "progress"].forEach(function (screen) {
      $("screen-" + screen).classList.toggle("active", screen === name);
    });
    E.newGoal.addEventListener("click",function(){
    E.goalEditor.hidden=false;
    E.goalExercise.innerHTML=uniqueExerciseNames().map(function(name){return '<option value="'+esc(name)+'">'+esc(name)+'</option>';}).join("");
    populateGoalMetrics();
  });
  E.goalExercise.addEventListener("change",populateGoalMetrics);
  E.goalCancel.addEventListener("click",function(){E.goalEditor.hidden=true;});
  E.goalSave.addEventListener("click",function(){
    var target=Number(E.goalTarget.value); if(!Number.isFinite(target)||target<=0)return;
    var goals=read(KEY.goals,[]); goals.unshift({id:uid(),exercise:E.goalExercise.value,metric:E.goalMetric.value,target:target,direction:E.goalDirection.value,createdAt:Date.now()});
    write(KEY.goals,goals.slice(0,30)); E.goalTarget.value=""; E.goalEditor.hidden=true; renderGoals(read(KEY.history,[]));
  });
  E.saveTest.addEventListener("click",function(){
    var value=Number(E.testValue.value); if(!Number.isFinite(value)||value<=0)return;
    var tests=read(KEY.tests,[]); tests.unshift({id:uid(),type:E.testType.value,value:value,at:Date.now()}); write(KEY.tests,tests.slice(0,100)); E.testValue.value=""; renderTests();
  });

  Array.from(document.querySelectorAll(".nav [data-screen]")).forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-screen") === name);
    });
    if (name === "workout") renderWorkout();
    if (name === "calendar") renderCalendar();
    if (name === "plans") renderCustomPlans();
    if (name === "progress") renderProgress();
    window.scrollTo(0, 0);
  }

  E.start.addEventListener("click", openReadiness);
  E.readinessClose.addEventListener("click", closeReadiness);
  E.skipReadiness.addEventListener("click", function(){ newSession(null); });
  E.confirmReadiness.addEventListener("click", function(){ newSession(readinessPayload()); });
  [E.readyEnergy,E.readySleep,E.readyPain,E.readyStiff,E.readyConfidence].forEach(function(input){
    input.addEventListener("input",function(){
      E.readyEnergyLabel.textContent=E.readyEnergy.value+"/5"; E.readySleepLabel.textContent=E.readySleep.value+"/5";
      E.readyPainLabel.textContent=E.readyPain.value+"/10"; E.readyStiffLabel.textContent=E.readyStiff.value+"/3"; E.readyConfidenceLabel.textContent=E.readyConfidence.value+"/5";
    });
  });
  E.blockWeekPrev.addEventListener("click",function(){changeBlockWeek(-1);});
  E.blockWeekNext.addEventListener("click",function(){changeBlockWeek(1);});
  E.viewSelected.addEventListener("click", function () { basePlanOpen = !basePlanOpen; renderPlan(); });
  E.finish.addEventListener("click", finishSession);
  E.cancelSession.addEventListener("click", cancelActiveSession);
  E.restPause.addEventListener("click", toggleRestPause);
  E.restClose.addEventListener("click", closeRest);
  Array.from(document.querySelectorAll("[data-rest]")).forEach(function (btn) {
    btn.addEventListener("click", function () { startRest(Number(btn.getAttribute("data-rest"))); });
  });

  E.calPrev.addEventListener("click", function () {
    calendarMonth -= 1;
    if (calendarMonth < 0) { calendarMonth = 11; calendarYear -= 1; }
    renderCalendar();
  });
  E.calNext.addEventListener("click", function () {
    calendarMonth += 1;
    if (calendarMonth > 11) { calendarMonth = 0; calendarYear += 1; }
    renderCalendar();
  });
  E.editorClose.addEventListener("click", closeSessionEditor);
  E.editAddExercise.addEventListener("click", addExerciseToSessionEditor);
  E.saveSessionEdit.addEventListener("click", saveSessionEdit);
  E.deleteSession.addEventListener("click", deleteSession);

  E.newPlan.addEventListener("click", function () { openPlanEditor(null); });
  E.planEditorClose.addEventListener("click", closePlanEditor);
  E.savePlan.addEventListener("click", savePlan);
  E.deletePlan.addEventListener("click", deletePlan);

  Array.from(document.querySelectorAll(".nav [data-screen]")).forEach(function (btn) {
    btn.addEventListener("click", function () { show(btn.getAttribute("data-screen")); });
  });

  E.pain.addEventListener("input", function () { E.painLabel.textContent = E.pain.value + "/10"; });
  E.stiff.addEventListener("input", function () { E.stiffLabel.textContent = E.stiff.value + "/3"; });
  E.confidence.addEventListener("input", function () { E.confidenceLabel.textContent = E.confidence.value + "/5"; });
  E.statExercise.addEventListener("change", function () {
    selectedStatExercise = E.statExercise.value;
    selectedStatMetric = "";
    renderProgress();
  });
  E.statMetric.addEventListener("change", function () {
    selectedStatMetric = E.statMetric.value;
    renderProgress();
  });
  E.tempoStart.addEventListener("click",toggleTempo);
  E.tempoStop.addEventListener("click",closeTempo);
  E.exportData.addEventListener("click",exportBackup);
  E.saveWeeklyReview.addEventListener("click",saveWeeklyReviewData);
  E.copyWeeklySummary.addEventListener("click",copyWeeklySummaryText);
  E.saveKnee.addEventListener("click", saveKnee);

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      renderRest();
      renderWorkout();
      renderCalendar();
    }
  });
  window.addEventListener("focus", function () { renderRest(); });

  renderPlan();
  renderHomeIntelligence();
  renderWorkout();
  renderCalendar();
  renderCustomPlans();
  renderProgress();

  if (active) {
    startElapsed();
    scheduleRest();
  }
})();
