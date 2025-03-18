import React, { useState } from 'react'
import { ageGroupColumns } from "@/columns/ageGroupColumns";
import { AppBar } from "@/components/AppBar";
import Table from "@/components/Table/Table";
import { useFetchData } from "@/hooks/useFetchData";
import { AgeGroupType } from "@/types/AgeGroupType";
import { data } from 'react-router-dom';
import { QuestionType } from '@/types/QuestionType';
import { CategoryType } from '@/types/CategoryType';
import { CategoryColumns } from '@/columns/categoryColumns';
import { DialogModal } from '@/components/DialogModal';
import QuestionForm from '../QuestionsPage/form';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import CategoryForm from './form';

export default function CategoriesPage() {
  const { data, isLoading, error, refetch } = useFetchData<CategoryType[]>("category", "/category");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
                <AppBar title='Categories' description='Manage all your Categories here'>
        <Button className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add Category
        </Button>
      </AppBar>
          <Table<CategoryType> columnDefs={CategoryColumns} rowData={data} />
                <DialogModal open={open} setOpen={setOpen} title="Category" description="Add a new Category">
        <CategoryForm refetch={refetch} setOpen={setOpen}/>
                </DialogModal>
        </div>
  )
}
