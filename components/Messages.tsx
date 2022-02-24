interface IMessageProps {
  variant: string;
  id?: string;
  children: React.ReactNode;
}
const Messages = ({ children, variant, id }: IMessageProps) => {
  const color = {
    success: "text-green-500 text-sm",
    danger: "text-red-500 text-sm",
    default: "text-yellow-500 text-sm",
  };
  return (
    <div
      id={id}
      className={`${color[variant]} py-1 font-medium italic text-center`}
    >
      {children}
    </div>
  );
};

export default Messages;
