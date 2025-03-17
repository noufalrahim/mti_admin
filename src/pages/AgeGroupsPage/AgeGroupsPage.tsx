import { ageGroupColumns } from "@/columns/ageGroupColumns";
import { AppBar } from "@/components/AppBar";
import Table from "@/components/Table/Table";
import { useFetchData } from "@/hooks/useFetchData";
import { AgeGroupType } from "@/types/AgeGroupType";

export default function AgeGroupsPage() {

  const { data, isLoading, error } = useFetchData<AgeGroupType[]>("ageGroup", "/agegroup");

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AppBar title='Welcome Admin,' description='Manage all your users here' />
      <Table<AgeGroupType> columnDefs={ageGroupColumns} rowData={data} />
    </div>
  );
}
