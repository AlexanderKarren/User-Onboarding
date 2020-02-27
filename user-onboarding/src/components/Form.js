import React, { useState, useEffect } from 'react';
import './Form.css';
import MemberList from './MemberList';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = ({ values, touched, errors, status }) => {
    const [clubMembers, updateMembers] = useState([{
            name: "Billy Madison",
            email: "billiem@aol.com",
            password: "dexterslaboratory34",
            teacher: "Mrs. Applegate",
            agreement: true,
        },
        {
            name: "Nancy Sullivan",
            email: "susieqnancy@hotmail.com",
            password: "nancys1981",
            teacher: "Mr. Campbell",
            agreement: true,
        },
    ]);
    useEffect(() => {
        console.log("status has changed – ", status);
        status && updateMembers(clubMembers => [...clubMembers, status]);
    })
    return (
        <section>
            <div>
                <img src="images/genie.gif" alt="funny genie" />
                <div>
                    <h2>Sign up</h2>
                    <p>anyone can sign up (as long as you are in 3rd grade and not LAME!)</p>
                </div>
                <img src="images/genie.gif" alt="funny genie" />
            </div>
            <Form autoComplete="off">
                <label>
                    Name:
                    <Field id="name" name="name" type="text" placeholder="name" />
                </label>
                {touched.name && errors.name && (<div>{errors.name}</div>)}
                <label>
                    E-mail:
                    <Field id="email" name="email" type="email" placeholder="email" />
                </label>
                {touched.email && errors.email && (<div>{errors.email}</div>)}
                <label>
                    password:
                    <Field id="password" name="password" type="password" placeholder="password" />
                </label>
                {touched.password && errors.password && (<div>{errors.password}</div>)}
                <label>
                    Teacher:
                    <Field as="select" name="teacher">
                        <option value="" disabled>Choose class</option>
                        <option value="applegate">Mrs. Applegate</option>
                        <option value="campbell">Mr. Campbell</option>
                        <option value="lekebum">Mrs. Lekebum</option>
                    </Field>
                </label>
                <label>
                    <Field id="agreement" name="agreement" type="checkbox" checked={values.agreement} />
                    I am a third grader and I am NOT LAME.
                </label>
                <button type="submit">SIGN UP!</button>
            </Form>
            <MemberList members={clubMembers} />
        </section>
    )
}

const FormikSignupForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            teacher: props.teacher || "",
            agreement: props.agreement || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("name is required!").max(20, "your name is too long!"),
        email: Yup.string().required("no email? are you poor?").email("that's not an email!"),
        password: Yup.string().required("please put in your password").min(8, "too short!").max(20, "too long!"),
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios.post("https://reqres.in/api/users/", values).then(response => {
            console.log("success", response);
            setStatus(response.data);
            resetForm();
        })
    }
})(SignupForm);

export default FormikSignupForm;