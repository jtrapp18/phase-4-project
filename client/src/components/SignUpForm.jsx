import React, { useContext } from "react";
import { postJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';

const Button = styled.button``;

const Error = styled.button``;

const Input = styled.input``;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label``;

function SignUpForm({ setShowConfirm }) {
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values) => {
      const body = {
        username: values.username,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      postJSONToDb("signup", body)
        .then((newUser) => {
          if (newUser) {
            setUser(newUser);
            setShowConfirm(true);
          }
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords must match';
      }
      return errors;
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Sign Up</h1>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
          <Error>{formik.errors.password_confirmation}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button type="submit">Sign Up</Button>
      </FormField>
    </form>
  );
}

export default SignUpForm;