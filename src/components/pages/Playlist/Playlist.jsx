import p from "./playlist.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//components--------------------------------------
import HeaderCreator from "../../organisms/HeaderCreator";
import { Button18044 } from "../../atoms/Buttons";
import { Text16600, Text20600 } from "../../atoms/Text";
import Video from "../../molecules/Video";
import { VideoUserArray } from "../../../Data";
import { AvaArray } from "../../../Data";
import {
  showYourVideo,
  showAddVideo,
  showNewVideo,
  showDowloading,
  showPlayer,
} from "../../../features/addVideoCreator";
import AddVideo from "../../organisms/VideoCreator/AddVideo";
import DownloadVideo from "../../organisms/VideoCreator/DownloadVideo";
import {
  showAll,
  showMind,
  showBody,
  showSoul,
} from "../../../features/videoStyleSlice";
import {
  showPlaylist,
  showEditPlaylist,
  showResultPlaylist,
  showEditResultPlaylist,
} from "../../../features/createPlaylistSlice";
import { setUserPlaylist } from "../../../features/userPlaylistSlice";
import Mind from "../../organisms/Mind/Mind";
import Body from "../../organisms/Body/Body";
import Soul from "../../organisms/Soul/Soul";
import PlaylistEdit from "../../organisms/PlaylistEdit/PlaylistEdit";
import PlaylistResult from "../../organisms/PlaylistResult/PlaylistResult";
import PlaylistEditResult from "../../organisms/PlaylistEditResult/PlaylistEditResult";
//images-------------------------------------------
import Plus from "../../../images/Plus.svg";
import axios from "axios";

