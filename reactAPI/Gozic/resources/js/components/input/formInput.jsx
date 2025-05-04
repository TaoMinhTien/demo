
export default function FormInput({
    label,
    type = "text",
    placeholder,
    className ="",
    value,
    setValue,
}) {
    return (
        <div>
            <label htmlFor="myInput">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={`border px-2 py-2 mb-3 ${className}`}
                value={value}
                onChange = {(e) => {
                    setValue(e.target.value)
                }}
            />
        </div>
    );
}
