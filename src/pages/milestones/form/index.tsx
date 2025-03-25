import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { milestoneFormSchema} from './schema'
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
import { MilestoneType } from '@/types/MilestoneType'

interface MilestoneFormProps {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}

export default function MilestoneForm(
    {
        refetch,
        setOpen,
    }: MilestoneFormProps
) {


    // const { mutate, isPending, isError } = useCreateData<CategoryType>("/category/add");

    const form = useForm<z.infer<typeof milestoneFormSchema>>({
        resolver: zodResolver(milestoneFormSchema),
    });

    function onSubmit(values: z.infer<typeof milestoneFormSchema>) {
       
        // mutate(values, {
        //     onSuccess: (msg) => {
        //         console.log(msg);
        //         toast.success("Question added successfully");
        //         refetch();
        //         setOpen(false)

        //     },
        //     onError: (error) => {
        //         console.log(error);
        //     }
        // })

        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Milestones</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a milestone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                    {/* {
                                        ageGroupsData && ageGroupsData.map((ageGroup) => (
                                            <SelectItem value={ageGroup.id!.toString()} key={ageGroup.id!}>{`${ageGroup?.startAge} Months - ${ageGroup?.endAge} Months`}</SelectItem>
                                        ))
                                    } */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                                        

                        </FormItem>
                    )}
                />
                <FormField
                          control={form.control}
                                            name="milestone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Milestone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter milestone" {...field} />
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
