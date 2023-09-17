import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import m from "./main.module.scss";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  increment,
  incrementByAmount,
} from "../../../features/counter/counterSlice";
import { updateScreenWidth } from "../../../features/headerSlice";
import { getShowMore } from "../../functions/getShowMore";
import { Text14400 } from "../../atoms/Text";
import { Text16400 } from "../../atoms/Text";
import { Text12600 } from "../../atoms/Text";
import { Text16500 } from "../../atoms/Text";
import { Text24500 } from "../../atoms/Text";
import { Text18500 } from "../../atoms/Text";
import { Text14500 } from "../../atoms/Text";
import Avatext from "../../molecules/Avatext";
import ColumnTemplate from "../../molecules/ColumnTemplate";
import MenuDots from "../../molecules/MenuDots";
import Header from "../../organisms/Header";
import SubscribeUser from "../../organisms/SubscribeUser";
import {
  showHome,
  showLatest,
  showViewLater,
  showSubscribe,
} from "../../../features/videoUserSlice";
import {
  show1,
  show2,
  show3,
  show4,
  show5,
  show6,
  show7,
  show8,
  show9,
} from "../../../features/menuDotsSlice";
import { AvaArray } from "../../../Data";
import { VideoUserArray } from "../../../Data";
import UserLatest from "../../organisms/UserLatest";
import ViewLater from "../../organisms/ViewLater";
import Arrow from "../../../images/arrow-down-yellow.svg";
import More from "../../../images/more.svg";

//slider------------------------------------------------------------------
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import "swiper/scss/effect-fade";
import "swiper/scss/effect-cards";
import "swiper/css/effect-creative";
import "swiper/swiper-bundle.css";
register();
//------------------------------------------------------------------------

