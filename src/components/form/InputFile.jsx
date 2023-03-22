export default function InputFile({ item, state }) {
    const [form, setForm] = state;
    const formKey = [item.key];

    function validateFileSize(event) {
        let fileSize = 0, fileMb = 0;

        if (event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                fileSize = event.target.files[i].size + fileSize;
                fileMb = fileSize / 1024 ** 2;
            }
            let fileButton = document.getElementById(item.key);
            if (fileMb > 50) {
                fileButton.style.border = "2px solid red";
                alert('Please select overall file size should be less than 50MB')
            }
            else {
                fileButton.style.border = "none";
                setForm({ ...form, [formKey]: event.target.files });
            }
        }
    }

    return (
        <label className="input-field">
            {item.label}
            {item.multiple ?
                <input
                    onChange={(event) => validateFileSize(event)}
                    id={item.key}
                    type={item.type}
                    required={item.required}
                    disabled={item.disabled}
                    placeholder={item.placeholder}
                    accept={item.accept}
                    multiple
                /> :
                <input
                    onChange={(event) => validateFileSize(event)}
                    id={item.key}
                    type={item.type}
                    required={item.required}
                    disabled={item.disabled}
                    placeholder={item.placeholder}
                    accept={item.accept}
                />
            }
        </label>

    );
}