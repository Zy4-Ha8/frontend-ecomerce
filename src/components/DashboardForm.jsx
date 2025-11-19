import React from "react";

function DashboardForm({
  headerText,
  inputsCotent,
  handleInputChange,
  submitButton,
  handleSubmit
}) {
  const inputsMap = inputsCotent.map((input, index) => (
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
  ));
  return (
    <div className="m-5">
      <h1 className="text-2xl capitalize mb-3 pb-2 border-b-2 border-[#3a5b22] ">
        {headerText}
      </h1>
      <form onSubmit={handleSubmit}>
        {inputsMap}

        <button className= "bg-[#3a5b22] w-full hover:bg-[#3a5b22d7] cursor-pointer py-2 px-4 rounded-xl  text-white my-5">
          {submitButton}
        </button>
      </form>
    </div>
  );
}

export default DashboardForm;
