import { FC, ReactNode, createContext, useContext, useState } from "react";
import { TestDialog } from "./TestDialog";

type TestContextProps = {
    open: boolean
    setOpen: (value: boolean) => void
    setTestConfig: (value: TestConfiguration) => void
}
export type TestConfiguration = {
    onSubmit: () => void | Promise<void>
    title: string;
    description: string;
    variant: 'delete' | 'confirmation'
}

const TestContext = createContext<TestContextProps | undefined>(undefined);

export const TestContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [testConfig, setTestConfig] = useState<TestConfiguration>({
        onSubmit: () => console.log(''),
        title: 'Default title',
        description: "default description",
        variant: 'confirmation'
    })
    const contextValues: TestContextProps = {
        open,
        setOpen,
        setTestConfig
    }

    return (
        <TestContext.Provider value={contextValues}>
            <TestDialog {...testConfig} onClose={() => setOpen(false)} open={open} />
            {children}
        </TestContext.Provider>
    )
}

export const useTestContext = () => {
    const context = useContext(TestContext)
    if (!context) {
        throw new Error('useDialogContext musi być używane wewnątrz DialogProvider');
    }
    return context;
}