import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const LoginPage = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={({ setSubmitting }) => {
        console.log("Form is validated! Submitting the form...");
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <Field 
              type="login"
              name="login"
              className="form-control" 
            />
            {errors.login && touched.login ? (
              <div>{errors.login}</div>
            ) : null}
          </div>
          <div className="form-group"> 
            <Field
              type="password"
              name="password"
              className="form-control"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginPage;
