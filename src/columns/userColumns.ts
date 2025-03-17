import { AgeGroupType } from "@/types/AgeGroupType";
import { ChildType } from "@/types/ChildType";
import { ColumnType } from "@/types/ColumnType";
import { UserType } from "@/types/UserType";

export const userColumns: ColumnType<UserType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "phone", headerName: "Phone Number",
    }   
];