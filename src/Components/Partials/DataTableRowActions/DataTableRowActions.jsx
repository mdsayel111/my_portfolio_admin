import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@antopolis/admin-component-library/dist/ui";
import { CLUseNavigate } from "@antopolis/admin-component-library/dist/helper";

export default function DataTableRowActions({ actions = [], setTarget, item }) {

  const navigate = CLUseNavigate();

  return (
    <div >
      <DropdownMenu onOpenChange={(open) => open && setTarget(item)}>
        <DropdownMenuTrigger asChild>

          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"

          >

            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {actions?.map((action, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  navigate(action.href);
                }}
              >
                <DropdownMenuItem asChild>
                  <a>{action?.label}</a>
                </DropdownMenuItem>
              </div>
              {action.separator && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
