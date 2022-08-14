
const conversation = document.querySelector('.users-list')
console.log(conversation)

axios.get(`http://bestshop.pythonanywhere.com/users/api/chat/user`)
.then(data=>{
    data.data.forEach(user => {
        const element = document.createElement('div');
        element.innerHTML=`
        <a href="http://bestshop.pythonanywhere.com/users/chat/${user.id}">
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