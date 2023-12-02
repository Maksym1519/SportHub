import p from "./profileCreatorFilled.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
//redux------------------------------------------
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { useDispatch, useSelector } from "react-redux";
import { showMale, showFemale, showNone } from "../../../features/genderSlice";
//components------------------------------------
import Header from "../../organisms/Header";
import HeaderCreator from "../../organisms/HeaderCreator";
import { Button18044 } from "../../atoms/Buttons";
import { Button10644 } from "../../atoms/Buttons";
import ColumnTemplate from "../../molecules/ColumnTemplate";
import Avatext from "../../molecules/Avatext";
import { Icones } from "../../../Data";
//text-----------------------------------------
import { Text24500 } from "../../atoms/Text";
import { Text16600 } from "../../atoms/Text";
import { Text14400 } from "../../atoms/Text";
import { Text18500 } from "../../atoms/Text";
//images---------------------------------------
import Radio from "../../../images/Radiobutton.svg";
import RadioActive from "../../../images/Radiobutton-active.svg";

const ProfileCreatorFilled = () => {
  //redux-gender---- ------------------------------------------
  const dispatch = useAppDispatch();
  const currentComponent = useSelector(
    (state) => state.genderSlice.currentComponent
  );
  const maleClick = () => {
    dispatch(showMale());
  };
  const femaleClick = () => {
    dispatch(showFemale());
  };
  const noneClick = () => {
    dispatch(showNone());
  };
  //redux-isMobile---------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;

  //form-data--------------------------------------------------
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    genderMale: "",
    genderFemale: "",
    genderNone: "",
    lastName: "",
    dateOfBirthday: "",
    address: "",
    LLC: "",
    description: "",
    vimeoAccount: "",
    instagramAccount: "",
    facebookAccount: "",
    twitterAccount: "",
    avatar: "",
    imgAvatarName: "",
    cover: "",
    identifier: "",
    id: null,
  });
  const [placeholderData, setPlaceholderData] = useState({
    firstName: "",
    genderMale: "",
    genderFemale: "",
    genderNone: "",
    lastName: "",
    dateOfBirthday: "",
    address: "",
    LLC: "",
    description: "",
    vimeoAccount: "",
    instagramAccount: "",
    facebookAccount: "",
    twitterAccount: "",
  });
  //set-preview-avatar-----------------------------------------
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  //set-preview-cover-------------------------------------
  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCoverPreview(URL.createObjectURL(file));
    }
  };
  //get-value-from-inputes--------------------------------------------
  const handleUploadAndSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //get-data-storage----------------------------------------------
  const dataStorage = localStorage.getItem("id");
  //get-values----------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://sporthubdeploy2.onrender.com/api/profiles?populate=*"
        );
        if (response.status === 200) {
          const profileData = response.data.data;
          const matchingUser = profileData.find(
            (user) => user.attributes.identifier === dataStorage
          );
          console.log(matchingUser);
          // Заполнение формы данными с сервера
          setFormData({
            firstName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.firstName) ||
              "",
            lastName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.lastName) ||
              "",
            genderMale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderMale) ||
              "",
            genderFemale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderFemale) ||
              "",
            genderNone:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderNone) ||
              "",
            dateOfBirthday:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.dateOfBirthday) ||
              "",
            address:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.address) ||
              "",
            LLC:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.LLC) ||
              "",
            description:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.description) ||
              "",
            vimeoAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.vimeoAccount) ||
              "",
            instagramAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.instagramAccount) ||
              "",
            facebookAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.facebookAccount) ||
              "",
            twitterAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.twitterAccount) ||
              "",
            avatar:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.avatar
                ? matchingUser.attributes.avatar.data.attributes.url || ""
                : "",
            cover:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.cover
                ? matchingUser.attributes.cover.data.attributes.url || ""
                : "",
            imgCoverName:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.cover
                ? matchingUser.attributes.cover.data.attributes.name || ""
                : "",
            imgAvatarName:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.avatar
                ? matchingUser.attributes.avatar.data.attributes.name || ""
                : "",
            id: (matchingUser && matchingUser.id) || "",
          });

          console.log(formData.genderNone);
          setPlaceholderData({
            //firstName: profileData[0].id.attributes.firstName,
          });
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchData();
  }, []);
  //data-patch------------------------------------------------------------------
  const changeData = async () => {
    if (avatar) {
      const avatarData = new FormData();
      avatarData.append("files", avatar[0]);
      const responseAvatar = await axios.post(
        "https://sporthubdeploy2.onrender.com/api/upload",
        avatarData
      );
      const imageAvatar = responseAvatar.data[0].id;

      const avatarRequestData = {
        data: {
          avatar: imageAvatar,
        },
      };
      await axios.put(
        `https://sporthubdeploy2.onrender.com/api/profiles/${formData.id}`,
        avatarRequestData
      );
    }
    if (cover) {
      const coverData = new FormData();
      coverData.append("files", cover[0]);
      const responseCover = await axios.post(
        "https://sporthubdeploy2.onrender.com/api/upload",
        coverData
      );
      const imageCover = responseCover.data[0].id;

      const coverRequestData = {
        data: {
          cover: imageCover,
        },
      };
      await axios.put(
        `https://sporthubdeploy2.onrender.com/api/profiles/${formData.id}`,
        coverRequestData
      );
    }
    const requestData = {
      data: {
        firstName: formData.firstName,
        gender: formData.gender,
        lastName: formData.lastName,
        dateOfBirthday: formData.dateOfBirthday,
        address: formData.address,
        LLC: formData.LLC,
        description: formData.description,
        vimeoAccount: formData.vimeoAccount,
        instagramAccount: formData.instagramAccount,
        facebookAccount: formData.facebookAccount,
        twitterAccount: formData.twitterAccount,
      },
    };
    try {
      const patchResponse = await axios.put(
        `https://sporthubdeploy2.onrender.com/api/profiles/${formData.id}`,
        requestData
      );
    } catch (error) {
      console.error("patch data failed");
    }
    alert("Profile data has been changed successfuly !");
  };

  //directTo-------------------------------------------
  const directTo = async (e) => {
    e.preventDefault();
    try {
      await changeData();
      window.location.reload();
    } catch (error) {
      console.error("Произошла ошибка при отправке данных:", error);
    }
  };
  //delete-images----------------------------------------------------------
  async function deleteAvatar() {
    try {
      const response = await axios.get(
        "https://sporthubdeploy2.onrender.com/api/profiles?populate=*"
      );
      if (response.status === 200) {
        const profileData = response.data.data;
        const matchingUser = profileData.find(
          (user) => user.attributes.identifier === dataStorage
        );
        if (
          matchingUser &&
          matchingUser.attributes.avatar &&
          matchingUser.attributes.avatar.data
        ) {
          const avatarId = matchingUser.attributes.avatar.data.id;
          setFormData({
            firstName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.firstName) ||
              "",
            lastName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.lastName) ||
              "",
            genderMale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderMale) ||
              "",
            genderFemale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderFemale) ||
              "",
            genderNone:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderNone) ||
              "",
            dateOfBirthday:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.dateOfBirthday) ||
              "",
            address:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.address) ||
              "",
            LLC:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.LLC) ||
              "",
            description:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.description) ||
              "",
            vimeoAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.vimeoAccount) ||
              "",
            instagramAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.instagramAccount) ||
              "",
            facebookAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.facebookAccount) ||
              "",
            twitterAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.twitterAccount) ||
              "",
            avatar: "",
            cover:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.cover
                ? matchingUser.attributes.cover.data.attributes.url || ""
                : "",
            imgCoverName:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.cover
                ? matchingUser.attributes.cover.data.attributes.name || ""
                : "",
            imgAvatarName: "",
            id: (matchingUser && matchingUser.id) || "",
          });
          const updateProfileResponse = await axios.put(
            `https://sporthubdeploy2.onrender.com/api/profiles/${matchingUser.id}`,
            avatarRequestData
          );
          if (updateProfileResponse.status === 200) {
            console.log("Avatar deleted successfully");
            // Добавь вызов window.location.reload() здесь
            window.location.reload();
          } else {
            console.error("Failed to delete avatar");
          }
        } else {
          console.error("User or avatar data not found");
        }
      }
    } catch (error) {
      console.error("delete avatar failed", error);
    }
  }
  //delete-cover---------------------------------------------------------------
  async function deleteCover() {
    try {
      const response = await axios.get(
        "https://sporthubdeploy2.onrender.com/api/profiles?populate=*"
      );
      if (response.status === 200) {
        const profileData = response.data.data;
        const matchingUser = profileData.find(
          (user) => user.attributes.identifier === dataStorage
        );
        if (
          matchingUser &&
          matchingUser.attributes.cover &&
          matchingUser.attributes.cover.data
        ) {
          const avatarId = matchingUser.attributes.cover.data.id;
          setFormData({
            firstName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.firstName) ||
              "",
            lastName:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.lastName) ||
              "",
            genderMale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderMale) ||
              "",
            genderFemale:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderFemale) ||
              "",
            genderNone:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.genderNone) ||
              "",
            dateOfBirthday:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.dateOfBirthday) ||
              "",
            address:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.address) ||
              "",
            LLC:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.LLC) ||
              "",
            description:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.description) ||
              "",
            vimeoAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.vimeoAccount) ||
              "",
            instagramAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.instagramAccount) ||
              "",
            facebookAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.facebookAccount) ||
              "",
            twitterAccount:
              (matchingUser &&
                matchingUser.attributes &&
                matchingUser.attributes.twitterAccount) ||
              "",
            avatar:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.avatar
                ? matchingUser.attributes.avatar.data.attributes.url || ""
                : "",
            cover: "",
            imgCoverName: "",
            imgAvatarName:
              matchingUser &&
              matchingUser.attributes &&
              matchingUser.attributes.avatar
                ? matchingUser.attributes.avatar.data.attributes.name || ""
                : "",
            id: (matchingUser && matchingUser.id) || "",
          });
          const updateProfileResponse = await axios.put(
            `https://sporthubdeploy2.onrender.com/api/profiles/${matchingUser.id}`,
            avatarRequestData
          );
          if (updateProfileResponse.status === 200) {
            console.log("Avatar deleted successfully");
            // Добавь вызов window.location.reload() здесь
            window.location.reload();
          } else {
            console.error("Failed to delete avatar");
          }
        } else {
          console.error("User or avatar data not found");
        }
      }
    } catch (error) {
      console.error("delete avatar failed", error);
    }
  }

  return (
    <div className={p.profileCreator__wrapper}>
      <HeaderCreator />
      <div className={p.container}>
        <div className={p.main}>
          <form onSubmit={changeData} className={p.form__wrapper}>
            <div className={p.main__header}>
              {isMobile ? (
                <Text18500 text="Edit profile" />
              ) : (
                <Text24500 text="Edit profile" />
              )}

              <button
                className={p.button__wrapper}
                type="submit"
                value="Submit"
                onClick={directTo}
              >
                {isMobile ? (
                  <Button10644
                    text={<Text16600 text="Save" />}
                    borderRadius="8px"
                  />
                ) : (
                  <Button18044
                    text={<Text16600 text="Save" />}
                    borderRadius="8px"
                    width="180px"
                  />
                )}
              </button>
            </div>
            <div className={p.profile__wrapper}>
              <div className={p.item__wrapper}>
                <input
                  type="file"
                  className={p.filepeaker}
                  onChange={(e) => {
                    setAvatar(e.target.files);
                    handleAvatarChange(e);
                  }}
                />
                <img
                  src={formData.avatar || Icones.avaEmpty}
                  alt="ava"
                  className={p.avatarImg}
                />
                {avatarPreview && (
                  <img src={avatarPreview} className={p.avatarPreview} />
                )}
                <ColumnTemplate
                  row1={
                    <Avatext
                      img={Icones.greenBird}
                      text1={
                        <Text16600
                          text={formData.imgAvatarName}
                          lineHeight="normal"
                        />
                      }
                    />
                  }
                  row2={<span className={p.changeFile}>Change file</span>}
                />
                <img
                  src={Icones.bucket}
                  alt="bucket"
                  className={p.bucket}
                  onClick={deleteAvatar}
                />
              </div>
              <div className={p.item__wrapper}>
                <input
                  type="file"
                  className={p.filepeaker}
                  onChange={(e) => {
                    setCover(e.target.files);
                    handleCoverChange(e);
                  }}
                />
                <img
                  src={formData.cover || Icones.coverFrame}
                  alt="ava"
                  className={p.avatarImg}
                />
                {coverPreview && (
                  <img src={coverPreview} className={p.avatarPreview} />
                )}
                <ColumnTemplate
                  row1={
                    <Avatext
                      img={Icones.greenBird}
                      text1={
                        <Text16600
                          text={formData.imgCoverName}
                          lineHeight="normal"
                        />
                      }
                    />
                  }
                  row2={<span className={p.changeFile}>Change file</span>}
                />
                <img
                  src={Icones.bucket}
                  alt="bucket"
                  className={p.bucket}
                  onClick={deleteCover}
                />
              </div>
            </div>

            <div className={p.inputs__wrapper}>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400 text="First Name" color="rgba(153, 153, 153, 1)" />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.firstName}
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400 text="Gender" color="rgba(153, 153, 153, 1)" />
                </span>
                <div className={p.inputGender__wrapper}>
                  <div
                    className={p.inputRadio__wrapper}
                    onClick={() => maleClick()}
                  >
                    <img src={Radio} alt="radio" className={p.radioButton} />
                    {formData.genderMale && (
                      <img src={RadioActive} className={p.radioButton} />
                    )}
                    <input
                      type="text"
                      className={p.input + " " + p.inputGender}
                      placeholder="Male"
                      name="genderMale"
                      value={formData.genderMale}
                      onChange={handleUploadAndSubmit}
                    />
                  </div>
                  <div
                    className={p.inputRadio__wrapper}
                    onClick={() => femaleClick()}
                  >
                    <img src={Radio} alt="radio" className={p.radioButton} />
                    {formData.genderFemale && (
                      <img src={RadioActive} className={p.radioButton} />
                    )}
                    <input
                      type="text"
                      className={p.input + " " + p.inputGender}
                      placeholder="Female"
                      name="genderFemale"
                      value={formData.genderFemale}
                      onChange={handleUploadAndSubmit}
                    />
                  </div>
                  <div
                    className={p.inputRadio__wrapper}
                    onClick={() => noneClick()}
                  >
                    <img src={Radio} alt="radio" className={p.radioButton} />
                    {formData.genderNone && (
                      <img src={RadioActive} className={p.radioButton} />
                    )}
                    <input
                      type="text"
                      className={p.input + " " + p.inputGender}
                      placeholder="None"
                      name="genderNone"
                      value={formData.genderNone}
                      onChange={handleUploadAndSubmit}
                    />
                  </div>
                </div>
              </div>

              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400 text="Last Name" color="rgba(153, 153, 153, 1)" />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.lastName}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400
                    text="Date of birthday"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.dateOfBirthday}
                  name="dateOfBirthday"
                  value={formData.dateOfBirthday}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400 text="Address" color="rgba(153, 153, 153, 1)" />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.address}
                  name="address"
                  value={formData.address}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400 text="LLC" color="rgba(153, 153, 153, 1)" />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.LLC}
                  name="LLC"
                  value={formData.LLC}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper + " " + p.input_fullWidth}>
                <span className={p.label}>
                  <Text14400
                    text="Description"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.description}
                  name="description"
                  value={formData.description}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400
                    text="Vimeo account"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.vimeoAccount}
                  name="vimeoAccount"
                  value={formData.vimeoAccount}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400
                    text="Instagram account"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.instagramAccount}
                  name="instagramAccount"
                  value={formData.instagramAccount}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400
                    text="Facebook account"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.facebookAccount}
                  name="facebookAccount"
                  value={formData.facebookAccount}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}
              <div className={p.input__wrapper}>
                <span className={p.label}>
                  <Text14400
                    text="Twitter account"
                    color="rgba(153, 153, 153, 1)"
                  />
                </span>
                <input
                  type="text"
                  className={p.input}
                  placeholder={placeholderData.twitterAccount}
                  name="twitterAccount"
                  value={formData.twitterAccount}
                  onChange={handleUploadAndSubmit}
                />
              </div>
              {/* //input-------------------------------------------------------------------------*/}

              {/* //input-------------------------------------------------------------------------*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreatorFilled;
