//create a synth and connect it to the master output (your speakers)

function setupInstruments()
{
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

	var bassSettings = {
		"oscillator": {
			"type": "fmsquare5",
			"modulationType" : "triangle",
			"modulationIndex" : 2,
			"harmonicity" : 0.501
		},
		"filter": {
			"Q": 1,
			"type": "lowpass",
			"rolloff": -24
		},
		"envelope": {
			"attack": 0.01,
			"decay": 0.1,
			"sustain": 0.4,
			"release": 2
		},
		"filterEnvelope": {
			"attack": 0.01,
			"decay": 0.1,
			"sustain": 0.8,
			"release": 1.5,
			"baseFrequency": 50,
			"octaves": 4.4
		}
}

	var piano = new Tone.Synth(pianoSettings).toMaster();	
	var bass = new Tone.MonoSynth(bassSettings).toMaster();	

	//a polysynth composed of 6 Voices of Synth
	var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
	//set the attributes using the set interface
	synth.set(pianoSettings)

	var cprog = new Tone.Pattern(function(time, note){
		synth.triggerAttackRelease(note, "1");
	}, [["D4", "Gb4", "A5", "D5"], ["A4", "Db4", "E4", "A5"], ["B4", "D4", "Gb4", "B5"], ["G4", "B4", "D4", "G5"] ], 'up');
			
	cprog.start(0);		
			
	var bpattern = new Tone.Pattern(function(time, note){
		bass.triggerAttackRelease(note, '4n');
	}, ["D3", "A3", "B3", "G3"], 'upDown');

	var dsynth = new Tone.MembraneSynth().toMaster();

	var dpattern = new Tone.Pattern(function(time, note){
		dsynth.triggerAttackRelease(note, '16n');
	}, ["D3", "A3", "B3", "G3"]);
	 
	dpattern.start(2.0);
}

function play(datas){
	console.log(datas[0])
}

setupInstruments()
play(listOfLists)


Tone.Transport.start();
