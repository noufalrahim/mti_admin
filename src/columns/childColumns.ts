import { AgeGroupType } from "@/types/AgeGroupType";
import { ChildType } from "@/types/ChildType";
import { ColumnType } from "@/types/ColumnType";

export const childColumns: ColumnType<ChildType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "name", headerName: "Name",
    },
    {
        field: "dateOfBirth", headerName: "Date Of Birth"
    },
    {
        field: "premature", headerName: "Is Premature"
    },
    {
        field: "weekOfPrematurity", headerName: "Week Of Prematurity"
    }    
];