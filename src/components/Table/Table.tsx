import { AgGridReact } from 'ag-grid-react';
import { TableThemes } from '@/themes/TableThemes';
import { ColDef } from 'ag-grid-community';
import { addTableActions } from '@/utils/addTableActions';
import { useNavigate } from 'react-router-dom';

interface TableProps<T> {
    rowData: T[] | undefined;
    columnDefs: ColDef<T>[];
    enhanceWithActions?: boolean;
    rowClick?: boolean;
};

export default function Table<T>({ rowData, columnDefs, enhanceWithActions = true, rowClick = false }: TableProps<T>) {
    const defaultColDef = {
        flex: 1,
    };
    const navigate = useNavigate();
    const enhancedColumnDefs = enhanceWithActions ? addTableActions(columnDefs) : columnDefs;

    return (
        <div  className='h-full w-full'>
            <AgGridReact
                rowData={rowData}
                columnDefs={enhancedColumnDefs}
                defaultColDef={defaultColDef}
                theme={TableThemes}
                onRowClicked={() => rowClick && navigate('/more-info')}
                suppressCellFocus={true}
            />
        </div>
    );
}
