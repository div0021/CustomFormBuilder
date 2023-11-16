import { GetFormStats, GetForms } from "@/actions/form";
import getCurrentUser from "@/actions/getCurrentUser";
import CartStatsWrapper from "@/components/cartstats-wrapper";
import CreateFormBtn from "@/components/createform-btn";
import FormCard from "@/components/form-card";
import FormCardSkeleton from "@/components/formcard-skeleton";
import StatsCards from "@/components/statsCards";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const forms = await GetForms();

  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CartStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
