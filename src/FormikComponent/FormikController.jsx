import Input from "./TextInputField"
// import TextArea from "TextArea.js"
// import Select from "Select.js"
// import RadioButtons from "RadioButton.js"
// import CheckBoxes from "CheckBoxes.js"

function FormikController(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    default:
      return null
  }
}
export default FormikController