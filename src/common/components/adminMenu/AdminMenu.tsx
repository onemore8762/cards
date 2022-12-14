import * as React from 'react'
import { Children } from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

import s from './AdminMenu.module.css'
export const AdminMenu = ({ children }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickNav = (children: string) => {
    navigate(`/${children[0].toLowerCase()}${children.slice(1)}`)
  }

  return (
    <div className={s.menu}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Admin-menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Children.map(children, (child, index) => {
          return (
            <MenuItem onClick={() => handleClickNav(child.props.children)} key={index}>
              {child.props.children}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
