//create a synth and connect it to the master output (your speakers)

function setupInstruments()
{
	var windSet = {
    "portamento" : 0.0,
    "oscillator": {
        "type": "square4"
    },
    "envelope": {
        "attack": 2,
        "decay": 1,
        "sustain": 0.2,
        "release": 2
    }
	}
	
	var celloSettings = {
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "triangle"
    },
    "envelope": {
        "attack": 0.2,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
	}
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
	
	var cello = new Tone.FMSynth(celloSettings).toMaster();	
	var wind = new Tone.Synth(windSet).toMaster();	

	var cpattern = new Tone.Pattern(function(time, note){
		cello.triggerAttackRelease(note, '16n');
	}, ["D4", "E4", "A4"], 'up');
	cpattern.interval = "16n";

	var wpattern = new Tone.Pattern(function(time, note){
		wind.triggerAttackRelease(note, '8n');
	}, ["D5", "A5"], 'up');
	wpattern.interval = "8n";

	var piano = new Tone.Synth(pianoSettings).toMaster();	
	var bass = new Tone.MonoSynth(bassSettings).toMaster();	

	//a polysynth composed of 6 Voices of Synth
	var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
	//set the attributes using the set interface
	synth.set(pianoSettings)

	var cprog = new Tone.Pattern(function(time, note){
		synth.triggerAttackRelease(note, "1m");
	}, [["D4", "Gb4", "A5", "D5"], ["A4", "Db4", "E4", "A5"], ["B4", "D4", "Gb4", "B5"], ["G4", "B4", "D4", "G5"] ], 'up');
			
	cprog.interval = "1m";
			
	var bpattern = new Tone.Pattern(function(time, note){
		bass.triggerAttackRelease(note, '8n');
	}, ["D3", "A3", "B3", "G3"], 'randomWalk');
	bpattern.interval = "8n";
	
	var dsynth = new Tone.MembraneSynth().toMaster();

	var dpattern = new Tone.Pattern(function(time, note){
		dsynth.triggerAttackRelease(note, '16n');
	}, ["D3", "A3", "B3", "G3"]);
	 
	return [dpattern, cprog, bpattern, cpattern, wpattern];
}

function play(datas, authorList){
	var patterns = setupInstruments();
	curr_index = 0;
	
	datas.forEach(function(e){
		if(e[1] == 1){
			patterns[authorList.indexOf(e[0])].start(curr_index.toString() + "m");
			console.log("START at" + curr_index);
		}else if (e[1] == 2){
			patterns[authorList.indexOf(e[0]) + 1].stop(curr_index.toString() + "m");
			console.log("STOP at" + curr_index);

		}	
		curr_index += 1;
	});
	
	Tone.Transport.start();
	Tone.Transport.stop(curr_index.toString() + "m");

}
