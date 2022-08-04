export default function ExpenseEntry ({entry,year, month}) {
  return (
    <p className="p-1 border">
      {entry.recurring ? `<< ends in ${entry.endMonth}/${entry.endYear} >>` :""} {entry.type} {entry.value} {entry.currency} <br/>
    </p>
  )
};