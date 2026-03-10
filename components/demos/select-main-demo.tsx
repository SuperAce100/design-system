import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/blocks/select/select";

export default function SelectMainDemo() {
  return (
    <Select defaultValue="pro">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="team">Team</SelectItem>
      </SelectContent>
    </Select>
  );
}
