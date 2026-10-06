const DAYS = [
  {
    "id": "day1",
    "num": "01",
    "title": "FORCE / MAN MAKER",
    "tone": "blue",
    "exercises": [
      {
        "name": "CMJ → Stick",
        "sets": 3,
        "reps": "5",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Flexiona malucs/genolls → salta vertical explosiu → aterra i aguanta 2 s.",
        "equipment": "Terra lliure",
        "setup": "Prepara Terra lliure i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Flexiona malucs/genolls",
          "salta vertical explosiu",
          "aterra i aguanta 2 s."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "track": [
          [
            "heightCm",
            "Jump height",
            "cm"
          ]
        ],
        "code": "D1.1",
        "roundRest": 60
      },
      {
        "name": "Broad Jump → Stick",
        "sets": 3,
        "reps": "5",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Carrega malucs → salta endavant → aterra amb dos peus i aguanta 2 s.",
        "equipment": "Terra i cinta mètrica",
        "setup": "Prepara Terra i cinta mètrica i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Carrega malucs",
          "salta endavant",
          "aterra amb dos peus i aguanta 2 s."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "track": [
          [
            "distanceCm",
            "Jump distance",
            "cm"
          ]
        ],
        "code": "D1.2",
        "roundRest": 60
      },
      {
        "name": "Bulgarian Split Squat",
        "sets": 4,
        "reps": "8 / cama",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Peu posterior al banc → baixa amb el peu davanter estable → puja sense impulsar-te amb la cama del darrere.",
        "equipment": "Banc + DB",
        "setup": "Prepara Banc + DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Peu posterior al banc",
          "baixa amb el peu davanter estable",
          "puja sense impulsar-te amb la cama del darrere."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.3",
        "roundRest": 60
      },
      {
        "name": "Leg Extension Unilateral",
        "sets": 3,
        "reps": "10 / cama",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Alinea eix de màquina amb genoll → estén una cama → baixa en 3 s.",
        "equipment": "Màquina leg extension",
        "setup": "Prepara Màquina leg extension i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Alinea eix de màquina amb genoll",
          "estén una cama",
          "baixa en 3 s."
        ],
        "tempo": "3 s excèntrica; pujada potent.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.4",
        "roundRest": 60
      },
      {
        "name": "Seated Soleus Calf Raise",
        "sets": 3,
        "reps": "10",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 60,
        "format": "circuit",
        "cue": "Genolls flexionats → puja talons amb càrrega → pausa a dalt → baixa controlat.",
        "equipment": "Màquina soleus",
        "setup": "Prepara Màquina soleus i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Genolls flexionats",
          "puja talons amb càrrega",
          "pausa a dalt",
          "baixa controlat."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.5",
        "roundRest": 60
      },
      {
        "name": "Bike V6 Intervals · 1 min fort / 1 min controlat · final moderat",
        "sets": 22,
        "reps": "30 min",
        "block": "MOTOR",
        "group": "Cardio",
        "rest": 0,
        "format": "straight",
        "cue": "Ajusta seient/resistència abans → entrada progressiva → alterna intensitats sense baixar de la màquina → final prescrit.",
        "equipment": "Bike",
        "setup": "Prepara Bike i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Ajusta seient/resistència abans",
          "entrada progressiva",
          "alterna intensitats sense baixar de la màquina",
          "final prescrit."
        ],
        "tempo": "Hard potent però repetible; chill/controlat continua actiu.",
        "errors": "No introdueixis descans extra ni comptis la distància acumulada com si fos de cada interval.",
        "feel": "Hard exigent; chill sostenible. Registra la diferència de distància del marcador entre inici i final de cada interval.",
        "progression": "Compara intervals de la mateixa durada i màquina. Augmenta rendiment mantenint regularitat.",
        "machine": "Bike",
        "intervals": [
          {
            "intervalType": "Warm-up",
            "durationSec": 300
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 1
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 1
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 2
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 2
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 3
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 3
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 4
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 4
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 5
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 5
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 6
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 6
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 7
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 7
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 8
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 8
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 9
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 9
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 10
          },
          {
            "intervalType": "Chill",
            "durationSec": 60,
            "round": 10
          },
          {
            "intervalType": "Final",
            "durationSec": 300
          }
        ],
        "code": "D1.6",
        "roundRest": 60
      },
      {
        "name": "Man Maker",
        "sets": 3,
        "reps": "8",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Push-up → renegade row esquerra/dreta → DB clean → squat → press; tot això és 1 rep.",
        "equipment": "2 DB hexagonals",
        "setup": "Prepara 2 DB hexagonals i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Push-up",
          "renegade row esquerra/dreta",
          "DB clean",
          "squat",
          "press; tot això és 1 rep."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.7",
        "roundRest": 60
      },
      {
        "name": "Landmine Squat → Rotational Press",
        "sets": 3,
        "reps": "10 / costat",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Barra al pit → squat → puja rotant peus/maluc → press diagonal.",
        "equipment": "Landmine",
        "setup": "Prepara Landmine i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Barra al pit",
          "squat",
          "puja rotant peus/maluc",
          "press diagonal."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.8",
        "roundRest": 60
      },
      {
        "name": "DB Hammer Curl → Arnold Press",
        "sets": 3,
        "reps": "10",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Curl amb presa neutra → gira a rack → Arnold press → baixa controlat.",
        "equipment": "2 DB",
        "setup": "Prepara 2 DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Curl amb presa neutra",
          "gira a rack",
          "Arnold press",
          "baixa controlat."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.9",
        "roundRest": 60
      },
      {
        "name": "Heavy Farmer Carry",
        "sets": 3,
        "reps": "40–50 m",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 60,
        "format": "circuit",
        "cue": "Aixeca dos pesos → camina alt amb passos curts → deixa’ls controladament.",
        "equipment": "2 DB / kettlebells",
        "setup": "Prepara 2 DB / kettlebells i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Aixeca dos pesos",
          "camina alt amb passos curts",
          "deixa’ls controladament."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D1.10",
        "roundRest": 60
      },
      {
        "name": "Single-arm DB Snatch → Overhead Reverse Lunge",
        "sets": 3,
        "reps": "10 / costat",
        "block": "COS SENCER",
        "group": "Variant opcional · substitueix Landmine Squat → Rotational Press",
        "rest": 0,
        "format": "circuit",
        "cue": "Variant en lloc del Landmine Squat → Rotational Press; no afegir tots dos al mateix circuit.",
        "equipment": "1 DB",
        "setup": "Prepara 1 DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "DB des de terra amb impuls de maluc",
          "fixa overhead",
          "pas enrere en lunge",
          "torna dret amb braç estable."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "optional": true,
        "code": "D1.11",
        "roundRest": 60
      }
    ],
    "version": 6,
    "subtitle": "V6 · 30 min cames/plyo · 30 min cardio · 30 min full body"
  },
  {
    "id": "day2",
    "num": "02",
    "title": "THE COMPLEX",
    "tone": "coral",
    "exercises": [
      {
        "name": "Skater Hop → Vertical Jump → Stick",
        "sets": 3,
        "reps": "6 / costat",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Salta lateral a l’altra cama → immediatament salta vertical sobre aquella cama → aterra i aguanta → alterna costat.",
        "equipment": "Terra lliure",
        "setup": "Prepara Terra lliure i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Salta lateral a l’altra cama",
          "immediatament salta vertical sobre aquella cama",
          "aterra i aguanta",
          "alterna costat."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D2.1",
        "roundRest": 60
      },
      {
        "name": "Single-Leg RDL → Reverse Lunge → Knee Drive",
        "sets": 3,
        "reps": "10 / cama",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Peu estable i maluc enrere en RDL → torna dret → mateixa cama mòbil fa pas enrere → impulsa genoll amunt.",
        "equipment": "DB",
        "setup": "Prepara DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Peu estable i maluc enrere en RDL",
          "torna dret",
          "mateixa cama mòbil fa pas enrere",
          "impulsa genoll amunt."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.2",
        "roundRest": 60
      },
      {
        "name": "Lateral Lunge carregat",
        "sets": 3,
        "reps": "10 / costat",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Pas lateral → maluc enrere sobre cama flexionada → empeny terra i torna al centre.",
        "equipment": "DB",
        "setup": "Prepara DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Pas lateral",
          "maluc enrere sobre cama flexionada",
          "empeny terra i torna al centre."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.3",
        "roundRest": 60
      },
      {
        "name": "Nordic Hamstring",
        "sets": 3,
        "reps": "6–8",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 60,
        "format": "circuit",
        "cue": "Fixació segura de turmells → cos recte des dels genolls → frena baixada → ajuda amb mans o banda per tornar.",
        "equipment": "Suport fix de turmells + coixí",
        "setup": "Prepara Suport fix de turmells + coixí i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Fixació segura de turmells",
          "cos recte des dels genolls",
          "frena baixada",
          "ajuda amb mans o banda per tornar."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.4",
        "roundRest": 60
      },
      {
        "name": "Rower V6 Intervals",
        "sets": 18,
        "reps": "30 min",
        "block": "MOTOR",
        "group": "Cardio",
        "rest": 0,
        "format": "straight",
        "cue": "Ajusta seient/resistència abans → entrada progressiva → alterna intensitats sense baixar de la màquina → final prescrit.",
        "equipment": "Rower",
        "setup": "Prepara Rower i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Ajusta seient/resistència abans",
          "entrada progressiva",
          "alterna intensitats sense baixar de la màquina",
          "final prescrit."
        ],
        "tempo": "Hard potent però repetible; chill/controlat continua actiu.",
        "errors": "No introdueixis descans extra ni comptis la distància acumulada com si fos de cada interval.",
        "feel": "Hard exigent; chill sostenible. Registra la diferència de distància del marcador entre inici i final de cada interval.",
        "progression": "Compara intervals de la mateixa durada i màquina. Augmenta rendiment mantenint regularitat.",
        "machine": "Rower",
        "intervals": [
          {
            "intervalType": "Warm-up",
            "durationSec": 300
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 1
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 1
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 2
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 2
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 3
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 3
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 4
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 4
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 5
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 5
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 6
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 6
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 7
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 7
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 8
          },
          {
            "intervalType": "Hard",
            "durationSec": 60,
            "round": 8
          },
          {
            "intervalType": "Final",
            "durationSec": 60
          }
        ],
        "code": "D2.5",
        "roundRest": 60
      },
      {
        "name": "Deadlift → Hang Clean → Front Squat → Push Press",
        "sets": 3,
        "reps": "8",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Deadlift → hang clean a rack → front squat → push press; seqüència completa = 1 rep.",
        "equipment": "Barra o 2 DB",
        "setup": "Prepara Barra o 2 DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Deadlift",
          "hang clean a rack",
          "front squat",
          "push press; seqüència completa = 1 rep."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Comença 3×8; càrrega limitada pel clean/press, no pel deadlift.",
        "code": "D2.6",
        "roundRest": 90
      },
      {
        "name": "Heavy Cable/Sled Rope Pull",
        "sets": 3,
        "reps": "10–15 tirades",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Tronc estable → estira corda mà sobre mà → retorna controlant tensió.",
        "equipment": "Cable amb corda o sled + corda",
        "setup": "Prepara Cable amb corda o sled + corda i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Tronc estable",
          "estira corda mà sobre mà",
          "retorna controlant tensió."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.7",
        "roundRest": 90
      },
      {
        "name": "Weighted Dips",
        "sets": 3,
        "reps": "10",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Suport en paral·leles → baixa dins rang controlat → estén braços sense balanceig.",
        "equipment": "Paral·leles + llast",
        "setup": "Prepara Paral·leles + llast i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Suport en paral·leles",
          "baixa dins rang controlat",
          "estén braços sense balanceig."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.8",
        "roundRest": 90
      },
      {
        "name": "Heavy Front-Rack Carry",
        "sets": 3,
        "reps": "30–40 m",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 90,
        "format": "circuit",
        "cue": "Clean a rack → colzes alts i abdomen actiu → camina amb passos curts.",
        "equipment": "2 DB / kettlebells",
        "setup": "Prepara 2 DB / kettlebells i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Clean a rack",
          "colzes alts i abdomen actiu",
          "camina amb passos curts."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D2.9",
        "roundRest": 90
      }
    ],
    "version": 6,
    "subtitle": "V6 · 30 min cames/plyo · 30 min cardio · 30 min full body"
  },
  {
    "id": "day3",
    "num": "03",
    "title": "SPRING / REACTION",
    "tone": "yellow",
    "exercises": [
      {
        "name": "Pogos reactius",
        "sets": 3,
        "reps": "20",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Turmells actius → petits salts seguits → contacte curt, genolls suaus.",
        "equipment": "Terra",
        "setup": "Prepara Terra i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Turmells actius",
          "petits salts seguits",
          "contacte curt, genolls suaus."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D3.1",
        "roundRest": 60
      },
      {
        "name": "Depth Drop → Vertical Jump",
        "sets": 3,
        "reps": "5",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Deixa’t caure sense saltar del suport → contacte curt amb dos peus → salt vertical immediat → recepció estable.",
        "equipment": "Caixa estable",
        "setup": "Prepara Caixa estable i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Deixa’t caure sense saltar del suport",
          "contacte curt amb dos peus",
          "salt vertical immediat",
          "recepció estable."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "track": [
          [
            "dropHeightCm",
            "Drop height (cm)",
            "cm"
          ],
          [
            "heightCm",
            "Jump height optional",
            "cm"
          ]
        ],
        "code": "D3.2",
        "roundRest": 60
      },
      {
        "name": "Broad Jump → immediate second Broad Jump",
        "sets": 3,
        "reps": "4+4",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Primer salt endavant → aterra i impulsa immediatament segon salt → stick final; 4 parelles.",
        "equipment": "Terra + cinta mètrica",
        "setup": "Prepara Terra + cinta mètrica i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Primer salt endavant",
          "aterra i impulsa immediatament segon salt",
          "stick final; 4 parelles."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "track": [
          [
            "jump1Cm",
            "Jump 1 distance",
            "cm"
          ],
          [
            "jump2Cm",
            "Jump 2 distance",
            "cm"
          ]
        ],
        "code": "D3.3",
        "roundRest": 60
      },
      {
        "name": "Lateral Bound → rebound opposite side",
        "sets": 3,
        "reps": "5 / costat",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Salta lateral a una cama → rebota immediatament al costat contrari → mantén pelvis alineada.",
        "equipment": "Terra",
        "setup": "Prepara Terra i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Salta lateral a una cama",
          "rebota immediatament al costat contrari",
          "mantén pelvis alineada."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D3.4",
        "roundRest": 60
      },
      {
        "name": "Single-Leg Hop → Stick",
        "sets": 3,
        "reps": "5 / cama",
        "block": "GENOLL + CAMA",
        "group": "Plyo quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Salta endavant amb una cama → aterra sobre la mateixa → aguanta 2 s abans de repetir.",
        "equipment": "Terra",
        "setup": "Prepara Terra i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Salta endavant amb una cama",
          "aterra sobre la mateixa",
          "aguanta 2 s abans de repetir."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D3.5",
        "roundRest": 60
      },
      {
        "name": "Olympus Reaction Grid",
        "sets": 3,
        "reps": "10 cues",
        "block": "GENOLL + CAMA",
        "group": "Reaction quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "1.0 s per arribar + fins a 2.0 s per tornar. Registre manual: cap sensor mesura l’arribada. On time compta només arribada a la direcció correcta.",
        "equipment": "Mòbil + 4 marques",
        "setup": "Prepara Mòbil + 4 marques i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Centre marcat",
          "respon Left/Right/Front/Back",
          "arriba al target",
          "torna al centre abans del següent cue."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "reaction": true,
        "code": "D3.6",
        "roundRest": 60
      },
      {
        "name": "Treadmill V6 Intervals",
        "sets": 11,
        "reps": "30 min",
        "block": "MOTOR",
        "group": "Cardio",
        "rest": 0,
        "format": "straight",
        "cue": "5 min build → alterna hard / float jog sense parar la cinta; inclou el canvi de velocitat dins de l’interval.",
        "equipment": "Treadmill",
        "setup": "Prepara Treadmill i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "5 min build",
          "alterna hard / float jog sense parar la cinta; inclou el canvi de velocitat dins de l’interval."
        ],
        "tempo": "Hard potent però repetible; chill/controlat continua actiu.",
        "errors": "No introdueixis descans extra ni comptis la distància acumulada com si fos de cada interval.",
        "feel": "Hard exigent; chill sostenible. Registra la diferència de distància del marcador entre inici i final de cada interval.",
        "progression": "Compara intervals de la mateixa durada i màquina. Augmenta rendiment mantenint regularitat.",
        "machine": "Treadmill",
        "intervals": [
          {
            "intervalType": "Warm-up",
            "durationSec": 300
          },
          {
            "intervalType": "Hard",
            "durationSec": 180,
            "round": 1
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 1
          },
          {
            "intervalType": "Hard",
            "durationSec": 180,
            "round": 2
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 2
          },
          {
            "intervalType": "Hard",
            "durationSec": 180,
            "round": 3
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 3
          },
          {
            "intervalType": "Hard",
            "durationSec": 180,
            "round": 4
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 4
          },
          {
            "intervalType": "Hard",
            "durationSec": 180,
            "round": 5
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 5
          }
        ],
        "code": "D3.7",
        "roundRest": 60
      },
      {
        "name": "Landmine Clean → Rotational Press",
        "sets": 3,
        "reps": "10 / costat",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Clean de landmine a espatlla → impulsa amb peus/maluc → press diagonal amb rotació controlada.",
        "equipment": "Landmine",
        "setup": "Prepara Landmine i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Clean de landmine a espatlla",
          "impulsa amb peus/maluc",
          "press diagonal amb rotació controlada."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D3.8",
        "roundRest": 60
      },
      {
        "name": "DB Renegade Row → Push-Up",
        "sets": 3,
        "reps": "10 complexes",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Planxa sobre DB estables → rem esquerra i dreta → push-up; tot = 1 complex.",
        "equipment": "2 DB hexagonals",
        "setup": "Prepara 2 DB hexagonals i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Planxa sobre DB estables",
          "rem esquerra i dreta",
          "push-up; tot = 1 complex."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D3.9",
        "roundRest": 60
      },
      {
        "name": "DB Hammer Curl → Push Press",
        "sets": 3,
        "reps": "10",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Hammer curl a rack → dip curt → impulsa DB overhead → baixa a rack i reinicia.",
        "equipment": "2 DB",
        "setup": "Prepara 2 DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Hammer curl a rack",
          "dip curt",
          "impulsa DB overhead",
          "baixa a rack i reinicia."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D3.10",
        "roundRest": 60
      },
      {
        "name": "Plate Ground-to-Overhead → Overhead Hold",
        "sets": 3,
        "reps": "10; última hold 20–30 s",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Disc des de terra → extensió de maluc → porta overhead → a la última rep mantén 20–30 s.",
        "equipment": "Disc",
        "setup": "Prepara Disc i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Disc des de terra",
          "extensió de maluc",
          "porta overhead",
          "a la última rep mantén 20–30 s."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "track": [
          [
            "weight",
            "Load",
            "kg"
          ],
          [
            "seconds",
            "Final hold",
            "s"
          ]
        ],
        "code": "D3.11",
        "roundRest": 60
      },
      {
        "name": "Suitcase Carry pesat",
        "sets": 3,
        "reps": "30–40 m / costat",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 60,
        "format": "circuit",
        "cue": "Pes a una mà → camina sense inclinar tronc → canvia de mà i repeteix.",
        "equipment": "1 DB / kettlebell",
        "setup": "Prepara 1 DB / kettlebell i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Pes a una mà",
          "camina sense inclinar tronc",
          "canvia de mà i repeteix."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D3.12",
        "roundRest": 60
      }
    ],
    "version": 6,
    "subtitle": "V6 · 30 min cames/plyo · 30 min cardio · 30 min full body"
  },
  {
    "id": "day4",
    "num": "04",
    "title": "BRAKE + ATHLETE",
    "tone": "pink",
    "exercises": [
      {
        "name": "Drop Landing → Lateral Bound",
        "sets": 3,
        "reps": "5 / costat",
        "block": "GENOLL + CAMA",
        "group": "Brake quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Deixa’t caure d’un suport baix → absorbeix recepció → impulsa salt lateral → clava recepció.",
        "equipment": "Caixa + espai lateral",
        "setup": "Prepara Caixa + espai lateral i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Deixa’t caure d’un suport baix",
          "absorbeix recepció",
          "impulsa salt lateral",
          "clava recepció."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D4.1",
        "roundRest": 60
      },
      {
        "name": "Acceleration → Hard Brake",
        "sets": 4,
        "reps": "3",
        "block": "GENOLL + CAMA",
        "group": "Brake quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Accelera 5–7 m → baixa centre de gravetat → frena en 2–3 passos → reset.",
        "equipment": "Passadís lliure 5–7 m",
        "setup": "Prepara Passadís lliure 5–7 m i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Accelera 5–7 m",
          "baixa centre de gravetat",
          "frena en 2–3 passos",
          "reset."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D4.2",
        "roundRest": 60
      },
      {
        "name": "Lateral Shuffle → Brake → Re-acceleration",
        "sets": 3,
        "reps": "3 / costat",
        "block": "GENOLL + CAMA",
        "group": "Brake quality",
        "rest": 60,
        "format": "plyometric quality",
        "cue": "Shuffle lateral → frena amb peu exterior → reaccelera al sentit contrari → reset.",
        "equipment": "Espai lateral lliure",
        "setup": "Prepara Espai lateral lliure i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Shuffle lateral",
          "frena amb peu exterior",
          "reaccelera al sentit contrari",
          "reset."
        ],
        "tempo": "Explosiu; reset curt i aterratge controlat. Qualitat abans de fatiga.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Contacte reactiu i recepció estable.",
        "progression": "Augmenta distància/alçada només mantenint la mateixa qualitat.",
        "code": "D4.3",
        "roundRest": 60
      },
      {
        "name": "Heavy Step-Up → Knee Drive",
        "sets": 3,
        "reps": "10 / cama",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Peu complet sobre caixa → puja amb cama de suport → genoll contrari amunt → baixa controlat.",
        "equipment": "Caixa + DB",
        "setup": "Prepara Caixa + DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Peu complet sobre caixa",
          "puja amb cama de suport",
          "genoll contrari amunt",
          "baixa controlat."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.4",
        "roundRest": 60
      },
      {
        "name": "Reverse Sled Drag",
        "sets": 3,
        "reps": "30 m",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 0,
        "format": "circuit",
        "cue": "Agafa corretges → camina enrere amb tronc alt → mantén tensió contínua.",
        "equipment": "Sled + corretges",
        "setup": "Prepara Sled + corretges i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Agafa corretges",
          "camina enrere amb tronc alt",
          "mantén tensió contínua."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.5",
        "roundRest": 60
      },
      {
        "name": "Heavy Sled Push",
        "sets": 3,
        "reps": "30 m",
        "block": "GENOLL + CAMA",
        "group": "Leg circuit",
        "rest": 60,
        "format": "circuit",
        "cue": "Mans al sled → angle estable de tronc → passos curts i potents.",
        "equipment": "Sled",
        "setup": "Prepara Sled i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Mans al sled",
          "angle estable de tronc",
          "passos curts i potents."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.6",
        "roundRest": 60
      },
      {
        "name": "AirBike V6 Intervals · 2 min molt fort / 2 min moderat · final 5 min progressiu fort",
        "sets": 12,
        "reps": "30 min",
        "block": "MOTOR",
        "group": "Cardio",
        "rest": 0,
        "format": "straight",
        "cue": "Ajusta seient/resistència abans → entrada progressiva → alterna intensitats sense baixar de la màquina → final prescrit.",
        "equipment": "AirBike",
        "setup": "Prepara AirBike i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Ajusta seient/resistència abans",
          "entrada progressiva",
          "alterna intensitats sense baixar de la màquina",
          "final prescrit."
        ],
        "tempo": "Hard potent però repetible; chill/controlat continua actiu.",
        "errors": "No introdueixis descans extra ni comptis la distància acumulada com si fos de cada interval.",
        "feel": "Hard exigent; chill sostenible. Registra la diferència de distància del marcador entre inici i final de cada interval.",
        "progression": "Compara intervals de la mateixa durada i màquina. Augmenta rendiment mantenint regularitat.",
        "machine": "AirBike",
        "intervals": [
          {
            "intervalType": "Warm-up",
            "durationSec": 300
          },
          {
            "intervalType": "Hard",
            "durationSec": 120,
            "round": 1
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 1
          },
          {
            "intervalType": "Hard",
            "durationSec": 120,
            "round": 2
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 2
          },
          {
            "intervalType": "Hard",
            "durationSec": 120,
            "round": 3
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 3
          },
          {
            "intervalType": "Hard",
            "durationSec": 120,
            "round": 4
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 4
          },
          {
            "intervalType": "Hard",
            "durationSec": 120,
            "round": 5
          },
          {
            "intervalType": "Chill",
            "durationSec": 120,
            "round": 5
          },
          {
            "intervalType": "Final",
            "durationSec": 300
          }
        ],
        "code": "D4.7",
        "roundRest": 60
      },
      {
        "name": "Trap Bar Deadlift → Farmer Carry",
        "sets": 3,
        "reps": "8 deadlifts + 30–40 m",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "8 deadlifts controlats → mantén trap bar agafada → carry 30–40 m.",
        "equipment": "Trap bar + espai lliure",
        "setup": "Prepara Trap bar + espai lliure i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "8 deadlifts controlats",
          "mantén trap bar agafada",
          "carry 30–40 m."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "track": [
          [
            "weight",
            "Load",
            "kg"
          ],
          [
            "distanceM",
            "Carry",
            "m"
          ]
        ],
        "code": "D4.8",
        "roundRest": 60
      },
      {
        "name": "Single DB Clean → Reverse Lunge → Push Press",
        "sets": 3,
        "reps": "10 / costat",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Clean a rack → reverse lunge amb DB estable → torna dret → push press; tot = 1 rep.",
        "equipment": "1 DB",
        "setup": "Prepara 1 DB i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Clean a rack",
          "reverse lunge amb DB estable",
          "torna dret",
          "push press; tot = 1 rep."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.9",
        "roundRest": 60
      },
      {
        "name": "Landmine Thruster → Rotation",
        "sets": 3,
        "reps": "10 / costat",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "Squat amb barra al pit → thruster → rotació controlada amb peus/maluc → retorna a rack.",
        "equipment": "Landmine",
        "setup": "Prepara Landmine i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Squat amb barra al pit",
          "thruster",
          "rotació controlada amb peus/maluc",
          "retorna a rack."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.10",
        "roundRest": 60
      },
      {
        "name": "Cable Row → Face Pull",
        "sets": 3,
        "reps": "10+10",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 0,
        "format": "circuit",
        "cue": "10 rems al tronc → 10 face pulls cap al front amb colzes oberts.",
        "equipment": "Cable + corda",
        "setup": "Prepara cable i corda. Canvia altura només entre les 10 reps de row i les 10 de face pull.",
        "steps": [
          "10 rems al tronc",
          "10 face pulls cap al front amb colzes oberts."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.11",
        "roundRest": 60
      },
      {
        "name": "EZ-Bar Curl → Overhead Press",
        "sets": 3,
        "reps": "10",
        "block": "COS SENCER",
        "group": "Full body · 3 rounds",
        "rest": 60,
        "format": "circuit",
        "cue": "Curl fins a rack → press overhead amb abdomen actiu → baixa a rack → estén braços.",
        "equipment": "Barra EZ",
        "setup": "Prepara Barra EZ i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Curl fins a rack",
          "press overhead amb abdomen actiu",
          "baixa a rack",
          "estén braços."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "code": "D4.12",
        "roundRest": 60
      },
      {
        "name": "Heavy Sled Push/Drag continuous",
        "sets": 3,
        "reps": "temps restant fins 30 min",
        "block": "COS SENCER",
        "group": "Finisher opcional · només si sobra temps",
        "rest": 0,
        "format": "circuit",
        "cue": "Push 30 m → canvia a drag → continua amb tensió i ritme repetible.",
        "equipment": "Sled",
        "setup": "Prepara Sled i deixa lliure el recorregut abans de començar la ronda.",
        "steps": [
          "Push 30 m",
          "canvia a drag",
          "continua amb tensió i ritme repetible."
        ],
        "tempo": "Baixada controlada; pujada potent. Transició directa al següent exercici.",
        "errors": "Evita perdre alineació de genoll/peu, arquejar la lumbar o accelerar amb una càrrega que no controles.",
        "feel": "Tensió muscular, tronc estable i respiració contínua.",
        "progression": "Completa totes les rondes amb tècnica estable abans de pujar la càrrega mínima disponible.",
        "optional": true,
        "code": "D4.13",
        "roundRest": 60
      }
    ],
    "version": 6,
    "subtitle": "V6 · 30 min cames/plyo · 30 min cardio · 30 min full body"
  }
];
