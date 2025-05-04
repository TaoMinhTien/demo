

export default function CustomButton(
    {
        content,
        onClick,
        className = '',
    }

) {
    return (
        <div>
            <button onClick={onClick} className={`bg-blue-500 ${className}`}>{content}</button>
        </div>
    );
}