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
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@moontotems/ui'
import { Check, ChevronDown, X } from 'lucide-react'
import { forwardRef, useMemo } from 'react'

import {
  type BooleanFacetDef,
  type FacetDef,
  type MultiSelectFacetDef,
  type RangeFacetDef,
  TOTEM_FACETS,
  type TotemFilterState,
  buildFacetOptions,
  countActiveFilters,
  createEmptyTotemFilterState,
  getActiveChips,
  removeChip,
  setRangeValue,
  toggleBooleanValue,
  toggleMultiValue,
} from '~/lib/nft/totem-filters'
import type { TotemTableRow } from '~/lib/nft/use-token-data'

/** Portaled popovers escape `.nft-theme`; re-apply tokens + panel chrome. */
const POPOVER_CLASS =
  'nft-theme dark rounded-none border-[#393939] bg-[#262626] text-white shadow-none'

type TotemFilterBarProps = {
  rows: TotemTableRow[]
  filteredCount: number
  state: TotemFilterState
  onChange: (state: TotemFilterState) => void
}

const FacetTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & {
    label: string
    active: boolean
    count?: number
  }
>(function FacetTrigger({ label, active, count, className, ...props }, ref) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="outline"
      size="sm"
      className={`h-8 gap-1 rounded-none border-[#393939] font-normal ${
        active
          ? 'border-[#1062FE] bg-[#1062FE] text-white hover:bg-[#1062FE] hover:text-white hover:brightness-110'
          : 'bg-[#262626] text-white hover:bg-[#525252] hover:text-white'
      } ${className ?? ''}`}
      {...props}
    >
      <span>{label}</span>
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
    </Button>
  )
})

function MultiSelectFacet({
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
    <Popover>
      <PopoverTrigger asChild>
        <FacetTrigger label={facet.label} active={selected.length > 0} count={selected.length} />
      </PopoverTrigger>
      <PopoverContent align="start" className={`${POPOVER_CLASS} w-64 p-0`}>
        <Command className="rounded-none bg-[#262626] text-white">
          <CommandInput
            placeholder={`Search ${facet.label.toLowerCase()}…`}
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
      </PopoverContent>
    </Popover>
  )
}

function BooleanFacet({
  facet,
  selected,
  onToggle,
}: {
  facet: BooleanFacetDef
  selected: boolean[]
  onToggle: (value: boolean) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FacetTrigger label={facet.label} active={selected.length > 0} count={selected.length} />
      </PopoverTrigger>
      <PopoverContent align="start" className={`${POPOVER_CLASS} w-48 space-y-3 p-3`}>
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
      </PopoverContent>
    </Popover>
  )
}

function RangeFacet({
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
  const active = value?.min !== undefined || value?.max !== undefined ? 1 : 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FacetTrigger label={facet.label} active={active > 0} count={active || undefined} />
      </PopoverTrigger>
      <PopoverContent align="start" className={`${POPOVER_CLASS} w-56 space-y-3 p-3`}>
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
        {active > 0 ? (
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
      </PopoverContent>
    </Popover>
  )
}

function FacetControl({
  facet,
  options,
  state,
  onChange,
}: {
  facet: FacetDef
  options: ReturnType<typeof buildFacetOptions>
  state: TotemFilterState
  onChange: (state: TotemFilterState) => void
}) {
  if (facet.kind === 'multi') {
    return (
      <MultiSelectFacet
        facet={facet}
        options={options.multi[facet.id]}
        selected={state.multi[facet.id] ?? []}
        onToggle={(value) => onChange(toggleMultiValue(state, facet.id, value))}
      />
    )
  }
  if (facet.kind === 'boolean') {
    return (
      <BooleanFacet
        facet={facet}
        selected={state.boolean[facet.id] ?? []}
        onToggle={(value) => onChange(toggleBooleanValue(state, facet.id, value))}
      />
    )
  }
  return (
    <RangeFacet
      facet={facet}
      bounds={options.range[facet.id]}
      value={state.range[facet.id]}
      onChange={(range) => onChange(setRangeValue(state, facet.id, range))}
    />
  )
}

/** Inline facet controls for the /all list table. */
export function TotemFilterBar({ rows, filteredCount, state, onChange }: TotemFilterBarProps) {
  const options = useMemo(() => buildFacetOptions(rows), [rows])
  const chips = useMemo(() => getActiveChips(state), [state])
  const activeCount = countActiveFilters(state)

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {TOTEM_FACETS.map((facet) => (
          <FacetControl
            key={facet.id}
            facet={facet}
            options={options}
            state={state}
            onChange={onChange}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-[#8d8d8d]">
          {filteredCount.toLocaleString()} totem{filteredCount === 1 ? '' : 's'}
          {activeCount > 0 ? ` · ${activeCount} filter${activeCount === 1 ? '' : 's'}` : ''}
        </span>
        {activeCount > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 rounded-none px-2 text-white hover:bg-[#525252]"
            onClick={() => onChange(createEmptyTotemFilterState())}
          >
            Clear all
          </Button>
        ) : null}
      </div>

      {chips.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <Badge
              key={chip.removeKey}
              variant="secondary"
              className="gap-1 rounded-none border border-[#393939] bg-[#262626] pr-1 text-white"
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
        </div>
      ) : null}
    </div>
  )
}
