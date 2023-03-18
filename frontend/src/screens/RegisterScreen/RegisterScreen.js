import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterScreen.scss";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/actions/authAction";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [loadImage, setLoadImage] = useState("");

  const inputHendle = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHendle = (e) => {
    if (e.target.files.length !== 0) {
      setstate({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    e.preventDefault();
    console.log(state);

    const { userName, email, password, confirmPassword, image } = state;

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card__header">
          <h3>Register</h3>
        </div>
        <div className="card__body">
          <form onSubmit={register}>
            <div className="form__group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form__control"
                placeholder="User Name"
                id="username"
                onChange={inputHendle}
                name="userName"
                value={state.userName}
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form__control"
                placeholder="Email"
                id="email"
                onChange={inputHendle}
                name="email"
                value={state.email}
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form__control"
                placeholder="password"
                id="password"
                onChange={inputHendle}
                name="password"
                value={state.password}
              />
            </div>
            <div className="form__group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form__control"
                placeholder="Confirm Password"
                id="confirmPassword"
                onChange={inputHendle}
                name="confirmPassword"
                value={state.confirmPassword}
              />
            </div>
            <div className="form__group">
              <div className="file__image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="selectedImage" /> : ""}{" "}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    name="image"
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={fileHendle}
                  />
                </div>
              </div>
            </div>

            <div className="form__group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form__group">
              <span>
                <Link to="/login">Login Into Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
