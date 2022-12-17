import React, { Children } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
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
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={s.items}
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
