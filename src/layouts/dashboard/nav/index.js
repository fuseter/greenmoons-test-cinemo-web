import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material'
import useResponsive from '../../../hooks/useResponsive'
import Scrollbar from '../../../components/scrollbar'
import NavSection from '../../../components/nav-section'
import navConfig from './config'
import { AuthContext } from '../../../context/AuthContext'

const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
}

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation()
  const isDesktop = useResponsive('up', 'lg')
  const { userData } = useContext(AuthContext)

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ mb: 5, mx: 2.5, mt: 4 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src="/assets/images/avatars/avatar_default.jpg" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userData?.username}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}
