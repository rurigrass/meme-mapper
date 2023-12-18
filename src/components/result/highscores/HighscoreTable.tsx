import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HighscoreTableProps {}

const HighscoreTable = ({}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* the array of highscores and users */}
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell className="font-bold">Paid</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default HighscoreTable;
