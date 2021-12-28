import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Main.css";

function Main() {
  const logo = "/symbol_logo.png";

  const [ userInfo, setUserInfo ] = useState({})
  const [ contents, setContents ] = useState([])

  // 나의 정보 API 연동
  const fetchUserInfo = async() => {
    const url = "http://59.6.95.137:1010/v1/test/me"
    await axios.get(url)
    .then(res => {
      setUserInfo(res.data.data)      
    })
    .catch(err => {
      console.log("userInfo", err.response)
    })
  }

  useEffect(() => {
    fetchUserInfo()
  }, []);


  // 리스트 API 연동
  const fetchList = async() => {
    const url = "http://59.6.95.137:1010/v1/test/contents"
    const params = {
      _start: 0,
      _limit: 5,
      _sort: "createAt"
    }
    await axios.get(url, {params})
    .then(res => {
      const data = res.data.data
      
      let contents = []
      for (let i=0; i<5; i++) {
        let minPoint = 9*9999
        if (data[i].personalPrice != -1 && data[i].personalPrice < minPoint) {
          minPoint = data[i].personalPrice
        }
        if (data[i].businessPrice != -1 && data[i].businessPrice < minPoint) {
          minPoint = data[i].businessPrice
        }
        if (data[i].individualPrice != -1 && data[i].individualPrice < minPoint) {
          minPoint = data[i].individualPrice
        }
        if (data[i].companyPrice != -1 && data[i].companyPrice < minPoint) {
          minPoint = data[i].companyPrice
        }

        contents.push({
          "id": data[i]._id,
          "images": data[i].images,
          "title": data[i].title,
          "userProfile": data[i].userinfo.profile,
          "username": data[i].userinfo.username,
          "point": minPoint,
          "view": data[i].view,
          "interest": data[i].interest
        })
      }
      setContents(contents)
    })
    .catch(err => {
      console.log("list", err.response)
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  // 상세 페이지
  const onClickDetail = (id) => {
    window.location.href = `/content/${id}`
  }

  return (
    <div>
      <div className="nav">
        <img src={logo} alt="logo" />
        <h3>{userInfo.username}</h3>
      </div>

      <div className="userinfo">
        <img className="user-banner" src={userInfo.banner} alt="banner" />
        <div>
          <div className="user-content"><img className="user-profile" src={userInfo.profile} alt="profile" /></div>
          <div className="user-content"><h2 id="username">{userInfo.username}</h2></div>
          <div className="user-content">
            <span className="user-carrer">#{userInfo.carrerFirst}</span>
            <span className="user-carrer">#{userInfo.carrerSecond}</span>
          </div>
          <div className="user-content">{userInfo.introduction}</div>
          <div className="user-content">
            <div className="user-label">{userInfo.receiveOnly}</div>
            <div className="user-label"><span>찜</span> {userInfo.interest}</div>
            <div className="user-label"><span>뷰</span> {userInfo.view}</div>
            <div className="user-label"><span>콘텐츠</span> {userInfo.content}</div>
          </div>
        </div>
      </div>

      <div className="list">
        {contents.map((item, idx) => 
          <div key={idx} className="contents-card" onClick={() => {onClickDetail(item.id)}}>
            <div>
              <img id="card-img" src={item.images} alt="img" />
            </div>
            <div className="contents-card-right">
              <div>Content Title : {item.title}</div>
              <div className="card-user">
                <img id="card-profile-img" src={item.userProfile} alt="profile" />
                <span className="card-username">{item.username}</span>
              </div>
              <div className="ccr-bottom">
                <div>{item.point} P</div>
                <div className="list-view-interest">
                  <span>{item.view} 뷰</span>
                  <span>{item.interest} 찜</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>      
    </div>
  )
};

export default Main;