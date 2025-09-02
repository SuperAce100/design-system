"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";
import { Input } from "@/registry/new-york/blocks/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/blocks/select/select";
import { Textarea } from "@/registry/new-york/blocks/textarea/textarea";
import { Button } from "@/registry/new-york/blocks/button/button";

export default function TasksExample() {
  return (
    <section className="px-1">
      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="text-xl font-medium tracking-tight">Quick Form</h3>
            <p className="text-sm text-muted-foreground">Inputs built from the primitives.</p>
          </div>
          <Button size="sm" variant="outline">
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input placeholder="Full name" />
          <Input placeholder="Email" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Notes" className="min-h-24" />
        </div>
        <div className="">
          <Button>Save</Button>
        </div>
      </div>
    </section>
  );
}
