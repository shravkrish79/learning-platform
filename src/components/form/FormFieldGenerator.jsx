import InputField from "./InputField";
import InputTextArea from "./InputTextArea";
import InputFile from "./InputFile";
import InputSelect from "./InputSelect";

export default function FormFieldGenerator({ data, state }) {
    // Component
    const Fields = data.map((item) => {
        switch (item.type) {
            case "email":
            case "number":
            case "password":
            case "text":
                return <InputField key={item.id} item={item} state={state} />;
            case "textarea":
                return <InputTextArea key={item.id} item={item} state={state} />;
            case "file":
                return <InputFile key={item.id} item={item} state={state} />;
            case "select":
                return <InputSelect key={item.id} item={item} state={state}/>;
            default:
                throw new Error(`The item type "${item.type}" is not valid`);
        }
    });

    return Fields;
}