import { EllipsisVerticalIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.tsx"
import { Button } from "../../ui/button.tsx"
import { FC, useState } from "react"
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { deleteBrand, IBrandService } from "../../../libs/services/brand.service.ts"
import ModalEditBrand from "./ModalEditBrand.tsx"
import { IBrand } from "../../../libs/interfaces/brand.interface.ts"

interface ActionProps {
    brand: IBrand
    query: UseQueryResult<IBrandService, Error>
}

const BrandAction: FC<ActionProps> = ({ brand, query }) => {
    const queryClient = useQueryClient()
    const [popover, setOpenPopover] = useState<boolean>(false)
    const deleteFn = useMutation({
        mutationFn: () => deleteBrand(`/${brand._id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brand-list", `brand-${brand._id}`] })
        },
        onSettled: () => {
            query.refetch()
        }
    })

    const handleDelete = () => {
        setOpenPopover((curr) => !curr)
        deleteFn.mutate()
    }

    return (
        <Popover onOpenChange={setOpenPopover} open={popover}>
            <PopoverTrigger asChild>
                <Button className={"bg-indigo-50 hover:bg-indigo-200"}>
                    <EllipsisVerticalIcon color={"blue"} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={
                    "w-32 cursor-pointer px-2 py-1 rounded-sm flex flex-col gap-1 text-center bg-indigo-50 *:rounded *:py-1 "
                }
            >
                <div className={"bg-indigo-100 hover:bg-indigo-200"}>View</div>

                <ModalEditBrand brand={brand} query={query} />

                <div className={"bg-red-50 hover:bg-red-400"} onClick={handleDelete}>
                    Delete
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default BrandAction
