import { ageGroupColumns } from "@/columns/ageGroupColumns";
import { AppBar } from "@/components/AppBar";
import { DialogModal } from "@/components/DialogModal";
import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hooks/useFetchData";
import { AgeGroupType } from "@/types/AgeGroupType";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import AgeGroupForm from "./form";

export default function AgeGroupsPage() {

  const { data, isLoading, error, refetch } = useFetchData<AgeGroupType[]>("ageGroup", "/agegroup");
 const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AppBar title='Welcome Admin,' description='Manage all your users here' >
      <Button className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add Age Group
        </Button>
        </AppBar>
      <Table<AgeGroupType> columnDefs={ageGroupColumns} rowData={data} />
         <DialogModal open={open} setOpen={setOpen} title="ageGroup" description="Add a new age group">
                       <AgeGroupForm refetch={refetch} setOpen={setOpen}/>
                        </DialogModal>
    </div>
  );
}
