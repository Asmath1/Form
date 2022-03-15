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
    nameValidation(name, "name-error");
    emailValidation(email, "email-error");
    numberValidation(phone, "number-error");
    }


    function nameValidation(value,id){
        isEmptyOrShort(value, id, 3, "Name");
    }    

    function isEmptyOrShort(value, id,minlength, key)
    {
        if(!value) {
            setError(id, "Please enter your " + key);
            return;
        }
        if (value.length<minlength) {
            setError(id, key + "must be at least" + minlength + "characters");
            return;
        }
        setError(id, "");
    }

    // if(!name) {
    //     _("name-error").innerHTML = "Please enter your name";
    // }
    // if(name.length<3){
    //     _("name-error").innerHTML = "Name must be at least 3 characters";
    // }




    function emailValidation(value,id){
        if(!value) {
            setError(id, "Please enter your email");
            return;
        } 
         if (!value.includes("@")) {
            setError(id, "Please enter a valid email");
            return;
        }
        setError(id, "");
    }

    function setError(id, message) {

        _(id).innerHTML = message;
    }

    function numberValidation(value,id){
        if(!value) {
            setError(id, "Please enter your phone number");
            return;
        } 
         if (!value.length=) {
            setError(id, "phone number must be 10 digits");
            return;
        }
        setError(id, "");
    }

