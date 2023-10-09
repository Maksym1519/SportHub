import pr from "./playlistResult.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
//components--------------------------------------------
import { Icones } from "../../../Data";
import { Text24500 } from "../../atoms/Text";
import { Text16500 } from "../../atoms/Text";
import { Text16300 } from "../../atoms/Text";
import { Text14400 } from "../../atoms/Text";
import { Text18500 } from "../../atoms/Text";
import Video from "../../molecules/Video";
import AvaText from "../../molecules/Avatext";

const PlaylistResult = (props) => {
  //get-playlist-info--------------------------------------------------
  const [playlistInfo, setPlaylistInfo] = useState({
    playlistName: "",
    description: "",
    category: "",
    selected: [],
    published: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/Playlists?populate=*"
        );
        if (response.status === 200) {
          const playlistsData =
            response.data.data[response.data.data.length - 1];
          const getLinks = playlistsData.attributes.selected;
          const parsedLinks = JSON.parse(getLinks);

          console.log(getLinks);
          setPlaylistInfo({
            playlistName: playlistsData.attributes.playlistName,
            description: playlistsData.attributes.description,
            //selected: playlistsData.attributes.selected
            selected: parsedLinks,
            published: playlistsData.attributes.publishedAt,
          });

          console.log(playlistInfo.published);
        } else {
          console.error("Failed to fetch video data");
        }
      } catch (error) {
        console.error("fetchdata failed", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(playlistInfo);
  }, [playlistInfo]);
  //set-Time------------------------------------------------------------------
  const TimeAgo = ({ published }) => {
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
      const calculateTimeAgo = () => {
        const currentDate = new Date();
        const publishDate = new Date(published);
        const timeDifference = currentDate - publishDate;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
          setTimeAgo(`${days}day ago`);
        } else if (hours > 0) {
          setTimeAgo(`${hours}hour(s) ago`);
        } else if (minutes > 0) {
          setTimeAgo(`${minutes}minutes ago`);
        } else {
          setTimeAgo(`${seconds}second ago`);
        }
      };

      calculateTimeAgo();

      // Устанавливаем интервал обновления каждые 60 секунд
      const intervalId = setInterval(calculateTimeAgo, 60000);

      // Очищаем интервал при размонтировании компонента
      return () => clearInterval(intervalId);
    }, [published]);

    return <div className={pr.time}>{timeAgo}</div>;
  };
  //dots-menu----------------------------------------------------------
  const [menu, setMenu] = useState(false);
  const toggleDotsMenu = () => {
    setMenu(!menu);
  };
  //delete-playlist----------------------------------------------------
  const handleDeleteClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/Playlists?populate=*"
      );
      const profileData = response.data.data;
      const lastPlaylist = profileData[profileData.length - 1].id;
      console.log(lastPlaylist)
      await axios.delete(`http://localhost:1337/api/Playlists/${lastPlaylist}`);
    } catch (error) {
      console.error("delete data is failed",error);
    }
  };
   //delete-banner------------------------------------------------------
   const [deleteBanner, setDeleteBanner] = useState(false);
   const showDeleteBanner = () => {
     setDeleteBanner(true);
   };
  //reload page------------------------------------------------------------
  const handleResetButtonClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className={pr.playlistResult__wrapper}>
        <div className={pr.playlistResult__info}>
          <div className={pr.functions}>
            <Text24500 text={playlistInfo.playlistName} />
            <img src={Icones.orangeDots} alt="menu" onClick={toggleDotsMenu} />
          </div>
          <div className={pr.statistics__wrapper}>
            <Text16500 text={playlistInfo.selected.length + " " + "videos"} />
            <div className={pr.statistics__viewsTime}>
              <div className={pr.views}>
                <span>
                  <Text16300 text="0" color="rgba(187, 187, 187, 1)" />
                </span>
                <span>
                  <Text16300 text="views" color="rgba(187, 187, 187, 1)" />
                </span>
              </div>
              <div className={pr.time}>
                <span>
                  <Text16300
                    text={<TimeAgo published={playlistInfo.published} />}
                    color="rgba(187, 187, 187, 1)"
                  />
                </span>
                <span>
                  {/* <Text16300 text="ago" color="rgba(187, 187, 187, 1)" /> */}
                </span>
              </div>
            </div>
          </div>
          <div className={pr.description__wrapper}>
            <span className={pr.text}>{playlistInfo.description}</span>
            <span className={pr.showMore__text}>Show more</span>
          </div>
          {menu && (
            <div className={pr.dotsMenu__wrapper}>
              <div className={pr.item} onClick={props.clickEditResult}>Edit</div>
              <div className={pr.item} onClick={() => {setTimeout(() => {handleDeleteClick()},3000);showDeleteBanner();setTimeout(() => {handleResetButtonClick()},4000)}}>Delete</div>
            </div>
          )}
            {deleteBanner && (
            <div className={pr.successBanner}>
              <AvaText
                img={Icones.success}
                text1={<Text18500 text={`Your playlist ${playlistInfo.playlistName} is deleted`} />}
              />
            </div>
          )}
        </div>
        <div className={pr.videos__body}>
          {Array.isArray(playlistInfo.selected) ? (
            playlistInfo.selected.map((link, index) => (
              <Video key={index} videoUrl={`http://localhost:1337${link}`} />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistResult;