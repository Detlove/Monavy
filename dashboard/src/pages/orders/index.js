import sumBy from 'lodash/sumBy'
import { useState, useEffect } from 'react'
// next
import NextLink from 'next/link'
import { useRouter } from 'next/router'
// @mui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel
} from '@mui/material'
// routes
import { PATH_DASHBOARD } from '@routes/paths'
// hooks
import useTabs from '@hooks/useTabs'
import useSettings from '@hooks/useSettings'
import useTable, { getComparator, emptyRows } from '@hooks/useTable'
// layouts
import Layout from '@layouts/index'
// components
import Page from '@components/Page'
import Label from '@components/Label'
import Iconify from '@components/Iconify'
import Scrollbar from '@components/Scrollbar'
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs'
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '@components/table'
// sections
import InvoiceAnalytic from '@sections/@dashboard/invoice/InvoiceAnalytic'
import { InvoiceTableRow, InvoiceTableToolbar } from '@sections/@dashboard/invoice/list'

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development'
]

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Cliente', align: 'left' },
  { id: 'product', label: 'Producto', align: 'left' },
  { id: 'createdAt', label: 'Fecha', align: 'left' },
  { id: 'price', label: 'Valor', align: 'left', width: 140 },
  { id: 'status', label: 'Estado', align: 'center' },
  { id: '' }
/*   { id: '' } */
]

// ----------------------------------------------------------------------

InvoiceList.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function InvoiceList () {
  const theme = useTheme()

  const { themeStretch } = useSettings()

  const { push } = useRouter()

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage
  } = useTable({ defaultOrderBy: 'createdAt', defaultRowsPerPage: 10 })

  const [tableData, setTableData] = useState([])

  const [filterName, setFilterName] = useState('')

  const [filterService, setFilterService] = useState('all')

  const [filterStartDate, setFilterStartDate] = useState(null)

  const [filterEndDate, setFilterEndDate] = useState(null)

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all')

  const handleFilterName = (filterName) => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleFilterService = (event) => {
    setFilterService(event.target.value)
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id)
    setSelected([])
    setTableData(deleteRow)
  }

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id))
    setSelected([])
    setTableData(deleteRows)
  }

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.invoice.edit(id))
  }

  const handleViewRow = (id) => {
    push(PATH_DASHBOARD.invoice.view(id))
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate
  })

  const denseHeight = dense ? 56 : 76

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate)

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    )

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100

  const TABS = [
    { value: 'all', label: 'Total', color: 'info', count: tableData.length },
    { value: 'delivered', label: 'Entregado', color: 'success', count: getLengthByStatus('delivered') },
    { value: 'onway', label: 'En tránsito', color: 'warning', count: getLengthByStatus('onway') },
    { value: 'waiting', label: 'En espera', color: 'error', count: getLengthByStatus('waiting') },
    { value: 'draft', label: 'Borrador', color: 'default', count: getLengthByStatus('draft') },
    { value: 'canceled', label: 'Cancelado', color: 'default', count: getLengthByStatus('canceled') }
  ]

  /* Test GET orders */

  useEffect(async () => {
    const orders = await window.fetch('http://localhost:3001/orders').then(r => r.json())
    setTableData(orders)
  }, [])

  return (
    <Page title='Lista de pedidos'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Lista de pedidos'
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Pedidos' }
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.invoice.new} passHref>
              <Button variant='contained' startIcon={<Iconify icon='eva:plus-fill' />}>
                Nuevo pedido
              </Button>
            </NextLink>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction='row'
              divider={<Divider orientation='vertical' flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title='Total'
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalPrice')}
                icon='ic:round-receipt'
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title='Entregado'
                total={getLengthByStatus('delivered')}
                percent={getPercentByStatus('delivered')}
                price={getTotalPriceByStatus('delivered')}
                icon='eva:checkmark-circle-2-fill'
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title='En tránsito'
                total={getLengthByStatus('onway')}
                percent={getPercentByStatus('onway')}
                price={getTotalPriceByStatus('onway')}
                icon='material-symbols:local-shipping'
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title='En espera'
                total={getLengthByStatus('waiting')}
                percent={getPercentByStatus('waiting')}
                price={getTotalPriceByStatus('waiting')}
                icon='fa6-solid:truck-ramp-box'
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title='Borrador'
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon='eva:file-fill'
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant='scrollable'
            scrollButtons='auto'
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue)
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue)
            }}
            optionsService={SERVICE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={dataFiltered.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )}
                  actions={
                    <Stack spacing={1} direction='row'>
                      <Tooltip title='Sent'>
                        <IconButton color='primary'>
                          <Iconify icon='ic:round-send' />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title='Download'>
                        <IconButton color='primary'>
                          <Iconify icon='eva:download-outline' />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title='Print'>
                        <IconButton color='primary'>
                          <Iconify icon='eva:printer-fill' />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title='Delete'>
                        <IconButton color='primary' onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon='eva:trash-2-outline' />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )}
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label='Dense'
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  )
}

// ----------------------------------------------------------------------

function applySortFilter ({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  tableData = stabilizedThis.map((el) => el[0])

  if (filterName) {
    tableData = tableData.filter(
      (item) => {
        return item.invoiceNumber.toString().indexOf(filterName.toLowerCase()) !== -1 ||
        item.buyer.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      }
    )
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus)
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService))
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) => {
        const createdAt = new Date(item.createdAt)
        return createdAt.getTime() >= filterStartDate.getTime() && createdAt.getTime() <= filterEndDate.getTime()
      }
    )
  }

  return tableData
}
