import { createContext, FC, useContext, useState, ReactNode } from "react";
import { GridSortModel } from "@mui/x-data-grid";

type TableContextProps = {
    sortModel: GridSortModel,
    setSortModel: (model: GridSortModel) => void,
    density: 'compact' | 'standard' | 'comfortable';
    setDensity: (density: 'compact' | 'standard' | 'comfortable') => void;
}


const TableContext = createContext<TableContextProps | undefined>(undefined)

export const TableProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'status', sort: 'desc' }])
    const [density, setDensity] = useState<'compact' | 'standard' | 'comfortable'>('standard');


    return (
        <TableContext.Provider value={{ sortModel, setSortModel, density, setDensity }}>
            {children}
        </TableContext.Provider>
    );
}




export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('TableContext must be used within a TableProvider')
    }
    return context
}