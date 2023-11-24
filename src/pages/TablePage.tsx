import { BasicContainer } from "components/containers/Containers";
import { FC, useEffect, useState } from "react";
import Table from "components/table/Table";
import { MY_TASKS } from "components/db/Tasks";
import { ListItem } from "types/ListTypes";


const TablePage:FC = () => {
    const [list, setList] = useState<ListItem[]>([]); // napisać typ, bo any nie uzywamy

    useEffect(() => {
        setList(MY_TASKS)
    }, [])
    // przekazac liste jako props do table
    return (
        <BasicContainer>
            <Table list={list}/>
        </BasicContainer>
    )
}
export default TablePage;