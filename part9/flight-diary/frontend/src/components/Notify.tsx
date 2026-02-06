interface ChildProps {
  notify: string | null;
}

const Notify: React.FC<ChildProps> = ({ notify }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{notify}</p>
    </div>
  );
};

export default Notify;
