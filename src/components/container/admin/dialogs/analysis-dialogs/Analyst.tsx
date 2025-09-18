import { Button } from '@/components/ui/button'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface Props {
  defaultAnalyst: string
  id: string
  onClose: () => void
}

const Analyst = ({ defaultAnalyst, id, onClose }: Props) => {
  const [analyst, setAnalyst] = React.useState(defaultAnalyst)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdate = () => {
    setIsLoading(true)

    // Mock update simulation
    setTimeout(() => {
      console.log("Updated Analyst:", { id, analyst })
      setIsLoading(false)
      onClose()
    }, 1200)
  }

  return (
    <DialogContent>
      <DialogTitle>Assign Analyst</DialogTitle>

      <Select onValueChange={setAnalyst} defaultValue={defaultAnalyst}>
        <SelectTrigger>
          <SelectValue>{analyst || defaultAnalyst}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Analyst 1">Analyst 1</SelectItem>
          <SelectItem value="Analyst 2">Analyst 2</SelectItem>
          <SelectItem value="Analyst 3">Analyst 3</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-full flex justify-end gap-3 mt-4">
        <Button onClick={onClose} variant="outline">Cancel</Button>
        <Button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-main hover:bg-follow"
        >
          {isLoading ? 'Assigning...' : 'Assign'}
        </Button>
      </div>
    </DialogContent>
  )
}

export default Analyst
