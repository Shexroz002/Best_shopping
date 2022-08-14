// MESSAGE INPUT
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


const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')

textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length

	if(textarea.rows < 6 || line < 6) {
		textarea.rows = line
	}

	if(textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end'
	} else {
		chatboxForm.style.alignItems = 'center'
	}
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

chatboxToggle.addEventListener('click', function () {
	const is_superuser=localStorage.getItem('is_superuser')
	if(is_superuser === 'false'){
		chatboxMessage.classList.toggle('show')
	}else{
		window.location.href="http://bestshop.pythonanywhere.com/users/chat"
	}
	
})



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show')
	}
})







// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
	e.preventDefault()
	const csrftoken = getCookie('csrftoken'); 
	let data = {
		"message":textarea.value
	  };
	  let headers= {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
	  };
	if(isValid(textarea.value)) {
		axios.post('http://bestshop.pythonanywhere.com/users/api/chat/6',JSON.stringify(data),{headers:{
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,}
		})
		.then(data=>{
			if(data.status ===201){
				writeMessage()
			}
		})
		
		setTimeout(autoReply, 1000)
	}
})

axios.get('http://bestshop.pythonanywhere.com/users/api/chat/6')
.then(data=>{
  if(data.status === 200){
	  console.log(data.data)
	  data.data.forEach(element => {
		  if(element.write_chat.is_superuser){
			  
			const today = new Date(element.data)
			  let messages = `
			<div class="chatbox-message-item received">
				<span class="chatbox-message-item-text">
				${element.message.trim().replace(/\n/g, '<br>\n')}
				</span>
				<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
			</div>
		`
		chatboxMessageWrapper.insertAdjacentHTML('beforeend', messages)
		chatboxForm.style.alignItems = 'center'
		textarea.rows = 1
		textarea.focus()
		textarea.value = ''
		chatboxNoMessage.style.display = 'none'
		scrollBottom()
		  }else{
			const today = new Date(element.data)
			let messages = `
			<div class="chatbox-message-item sent">
				<span class="chatbox-message-item-text">
					${element.message.trim().replace(/\n/g, '<br>\n')}
				</span>
				<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
			</div>
		`
		chatboxMessageWrapper.insertAdjacentHTML('beforeend', messages)
		chatboxForm.style.alignItems = 'center'
		textarea.rows = 1
		textarea.focus()
		textarea.value = ''
		chatboxNoMessage.style.display = 'none'
		scrollBottom()
		  }
	
	  });
	
  }
})


function addZero(num) {
	return num < 10 ? '0'+num : num
}


function writeMessage() {
	const today = new Date()
	let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
	chatboxForm.style.alignItems = 'center'
	textarea.rows = 1
	textarea.focus()
	textarea.value = ''
	chatboxNoMessage.style.display = 'none'
	scrollBottom()
}

function autoReply() {
	const today = new Date()
	let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				Savoliz qabul qilindi."${localStorage.getItem('username')}"!.Tez orada javob beramiz.
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
	scrollBottom()
}

function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}