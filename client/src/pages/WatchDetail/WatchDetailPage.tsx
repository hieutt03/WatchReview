import WatchInfo from "../../components/pages/watch/WatchInfo.tsx"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getWatch } from "../../libs/services/watch.service.ts"
import ErrorPage from "../Error/ErrorPage.tsx"
import Comment from "../../components/pages/watch/Comment.tsx"

const WatchDetailPage = () => {
    const { watchId } = useParams()
    const query = useQuery({
        queryKey: [`watch-${watchId}`],
        queryFn: () => getWatch(watchId ?? "")
    })
    console.log(watchId)
    const watch = query.data?.watch
    if (query.isLoading) {
        return <div>Loading</div>
    }
    if (query.isError || watch === undefined) {
        return <ErrorPage />
    }
    console.log(watch)
    return (
        <div className={"mx-20"}>
            {query.isSuccess && (
                <div className={"flex flex-col gap-4"}>
                    <WatchInfo watch={watch} />
                    <Comment watch={watch} query={query} isComment />
                </div>
            )}
        </div>
    )
}
export default WatchDetailPage
