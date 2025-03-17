import { AgeGroupType } from "@/types/AgeGroupType";
import { CategoryType } from "@/types/CategoryType";
import { ColumnType } from "@/types/ColumnType";

export const CategoryColumns: ColumnType<CategoryType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "name", headerName: "Name",
    },
    
];