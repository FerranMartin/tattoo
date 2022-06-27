import React from "react";

const useEnumSetting = ({ options, defaultValue, id, label }) => {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = React.useCallback((event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  }, []);

  const Setting = () => {
    return (
      <div className="enumSetting">
        {label}
        {Object.keys(options).map((key) => {
          const optionLabel = options[key];
          return (
            <span key={key}>
              <label htmlFor={key}>{optionLabel} </label>
              <input
                id={key}
                name={id}
                type="radio"
                value={key}
                checked={value === key}
                onChange={handleChange}
              />
            </span>
          );
        })}
      </div>
    );
  };

  return { value, Setting };
};

export { useEnumSetting };
