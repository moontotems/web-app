import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../utils/cn'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { Input } from '../input'
import { Label } from '../label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Sheet, SheetContent } from '../sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'

export interface DataTableProps<TData> {
  data: TData[]
  isLoading?: boolean
  refetch?: () => void
  columns: ColumnDef<TData>[]
  showSelectColumn?: boolean
  searchableColumns?: Array<keyof TData & string>
  rowViewerContent?: React.ComponentType<{ item: TData }>
  pageSize?: number
  resetOnDataChange?: boolean
  pagination?: { pageIndex: number; pageSize: number }
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  search?: string
  onSearch?: (search: string) => void
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  defaultSort?: SortingState
  rowCount?: number
  emptyState?: {
    title: string
    subtitle: string
  }
  /** Rendered immediately after the search controls. */
  toolbarStart?: React.ReactNode
}

export function DataTable<TData>({
  data,
  isLoading,
  refetch,
  columns: userColumns,
  showSelectColumn = true,
  searchableColumns = [],
  rowViewerContent: CellViewerContent,
  pageSize = 100,
  pagination: externalPagination,
  onPaginationChange,
  search: externalSearch,
  onSearch,
  sorting: externalSorting,
  onSortingChange,
  defaultSort,
  rowCount,
  emptyState,
  toolbarStart,
}: DataTableProps<TData>) {
  // Create the select column
  const selectColumn: ColumnDef<TData> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }

  // Create the actions column
  const actionsColumn: ColumnDef<TData> = {
    id: 'actions',
    //header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              // We'll need to adapt this to be more generic
              onClick={() => {
                const itemId =
                  typeof item === 'object' && item !== null && 'id' in item ? String(item.id) : ''
                navigator.clipboard.writeText(itemId)
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

  // Combine the columns
  const allColumns = [...(showSelectColumn ? [selectColumn] : []), ...userColumns, actionsColumn]

  const [internalSorting, setInternalSorting] = React.useState<SortingState>(defaultSort ?? [])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchColumn, setSearchColumn] = React.useState<string>(
    searchableColumns.length > 0 ? String(searchableColumns[0]) : '',
  )
  const [internalPagination, setInternalPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSize,
  })

  // Use the external state if provided, otherwise use internal state
  const sorting = externalSorting !== undefined ? externalSorting : internalSorting
  const pagination = externalPagination !== undefined ? externalPagination : internalPagination

  // Handle state changes. react-table passes either the next value directly or
  // an updater function (current => next), so we need to resolve both forms
  // before forwarding to the controlled or internal setter.
  const handleSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
      if (onSortingChange) {
        onSortingChange(next)
      } else {
        setInternalSorting(next)
      }
    },
    [onSortingChange, sorting],
  )

  const handlePaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      const next =
        typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue
      if (onPaginationChange) {
        onPaginationChange(next)
      } else {
        setInternalPagination(next)
      }
    },
    [onPaginationChange, pagination],
  )

  // Handle search input change
  const handleSearchChange = React.useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value)
      } else if (searchColumn) {
        table.getColumn(searchColumn)?.setFilterValue(value)
      }
    },
    [onSearch, searchColumn],
  )

  // Validate that searchableColumns only contains valid column IDs
  React.useEffect(() => {
    const columnIds = userColumns.map((col) =>
      String(col.id || ('accessorKey' in col ? col.accessorKey : undefined)),
    )
    const invalidColumns = searchableColumns.filter((col) => !columnIds.includes(String(col)))

    if (invalidColumns.length > 0) {
      console.warn(
        `Warning: The following searchableColumns do not match any column IDs: ${invalidColumns.join(', ')}`,
      )
    }
  }, [searchableColumns, userColumns])

  const table = useReactTable({
    data,
    columns: allColumns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    manualPagination: !!onPaginationChange,
    manualSorting: !!onSortingChange,
    pageCount: rowCount !== undefined ? Math.ceil(rowCount / pagination.pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null)

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 py-4">
        {searchableColumns.length > 0 && (
          <div className="flex max-w-sm items-center gap-2">
            {searchableColumns.length > 1 && (
              <Select value={searchColumn} onValueChange={setSearchColumn}>
                <SelectTrigger
                  size="sm"
                  className="h-8 w-[180px] rounded-none border-[#393939] bg-[#262626] text-white shadow-none hover:bg-[#525252] focus-visible:border-[#1062FE] focus-visible:ring-[#1062FE]/50 data-[placeholder]:text-[#8d8d8d] [&_svg:not([class*='text-'])]:text-[#8d8d8d]"
                >
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent className="nft-theme dark rounded-none border-[#393939] bg-[#262626] text-white shadow-none">
                  {searchableColumns.map((column) => (
                    <SelectItem
                      key={String(column)}
                      value={String(column)}
                      className="rounded-none text-white focus:bg-[#525252] focus:text-white data-[highlighted]:bg-[#525252] data-[highlighted]:text-white [&_svg:not([class*='text-'])]:text-white"
                    >
                      {String(column)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="relative w-full">
              <Search className="absolute top-2 left-2 size-4 text-[#8d8d8d]" />
              <Input
                placeholder={`Search ${searchColumn}...`}
                value={
                  externalSearch !== undefined
                    ? externalSearch
                    : ((table.getColumn(searchColumn)?.getFilterValue() as string) ?? '')
                }
                onChange={(event) => {
                  const value = event.target.value
                  handleSearchChange(value)
                }}
                className="h-8 max-w-sm rounded-none border-[#393939] bg-[#262626] pl-8 text-white placeholder:text-[#8d8d8d] focus-visible:border-[#1062FE] focus-visible:ring-[#1062FE]/50"
              />
            </div>
          </div>
        )}
        {toolbarStart}
        {refetch && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            className="order-2 flex h-8 items-center gap-1 rounded-none border-[#393939] bg-[#262626] font-normal text-white hover:bg-[#525252] hover:text-white"
          >
            Refresh
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="order-2 h-8 gap-1 rounded-none border-[#393939] bg-[#262626] font-normal text-white hover:bg-[#525252] hover:text-white"
            >
              Columns <ChevronDown className="size-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="nft-theme dark max-h-72 rounded-none border-[#393939] bg-[#262626] text-white shadow-none"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="rounded-none capitalize text-white focus:bg-[#525252] focus:text-white data-[highlighted]:bg-[#525252] data-[highlighted]:text-white"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) return <TableHead key={header.id} />

                  const rendered = flexRender(header.column.columnDef.header, header.getContext())

                  // Auto-wrap string headers of sortable columns in a clickable
                  // affordance. Anything that already renders a custom node
                  // (e.g. a checkbox) is left untouched.
                  const canSort =
                    header.column.getCanSort() && typeof header.column.columnDef.header === 'string'

                  if (!canSort) {
                    return <TableHead key={header.id}>{rendered}</TableHead>
                  }

                  const sortState = header.column.getIsSorted()
                  const SortIcon =
                    sortState === 'asc' ? ArrowUp : sortState === 'desc' ? ArrowDown : ArrowUpDown

                  return (
                    <TableHead key={header.id}>
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="-mx-2 inline-flex h-8 items-center gap-1 rounded-md px-2 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        aria-label={`Sort by ${String(header.column.columnDef.header)}`}
                      >
                        {rendered}
                        <SortIcon
                          className={cn(
                            'h-3.5 w-3.5 shrink-0',
                            sortState ? 'opacity-100' : 'opacity-40',
                          )}
                        />
                      </button>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`row-${row.id}`}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('hover:bg-muted/40', CellViewerContent && 'cursor-pointer')}
                  onClick={CellViewerContent ? () => setSelectedRow(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={`cell-${cell.id}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                  {emptyState ? (
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <p className="text-lg font-medium">{emptyState.title}</p>
                      <p className="text-sm text-muted-foreground">{emptyState.subtitle}</p>
                    </div>
                  ) : (
                    'No results.'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[50, 100, 500, 1000, 5000].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add the RowDetailSheet outside the table */}
      {CellViewerContent && selectedRow && (
        <Sheet open={!!selectedRow} onOpenChange={(open) => !open && setSelectedRow(null)}>
          <SheetContent side="right" className="flex flex-col">
            <CellViewerContent item={selectedRow} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
