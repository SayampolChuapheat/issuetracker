'use client'

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

import { Skeleton } from '@/app/components';
import { Issue } from "@prisma/client";
import toast, { Toaster } from 'react-hot-toast';


const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const {data: users, error, isLoading} = useUsers();
    
    if (isLoading) return <Skeleton />

    if (error) return null;

  /* 
    const [users, setUsers] = useState<User[]>([])
   
    useEffect(()=> {
    const fetchUsers = async () => {
      const {data} = await axios.get<User[]>('/api/users');
      setUsers(data);
    }

    fetchUsers();
  }, [])
  */
  
  const assignIssue =  (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>

            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

const useUsers = () => useQuery<User[]>({
      queryKey: ['users'],
      queryFn: () => axios.get('/api/users').then(res => res.data),
      staleTime: 60 * 1000,  //60s
      retry: 3
    })


export default AssigneeSelect