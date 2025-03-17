import { AgGridReact } from 'ag-grid-react';
import { TableThemes } from '@/themes/TableThemes';
import { ColDef } from 'ag-grid-community';
import { addTableActions } from '@/utils/addTableActions';

interface TableProps<T> {
    rowData: T[] | undefined;
    columnDefs: ColDef<T>[];
    enhanceWithActions?: boolean;
};

export default function Table<T>({ rowData, columnDefs, enhanceWithActions = true }: TableProps<T>) {
    const defaultColDef = {
        flex: 1,
    };
    const enhancedColumnDefs = enhanceWithActions ? addTableActions(columnDefs) : columnDefs;

    return (
        <div  className='h-full w-full'>
            <AgGridReact
                rowData={rowData}
                columnDefs={enhancedColumnDefs}
                defaultColDef={defaultColDef}
                theme={TableThemes}
                suppressCellFocus={true}
            />
        </div>
    );
}
