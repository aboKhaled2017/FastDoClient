import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@material-ui/lab/Autocomplete"

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    disbaled?:boolean
}
export type OnAutoCompleteSelectChange=(
    event: React.ChangeEvent<{}>,
    value: { name: string}[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<{name: string;}> | undefined
) => void