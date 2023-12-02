import s from './signUpForm.module.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPassword, hidePassword } from '../../features/inputTypeSlice';
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import axios from "axios";
import { Text36500 } from "../atoms/Text";
import { Text14400 } from "../atoms/Text";
import { Text16600 } from "../atoms/Text";
import { Text32500 } from "../atoms/Text";
import { Text16400 } from "../atoms/Text";
import { Text16500 } from "../atoms/Text";
import { Button18044 } from "../atoms/Buttons";
import Eye from "../../images/eye.svg";


const SignUpForm = (props) => {
 //strapi-----------------------------------------------------------
  const [formData, setFormData] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
  });
  const [placeholderData, setPlaceholderData] = useState({
    firstname: "Your First Name",
    lastname: "Your Last Name",
    email: "Your Email",
    password: "Your password",
    identifier: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        data: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          identifier: formData.email
        },
      };

      const response = await axios.post(props.url, requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
        setPlaceholderData({
          firstname: "Your First Name",
          lastname: "Your Last Name",
          email: "Your Email",
          password: "Your Password",
        });

        console.log("Registration successful");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  //isMobile-----------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;
  //redux-forms--------------------------------------------------------------------
  const dispatch = useDispatch();
  const isPasswordVisible = useSelector((state) => state.inputType.isPasswordVisible);
  const togglePasswordVisibility = () => {
    if (isPasswordVisible) {
      dispatch(hidePassword());
    } else {
      dispatch(showPassword());
    }
  };
    return (
        <div className={s.signUpForm__wrapper}>
          {props.img ? (<img src={props.img}  className={s.logo}/>) : " "}
          {isMobile ? (
        <h3 className={s.title}>
          <Text32500 text="Sign up" />
        </h3>
      ) : (
        <h3 className={s.title}>
          <Text36500 text="Sign up" />
        </h3>
      )}
        <form onSubmit={handleSubmit} className={s.signUp__form}>
          <div className={s.inputs__wrapper}>
            <div className={s.input__wrapper}>
              <span className={s.label}>
                <Text14400 text="First Name" color="rgba(153, 153, 153, 1)" />
              </span>
              <input
                type="text"
                className={s.input}
                placeholder={placeholderData.firstname}
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className={s.input__wrapper}>
              <span className={s.label}>
                <Text14400 text="Last Name" color="rgba(153, 153, 153, 1)" />
              </span>
              <input
                type="text"
                className={s.input}
                placeholder={placeholderData.lastname}
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className={s.input__wrapper}>
              <span className={s.label}>
                <Text14400 text="Email" color="rgba(153, 153, 153, 1)" />
              </span>
              <input
                type="text"
                className={s.input}
                placeholder={placeholderData.email}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={s.input__wrapper}>
              <span className={s.label}>
                <Text14400 text="Password" color="rgba(153, 153, 153, 1)" />
              </span>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className={s.input}
                placeholder={placeholderData.password}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <img src={Eye} alt="eye" className={s.eye}  onClick={togglePasswordVisibility}/>
            </div>
        {/* <Link to='/SignIn'> */}
            <button className={s.button__wrapper} type="submit">
              <Button18044
                text={<Text16600 text="Sign up" color="#fff" />}
                bg="rgba(173, 121, 85, 1)"
                borderRadius="8px"
              />
            </button>
        {/* </Link> */}
            <div className={s.reminder}>
              <span className={s.text}>
                <Text16400
                  text={"Already have an account?"}
                  color="rgba(153, 153, 153, 1)"
                />
              </span>
              <span className={s.link} onClick={props.click}>
                <Text16500
                  text={"Sign in"}
                  color="#AD7955"
                  //underline={true}
                />
              </span>
            </div>
          </div>
        </form>
        <div className={s.terms}>
          By proceeding, you agree to our{" "}
          <span className={s.underline}>Terms of Use</span> and{" "}
          <span className={s.underline}>Privacy Policy</span>
        </div>
      </div>
    )
}

export default SignUpForm;