import Link from "next/link";

const rewards = [
  {
    id: "1",
    name: "Golden Badge",
    description: "Achieve a 90% score in exams",
  },
  {
    id: "2",
    name: "Silver Badge",
    description: "Achieve an 80% score in exams",
  },
  { id: "3", name: "Discount Coupon", description: "Get 20% off on courses" },
  {
    id: "5",
    name: "Exclusive Campus Event Access",
    description: "Access to special campus events for high achievers",
  },
  {
    id: "6",
    name: "Study Resource Pack",
    description: "Get extra study resources for consistent performance",
  },
  {
    id: "7",
    name: "Bronze Badge",
    description: "Achieve a 70% score in exams",
  },
  {
    id: "8",
    name: "Achievement Certificate",
    description: "Awarded for excellent attendance and participation",
  },
  {
    id: "9",
    name: "Early Access to Course Materials",
    description: "Unlock course materials one week early",
  },
  {
    id: "10",
    name: "Campus Workshop Pass",
    description: "Free pass to upcoming campus workshop on skill development",
  },
  {
    id: "11",
    name: "Loyalty Badge",
    description: "Awarded for consistent improvement over semesters",
  },
  {
    id: "12",
    name: "Mentorship Session",
    description: "Earn a 1-on-1 mentorship session with a senior professor",
  },
  {
    id: "13",
    name: "Certificate of Excellence",
    description: "Awarded for achieving top rank in your class",
  },
];

const RewardsList = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Rewards
      </h1>
      <div className="flex flex-wrap justify-center">
        {rewards.map((reward) => (
          <li
            key={reward.id}
            className="flex flex-col items-center justify-center max-w-xs m-4 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <h2 className="text-2xl font-bold text-black mb-2 text-center">
              {reward.name}
            </h2>
            <p className="text-gray-700 text-center mb-4">
              {reward.description}
            </p>
            <Link href={`/rewards/${reward.id}`}>
              <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition duration-200">
                Edit
              </button>
            </Link>
          </li>
        ))}
      </div>
      <Link href="/rewards/add">
        <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition duration-200 block mx-auto">
          Add Reward
        </button>
      </Link>
    </div>
  );
};

export default RewardsList;
