


class ProductsType{
    constructor(id,product_name,product_price,product_image,product_skidka_price,parent_by,logintrue){
        this.id = id,
        this.product_name = product_name,
        this.product_price = product_price,
        this.product_image = product_image,
        this.product_skidka_price = product_skidka_price,
        this.parent_by = document.querySelector(`#${parent_by}`);
        this.logintrue = logintrue
    }
    renders() {
      const elementnew = document.createElement('div');
      elementnew.classList.add('swiper-slide');
      let alik = '';
          // <a class="cardshop" href=""><i class="fas fa-shopping-cart"></i></a>
          if(this.logintrue !== null){
           alik = `<a class="cardshop" href="http://bestshop1.pythonanywhere.com/users/login"}><i class="fas fa-shopping-cart"></i></a>`;
          }else{
            alik = `<i class="fas fa-shopping-cart" id=${this.id}></i>`
          }
      elementnew.innerHTML = `
              <div class="product">
                <div class="img-container">
                  <img src=${this.product_image} alt="" />
                  <div class="addCart">
      
      ` +
      alik+
      ` 
      </div>
                  <ul class="side-icons">
                    <span><i class="fas fa-search"></i></span>
                    <span><i class="far fa-heart"></i></span>
                    <span><i class="fas fa-sliders-h"></i></span>
                  </ul>
                </div>
                <div class="bottom">
                  <a href="http://bestshop1.pythonanywhere.com/product/detail/${this.id}" class="details">${this.product_name}</a>
                  <div class="price">
                    <span>$${this.product_price}</span>
                    <span class="cancel">$${this.product_skidka_price}</span>
                  </div>
                </div>
              </div>
            
      `
      this.parent_by.append(elementnew);

    }
  }
  


//Fruit Types
 axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Fruit')
 .then((data) => {
  console.log(data,'fruit')
   if(data.status === 200){
      const cardshop = document.querySelector('.cardshop');
       
       
       data.data.forEach((item)=>{
           new ProductsType(
               item.id,
               item.product_name,
               item.product_price,
               item.product_image,
               item.product_skidka_price,
               "fruit",
               cardshop
           ).renders()
           
       })
  
   }
   
 })

//Vegetable Types
 axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Vegetable')
 .then((data) => {
   if(data.status === 200){
     const cardshop = document.querySelector('.cardshop');
       
       data.data.forEach((item)=>{
           new ProductsType(
               item.id,
               item.product_name,
               item.product_price,
               item.product_image,
               item.product_skidka_price,
               "vagtable",
               cardshop
           ).renders()
           
       })
  
   }
   
 })

 //Pizza Types

 axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Pizza')
 .then((data) => {
   if(data.status === 200){
      const cardshop = document.querySelector('.cardshop');
       data.data.forEach((item)=>{
           new ProductsType(
               item.id,
               item.product_name,
               item.product_price,
               item.product_image,
               item.product_skidka_price,
               "Pizza",
               cardshop
           ).renders()
           
       })
  
   }
   
 })


 //Food Types

 axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Food')
 .then((data) => {
   if(data.status === 200){
      const cardshop = document.querySelector('.cardshop');
       
       data.data.forEach((item)=>{
           new ProductsType(
               item.id,
               item.product_name,
               item.product_price,
               item.product_image,
               item.product_skidka_price,
               "Food",
               cardshop
           ).renders()
           
       })
  
   }
   
 })

  //Fish Types
console.log(document.querySelector('#fish'))
  axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Fish')
  .then((data) => {
    if(data.status === 200){
       const cardshop = document.querySelector('.cardshop');
       
        data.data.forEach((item)=>{
            new ProductsType(
                item.id,
                item.product_name,
                item.product_price,
                item.product_image,
                item.product_skidka_price,
                "fish",
                cardshop
            ).renders()
            
        })
   
    }
    
  })
 
//Pilav

console.log(document.querySelector('#fish'))
  axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Pilav')
  .then((data) => {
    if(data.status === 200){
       const cardshop = document.querySelector('.cardshop');
       
        data.data.forEach((item)=>{
            new ProductsType(
                item.id,
                item.product_name,
                item.product_price,
                item.product_image,
                item.product_skidka_price,
                "pilav",
                cardshop
            ).renders()
            
        })
   
    }
    
  })

  // Ice cream
  console.log(document.querySelector('#fish'))
  axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Ice_cream')
  .then((data) => {
    if(data.status === 200){
       const cardshop = document.querySelector('.cardshop');
       
        data.data.forEach((item)=>{
            new ProductsType(
                item.id,
                item.product_name,
                item.product_price,
                item.product_image,
                item.product_skidka_price,
                "cream",
                cardshop
            ).renders()
            
        })
   
    }
    
  })

  // Drink
  console.log(document.querySelector('#fish'))
  axios.get('http://bestshop1.pythonanywhere.com/api/product/all?category=Drink')
  .then((data) => {
    if(data.status === 200){
       const cardshop = document.querySelector('.cardshop');
       
        data.data.forEach((item)=>{
            new ProductsType(
                item.id,
                item.product_name,
                item.product_price,
                item.product_image,
                item.product_skidka_price,
                "drink",
                cardshop
            ).renders()
            
        })
   
    }
    
  })