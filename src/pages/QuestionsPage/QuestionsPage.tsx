/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { AgeGroupType, CategoryType, FormFieldSchema, ID, QuestionPostType, QuestionType } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";
import { questionColumn } from "@/columns";

const END_POINT = '/questions';

export default function QuestionsPage() {

    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<QuestionType | { id: ID } | undefined>();

    const { data: questionData, isLoading: questionIsLoading, refetch: refetchQuestion } = useReadData<QuestionType[]>('questions', END_POINT);
    const { data: categoryData, isLoading: categoryIsLoading } = useReadData<CategoryType[]>('category', '/category');
    const { data: ageGroupData, isLoading: ageGroupIsLoading } = useReadData<AgeGroupType[]>('ageGroup', '/agegroup');

    const { mutate: createMutate, isPending: isCreating } = useCreateData<Omit<QuestionPostType, 'id'>>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<QuestionPostType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const severity = Array.from({ length: 10 }, (_, i) => i + 1);

    const questionSchema: FormFieldSchema[] = [
        {
            name: "questionEnglish",
            label: "Question (in english)",
            type: "text",
            placeholder: "Eg: How does a plant grow?",
            validation: { required: true }
        },
        {
          name: "questionMalayalam",
          label: "Question (in malayalam)",
          type: "text",
          placeholder: "Eg: സസ്യങ്ങൾ എങ്ങനെ വളരുന്നു?",
          validation: { required: true }
      },
      {
        name: "severity",
        label: "Severity",
        type: "dropdown",
        options: severity.map((sv) => ({
          label: sv.toString(),
          value: sv.toString()
        })),
        placeholder: "Eg: 1",
        validation: { required: true }
      },
      {
        name: "agegroup",
        label: "Age Group",
        type: "dropdown",
        options: ageGroupData && ageGroupData.map((ag) => ({
          label: `${ag.startAge} - ${ag.endAge}`,
          value: ag.id,
        })),
        validation: { required: true }
      },
      {
        name: "category",
        label: "Category",
        type: "dropdown",
        options: categoryData && categoryData.map((ct) => ({
          label: ct.name,
          value: ct.id
        })),
        validation: { required: true }
      },
    ];

    const memoizedColumns = useMemo(() => questionColumn, []);

    const handleEdit = useCallback((item: QuestionType | undefined) => {
        setSelectedItem(item);
        setTimeout(() => setOpen(true), 0);
    }, []);

    const handleDelete = useCallback((id: ID) => {
        setSelectedItem({ id });
        setTimeout(() => setOpenWarnModal(true), 0);
    }, []);

    const handleSubmit = useCallback(
        (formData: any) => {
            const updatedFormData: Omit<QuestionPostType, 'id'> = {
                ageGroup: {
                    id: parseInt(formData.agegroup)
                },
                category: {
                    id: parseInt(formData.category)
                },
                questionEnglish: formData.questionEnglish,
                questionMalayalam: formData.questionMalayalam,
                severity: parseInt(formData.severity)
            }
            if(selectedItem){
                console.log({
                    ...updatedFormData,
                    id: parseInt(selectedItem.id.toString())
                });
                updateMutate(({
                    ...updatedFormData,
                    id: selectedItem.id.toString()
                }), {
                    onSuccess: () => {
                        refetchQuestion();
                        setOpen(false);
                    },
                    onError: (err) => console.error('Mutation Error:', err),
                })
            }
            else {
                createMutate(updatedFormData, {
                    onSuccess: () => {
                        refetchQuestion();
                        setOpen(false);
                    },
                    onError: (err) => console.error('Mutation Error:', err),
                });
            }
        },
        [selectedItem, refetchQuestion]
    );

    const handleConfirmDelete = useCallback(() => {
        if (selectedItem && 'id' in selectedItem) {
            deleteMutate(
                { id: selectedItem.id },
                {
                    onSuccess: () => {
                      refetchQuestion();
                        setOpenWarnModal(false);
                    },
                    onError: (err) => console.error('Delete Error:', err),
                }
            );
        }
    }, [selectedItem, deleteMutate, refetchQuestion]);

    if (questionIsLoading || categoryIsLoading || ageGroupIsLoading) return <p>Loading...</p>;

    return (
        <div>
            <AppBar title="Questions" description="Manage all your questions here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Question"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={questionData}
                filterColumn="name"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={questionSchema}
                onSubmit={handleSubmit}
                title="Question"
                description="Add or update a question"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Question">
                <h1 className="font-bold text-xl text-center">
                    Are you sure you want to delete this item? This action cannot be undone.
                </h1>
                <div className="flex flex-row gap-5 mt-5 w-full">
                    <SecondaryButton
                        label="Cancel"
                        onClick={() => setOpenWarnModal(false)}
                        className="w-full bg-primary-main text-white hover:bg-primary-700"
                    />
                    <PrimaryButton
                        className="bg-red-800 hover:bg-red-700 w-full"
                        label="Delete"
                        onClick={handleConfirmDelete}
                        loading={isDeleting}
                    />
                </div>
            </DialogModal>
        </div>
    );
}
