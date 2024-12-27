import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover.tsx";
import {Button} from "./ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "./ui/command.tsx";
import {cn} from "../lib/utils.ts";
import {useFindEvent} from "../services/event/hooks/use-find-event.ts";
import {EventEntity} from "../services/event/entities/EventEntity.ts";


export function SearchableEventSelect(){
const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const { data } = useFindEvent()
  const events = data?.data || []
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[80%] justify-between"
        >
          {value
            ? events.find((event: EventEntity) => event.name === value)?.name
            : "Select Events..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No events found.</CommandEmpty>
            <CommandGroup>
              {events.length > 0 && events.map((event: EventEntity) => (
                <CommandItem
                  key={event.id}
                  value={event.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {event.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === event.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}