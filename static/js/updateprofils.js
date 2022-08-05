const username = document.querySelector('#username'),
       image = document.querySelector('#image'),
       email = document.querySelector('#email'),
       avatar = document.querySelector('#avatar'),
       btn = document.querySelector('.btn'),
       inputelement = document.querySelectorAll('.input-div');

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
axios.get('http://127.0.0.1:8000/users/api/update/profile')
.then((data)=>{
    if(data.status === 200){
        username.value = data.data.username;
        email.value = data.data.email;
        avatar.src = data.data.photo;
    }
})
const images = document.querySelector('#image');
let imagefile = '';       
       images.addEventListener('change',(e)=>{
        imagefile= e.target.files[0]
        console.log(e.target.files[0])
        console.log(imagefile)
       })
console.log(typeof imagefile)

let profiledata = new FormData();


btn.addEventListener('click',()=>{
    const usernames = document.querySelector('#username'),
       emails = document.querySelector('#email');
    if(imagefile !== ''){
        profiledata.append('photo',imagefile);
    }
    
    profiledata.append('username',usernames.value);
    profiledata.append('email',emails.value);
    const csrftoken = getCookie('csrftoken');
    axios.put('http://127.0.0.1:8000/users/api/update/profile',profiledata,{headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,}
  })
  .then((data)=>{
    console.log(data)
  })
})
