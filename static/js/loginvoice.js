speechbtn.addEventListener('click',(e)=>{
    // get output div reference
    const speachtext = document.querySelector('#speechtext');
    // get action element reference
    
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
    
        // This runs when the speech recognition service starts
        recognition.onstart = function() {
         speechbtn.src="/static/image/speach2.png";
        };
        
        recognition.onspeechend = function() {
         speechbtn.src="/static/image/speach.png";
           
            recognition.stop();
        }
      
        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;
   
    speachtext.innerHTML = transcript;  
    
    switch(transcript){
     case 'Jarvis open shopping cart':
       window.location.href = "https://bestshopnew.pythonanywhere.com/cart"; break;
     case 'Jarvis open products page':window.location.href = "https://bestshopnew.pythonanywhere.com/products"; break;
     case 'Jarvis open home page': window.location.href = "https://bestshopnew.pythonanywhere.com/"; break;
     default: speachtext.innerHTML = transcript; 
    }
      recognition.start();
     }     // start recognition
         
  })