const imageFile = document.getElementById("file")
const rightImage = document.getElementById("right-img")
const magicBtn= document.getElementById("button")
const loader =document.getElementById("loader")
const myModal = document.getElementById("myModal")
const resulImage = document.getElementById("result-image")
myModal.style.display ="block";
let apiUrl= "https://python-api.techsimplus.com/api/amazon-service/"

let imageBase64=null;
imageFile.addEventListener("change",()=>{
    //  const imageUrl=URL.createObjectURL(imageFile.files[0])
    //  rightImage.src=imageUrl
    // console.log(imageFile)
        // Second method 

        const oneImage=imageFile.files[0]
        const imageUrl=URL.createObjectURL(oneImage)
        rightImage.src=imageUrl
        const reader = new FileReader()
        reader.readAsDataURL(oneImage)
        reader.onload=()=>{
            imageBase64=reader.result.split(",")[1]
        }

    //  chooseimg.innerHTML==rightImage.src  
})


magicBtn.addEventListener("click",()=>{
    // console.log("API is Fetch")
    // if(button.innerHTML=="See The Magic"){
    //     button.innerHTML="API Is Fetch"
    // }
    // else{
    //     button.innerHTML="See The Magic"
    // }

    const service= document.querySelector('input[name="service"]:checked')?.value 
    console.log(service);
    if(service===undefined){
        alert("Please Select Correct Service")
        return;
    }
    if(imageBase64===null){
        alert("Please Select Image")
        return;
    }
    const newValues={
        service_type:service,
        image:imageBase64
    }
    loader.style.display="flex"
    myModal.style.backgroundColor= "rgb(0,0,0)" 
    myModal.style.backgroundColor= "rgba(0,0,0,0.4)"
     
    // fetch
    fetch(apiUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newValues)
    }).then((result)=>{
        return result.json()
    }).then((out)=>{
        rightImage.src=out.data.image
        resulImage.src=out.data.image
        loader.style.display="none"
        myModal.style.display="block";
        resulImage.style.display="block";
    })
})
myModal.addEventListener('click',()=>{
    myModal.style.display="none";
    myModal.style.backgroundColor= "none"
    myModal.style.backgroundColor= "none" 
})