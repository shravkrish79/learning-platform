export default function InputField({item,state}){
    const [form, setForm] = state;

    // Properties
    const formKey = [item.key];
    const formValue = form[item.key];
  
    return (
      <label className="input-field">
        {item.label}
        <input
          // State
          value={formValue}
          onChange={(event) =>
            setForm({ ...form, [formKey]: event.target.value })
          }
          // Common properties
          id={item.id}
          type={item.type}
          required={item.required}
          disabled={item.disabled}
          placeholder={item.placeholder}
          // Specific properties
          maxLength={item.maxLength}
          minLength={item.minLength}
          min={item.min}
          max={item.max}
        />
      </label> 
    );
}