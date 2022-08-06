console.log('passwordr');
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const registerbtn = document.querySelector('#registerbtn');
const passwordr = document.querySelector('#passwordr');
const loginbtn  = document.querySelector('#loginbtn');

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

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



sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// passwordr.addEventListener('input',()=>{
//   const passworder = document.querySelector('#passworder');
//   let leng = passwordr.value;
// if(leng.length <8){
//   passworder.innerHTML = 'Password 8 ta belgidan kop bolishi kerak';
// }else{
//   passworder.innerHTML = '';
// }

// });

registerbtn.addEventListener('click',()=>{
const csrftoken = getCookie('csrftoken');
const usernamer = document.querySelector('#usernamer');
const passwordr = document.querySelector('#passwordr');
const nameer = document.querySelector('#nameer');
const passworder = document.querySelector('#passworder');
const imgerr = document.querySelector('#imgerr');
let data = {
  "username":usernamer.value,
  "password":passwordr.value
};
let headers= {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
};


nameer.innerHTML = '';
passworder.innerHTML = '';

axios.post('http://127.0.0.1:8000/users/api/register',JSON.stringify(data),{headers:{
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,}
})
    .then((data) => {
      if(data.status === 201){
        uttrens = new SpeechSynthesisUtterance('You have successfully registered');
        speechSynthesis.speak(uttrens)
        nameer.style.color="rgb(95, 231, 31)";
        nameer.innerHTML = 'You have successfully registered' + '<i class="bi bi-check-circle" style="color: rgb(95, 231, 31);"></i>'
        
        setTimeout(()=>{
          container.classList.remove("sign-up-mode");
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

      if(arr.some((item) => item ==="password")){
        uttrens = new SpeechSynthesisUtterance(error.response.data.error.password);
        speechSynthesis.speak(uttrens)
        passworder.style.color="red";
        passworder.innerHTML = error.response.data.error.password  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
      }else{
        passworder.innerHTML = ''
      }
    }

    )
  
});



loginbtn.addEventListener('click',()=>{
  const csrftoken = getCookie('csrftoken');
  const usernamelogin = document.querySelector('#usernamelogin');
  const passwordlogin = document.querySelector('#passwordlogin');
  const nameerlogin = document.querySelector('#nameerlogin');
  const nameerlogin2 = document.querySelector('#nameerlogin2');
  const passworderlogin = document.querySelector('#passworderlogin');
 
  let data = {
    "username":usernamelogin.value,
    "password":passwordlogin.value
  };
 
  
  
  nameerlogin.innerHTML = '';
  passworderlogin.innerHTML = '';
  
  axios.post('http://127.0.0.1:8000/users/api/login',JSON.stringify(data),{headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,}
  })
      .then((data) => {
        console.log(data.data.login)
        if(data.status === 202){
          uttrens = new SpeechSynthesisUtterance("You have successfully logined");
          speechSynthesis.speak(uttrens)
          nameerlogin2.innerHTML = '';
          nameerlogin.innerHTML = '';
          passworderlogin.innerHTML = '';
          nameerlogin.style.color="rgb(95, 231, 31)";
          nameerlogin.innerHTML = 'You have successfully logined' + '<i class="bi bi-check-circle" style="color: rgb(95, 231, 31);"></i>'
          
          setTimeout(()=>{
            nameerlogin.innerHTML = ''
            window.location.href = "http://127.0.0.1:8000";
          },3000)
        }
      })
      .catch((error) => {
        const arr = Object.keys(error.response.data);


        if(arr.some((item) => item ==="username")){
          uttrens = new SpeechSynthesisUtterance(error.response.data.username);
          speechSynthesis.speak(uttrens)
          nameerlogin.style.color="red";
          nameerlogin.innerHTML = error.response.data.username + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
        }else{
          nameerlogin.innerHTML = ''
        };
  
        if(arr.some((item) => item ==="password")){
          uttrens = new SpeechSynthesisUtterance(error.response.data.password);
          speechSynthesis.speak(uttrens)
          passworderlogin.style.color="red";
          passworderlogin.innerHTML = error.response.data.password  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
        }else{
          passworderlogin.innerHTML = ''
        };
        if(arr.some((item) => item ==="non_field_errors")){
          uttrens = new SpeechSynthesisUtterance(error.response.data.non_field_errors[0]);
          speechSynthesis.speak(uttrens)
          nameerlogin2.style.color="red";
          nameerlogin2.innerHTML = error.response.data.non_field_errors[0]  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
        }else{
          nameerlogin2.innerHTML = ''
        };
      
      }
  
      )
    
  });