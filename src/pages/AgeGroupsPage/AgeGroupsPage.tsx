/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { AgeGroupType, FormFieldSchema, ID } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";
import { ageGroupColumn } from "@/columns";

const END_POINT = '/agegroup';

export default function AgeGroupsPage() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<AgeGroupType | { id: ID } | undefined>();

    const { data: ageGroupData, isLoading: ageGroupIsLoading, refetch: refetchAgeGroup } = useReadData<AgeGroupType[]>('ageGroup', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<Omit<AgeGroupType, 'id'>>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<AgeGroupType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const ageGroupSchema: FormFieldSchema[] = [
        {
            name: "startAge",
            label: "Start Age (in months)",
            type: "number",
            placeholder: "Eg: 3",
            validation: { required: true }
        },
        {
          name: "endAge",
          label: "End Age (in months)",
          type: "number",
          placeholder: "Eg: 6",
          validation: { required: true }
      },
    ];

    const memoizedColumns = useMemo(() => ageGroupColumn, []);

    const handleEdit = useCallback((item: AgeGroupType | undefined) => {
        setSelectedItem(item);
        setTimeout(() => setOpen(true), 0);
    }, []);

    const handleDelete = useCallback((id: ID) => {
        setSelectedItem({ id });
        setTimeout(() => setOpenWarnModal(true), 0);
    }, []);

    const handleSubmit = useCallback(
        (formData: any) => {
            const mutationFn = selectedItem && 'id' in selectedItem ? updateMutate : createMutate;
            mutationFn(formData, {
                onSuccess: () => {
                    refetchAgeGroup();
                    setOpen(false);
                },
                onError: (err) => console.error('Mutation Error:', err),
            });
        },
        [selectedItem, updateMutate, createMutate, refetchAgeGroup]
    );

    const handleConfirmDelete = useCallback(() => {
        if (selectedItem && 'id' in selectedItem) {
            deleteMutate(
                { id: selectedItem.id },
                {
                    onSuccess: () => {
                        refetchAgeGroup();
                        setOpenWarnModal(false);
                    },
                    onError: (err) => console.error('Delete Error:', err),
                }
            );
        }
    }, [selectedItem, deleteMutate, refetchAgeGroup]);

    if (ageGroupIsLoading) return <p>Loading...</p>;

    return (
        <div>
            <AppBar title="Age Groups" description="Manage all your age groups here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Age Group"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={ageGroupData}
                filterColumn="name"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={ageGroupSchema}
                onSubmit={handleSubmit}
                title="Age Group"
                description="Add or update an age group"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Age Group">
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
