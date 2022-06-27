import React from "react";

const useBooleanSetting = ({ defaultValue, id, label }) => {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = React.useCallback(() => {
    setValue((_prevValue) => !_prevValue);
  }, []);

  const Setting = () => {
    return (
      <span>
        <label htmlFor={id}>{label} </label>
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={value}
          onChange={handleChange}
        />
      </span>
    );
  };

  return { value, Setting };
};

export { useBooleanSetting };
