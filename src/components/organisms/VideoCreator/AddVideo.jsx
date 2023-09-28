import av from "./addVideo.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
//components----------------------------------
import { Button18044 } from "../../atoms/Buttons";
import { Text24500 } from "../../atoms/Text";
import { Text16600 } from "../../atoms/Text";
import { Text36500 } from "../../atoms/Text";
import { Text14400 } from "../../atoms/Text";
import { Text16400 } from "../../atoms/Text";
import { Icones } from "../../../Data";
import ColumnTemplate from "../../molecules/ColumnTemplate";
import Input from "../../atoms/Input";
//images----------------------------------------
import Dots from "../../../images/Dots.svg";
import e from "cors";

const AddVideo = (props) => {
  //isMobile--------------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;
  //showModal-newVideo-----------------------------------------------
  const [isModal, setModal] = useState(false);
  const showModal = () => {
    setModal(!isModal);
  };
//post-data-------------------------------------------------------------------
const [formData, setFormData] = useState(null)
const handleSubmit = async (e) => {
  e.preventDefault()
  if (!formData) {
    console.error("Please select file")
    return
  }
  const formDataServer = new FormData()
  formDataServer.append("files",formData[0])
}


  return (
    <div className={av.container}>
      <div className={av.functions__wrapper}>
        <Text24500 text="Adding a new video" />
        <div className={av.buttons__wrapper}>
          <Button18044
            text={<Text16600 text="Publish" color="rgba(187, 187, 187, 1)" />}
            width="180px"
            bg="#777"
            borderRadius="8px"
          />
          <img src={Icones.dots} alt="dots" />
        </div>
      </div>
      <div className={av.uploadForm__wrapper}>
        {!isModal && (
          <div className={av.uploadForm__body}>
            <img src={Icones.uploadLogo} alt="logo" className={av.logo} />
            {isMobile ? (
              <Text36500 text="New video" lineHeight="42px" />
            ) : (
              <Text36500
                text="Drag and drop videos to upload"
                lineHeight="42px"
              />
            )}
            <div onClick={showModal}>
              <Button18044
                text={<Text16600 text="Or choose files" />}
                width="180px"
                borderRadius="8px"
              />
              </div>
          </div>
        )}
      </div>
      {isModal && (
        <form>
          <div className={av.modal__wrapper}>
            <div className={av.modal__container}>
              <div className={av.header}>
                <Text24500 text="New video" />
                {isMobile ? (
                  ""
                ) : (
                  <Text14400 text="Add a link on the video for upload" />
                )}
              </div>
              <div className={av.input__wrapper}>
                <label htmlFor="addVideo" className={av.inputLabel}>
                  <Text14400 text="Store link" />
                </label>
                <div className={av.input__body}>
                  <input type="file" name="addVideo" className={av.input} onChange={(e) => setFormData(e.target.files[0])}/>
                  <div className={av.placeholder__wrapper}>
                    <img src={Icones.addFile} alt="icon" />
                    <Text16400
                      text="Store link"
                      color="rgba(153, 153, 153, 1)"
                    />
                  </div>
                </div>
              </div>
              <div className={av.buttons__wrapper}>
                <button className={av.button}>Cancel</button>
                <button className={av.button} onClick={props.click}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className={av.overlay}></div>
    </div>
  );
};

export default AddVideo;