import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter style={{ background: '#1D203E', color: 'white' }}>
      <div>
        <a href="https://www.th-koeln.de/" target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#f0aa4f' }}>
          TH-KOELN
        </a>
        <span className="ms-1">&copy; 2023-2024.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.th-koeln.de/"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#f0aa4f' }}>
          Hussein Al Hussein
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
