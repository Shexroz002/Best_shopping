const username = document.querySelector('#username'),
       image = document.querySelector('#image'),
       email = document.querySelector('#email'),
       avatar = document.querySelector('#avatar'),
       btn = document.querySelector('.btn'),
       inputelement = document.querySelectorAll('.input-div');
id = parseInt(btn.id)

       inputelement.forEach(input =>{
        input.classList.add('focus')
       })
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
console.log(avatar)
axios.get(`https://bestshopnew.pythonanywhere.com/users/api/update/profile/${id}`)
.then((data)=>{
    if(data.status === 200){
        username.value = data.data.username;
        email.value = data.data.email;
        avatar.src = data.data.photo;
    }
})


let profiledata = new FormData();


btn.addEventListener('click',()=>{
    const usernames = document.querySelector('#username'),
       emails = document.querySelector('#email'),
       imagefile = document.querySelector('#image').files[0],
       nameer = document.querySelector('#usernameeror'),
       imageerr = document.querySelector('#imagerror'),
       emaileror = document.querySelector('#emaileror');

       console.log(typeof imagefile,typeof "sdas")
    if(imagefile !== undefined){
        profiledata.append('photo',imagefile);
    }
    
    profiledata.append('username',usernames.value);
    profiledata.append('email',emails.value);
    const csrftoken = getCookie('csrftoken');
    axios.put(`https://bestshopnew.pythonanywhere.com/users/api/update/profile/${id}`,profiledata,{headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,}
  })
  .then((data)=>{
    const title = document.querySelector('#title');
    if(data.status === 201){
        uttrens = new SpeechSynthesisUtterance("Your details have been successfully updated");
        speechSynthesis.speak(uttrens)
        nameer.innerHTML = '';
        imageerr.innerHTML = '';
        emaileror.innerHTML = '';
        title.innerHTML = "Your details have been successfully updated";

        setTimeout(()=>{
            window.location.href = "https://bestshopnew.pythonanywhere.com/";
          },3000)
    }
  })
  .catch((error) => {

    const arr = Object.keys(error.response.data.error);
    if(arr.some((item) => item ==="username")){
      uttrens = new SpeechSynthesisUtterance(error.response.data.error.username);
      speechSynthesis.speak(uttrens)
      nameer.style.color="red";
      nameer.innerHTML = error.response.data.error.username + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
    }else{
      nameer.innerHTML = ''
    };

    if(arr.some((item) => item ==="photo")){
      uttrens = new SpeechSynthesisUtterance(error.response.data.error.photo);
      speechSynthesis.speak(uttrens)
      imageerr.style.color="red";
      imageerr.innerHTML = error.response.data.error.photo  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
    }else{
        imageerr.innerHTML = ''
    }
    if(arr.some((item) => item ==="email")){
        uttrens = new SpeechSynthesisUtterance(error.response.data.error.email);
        speechSynthesis.speak(uttrens)
        emaileror.style.color="red";
        emaileror.innerHTML = error.response.data.error.email  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
      }else{
        emaileror.innerHTML = ''
      }
  }

  )
})
