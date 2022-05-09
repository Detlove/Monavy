import PropTypes from 'prop-types'
import { useState } from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { Checkbox, TableRow, TableCell, Typography, Link, MenuItem, Box } from '@mui/material'
// utils
import { fDateTime } from '../../../../utils/formatTime'
import createAvatar from '@utils/createAvatar'
import { fCurrency } from '@utils/formatNumber'
// components
import Label from '@components/Label'
import Avatar from '@components/Avatar'
import Iconify from '@components/Iconify'
import { TableMoreMenu } from '@components/table'

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func
}

export default function InvoiceTableRow ({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme()

  const { invoiceNumber, createdAt, status, buyer, totalPrice, cart } = row

  const [openMenu, setOpenMenuActions] = useState(null)

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell padding='checkbox'>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ maxWidth: 200 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={buyer.name} color={createAvatar(buyer.name).color} sx={{ mr: 2 }}>
            {createAvatar(buyer.name).name}
          </Avatar>

          <Box sx={{ maxWidth: 0.75 }}>
            <Typography variant='subtitle2' noWrap>
              {buyer.name}
            </Typography>

            <Link noWrap variant='body2' onClick={onEditRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
              {`#${invoiceNumber}`}
            </Link>
          </Box>
        </Box>
      </TableCell>

      <TableCell align='left' sx={{ maxWidth: 150 }}>
        <Typography variant='subtitle2' noWrap>
          {cart.length > 1 ? 'Mixto' : cart[0].product.title}
        </Typography>
      </TableCell>
      <TableCell align='left'>{fDateTime(createdAt)}</TableCell>

      <TableCell align='left'>{fCurrency(totalPrice)}</TableCell>

      <TableCell align='center'>
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
            (status === 'onway' && 'En tránsito') ||
            (status === 'waiting' && 'En espera') ||
            (status === 'canceled' && 'Cancelado') ||
            'Borrador'}
        </Label>
      </TableCell>

      <TableCell align='center'>

        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow()
                  handleCloseMenu()
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon='eva:trash-2-outline' />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon='eva:eye-fill' />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon='eva:edit-fill' />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
