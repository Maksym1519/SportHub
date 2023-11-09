import ch from "./chat.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
//components--------------------------------------------------
import { Text24500 } from "../atoms/Text";
import { Text14400 } from "../atoms/Text";
import { Text12400 } from "../atoms/Text";
import AvaText from "../molecules/Avatext";
import { Icones } from "../../Data";

const Chat = (props) => {
  console.log(props.videoInfo);
  //data-storage-----------------------------------------------
  const dataStorage = localStorage.getItem("id");
  //post-message-----------------------------------------------
  const [formData, setFormData] = useState({ textMessage: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        data: {
          textMessage: formData.textMessage,
          identifier: props.videoInfo.fileName,
          author: dataStorage,
          avatar: props.videoInfo.avatar
        },
      };
      const response = await axios.post(
        "http://localhost:1337/api/messages",
        requestData
      );
      setFormData({ textMessage: "" });
    } catch (error) {
      console.error("post mesage is failed");
    }
  };
  //get-messages-----------------------------------------------------------
  const [authors, setAuthors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [data, setData] = useState({});
  const messagesAmount = messages.length
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get("http://localhost:1337/api/messages");
        const dataResponse = response.data.data;
        console.log(dataResponse);
        //get names who send message
        const arrayAuthors = dataResponse.map(
          (item) => item.attributes.identifier
        );
        setAuthors(arrayAuthors);
        //get-messages
        const arrayMessages = dataResponse.map(
          (item) => item.attributes.textMessage
        );
        setMessages(arrayMessages);
        //get-avatars----------------------------------
        const arrayAvatars = dataResponse.map((item,index) => item.attributes.avatar)
        setAvatars(arrayAvatars)
        //set-data-for-map
        setData({
          authors: authors,
          messages: messages,
        });
        console.log(data);
      } catch (error) {
        console.error("getting messages is failed", error);
      }
    }
    getMessages();
  }, []);
  //get-currentName-for-chat-------------------------------------
  const [authorName,setAuthorName] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/profiles?populate=*"
        );
        const usersData = response.data.data;
        const matchingUser = usersData.find(
          (user) => user.attributes.identifier === dataStorage
        );
        const currentFirstName =
          matchingUser.attributes.firstName;
       const currentLastName = matchingUser.attributes.lastName
       const fullName = `${currentFirstName} ${currentLastName}`
       setAuthorName(fullName)
       console.log(fullName)
      } catch (error) {
        console.error("fetchData failed", error);
      }
    };
    fetchData();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className={ch.wrapper}>
        <div className={ch.container}>
          <div className={ch.messagesAmount}>
            <span className={ch.messagesAmount__info}>
              <Text24500 text={messagesAmount} />
            </span>
            <span className={ch.messagesAmount__info}>
              <Text24500 text="Comments" />
            </span>
          </div>
          <div className={ch.messagesSender}>
            <input
              type="text"
              className={ch.chatInput}
              placeholder="Enter your message"
              name="textMessage"
              value={formData.textMessage}
              onChange={handleChange}
            />
            <button type="submit" className={ch.chatButton}>
              Send
            </button>
          </div>
          <div className={ch.messages__body}>
            <div className={ch.message}>
              {authors.map((author, index) => (
                <>
                  <div>
                    <AvaText img={props.avatar} text1={authorName} />
                  </div>
                  <div className={ch.textMessage}>
                    <Text14400 text={messages[index]} />
                  </div>
                  <div className={ch.chatLikes}>
                <div className={ch.like}>
                  <AvaText img={Icones.like} text1={<Text12400 text="0" />} />
                </div>
                <div className={ch.dislike}>
                  <AvaText
                    img={Icones.dislike}
                    text1={<Text12400 text="0" />}
                  />
                </div>
              </div>
                </>
              ))}

             
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Chat;
