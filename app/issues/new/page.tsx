import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

//แก้บัก ตอนกด refresh แล้ว loading skeleton เพี้ยนไป
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);


const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage