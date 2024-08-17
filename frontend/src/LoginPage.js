import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/login/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://114.32.14.238:8080/demo/ac/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 成功登入處理，例如重定向到主頁
        setErrorMessage('');
        navigate('/'); // 重定向到主頁
      } else {
        const error = await response.text();
        setErrorMessage(error || '登入失敗，請重試。');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('伺服器發生錯誤，請稍後重試。');
    }
  };

  return (
    <main className="login-register-container">
      <div className="form-container">
        <h2>登入</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用戶名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">登入</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p>還沒有帳號嗎？<a href="/register">註冊一個吧</a></p>
      </div>
    </main>
  );
};

export default LoginPage;
