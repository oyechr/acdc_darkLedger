import React, { FC } from 'react'
import './DarkLedger.css'
import { IDarkLedgerProps } from './types'

export const DarkLedger: FC<IDarkLedgerProps> = (props) => {

  return (
    <div className='App'>
      <header className='App-header'>
        <p>DARK LEDGER</p>
      </header>
    </div>
  )
}

export * from './types'
