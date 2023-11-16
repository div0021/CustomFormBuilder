import { GetFormStats } from "@/actions/form";
import { MousePointerClick, View } from "lucide-react";
import StatsCard from "./statsCard";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";

interface StatsCardsType {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

const StatsCards = ({ data, loading }: StatsCardsType) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<View className="text-blue-600" />}
        helperText="All time form visits"
        value={`${data?.visits.toLocaleString() || ""}`}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={`${data?.submissions.toLocaleString() || ""}`}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={`${data?.submissionRate.toLocaleString() + "%" || ""}`}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={`${data?.bounceRate.toLocaleString() + "%" || ""}`}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};
export default StatsCards;
