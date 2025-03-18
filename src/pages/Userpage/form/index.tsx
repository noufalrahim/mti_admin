import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { userFormSchema } from './schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateData } from '@/hooks/useCreateData';
import { toast } from 'sonner';

interface UserFormProps {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}

export default function UserForm({ refetch, setOpen }: UserFormProps) {
    
    const { mutate, isPending, isError } = useCreateData("/user/add");

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
    });

    function onSubmit(values: z.infer<typeof userFormSchema>) {
        mutate(values, {
            onSuccess: (msg) => {
                console.log(msg);
                toast.success("User added successfully");
                refetch();
                setOpen(false);
            },
            onError: (error) => {
                console.log(error);
            }
        });

        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Phone Number Field */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter phone number" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                {/* Submit Button */}
                <Button type="submit" className='w-full btn btn-primary'>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
