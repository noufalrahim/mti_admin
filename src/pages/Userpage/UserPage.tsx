import { userColumns } from '@/columns/userColumns'
import { AppBar } from '@/components/AppBar'
import { DialogModal } from '@/components/DialogModal'
import Table from '@/components/Table/Table'
import { Button } from '@/components/ui/button'
import { useFetchData } from '@/hooks/useFetchData'
import { UserType } from '@/types/UserType'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { data } from 'react-router-dom'
import UserForm from './form'


function UserPage() {
  const { data, isLoading, error, refetch } = useFetchData<UserType[]>("users", "/users");
  console.log(data);
    const [open,setOpen]=useState<boolean>(false);
  return (
        <div style={{ height: "100vh", width: "100%" }}>
              <AppBar title='Users' description='List of all registered users' >

             
               <Button className="btn btn-primary" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add Users
        </Button>
          </AppBar>
        <Table<UserType> columnDefs={userColumns} rowData={data} />
          
             <DialogModal open={open} setOpen={setOpen} title="Users" description="Add a new Users">
                         <UserForm refetch={refetch} setOpen={setOpen}/>     
                            </DialogModal>
            
            
            
            </div>

  )
}

export default UserPage