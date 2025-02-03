import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const messages = [
  { id: 1, date: "2023-05-15", category: "Parking", status: "Resolved" },
  { id: 2, date: "2023-05-10", category: "Accident", status: "In Progress" },
  { id: 3, date: "2023-05-05", category: "Question", status: "Resolved" },
  { id: 4, date: "2023-04-30", category: "Parking", status: "Resolved" },
  { id: 5, date: "2023-04-25", category: "Emergency", status: "Resolved" },
]

export function MessageHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((message) => (
          <TableRow key={message.id}>
            <TableCell>{message.date}</TableCell>
            <TableCell>{message.category}</TableCell>
            <TableCell>{message.status}</TableCell>
            <TableCell>
              <a href="#" className="text-blue-500 hover:underline">
                View Details
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

