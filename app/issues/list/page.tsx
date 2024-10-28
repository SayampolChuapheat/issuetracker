import prisma from '@/prisma/client';
import { Flex, Table } from '@radix-ui/themes';
import {IssueStatusBadge, Link} from '@/app/components';

import IssueActions from './IssueActions';
import {Staus, Issue}  from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';


interface Props {
  searchParams: IssueQuery
}

const IssuesPage =  async ({ searchParams }: Props) => {

  


  //VALIDATE ก่อนส่งให้ prisma เช่นมีการพิมพ์ ..?status=OPENX
  const statuses = Object.values(Staus);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const orderBy = columnNames    
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = { status };  

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
      
  });
  
  const issueCount = await prisma.issue.count({ where })
  return (

    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}  />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
        />
    </Flex>
  );
}

//export const dynamic = 'force-dynamic' เมื่อ update แล้วต้องกด F5 refresh ถึงจะเห็นข้อมูชที่ add ไป

//export const revalidate = 60 เมื่อเวลาผ่านไป 60 วินาที server จะ refresh data มาให้ใหม่ทุกๅ 60 วินาที

export default IssuesPage