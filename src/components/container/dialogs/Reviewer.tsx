import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useUpdateJobMutation } from '@/store/job-api';
import { toast } from 'sonner';

interface Props {
    defaultReviewer: string;
    id: string;
    onClose: () => void
  }
const Reviewer = ({ defaultReviewer, id, onClose }: Props) => {
    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [reviewer, setReviewer] = React.useState(defaultReviewer);
    
    const handleUpdate = async () => {
      try {
        const response = await updateJob({reviewer,id}).unwrap()
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
          <DialogTitle>Assign Reviewer</DialogTitle>
          <Select onValueChange={setReviewer} defaultValue={defaultReviewer}>
            <SelectTrigger className='w-full'>
              <SelectValue>{reviewer || defaultReviewer}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reviewer 1">Reviewer 1</SelectItem>
              <SelectItem value="Reviewer 2">Reviewer 2</SelectItem>
              <SelectItem value="Reviewer 3">Reviewer 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-full flex justify-end gap-3">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={handleUpdate} disabled={isLoading} className="bg-main hover:bg-follow">{isLoading ? 'Assigning...' : 'Assign'}</Button>
          </div>
        </DialogContent>
  )
}

export default Reviewer