import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

interface StatsCardProps{
    title:string,
    value:string,
    helperText:string,
    className:string,
    loading:boolean,
    icon:ReactNode,

}
const StatsCard = ({className,helperText,icon,loading,title,value}:StatsCardProps) => {
    return (
        <Card className={className}>
            <CardHeader className="flex items-center flex-row justify-between pb-2 text-muted-foreground">
                <CardTitle>{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                  {
                    loading && <Skeleton>
                        <span className="opacity-0">0</span>
                    </Skeleton>
                  }
                  {!loading && value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                    {helperText}
                </p>
            </CardContent>

        </Card>
    )
}
export default StatsCard;