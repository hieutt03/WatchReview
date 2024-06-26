export const useTime = (time: string): string => {
    const currentTime = new Date()
    const commentTime = new Date(time)
    const differenceInSeconds: number = Math.floor((currentTime.getTime() - commentTime.getTime()) / 1000)

    if (differenceInSeconds < 60) {
        return "Just now"
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60)
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600)
        return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else if (differenceInSeconds < 604800) {
        const days = Math.floor(differenceInSeconds / 86400)
        return `${days} day${days > 1 ? "s" : ""} ago`
    } else {
        return commentTime.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    }
}
