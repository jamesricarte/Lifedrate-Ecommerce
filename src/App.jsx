import "./App.css";
import Message from "./components/Message";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  let items = ["Papaya", "Mango"];

  let items2 = [
    "New York",
    "San Francisco",
    "Tokyo",
    "London",
    "Paris",
    "Philippines",
  ];

  const handleSelectItem = (item) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen">
        <Message
          items={items}
          heading="1st Message Components"
          onSelectItem={handleSelectItem}
        />
        <br />
        <Message
          items={items2}
          heading="2nd Message Components"
          onSelectItem={handleSelectItem}
        />

        <Alert>
          <span>This is the App Component!</span>
        </Alert>

        <Button className="mt-4" onClick={() => console.log("Clicked!")} />
        <Button
          className="mt-4"
          color="bg-red-400"
          onClick={() => console.log("Clicked!")}
        />
        <Button
          className="mt-4"
          color="bg-pink-400"
          onClick={() => console.log("Clicked!")}
        />
        <Button
          name="Click to Show Alert"
          className="mt-4"
          color="bg-violet-400"
          onClick={() => setAlertVisibility(true)}
        />

        {alertVisible && (
          <Alert text="Alert" onClose={() => setAlertVisibility(false)}>
            <span>This is the Clicked Alert!</span>
          </Alert>
        )}
      </div>
    </>
  );
}

export default App;
