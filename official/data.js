const DAYS = [
  {id:"day1",num:"01",title:"KNEE FORCE",subtitle:"Quad strength + full-body force + Z2",tone:"blue",exercises:[
    ["Leg Extension Unilateral",3,"6-8 / cama","GENOLL + CAMA",60,"3 s baixant. Pujada potent. Controla el recorregut sense dolor creixent."],
    ["Bulgarian Split Squat",3,"6-8 / cama","GENOLL + CAMA",60,"Genoll estable sobre el peu. Profunditat només si la controles."],
    ["Seated Soleus Calf Raise",3,"10-12","GENOLL + CAMA",60,"Pausa curta a dalt. No rebotis al fons."],
    ["Step-Down Lent",2,"8 / cama","GENOLL + CAMA",60,"Baixa lent. Genoll alineat amb el segon-tercer dit del peu."],
    ["Tibialis Raise",2,"15-20","GENOLL + CAMA",45,"Talons fixos. Mou només el turmell."],
    ["Weighted Pull-Up",3,"6-8","COS SENCER",60,"Reps netes. No afegeixis llast si perds rang."],
    ["DB Incline Bench",3,"8-10","COS SENCER",60,"Escàpules estables. Baixa controlat."],
    ["Chest-Supported Row",3,"8-10","COS SENCER",60,"Pausa lleu al final del rem."],
    ["Half-Kneeling Landmine Press",2,"8 / costat","COS SENCER",60,"Gluti actiu. No compensis amb lumbar."],
    ["Farmer Carry",2,"30-40 m","COS SENCER",60,"Alt i compacte. Passos curts."],
    ["Bike Z2",1,"20-25 min","MOTOR",0,"RPE 3-4. Conversa possible."]
  ]},
  {id:"day2",num:"02",title:"POSTERIOR + LATERAL",subtitle:"Hamstrings, adductors, control lateral + intervals",tone:"coral",exercises:[
    ["Nordic Hamstring",3,"4-6","GENOLL + CAMA",60,"Frena la caiguda. Para abans de perdre la línia."],
    ["Copenhagen Plank",3,"20-30 s / costat","GENOLL + CAMA",60,"Pelvis alta i estable."],
    ["Lateral Step-Down",3,"8 / cama","GENOLL + CAMA",60,"Controla pelvis i genoll abans de buscar profunditat."],
    ["Single-Leg RDL",3,"8 / cama","GENOLL + CAMA",60,"Maluc enrere, peu trípode, pelvis estable."],
    ["Standing Calf Raise Unilateral",3,"10-12 / cama","GENOLL + CAMA",45,"Pausa a dalt. Control a baix."],
    ["Med-Ball Slam",3,"6","COS SENCER",60,"Cada rep explosiva. Reset complet."],
    ["Chin-Up",3,"6-8","COS SENCER",60,"Sense balanceig."],
    ["DB Bench Press",3,"8-10","COS SENCER",60,"Pressiona ràpid, baixa controlat."],
    ["Landmine Rotational Press",2,"8 / costat","COS SENCER",60,"Rota des de terra i maluc."],
    ["Suitcase Carry",2,"30 m / costat","COS SENCER",60,"No t'inclinis."],
    ["Bike / Rower Intervals",4,"3' fort + 2' suau","MOTOR",0,"RPE 7-8 als blocs forts. Potent però repetible."]
  ]},
  {id:"day3",num:"03",title:"SPRING",subtitle:"Elasticitat, landings + running",tone:"yellow",exercises:[
    ["Pogos",3,"15 contactes","GENOLL + CAMA",60,"Contacte curt amb terra. Para si perds ritme o control."],
    ["Snap-Down",3,"4","GENOLL + CAMA",60,"Clava la recepció amb turmell, genoll i maluc alineats."],
    ["Countermovement Jump",4,"3","GENOLL + CAMA",120,"Màxima intenció. Descansa prou per mantenir alçada i velocitat."],
    ["Lateral Bound + Stick",3,"3 / costat","GENOLL + CAMA",90,"Comença al 70-80%. Domina la recepció abans de buscar distància."],
    ["Med-Ball Chest Throw",2,"5","COS SENCER",60,"Llançament violent. Reset complet entre reps."],
    ["Explosive Push-Up",2,"5","COS SENCER",60,"Para abans que baixi clarament la velocitat."],
    ["Pull-Up",3,"6-8","COS SENCER",60,"Mateix rang a totes les reps."],
    ["Landmine Rotational Press",2,"6 / costat","COS SENCER",60,"Peus i maluc inicien."],
    ["Run / Walk",5,"4' run + 1' walk","MOTOR",0,"Running fàcil. Progressa només si el genoll respon bé l'endemà."]
  ]},
  {id:"day4",num:"04",title:"BRAKE + ATHLETE",subtitle:"Unilateral, frenada + repeated power",tone:"pink",exercises:[
    ["Step-Up + Knee Drive",3,"6 / cama","GENOLL + CAMA",60,"Puja fort i acaba estable."],
    ["Reverse Sled Drag",3,"20-30 m","GENOLL + CAMA",60,"Tronc alt. Tensió constant."],
    ["Single-Leg Calf Raise",3,"10 / cama","GENOLL + CAMA",45,"Recorregut complet. Sense rebot."],
    ["Acceleration → Brake",3,"3 reps","GENOLL + CAMA",90,"5-7 m i frena en 2-3 passos. Qualitat abans de velocitat."],
    ["Lateral Shuffle → Stick",3,"3 / costat","GENOLL + CAMA",90,"Desplaça i clava. Pelvis i genoll controlats."],
    ["Trap-Bar Deadlift",3,"5","COS SENCER",75,"RPE 7. Barra ràpida, posició sòlida."],
    ["Dips",3,"6-10","COS SENCER",60,"Rang que puguis controlar."],
    ["Pull-Ups",3,"6-8","COS SENCER",60,"No persegueixis fallo muscular."],
    ["Heavy Sled Push",2,"20 m","COS SENCER",60,"Passos potents. No perdis angle de tronc."],
    ["AirBike / Bike Intervals",8,"1' fort + 1' recuperació","MOTOR",0,"RPE 8, repetible. L'última ronda ha de continuar sent forta."]
  ]}
].map(function(d){d.exercises=d.exercises.map(function(x){return{name:x[0],sets:x[1],reps:x[2],block:x[3],rest:x[4],cue:x[5]}});return d;});
