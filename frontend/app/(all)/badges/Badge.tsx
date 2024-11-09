const Badge = ({ imageUrl, title, subtitle, year, criteria }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center flex flex-col items-center">
      <img src={imageUrl} alt={title} className="w-16 h-16 mb-4" />
      <h3 className="text-1xl font-bold text-white">{title}</h3>
      <p className="text-md text-white">{subtitle}</p>
      <p className="text-md text-gray-200 mt-1">{year}</p>
      {criteria && <p className="text-md text-gray-200 mt-1">{criteria}</p>}
    </div>
  );
};

export default Badge;
