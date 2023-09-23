// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { generateFields } from "scripts/formUtilities";
import { useModal } from "state/ModalContext";
import { useUser } from "state/UserContext";

interface iProps {
  endPoint: string;
  fields: Array<any>;
  data: any;
}

export default function FormUpdate({ endPoint, fields, data }: iProps) {
  // Global state
  const { setModal } = useModal();
  const { token } = useUser();

  // Local state
  const [form, setForm] = useState(generateFields(fields, data));


  //Properties
  const METHOD = "PUT";
  const HEADERS = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + token,
  };

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const editedItem = { ...form, id: data.id };
    

  event.preventDefault();
  fetch(endPoint + "update", {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(editedItem),
   })
   .then(onSuccess)
   .catch((error)=>onFailure(error));
   console.log(editedItem);
   console.log(endPoint);
   console.log(token);
}


  function onSuccess() {
    alert("Item edited!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not edit item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Edit information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button>Update</button>
      <button onClick={() => setModal(null)}>Cancel</button>
    </form>
  );
}
