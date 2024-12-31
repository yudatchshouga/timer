'use client';
type ButtonProps = {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  width: string;
};

export const Button = (props: ButtonProps) => {
  const { name, onClick, disabled = false, width } = props;
  return (
    <button
      style={{
        width: width,
        height: '50px',
        fontSize: '16px',
        border: '1px solid #ebebeb',
        backgroundColor: '#f6f6f6',
        borderRadius: '8px',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
