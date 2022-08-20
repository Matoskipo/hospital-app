const login = document.querySelector('#login-form')

login.addEventListener('submit', (loginEl) =>{
    loginEl.preventDefault();
    loginEl.stopPropagation();

    const prePayLoad = new FormData(login)
    const payLoad = new URLSearchParams(prePayLoad)

    fetch('/doctors/login', {
        method: 'POST',
        body: payLoad
    })
    .then((response) => {
        if(response.ok){
            console.log(response)
            alert('Login Successful')
            window.location.assign('/dashboard')
            return response.json()
        }else {
            alert('Login Failed')
        }
    })
    .catch((error) => {
        console.log(error)
    })

})