import { GetFormById } from "@/actions/form";
import FormLinkShare from "@/components/form-link-share";
import StatsCard from "@/components/statsCard";
import SubmissionTable from "@/components/submission-table";
import VisitBtn from "@/components/visit-btn";
import { MousePointerClick, View } from "lucide-react";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";

const FormsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("form not found!");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-t border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>
      <div className="container w-full pt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<View className="text-blue-600" />}
        helperText="All time form visits"
        value={`${visits.toLocaleString() || ""}`}
        loading={false}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={`${submissions.toLocaleString() || ""}`}
        loading={false}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={`${submissionRate.toLocaleString() + "%" || ""}`}
        loading={false}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={`${bounceRate.toLocaleString() + "%" || ""}`}
        loading={false}
        className="shadow-md shadow-red-600"
      />
      </div>
      <div className="container pt-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
};
export default FormsPage;
