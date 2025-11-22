import { Upload } from "lucide-react";
import React from "react";
import avatarFake from "../assets/images/avatarFake.png";
function DashboardForm({
  headerText,
  inputsCotent,
  handleInputChange,
  handleImageChange,
  imagePreview,
  imageRemove,
  submitButton,
  handleSubmit,
  errorMessage,
}) {
  const inputsMap = inputsCotent.map((input, index) => {
    return input.type === "file" ? (
      <>
        <div className="flex flex-col sm:flex-row justify-start gap-10 items-center my-5  ">
          <label
            htmlFor={input.name}
            className="flex flex-col items-center justify-center w-50 h-40 border-2 border-dashed border-[#3a5b22] rounded-xl cursor-pointer bg-[#3a5b220a] hover:bg-[#3a5b2215] transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-[#3a5b22]" />
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
          </label>
          <input
            key={index}
            id={input.name}
            className="hidden"
            type={input.type}
            name={input.name}
            onChange={handleImageChange}
          />

          <div className="h-40 w-50 rounded-xl">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={imagePreview ? imagePreview : avatarFake}
              alt=""
            />
          </div>
        </div>
      </>
    ) : (
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
  console.log(inputsMap);
  return (
    <div className="m-5">
      <h1 className="text-2xl capitalize mb-3 pb-2 border-b-2 border-[#3a5b22] ">
        {headerText}
      </h1>
      <form onSubmit={handleSubmit}>
        {inputsMap}

        {typeof errorMessage === Array && (
          <div>
            <div className="bg-white p-6 rounded-lg  mt-5">
              {errorMessage?.length > 0 && (
                <div className="text-red-600">
                  <p className="font-semibold mb-2">Errors:</p>
                  <ul className="space-y-1 text-sm">
                    {errorMessage?.map((error, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {typeof errorMessage === "string" && (
          <div>
            <div className="bg-white p-6 rounded-lg  mt-5">
              {errorMessage?.length > 0 && (
                <div className="text-red-600">
                  <p className="font-semibold mb-2">Errors:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{errorMessage}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <button className="bg-[#3a5b22] w-full hover:bg-[#3a5b22d7] cursor-pointer py-2 px-4 rounded-xl  text-white my-5">
          {submitButton}
        </button>
      </form>
    </div>
  );
}

export default DashboardForm;
