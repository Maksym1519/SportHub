import s from "../organisms/signInForm.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectData } from "../../features/getIdSlice";
import { getId } from "../../features/getIdSlice";
import getIdSlice from "../../features/getIdSlice";
import { Link, useHistory } from "react-router-dom";
import InputForm from "../../components/organisms/InputForm";
import { Button18044 } from "../atoms/Buttons";
import { Text36500 } from "../atoms/Text";
import { Text14400 } from "../atoms/Text";
import { Text14500 } from "../atoms/Text";
import { Text16400 } from "../atoms/Text";
import { Text16600 } from "../atoms/Text";
import { Text16500 } from "../atoms/Text";
import { Text32500 } from "../atoms/Text";
import Eye from "../../images/eye.svg";
import { hidePassword } from "../../features/inputTypeSlice";
import { showPassword } from "../../features/inputTypeSlice";

const InputEyeForStory = (props) => {
  const styled = {
    height: props.height,
    border: "none",
    outline: "none",
    marginRight: props.margin
  };
  //signin---------------------------------------------------------
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); // Список пользователей из базы данных

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://sporthubdeploy2.onrender.com/api/clients");
      const usersData = response.data.data;
      const user = usersData.find(
        (u) =>
          u.attributes.email === formData.email &&
          u.attributes.password === formData.password
      );
      if (user) {
        // Пароль совпадает, пользователь вошел успешно
        window.location.href = props.link;
      } else {
        setError(<Text16500 text="Неверная электронная почта или пароль" />);
      }
    } catch (error) {
      setError(<Text16500 text="Произошла ошибка при входе" />);
    }
    console.log(formData);
  };
    
 // post-request-with-data-for-authentication---------------------------
 const [id, setId] = useState("");
 useEffect(() => {
   localStorage.setItem("id", id);
   console.log(id);
 }, [id]);

 const dispatch = useDispatch();

 useEffect(() => {
   console.log("Dispatching ID:", id); // Проверим значение id перед dispatch
   dispatch(getId({ payload: id }));
 }, [dispatch, id]);
 const data = useSelector(selectData);
  console.log("Data from selectData:", data);
   //isMobile-----------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;
 //redux-forms--------------------------------------------------------------------
 const isPasswordVisible = useSelector((state) => state.inputType.isPasswordVisible);
 const togglePasswordVisibility = () => {
   if (isPasswordVisible) {
     dispatch(hidePassword());
   } else {
     dispatch(showPassword());
   }
 };
  return (
<>
    <div className={s.signInForm__wrapper} style={styled}>
       <form className={s.signIn__form} onSubmit={handleSubmit}>
        <div className={s.inputs__wrapper}>
        <div className={s.input__wrapper}>
            <div className={s.forgotPassword__wrapper}>
              <span className={s.label}>
                <Text14400 text="Password" color="rgba(153, 153, 153, 1)" />
              </span>
              <span
                className={s.forgotPassword__link}
                onClick={props.forgotPassword}
              >
                <Text14500
                  text="Forgot password?"
                  color="rgba(173, 121, 85, 1)"
                />
              </span>
            </div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className={s.input}
              placeholder={"Your password"}
              name="password"
              onChange={handleChange}
              style={styled}
            />
            <img src={Eye} alt="eye" className={s.eye} onClick={togglePasswordVisibility}/>
          </div>
         </div>
     </form>
     </div>
</>
  );
};

export default InputEyeForStory;
