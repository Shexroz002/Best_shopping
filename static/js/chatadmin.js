const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");
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
  
form.onsubmit = (e)=>{
    e.preventDefault();
}

inputField.focus();
inputField.onkeyup = ()=>{
    if(inputField.value != ""){
        sendBtn.classList.add("active");
    }else{
        sendBtn.classList.remove("active");
    }
}


chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active");
}

chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}



function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
  }

sendBtn.addEventListener('click',()=>{
    const csrftoken = getCookie('csrftoken');
    let data = {
        "message":inputField.value
      };
      let headers= {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      };
      axios.post(`https://bestshopnew.pythonanywhere.com/users/api/chat/${parseInt(chatBox.id)}`,JSON.stringify(data),{headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,}
      })
      .then(data =>{
        if(data.status ===201){
           const element = document.createElement('div');
           let d = new Date();
           element.innerHTML=`
           <div class="chat outgoing">
           <div class="details">
               <p>${inputField.value}<br><span style="font-size: 0.5rem;color: aqua;">${d.getHours()}:${d.getMinutes()}</span></p>
           </div>
           </div>
           `
           chatBox.append(element)
           inputField.value=''
        }
      })     
  });
console.log(sendBtn,parseInt(chatBox.id))
//   scrollToBottom();