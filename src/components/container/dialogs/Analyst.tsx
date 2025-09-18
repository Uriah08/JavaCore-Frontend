import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

import { useUpdateJobMutation } from '@/store/job-api';
import { toast } from 'sonner';

interface Props {
  defaultAnalyst: string;
  id: string;
  onClose: () => void;
}

const Analyst = ({ defaultAnalyst, id, onClose }: Props) => {
  const [updateJob, { isLoading }] = useUpdateJobMutation();
  const [analyst, setAnalyst] = React.useState(defaultAnalyst);

  const handleUpdate = async () => {
    try {
      const response = await updateJob({analyst,id}).unwrap()
      if(!response.success) {
        throw new Error(response.message)
      }
      toast(response.message);
      onClose();
    } catch (error) {
      const apiError = error as { data?: { error?: string } };
      const errorMsg = apiError?.data?.error ?? "An unexpected error occurred";
      toast.error(errorMsg);
    }
  }

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle>Assign Analyst</DialogTitle>
      <Select onValueChange={setAnalyst} defaultValue={defaultAnalyst}>
        <SelectTrigger className='w-full'>
          <SelectValue>{analyst || defaultAnalyst}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Analyst 1">Analyst 1</SelectItem>
          <SelectItem value="Analyst 2">Analyst 2</SelectItem>
          <SelectItem value="Analyst 3">Analyst 3</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-full flex justify-end gap-3">
        <Button onClick={onClose} variant="outline">Cancel</Button>
        <Button onClick={handleUpdate} disabled={isLoading} className="bg-main hover:bg-follow">{isLoading ? 'Assigning...' : 'Assign'}</Button>
      </div>
    </DialogContent>
  );
};

export default Analyst;
