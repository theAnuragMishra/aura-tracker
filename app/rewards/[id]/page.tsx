"use client";
import { useParams } from "next/navigation";

const RewardDetail: React.FC = () => {
  const { id } = useParams();

  const reward = {
    id,
    name: "Gold Medal",
    description: "Achieve a 90% score in exams",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('./assests/back.jpg')] bg-cover text-white">
      <div className="w-full max-w-lg p-10 md:p-12 lg:p-16 space-y-8 rounded-lg shadow-lg bg-[#0d0e22]">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Configure Reward: {reward.name}
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-base md:text-lg font-medium">
              Name:
            </label>
            <input
              type="text"
              defaultValue={reward.name}
              className="mt-3 w-full px-5 py-3 text-black text-lg md:text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div>
            <label className="block text-base md:text-lg font-medium">
              Description:
            </label>
            <textarea
              defaultValue={reward.description}
              className="mt-3 w-full px-5 py-3 text-black text-lg md:text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 text-lg md:text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-900"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default RewardDetail;
