

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
     let producttypr = capitalizeFirstLetter(transcript.split(' ')[2])
     if (transcript.split(' ')[0] === "Jarvis" && transcript.split(' ')[1] === "show"  ){
        axios.get(`https://bestshopnew.pythonanywhere.com/api/product/all?category=${producttypr}`)
        .then((data) => {
          if(data.status === 200){
            productall = document.querySelectorAll('.product');
            for(let i=0;i<productall.length;i++){
                productall[i].remove()
            }
            const cardshop = document.querySelector('.cardshop');
            let produt_name  = '',
            count = 0;
              
              data.data.forEach((item)=>{
                produt_name += item.product_name + ',';
                count ++;
                  new NewProduct(
                      item.id,
                      item.product_name,
                      item.product_price,
                      item.product_image,
                      item.product_skidka_price,
                      "product",
                      "product-layout",
                      cardshop
                  ).render()
                  
              })
              uttrens = new SpeechSynthesisUtterance(`${count} products were found for your request. This products`+produt_name);
              speechSynthesis.speak(uttrens)
              setTimeout(show,2000);
          }
          
        })
     }
     
    }    setInterval(()=>{
        speachtext.innerHTML='';
       },5000)  
  
        };
      
         // start recognition
         recognition.start();
  })
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const category =document.querySelector('#category');
  const sort_by =document.querySelector('#sort_by');
  let category_value = category.options[category.selectedIndex].value;
  let sort_by_value = sort_by.options[sort_by.selectedIndex].value = "Name";




  
// function ShowCatagory(productType){
    
//     axios.get(`https://bestshopnew.pythonanywhere.com/api/product/all?category=${productType}`)
//     .then((data) => {
//       if(data.status === 200){
//         productall = document.querySelectorAll('.product');
//         for(let i=0;i<productall.length;i++){
//             productall[i].remove()
//         }
//         const cardshop = document.querySelector('.cardshop');

//           console.log(data.data)
//           data.data.forEach((item)=>{
//               new NewProduct(
//                   item.id,
//                   item.product_name,
//                   item.product_price,
//                   item.product_image,
//                   item.product_skidka_price,
//                   "product",
//                   "product-layout",
//                   cardshop
//               ).render()
              
//           })
     
//       }
      
//     })
// }

// setTimeout(()=>{
//     const shopcar = document.querySelectorAll('.addCart');
//     console.log(shopcar)
//     const details = document.querySelectorAll('.details');
    
//       details.forEach((item)=>{
//         item.addEventListener('click',(e)=>{
//           if(e.target.name !==''){
//             num = + e.target.name
//             window.location.href = `https://bestshopnew.pythonanywhere.com/product/detail/${num}`;
//           }
//         })
//       })
//       shopcar.forEach((item)=>{
//         item.addEventListener('click',(e)=>{
//           if ( e.target.id !== ''){
//             number = + e.target.id
//           axios.get(`https://bestshopnew.pythonanywhere.com/api/cell/product/add/${number}`)
//           .then((data)=>{
//             const productcount2 = document.getElementsByTagName('small');
//             let countproduct = +productcount2[0].innerHTML
//             console.log(data.data.status_add)
//             if(data.data.status_add){
//               uttrens = new SpeechSynthesisUtterance("The product has been successfully added to the shopping cart.");
//               speechSynthesis.speak(uttrens)
//               notify('success','The product has been successfully added to the shopping cart.');
//               productcount2[0].innerHTML = countproduct+1
//             }else{
//               uttrens = new SpeechSynthesisUtterance("There is this product is in your shopping card.");
//               speechSynthesis.speak(uttrens)
//               notify('danger','There is this product is in your shopping card.');
//             }
//           })
//           }else{
//             console.log('this element not found')
            
//           }
          
//         })
//       })
//     },2000)