import React from "react";
import FormLogin from "../Fragments/FormLogin";
import logoSiam from "../assets/logo-siam.png";
import bannerGapura from "../assets/banner-gapura.jpg";
import { Link } from "react-router-dom";
import Clipboard from "../assets/clipboard.png";

const AuthLayouts = () => {
  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="bg-white w-full/2 max-md:w-screen md:px-5 md:py-10 md:mt-[-60px] ... h-full/2 max-md:h-full shadow-xl ... px-4 py-10">
        <div className="md:flex md:flex-row flex-col md:justify-between justify-center items-center">
          <img
            src={logoSiam}
            className="md:w-[290px] md:h-[40px] w-full h-full md:mb-0 mb-7"
          />
          <FormLogin />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-yellow p-2 text-xs flex gap-1 justify-center items-center md:mt-0 mt-3"
            onClick={() => openNewTab("https://bais.ub.ac.id/session/forget/")}
          >
            {" "}
            <i className="fa fa-lock" />
            <p>Lupa Kata Sandi?</p>
          </button>
        </div>

        <div>
          <div className="md:flex md:justify-between  px-3 py-8 gap-6">
            <div className="basis-4/6 flex flex-col  gap-5">
              <button
                className=" bg-orange h-11  w-full p-2 text-[16px] text-blue-text  font-bold max-tablet:py-8"
                onClick={() => openNewTab("https://bantuankeuangan.ub.ac.id/")}
              >
                <div className="flex flex-row justify-center max-md:h-full  items-center gap-1 max-tablet:mx-10 ">
                  <img
                    src={Clipboard}
                    className="w-[20px] max-tablet:mt-[-20px]"
                  ></img>
                  <p>Formulir Layanan Bantuan Keuangan Mahasiswa</p>
                </div>
              </button>
              <Link onClick={() => openNewTab("https://bits.ub.ac.id/")}>
                <img src={bannerGapura} className="border-[12px] border-red" />
              </Link>
            </div>

            <button className="basis-2/6 flex gap-2 justify-center items-center h-11 w-full bg-dark-blue font-bold text-white p-2 text-[15px] ">
              <i className="fa fa-lock" />
              <p>Admisi UB</p>
            </button>
          </div>
        </div>

        <div className="flex max-md:justify-center justify-end text-[12px] ">
          ©2004-2023 SIAM UB by &nbsp;
          <Link
            onClick={() => openNewTab("https://bits.ub.ac.id/")}
            className="font-bold text-blue-link   hover:text-dark-blue hover:underline"
          >
            {" "}
            TIK UB
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthLayouts;
