import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/blocks/select/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="max-w-2xs">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="max-w-2xs">
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
