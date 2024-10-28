import React from 'react'
import { Staus } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Staus, { label: string, color: 'red' | 'violet' | 'green'}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    CLOSED: {label: 'Closed', color: 'green'},
}

const IssueStatusBadge = ({status}: {status: Staus}) => {
  return (
    <Badge color={statusMap[status].color}>      
        {statusMap[status].label}    
    </Badge>
  );
}

export default IssueStatusBadge