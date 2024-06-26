import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog.tsx"
import { Label } from "../../ui/label.tsx"
import { Button } from "../../ui/button.tsx"
import { IBrand } from "../../../libs/interfaces/brand.interface.ts"
import { Input } from "../../ui/input.tsx"
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { IBrandService, updateBrand } from "../../../libs/services/brand.service.ts"
import { useState } from "react"

const ModalEditBrand = ({ brand, query }: { brand: IBrand; query: UseQueryResult<IBrandService, Error> }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const [brandName, setBrandName] = useState<string>(brand.brandName)
    const updateFn = useMutation({
        mutationFn: () => updateBrand(brand._id, { brandName }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brand-list", `brand-${brand._id}`] })
        },
        onSettled: () => {
            query.refetch()
        }
    })
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <div className={"rounded py-1 bg-amber-200 hover:bg-amber-300"}>Edit</div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit brand</DialogTitle>
                    <DialogDescription>Make changes to brand here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='brandName' className='text-right'>
                            Name
                        </Label>
                        <Input
                            id='brandName'
                            defaultValue={brand.brandName}
                            className='col-span-3'
                            autoFocus={true}
                            onChange={(e) => setBrandName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type='submit'
                        onClick={() => {
                            setOpen((curr) => !curr)
                            updateFn.mutate()
                        }}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ModalEditBrand
