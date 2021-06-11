export const MakeCard = ({ altName, name, image }) => {
  return (
    <div>
      <img src={image ? image.url : ""} alt={altName} />
      <p>{name}</p>
    </div>
  );
};
