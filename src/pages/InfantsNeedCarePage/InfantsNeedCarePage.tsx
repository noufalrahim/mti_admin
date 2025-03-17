import { childColumns } from '@/columns/childColumns'
import { AppBar } from '@/components/AppBar'
import { DialogModal } from '@/components/DialogModal'
import Table from '@/components/Table/Table'
import { Button } from '@/components/ui/button'
import { useFetchData } from '@/hooks/useFetchData'
import { ChildType } from '@/types/ChildType'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { data } from 'react-router-dom'

function InfantsNeedCarePage() {
const { data, isLoading, error, refetch } = useFetchData<ChildType[]>("children", "/child");
console.log(data);
  const [open,setOpen]=useState<boolean>(false);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
                <AppBar title='Infants Need Cares' description='Manage all your Infants Need Cares here'/>
      
          <Table<ChildType> columnDefs={childColumns} rowData={data}  enhanceWithActions={false}/>
                       
        </div>
  )
}

export default InfantsNeedCarePage