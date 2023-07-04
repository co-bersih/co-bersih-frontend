import { useAuthContext } from "@contexts";
import { useState } from "react";
import axios from "axios";

export const StaffDashboardMenu: React.FC = () => {
  const [staffs, setStaffs] = useState<string[] | null>(null) // existing
  const [textInput, setTextInput] = useState<string>('') // to be added
  const { tokens } = useAuthContext()

  function handleAddStaff() {
    // post to endpoint with data from textinput
  }

  function handleRemoveStaff() {
    // post to endpoint
  }

  return(
    <>
      <h3>staff</h3>
    </>
  );
}