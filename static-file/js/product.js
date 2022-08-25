const speachtext = document.querySelector('#speechtext');
const speechbtn = document.querySelector('#speechbtn');
function notify(type, message) {
  (() => {

      var area = document.getElementById("notification-area");
      let n = document.createElement("div");
      let notification = Math.random().toString(36).substr(2, 10);
      n.setAttribute("id", notification);
      n.classList.add("notification", type);
      n.innerHTML = "<div><b>Message</b></div>" + message;
      area.appendChild(n);

      let color = document.createElement("div");
      let colorid = "color" + Math.random().toString(36).substr(2, 10);
      color.setAttribute("id", colorid);
      color.classList.add("notification-color", type);
      document.getElementById(notification).appendChild(color);


      let icon = document.createElement("a");
      let iconid = "icon" + Math.random().toString(36).substr(2, 10);
      icon.setAttribute("id", iconid);
      icon.classList.add("notification-icon", type);
      document.getElementById(notification).appendChild(icon);


      let _icon = document.createElement("i");
      let _iconid = "_icon" + Math.random().toString(36).substr(2, 10);
      _icon.setAttribute("id", _iconid);

      if (type == 'success') {
          _icon.className = "fa fa-2x fa-check-circle";
      }
      else {
          _icon.className = "fa fa-2x fa-exclamation-circle";
      }
      document.getElementById(iconid).appendChild(_icon);

      area.style.display = 'block';
      setTimeout(() => {
          var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
          for (let i = 0; i < notifications.length; i++) {
              if (notifications[i].getAttribute("id") == notification) {
                  notifications[i].remove();
                  break;
              }
          }

          if (notifications.length == 0) {
              area.style.display = 'none';
          }

      }, 4000);
  })();
}

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
   setInterval(()=>{
    speachtext.innerHTML='';
   },5000)
   switch(transcript){
    case 'Jarvis open shopping cart':
      window.location.href = "http://bestshopnew.pythonanywhere.com/cart"; break;
    case 'Jarvis open products page':window.location.href = "http://bestshopnew.pythonanywhere.com/products"; break;
    case 'Jarvis open home page': window.location.href = "http://bestshopnew.pythonanywhere.com/"; break;
    case 'Jarvis open login page': window.location.href = "http://bestshopnew.pythonanywhere.com/users/login"; break;
    default: speachtext.innerHTML = transcript;  
   }      
//  if(transcript ==='Jarvis open shopping cart'){
//    console.log('1')
//    window.location.href = "http://bestshopnew.pythonanywhere.com/cart";
//  }else{
//    console.log('ne')
//  }
           
          //  speachtext.classList.remove("hide");
       };
     
        // start recognition
        recognition.start();
})

const newelement = document.querySelector('#logintrue');



class NewProduct{
    constructor(id,product_name,product_price,product_image,product_skidka_price,element_create,parent_by,logintrue){
        this.id = id,
        this.product_name = product_name,
        this.product_price = product_price,
        this.product_image = product_image,
        this.product_skidka_price = product_skidka_price,
        this.element_create = element_create,
        this.parent_by = document.querySelector(`.${parent_by}`),
        this.logintrue = logintrue;
    }
    render() {
        const elementnew = document.createElement('div');
        elementnew.classList.add(this.element_create);
        let alik = '';
        // <a class="cardshop" href=""><i class="fas fa-shopping-cart"></i></a>
        if(this.logintrue === null){
         alik = `<a class="cardshop" href="http://bestshopnew.pythonanywhere.com/users/login"}><i class="fas fa-shopping-cart"></i></a>`;
        }else{
          alik = `<i class="fas fa-shopping-cart" id=${this.id}></i>`
        }
        elementnew.innerHTML = `
        <div class="img-container">
        <img src=${this.product_image} alt="no image" />
        <div class="addCart">`+
          alik +
        `</div>
        <ul class="side-icons">
          <span><i class="fas fa-search"></i></span>
          <span><i class="far fa-heart"></i></span>
          <span><i class="fas fa-sliders-h"></i></span>
        </ul>
      </div>
      <div class="bottom">
        <a href="http://bestshopnew.pythonanywhere.com/product/detail/${this.id}" class="details" name="${this.id}">${this.product_name}</a>
        <div class="price">
          <span>$${this.product_skidka_price}</span>
          <span class="cancel">$${this.product_price}</span>
        </div>
      </div>`
        
        this.parent_by.append(elementnew);
    }
}

// axios.get('http://bestshopnew.pythonanywhere.com/api/products')
//   .then((data) => {
//     if(data.status === 200){
//       const cardshop = document.querySelectorAll('.cardshop');
//         var arr = [];
//         data.data.forEach((item)=>{
//             new NewProduct(
//                 item.id,
//                 item.product_name,
//                 item.product_price,
//                 item.product_image,
//                 item.product_skidka_price,
//                 "product",
//                 "product-layout",
//                 cardshop
//             ).render()
            
//         })
   
//     }
    
//   })
const cardshop = document.querySelector('#logintrue');
const productcount = document.querySelector('#productcount');

if(cardshop === null){
  axios.get('http://bestshopnew.pythonanywhere.com/api/product/card/count')
  .then((data)=>{
    if(data.status === 200){
       productcount.textContent = data.data.count
    }
   
  })
  console.log('bor')
 }else{
  productcount.textContent = 0
  console.log('yoq')
 }








setTimeout(()=>{
  const shopcar = document.querySelectorAll('.addCart');
  const details = document.querySelectorAll('.details');

  details.forEach((item)=>{
    item.addEventListener('click',(e)=>{
      if(e.target.name !==''){
        num = + e.target.name
        window.location.href = `http://bestshopnew.pythonanywhere.com/product/detail/${num}`;
      }
    })
  })

  shopcar.forEach((item)=>{
  item.addEventListener('click',(e)=>{
    if ( e.target.id !== ''){
      number = + e.target.id
    axios.get(`http://bestshopnew.pythonanywhere.com/api/cell/product/add/${number}`)
    .then((data)=>{
      const productcount2 = document.getElementsByTagName('small');
      var countproduct = +productcount2[0].innerHTML
      console.log(data.data.status_add)
      if(data.data.status_add){
        productcount2[0].innerHTML = countproduct+1
        uttrens = new SpeechSynthesisUtterance("The product has been successfully added to the shopping cart.");
        speechSynthesis.speak(uttrens)
        notify('success','The product has been successfully added to the shopping cart.');
      }else{
        uttrens = new SpeechSynthesisUtterance("There is this product is in your shopping card.");
        speechSynthesis.speak(uttrens)
        notify('danger','There is this product is in your shopping card.');
      }
    })
    }
    
  })
})



},2000);
