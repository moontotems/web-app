import {
  Badge,
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@moontotems/ui'
import { Check, ChevronDown, ListFilter, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import {
  type BooleanFacetDef,
  type FacetDef,
  type FacetOptions,
  type MultiSelectFacetDef,
  type RangeFacetDef,
  type TotemFilterState,
  buildFacetOptions,
  countActiveFilters,
  createEmptyTotemFilterState,
  facetIsActive,
  getActiveChips,
  getFacetsByGroup,
  removeChip,
  setRangeValue,
  toggleBooleanValue,
  toggleMultiValue,
} from '~/lib/nft/totem-filters'
import type { TotemTableRow } from '~/lib/nft/use-token-data'

/** Portaled surfaces escape `.nft-theme`; re-apply tokens + panel chrome. */
const POPOVER_CLASS =
  'nft-theme dark rounded-none border-[#393939] bg-[#262626] text-white shadow-none'

type TotemFilterBarProps = {
  rows: TotemTableRow[]
  filteredCount: number
  state: TotemFilterState
  onChange: (state: TotemFilterState) => void
}

type FacetControlProps = {
  facet: FacetDef
  options: FacetOptions
  state: TotemFilterState
  onChange: (state: TotemFilterState) => void
}

const FacetTrigger = function FacetTrigger({
  ref,
  label,
  active,
  count,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
  label: string
  active: boolean
  count?: number
} & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="outline"
      size="sm"
      className={`h-8 w-full justify-between gap-1 rounded-none border-[#393939] font-normal ${
        active
          ? 'border-[#1062FE] bg-[#1062FE] text-white hover:bg-[#1062FE] hover:text-white hover:brightness-110'
          : 'bg-black text-white hover:bg-[#525252] hover:text-white'
      } ${className ?? ''}`}
      {...props}
    >
      <span className="truncate">{label}</span>
      <span className="flex shrink-0 items-center gap-1">
        {count !== undefined && count > 0 ? (
          <Badge
            variant="outline"
            className={`h-5 min-w-5 rounded-none px-1 ${
              active
                ? 'border-white/40 bg-transparent text-white'
                : 'border-[#6f6f6f] bg-transparent text-[#c6c6c6]'
            }`}
          >
            {count}
          </Badge>
        ) : null}
        <ChevronDown className="size-3.5 opacity-60" />
      </span>
    </Button>
  )
}

function MultiSelectFacetPanel({
  facet,
  options,
  selected,
  onToggle,
}: {
  facet: MultiSelectFacetDef
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  const selectedSet = useMemo(() => new Set(selected), [selected])

  return (
    <Command className="rounded-none bg-[#262626] text-white">
      <CommandInput
        placeholder={`Search ${facet.label.toLowerCase()}...`}
        className="placeholder:text-[#8d8d8d]"
      />
      <CommandList>
        <CommandEmpty className="text-[#8d8d8d]">No options.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedSet.has(option)
            return (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => onToggle(option)}
                className="gap-2 rounded-none text-white aria-selected:bg-[#525252] aria-selected:text-white"
              >
                <span
                  className={`flex size-4 items-center justify-center border ${
                    isSelected ? 'border-[#1062FE] bg-[#1062FE] text-white' : 'border-[#6f6f6f]'
                  }`}
                >
                  {isSelected ? <Check className="size-3" /> : null}
                </span>
                <span className="truncate">{option}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function BooleanFacetPanel({
  facet,
  selected,
  onToggle,
}: {
  facet: BooleanFacetDef
  selected: boolean[]
  onToggle: (value: boolean) => void
}) {
  return (
    <div className="space-y-3 p-3">
      {[
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ].map(({ label, value }) => {
        const checked = selected.includes(value)
        const id = `${facet.id}-${label}`
        return (
          <div key={label} className="flex items-center gap-2 text-sm text-white">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={() => onToggle(value)}
              className="rounded-none border-[#6f6f6f] data-[state=checked]:border-[#1062FE] data-[state=checked]:bg-[#1062FE]"
            />
            <label htmlFor={id} className="cursor-pointer">
              {label}
            </label>
          </div>
        )
      })}
    </div>
  )
}

function RangeFacetPanel({
  facet,
  bounds,
  value,
  onChange,
}: {
  facet: RangeFacetDef
  bounds: { min: number; max: number }
  value: { min?: number; max?: number } | undefined
  onChange: (next: { min?: number; max?: number }) => void
}) {
  const active = value?.min !== undefined || value?.max !== undefined

  return (
    <div className="space-y-3 p-3">
      <p className="text-xs text-[#8d8d8d]">
        Range {bounds.min} – {bounds.max}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs text-[#c6c6c6]" htmlFor={`${facet.id}-min`}>
            Min
          </label>
          <Input
            id={`${facet.id}-min`}
            type="number"
            inputMode="numeric"
            placeholder={String(bounds.min)}
            value={value?.min ?? ''}
            onChange={(event) => {
              const raw = event.target.value
              onChange({
                ...value,
                min: raw === '' ? undefined : Number(raw),
              })
            }}
            className="h-8 rounded-none border-[#1062FE] bg-black text-white placeholder:text-[#8d8d8d]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[#c6c6c6]" htmlFor={`${facet.id}-max`}>
            Max
          </label>
          <Input
            id={`${facet.id}-max`}
            type="number"
            inputMode="numeric"
            placeholder={String(bounds.max)}
            value={value?.max ?? ''}
            onChange={(event) => {
              const raw = event.target.value
              onChange({
                ...value,
                max: raw === '' ? undefined : Number(raw),
              })
            }}
            className="h-8 rounded-none border-[#1062FE] bg-black text-white placeholder:text-[#8d8d8d]"
          />
        </div>
      </div>
      {active ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 rounded-none px-2 text-white hover:bg-[#525252]"
          onClick={() => onChange({})}
        >
          Clear
        </Button>
      ) : null}
    </div>
  )
}

function FacetDropdownContent({ facet, options, state, onChange }: FacetControlProps) {
  if (facet.kind === 'multi') {
    return (
      <MultiSelectFacetPanel
        facet={facet}
        options={options.multi[facet.id]}
        selected={state.multi[facet.id] ?? []}
        onToggle={(value) => onChange(toggleMultiValue(state, facet.id, value))}
      />
    )
  }
  if (facet.kind === 'boolean') {
    return (
      <BooleanFacetPanel
        facet={facet}
        selected={state.boolean[facet.id] ?? []}
        onToggle={(value) => onChange(toggleBooleanValue(state, facet.id, value))}
      />
    )
  }
  return (
    <RangeFacetPanel
      facet={facet}
      bounds={options.range[facet.id]}
      value={state.range[facet.id]}
      onChange={(range) => onChange(setRangeValue(state, facet.id, range))}
    />
  )
}

function facetActiveCount(state: TotemFilterState, facet: FacetDef): number {
  if (facet.kind === 'multi') return state.multi[facet.id]?.length ?? 0
  if (facet.kind === 'boolean') return state.boolean[facet.id]?.length ?? 0
  return facetIsActive(state, facet) ? 1 : 0
}

function FacetControl({ facet, options, state, onChange }: FacetControlProps) {
  const active = facetIsActive(state, facet)
  const count = facetActiveCount(state, facet)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FacetTrigger label={facet.label} active={active} count={count || undefined} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`${POPOVER_CLASS} ${facet.kind === 'multi' ? 'w-64 p-0' : facet.kind === 'boolean' ? 'w-48 p-0' : 'w-56 p-0'}`}
      >
        <FacetDropdownContent facet={facet} options={options} state={state} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

/** Tiny header filter icon + dropdown for a single TotemTable column facet. */
export function ColumnFacetFilter({ facet, options, state, onChange }: FacetControlProps) {
  const active = facetIsActive(state, facet)
  const count = facetActiveCount(state, facet)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex size-5 shrink-0 items-center justify-center rounded-none ${
            active
              ? 'bg-[#1062FE] text-white hover:brightness-110'
              : 'text-[#8d8d8d] hover:bg-[#393939] hover:text-white'
          }`}
          aria-label={`Filter ${facet.label}`}
          title={`Filter ${facet.label}`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <ListFilter className="size-3" />
          {count > 0 ? <span className="sr-only">{count} active</span> : null}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`${POPOVER_CLASS} ${facet.kind === 'multi' ? 'w-64 p-0' : facet.kind === 'boolean' ? 'w-48 p-0' : 'w-56 p-0'}`}
        onClick={(event) => event.stopPropagation()}
      >
        <FacetDropdownContent facet={facet} options={options} state={state} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

/** Compact filter controls for the DataTable toolbar (next to search). */
export function TotemFilterBar({ rows, filteredCount, state, onChange }: TotemFilterBarProps) {
  const [open, setOpen] = useState(false)
  const options = useMemo(() => buildFacetOptions(rows), [rows])
  const chips = useMemo(() => getActiveChips(state), [state])
  const groups = useMemo(() => getFacetsByGroup(), [])
  const activeCount = countActiveFilters(state)

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`order-1 h-8 gap-2 rounded-none border-[#393939] font-normal ${
              activeCount > 0
                ? 'border-[#1062FE] bg-[#1062FE] text-white hover:bg-[#1062FE] hover:text-white hover:brightness-110'
                : 'bg-[#262626] text-white hover:bg-[#525252] hover:text-white'
            }`}
          >
            <ListFilter className="size-3.5" />
            Filters
            {activeCount > 0 ? (
              <Badge
                variant="outline"
                className="h-5 min-w-5 rounded-none border-white/40 bg-transparent px-1 text-white"
              >
                {activeCount}
              </Badge>
            ) : null}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="nft-theme dark !inset-y-0 !right-0 !left-auto !h-full !max-h-none !w-full !max-w-[360px] rounded-none border-0 !border-l !border-[#393939] bg-[#262626] text-white data-[vaul-drawer-direction=right]:!w-full data-[vaul-drawer-direction=right]:!max-w-[360px] data-[vaul-drawer-direction=right]:sm:!max-w-[360px]">
          <DrawerHeader className="border-b border-[#393939] text-left">
            <DrawerTitle className="text-white">Filters</DrawerTitle>
            <DrawerDescription className="text-[#8d8d8d]">
              Narrow the totem list by trait, material, or score.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {groups.map((group) => (
              <section key={group.id}>
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-[#c6c6c6] uppercase">
                  {group.label}
                </h3>
                <div className="space-y-2">
                  {group.facets.map((facet) => (
                    <FacetControl
                      key={facet.id}
                      facet={facet}
                      options={options}
                      state={state}
                      onChange={onChange}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <DrawerFooter className="flex-row gap-2 border-t border-[#393939]">
            {activeCount > 0 ? (
              <Button
                type="button"
                variant="ghost"
                className="rounded-none text-white hover:bg-[#525252]"
                onClick={() => onChange(createEmptyTotemFilterState())}
              >
                Clear all
              </Button>
            ) : null}
            <DrawerClose asChild>
              <Button
                type="button"
                className="ml-auto rounded-none bg-[#1062FE] text-white hover:bg-[#1062FE] hover:brightness-110"
              >
                Done
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <span className="order-1 text-sm text-[#8d8d8d]">
        {filteredCount.toLocaleString()} totem{filteredCount === 1 ? '' : 's'}
        {activeCount > 0 ? ` · ${activeCount} filter${activeCount === 1 ? '' : 's'}` : ''}
      </span>

      {chips.map((chip) => (
        <Badge
          key={chip.removeKey}
          variant="secondary"
          className="order-1 h-8 gap-1 rounded-none border border-[#393939] bg-[#262626] pr-1 text-white"
        >
          <span className="text-[#8d8d8d]">{chip.label}:</span>
          <span>{chip.valueLabel}</span>
          <button
            type="button"
            className="rounded-none p-0.5 hover:bg-[#525252]"
            aria-label={`Remove ${chip.label} ${chip.valueLabel}`}
            onClick={() => onChange(removeChip(state, chip.removeKey))}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}

      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="order-1 h-8 rounded-none px-2 text-white hover:bg-[#525252]"
          onClick={() => onChange(createEmptyTotemFilterState())}
        >
          Clear all
        </Button>
      ) : null}
    </>
  )
}
