export default function ExpenseEntry ({entry}) {
  return (
    <p>
      {entry.type} {entry.value} {entry.currency}
    </p>
  )
};