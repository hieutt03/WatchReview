import { useForm } from "react-hook-form"
import { UserLogin, UserLoginType } from "../../../libs/schemas/auth.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "../../../libs/services/auth.service.ts"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form.tsx"
import { Input } from "../../ui/input.tsx"
import { Button } from "../../ui/button.tsx"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext.tsx"
import { jwtDecode } from "jwt-decode"
import { RouterEndpoint } from "../../../constants/RouterEndpoint.ts"

const FormLogin = () => {
    const nav = useNavigate()
    const { setAuth } = useAuth()
    const form = useForm<UserLoginType>({
        resolver: zodResolver(UserLogin)
    })
    const onSubmit = async (data: UserLoginType) => {
        const rs = await login(data)
        localStorage.setItem("accessToken", rs.data?.token as string)
        const decodedToken = jwtDecode<{
            membername: string
            isAdmin: boolean
        }>(rs.data?.token as string)
        setAuth({ user: decodedToken.membername, isAdmin: decodedToken.isAdmin })
        console.log(decodedToken)
        if (decodedToken.isAdmin) {
            nav(RouterEndpoint.WatchDashboard)
        } else {
            nav(RouterEndpoint.Home)
        }
    }
    return (
        <div className={"grid grid-cols-2 mx-20 "}>
            <div className={"cols-span-1 flex flex-col w-2/3 "}>
                <div className={"text-4xl font-bold item"}>Login form</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={"flex flex-col gap-4"}>
                            <FormField
                                control={form.control}
                                name={"membername"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Member name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter membername' {...field} />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"password"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter password' {...field} type={"password"} />
                                        </FormControl>
                                        {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className={"py-4 flex gap-4 items-center"}>
                            <Button type={"submit"}>Login</Button>
                            <div>Login with Google</div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default FormLogin
