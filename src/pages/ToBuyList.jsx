import AddButton from "../components/AddButton";

function AlertButton({ message, children }) {
  return <button onClick={() => alert(message)}>{children}</button>;
}

export default function ToBuyList() {
  const day = "Friday";

  return (
    <>
      <h1>Needed to buy on {day}:</h1>
      <ul>
        <li>Flowers</li>
        <li>Shampoo</li>
        <li>Toothpaste</li>
      </ul>
      <div>
        <AlertButton message="Adding!">Add item</AlertButton>
        <AlertButton message="Removing!">Remove item</AlertButton>
      </div>
      <AddButton></AddButton>
    </>
  );
}
