import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import './AppSidebarNav.css'
import { CBadge, CContainer } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component style={{ paddingLeft: '50px', color: 'white' }}

        {...(rest.to &&
          !rest.items && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <CContainer >
      <React.Fragment >
        {items &&
          items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
      </React.Fragment>
    </CContainer>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
