import React from "react";

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <fieldset>
        <legend className="sr-only">Checkboxes</legend>

        <div className="space-y-2">
          <label
            htmlFor="Option1"
            className={`flex cursor-pointer items-start gap-4 ${selectedGender === "male" ? "selected" : ""} `}
          >
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option1"
                checked={selectedGender === "male"}
                onChange={() => onCheckBoxChange("male")}
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900"> Male </strong>
            </div>
          </label>

          <label
            htmlFor="Option2"
            className={`flex cursor-pointer items-start gap-4 ${selectedGender === "female" ? "selected" : ""} `}
          >
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
                checked={selectedGender === "female"}
                onChange={() => onCheckBoxChange("female")}
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900"> Female </strong>
            </div>
          </label>
        </div>
      </fieldset>
    </>
  );
};

export default GenderCheckBox;
