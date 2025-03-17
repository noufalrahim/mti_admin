import { AgeGroupType } from "@/types/AgeGroupType";
import { ColumnType } from "@/types/ColumnType";

export const ageGroupColumns: ColumnType<AgeGroupType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "startAge", headerName: "Start Age",
    },
    {
        field: "endAge", headerName: "End Age"
    }
];