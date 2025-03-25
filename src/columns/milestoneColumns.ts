import { AgeGroupType } from "@/types/AgeGroupType";
import { CategoryType } from "@/types/CategoryType";
import { ColumnType } from "@/types/ColumnType";
import { MilestoneType } from "@/types/MilestoneType";

export const MilestoneColumns: ColumnType<MilestoneType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "question", headerName: "question",
        
    },
    {
        field: "milestone", headerName: "milestone",
    }
    
];