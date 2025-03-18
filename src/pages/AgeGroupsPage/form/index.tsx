import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { agegroupFormSchema } from './schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AgeGroupType } from '@/types/AgeGroupType';
import { useCreateData } from '@/hooks/useCreateData';
import { toast } from 'sonner';

interface AgeGroupFormProps {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}

export default function AgeGroupForm({ refetch, setOpen }: AgeGroupFormProps) {
    
    const { mutate, isPending, isError } = useCreateData<AgeGroupType>("/age-groups/add");

    const form = useForm<z.infer<typeof agegroupFormSchema>>({
        resolver: zodResolver(agegroupFormSchema),
    });

    function onSubmit(values: z.infer<typeof agegroupFormSchema>) {
        mutate(values, {
            onSuccess: (msg) => {
                console.log(msg);
                toast.success("Age group added successfully");
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
                {/* Start Age Field */}
                <FormField
                    control={form.control}
                    name="startAge"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Age</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter start age" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* End Age Field */}
                <FormField
                    control={form.control}
                    name="endAge"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Age</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter end age" type="number" {...field} />
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
