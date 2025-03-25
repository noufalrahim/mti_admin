import { ColumnType } from "@/types/ColumnType";
import { Edit3, Trash2 } from "lucide-react";

/**
 * Adds Edit and Delete actions to a table's column definitions.
 * @param columns The original column definitions
 * @returns New column definitions with action buttons
 */
export function addTableActions<T>(columns: ColumnType<T>): ColumnType<T> {
    return [
        ...columns,
        {
            colId: "actions",
            headerName: "Actions",
            cellRenderer: ({ data }: { data: T }) => (
                <div className="flex gap-5 items-center justify-center h-full">
                    <Edit3 onClick={() => handleEdit<T>(data)} className="text-primary-main cursor-pointer"/>
                    <Trash2 onClick={() => handleDelete<T>(data)} className="text-red-500 cursor-pointer"/>
                </div>
            ),
            sortable: false,
            filter: false,
        },
    ];
}

const handleEdit = <T,>(data: T) => alert(`Editing: ${JSON.stringify(data)}`);
const handleDelete = <T,>(data: T) => alert(`Deleting: ${JSON.stringify(data)}`);
