import { BasicContainer } from "components/containers/Containers";
import Table from "components/table/Table";
import { useEffect, useState } from "react";


type ListItem = {
    title: string;
    description: string;
    status: string;
    action: string;
}


const TablePage = () => {
    const [list, setList] = useState<ListItem[]>([]); // napisać typ, bo any nie uzywamy

    useEffect(() => {
        setList([
            {title: 'Title', description: 'Description', status: 'Completed', action: 'Action button'},
            {title: 'Title2', description: 'Description2', status: 'Completed2', action: 'Action button2'},
          ])
    }, [])
    // przekazac liste jako props do table
    return (
        <BasicContainer>
            <Table list={list}/>
        </BasicContainer>
    )
}
export default TablePage;