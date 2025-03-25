import { Badge } from "@/components/ui/badge";
import { severityData } from "@/constants";
import { cn } from "@/lib/utils";
import { ColumnType } from "@/types/ColumnType";
import { QuestionType } from "@/types/QuestionType";

export const questionColumns: ColumnType<QuestionType> = [
    {
        field: "sno",
        headerName: "SNO",
        sortable: false,
        valueGetter: (params) => params.node && params.node.rowIndex !== null ? params.node.rowIndex + 1 : "",
    },
    {
        field: "questionEnglish",
        headerName: "Question English",
    },
    {
        field: "questionMalayalam",
        headerName: "Question Malayalam"
    },
    {
        field: "ageGroup",
        headerName: "Age group",
        valueFormatter: (params) => `${params.data?.ageGroup?.startAge} Months - ${params.data?.ageGroup?.endAge} Months`
    },
    {
        field: "category.name",
        headerName: "Category",
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