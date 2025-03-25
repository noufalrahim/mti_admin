import { questionColumns } from "@/columns";
import { AppBar } from "@/components/AppBar";
import { DialogModal } from "@/components/DialogModal";
import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hooks/useFetchData";
import { QuestionType } from "@/types/QuestionType";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import QuestionForm from "./form";

export default function QuestionsPage() {

  const { data, isLoading, error, refetch } = useFetchData<QuestionType[]>("questions", "/questions");
  console.log(data);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AppBar title='Questions' description='Manage all your questions here'>
        <Button className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add Question
        </Button>
      </AppBar>
      <Table<QuestionType> columnDefs={questionColumns} rowData={data} />
      <DialogModal open={open} setOpen={setOpen} title="Question" description="Add a new question">
        <QuestionForm refetch={refetch} setOpen={setOpen}/>
      </DialogModal>
    </div>
  );
}
