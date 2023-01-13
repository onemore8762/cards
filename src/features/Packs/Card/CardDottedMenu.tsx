import React, { useState } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { DeleteBasicModal } from '../../../common/components/Modals/DeleteBasicModal/DeleteBasicModal'
import { PackBasicModal } from '../../../common/components/Modals/PackBasicModal/PackBasicModal'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import {
  selectCardPackId,
  selectCardsList,
  selectCardsPackCover,
  selectCardsPackName,
} from './cardSelectors'

type CardDottedMenuPropsType = {
  updatePackHandler: (
    packs_id: string,
    inputValue: string,
    packCoverState: string,
    privateCheckbox: boolean
  ) => void
  deletePackHandler: (packs_id: string) => void
  goToLearnHandler: () => void
}

export const CardDottedMenu: React.FC<CardDottedMenuPropsType> = ({
  updatePackHandler,
  deletePackHandler,
  goToLearnHandler,
}) => {
  const packName = useAppSelector(selectCardsPackName)
  const cardPackId = useAppSelector(selectCardPackId)
  const cardList = useAppSelector(selectCardsList)
  const packCover = useAppSelector(selectCardsPackCover)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const MoreVertIconStyle = {
    border: '1px solid black',
    borderRadius: '50px',
    color: 'black',
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <MoreVertIcon sx={MoreVertIconStyle} />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <PackBasicModal
          headerTitle={'Edit Pack'}
          packName={packName}
          packCover={packCover || ''}
          saveItem={(inputValue: string, packCoverState: string, privateCheckbox: boolean) =>
            updatePackHandler(cardPackId, inputValue, packCoverState, privateCheckbox)
          }
          handleCloseUserMenu={handleCloseUserMenu}
        >
          <MenuItem>
            <BorderColorOutlined sx={{ mr: 1 }} />
            <Typography textAlign="center">Edit</Typography>
          </MenuItem>
        </PackBasicModal>

        <DeleteBasicModal
          headerTitle={'Delete Pack'}
          packName={packName}
          deleteItem={() => deletePackHandler(cardPackId)}
          handleCloseUserMenu={handleCloseUserMenu}
        >
          <MenuItem>
            <DeleteOutlineIcon sx={{ mr: 1 }} />
            <Typography textAlign="center">Delete</Typography>
          </MenuItem>
        </DeleteBasicModal>

        <MenuItem disabled={cardList.length === 0} onClick={goToLearnHandler}>
          <SchoolOutlinedIcon sx={{ mr: 1 }} />
          <Typography textAlign="center">Learn</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
