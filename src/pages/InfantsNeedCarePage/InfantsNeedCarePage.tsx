import { AppBar } from '@/components/AppBar'

function InfantsNeedCarePage() {
  // const { data } = useReadData<ChildType[]>("children", "/child");

  // const modifiedData = useMemo(() => {
  //   return data?.map((child) => ({
  //     ...child,
  //     severity: child.name.length > 5 ? 1 : (child.name.length % 10) + 1,
  //   }));
  // }, [data]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AppBar title='Infants Need Cares' description='Manage all your Infants Need Cares here' />

      {/* <Table<ChildType> columnDefs={childColumns} rowData={modifiedData} enhanceWithActions={false} rowClick={true}/> */}
    </div>
  )
}

export default InfantsNeedCarePage