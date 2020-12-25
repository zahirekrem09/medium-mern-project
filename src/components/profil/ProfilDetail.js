import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilDetail.css";
import ArticleDetailCard from "../articleDetailCard/ArticleDetailCard";
import UserContext from "../../context/UserContext";

const ProfilDetail = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userProfileData = await axios.get(
        `http://localhost:5000/api/users/${id}`
      );
      setUserProfile(userProfileData?.data?.data);
    };
    fetchUser();
  }, [userData]);

  async function removeFollow() {
    let token = localStorage.getItem("token");
    const unFollowProfileData = await axios.get(
      `http://localhost:5000/api/users/unfollow/${id}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    setUserData({ user: unFollowProfileData.data, token });
  }


  async function addFollow() {
    let token = localStorage.getItem("token");
    const followProfileData = await axios.get(
      `http://localhost:5000/api/users/follow/${id}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    setUserData({ user: followProfileData.data, token });

  }
  console.log(userData);
  return (

    <div className="profil__card__container">
      <div className="profil__card__header">
        <h2>{userProfile?.firstName}</h2>
      </div>
      <div className="profil__card__subheader">
        <button onClick={userProfile?.followers?.includes(userData.user._id) ? removeFollow : addFollow} className="profil__card__subheader__btn">{userProfile?.followers?.includes(userData.user._id) ? 'Following' : 'Follow'}</button>
        <Link>
          <span> {userProfile?.followersCount} </span> <span>Followers</span>
        </Link>
        <Link>
          <span>About</span>
        </Link>
      </div>
      <div className="profil__card__content">
        <div className="profil__card__content__left">
          <div>
            <img src={userProfile?.avatar_img} alt="userImage" />
          </div>

          <div className="profil__card__content__left__info">
            <p>ABOUT</p>
            <p>{userProfile?.firstName + userProfile?.lastName}</p>
            <p>@ezranbayantemur</p>
          </div>
        </div>
        <div
          className="
          profil__card__content__right"
        >
          {userProfile?.posts.map((content, index) => (
            <ArticleDetailCard
              date={content.createdAt}
              title={content.title}
              articleText={content.content}
              imageUrl={content.post_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilDetail;

// author: "5fe2de2cb7c09046688b1110"
// content: "dummy subtitle form datadummy subtitle form datadummy subtitle form datadummy subtitle form datadummy subtitle form data"
// createdAt: "2020-12-23T06:06:23.992Z"
// likeCount: 0
// likes: []
// post_image: "https://res.cloudinary.com/clarusway2020/image/upload/v1608703582/oalqc4ahf8hxratz0cvx.jpg"
// slug: "dummy-title-form-data4"
// subtitle: "dummy subtitle form data"
// title: "dummy title form data4"
// __v: 0
// _id: "5fe2de5fb7c09046688b1111"
