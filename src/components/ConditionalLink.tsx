import React from 'react'
import { Link } from 'react-router-dom'

export const ConditionalLink = ({
  children,
  to,
  condition,
  className 
}: {
  children: any
  to: string
  condition: boolean
  className?: string
}) => (!!condition && to)
  ? <Link to={to} className={className}>{children}</Link>
  : <>{children}</>;