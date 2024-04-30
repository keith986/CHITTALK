
    var micbtn = document.getElementById('mic');
     var playbacks = document.querySelector('.playback');
   //if(micbtn){
   // console.log('just got the button')
  ///  micbtn.addEventListener('click', ToggleMic);
 //  }


 if(playbacks){
    console.log('found this')
 }

   let can_record = false;
   let is_recording = false;
   let recoder = null;
   let chunks = [];

   function SetupAudio(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices
                 .getUserMedia({
                    audio: true
                 })
                 .then(SetupStream)
                 .catch(err => console.log(err))
    }
   }   

   SetupAudio();

   function SetupStream(stream){
    recoder = new MediaRecorder(stream);

    recoder.ondataavailable = e => {
        chunks.push(e.data);
    }

    recoder.onstop = e => {
        const blob = new Blob(chunks, {type: 'audio/mp3; codecs=opus'});
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        $(document).ready(function(){
            $('.playback').attr('src', audioURL);
            $('#playbac').val(audioURL);
        })

        let file = new File([blob], audioURL, {type: 'audio/mp3', lastModified: new Date()}, 'utf-8'); 
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);//your file(s) reference(s)
       document.getElementById('playaudio').files = dataTransfer.files;
    }

    can_record = true;

   } 
   
  
 function ToggleMic(){
    if(!can_record) return ;
    is_recording = !is_recording;
    if(is_recording){
        recoder.start();
        $(document).ready(function(){
            $('.mic-toggle').attr('id','is-recording')
        })
    }else{    
        recoder.stop();
        $(document).ready(function(){
            $('.mic-toggle').removeAttr('id')
        })
    }
 }

 function startRec(){
    ToggleMic();
    console.log('clicked');
 }


 