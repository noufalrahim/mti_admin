import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { questionFormSchema } from './schema'
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

interface QuestionFormProps {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}

export default function QuestionForm(
    {
        refetch,
        setOpen,
    }: QuestionFormProps
) {

    const { data: ageGroupsData, isLoading: ageGroupIsLoading, error: ageGroupIsError } = useFetchData<AgeGroupType[]>("ageGroup", "/agegroup");
    const { data: categoriesData, isLoading: categoryIsLoading, error: categoryIsError } = useFetchData<CategoryType[]>("category", "/category");
    const { mutate, isPending, isError } = useCreateData<QuestionType>("/questions/add");

    const form = useForm<z.infer<typeof questionFormSchema>>({
        resolver: zodResolver(questionFormSchema),
    });

    function onSubmit(values: z.infer<typeof questionFormSchema>) {
        const newQuestion: QuestionType = {
            ...values,
            ageGroup: {
                id: parseInt(values.ageGroup)
            },
            category: {
                id: parseInt(values.category)
            },
        };

        mutate(newQuestion, {
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

        console.log(newQuestion);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="questionEnglish"
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
                <FormField
                    control={form.control}
                    name="questionMalayalam"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question (Malayalam)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter question (malayalam)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age Groups</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an age group" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                    {
                                        ageGroupsData && ageGroupsData.map((ageGroup) => (
                                            <SelectItem value={ageGroup.id!.toString()} key={ageGroup.id!}>{`${ageGroup?.startAge} Months - ${ageGroup?.endAge} Months`}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                    {
                                        categoriesData && categoriesData.map((category) => (
                                            <SelectItem value={category.id!.toString()} key={category.id!}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Severity</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose question severity" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    {[...Array(10)].map((_, index) => (
                                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                                            {index + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full btn btn-primary'>Submit</Button>
            </form>
        </Form>
    )
}
