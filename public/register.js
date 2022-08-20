// const registrationForm = document.getElementById('submit-btn')
// console.log(registrationForm)
const registrationForm = document.querySelector('#regform')
//    console.log(registrationForm)
// const submitBt
registrationForm.addEventListener('submit', (reg) => {

    
    reg.preventDefault();
    // reg.stopPropagation();

    const doctorData = {
        DoctorsName: registrationForm.DoctorsName.value,
        email: registrationForm.email.value,
        specialization: registrationForm.specialization.value,
        gender: registrationForm.gender.value,
        phoneNumber: registrationForm.phoneNumber.value,
        password: registrationForm.password.value,
        confirm_password: registrationForm.confirm_password.value
        
    }
    
    fetch('/doctors/register', {
        method: 'POST',
        body: JSON.stringify(doctorData),
        headers: {'Content-Type': 'application/json'}
    })
    .then((response)=>{
        if(response.ok){
            alert("Registration was successful")
            window.location.assign("/login")
            return response.json()
        }else{
            console.log(response)
            alert('Registration failed')
            // window.location.assign("/")
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})