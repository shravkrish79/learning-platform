export default function InputTextArea({item,state}){
    const [form, setForm] = state;

    // Properties
    const formKey = [item.key];
    const formValue = form[item.key];
  
    return (
      <label className="input-field-area">
        {item.label}
        <textarea
          // State
          value={formValue}
          onChange={(event) =>
            setForm({ ...form, [formKey]: event.target.value })
          }
          // Commpon properties
          required={item.required}
          disabled={item.disabled}
          placeholder={item.placeholder}
        ></textarea>
      </label>
    );
}