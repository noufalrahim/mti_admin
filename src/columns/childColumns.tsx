import { Badge } from "@/components/ui/badge";
import { severityData } from "@/constants";
import { cn } from "@/lib/utils";
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
    },
    {
        field: "severity",
        headerName: "Severity",
        cellRenderer: (params: { value: number; }) => {
            const severity = params.value;
            const sev = severityData[severity - 1];
            return (
                <Badge className={cn(sev?.bg, sev?.color, 'px-5 rounded-full text-white')}>
                    {sev?.label}
                </Badge>
            );
        }
    }
];