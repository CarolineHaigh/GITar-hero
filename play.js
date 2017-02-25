var vib = new Tone.Vibrato()

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.PluckSynth().connect(vib).toMaster();

var pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, 8n);
}, ["C3", "E4", "G5", "A4"]);

pattern.start(0);

Tone.Transport.start();
