import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import React from "react";

const FormTextArea = ({
  onCallbackInput,
  name,
  value,
  mainClass,
  inputClass,
  labelClass,
  placeholder = "Food, Drink, ...",
  label = "Email*",
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onCallbackInput(name, value);
  };

  return (
    <div className={`lex flex-col gap-2 justify-between mb-2 ${mainClass}`}>
      <Label className={`${labelClass}`}>{label}</Label>
      <Textarea
        onChange={handleChange}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`${inputClass}`}
      />
    </div>
  );
};

FormTextArea.propTypes = {
  onCallbackInput: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  mainClass: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
};

export default FormTextArea;