const Main = () => {
  //-----------------------------------------------------------------------
  const [activeIndex, setActiveIndex] = useState(true);
  useEffect(() => {
    setActiveIndex(0);
  }, []);
  const handleSwitcher = (index) => {
    setActiveIndex(index);
  };
  //---------------------------------------------------
  const [showMore, setShowMore] = useState(false);
  const toggleMessages = () => {
    setShowMore(!showMore);
  };

  //redux---------------------------------------------------------
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const isMobile = screenWidth <= 1024;

  //redux-state-video-------------------------------------------
  const dispatch = useAppDispatch();
  const currentComponent = useSelector(
    (state) => state.videoUser.currentComponent
  );
  const handleHomeClick = () => {
    dispatch(showHome());
  };
  const handleLatestClick = () => {
    dispatch(showLatest());
  };
  const handleViewLaterClick = () => {
    dispatch(showViewLater());
  };
  const handleSubscribeClick = () => {
    dispatch(showSubscribe());
  };

  //redux-menu-Dots------------------------------------------------
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuVisible2, setIsMenuVisible2] = useState(false);
  const [isMenuVisible3, setIsMenuVisible3] = useState(false);
  const [isMenuVisible4, setIsMenuVisible4] = useState(false);
  const [isMenuVisible5, setIsMenuVisible5] = useState(false);
  const [isMenuVisible6, setIsMenuVisible6] = useState(false);
  const [isMenuVisible7, setIsMenuVisible7] = useState(false);
  const [isMenuVisible8, setIsMenuVisible8] = useState(false);
  const [isMenuVisible9, setIsMenuVisible9] = useState(false);
  const currentMenu = useSelector((state) => state.menuDots.currentMenu);
  const toggleMenuDots = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleMenuDots2 = () => {
    setIsMenuVisible2(!isMenuVisible2);
  };
  const toggleMenuDots3 = () => {
    setIsMenuVisible3(!isMenuVisible3);
  };
  const toggleMenuDots4 = () => {
    setIsMenuVisible4(!isMenuVisible4);
  };
  const toggleMenuDots5 = () => {
    setIsMenuVisible5(!isMenuVisible5);
  };
  const toggleMenuDots6 = () => {
    setIsMenuVisible6(!isMenuVisible6);
  };
  const toggleMenuDots7 = () => {
    setIsMenuVisible7(!isMenuVisible7);
  };
  const toggleMenuDots8 = () => {
    setIsMenuVisible8(!isMenuVisible8);
  };
  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };
  const handleMouseEnter2 = () => {
    setIsMenuVisible2(true);
  };

  const handleMouseLeave2 = () => {
    setIsMenuVisible2(false);
  };
  const handleMouseEnter3 = () => {
    setIsMenuVisible3(true);
  };

  const handleMouseLeave3 = () => {
    setIsMenuVisible3(false);
  };
  const handleMouseEnter4 = () => {
    setIsMenuVisible4(true);
  };

  const handleMouseLeave4 = () => {
    setIsMenuVisible4(false);
  };
  const handleMouseEnter5 = () => {
    setIsMenuVisible5(true);
  };

  const handleMouseLeave5 = () => {
    setIsMenuVisible5(false);
  };
  const handleMouseEnter6 = () => {
    setIsMenuVisible6(true);
  };

  const handleMouseLeave6 = () => {
    setIsMenuVisible6(false);
  };
  //strapi-getShowMore---------------------------------------------
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getShowMoreFromApi = async () => {
      try {
        const result = await getShowMore(); // Вызываем функцию для получения данных
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getShowMoreFromApi();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }
  //video-menu-----------------------------------------------

  return (
    <div className={m.main__wrapper}>
      <Header />
      <div className={m.container}>
        <div className={m.sidebar__wrapper}>
          <div className={m.switcher__wrapper}>
            <div
              className={`${m.switcher__item} ${
                activeIndex === 0 ? m.active : ""
              }`}
              onClick={() => {
                handleSwitcher(0), handleHomeClick();
              }}
            >
              <Text16400 text="Home" color="rgba(187, 187, 187, 1)" />
            </div>
            <div
              className={`${m.switcher__item} ${
                activeIndex === 1 ? m.active : ""
              }`}
              onClick={() => {
                handleSwitcher(1), handleLatestClick();
              }}
            >
              <Text16400 text="Latest" color="rgba(187, 187, 187, 1)" />
            </div>
            <div
              className={`${m.switcher__item} ${
                activeIndex === 2 ? m.active : ""
              }`}
              onClick={() => {
                handleSwitcher(2), handleViewLaterClick();
              }}
            >
              <Text16400 text="View later" color="rgba(187, 187, 187, 1)" />
            </div>
          </div>
          <div className={m.mySubscription__wrapper}>
            <div className={m.title}>
              <Text12600 text="MY SUBSCRIPTION" color="rgba(173, 121, 85, 1)" />
            </div>
            <div className={m.items__wrapper}>
              {/* //item1-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[0]}
                  text1={
                    <Text14400
                      text="Marvin McKinney"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item2-------------------------------------------------------------- */}
              <div
                className={`${m.item} ${activeIndex === 4 ? m.active : ""}`}
                onClick={() => {
                  handleSwitcher(4), handleSubscribeClick();
                }}
              >
                <Avatext
                  img={AvaArray[1]}
                  text1={
                    <Text14400
                      text="Eleanor Pena"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
                <div className={m.messages}></div>
              </div>
              {/* //item3-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[2]}
                  text1={
                    <Text14400
                      text="Robert Fox"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item4-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[3]}
                  text1={
                    <Text14400
                      text="Savannah Nguyen"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item5-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[4]}
                  text1={
                    <Text14400
                      text="Jenny Wilson"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
                <div className={m.messages}></div>
              </div>
              {/* //item6-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[5]}
                  text1={
                    <Text14400
                      text="Guy Hawkins"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item7-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[6]}
                  text1={
                    <Text14400
                      text="Annette Black"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item8-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[7]}
                  text1={
                    <Text14400
                      text="Darrell Steward"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
                <div className={m.messages}></div>
              </div>
              {/* //item9-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[8]}
                  text1={
                    <Text14400
                      text="Ralph Edwards"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item10-------------------------------------------------------------- */}
              <div className={m.item}>
                <Avatext
                  img={AvaArray[9]}
                  text1={
                    <Text14400
                      text="Floyd Miles"
                      color="rgba(187, 187, 187, 1)"
                    />
                  }
                />
              </div>
              {/* //item-------------------------------------------------------------- */}
            </div>
            <div className={m.showMore__wrapper}>
              <div className={m.showMore__button} onClick={toggleMessages}>
                <Text14400
                  text="Show moreShow more"
                  color="rgba(173, 121, 85, 1)"
                />
                <img
                  src={Arrow}
                  alt="arrow"
                  className={`${showMore ? m.rotate : ""}`}
                />
              </div>
              {showMore && (
                <div className={m.item}>
                  <Avatext
                    img={AvaArray[9]}
                    text1={
                      <Text14400
                        text="Floyd Miles"
                        color="rgba(187, 187, 187, 1)"
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* //redux-video-state-------------------------------------------------------- */}
        {currentComponent === "home" && (
          <div className={m.videos__wrapper}>
            {currentComponent === "subscribe" && <SubscribeUser />}
            <div className={m.slider__wrapper}>
              <Swiper
                //init="false"
                //ref={mainSlider}
                slidesPerView={1}
                speed={1000}
                loop={true}
                //css-mode="true"
                //class="mainSlider"
              >
                <SwiperSlide className={m.slide__wrapper}>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More1_6a77d41eb9.webp"
                      }
                      alt="video"
                    />
                  </div>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More2_6106767343.webp"
                      }
                      alt="video"
                    />
                  </div>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More3_e0e9300cfd.webp"
                      }
                      alt="video"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className={m.slide__wrapper}>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More1_6a77d41eb9.webp"
                      }
                      alt="video"
                    />
                  </div>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More2_6106767343.webp"
                      }
                      alt="video"
                    />
                  </div>
                  <div className={m.video__wrapper}>
                    <img
                      src={
                        "http://localhost:1337/uploads/video_More3_e0e9300cfd.webp"
                      }
                      alt="video"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {isMobile ? (
              <h3 className={m.title}>
                <Text18500 text="Video List" />
              </h3>
            ) : (
              <h3 className={m.title}>
                <Text24500 text="Video List" />
              </h3>
            )}
            {/* //item4--------------------------------------------------------------- */}
            {currentComponent === "home" && (
              <div className={m.videos__body}>
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots();
                  }}
                  onMouseOver={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[0]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[0]}
                          text1={
                            <Text14400
                              text="Adan Lauzon"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible && <MenuDots />}
                </div>
                {/* //------------------------------------------------------------------------ */}

                {/* //item5--------------------------------------------------------------- */}
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots2();
                  }}
                  onMouseOver={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[1]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[6]}
                          text1={
                            <Text14400
                              text="Savannah Nguyen"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible2 && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots2();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible2 && <MenuDots />}
                </div>
                {/* //item6--------------------------------------------------------------- */}
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots3();
                  }}
                  onMouseOver={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[2]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[4]}
                          text1={
                            <Text14400
                              text="Theresa Webb"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible3 && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots3();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible3 && <MenuDots />}
                </div>
                {/* //item7--------------------------------------------------------------- */}
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots4();
                  }}
                  onMouseOver={handleMouseEnter4}
                  onMouseLeave={handleMouseLeave4}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[3]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[1]}
                          text1={
                            <Text14400
                              text="Kristin Watson"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible4 && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots4();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible4 && <MenuDots />}
                </div>
                {/* //item8--------------------------------------------------------------- */}
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots5();
                  }}
                  onMouseOver={handleMouseEnter5}
                  onMouseLeave={handleMouseLeave5}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[4]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[6]}
                          text1={
                            <Text14400
                              text="Jenny Wilson"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible5 && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots5();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible5 && <MenuDots />}
                </div>
                {/* //item9--------------------------------------------------------------- */}
                <div
                  className={m.item + " " + m.itemMenu}
                  onClick={() => {
                    toggleMenuDots6();
                  }}
                  onMouseOver={handleMouseEnter6}
                  onMouseLeave={handleMouseLeave6}
                >
                  <div className={m.video__wrapper}>
                    <img src={VideoUserArray[5]} alt="video" />
                  </div>
                  <div className={m.video__description}>
                    <ColumnTemplate
                      row1={
                        isMobile ? (
                          <Text14500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="16px"
                          />
                        ) : (
                          <Text16500
                            text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame..."
                            lineHeight="18px"
                          />
                        )
                      }
                      row2={
                        <Avatext
                          img={AvaArray[8]}
                          text1={
                            <Text14400
                              text="Darlene Robertson"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                          text2={
                            <Text14400
                              text="3h ago"
                              color="rgba(153, 153, 153, 1)"
                            />
                          }
                        />
                      }
                    />
                  </div>
                  {isMenuVisible6 && (
                    <div className={m.dotsMenu}>
                      <img
                        src={More}
                        alt="menu"
                        onClick={() => {
                          toggleMenuDots6();
                        }}
                      />
                    </div>
                  )}
                  {isMenuVisible6 && <MenuDots />}
                </div>
              </div>
            )}
            {/* //item--------------------------------------------------------------- */}
          </div>
        )}
        {currentComponent === "latest" && <UserLatest />}
        {currentComponent === "viewLater" && <ViewLater />}
        {currentComponent === "subscribe" && <SubscribeUser />}
        {/* //------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};
export default Main;
