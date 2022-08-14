
const conversation = document.querySelector('.users-list')
console.log(conversation)

axios.get(`http://127.0.0.1:8000/users/api/chat/user`)
.then(data=>{
    data.data.forEach(user => {
        const element = document.createElement('div');
        element.innerHTML=`
        <a href="http://127.0.0.1:8000/users/chat/${user.id}">
        <div class="content">
        <img src=${user.photo} alt="Noimage">
        <div class="details">
            <span>${user.username}</span>
            <p>Resently</p>
        </div>
        </div>
        <div class="status-dot"><i class="fas fa-circle"></i></div>
    </a>
        
        `
        conversation.append(element)
    });
})