import { childColumns } from '@/columns/childColumns'
import { AppBar } from '@/components/AppBar'
import Table from '@/components/Table/Table'
import { useFetchData } from '@/hooks/useFetchData'
import { ChildType } from '@/types/ChildType'
import { useMemo } from 'react'

function InfantsNeedCarePage() {
  const { data } = useFetchData<ChildType[]>("children", "/child");

  const modifiedData = useMemo(() => {
    return data?.map((child) => ({
      ...child,
      severity: child.name.length > 5 ? 1 : (child.name.length % 10) + 1,
    }));
  }, [data]);

  console.log(modifiedData);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AppBar title='Infants Need Cares' description='Manage all your Infants Need Cares here' />

      <Table<ChildType> columnDefs={childColumns} rowData={modifiedData} enhanceWithActions={false} rowClick={true}/>

    </div>
  )
}

export default InfantsNeedCarePage