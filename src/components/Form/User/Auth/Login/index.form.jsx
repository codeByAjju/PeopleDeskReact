import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import validation from "./validation";
import { useState } from "react";
import routesMap from "../../../../../routeControl/userRoutMap";
import "./Login.css";

function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <section className="login-page">
            <div className="login-container">
              <div className="login-brand-panel">
                <div className="login-brand-content">
                  <div className="login-brand-logo">
                    <i className="fa fa-shield" aria-hidden="true" />
                  </div>
                  <h1>Welcome Back</h1>
                  <p>
                    Sign in to access your dashboard, manage your account, and
                    stay connected.
                  </p>
                  <ul className="login-brand-features">
                    <li>Secure & encrypted authentication</li>
                    <li>Access your personal dashboard</li>
                    <li>Manage profile & preferences</li>
                  </ul>
                </div>
              </div>

              <div className="login-form-panel">
                <div className="login-form-header">
                  <h2>Sign In</h2>
                  <p>Enter your credentials to continue</p>
                </div>

                <div className="login-field">
                  <label htmlFor="email">Email Address</label>
                  <div className="login-input-wrap">
                    <i className="fa fa-envelope login-input-icon" aria-hidden="true" />
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="login-error" />
                </div>

                <div className="login-field">
                  <label htmlFor="password">Password</label>
                  <div className="login-input-wrap has-toggle">
                    <i className="fa fa-lock login-input-icon" aria-hidden="true" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      className="login-toggle-password"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i
                        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="login-error" />
                </div>

                <div className="login-options">
                  <label className="login-remember">
                    <input type="checkbox" name="remember" />
                    <span>Stay logged in</span>
                  </label>
                  <a className="login-forgot" href="#">
                    Forgot password?
                  </a>
                </div>

                <button
                  className="login-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="login-spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <i className="fa fa-arrow-right" aria-hidden="true" />
                    </>
                  )}
                </button>

                <div className="login-divider">or continue with</div>

                <div className="login-social-btns">
                  <button type="button" className="login-social-btn">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="login-social-btn">
                    <svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>

                <div className="login-footer">
                  Don&apos;t have an account?{" "}
                  <Link to={routesMap.SIGNUP.path}>Create one</Link>
                </div>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
