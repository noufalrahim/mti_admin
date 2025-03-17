import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

interface DialogModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string | undefined;
    children?: React.ReactNode;
    onConfirm?: () => void;
    description?: string;
    onCancel?: () => void;
};

export default function DialogModal({
    open,
    setOpen,
    title,
    onConfirm,
    onCancel,
    children,
    description
}: DialogModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='w-[90%] rounded-lg max-h-[90vh] overflow-y-auto bg-white'>
                <DialogHeader className='flex items-start'>
                    <DialogTitle className='font-bold text-xl'>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                {
                    (onConfirm || onCancel) && <DialogFooter className="sm:justify-end gap-2 flex">
                        {
                            onCancel && <Button onClick={onCancel} variant={'destructive'} className='btn btn-danger'>Cancel</Button>
                        }
                        {
                            onConfirm && <Button onClick={onConfirm} className='btn btn-primary'>Confirm</Button>
                        }
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}