const Playlist = () => {
  //viewAll/hideAll------------------------------------------------------
  const [showMore, setShowMore] = useState(true);
  const toggleVideos = () => {
    setShowMore(!showMore);
  };
  //isMobile--------------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;
  //redux-video-states------------------------------------------------------
  const dispatch = useDispatch();
  const currentComponent = useSelector(
    (state) => state.addVideoSlice.currentComponent
  );
  const clickYourVideo = () => {
    dispatch(showYourVideo());
  };
  const clickAddVideo = () => {
    dispatch(showAddVideo());
  };
  const clickNewVideo = () => {
    dispatch(showNewVideo());
  };
  const clickDownloading = () => {
    dispatch(showDowloading());
  };
  const clickPlayer = () => {
    dispatch(showPlayer());
  };
  //redux-video-style----------------------------------------------------
  const currentStyle = useSelector(
    (state) => state.videoStyleSlice.currentStyle
  );
  const clickAll = () => {
    dispatch(showAll());
  };
  const clickMind = () => {
    dispatch(showMind());
  };
  const clickBody = () => {
    dispatch(showBody());
  };
  const clickSoul = () => {
    dispatch(showSoul());
  };
  //redux-videoCreate----------------------------------------------------
  const currentStep = useSelector(
    (state) => state.createPlaylistSlice.currentStep
  );
  const clickPlaylist = () => {
    dispatch(showPlaylist());
  };
  const clickEditPlaylist = () => {
    dispatch(showEditPlaylist());
  };
  const clickResultPlaylist = () => {
    dispatch(showResultPlaylist());
  };
  const clickEditResultPlaylist = () => {
    dispatch(showEditResultPlaylist());
  };
  //video-switcher---------------------------------------------------------
  const [activeIndex, setActiveIndex] = useState(true);
  useEffect(() => {
    setActiveIndex(1);
  }, []);
  const switchVideo = (index) => {
    setActiveIndex(index);
  };
  //video-subSwitcher---------------------------------------------------------
  const [activeSubIndex, setActiveSubIndex] = useState(true);
  useEffect(() => {
    setActiveSubIndex(1);
  }, []);
  const switchSubVideo = (index) => {
    setActiveSubIndex(index);
  };
  //data-storage--------------------------------------------------------------
  const dataStorage = localStorage.getItem("id");
  const [playlistLinks, setPlaylistLinks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://sporthubdeploy2.onrender.com/api/Playlists?populate=*");
        const responseData = response.data.data;
        setTime(responseData);
        const filteredData = responseData.filter(
          (user) => user.attributes.publishedBy === dataStorage
        );
        const allPlaylists = filteredData.map((playlist) => {
          const selectedArray = JSON.parse(playlist.attributes.selected);
          const links = selectedArray.flat().map((videoData) => {
            return videoData;
          });
          return {
            id: playlist.id,
            playlistName: playlist.attributes.playlistName,
            links: links,
          };
        });
        setPlaylists(allPlaylists);
      } catch (error) {
        console.error("fetch data is failed", error);
      }
    }
    fetchData();
  }, [dataStorage]);
  //get-time---------------------------------------------------------------------
  const [propsTime, setPropsTime] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    function findLastUpdated(time) {
      if (Object.keys(time).length === 0) {
        return null;
      }
      if ("updatedAt" in time) {
        return time.updatedAt;
      }
      for (const key in time) {
        const result = findLastUpdated(time[key]);
        if (result !== null) {
          return result;
        }
      }
      return null;
    }
    const lastUpdatedValues = time.map((item) => findLastUpdated(item));
    setPropsTime(lastUpdatedValues);
    console.log(lastUpdatedValues);
  }, [time]);
  //get-playlistsName--------------------------------------------------------------
  const [playlistsName, setPlaylistsName] = useState([]);
  useEffect(() => {
    async function getPlaylistsNames() {
      try {
        const response = await axios.get("https://sporthubdeploy2.onrender.com/api/Playlists?populate=*");
        const dataResponse = response.data.data;
        const arrayResponse = dataResponse.map(
          (item) => item.attributes.playlistName
        );
        console.log(dataResponse);
        console.log(arrayResponse);
        setPlaylistsName(arrayResponse);
        console.log(playlistsName);
      } catch (error) {
        console.error("get playlists names are failed");
      }
    }
    getPlaylistsNames();
  }, []);
  //get-playlist----------------------------------------------------------------------------
  const handleUserPlaylist = (playlist) => {
    dispatch(setUserPlaylist(playlist))
  }
  handleUserPlaylist({
    playlist: playlists
  })
   return (
    <div className={p.videoCreator__wrapper}>
      <HeaderCreator />
      <div className={p.videoCreator__container}>
        {/* //video-Menu-------------------------------------------------------------------------- */}
        {currentStep === "init" && (
          <div>
            <div className={p.videoNavigation__wrapper}>
              <div className={p.videoSwitcher__wrapper}>
                <Link to="/VideoCreator">
                  <div
                    className={`${p.item} ${activeIndex === 2 ? p.active : ""}`}
                    onClick={() => switchVideo(2)}
                  >
                    Your video
                  </div>
                </Link>
                <div
                  className={`${p.item} ${activeIndex === 1 ? p.active : ""}`}
                  onClick={() => {
                    switchVideo(1);
                    clickPlaylist();
                  }}
                >
                  Playlists
                </div>
              </div>
              <div onClick={clickAddVideo} className={p.button__wrapper}>
                {isMobile ? (
                  <div onClick={clickEditPlaylist}>
                    <Button18044
                      img={Plus}
                      text={<Text16600 text="" />}
                      columnGap="0px"
                      borderRadius="8px"
                      width="54px"
                    />
                  </div>
                ) : (
                  <div onClick={clickEditPlaylist}>
                    <Button18044
                      img={Plus}
                      text={<Text16600 text="Create new playlist" />}
                      columnGap="10px"
                      borderRadius="8px"
                      width="217px"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* //video-subMenu-------------------------------------------------------------------------- */}
            <div className={p.video__navigation}>
              <div className={p.videoSwitcher__wrapper}>
                <div
                  className={`${p.switcher__item} ${
                    activeSubIndex === 1 ? p.active : ""
                  }`}
                  onClick={() => {
                    switchSubVideo(1);
                    clickAll();
                  }}
                >
                  All
                </div>
                <div
                  className={`${p.switcher__item} ${
                    activeSubIndex === 2 ? p.active : ""
                  }`}
                  onClick={() => {
                    switchSubVideo(2);
                    clickMind();
                  }}
                >
                  Mind
                </div>
                <div
                  className={`${p.switcher__item} ${
                    activeSubIndex === 3 ? p.active : ""
                  }`}
                  onClick={() => {
                    switchSubVideo(3);
                    clickBody();
                  }}
                >
                  Body
                </div>
                <div
                  className={`${p.switcher__item} ${
                    activeSubIndex === 4 ? p.active : ""
                  }`}
                  onClick={() => {
                    switchSubVideo(4);
                    clickSoul();
                  }}
                >
                  Soul
                </div>
              </div>
            </div>
            {/* //----------------------------------------------------------------------------- */}
            <div className={p.playlistItem__header}>
                {showMore ? (
                <div onClick={toggleVideos}>
                  <Text16600 text="View all" color="rgba(173, 121, 85, 1)" />
                </div>
              ) : (
                <div onClick={toggleVideos}>
                  <Text16600
                    text="Hide all"
                    color="rgba(173, 121, 85, 1)"
                    onClick={toggleVideos}
                  />
                </div>
              )}
            </div>
            {currentStyle === "all" && (
              <div className={p.videos__body}>
                {playlists.map((playlist, index) => (
                  <div key={playlist.id} className={p.playlistContainer}>
                    <h3 className={p.title}>{playlistsName[index]}</h3>
                    {playlist.links.map((link, linkIndex) => (
                      <Video
                        key={linkIndex}
                        videoUrl={link}
                        index={linkIndex}
                        update={propsTime}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {currentStyle === "mind" && <Mind playlistName={playlistsName}/>}
            {currentStyle === "body" && <Body playlistName={playlistsName}/>}
            {currentStyle === "soul" && <Soul playlistName={playlistsName}/>}
          </div>
        )}
        {currentStep === "edit" && (
          <PlaylistEdit clickResult={clickResultPlaylist} />
        )}
        {currentStep === "result" && (
          <PlaylistResult clickEditResult={clickEditResultPlaylist} />
        )}
        {currentStep === "editResult" && <PlaylistEditResult />}
      </div>
    </div>
  );
};

export default Playlist;
