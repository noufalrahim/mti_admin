import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { categoryFormSchema} from './schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CategoryType } from '@/types/CategoryType'
import { AgeGroupType } from '@/types/AgeGroupType'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFetchData } from '@/hooks/useFetchData'
import { QuestionType } from '@/types/QuestionType'
import { useCreateData } from '@/hooks/useCreateData'
import { toast } from 'sonner'

interface CategoryFormProps {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}

export default function CategoryForm(
    {
        refetch,
        setOpen,
    }: CategoryFormProps
) {


    const { mutate, isPending, isError } = useCreateData<CategoryType>("/category/add");

    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
    });

    function onSubmit(values: z.infer<typeof categoryFormSchema>) {
       
        mutate(values, {
            onSuccess: (msg) => {
                console.log(msg);
                toast.success("Question added successfully");
                refetch();
                setOpen(false)

            },
            onError: (error) => {
                console.log(error);
            }
        })

        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question (English)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter question (english)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
  
                <Button type="submit" className='w-full btn btn-primary'>Submit</Button>
            </form>
        </Form>
    )
}
