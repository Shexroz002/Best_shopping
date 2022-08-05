ata.data.forEach((item)=>{
    const tablcolm = document.createElement('div'),
     asspsiy = document.querySelector('.histiry');
    tablcolm.classList.add('deletes');
    let shou = '';
    item.product.forEach((salo)=>{
        salo.forEach(element=>{
            shou += ` <tr class='proteash'>
        <td>
            <div class="cart-info">
              <img src=${element.product.product_image} alt="" />
              <div>
                <p>${element.product.product_name}</p>
                <span>Price:$<p style="display:inline;" class ="prices">${element.product.product_price}</p></span>
                <br />
              </div>
            </div>
          </td>
          <td>${element.product_count}</td>
          <td><p class="costs">$${element.total_price}</p></td></tr>`
        })
        
    })

    tablcolm.innerHTML =`
    <div class="container cart" style="position: relative; top:-9rem">
  <h1 style="position: relative;left: 45%;display: inline-block;font-size: 1.5rem; color: rgb(92, 97, 92); ">${item.data_time}</h1>
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>
    ` + shou + `</table> <div class="total-price">
    <table>
      <tr>
        <td>Subtotal</td>
        <td>${item.total_price}</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td>$50</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>$${item.total_price + 19}</td>
      </tr>
    </table>
    <a href="#" class="checkout btn">Proceed To Checkout</a>
  </div> </div>`;
  asspsiy.parent_by.append(tablcolm);
})