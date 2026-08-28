import { ErrorMessage, Field, Form, Formik } from "formik";
import validation from "./validation";
import { Link } from "react-router-dom";
import routesMap from "../../../../../routeControl/userRoutMap";
function SignUpForm({onSubmit}) {

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: ""
  };
  return (
    <>
      <Formik initialValues={{...initialValues}}
      validationSchema={validation()}
      onSubmit={onSubmit}>
        {() => {
          return (
            <Form>
              <div className="wrapper mt-5">
                <div className="logo">
                  <img
                    src="https://cdn.imgbin.com/16/3/18/imgbin-online-shopping-shopping-cart-logo-e-commerce-market-ZB0j7BGkzwjLHhMxSKi37nGKD.jpg"
                    alt="img"
                  />
                </div> <div className="" style={{color:'red',fontSize:17}}><ErrorMessage name="firstname" component="div" /></div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user" />
                  <Field
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                  />
                </div><div className="" style={{color:'red',fontSize:17}}><ErrorMessage name="lastname" component="div" /></div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user" />
                  <Field
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                  />
                </div><div className="" style={{color:'red',fontSize:17}}><ErrorMessage name="email" component="div" /></div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user" />
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div><div className="" style={{color:'red',fontSize:17}}><ErrorMessage name="password" component="div" /></div>
                <div className="form-field d-flex align-items-center">
                  <span className="fas fa-key" />
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div><div className="" style={{color:'red',fontSize:17}}><ErrorMessage name="phoneNumber" component="div" /></div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user" />
                  <Field
                    type="number"
                    name="phoneNumber"
                    min={0}
                    id="phoneNumber"
                    placeholder="Phone Number"
                  />
                </div> 
                <button className="btn mt-3" type="submit">
                  Login
                </button>
                <div className="text-center fs-6">
                  <Link href="#">Forget password?</Link> or <Link to={routesMap.LOGIN.path}>Login</Link>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default SignUpForm;
