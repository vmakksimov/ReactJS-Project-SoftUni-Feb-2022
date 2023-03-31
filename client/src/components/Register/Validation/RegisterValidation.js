

export const RegisterValidation = (res, registeredUser, e, bound, values, newErrors) => {
    if (res !== undefined) {
        registeredUser = Object.values(res).find(x => x.username == e.target.value || x.email == e.target.value)
    }

    if (registeredUser) {
        // setErrors({
        //     [e.target.name]: values[e.target.name]
        // })
        console.log('hahahahhhaha')
        newErrors = {[e.target.name]: values[e.target.name]}

    } else {
        // setErrors({})
        newErrors = {}
    }

    if (bound && e.target.value.length < bound) {

        // setErrors({
        //     [e.target.name]: values[e.target.name]
        // })
        newErrors = {[e.target.name]: values[e.target.name]}

    }

    if (e.target.name == 'password' && e.target.parentElement.parentElement.children[5].children[1].value.length > 0) {
        const repassword = e.target.parentElement.parentElement.children[5].children[1].name

        if (e.target.parentElement.parentElement.children[5].children[1].value != e.target.value) {
            // setErrors({
            //     [repassword]: values[repassword]
            // })
            newErrors = {[repassword]: values[repassword]}
        }
    }

    if (e.target.name == 're_password' && e.target.parentElement.parentElement.children[4].children[1].value != e.target.value) {
        // setErrors({
        //     [e.target.name]: values[e.target.name]
        // })
        newErrors = {[e.target.name]: values[e.target.name]}
    }

    return res, registeredUser, e, bound, values, newErrors

}


export function validateEmail(mail) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
		return false;
	}
  }

  export  function validateUrl(value) {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }