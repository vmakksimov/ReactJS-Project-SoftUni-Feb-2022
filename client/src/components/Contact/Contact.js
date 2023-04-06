import { useState } from "react"
import { ThankYou } from "./ThankYou"
import { validateEmail } from "../../Validation/RegisterValidation"

export const Contact = () => {

  const [submited, setSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    email: '',
    name: '',
    message: '',
  });

  const ChangeHandler = (e) => {
    setValues(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const validationHandler = (e, bound) => {
    if (e.target.name == 'email') {
      if (!validateEmail(e.target.value)) {
        setErrors({
          [e.target.name]: values[e.target.name]
        })
      } else {
        setErrors({})
      }
    }
    if (e.target.name == 'name' || e.target.name == 'message') {
      if (e.target.value.length < Number(bound)) {

        setErrors({
          [e.target.name]: values[e.target.name]
        })
      } else {
        setErrors({})
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')


    if (name.length < 2 || message.length < 2) {
      return;
    }else if(!validateEmail(email)){
      return;
    }else {
      if (submited) {
        setSubmit(false)
      } else {
        setSubmit(true)
      }
    }

  }
  return (
    <>

      <section className="contact-information padding-large mt-3">
        <div className="container">
          {!submited
            ? <div className="row">
              <div className="col-md-6 p-0 mb-3">
                <h2>Get in Touch</h2>
                <div className="contact-detail d-flex flex-wrap mt-4">
                  <div className="detail mr-6 mb-4">
                    <p>
                      Feel free to get in touch at any time in the provided contacts below.
                    </p>
                    <ul className="list-unstyled list-icon">
                      <li>
                        <i className="icon icon-phone" />
                        +1650-243-0000
                      </li>
                      <li>
                        <i className="icon icon-envelope-o" />
                        <a href="mailto:info@yourcompany.com">vmakksimov@gmail.com</a>
                      </li>
                      <li>
                        <i className="icon icon-location2" />
                        Sofia, Bulgaria
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 p-0">
                <div className="contact-information">
                  <h2>Send A Message</h2>
                  <form
                    name="contactform"
                    className="contact-form d-flex flex-wrap mt-4"
                    onSubmit={onSubmit}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          minLength={2}
                          name="name"
                          values={values.name} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)}
                          placeholder="Name"
                          className="u-full-width"
                          required
                        />
                        {errors.name &&
                          <p className="form-error" >
                            The name must be longer than 2 characters!
                          </p>
                        }
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          name="email"
                          values={values.email} onChange={ChangeHandler} onBlur={(e) => validationHandler(e)}
                          placeholder="E-mail"
                          className="u-full-width"
                          required
                        />
                        {errors.email &&
                          <p className="form-error" >
                            The email is invalid!
                          </p>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="u-full-width"
                          name="message"
                          values={values.message} onChange={ChangeHandler} onBlur={(e) => validationHandler(e, 2)}
                          placeholder="Message"
                          style={{ height: 150 }}
                          required
                          defaultValue={""}
                        />
                        {errors.message &&
                          <p className="form-error" >
                            The message must be longer than 2 characters!
                          </p>
                        }
                        <button
                          type="submit"
                          name="submit"
                          className="buttonEdit"
                          style={{color: 'white', width: '100%', padding: '29px'}}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            : <ThankYou />
          }
        </div>
      </section>
      <section className="google-map">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width="100%"
              height={500}
              id="gmap_canvas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791274.6479039122!2d23.30003653929558!3d42.703483939223446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a8fec1c85bf089%3A0xa01269bf4c10!2z0JHRitC70LPQsNGA0LjRjw!5e1!3m2!1sbg!2sbg!4v1679950582239!5m2!1sbg!2sbg"

              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
            />
            <a href="https://getasearch.com/fmovies" />
            <br />
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".mapouter{position:relative;text-align:right;height:500px;width:100%;}"
              }}
            />
            <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".gmap_canvas {overflow:hidden;background:none!important;height:500px;width:100%;}"
              }}
            />
          </div>
        </div>
      </section>
    </>

  )
}