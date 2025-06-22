/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { FormFieldSchema, ID, UserType } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";
import { userColumns } from "@/columns";

const END_POINT = '/users';

export default function UserPage() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<UserType | { id: ID } | undefined>();

    const { data: userData, isLoading: userDataIsLoading, refetch: refetchUsers } = useReadData<UserType[]>('users', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<Omit<UserType, 'id'>>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<UserType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const categorySchema: FormFieldSchema[] = [
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
            placeholder: "Eg: 9876543210",
            validation: { required: true }
        },
    ];

    const memoizedColumns = useMemo(() => userColumns, []);

    const handleEdit = useCallback((item: UserType | undefined) => {
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
                    refetchUsers();
                    setOpen(false);
                },
                onError: (err) => console.error('Mutation Error:', err),
            });
        },
        [selectedItem, updateMutate, createMutate, refetchUsers]
    );

    const handleConfirmDelete = useCallback(() => {
        if (selectedItem && 'id' in selectedItem) {
            deleteMutate(
                { id: selectedItem.id },
                {
                    onSuccess: () => {
                        refetchUsers();
                        setOpenWarnModal(false);
                    },
                    onError: (err) => console.error('Delete Error:', err),
                }
            );
        }
    }, [selectedItem, deleteMutate, refetchUsers]);

    if (userDataIsLoading) return <p>Loading...</p>;

    return (
        <div>
            <AppBar title="Categories" description="Manage all your users here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Users"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={userData}
                filterColumn="name"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={categorySchema}
                onSubmit={handleSubmit}
                title="Users"
                description="Add or update a user"
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
