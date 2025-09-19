import AuthLayout from './AuthLayout'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from '@/schema'
import { useLoginMutation } from '@/store/auth-api'
import { toast } from "sonner"
import { useAuthContext } from '@/context/AuthProvider'

const Login = () => {
    const { setAuthUser } = useAuthContext();
    const [login, { isLoading }] = useLoginMutation();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
          const response = await login(values).unwrap();
          setAuthUser(response.user)
          toast(response.message)
        } catch (error) {
          const apiError = error as { data?: { error?: string } };
          const errorMsg = apiError?.data?.error ?? "An unexpected error occurred";
          toast.error(errorMsg);
        }
    }
  
    return (
        <AuthLayout>
            <div className="flex flex-col p-3">
                <h1 className="font-bold text-2xl mt-3 text-zinc-800">Sign in</h1>
                <p className="text-gray-600 text-xs mt-1">Welcome back! Please sign in to continue</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-8">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='text-zinc-500'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@email.com" {...field} className="!text-xs" type='email'/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='text-zinc-500'>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your password" {...field} type='password' className="!text-xs"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className='flex flex-col w-full'>
                            <Button className='bg-primary w-full cursor-pointer mt-5'>
                                { isLoading ? 'Loading...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    )
}

export default Login;