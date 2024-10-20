import { Stack, Skeleton } from "@mui/material"

export const TableSkeleton = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rounded" width={'100%'} height={60} />
            <Skeleton variant="rounded" width={'100%'} height={60} />
            <Skeleton variant="rounded" width={'100%'} height={60} />
            <Skeleton variant="rounded" width={'100%'} height={60} />
            <Skeleton variant="rounded" width={'100%'} height={60} />
        </Stack>

    )
}