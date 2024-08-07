import { createContext, FC, useContext, useState, useEffect, ReactNode } from "react";
import { GridSortModel, GridDensity } from "@mui/x-data-grid";
import { GridInitialStateCommunity, GridStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

/*
1. Wyeksportowac tableState i uzywac go jako initialState tablicy
2. Przy inicjowaniu contextu pobierac dane z localStorage (nasz tableState, sa zapisane pojedyncze klucze) i ustawiac tableState na podstawie localStorage.
* nie gdzie widziec kodu, ktory bedzie wygladal tak:
const pagination = localStorage.getItem('pagination')
const filters = localStorage.getItem('filters')
setTableState({pagination, filters});
3. napisz funkcję (chyba ze taka istnieje) do porównywania 2 tablic (prorównasz dzięki pętli for)
4. jak poeównywać obiekty
*/

export type GridInitialState = GridInitialStateCommunity & {
    density: GridDensity
}

type TableContextProps = {
    sortModel: GridSortModel,
    setSortModel: (model: GridSortModel) => void,
    changeTableState: (value: GridInitialState) => void
    tableState: GridInitialState;

}

const LOCAL_STORAGE_KEYS = ['columns', 'sorting', 'filter', 'density'];

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
