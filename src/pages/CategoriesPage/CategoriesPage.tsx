/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { CategoryType, FormFieldSchema, ID } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";
import { categoryColumns } from "@/columns";

const END_POINT = '/category';

export default function CategoriesPage() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CategoryType | { id: ID } | undefined>();

    const { data: categoryData, isLoading: categoryIsLoading, refetch: refetchCategory } = useReadData<CategoryType[]>('category', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<Omit<CategoryType, 'id'>>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<CategoryType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const categorySchema: FormFieldSchema[] = [
        {
            name: "name",
            label: "Category Name",
            type: "text",
            placeholder: "Eg: Science",
            validation: { required: true }
        },
    ];

    const memoizedColumns = useMemo(() => categoryColumns, []);

    const handleEdit = useCallback((item: CategoryType | undefined) => {
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
                    refetchCategory();
                    setOpen(false);
                },
                onError: (err) => console.error('Mutation Error:', err),
            });
        },
        [selectedItem, updateMutate, createMutate, refetchCategory]
    );

    const handleConfirmDelete = useCallback(() => {
        if (selectedItem && 'id' in selectedItem) {
            deleteMutate(
                { id: selectedItem.id },
                {
                    onSuccess: () => {
                        refetchCategory();
                        setOpenWarnModal(false);
                    },
                    onError: (err) => console.error('Delete Error:', err),
                }
            );
        }
    }, [selectedItem, deleteMutate, refetchCategory]);

    if (categoryIsLoading) return <p>Loading...</p>;

    return (
        <div>
            <AppBar title="Categories" description="Manage all your categories here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Category"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={categoryData}
                filterColumn="name"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={categorySchema}
                onSubmit={handleSubmit}
                title="Category"
                description="Add or update a category"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Category">
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
