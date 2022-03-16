window.addEventListener("load",main);

function _(id) {
    return document.getElementById(id);
}

function main(){
    _("signup-form").addEventListener("submit",validate);
}

function validate(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var name= formData.get("name");
    var username = formData.get("username");
    var email = formData.get("email");
    var password =formData.get("password");
    var confirmPassword =formData.get("confirmPassword");
    var phone =formData.get("phone");
    if(
        nameValidation(name, "name-error") &&
        usernameValidation(username,"username-error") &&
        emailValidation(email, "email-error") &&
        numberValidation(phone, "number-error") &&
        passwordValidation(password, "password-error") &&
        confirmPasswordValidation(confirmPassword, password, "confirmPassword-error")
        )
{
    
   submit({
    name,
    username,
    email,
    phone,
    password,
    });
    } 
    else {
        console.log("Failed");
    }
}

    function submit (data){
        let postRequest = function (url, data) {
        return new Promise(function(resolve,reject){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState === 4 && this.status ==201){
                resolve(JSON.parse(this.responseText));
            }else if (this.readyState == 4) {
                reject(JSON.parse(this.responseText || "error"));
            }
                
        };
    xhttp.open("POST", url,true);
    xhttp.setRequestHeader("content-type", "application/JSON");
    xhttp.send(JSON.stringify(data));
        });

    };

    postRequest("http://192.168.1.39:3000/user", data)
    .then((result) =>{
        window.location.href = "./user.html?id=" + result.id;
    })
    .catch((err)=>{
        console.log(err);
    });
}

    function nameValidation(value,id){
        return !isEmptyOrShort(value, id, 3 , "Name ");
    }    

    function isEmptyOrShort(value, id,minlength, key)
    {
        if(!value) {
            setError(id, "Please enter your " + key);
            return true;
        }
        if (value.length<minlength) {
            setError(id, key + "must be at least " + minlength + " characters");
            return true;
        }
        setError(id, "");
        return false;
    }
    //function(){
    // if(!name) {
    //     _("name-error").innerHTML = "Please enter your name";
    // }
    // if(name.length<3){
    //     _("name-error").innerHTML = "Name must be at least 3 characters";
    // }


    function emailValidation(value,id){
        if(!value) {
            setError(id, "Please enter your email");
            return false;
        } 
         if(!value.includes("@")) {
            setError(id, "Please enter a valid email");
            return false;
        }
        setError(id, "");
        return true;
    }

    function usernameValidation(value,id){
        return !isEmptyOrShort(value, id, 4 , "username ");
    }

    function numberValidation(value,id){
       return !isEmptyOrShort(value, id, 10 , "Phone number ");
    }    


    function passwordValidation(value,id){
       return !isEmptyOrShort(value, id, 6, "password ");
    }


    function confirmPasswordValidation(value,password,id){
        if(value !== password){
            setError(id, "Password does not match");
            return false;
        }
       setError(id, "");
       return true;
    }

    

    function setError(id, message) {
        _(id).innerHTML = message;
    }