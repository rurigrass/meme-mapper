import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "ruioru",
      amount: 130,
      status: "pending",
      email: "moo@example.com",
    },
    {
      id: "728fewfed52f",
      amount: 10450,
      status: "pending",
      email: "msmsmf@example.com",
    },
    {
      id: "72844fed52f",
      amount: 10440,
      status: "pending",
      email: "moigfhewoif@example.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
