const patientRegForm = document.querySelector("#patientReg")

patientRegForm.addEventListener("submit", (patientReg)=>{
    patientReg.preventDefault();


    const patientData = {
        patientName: patientRegForm.patientName.value,
        age: patientRegForm.patientName.value,
        hospitalName: patientRegForm.age.value,
        weight: patientRegForm.weight.value,
        height: patientRegForm.height.value,
        bloodGroup: patientRegForm.bloodGroup.value,
        genotype: patientRegForm.genotype.value,
        bloodPressure: patientRegForm.bloodPressure.value,
        HIV_status: patientRegForm.HIV_status.value,
        hepatitis: patientRegForm.hepatitis.value,
        
    }
    fetch('/patients/create', {
        method:"POST",
        body:JSON.stringify('patientData'),
        headers: {"Content-Type": "application/json"}
    })
    .then((response)=>{
        if(response.ok){
            alert("Report successfully registered")
            window.location.assign('/dashboard')
            return response.json()
        }else{
            console.log(response)
            alert("Registration unsuccessful")
        }
    }).catch((error)=>{
        console.log(error)
    })
})