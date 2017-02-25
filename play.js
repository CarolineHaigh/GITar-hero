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
			"volume": 0
		};

var piano = new Tone.Synth(pianoSettings).toMaster();	
		
var psynth = new Tone.PluckSynth().toMaster();

var ppattern = new Tone.Pattern(function(time, note){
    psynth.triggerAttackRelease(note, '4n');
}, ["C3", "E4", "G5", "A4"], 'randomWalk');
 
ppattern.start(0);


var dsynth = new Tone.MembraneSynth().toMaster();

var dpattern = new Tone.Pattern(function(time, note){
    dsynth.triggerAttackRelease(note, '4n');
}, ["C3", "E3", "G3", "A3"]);
 
dpattern.start(0.25);

Tone.Transport.start();
