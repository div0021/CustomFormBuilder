import { GetFormStats } from "@/actions/form";
import StatsCards from "./statsCards";

    

const CartStatsWrapper = async () => {
    const stats = await GetFormStats();
    return (<StatsCards loading={false} data={stats} />);
}
export default CartStatsWrapper;