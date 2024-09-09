import { createContext, FC, useContext, useState, useEffect, ReactNode } from "react";
import { GridSortModel, GridDensity } from "@mui/x-data-grid";
import { GridInitialStateCommunity, GridStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

export type GridInitialState = GridInitialStateCommunity & {
    density: GridDensity
}

type TableContextProps = {
    sortModel: GridSortModel,
    setSortModel: (model: GridSortModel) => void,
    changeTableState: (value: GridInitialState) => void
    tableState: GridInitialState;

}

const LOCAL_STORAGE_KEYS = ['sorting', 'filter', 'density'];

type TableStateKeys = keyof GridInitialStateCommunity | 'density'

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'status', sort: 'desc' }]);
    const [tableState, setTableState] = useState<GridInitialState>({ density: 'standard' })


    const changeTableState = (value: GridInitialState) => {
        setTableState((prev) => ({
            ...prev, ...value
        }))
        Object.keys(value).forEach((val) =>
            localStorage.setItem(val, JSON.stringify(value[val as TableStateKeys]))
        )
    }

    useEffect(() => {
        const initialState: Partial<GridInitialState> = {};
        LOCAL_STORAGE_KEYS.forEach(key => {
            const savedValue = localStorage.getItem(key);
            if (savedValue) {
                initialState[key as keyof GridInitialState] = JSON.parse(savedValue);
            }
        });

        if (Object.keys(initialState).length > 0) {
            setTableState(initialState as GridInitialState);
        }
    }, []);


    return (
        <TableContext.Provider value={{ sortModel, setSortModel, changeTableState, tableState }}>
            {children}
        </TableContext.Provider>
    );
}

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('TableContext must be used within a TableProvider');
    }
    return context;
}
