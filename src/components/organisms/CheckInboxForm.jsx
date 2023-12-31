import s from "./checkInboxForm.module.scss";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { Link, useHistory } from "react-router-dom";
import InputForm from "../../components/organisms/InputForm";
//import SignInFunction from "../../functions/signInFunction";
import { Button18044 } from "../atoms/Buttons";
import { Text36500 } from "../atoms/Text";
import { Text14400 } from "../atoms/Text";
import { Text14500 } from "../atoms/Text";
import { Text16400 } from "../atoms/Text";
import { Text16600 } from "../atoms/Text";
import { Text16500 } from "../atoms/Text";
import { Text32500 } from "../atoms/Text";
import { Text14700 } from "../atoms/Text";
import Eye from "../../images/eye.svg";

const CheckInboxForm = (props) => {
  const styled = {
    height: props.height
  }
  const displayed = {
    display: props.display
  }
  //isMobile-----------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;

  return (
    <div className={s.signInForm__wrapper} style={styled}>
      {props.img ? (<img src={props.img} className={s.logo}/>) : " "}
      <form className={s.forgotPassword__form}>
      {isMobile ? (
        <h3 className={s.title}>
          <Text32500 text="Please check your inbox" textAlign='center'/>
        </h3>
      ) : (
        <h3 className={s.title}>
          <Text36500 text="Please check your inbox" />
        </h3>
      )}
        <div className={s.text}>
          Check your email<span className={s.text__bold}> name@gmail.com </span>
          for instructions on how to reset your password. If it doesn’t appear
          within a few minutes, check your spam folder.
        </div>

        <div className={s.inputs__wrapper}>
              <div className={s.reminder}>
                <span className={s.text}>
                  <Text16400
                    text={"Didn't receive the email?"}
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <span className={s.link} >
                  <Text16500
                    text={"Go to Support"}
                    color="rgba(173, 121, 85, 1)"
                    underline={true}
                  />
                </span>
              </div>
        </div>
       
      </form>
      <div className={s.terms} style={displayed}>
        By proceeding, you agree to our{" "}
        <span className={s.underline}>Terms of Use</span> and{" "}
        <span className={s.underline}>Privacy Policy</span>
      </div>
    </div>
  );
};

export default CheckInboxForm;
