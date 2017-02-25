//create a synth and connect it to the master output (your speakers)

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
