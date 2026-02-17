import React from "react";
import authTableImage from "../assets/images/authTable.png";
import { Link } from "react-router-dom";

function AuthTable({
  header,
  inputsContent,
  handleInputChange,
  submitButton,
  handleSumit,
  routeLink,
}) {
  const inputsMap = inputsContent.map((input, index) => {
    return (
      <>
        <label className="capitalize font-semibold" htmlFor={input.name}>
          {input.name}:
        </label>
        <input
          key={index}
          id={input.name}
          className="py-2 px-4 bg-[#3a5b220a]   rounded-xl  w-full outline-none"
          type={input.type}
          name={input.name}
          onChange={handleInputChange}
          placeholder={input.placeholder}
        />
      </>
    );
  });
  return (
    <>
      {" "}
      <div className="bg-white flex flex-col justify-center items-center  lg:flex-row  lg:justify-between relative lg:static  ">
        <div className="h-full   w-full absolute lg:static  top-90 z-10  flex justify-center items-center lg:w-[60%] ">
          <form
            className=" flex flex-col justify-center w-[60%] gap-2 h-full"
            onSubmit={handleSumit}
          >
            <h1 className="text-2xl font-semibold mb-2">{header}</h1>

            {inputsMap}

            <button className="bg-primary w-full hover:bg-[#3a5b22d7] cursor-pointer py-2 px-4 rounded-xl  text-white ">
              {submitButton}
            </button>
            {/* routing */}
            <div className="capitalize">
              {routeLink === "registion"
                ? "don't have account yet ? "
                : "aleady have account ? "}
              <Link
                className="font-bold visited:text-[#3a5b22]"
                to={`/${routeLink}`}
              >
                {routeLink === "registion" ? "signUp" : "login"}
              </Link>
            </div>
          </form>
        </div>

        <div className="lg:w-[40%] overflow-hidden h-screen absolute lg:static top-160 w-full lg:w-none    lg:opacity-100">
          <img
            className="h-full  w-full object-cover rounded-4xl"
            src={authTableImage}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default AuthTable;
