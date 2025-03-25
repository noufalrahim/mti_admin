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
import { MilestoneType } from '@/types/MilestoneType';
import MilestoneForm from './form';
import { MilestoneColumns } from '@/columns/milestoneColumns';
export default function MilestonesPage() {
  const { data, isLoading, error, refetch } = useFetchData<MilestoneType[]>("category", "/category");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
                <AppBar title='Milestones' description='Manage all your milestones here'>
        <Button className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add Milestones
        </Button>
      </AppBar>
          <Table<MilestoneType> columnDefs={MilestoneColumns} rowData={data} />
                <DialogModal open={open} setOpen={setOpen} title="Milestones" description="Add a new Milestone">

                <MilestoneForm refetch={refetch} setOpen={setOpen}/>

                </DialogModal>
        </div>
  )
}
