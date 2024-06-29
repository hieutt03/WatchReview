import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog.tsx"
import { Button } from "../../ui/button.tsx"
import { Input } from "../../ui/input.tsx"
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"
import { addWatch, IWatchService } from "../../../libs/services/watch.service.ts"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form.tsx"
import { useForm } from "react-hook-form"
import { WatchSchema, WatchType } from "../../../libs/schemas/watch.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../../ui/textarea.tsx"
import { getAllBrands } from "../../../libs/services/brand.service.ts"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../ui/select.tsx"

const ModalEditBrand = ({ query }: { query: UseQueryResult<IWatchService, Error> }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const queryBrands = useQuery({
        queryKey: ["brand-list"],
        queryFn: getAllBrands
    })
    const brands = queryBrands.data?.brands
    const updateFn = useMutation({
        mutationFn: (data: WatchType) => addWatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watch-list"] })
        },
        onSettled: () => {
            query.refetch()
        }
    })
    const form = useForm<WatchType>({
        resolver: zodResolver(WatchSchema)
    })
    const onSubmit = async (data: WatchType) => {
        setOpen((curr) => !curr)
        // closePopover()
        updateFn.mutate(data)
    }
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button className={"my-3 justify-end"}>Add new</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Add watch</DialogTitle>
                    <DialogDescription>Make changes to watch here. Click save when you're done.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={"flex flex-col gap-4"}>
                            <FormField
                                control={form.control}
                                name={"watchName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Watch name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter membername' {...field} autoFocus={true} />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"brand"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>

                                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>Select a brand</SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {brands?.map((brand) => (
                                                    <SelectItem key={brand._id} value={brand._id}>
                                                        {brand.brandName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"price"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter price'
                                                {...field}
                                                type={"number"}
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"image"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter url' {...field} type={"url"} />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"watchDescription"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Watch description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter description' {...field} />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type='submit' className={"mt-4"}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default ModalEditBrand
