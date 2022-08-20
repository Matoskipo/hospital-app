const patientForm = document.querySelector('#regform')
//    console.log(registrationForm)
// const submitBt
patientForm.addEventListener('submit', (reg) => {

    
    reg.preventDefault();
    // reg.stopPropagation();

    const doctorData = {
        DoctorsName: patientForm.patientName.value,
        email: patientForm.age.value,
        specialization: patientForm.hospitalName.value,
        gender: patientForm.weight.value,
        phoneNumber: patientForm.height.value,
        password: patientForm.password.value,
        confirm_password: patientForm.bloodGroup.value,
        confirm_password: patientForm.bloodPressure.value,
        confirm_password: patientForm.HIV_status.value,
        confirm_password: patientForm.hepatitis.value
        
    }
    
    fetch('/patients/delete/:id', {
        method: 'DELETE',
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


