

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