import PropTypes from 'prop-types'
// form
import { useFormContext } from 'react-hook-form'
// @mui
import { useTheme } from '@mui/material/styles'
import { Stack, Divider, Typography, Button, Box, TableCell } from '@mui/material'
// hooks
import useResponsive from '@hooks/useResponsive'
import useToggle from '@hooks/useToggle'
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '@mock/index'
// components
import Label from '@components/Label'
import Iconify from '@components/Iconify'
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog'

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress () {
  const {
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()

  const upMd = useResponsive('up', 'md')

  const values = watch()

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle()

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle()

  const { buyer, status } = values

  console.log(values.buyer)

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='subtitle2' sx={{ color: 'text.disabled' }}>
            Pedido para:
          </Typography>

          <Button size='small' startIcon={<Iconify icon='eva:edit-fill' />} onClick={onOpenFrom}>
            Editar
          </Button>

          {/* <InvoiceAddressListDialog
            open={openFrom}
            onClose={onCloseFrom}
            selected={(selectedId) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          /> */}
        </Stack>

        <AddressInfo buyer={buyer} status={status} />

      </Stack>

      <Stack sx={{ width: 1 }}>
        {/* <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography variant='h6' sx={{ color: 'text.disabled' }}>
            To:
          </Typography>

          <Button
            size='small'
            startIcon={<Iconify icon={invoiceTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={onOpenTo}
          >
            {invoiceTo ? 'Change' : 'Add'}
          </Button>

          <InvoiceAddressListDialog
            open={openTo}
            onClose={onCloseTo}
            selected={(selectedId) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            addressOptions={_invoiceAddressTo}
          />
        </Stack>

        {invoiceTo
          ? (
            <AddressInfo name={invoiceTo.name} address={invoiceTo.address} phone={invoiceTo.phone} />
            )
          : (
            <Typography typography='caption' sx={{ color: 'error.main' }}>
              {errors.invoiceTo ? errors.invoiceTo.message : null}
            </Typography>
            )} */}
      </Stack>
    </Stack>
  )
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  status: PropTypes.string,
  buyer: PropTypes.object
}

function AddressInfo ({ status, buyer: { name, phone, state, city, street } }) {
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5'>{name}</Typography>
      <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
        {street} · {city?.toUpperCase()} · {state?.toUpperCase()}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1 }}>
        <Box fontWeight='fontWeightBold' display='inline'>Teléfono:</Box> {phone}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1 }}>
        <Box fontWeight='fontWeightBold' display='inline'>Estado: </Box>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'delivered' && 'success') ||
            (status === 'onway' && 'warning') ||
            (status === 'waiting' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {(status === 'delivered' && 'Entregado') ||
            (status === 'onway' && 'En camino') ||
            (status === 'waiting' && 'En espera') ||
            (status === 'canceled' && 'Cancelado') ||
            'Borrador'}
        </Label>

      </Typography>

    </>
  )
}
