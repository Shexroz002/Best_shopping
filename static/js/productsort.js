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
};

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
        if(this.logintrue !== null){
         alik = `<a class="cardshop" href="http://127.0.0.1:8000/users/login"}><i class="fas fa-shopping-cart"></i></a>`;
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
        <a class="details" name="${this.id}">${this.product_name}</a>
        <div class="price">
          <span>$${this.product_skidka_price}</span>
          <span class="cancel">$${this.product_price}</span>
        </div>
      </div>`
        
        this.parent_by.append(elementnew)
    }
}
const cardshop = document.querySelector('#logintrue');
const productcount = document.querySelector('#productcount');

if(cardshop === null){
  axios.get('http://127.0.0.1:8000/api/product/card/count')
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
axios.get(`http://127.0.0.1:8000/api/product/all`)
  .then((data) => {
    if(data.status === 200){
      const cardshop = document.querySelector('.cardshop');
        data.data.forEach((item)=>{
          
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
   
    }
    
  })
const btn =document.querySelector('#btn');
btn.addEventListener('click',()=>{
    const category =document.querySelector('#category');
    const sort_by =document.querySelector('#sort_by');
    let category_value = category.options[category.selectedIndex].value;
    let sort_by_value = sort_by.options[sort_by.selectedIndex].value;
    axios.get(`http://127.0.0.1:8000/api/product/all?category=${category_value}&sortby=${sort_by_value}`)
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
            count++;
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
})
const searchproduct = document.querySelector('#searchproduct'),
      searchbtn = document.querySelector('#searchimage');
      searchbtn.addEventListener('click',()=>{
      axios.get(`http://127.0.0.1:8000/api/product/search?search=${searchproduct.value}`)
    .then((data) => {
      console.log(data)
      if(data.status === 200){
        productall = document.querySelectorAll('.product');
        for(let i=0;i<productall.length;i++){
            productall[i].remove()
        }
        const cardshop = document.querySelector('.cardshop');

          console.log(data.data)
          data.data.forEach((item)=>{
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
     
      }
      
    })
      })
function show(){
const shopcar = document.querySelectorAll('.addCart');
console.log(shopcar)
const details = document.querySelectorAll('.details');

  details.forEach((item)=>{
    item.addEventListener('click',(e)=>{
      if(e.target.name !==''){
        num = + e.target.name
        window.location.href = `http://127.0.0.1:8000/product/detail/${num}`;
      }
    })
  })
  shopcar.forEach((item)=>{
    item.addEventListener('click',(e)=>{
      if ( e.target.id !== ''){
        number = + e.target.id;
        const cardshop = document.querySelector('.cardshop');
        if(cardshop === null ){
          uttrens = new SpeechSynthesisUtterance("There is this erorr");
          speechSynthesis.speak(uttrens)
        }
      axios.get(`http://127.0.0.1:8000/api/cell/product/add/${number}`)
      .then((data)=>{
        const productcount2 = document.getElementsByTagName('small');
        let countproduct = +productcount2[0].innerHTML
        console.log(data.data.status_add)
        if(data.data.status_add){
          uttrens = new SpeechSynthesisUtterance("The product has been successfully added to the shopping cart.");
          speechSynthesis.speak(uttrens)
          notify('success','The product has been successfully added to the shopping cart.');
          productcount2[0].innerHTML = countproduct+1
        }else{
          uttrens = new SpeechSynthesisUtterance("There is this product is in your shopping card.");
          speechSynthesis.speak(uttrens)
          notify('danger','There is this product is in your shopping card.');
        }
      })
      }else{
        console.log('this element not found')
        
      }
      
    })
  })
}




setTimeout(show,2000);




