import { useQuery } from "@tanstack/react-query"
import { getAllBrands } from "../../../libs/services/brand.service.ts"
import React, { ChangeEvent, useState } from "react"
import { IWatch } from "../../../libs/interfaces/watch.interface.ts"
import { filerWatches } from "../../../libs/services/watch.service.ts"

const ListBrand = ({ setWatches }: { setWatches: React.Dispatch<React.SetStateAction<IWatch[]>> }) => {
    const query = useQuery({
        queryKey: ["brand-list"],
        queryFn: getAllBrands
    })
    const brands = query.data?.brands
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])

    const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target
        if (checked) {
            setSelectedBrands([...selectedBrands, value])
        } else {
            setSelectedBrands(selectedBrands.filter((id) => id !== value))
        }
    }
    const queryFilter = useQuery({
        queryKey: ["brand-list-filter"],
        queryFn: () => filerWatches(selectedBrands)
    })
    if (selectedBrands.length > 0 && queryFilter.data?.watches) {
        setWatches(queryFilter.data?.watches)
    }

    return (
        <div className={"w-52 flex flex-col gap-4'"}>
            {brands?.map((brand) => (
                <div className='flex items-center space-x-2 p-2' key={brand._id}>
                    <input
                        type='checkbox'
                        id={`brand-${brand._id}`}
                        value={brand._id}
                        onChange={handleCheckboxChange}
                        className='peer'
                    />
                    <label
                        htmlFor={`brand-${brand._id}`}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                        {brand.brandName}
                    </label>
                </div>
            ))}
        </div>
    )
}
export default ListBrand
