import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";

import FormInput from "../formInput";
import Button from "../button";

import { SignUpContainer } from "./signUpForm.styles";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords do not match!");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			}

			console.log("user creation encountered an error", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign Up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
				<FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
				<FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
				<FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
				<Button type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
