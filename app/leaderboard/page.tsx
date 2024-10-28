export default function Leaderboard() {
  const demo = [
    { name: "Anurag", aura: 100000000 },
    { name: "Vaishnavi", aura: -10 },
    { name: "Sakshi", aura: 10 },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-foreground">
      <div className="h-auto w-1/3 m-auto text-black p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Leaderboard</h2>
        <ul className="text-xl space-y-3">
          {demo.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 rounded-lg shadow-sm  transition duration-200 ease-in-out"
            >
              <span className="font-semibold text-black">{item.name}</span>
              <span
                className={`text-lg ${
                  item.aura > 0 ? "text-green-700" : "text-red-500"
                }`}
              >
                {item.aura}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
