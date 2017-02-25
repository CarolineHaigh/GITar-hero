//create a synth and connect it to the master output (your speakers)

var pianoSettings = {
			"oscillator": {
				"detune": 0,
				"type": "custom",
				"partials" : [2, 1, 2, 2],
				"phase": 0,
				"volume": 0
			},
			"envelope": {
				"attack": 0.005,
				"decay": 0.3,
				"sustain": 0.2,
				"release": 1,
			},
			"portamento": 0.01,
			"volume": -10
		};

var piano = new Tone.Synth(pianoSettings).toMaster();	

//a polysynth composed of 6 Voices of Synth
var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
//set the attributes using the set interface
synth.set(pianoSettings);
//play a chord
//synth.triggerAttackRelease(["D4", "Gb4", "A5", "D5"], "4n");
//synth.triggerAttackRelease(["A4", "Db4", "E4", "A5"], "4n");

var cprog = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, '2n');
}, [["D4", "Gb4", "A5", "D5"], ["A4", "Db4", "E4", "A5"], ["B4", "D4", "Gb4", "B5"], ["G4", "B4", "D4", "G5"] ], 'up');
		
cprog.start(0);		
		
var psynth = new Tone.PluckSynth().toMaster();

var ppattern = new Tone.Pattern(function(time, note){
    psynth.triggerAttackRelease(note, '4n');
}, ["C3", "E4", "G5", "A4"], 'randomWalk');
 
ppattern.start(2.25);


var dsynth = new Tone.MembraneSynth().toMaster();

var dpattern = new Tone.Pattern(function(time, note){
    dsynth.triggerAttackRelease(note, '4n');
}, ["D3", "A3", "B3", "G3"]);
 
dpattern.start(2.0);

Tone.Transport.start();
