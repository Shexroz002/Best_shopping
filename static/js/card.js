class NewProduct{
    constructor(id,product_name,product_price,product_image,product_subtotal,parent_by){
        this.id = id,
        this.product_name = product_name,
        this.product_price = product_price,
        this.product_image = product_image,
        this.product_subtotal = product_subtotal,
        this.parent_by = document.querySelector(`.${parent_by}`)
    }
    render(){
        const tablcolm = document.createElement('tr');
        tablcolm.classList.add('deletes')
        tablcolm.innerHTML =`
        <tr class='proteash'>
        <td>
            <div class="cart-info">
              <img src=${this.product_image} alt="" />
              <div>
                <p>${this.product_name}</p>
                <span>Price:$<p style="display:inline;" class ="prices">${this.product_price}</p></span>
                <br />
                <i class="bi bi-trash3-fill" style="color: var(--primary);font-size: 1.4rem;"id=${this.id}></i>
              </div>
            </div>
          </td>
          <td><input type="number" value="1" min="1" class="countpro" /></td>
          <td><p class="costs">$${this.product_price}</p></td></tr>
        `;
        this.parent_by.append(tablcolm);
    }
    }
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
axios.get('http://bestshop.pythonanywhere.com/api/purchas/product')
.then((data)=>{
    if(data.status === 200){
        data.data.product.forEach((item)=>{
            new NewProduct(
                item.product.id,
                item.product.product_name,
                item.product.product_price,
                item.product.product_image,
                item.product.product_skidka_price,
                "cardclass",

            ).render();
        })
    }
})

setTimeout(()=>{
const trashs = document.querySelectorAll('.bi-trash3-fill');
const products = document.querySelectorAll('.deletes');


trashs.forEach((item,index)=>{
item.addEventListener('click',(e)=>{
    let number = +e.target.id
    axios.get(`http://bestshop.pythonanywhere.com/api/cell/product/remove/${number}`)
    .then((data)=>{
        if(data.data.status_remove){
            products[index].remove()
            
        }
    })

})
})
const countpro = document.querySelectorAll('.countpro');
const costs = document.querySelectorAll('.costs');
const prices = document.querySelectorAll('.prices');
const subtotal = document.querySelector('#subtotal');
const alltotal = document.querySelector('#alltotal');
console.log(countpro)
let summ = 0;
for( let i=0;i<countpro.length;i++){
    console.log(countpro[i].value) 
    console.log(parseFloat(prices[i].innerHTML))
    costs[i].textContent =`$${countpro[i].value*parseFloat(prices[i].innerHTML)}`
    // prices[i].innerHTML = countpro[i].value*parseFloat(prices[i].innerHTML)
    summ+=countpro[i].value*parseFloat(prices[i].innerHTML)
}
subtotal.textContent = `$${summ}`
alltotal.textContent = `$${summ + 19 }`
let subto = 0
countpro.forEach((item,index)=>{
    item.addEventListener('input',()=>{
        let sum = 0;
        for( let i=0;i<countpro.length;i++){
            console.log(countpro[i].value) 
            console.log(parseFloat(prices[i].innerHTML))
            costs[i].textContent =`$${countpro[i].value*parseFloat(prices[i].innerHTML)}`
            // prices[i].innerHTML = countpro[i].value*parseFloat(prices[i].innerHTML)
            sum+=countpro[i].value*parseFloat(prices[i].innerHTML)
        }
        subtotal.textContent = `$${sum}`
        alltotal.textContent = `$${sum + 19 }`
    })

})
const busd = document.querySelector('.checkout');
console.log(busd)
const csrftoken = getCookie('csrftoken');
busd.addEventListener('click',()=>{
    let ids = '',
        values = '';
    const countprso = document.querySelectorAll('.countpro');
    countprso.forEach((item,index)=>{
        console.log(item.value)
        ids += trashs[index].id + ',';
        values += item.value + ',';
    })
    console.log(ids,values)
    let data = {
        "product_id":ids,
        "product_count":values
      };
    axios.put('http://bestshop.pythonanywhere.com/api/purchas/product',JSON.stringify(data),{headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,}
      })
      .then((data)=>{
        if(data.status===200){
        uttrens = new SpeechSynthesisUtterance('Your purchases have been made successfully');
        speechSynthesis.speak(uttrens)
            setTimeout(()=>{
                window.location.href = `http://bestshop.pythonanywhere.com/shopping/history/pdf/${data.data.id}`
            },2500)
        }
      })
})


},2000);
