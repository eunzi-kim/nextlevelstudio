import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";

function Login() {
  const logo = "/typo_logo.png";

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  // 아이디, 비밀번호 입력
  const onChangeId = (e) => {
    setUsername(e.target.value)
  }

  const onChangePwd = (e) => {
    setPassword(e.target.value)
  }

  // 로그인 API 연동
  const fetchLogin = async(data) => {
    const url = "http://59.6.95.137:1010/v1/test/auth/local"
    await axios.post(url, data)
    .then(res => {
      alert("로그인이 성공하였습니다")
      const token = res.data.jwt
      sessionStorage.setItem("jwt", JSON.stringify(token))
      window.location.replace("/")
    })
    .catch(err => {
      // console.log(err.response)
      alert("아이디 비밀번호를 확인해주세요")
    })
  }

  // 로그인 버튼 클릭
  const onSubmit = () => {
    let userInfo = {
      "identifier": username,
      "password": password
    }
    fetchLogin(userInfo)
  }  

  return (
    <div className="login">
      <div className="login-title">
        <img src={logo} alt="logo" name="pixel" />
        <h3>로그인</h3>
      </div>
      <div>
        <div className="login-id">
          <p className="login-form-title">ID</p>
          <input
            type="text"
            className="login-form-input" 
            placeholder="아이디를 입력해주세요.(email)" 
            value={username}
            onChange={onChangeId}
          />
        </div>
        <div className="login-password">
          <p className="login-form-title">Password</p>
          <input 
            type="password"
            className="login-form-input" 
            placeholder="비밀번호를 입력해주세요." 
            value={password}
            onChange={onChangePwd}
          />
        </div>
      </div>
      <div>
        <button className="login-btn" onClick={onSubmit}>로그인</button>
      </div>
    </div>
  )
};

export default Login;